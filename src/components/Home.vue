<template>
  <v-container class="main">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/86_background.jpeg')"
          contain
          height="250"
        />
        <v-card class="mx-auto" color="primary">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                Peter sa biere c'est bien, finir sa lubullule c'est mieux.
              </div>
              <v-list-item-title class="text-h1 mb-1">
                MaLubullule
              </v-list-item-title>
              <v-list-item-subtitle>100% original.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            <v-form>
              <v-container grid-list-md>
                <v-row align="center">
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="selectedAlcohol"
                      :hint="`${selectedAlcohol.name}, ${selectedAlcohol.abv}%, ${selectedAlcohol.volume}L`"
                      :items="alcoholsList"
                      item-text="name"
                      label="Brevage"
                      @change="updateCurrentAlcohol(selectedAlcohol.id)"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="volume"
                      hint="Volume total en Litre"
                      label="Volume"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="weight"
                      hint="Ton poids en Kg."
                      label="Poids"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn block color="secondary" @click="calculateResult"> Calculer </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6"> afficher le taux etc ici. </v-col>
                  <v-col cols="12" sm="6">
                    <v-progress-circular
                      :rotate="360"
                      :size="200"
                      :width="15"
                      :value="circleValue"
                      color="teal"
                      ><h1>{{ circleValue }}</h1>
                    </v-progress-circular>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="mb-4 my-3">
        <h1 class="display-2 font-weight-bold mb-3">Nos brevages</h1>
        <v-col
          v-for="(item, i) in alcoholsList"
          :key="i"
          class="subheading mx-3"
          target="_blank"
        >
          <v-row justify="center">
            <h3>{{ item.name }}</h3>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>

<script>
import Alcohol from "../store/alcohol";

export default {
  name: "Home",
  data() {
    return {
      selectedAlcohol: new Alcohol("placeolder", 0, 0),
      volume: 0,
      weight: 70,
      circleValue: 0,
      shouldDispayResults: false,
    };
  },
  mounted() {
    this.selectedAlcohol = this.$store.getters.CURRENT_ALCOHOL;
    this.volume = this.selectedAlcohol.volume;
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    alcoholsList() {
      return this.$store.getters.ALCOHOLS;
    },
    currentAlcohol() {
      return this.$store.getters.CURRENT_ALCOHOL;
    },
  },
  methods: {
    updateCurrentAlcohol(id) {
      this.$store.dispatch("UPDATE_CURRENT_ALCOHOL", id);
      this;
    },
    calculateResult() {
      this.circleValue = 75;
    },
  },
};
</script>
