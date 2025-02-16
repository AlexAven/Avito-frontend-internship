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
export type ItemType = (typeof ItemTypes)[keyof typeof ItemTypes] | 'Все';

// Тип статусов загрузки с сервера
export type LoadingStatus = 'idle' | 'loading' | 'rejected' | 'received';

// Интерфейс фильтров для категории "Недвижимость"
export interface RealEstateFilters {
  propertyType: string; // Тип недвижимости
  minArea: number;
  maxArea: number;
  rooms: number; // Кол-во комнат (неотрицательное число)
  minPrice: number;
  maxPrice: number;
}

// Интерфейс фильтров для категории "Авто"
export interface AutoFilters {
  brand: string;
  model: string;
  minYear: number;
  maxYear: number;
  minMileage: number;
  maxMileage: number;
}

// Интерфейс фильтров для категории "Услуги"
export interface ServiceFilters {
  serviceType: string;
  minExperience: number;
  maxExperience: number;
  minCost: number;
  maxCost: number;
}

// Тип для фильтрв общий
export type FiltersState = {
  [ItemTypes.REAL_ESTATE]: RealEstateFilters;
  [ItemTypes.AUTO]: AutoFilters;
  [ItemTypes.SERVICES]: ServiceFilters;
};

// Краткий тип товаров для карточки
export interface Item {
  id?: number;
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
  mileage: number;
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
  status: LoadingStatus;
  error: string | null;
  ui: {
    status: LoadingStatus;
    message: null | string;
    error: null | string;
  };
}

// Стейт текущего объявления
export interface CurrentItemState {
  currentItem: ItemWithDetails | null;
  status: LoadingStatus;
  error: string | null;
}

// Стейт фильтров
export interface ControlsState {
  search: string;
  category: SwitcherType;
  filters: FiltersState;
}

// Стейт пагинации
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

// Типизация экстрааргументов для AsyncThunk
export interface ExtraArgument {
  client: AxiosInstance;
  api: typeof import('../api/api');
}

// Типизация переключателя категории
export type SwitcherType = ItemType;

// Типизация стора
export type Store = {
  items: ItemState;
  controls: ControlsState;
  details: CurrentItemState;
  pagination: PaginationState;
};
