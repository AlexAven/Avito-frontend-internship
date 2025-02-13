import { ErrorMessage, Field } from 'formik';
import { InputContainer, LabelCustom, InputCustom, ErrorText, SelectCustom } from './styles';

export const ItemServices = () => {
  return (
    <>
      <InputContainer>
        <LabelCustom>Тип услуги</LabelCustom>
        <Field name="serviceType" as={SelectCustom}>
          <option value=""></option>
          <option value="ремонт">Ремонт</option>
          <option value="уборка">Уборка</option>
          <option value="доставка">Доставка</option>
        </Field>
        <ErrorMessage name="serviceType" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>
          Опыт работы <span>лет</span>
        </LabelCustom>
        <InputCustom name="experience" type="number" />
        <ErrorMessage name="experience" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>Стоимость</LabelCustom>
        <InputCustom name="cost" type="number" />
        <ErrorMessage name="cost" component={ErrorText} />
      </InputContainer>
      <InputContainer>
        <LabelCustom>
          График работы <span>(необязательно)</span>
        </LabelCustom>
        <InputCustom name="workSchedule" />
      </InputContainer>
    </>
  );
};
