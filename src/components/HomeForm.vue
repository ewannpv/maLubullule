<template>
  <v-form>
    <v-container grid-list-md>
      <v-row align-center>
        <v-col cols="12" lg="3">
          <v-select
            v-model="categoryModel"
            :items="categories"
            item-text="displayedName"
            label="Catégorie"
            persistent-hint
            hint="Catégorie du brevage"
            return-object
            @change="updateDisplayedAlcohols(categoryModel)"
            single-line
          ></v-select>
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            v-if="customCategorySelected"
            type="number"
            v-model.number="customAbv"
            persistent-hint
            hint="Degré d'alcool du brevage"
            @change="updateCustomBrevage"
          >
          </v-text-field>
          <v-select
            v-else
            v-model="alcoholModel"
            :hint="
              `
          ${alcoholModel ? alcoholModel.name : ''},
          ${alcoholModel ? alcoholModel.abv : ''}%`
            "
            :items="displayedAlcohols"
            item-text="name"
            label="Brevage"
            @change="updateCurrentAlcohol(alcoholModel.id)"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-col>
        <v-col cols="12" lg="3" md="6">
          <v-text-field
          type="number"
            v-model.number="volume"
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
          type="number"
            v-model.number="weight"
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
      // Int that stores the number of doses.
      doses: 1,
      // Alcohol used as a model to get the selected alcohol.
      alcoholModel: null,
      // Float that stores the custom abv.
      customAbv: 15,
      // Float that stores the weight of the user.
      weight: 70,
      // Boolean that stores the sex of the user.
      sex: true,
      // Float that stores the volume of one dose.
      volume: 0,
      // [Alcohol] that stores alcohols from the selected category.
      displayedAlcohols: [],
      // Categpru used as a model to get the selected category.
      categoryModel: null,
    };
  },
  mounted() {
    this.$store.dispatch('FETCH_CATEGORIES');
    this.$store.dispatch('FETCH_ALCOHOLS');
  },
  computed: {
    // Boolean used to know when datas have been feteched.
    dataFetched() {
      return this.$store.getters.DATAFETCHED;
    },
    // [Alcohol] used to store fetched alcohols.
    alcoholsList() {
      return this.$store.getters.ALCOHOLS;
    },
    // Alcohol used to store the selected alcohol.
    currentAlcohol() {
      return this.$store.getters.CURRENT_ALCOHOL;
    },
    // [Category] used to store fetched categories.
    categories() {
      return this.$store.getters.CATEGORIES;
    },
    // Boolean used to know if the custom category is selected.
    customCategorySelected() {
      if (!this.categoryModel) {
        return false;
      }
      return this.categoryModel.name === 'custom';
    },
  },
  watch: {
    // Checks if datas have been fetched then loads stats.
    dataFetched() {
      this.alcoholModel = this.currentAlcohol;
      [this.categoryModel] = this.categories;
      this.updateDisplayedAlcohols(this.categoryModel);
      this.calculateResult();
    },
  },
  methods: {
    // Updates the current selected alcohol according to the given id and updates stats.
    updateCurrentAlcohol(id) {
      this.$store.dispatch('UPDATE_CURRENT_ALCOHOL', id);
      this.$gtag.event('update_alcohol', { alcohol: this.currentAlcohol.name });

      this.volume = this.currentAlcohol.volume;
      this.calculateResult();
    },
    // Updates the given custom brevage and updates stats.
    updateCustomBrevage() {
      this.$gtag.event('update_alcohol', { alcohol: `custom: ${this.customAbv}` });

      this.$store.dispatch('UPDATE_CUSTOM_ALCOHOL', this.customAbv);
      this.volume = this.currentAlcohol.volume;
      this.calculateResult();
    },
    // Updates displayed alcohols accoring to the new selected category.
    updateDisplayedAlcohols(category) {
      this.$gtag.event('update_category', { category: category.name });

      // Sort alcohols alphabetically.
      this.displayedAlcohols = this.alcoholsList.filter(
        (alcohol) => alcohol.categories.filter((item) => item === category.name).length,
      );

      // If the custom category is choosed we don't need to update displayed alcohols,
      // we need to update the custom brevage instead.
      if (this.displayedAlcohols.length > 0 && category.name !== 'custom') {
        [this.alcoholModel] = this.displayedAlcohols;
        this.displayedAlcohols.sort((a, b) => a.name.localeCompare(b.name));
        this.updateCurrentAlcohol(this.alcoholModel.id);
      } else {
        this.updateCustomBrevage();
      }
    },
    // Increases the number of doses.
    increaseDoses() {
      this.doses += 1;
      this.calculateResult();
    },
    // Decrease the number of doses.
    decreaseDoses() {
      if (this.doses < 2) {
        this.doses = 1;
      } else {
        this.doses -= 1;
      }
      this.calculateResult();
    },
    // Checks if all fields are correct.
    checkFields() {
      if (this.customCategorySelected && !Number.isNaN(this.customAbv)) return false;
      return !Number.isNaN(this.volume) || !Number.isNaN(this.height) || !Number.isNaN(this.doses);
    },
    // Updates the current stats according to the given inputs.
    calculateResult() {
      if (this.checkFields()) {
        this.$store.dispatch('UPDATE_STATS', {
          volume: this.volume * this.doses,
          weight: this.weight,
          sex: this.sex,
        });
      } else {
        this.volume = 5;
        this.customAbv = 0;
        this.weight = 70;
        this.doses = 1;
        this.calculateResult();
      }
    },
  },
};
</script>

<style></style>
