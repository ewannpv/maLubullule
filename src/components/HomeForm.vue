<template>
  <v-form>
    <v-container grid-list-md>
      <v-row align-center>
        <v-col cols="12" md="3">
          <v-text-field
            v-if="customCategorySelected"
            v-model="customAbv"
            persistent-hint
            hint="Degré d'alcool du brevage"
            @change="updateCustomBrevage">
            </v-text-field>
          <v-select
            v-else
            v-model="selectedAlcohol"
            :hint="
              `
          ${selectedAlcohol ? selectedAlcohol.name : ''},
          ${selectedAlcohol ? selectedAlcohol.abv : ''}%`
            "
            :items="displayedAlcohols"
            item-text="name"
            label="Brevage"
            @change="updateCurrentAlcohol(selectedAlcohol.id)"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="category"
            :items="categories"
            item-text="displayedName"
            label="Catégorie"
            persistent-hint
            hint="Catégorie du brevage"
            return-object
            @change="updateDisplayedAlcohols(category)"
            single-line
          ></v-select>
        </v-col>
        <v-col cols="12" lg="3" md="6">
          <v-text-field
            v-model="volume"
            persistent-hint
            hint="Volume d'une dose (cL)"
            @change="calculateResult"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3">
          <v-row align-center>
            <v-col>
              <v-btn class="mx-2" outlined color="primary" @click="decreaseDoses">
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
            </v-col>
            <v-col class="mt-2">
              {{ doses }}
              <v-icon dark>
                mdi-glass-tulip
              </v-icon>
            </v-col>
            <v-col>
              <v-btn class="mx-2" outlined color="primary" @click="increaseDoses">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="3" md="6">
          <v-text-field
            v-model="weight"
            hint="Ton poids en Kg."
            label="Poids (kg)"
            @change="calculateResult"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="6">
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
      doses: 1,
      selectedAlcohol: null,
      customAbv: 15,
      weight: 70,
      sex: true,
      volume: 0,
      displayedAlcohols: [],
      category: null,
    };
  },
  mounted() {
    this.$store.dispatch('FETCH_CATEGORIES');
    this.$store.dispatch('FETCH_ALCOHOLS');
  },
  computed: {
    dataFetched() {
      return this.$store.getters.DATAFETCHED;
    },
    alcoholsList() {
      return this.$store.getters.ALCOHOLS;
    },
    currentAlcohol() {
      return this.$store.getters.CURRENT_ALCOHOL;
    },
    categories() {
      return this.$store.getters.CATEGORIES;
    },
    customCategorySelected() {
      if (!this.category) { return false; }
      return this.category.name === 'custom';
    },
  },
  watch: {
    dataFetched() {
      this.selectedAlcohol = this.currentAlcohol;
      [this.category] = this.categories;
      this.updateDisplayedAlcohols(this.category);
      this.calculateResult();
    },
  },
  methods: {
    updateCurrentAlcohol(id) {
      this.$store.dispatch('UPDATE_CURRENT_ALCOHOL', id);
      this.$gtag.event('update_alcohol', { alcohol: this.currentAlcohol.name });

      this.volume = this.currentAlcohol.volume;
      this.calculateResult();
    },
    updateCustomBrevage() {
      this.$store.dispatch('UPDATE_CUSTOM_ALCOHOL', this.customAbv);
      this.$gtag.event('update_alcohol', { alcohol: `custom: ${this.customAbv.toString}` });
      this.volume = this.currentAlcohol.volume;
      this.calculateResult();
    },

    updateDisplayedAlcohols(category) {
      this.$gtag.event('update_category', { category: category.name });

      this.displayedAlcohols = this.alcoholsList.filter(
        (alcohol) => alcohol.categories.filter((item) => item === category.name).length,
      );
      if (this.displayedAlcohols.length > 0 && category.name !== 'custom') {
        [this.selectedAlcohol] = this.displayedAlcohols;
        this.displayedAlcohols.sort((a, b) => a.name.localeCompare(b.name));
        this.updateCurrentAlcohol(this.selectedAlcohol.id);
      } else { this.updateCustomBrevage(); }

      this.calculateResult();
    },
    increaseDoses() {
      this.doses += 1;
      this.calculateResult();
    },
    decreaseDoses() {
      if (this.doses < 2) {
        this.doses = 1;
      } else {
        this.doses -= 1;
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
          volume: this.volume * this.doses,
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

<style></style>
