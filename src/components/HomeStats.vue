<template>
<v-container grid-list-md>

  <v-row>
    <v-col cols="12" sm="6">
      <v-col cols="12"><h2>Taux d'alcoolémie / Limite Légale</h2></v-col>
      <v-progress-circular
        :rotate="360"
        :size="200"
        :width="15"
        :value="circleValue"
        color="primary"
        ><h1>{{ circleValue }}%</h1>
      </v-progress-circular>
    </v-col>
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
  </v-row>
</v-container>
</template>

<style scoped>
.wrapped-item {
  white-space: normal;
}

.custom-select > .v-list-item__title {
  color: darkseagreen !important;
}
</style>

<script>
export default {
  computed: {
    stats() {
      return this.$store.getters.STATS;
    },
    alcoholLevel() {
      if (!this.stats) return 0;
      return this.stats.alcoholLevel.toFixed(4);
    },
    alcoholAbsorbed() {
      if (!this.stats) return 0;
      return this.stats.alcoholAbsorbed.toFixed(2);
    },
    circleValue() {
      if (!this.stats) return 0;
      return parseInt((this.stats.alcoholLevel / 0.5) * 100, 10);
    },
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
