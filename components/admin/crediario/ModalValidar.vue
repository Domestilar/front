<template>
    <v-dialog
        v-model="getModalValidarCrediario"
        persistent
        :overlay="$store.getters.getOverlay"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title>Validar</v-card-title>
            <v-card-text>
                <h3 align="center">Tem certeza que deseja validar?</h3>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="default"
                    :loading="$store.getters.getOverlay"
                    text
                    @click="setModalValidarCrediario(false)"
                >Voltar</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="success"
                    :loading="$store.getters.getOverlay"
                    @click="validarCrediario(getCrediario.id)"
                >Validar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            getModalValidarCrediario: 'crediario/getModalValidarCrediario',
            getCrediario: 'crediario/getCrediario'
        })
    },
    methods: {
        ...mapActions({
            setModalValidarCrediario: "crediario/setModalValidarCrediario",
            validarCrediario: 'crediario/validarCrediario'
        })
    }
}
</script>