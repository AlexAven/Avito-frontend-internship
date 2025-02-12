import styled from 'styled-components';

import { Item } from '../types';
import { Button } from './Button';

const Wrapper = styled.article`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: var(--radii);
  box-shadow: var(--shadow);
  border: 0.1rem solid var(--colors-ui-border);
  /* cursor: pointer; */
  overflow: hidden;

  /* &:hover {
    transform: scale(1.01);
    box-shadow: var(--shadow-hover);
  } */
`;

const CardImage = styled.img`
  display: block;
  width: 30%;
  height: 150px;
  object-fit: contain;
  object-position: left;
  /* box-shadow: var(--shadow); */
`;

const CardBody = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 60%;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 1.5rem 2rem;
`;

const CardTitle = styled.h3`
  font-size: var(--fs-md-lg);
  font-weight: var(--fw-semi-bold);
  color: var(--colors-text-title);
  cursor: pointer;

  &:hover {
    color: var(--colors-text-hover);
  }
`;

const CardDescription = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 1rem 0 0;
`;

const Location = styled.span`
  padding-bottom: 0.5rem;
`;

const Category = styled.span`
  align-self: flex-end;
  color: var(--colors-text-desc);
`;

const BtnContainer = styled.div`
  padding-bottom: 2rem;
  align-self: flex-end;
`;

interface CardProps {
  onClick?: () => void;
  item: Item;
}

const Card: React.FC<CardProps> = ({ item, onClick }) => {
  const defaultImage = './src/assets/images/no-photo.png';
  const { name, location, type, image = defaultImage } = item;

  return (
    <Wrapper>
      <CardImage src={image} alt={name} />
      <CardBody>
        <CardTitle onClick={onClick}>{name}</CardTitle>
        <CardDescription>
          <Location>{location}</Location>
          <Category>{type}</Category>
        </CardDescription>
      </CardBody>
      <BtnContainer>
        <Button onClick={onClick}>Открыть</Button>
      </BtnContainer>
    </Wrapper>
  );
};

export default Card;
