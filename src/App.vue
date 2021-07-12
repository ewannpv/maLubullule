<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <div class="d-flex align-center">
        <h1>MaLubullule</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="#" text>
        <span class="mr-2">Taux</span>
        <v-icon>mdi-call-made</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<style scoped>
#app {
  background-color: var(--v-background-base);
}
</style>

<script>
import Home from './components/Home.vue';

export default {
  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
