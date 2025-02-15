import { ErrorMessage, Field } from 'formik';

import { InputContainer, LabelCustom, ErrorText, SelectCustom, NumberInputCustom } from './styles';

// Компонент формы для категории "Недвижимость"
export const ItemRealEstate = () => {
  return (
    <>
      <InputContainer>
        <LabelCustom>Тип недвижимости</LabelCustom>
        <Field name="propertyType" as={SelectCustom}>
          <option value=""></option>
          <option value="Квартира">Квартира</option>
          <option value="Дом">Дом</option>
          <option value="Коттедж">Коттедж</option>
        </Field>
        <ErrorMessage name="propertyType" component={ErrorText} />
      </InputContainer>

      <InputContainer>
        <LabelCustom>
          Площадь <span>м²</span>
        </LabelCustom>
        <Field name="area" component={NumberInputCustom} />
        <ErrorMessage name="area" component={ErrorText} />
      </InputContainer>

      <InputContainer>
        <LabelCustom>Количество комнат</LabelCustom>
        <Field name="rooms" component={NumberInputCustom} />
        <ErrorMessage name="rooms" component={ErrorText} />
      </InputContainer>

      <InputContainer>
        <LabelCustom>Цена</LabelCustom>
        <Field name="price" component={NumberInputCustom} />
        <ErrorMessage name="price" component={ErrorText} />
      </InputContainer>
    </>
  );
};
