<template>
  <v-container class="main">
    <v-row class="text-center">
      <v-col cols="12" class="mt-0">
        <v-img :src="require('../assets/logo_title.svg')" contain height="200" />
        <v-card color="secondary" elevation="10" class="mt-2" v-bind:style="borderStyle">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-2">
                Peter sa biere c'est bien, finir sa lubullule c'est mieux.
              </div>
              <div class="d-none d-lg-block d-print-block">
                <v-list-item-subtitle class="text-center">100% original.</v-list-item-subtitle>
              </div>
              <HomeForm />
              <HomeStats />
            </v-list-item-content>
          </v-list-item>
          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Footer></Footer>
  </v-container>
</template>

<script>
import HomeForm from './HomeForm.vue';
import HomeStats from './HomeStats.vue';
import Footer from './Footer.vue';

const helper = require('./helper');

export default {
  components: {
    HomeForm,
    HomeStats,
    Footer,
  },
  computed: {
    // Stats that stores informations to display.
    stats() {
      return this.$store.getters.STATS;
    },
    borderStyle() {
      // If customBorder is disabled, return empty property.
      if (!this.$store.getters.SETTINGS.customBorder) return {};
      const value = this.stats ? this.stats.alcoholPercent : 0;
      return {
        'border-color': `${helper.customColor(value).color}!important`,
        border: `2px solid ${helper.customColor(value).color}!important`,
      };
    },
  },
};
</script>
