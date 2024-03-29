import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      light: {
      },
      dark: {
        secondary: '#101C30',
        primary: '#115c96',
        info: colors.teal.lighten1,
        background: '#0b1423',
      },
    },
  },
});
