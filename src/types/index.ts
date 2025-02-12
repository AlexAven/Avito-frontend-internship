import { AxiosInstance } from 'axios';

// Типизация пропса children
export interface ChildrenProps {
  children: React.ReactNode;
}

// Общий интерфейс объявления
export const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
} as const;

// Типы объявлений как строковые литералы
export type ItemType = (typeof ItemTypes)[keyof typeof ItemTypes];

// Краткий тип товаров для карточки
export interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  type: ItemType;
  image?: string;
}

// Интерфейс для типа "Недвижимость"
export interface RealEstateSpecific {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

// Интерфейс для типа "Авто"
export interface AutoSpecific {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

// Интерфейс для типа "Услуги"
export interface ServiceSpecific {
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

// Обобщенный тип объявления
export type ItemWithDetails = Item & (RealEstateSpecific | AutoSpecific | ServiceSpecific);

// Стейт объявлений
export interface ItemState {
  entities: { [key: number]: ItemWithDetails };
  ids: number[];
  status: 'idle' | 'loading' | 'rejected' | 'received';
  error: string | null;
}

// Стейт текущего объявления
export interface CurrentItemState {
  currentItem: ItemWithDetails | null;
  status: 'idle' | 'loading' | 'rejected' | 'received';
  error: string | null;
}

// Стейт фильтров
export interface ControlsState {
  search: string;
  category: SwitcherType;
}

// Типизация экстрааргументов для AsyncThunk
export interface ExtraArgument {
  client: AxiosInstance;
  api: typeof import('../api/api');
}

// Типизация переключателя категории
export type SwitcherType = 'Недвижимость' | 'Авто' | 'Услуги' | 'Все';

// Типизация стора
export type Store = {
  items: ItemState;
  controls: ControlsState;
  details: CurrentItemState;
};
