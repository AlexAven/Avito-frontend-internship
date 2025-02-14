import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
};

const app = express();
app.use(bodyParser.json());

// Используем CORS для запуска проекта и сервера на разных портах
app.use(cors());

// In-memory хранилище для объявлений
let items = [
  {
    id: 0,
    image: 'https://i.pinimg.com/originals/29/98/94/2998940f55701b9952c797ef36499b3a.jpg',
    name: 'Студия на окраине',
    description: 'Просторная квартира в центре города',
    location: 'Красногорск',
    type: 'Недвижимость',
    propertyType: 'Квартира',
    area: 28,
    rooms: 1,
    price: 998989999,
  },
  {
    id: 1,
    image: 'https://www.amocrm.ru/uploads/2019/06/huszzitbio4.jpg',
    name: 'Квартира в центре',
    description: 'Просторная квартира в центре города',
    location: 'Москва',
    type: 'Недвижимость',
    propertyType: 'Квартира',
    area: 100,
    rooms: 3,
    price: 15000000,
  },
  {
    id: 2,
    image: 'https://fili-auto.ru/static/imgCar/118/5623foto-camry-2019_01.jpg',
    name: 'Toyota Camry',
    description: 'Надежный автомобиль',
    location: 'Москва',
    type: 'Авто',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    mileage: 15000,
  },
  {
    id: 3,
    image:
      'https://thumbs.dreamstime.com/b/worker-isolated-construction-work-wear-white-background-isoalted-31068044.jpg',
    name: 'Ремонт квартир',
    description: 'Качественный ремонт квартир',
    location: 'Москва',
    type: 'Услуги',
    serviceType: 'Ремонт',
    experience: 5,
    cost: 50000,
    workSchedule: 'Пн-Пт, 9:00-18:00',
  },
  {
    id: 4,
    image: 'https://carpet-gold.ru/images/big/kover_3_na_6_v_interere_3.jpg',
    name: 'Чистка ковров',
    description: 'Будет чист ваш трубочист',
    location: 'Саратов',
    type: 'Услуги',
    serviceType: 'Уборка',
    experience: 5,
    cost: 20000,
    workSchedule: 'Пн-Пт, 8:00-22:00',
  },
  {
    id: 5,
    name: 'Пошив одежды',
    description: 'Почти задаром',
    location: 'Санкт-Петербург',
    type: 'Услуги',
    serviceType: 'Ремонт',
    experience: 5,
    cost: 50000,
    workSchedule: 'Пн-Пт, 10:00-15:00',
  },
  {
    id: 6,
    image: 'https://lada-forsage.ru/i/CarBodyImage.22.jpg',
    name: 'LADA Largus',
    description: 'На дачу за картошкой',
    location: 'Сочи',
    type: 'Авто',
    brand: 'ВАЗ',
    model: 'Largus',
    year: 2015,
    mileage: 50000,
  },
  {
    id: 7,
    image: 'https://cdn.bmwblog.com/wp-content/uploads/2019/11/BMW-X7-M50d-Greece_11.jpg',
    name: 'BMW X7',
    description: 'Когда понт дорожен денег',
    location: 'Краснодар',
    type: 'Авто',
    brand: 'BMW',
    model: 'X7',
    year: 2023,
    mileage: 5000,
  },
  {
    id: 8,
    image: 'https://image.made-in-china.com/2f0j00GvitIuLrsMgy/Jacuzzi-Bathtub-MT-NR1801-.jpg',
    name: 'Квартира с джакузи',
    description: 'Почти дворец для богатеев',
    location: 'Армавир',
    type: 'Недвижимость',
    propertyType: 'Квартира',
    area: 250,
    rooms: 5,
    price: 250000000,
  },
  {
    id: 9,
    image: 'https://fili-auto.ru/static/imgCar/118/5623foto-camry-2019_01.jpg',
    name: 'Toyota Camry2',
    description: 'Надежный автомобиль',
    location: 'Москва',
    type: 'Авто',
    brand: 'BMW',
    model: 'Camry',
    year: 2020,
    mileage: 15000,
  },
  {
    id: 10,
    name: 'Чудо-тачка',
    description: 'Надежный автомобиль',
    location: 'Москва',
    type: 'Авто',
    brand: 'BMW',
    model: 'Hilux',
    year: 2020,
    mileage: 15000,
  },
];

const makeCounter = () => {
  let count = 0;
  return () => count++;
};

const itemsIdCounter = makeCounter();

// Создание нового объявления
app.post('/items', (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: 'Missing required common fields' });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res.status(400).json({ error: 'Missing required fields for Real estate' });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res.status(400).json({ error: 'Missing required fields for Auto' });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res.status(400).json({ error: 'Missing required fields for Services' });
      }
      break;
    default:
      return res.status(400).json({ error: 'Invalid type' });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get('/items', (req, res) => {
  res.json(items);
});

// Получение объявления по его id
app.get('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Обновление объявления по его id
app.put('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Удаление объявления по его id
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id, 10));
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
