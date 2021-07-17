<template>
  <v-footer dark padless>
    <v-card flat tile class="secondary white--text text-center flex">
      <v-card-text>
          <a href="https://github.com/ewannpv">
            <i class="bi bi-github text-h5 mx-4 white--text"></i>
          </a>
          <a href="https://www.linkedin.com/in/ewann-pell%C3%A9/">
            <i class="bi bi-linkedin text-h5 mx-4 white--text"></i>
          </a>

      </v-card-text>
      <v-card-text class="white--text pt-0">
        <v-col cols="12">
          L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
        </v-col>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong> <a href="https://ewannpv.com/"> ewannpv.com</a></strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
</script>

<style>
a {
  color: inherit !important;
  text-decoration: inherit;
}
</style>
