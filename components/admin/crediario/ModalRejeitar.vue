<template<template>
    <v-dialog
        v-model="getModalRejeitarCrediario"
        persistent
        :overlay="$store.getters.getOverlay"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title>Rejeitar</v-card-title>
            <v-card-text>
                <v-form class="px-3 mt-3" ref="formRejeicaoCrediario">
                    <v-layout row wrap>
                        <v-flex xs12 md12>
                            <v-textarea
                                v-model="getCrediario.motivo_rejeicao"
                                outlined
                                name="input-7-4"
                                label="Motivo da rejeição"
                                :rules="rules.motivo_rejeicao"
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs12 md12>
                            <v-checkbox v-model="motivos_rejeicao" v-for="m in motivos_rejeicao_options" :key="m.id" :label="m" :value="m"></v-checkbox>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="default"
                    :loading="$store.getters.getOverlay"
                    text
                    @click="setModalRejeitarCrediario(false)"
                >Voltar</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="success"
                    :loading="$store.getters.getOverlay"
                    @click="rejeitar()"
                >Rejeitar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            crediario: {},
            rules: {
                motivo_rejeicao: [(v) => !!v || "Campo obrigatório."],
            },
            motivos_rejeicao_options: [
                "Selfie não aprovada",
            ],
            motivos_rejeicao: [],
        }
    },
    computed: {
        ...mapGetters({
            getModalRejeitarCrediario: 'crediario/getModalRejeitarCrediario',
            getCrediario: 'crediario/getCrediario'
        })
    },
    methods: {
        ...mapActions({
            setModalRejeitarCrediario: "crediario/setModalRejeitarCrediario",
            rejeitarCrediario: 'crediario/rejeitarCrediario'
        }),
        rejeitar() {
            this.getCrediario.motivos_rejeicao = this.motivos_rejeicao
            this.rejeitarCrediario(this.getCrediario)
        }
    }
}
</script>