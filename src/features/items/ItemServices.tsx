import { ErrorMessage, Field } from 'formik';

import {
  InputContainer,
  LabelCustom,
  InputCustom,
  ErrorText,
  SelectCustom,
  NumberInputCustom,
} from './styles';

// Компонент формы для категории "Услуги"
export const ItemServices = () => {
  return (
    <>
      <InputContainer>
        <LabelCustom>Тип услуги</LabelCustom>
        <Field name="serviceType" as={SelectCustom}>
          <option value=""></option>
          <option value="Ремонт">Ремонт</option>
          <option value="Уборка">Уборка</option>
          <option value="Доставка">Доставка</option>
        </Field>
        <ErrorMessage name="serviceType" component={ErrorText} />
      </InputContainer>

      <InputContainer>
        <LabelCustom>
          Опыт работы <span>лет</span>
        </LabelCustom>
        <Field name="experience" component={NumberInputCustom} />
        <ErrorMessage name="experience" component={ErrorText} />
      </InputContainer>

      <InputContainer>
        <LabelCustom>Стоимость</LabelCustom>
        <Field name="cost" component={NumberInputCustom} />
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
