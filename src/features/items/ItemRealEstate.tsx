import { ErrorMessage, Field } from 'formik';
import { InputContainer, LabelCustom, InputCustom, ErrorText, SelectCustom } from './styles';

export const ItemRealEstate = () => {
  return (
    <>
      <InputContainer>
        <LabelCustom>Тип недвижимости</LabelCustom>
        <Field name="propertyType" as={SelectCustom}>
          <option value=""></option>
          <option value="квартира">Квартира</option>
          <option value="дом">Дом</option>
          <option value="коттедж">Коттедж</option>
        </Field>
        <ErrorMessage name="propertyType" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>
          Площадь <span>м²</span>
        </LabelCustom>
        <InputCustom name="area" type="number" />
        <ErrorMessage name="area" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>Количество комнат</LabelCustom>
        <InputCustom name="rooms" type="number" />
        <ErrorMessage name="rooms" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>Цена</LabelCustom>
        <InputCustom name="price" type="number" />
        <ErrorMessage name="price" component={ErrorText} />
      </InputContainer>
    </>
  );
};
