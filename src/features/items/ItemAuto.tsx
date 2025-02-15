import { ErrorMessage, Field } from 'formik';
import {
  InputContainer,
  LabelCustom,
  InputCustom,
  ErrorText,
  SelectCustom,
  NumberInputCustom,
} from './styles';

// Компонент формы для категории "Авто"
export const ItemAuto = () => {
  return (
    <>
      <InputContainer>
        <LabelCustom>Марка</LabelCustom>
        <Field name="brand" as={SelectCustom}>
          <option value=""></option>
          <option value="ВАЗ">ВАЗ</option>
          <option value="ГАЗ">ГАЗ</option>
          <option value="УАЗ">УАЗ</option>
          <option value="Acura">Acura</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Citroen">Citroen</option>
          <option value="Dodge">Dodge</option>
          <option value="Ford">Ford</option>
          <option value="Ferrari">Ferrari</option>
          <option value="Honda">Honda</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Jeep">Jeep</option>
          <option value="Jaguar">Jaguar</option>
          <option value="KIA">KIA</option>
          <option value="Lexus">Lexus</option>
          <option value="Mazda">Mazda</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Mitsubishi">Mitsubishi</option>
          <option value="Nissan">Nissan</option>
          <option value="Tesla">Tesla</option>
          <option value="Volkswagen">Volkswagen</option>
          <option value="Volvo">Volvo</option>
        </Field>
        <ErrorMessage name="brand" component={ErrorText} />
      </InputContainer>

      <InputContainer>
        <LabelCustom>Модель</LabelCustom>
        <InputCustom name="model" />
        <ErrorMessage name="model" component={ErrorText} />
      </InputContainer>

      <InputContainer>
        <LabelCustom>Год выпуска</LabelCustom>
        <Field name="year" component={NumberInputCustom} />
        <ErrorMessage name="year" component={ErrorText} />
      </InputContainer>

      <InputContainer>
        <LabelCustom>
          Пробег <span>км</span>
        </LabelCustom>
        <Field name="mileage" component={NumberInputCustom} />
        <ErrorMessage name="mileage" component={ErrorText} />
      </InputContainer>
    </>
  );
};
