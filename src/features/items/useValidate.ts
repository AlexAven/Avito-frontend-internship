/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { ItemTypes, ItemType } from '../../types';

// Кастомный хук валидации формы
const useValidate = () => {
  // Схема валидации для первого шага
  const stepOneSchema = yup.object().shape({
    name: yup.string().required('Укажите название объявления'),
    description: yup.string().required('Напишите описание'),
    location: yup.string().required('Укажите адрес'),
    type: yup.string().required('Укажите категорию'),
    image: yup.string().url('Укажите валидную ссылку на фото').notRequired(),
  });

  // Схема валидации для второго шага
  const stepTwoSchema: Record<ItemType, yup.ObjectSchema<any>> = {
    // Валидация для категории "Недвижимость"
    [ItemTypes.REAL_ESTATE]: yup.object().shape({
      propertyType: yup.string().required('Выберите тип недвижимости'),
      area: yup.number().positive('Площадь должна быть больше 0').required('Укажите площадь'),
      rooms: yup.number().required('Укажите количество комнат').min(1, 'Минимум 1 комната'),
      price: yup.number().positive('Цена должна быть больше 0').required('Укажите цену'),
    }),
    // Валидация для категории "Авто"
    [ItemTypes.AUTO]: yup.object().shape({
      brand: yup.string().required('Укажите марку авто'),
      model: yup.string().required('Укажите модель авто'),
      year: yup
        .number()
        .required('Укажите год выпуска авто')
        .integer()
        .min(1800, 'Год выпуска должен быть больше 1800')
        .max(new Date().getFullYear(), 'Год выпуска не может быть больше текущего'),
      mileage: yup
        .number()
        .required('Укажите пробег авто')
        .min(0, 'Пробег не может быть меньше нуля'),
    }),
    // Валидация для категории "Услуги"
    [ItemTypes.SERVICES]: yup.object().shape({
      serviceType: yup.string().required('Укадите тип услуги'),
      experience: yup
        .number()
        .min(0, 'Опыт работы не может быть меньше 0')
        .required('Укажите количество лет опыта'),
      cost: yup.number().positive('Укажите корректную цену').required('Цена обязательна'),
      workSchedule: yup.string().notRequired(),
    }),
  };

  return { stepOneSchema, stepTwoSchema };
};

export default useValidate;
