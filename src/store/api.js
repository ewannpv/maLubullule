import Alcohol from './alcohol';
import Category from './category';

const fetch = require('node-fetch');

const categoriesURL = 'https://spreadsheets.google.com/feeds/list/1epQ281j0OEPEc-UD4_8zpWBcun1f_iQvRXHGcRmJvks/2/public/values?alt=json';
const alcoholsURL = 'https://spreadsheets.google.com/feeds/list/1epQ281j0OEPEc-UD4_8zpWBcun1f_iQvRXHGcRmJvks/1/public/values?alt=json';

const fetchSettings = { method: 'Get' };

// Fetchs categories from the Google sheet.
export const FetchCategories = (context) => {
  fetch(categoriesURL, fetchSettings)
    .then((res) => res.json())
    .then((json) => {
      const categories = [];
      const rows = json.feed.entry;

      rows.forEach((row) => {
        const name = row.gsx$name.$t;
        const displayName = row.gsx$displayedname.$t;
        const category = new Category(name, displayName);
        categories.push(category);
      });
      context.commit('SET_CATEGORIES', categories);
    });
};

// Fetchs alcohols from the Google sheet.
export const FetchAlcohols = (context) => {
  fetch(alcoholsURL, fetchSettings)
    .then((res) => res.json())
    .then((json) => {
      const alcohols = [];
      const rows = json.feed.entry;

      rows.forEach((row) => {
        const name = row.gsx$name.$t;
        const abv = row.gsx$abv.$t;
        const volume = row.gsx$volume.$t;
        const categories = [];
        for (let i = 1; i <= 5; i += 1) {
          const index = 'gsx$category'.concat(i);
          const category = row[index].$t;
          if (category) { categories.push(category); }
        }
        const alcohol = new Alcohol(name, abv, volume, categories);
        alcohols.push(alcohol);
      });
      context.commit('SET_ALCOHOLS', alcohols);
    });
};
