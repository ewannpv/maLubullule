<template>
  <v-form>
  <v-container grid-list-md>
    <v-row align="center">
      <v-col cols="12" lg="3">
        <v-select
          class="custom-select"
          v-model="selectedAlcohol"
          :hint="`
          ${selectedAlcohol ? selectedAlcohol.name : ''},
          ${selectedAlcohol ? selectedAlcohol.abv : ''}%,
          ${selectedAlcohol ? selectedAlcohol.volume : ''}L`"
          :items="displayedAlcohols"
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
      <v-col cols="12" lg="3">
        <v-select
          class="custom-select"
          v-model="category"
          :items="categories"
          item-text="displayName"
          label="Catégorie"
          persistent-hint
          return-object
          @change="updateDisplayedAlcohols(category)"
          single-line
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="volume"
          hint="Volume total en Litre"
          label="Volume (L)"
          @change="calculateResult"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
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
            v-model="sex"
            @change="calculateResult"
            :label="`${sex ? 'Homme' : 'Femme'}`"
          ></v-switch>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</v-form>
</template>

<script>
export default {
  data() {
    return {
      selectedAlcohol: null,
      weight: 70,
      sex: true,
      volume: 0,
      displayedAlcohols: [],
      category: null,
    };
  },
  mounted() {
    this.selectedAlcohol = this.currentAlcohol;
    [this.category] = this.categories;
    this.updateDisplayedAlcohols(this.category);
    this.calculateResult();
  },
  name: 'HomeForm',
  computed: {
    alcoholsList() {
      return this.$store.getters.ALCOHOLS;
    },
    currentAlcohol() {
      return this.$store.getters.CURRENT_ALCOHOL;
    },
    categories() {
      return this.$store.getters.CATEGORIES;
    },
  },
  methods: {
    updateCurrentAlcohol(id) {
      this.$store.dispatch('UPDATE_CURRENT_ALCOHOL', id);
      this.volume = this.currentAlcohol.volume;
    },
    updateDisplayedAlcohols(category) {
      this.displayedAlcohols = this.alcoholsList.filter(
        (alcohol) => alcohol.categories.filter((item) => item === category.name).length,
      );
      if (this.displayedAlcohols.length > 0) {
        [this.selectedAlcohol] = this.displayedAlcohols;
        this.displayedAlcohols.sort((a, b) => a.name.localeCompare(b.name));
        this.updateCurrentAlcohol(this.selectedAlcohol.id);
      }
      this.calculateResult();
    },

    checkFields() {
      // TODO.
      return true;
    },
    calculateResult() {
      if (this.checkFields()) {
        this.$store.dispatch('UPDATE_STATS', {
          volume: this.volume,
          weight: this.weight,
          sex: this.sex,
        });
      } else {
        // TODO.
      }
    },
  },
};
</script>

<style>

</style>
