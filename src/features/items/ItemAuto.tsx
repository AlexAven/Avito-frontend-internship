import { ErrorMessage, Field } from 'formik';
import { InputContainer, LabelCustom, InputCustom, ErrorText, SelectCustom } from './styles';

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
          <option value="acura">Acura</option>
          <option value="audi">Audi</option>
          <option value="bmw">BMW</option>
          <option value="citroen">Citroen</option>
          <option value="dodge">Dodge</option>
          <option value="ford">Ford</option>
          <option value="ferrari">Ferrari</option>
          <option value="honda">Honda</option>
          <option value="hyundai">Hyundai</option>
          <option value="jeep">Jeep</option>
          <option value="jaguar">Jaguar</option>
          <option value="kia">KIA</option>
          <option value="land-rover">Land Rover</option>
          <option value="lexus">Lexus</option>
          <option value="mazda">Mazda</option>
          <option value="mercedes-benz">Mercedes-Benz</option>
          <option value="mitsubishi">Mitsubishi</option>
          <option value="nissan">Nissan</option>
          <option value="tesla">Tesla</option>
          <option value="Volkswagen">Volkswagen</option>
          <option value="volvo">Volvo</option>
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
