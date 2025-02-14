import { Formik } from 'formik';

import useCreate from './useCreate';
import useValidate from './useValidate';

import { Wrapper, Title, FormCustom, ButtonWrapper } from './styles';
import { ItemTypes, ItemType } from '../../types';
import { Button } from '../../components/Button';
import { ItemRealEstate } from './ItemRealEstate';
import { ItemServices } from './ItemServices';
import { ItemBase } from './ItemBase';
import { ItemAuto } from './ItemAuto';

const FormPage: React.FC = () => {
  const { stepOneSchema, stepTwoSchema } = useValidate();
  const {
    currentTitle,
    selectedCategory,
    setSelectedCategory,
    initialValues,
    handleSubmit,
    handleReturn,
    step,
  } = useCreate();

  return (
    <Wrapper>
      <Title>{currentTitle}</Title>

      {/* Заполняем и валидируем форму объявления в зависимсоти от категории товара */}
      <Formik
        initialValues={initialValues}
        validationSchema={step === 1 ? stepOneSchema : stepTwoSchema[selectedCategory as ItemType]}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, setFieldValue }) => (
          <FormCustom>
            {step === 1 && (
              <ItemBase
                setFieldValue={setFieldValue}
                values={values}
                setSelectedCategory={setSelectedCategory}
              />
            )}
            {step === 2 && selectedCategory && (
              <>
                {selectedCategory === ItemTypes.REAL_ESTATE && <ItemRealEstate />}
                {selectedCategory === ItemTypes.AUTO && <ItemAuto />}
                {selectedCategory === ItemTypes.SERVICES && <ItemServices />}
                <ButtonWrapper>
                  <Button type="button" onClick={handleReturn}>
                    Назад
                  </Button>
                  <Button type="submit">Опубликовать</Button>
                </ButtonWrapper>
              </>
            )}
          </FormCustom>
        )}
      </Formik>
    </Wrapper>
  );
};

export default FormPage;
