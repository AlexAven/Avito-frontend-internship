import { ErrorMessage } from 'formik';
import { InputContainer, LabelCustom, InputCustom, ErrorText } from './styles';

export const ItemAuto = () => {
  return (
    <>
      <InputContainer>
        <LabelCustom>Марка</LabelCustom>
        <InputCustom name="brand" />
        <ErrorMessage name="brand" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>Модель</LabelCustom>
        <InputCustom name="model" />
        <ErrorMessage name="model" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>Год выпуска</LabelCustom>
        <InputCustom name="year" type="number" />
        <ErrorMessage name="year" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>
          Пробег <span>км</span>
        </LabelCustom>
        <InputCustom name="mileage" type="number" />
        <ErrorMessage name="mileage" component={ErrorText} />
      </InputContainer>
    </>
  );
};
