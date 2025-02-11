import styled from 'styled-components';

import { SwitcherType } from '../../types';
import Switcher from '../../components/Switcher';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setCategory, selectCategory } from './controlsSlice';

const Wrapper = styled.div`
  max-width: 22rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
`;

const Category = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value as SwitcherType;

    dispatch(setCategory(type));
  };

  return (
    <Wrapper>
      <Switcher
        title={'Все'}
        value="Все"
        name="category"
        checked={category === 'Все'}
        onChange={handleChange}
      />
      <Switcher
        title={'Недвижимость'}
        value="Недвижимость"
        name="category"
        checked={category === 'Недвижимость'}
        onChange={handleChange}
      />
      <Switcher
        title={'Авто'}
        value="Авто"
        name="category"
        checked={category === 'Авто'}
        onChange={handleChange}
      />
      <Switcher
        title={'Услуги'}
        value="Услуги"
        name="category"
        checked={category === 'Услуги'}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default Category;
