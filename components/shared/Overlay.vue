<template>
    <v-overlay style="z-index: 2000" :value="overlayState">
       <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>
<script>
    export default{
        computed: {
            overlayState() {
                return this.$store.getters.getOverlay
            }
        }
    }
</script>