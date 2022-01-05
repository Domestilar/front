<template>
    <v-dialog
        v-model="getModalAprovarCrediario"
        persistent
        :overlay="$store.getters.getOverlay"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title>Aprovar</v-card-title>
            <v-card-text>
                <h3 align="center">Tem certeza que deseja aprovar?</h3>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="default"
                    :loading="$store.getters.getOverlay"
                    text
                    @click="setModalAprovarCrediario(false)"
                >Voltar</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="success"
                    :loading="$store.getters.getOverlay"
                    @click="aprovarCrediario(getCrediario.id)"
                >Aprovar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            getModalAprovarCrediario: 'crediario/getModalAprovarCrediario',
            getCrediario: 'crediario/getCrediario'
        })
    },
    methods: {
        ...mapActions({
            setModalAprovarCrediario: "crediario/setModalAprovarCrediario",
            aprovarCrediario: 'crediario/aprovarCrediario'
        })
    }
}
</script>