// import { PORT } from './app.js';

const PORT = 3000;

const API_URL = 'https://localhost';

export const BASE_URL = `${API_URL}:${PORT}/`;

export const ALL_ITEMS = BASE_URL + 'items/';

export const itemById = (itemId: number) => ALL_ITEMS + itemId;
