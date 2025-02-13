import { Formik } from 'formik';

import { ItemTypes, ItemType } from '../../types';
import { Button } from '../../components/Button';
import { ItemRealEstate } from './ItemRealEstate';
import { ItemServices } from './ItemServices';
import { ItemBase } from './ItemBase';
import { ItemAuto } from './ItemAuto';
import useCreate from './useCreate';
import useValidate from './useValidate';
import { Wrapper, Title, FormCustom } from './styles';

const FormPage: React.FC = () => {
  const { stepOneSchema, stepTwoSchema } = useValidate();

  const { currentTitle, selectedCategory, setSelectedCategory, initialValues, handleSubmit, step } =
    useCreate();

  return (
    <Wrapper>
      <Title>{currentTitle}</Title>
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
