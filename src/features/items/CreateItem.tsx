/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { createItem, updateItem } from '../items/itemsSlice';
import { ItemTypes, ItemType, ItemWithDetails } from '../../types';
import { Button } from '../../components/Button';

// Анимация ошибки
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Стили для компонента ошибки
const ErrorText = styled.div`
  color: var(--error);
  font-size: var(--fs-md);
  margin-top: 0.5rem;
  animation: ${slideDown} 1s ease forwards;
  position: absolute;
  bottom: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  max-width: 1350px;
  padding: 0 2rem;
  padding: 3rem 0;
`;

const FormCustom = styled(Form)`
  width: 100%;
  max-width: 80rem;
  display: flex;
  flex-direction: column;

  & > :last-child {
    margin-left: auto;
    width: 30%;
    height: 4rem;
  }
`;

const Title = styled.h1`
  font-size: var(--fs-lg);
  font-weight: var(--fw-bold);
`;

const InputCustom = styled(Field).attrs({
  autoComplete: 'off',
  maxLength: '95',
})`
  width: 100%;
  padding: 1.5rem 2rem;
  background-color: var(--colors-input);
  font-weight: var(--fw-semi-bold);
  border-radius: var(--radii);

  &::-webkit-search-cancel-button {
    display: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:hover {
    background-color: var(--colors-input-hover);
  }
`;

const TextAreaCustom = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  border-radius: var(--radii);
  resize: none;
  background-color: var(--colors-input);
  font-weight: var(--fw-semi-bold);

  &:focus {
    border: 2px solid var(--colors-ui);
    outline: none;
  }

  &:hover {
    background-color: var(--colors-input-hover);
  }
`;

const SelectCustom = styled.select`
  width: 100%;
  padding: 1.2rem 2rem;
  border-radius: var(--radii);
  background-color: var(--colors-input);
  font-weight: var(--fw-semi-bold);
  cursor: pointer;

  &:focus {
    border: 2px solid var(--colors-ui);
  }

  &:hover {
    background-color: var(--colors-input-hover);
  }
