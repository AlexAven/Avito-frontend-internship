/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem, updateItem } from '../items/itemsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { ItemWithDetails } from '../../types';

const useCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentItem = useAppSelector((state) => state.details.currentItem);
  const currentTitle = currentItem ? 'Редактирование объявления' : 'Создание объявления';

  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Создание начальной формы для заполнения
  const initialValues = currentItem || {
    name: '',
    description: '',
    location: '',
    type: '',
    image: '',
    propertyType: '',
    area: '',
    rooms: '',
    price: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    serviceType: '',
    experience: '',
    cost: '',
    workSchedule: '',
  };

  // Хелпер для создания объекта с заполненными значениями свойств
  const getCategorizedObject = (obj: any): Record<string, any> => {
    const resultObject: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value) resultObject[key] = value;
    }
    return resultObject;
  };

  useEffect(() => {
    if (currentItem) {
      setSelectedCategory(currentItem.type);
      setStep(2);
    }
  }, [currentItem]);

  // Обработчик действий в зависимости от шага создания объявления
  const handleSubmit = (values: any) => {
    if (step === 1) {
      setStep(2);
    } else {
      if (currentItem) {
        dispatch(updateItem(values));
      } else {
        const ItemToDispatch: ItemWithDetails = getCategorizedObject(values) as ItemWithDetails;
        dispatch(createItem(ItemToDispatch));
      }
      navigate('/list');
    }
  };

  // Обработчик кнопки "Назад"
  const handleReturn = () => {
    if (currentItem) {
      navigate(-1);
    } else {
      setStep(1);
    }
  };

  return {
    currentTitle,
    selectedCategory,
    setSelectedCategory,
    initialValues,
    handleSubmit,
    handleReturn,
    step,
  };
};

export default useCreate;
