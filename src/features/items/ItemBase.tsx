/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, FormikValues } from 'formik';

import { ItemTypes } from '../../types';
import { Button } from '../../components/Button';
import {
  InputContainer,
  LabelCustom,
  InputCustom,
  ErrorText,
  SelectCustom,
  TextAreaCustom,
  ButtonWrapper,
} from './styles';

// Типизация основной части формы
interface ItemBaseProps {
  values: FormikValues;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setSelectedCategory: (selectedCategory: string) => void;
}

// Базовый компонент формы для всех категорий объявлений
export const ItemBase: React.FC<ItemBaseProps> = ({
  values,
  setFieldValue,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();

  const categories = [
    { value: ItemTypes.REAL_ESTATE, label: 'Недвижимость' },
    { value: ItemTypes.AUTO, label: 'Авто' },
    { value: ItemTypes.SERVICES, label: 'Услуги' },
  ];

  const handleReturn = () => navigate(-1);

  return (
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

      <ButtonWrapper>
        <Button type="button" onClick={handleReturn}>
          Назад
        </Button>
        <Button type="submit" disabled={!values.type}>
          Продолжить
        </Button>
      </ButtonWrapper>
    </>
  );
};
