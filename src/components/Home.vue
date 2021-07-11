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
                      color="secondary"
                      v-model="selectedAlcohol"
                      :hint="`
                      ${selectedAlcohol ? selectedAlcohol.name : ''}, 
                      ${selectedAlcohol ? selectedAlcohol.abv : ''}%, 
                      ${selectedAlcohol ? selectedAlcohol.volume : ''}L`"
                      :items="alcoholsList"
                      item-text="name"
                      label="Brevage"
                      @change="
                        updateCurrentAlcohol(selectedAlcohol.id);
                        calculateResult();
                      "
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="secondary"
                      v-model="volume"
                      hint="Volume total en Litre"
                      label="Volume (L)"
                      @change="calculateResult"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      color="secondary"
                      v-model="weight"
                      hint="Ton poids en Kg."
                      label="Poids (kg)"
                      @change="calculateResult"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-subheader> Genre : </v-subheader>
                      <v-switch
                        class="mt-2"
                        color="secondary"
                        v-model="sex"
                        @change="calculateResult"
                        :label="`${sex ? 'Homme' : 'Femme'}`"
                      ></v-switch>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" class="text-start">
                    <v-list-item class="pl-0 text-h6" two-line>
                      <v-list-item-content>
                        <v-list-item-title
                          >Taux d’alcoolémie :
                          <b> {{ alcoholLevel }}g/L </b>
                          <v-list-item-subtitle
                            >Seuil légale : 0.5g/L</v-list-item-subtitle
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pl-0 text-h6">
                      <v-list-item-content>
                        <v-list-item-title
                          >Gramme d’alcools ingérés :
                          <b> {{ alcoholAbsorbed }}g </b>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pl-0 text-h6">
                      <v-list-item-content>
                        <v-list-item-title
                          >Temps éstimé pour atteindre le seuil légale :
                          <b> {{ estimatedTime }}min </b>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-col cols="12"
                      ><h2>Taux d'alcoolémie / Limite Légale</h2></v-col
                    >
                    <v-progress-circular
                      :rotate="360"
                      :size="200"
                      :width="15"
                      :value="circleValue"
                      color="secondary"
                      ><h1>{{ circleValue }}%</h1>
                    </v-progress-circular>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>

<script>
export default {
  name: "Home",
  data() {
    return {
      selectedAlcohol: null,
      weight: 70,
      sex: true,
      volume: 0,
      shouldDispayResults: false,
    };
  },
  mounted() {
    this.selectedAlcohol = this.$store.getters.CURRENT_ALCOHOL;
    this.volume = this.selectedAlcohol.volume;
    this.calculateResult();
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
    stats() {
      return this.$store.getters.STATS;
    },
    alcoholLevel() {
      if (!this.stats) return 0;
      return this.stats.alcoholLevel.toFixed(4);
    },
    alcoholAbsorbed() {
      if (!this.stats) return 0;
      return this.stats.alcoholAbsorbed;
    },
    circleValue() {
      if (!this.stats) return 0;
      return parseInt((this.stats.alcoholLevel / 0.5) * 100);
    },
    estimatedTime() {
      if (!this.stats) return "0";
      let minutes = this.stats.estimatedTime;
      const hours = parseInt(minutes / 60);
      minutes %= 60;
      return hours + "h" + minutes;
    },
  },
  methods: {
    updateCurrentAlcohol(id) {
      this.$store.dispatch("UPDATE_CURRENT_ALCOHOL", id);
      this.volume = this.currentAlcohol.volume;
    },
    checkFields() {
      return true;
    },
    calculateResult() {
      if (this.checkFields()) {
        this.$store.dispatch("UPDATE_STATS", {
          volume: this.volume,
          weight: this.weight,
          sex: this.sex,
        });
      } else {
        // TODO
      }
    },
  },
};
</script>
