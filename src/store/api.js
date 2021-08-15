import Alcohol from './alcohol';
import Category from './category';

const fetch = require('node-fetch');

const categoriesURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRB--rin5NSwuZmC22WhPbkKquV2HLrJ_RwGdSvFLtZd93hP-1e8A9Dfo3h6FQAQLHKYSZwpxyz2Tmz/pub?gid=1842611777&single=true&output=csv';
const alcoholsURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRB--rin5NSwuZmC22WhPbkKquV2HLrJ_RwGdSvFLtZd93hP-1e8A9Dfo3h6FQAQLHKYSZwpxyz2Tmz/pub?gid=1048684850&single=true&output=csv';

const fetchSettings = { method: 'Get' };

// Fetchs categories from the Google sheet.
export const FetchCategories = (context) => {
  fetch(categoriesURL, fetchSettings)
    .then((res) => res.text()).then((csv) => {
      const categories = [];
      const rows = csv.split(/\n/).map((item) => item.trim());
      rows.shift();

      rows.forEach((row) => {
        const columns = row.split(',');
        const name = columns[0];
        const displayName = columns[1];
        const category = new Category(name, displayName);
        categories.push(category);
      });
      context.commit('SET_CATEGORIES', categories);
    });
};

// Fetchs alcohols from the Google sheet.
export const FetchAlcohols = (context) => {
  fetch(alcoholsURL, fetchSettings)
    .then((res) => res.text()).then((csv) => {
      const alcohols = [];
      const rows = csv.split(/\n/).map((item) => item.trim());
      rows.shift();

      rows.forEach((row) => {
        const columns = row.split(',');
        const name = columns[0];
        const abv = columns[1];
        const volume = columns[2];
        const categories = [];
        for (let i = 3; i <= 7; i += 1) {
          const category = columns[i];
          if (!category) { break; }
          categories.push(category);
        }
        const alcohol = new Alcohol(name, abv, volume, categories);
        alcohols.push(alcohol);
      });
      context.commit('SET_ALCOHOLS', alcohols);
    });
};
