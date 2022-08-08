<template>
  <v-container grid-list-md>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" lg="6" class="text-start" align="center" justify="center">
        <v-list-item class="pl-0 text-h3">
          <v-list-item-content>
            <v-list-item-subtitle>Informations</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pl-0 text-h6" two-line>
          <v-list-item-content>
            <v-list-item-title class="wrapped-item"
              >Taux d’alcoolémie :
              <b> {{ alcoholLevel }}g/L </b>
              <v-list-item-subtitle class="wrapped-item">Seuil légal : 0.5g/L</v-list-item-subtitle>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pl-0 text-h6">
          <v-list-item-content>
            <v-list-item-title class="wrapped-item"
              >Gramme d’alcools ingérés :
              <b> {{ alcoholAbsorbed }}g </b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pl-0 text-h6">
          <v-list-item-content>
            <v-list-item-title class="wrapped-item"
              >Temps estimé pour atteindre le seuil légal :
              <b> {{ estimatedTime }}min </b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-divider vertical class="d-none d-lg-block d-print-block mt-6"></v-divider>
      <v-col cols="12" lg="6" align="center" justify="center">
        <v-col cols="12">
          <v-progress-circular
            :rotate="360"
            :size="200"
            :width="15"
            :value="circleValue"
            v-bind:color="colorCircle"
            ><h1>{{ circleValue }}%</h1>
          </v-progress-circular>
        </v-col>
        <v-col cols="12">
          <p class="text-subtitle-2 text-center m-0">
            Taux d'alcoolémie / Limite Légale
          </p>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.wrapped-item {
  white-space: normal;
}
</style>

<script>
const colorHelper = require('./ColorHelper');

export default {
  computed: {
    // Stats that stores informations to display.
    stats() {
      return this.$store.getters.STATS;
    },
    // Float that stores the alcohol level in in g/L.
    alcoholLevel() {
      if (!this.stats) return 0;
      return this.stats.alcoholLevel.toFixed(4);
    },
    // Flat that stores the amount of alcohol absorbed in grams.
    alcoholAbsorbed() {
      if (!this.stats) return 0;
      return this.stats.alcoholAbsorbed.toFixed(2);
    },
    colorCircle() {
      const value = this.stats ? this.stats.alcoholPercent : 0;
      return colorHelper.customColor(value).class;
    },
    // Int that stores the Alcohol leved divided by thethe legal threshold.
    circleValue() {
      if (!this.stats) return 0;
      return this.stats.alcoholPercent;
    },
    // String that stores the amount of time to reach the the legal threshold.
    estimatedTime() {
      if (!this.stats) return '0';
      let minutes = this.stats.estimatedTime;
      const hours = parseInt(minutes / 60, 10);
      minutes %= 60;
      return `${hours}h${minutes}`;
    },
  },
};
</script>

<style></style>
