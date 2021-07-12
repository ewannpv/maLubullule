<template>
  <v-container class="main">
    <v-row class="text-center">
      <v-col cols="12" class="mt-0">
        <v-img :src="require('../assets/86_background.png')" contain height="200" />
        <v-card class="mx-auto" color="secondary">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-2">
                Peter sa biere c'est bien, finir sa lubullule c'est mieux.
              </div>
              <div class="d-none d-lg-block d-print-block">
                <v-list-item-title class="text-h3">
                  MaLubullule
                </v-list-item-title>
                <v-list-item-subtitle>100% original.</v-list-item-subtitle>
              </div>
              <HomeForm />
              <HomeStats />
            </v-list-item-content>
          </v-list-item>
          <v-card-text> </v-card-text>
        </v-card>
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
import HomeForm from './HomeForm.vue';
import HomeStats from './HomeStats.vue';

export default {
  components: {
    HomeForm,
    HomeStats,
  },
};
</script>
