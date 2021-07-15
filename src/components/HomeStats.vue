<template>
<v-container grid-list-md>

  <v-row>
    <v-col cols="12" sm="6" class="text-start">
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
    <v-col cols="12" sm="6">
      <v-col cols="12"><h2>Taux d'alcoolémie / Limite Légale</h2></v-col>
      <v-progress-circular
        :rotate="360"
        :size="200"
        :width="15"
        :value="circleValue"
        v-bind:color='colorCircle'
        ><h1>{{ circleValue }}%</h1>
      </v-progress-circular>
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
export default {
  computed: {
    // Object that stores informations to display.
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
    // Int that stores the Alcohol leved divided by thethe legal threshold.
    circleValue() {
      if (!this.stats) return 0;
      return parseInt((this.stats.alcoholLevel / 0.5) * 100, 10);
    },
    // String that stores the amount of time to reach the the legal threshold.
    estimatedTime() {
      if (!this.stats) return '0';
      let minutes = this.stats.estimatedTime;
      const hours = parseInt(minutes / 60, 10);
      minutes %= 60;
      return `${hours}h${minutes}`;
    },
    // Color that stores the current color of the circle according to the circleValue.
    colorCircle() {
      switch (true) {
        case (this.circleValue < 50): return 'green';
        case (this.circleValue < 75): return 'green darken-2';
        case (this.circleValue < 90): return 'orange darken-1';
        case (this.circleValue < 100): return 'deep-orange';
        case (this.circleValue < 200): return 'red darken-1';
        case (this.circleValue < 300): return 'pink darken-1';
        case (this.circleValue < 400): return 'purple darken-1';
        case (this.circleValue < 500): return 'deep-purple darken-1';
        case (this.circleValue < 600): return 'indigo darken-1';
        default:
          return 'blue darken-1';
      }
    },
  },
};
</script>

<style></style>
