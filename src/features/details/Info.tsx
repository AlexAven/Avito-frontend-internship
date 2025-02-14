import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ItemWithDetails, ItemTypes } from '../../types';
import { Button, AltLinkButton } from '../../components/Button';

const Wrapper = styled.section`
  margin: 1rem 3rem 0;
  padding: 3rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;
  line-height: 2.5rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 3rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;

    & > :nth-child(2) {
      align-self: end;
    }

    & > :nth-child(3),
    :nth-child(4) {
      width: 20rem;
    }
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-width: 45rem;
  max-height: 40rem;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  font-size: var(--fs-lg);
  font-weight: var(--fw-bold);
  padding-bottom: 2.5rem;
`;

const InfoSubTitle = styled.h3`
  font-size: var(--fs-md-xlg);
  font-weight: var(--fw-bold);
  padding-bottom: 1.2rem;
`;

const InfoDesription = styled.p`
  font-size: 1.6rem;
  padding-bottom: 0.5rem;

  & > span {
    color: var(--colors-text-desc);
  }
`;

const InfoGroup = styled.div`
  padding: 1rem 0;
`;

interface InfoProps {
  item: ItemWithDetails;
}

// Компонент страницы с информацией отдельного объявления
const Info: React.FC<InfoProps> = ({ item }) => {
  const navigate = useNavigate();

  // Основная информация для любого типа объявлений
  const renderCommonInfo = () => {
    const defaultImage = '../src/assets/images/no-photo.png';
    const { image = defaultImage } = item;

    return (
      <InfoGroup>
        <InfoGroup>
          <InfoTitle>{item.name}</InfoTitle>
          <InfoImage src={image} alt={item.name} />
        </InfoGroup>

        <InfoGroup>
          <InfoSubTitle>Описание</InfoSubTitle>
          <InfoDesription>{item.description}</InfoDesription>
        </InfoGroup>

        <InfoGroup>
          <InfoSubTitle>Адрес</InfoSubTitle>
          <InfoDesription>{item.location}</InfoDesription>
        </InfoGroup>
      </InfoGroup>
    );
  };

  // Информация для типа "Недвижимость"
  const renderRealEstateInfo = () => {
    if ('propertyType' in item && 'area' in item && 'rooms' in item && 'price' in item) {
      return (
        <InfoGroup>
          <InfoSubTitle>
            <span>Детали о недвижимости</span>
          </InfoSubTitle>

          <InfoDesription>
            <span>Тип недвижимости:</span> {item.propertyType}
          </InfoDesription>

          <InfoDesription>
            <span>Площадь:</span> {item.area} м²
          </InfoDesription>

          <InfoDesription>
            <span>Количество комнат:</span> {item.rooms}
          </InfoDesription>

          <InfoDesription>
            <span>Цена:</span> {item.price.toLocaleString()} ₽
          </InfoDesription>
        </InfoGroup>
      );
    }
    return null;
  };

  // Иинформация для типа "Авто"
  const renderAutoInfo = () => {
    if ('brand' in item && 'model' in item && 'year' in item) {
      return (
        <InfoGroup>
          <InfoSubTitle>Детали об автомобиле</InfoSubTitle>
          <InfoDesription>
            <span>Бренд:</span> {item.brand}
          </InfoDesription>

          <InfoDesription>
            <span>Модель:</span> {item.model}
          </InfoDesription>

          <InfoDesription>
            <span>Год выпуска:</span> {item.year}
          </InfoDesription>

          {'mileage' in item && (
            <InfoDesription>
              <span>Пробег:</span> {item.mileage?.toLocaleString()} км
            </InfoDesription>
          )}
        </InfoGroup>
      );
    }
    return null;
  };

  // Информация для типа "Услуги"
  const renderServiceInfo = () => {
    if ('serviceType' in item && 'experience' in item && 'cost' in item) {
      return (
        <InfoGroup>
          <InfoSubTitle>
            <span>Детали услуги</span>
          </InfoSubTitle>

          <InfoDesription>
            <span>Тип услуги:</span> {item.serviceType}
          </InfoDesription>

          <InfoDesription>
            <span>Лет опыта:</span> {item.experience.toLocaleString()}
          </InfoDesription>

          <InfoDesription>
            <span>Стоимость:</span> {item.cost.toLocaleString()} ₽
          </InfoDesription>

          {'workSchedule' in item && (
            <InfoDesription>
              <span>График работы:</span> {item.workSchedule}
            </InfoDesription>
          )}
        </InfoGroup>
      );
    }
    return null;
  };

  return (
    <Wrapper>
      {renderCommonInfo()}
      {item.type === ItemTypes.REAL_ESTATE && renderRealEstateInfo()}
      {item.type === ItemTypes.AUTO && renderAutoInfo()}
      {item.type === ItemTypes.SERVICES && renderServiceInfo()}
      <Button onClick={() => navigate(-1)}>Назад</Button>
      <AltLinkButton to="/form">Редактировать</AltLinkButton>
    </Wrapper>
  );
};

export default Info;
