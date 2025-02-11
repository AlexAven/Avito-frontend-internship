// /* eslint-disable @typescript-eslint/no-explicit-any */
// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';

// // Возможные типы объявлений
// const ItemTypes = {
//   REAL_ESTATE: 'Недвижимость',
//   AUTO: 'Авто',
//   SERVICES: 'Услуги',
// } as const;

// // Типы объявлений как строковые литералы
// type ItemType = (typeof ItemTypes)[keyof typeof ItemTypes];

// // Общий интерфейс объявления
// interface Item {
//   id: number;
//   name: string;
//   description: string;
//   location: string;
//   type: ItemType;
// }

// // Специфические поля для типа "Недвижимость"
// interface RealEstateSpecific {
//   propertyType: string;
//   area: number;
//   rooms: number;
//   price: number;
// }

// // Специфические поля для типа "Авто"
// interface AutoSpecific {
//   brand: string;
//   model: string;
//   year: number;
//   mileage?: number;
// }

// // Специфические поля для типа "Услуги"
// interface ServiceSpecific {
//   serviceType: string;
//   experience: number;
//   cost: number;
//   workSchedule?: string;
// }

// // Обобщенный тип объявления с возможными спецификациями
// type ItemWithDetails = Item & (RealEstateSpecific | AutoSpecific | ServiceSpecific);

// const app = express();
// app.use(bodyParser.json());

// // In-memory хранилище для объявлений
// const items: ItemWithDetails[] = [];

// const makeCounter = () => {
//   let count = 0;
//   return () => count++;
// };

// const itemsIdCounter = makeCounter();

// // Создание нового объявления
// app.post('/items', (req: any, res: any) => {
//   const { name, description, location, type, ...rest } = req.body;

//   // Validate common required fields
//   if (!name || !description || !location || !type) {
//     return res.status(400).json({ error: 'Missing required common fields' });
//   }

//   let item: ItemWithDetails;

//   switch (type) {
//     case ItemTypes.REAL_ESTATE: {
//       const { propertyType, area, rooms, price } = rest as RealEstateSpecific;

//       if (!propertyType || !area || !rooms || !price) {
//         return res.status(400).json({ error: 'Missing required fields for Real estate' });
//       }

//       item = {
//         id: itemsIdCounter(),
//         name,
//         description,
//         location,
//         type,
//         propertyType,
//         area,
//         rooms,
//         price,
//       };
//       break;
//     }

//     case ItemTypes.AUTO: {
//       const { brand, model, year, mileage } = rest as AutoSpecific;

//       if (!brand || !model || !year || !mileage) {
//         return res.status(400).json({ error: 'Missing required fields for Auto' });
//       }

//       item = {
//         id: itemsIdCounter(),
//         name,
//         description,
//         location,
//         type,
//         brand,
//         model,
//         year,
//         mileage,
//       };
//       break;
//     }

//     case ItemTypes.SERVICES: {
//       const { serviceType, experience, cost } = rest as ServiceSpecific;

//       if (!serviceType || !experience || !cost) {
//         return res.status(400).json({ error: 'Missing required fields for Services' });
//       }

//       item = {
//         id: itemsIdCounter(),
//         name,
//         description,
//         location,
//         type,
//         serviceType,
//         experience,
//         cost,
//       };
//       break;
//     }

//     default:
//       return res.status(400).json({ error: 'Invalid type' });
//   }

//   items.push(item);
//   res.status(201).json(item);
// });

// // Получение всех объявлений
// app.get('/items', (_req: Request, res: Response) => {
//   res.json(items);
// });

// // Получение объявления по его id
// app.get('/items/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id, 10);
//   const item = items.find((i) => i.id === id);

//   if (item) {
//     res.json(item);
//   } else {
//     res.status(404).send('Item not found');
//   }
// });

// // Обновление объявления по его id
// app.put('/items/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id, 10);
//   const item = items.find((i) => i.id === id);

//   if (item) {
//     Object.assign(item, req.body);
//     res.json(item);
//   } else {
//     res.status(404).send('Item not found');
//   }
// });

// // Удаление объявления по его id
// app.delete('/items/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id, 10);
//   const itemIndex = items.findIndex((i) => i.id === id);

//   if (itemIndex !== -1) {
//     items.splice(itemIndex, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send('Item not found');
//   }
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');

import express from 'express';
import bodyParser from 'body-parser';

const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
};

const app = express();
app.use(bodyParser.json());

// In-memory хранилище для объявлений
let items = [{ "1": "LOX"}];

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

export const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
