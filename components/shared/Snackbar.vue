<template>
  <v-snackbar v-model="snackbarStore.status" :bottom="y === 'bottom'" :color="snackbarStore.color" :left="x === 'left'"
    :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="snackbarStore.timeout" :top="y === 'top'"
    :vertical="mode === 'vertical'">
    {{ snackbarStore.text }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text  v-bind="attrs" @click="close()">
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        color: '',
        mode: '',
        snackbar: true,
        text: '',
        timeout: 10000,
        x: null,
        y: 'top',
        snackbar: {},
        status: false
      }
    },
    watch: {
      getSnackbar(){
        this.status = this.getSnackbar.status
        console.log(this.status)
      }
    },
    computed: {
      ...mapGetters({
        getSnackbar: 'getSnackbar'
      }),
      snackbarStore() {
        return this.$store.getters.getSnackbar
      },
      
    },
    methods: {
      close() {
        // this.status = false
        this.$store.commit('snackbarDisabled', false)
      }
    }
  }
</script>