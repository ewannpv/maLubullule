import Alcohol, { customAlcohols } from './alcohol';
import Category from './category';

const database = require('./database.json');

const GetCategories = () => {
  const categoriesList = [];
  database.categories.forEach((item) => {
    const category = new Category(item[0], item[1]);
    categoriesList.push(category);
  });
  return categoriesList;
};

const GetAlcohols = () => {
  const alcoholsList = [];
  database.alcohols.forEach((item) => {
    const alcohol = new Alcohol(item[0], item[1], item[2], item[3]);
    alcoholsList.push(alcohol);
  });
  return [...alcoholsList, ...customAlcohols];
};

export const categories = GetCategories();
export const alcohols = GetAlcohols();