`;

const LabelCustom = styled.label`
  font-size: var(--fs-md-lg);
  font-weight: var(--fw-bold);
  padding: 1rem;

  & > span {
    font-size: var(--fs-md);
    color: var(--colors-text-desc);
    font-weight: var(--fw-semi-bold);
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 3rem;
  position: relative;
`;

// Схема валидации для первого шага
const stepOneSchema = yup.object().shape({
  name: yup.string().required('Укажите название объявления'),
  description: yup.string().required('Напишите описание'),
  location: yup.string().required('Укажите адрес'),
  type: yup.string().required('Укажите категорию'),
  image: yup.string().url('Укажите валидную ссылку на фото').notRequired(),
});

// Схемы валидации для категорий
const schemas: Record<ItemType, yup.ObjectSchema<any>> = {
  [ItemTypes.REAL_ESTATE]: yup.object().shape({
    specific: yup.object().shape({
      propertyType: yup.string().required('Выберите тип недвижимости'),
      area: yup.number().positive('Площадь должна быть больше 0').required('Укажите площадь'),
      rooms: yup.number().required('Укажите количество комнат').min(1, 'Минимум 1 комната'),
      price: yup.number().positive('Цена должна быть больше 0').required('Укажите цену'),
    }),
  }),
  [ItemTypes.AUTO]: yup.object().shape({
    specific: yup.object().shape({
      brand: yup.string().required('Укажите марку авто'),
      model: yup.string().required('Укажите модель авто'),
      year: yup
        .number()
        .required('Укажите год выпуска авто')
        .integer()
        .min(1800, 'Год выпуска должен быть больше 1800')
        .max(new Date().getFullYear(), 'Год выпуска не может быть больше текущего'),
      mileage: yup
        .number()
        .required('Укажите пробег авто')
        .positive('Пробег должен быть положительным'),
    }),
  }),
  [ItemTypes.SERVICES]: yup.object().shape({
    specific: yup.object().shape({
      serviceType: yup.string().required('Укадите тип услуги'),
      experience: yup
        .number()
        .min(0, 'Опыт работы не может быть меньше 0')
        .required('Укажите количество лет опыта'),
      cost: yup.number().positive('Укажите корректную цену').required('Цена обязательна'),
      workSchedule: yup.string().notRequired(),
    }),
  }),
};

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentItem = useAppSelector((state) => state.details.currentItem);

  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Инициализация значений формы
  const initialValues = currentItem || {
    name: '',
    description: '',
    location: '',
    type: '',
    image: '',
    specific: {
      propertyType: '',
      area: '',
      rooms: '',
      price: '',
      brand: '',
      model: '',
      year: '',
      mileage: '',
      serviceType: '',
      experience: '',
      cost: '',
      workSchedule: '',
    },
  };

  const getFlatObject = (obj) => {
    const flattened = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, getFlatObject(value));
      } else if (value !== '' && value !== null && value !== undefined) {
        flattened[key] = value;
      }
    }

    return flattened;
  };

  useEffect(() => {
    if (currentItem) {
      setSelectedCategory(currentItem.type);
    }
  }, [currentItem]);

  const categories = [
    { value: ItemTypes.REAL_ESTATE, label: 'Недвижимость' },
    { value: ItemTypes.AUTO, label: 'Авто' },
    { value: ItemTypes.SERVICES, label: 'Услуги' },
  ];

  const handleSubmit = (values: any) => {
    if (step === 1) {
      setStep(2);
    } else {
      if (currentItem) {
        dispatch(updateItem(values));
      } else {
        const ItemToDispatch: ItemWithDetails = getFlatObject(values);
        dispatch(createItem(ItemToDispatch));
      }
      navigate('/list');
    }
  };

  return (
    <Wrapper>
      <Title>Создание объявления</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={step === 1 ? stepOneSchema : schemas[selectedCategory]}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, setFieldValue }) => (
          <FormCustom>
            {step === 1 && (
              <>
                <InputContainer>
                  <LabelCustom>Категория</LabelCustom>
                  <Field
                    as={SelectCustom}
                    name="type"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selected = e.target.value;
                      setFieldValue('type', selected);
                      setSelectedCategory(selected);
                    }}
                  >
                    <option value=""></option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="type" component={ErrorText} />
                </InputContainer>
                <InputContainer>
                  <LabelCustom>Название</LabelCustom>
                  <InputCustom name="name" />
                  <ErrorMessage name="name" component={ErrorText} />
                </InputContainer>
                <InputContainer>
                  <LabelCustom>Описание</LabelCustom>
                  <Field as={TextAreaCustom} name="description" maxLength="500" />
                  <ErrorMessage name="description" component={ErrorText} />
                </InputContainer>
                <InputContainer>
                  <LabelCustom>Локация</LabelCustom>
                  <InputCustom name="location" />
                  <ErrorMessage name="location" component={ErrorText} />
                </InputContainer>
                <InputContainer>
                  <LabelCustom>
                    Ссылка на фото <span>(необязательно)</span>
                  </LabelCustom>
                  <InputCustom name="image" />
                  <ErrorMessage name="image" component={ErrorText} />
                </InputContainer>
                <Button type="submit" disabled={!values.type}>
                  Продолжить
                </Button>
              </>
            )}
            {step === 2 && selectedCategory && (
              <>
                {selectedCategory === ItemTypes.REAL_ESTATE && (
                  <>
                    <InputContainer>
                      <LabelCustom>Тип недвижимости</LabelCustom>
                      <Field name="specific.propertyType" as={SelectCustom}>
                        <option value=""></option>
                        <option value="квартира">Квартира</option>
                        <option value="дом">Дом</option>
                        <option value="коттедж">Коттедж</option>
                      </Field>
                      <ErrorMessage name="specific.propertyType" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>
                        Площадь <span>м²</span>
                      </LabelCustom>
                      <InputCustom name="specific.area" type="number" />
                      <ErrorMessage name="specific.area" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>Количество комнат</LabelCustom>
                      <InputCustom name="specific.rooms" type="number" />
                      <ErrorMessage name="specific.rooms" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>Цена</LabelCustom>
                      <InputCustom name="specific.price" type="number" />
                      <ErrorMessage name="specific.price" component={ErrorText} />
                    </InputContainer>
                  </>
                )}
                {selectedCategory === ItemTypes.AUTO && (
                  <>
                    <InputContainer>
                      <LabelCustom>Марка</LabelCustom>
                      <InputCustom name="specific.brand" />
                      <ErrorMessage name="specific.brand" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>Модель</LabelCustom>
                      <InputCustom name="specific.model" />
                      <ErrorMessage name="specific.model" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>Год выпуска</LabelCustom>
                      <InputCustom name="specific.year" type="number" />
                      <ErrorMessage name="specific.year" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>
                        Пробег <span>км</span>
                      </LabelCustom>
                      <InputCustom name="specific.mileage" type="number" />
                    </InputContainer>
                  </>
                )}
                {selectedCategory === ItemTypes.SERVICES && (
                  <>
                    <InputContainer>
                      <LabelCustom>Тип услуги</LabelCustom>
                      <Field name="specific.serviceType" as={SelectCustom}>
                        <option value=""></option>
                        <option value="ремонт">Ремонт</option>
                        <option value="уборка">Уборка</option>
                        <option value="доставка">Доставка</option>
                      </Field>
                      <ErrorMessage name="specific.serviceType" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>Опыт работы</LabelCustom>
                      <InputCustom name="specific.experience" type="number" />
                      <ErrorMessage name="specific.experience" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>Стоимость</LabelCustom>
                      <InputCustom name="specific.cost" type="number" />
                      <ErrorMessage name="specific.cost" component={ErrorText} />
                    </InputContainer>
                    <InputContainer>
                      <LabelCustom>
                        График работы <span>(необязательно)</span>
                      </LabelCustom>
                      <InputCustom name="specific.workSchedule" />
                    </InputContainer>
                  </>
                )}
                <Button type="submit">Опубликовать</Button>
              </>
            )}
          </FormCustom>
        )}
      </Formik>
    </Wrapper>
  );
};

export default FormPage;
