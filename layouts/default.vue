<template>
  <v-app>

    <!--<v-app-bar absolute color="blue-grey lighten-5" elevate-on-scroll dense>
      <v-app-bar-nav-icon class=""></v-app-bar-nav-icon>


      <v-spacer></v-spacer>

      <v-btn text class="">Teste</v-btn>
    </v-app-bar> -->

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app color="red darken-4" align="center">
      <span align="center" class="white--text">Domestilar &copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <!--<v-icon>youtube</v-icon>
      <v-icon>facebook</v-icon>-->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      sidebar: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      dialog: false,

    }
  }
}
</script>
