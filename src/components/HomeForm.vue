<template>
  <v-form>
    <v-container grid-list-md>
      <v-row align-center>
        <v-col cols="12" md="3">
          <v-select
            class="custom-select"
            v-model="selectedAlcohol"
            :hint="
              `
          ${selectedAlcohol ? selectedAlcohol.name : ''},
          ${selectedAlcohol ? selectedAlcohol.abv : ''}%,
          ${selectedAlcohol ? selectedAlcohol.volume : ''}cL`
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
            class="custom-select"
            v-model="category"
            :items="categories"
            item-text="displayName"
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
      this.calculateResult();
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
