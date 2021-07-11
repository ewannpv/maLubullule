<template>
  <v-container class="main">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/86_background.jpeg')"
          contain
          height="600"
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            blanditiis placeat aliquid rerum ullam fugiat animi impedit sunt
            ipsa quas aperiam quisquam consequuntur itaque voluptatibus
            cupiditate minima dolor, maiores necessitatibus!
          </v-card-text>
          <v-card-actions>
            <v-btn text> Calculer </v-btn>
          </v-card-actions>
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
export default {
  name: "Home",
  computed: {
    alcoholsList() {
      return this.$store.getters.ALCOHOLS;
    },
  },
};
</script>
