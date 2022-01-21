<template>
    <div>
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>TIPO</th>
                        <th>STATUS</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="anexo in anexos" :key="anexo.id">
                        <td>{{ anexo.tipo }}</td>
                        <td>{{ anexo.status }}</td>
                        <td>
                            <v-btn color="primary" @click="visualizar(anexo.url)" x-small>Visualizar</v-btn>
                            <!-- <v-btn
                                color="success"
                                @click="modalVerificar = true, anexoSelecionado = anexo"
                                
                                x-small
                            >APROVAR</v-btn>-->
                            <v-btn
                                color="success"
                                @click="modalVerificar = true, anexoSelecionado = anexo"
                                v-if="anexo.status != 'APROVADO' && anexo.status != 'REJEITADO'"
                                x-small
                            >APROVAR</v-btn>
                            <v-btn
                                color="error"
                                @click="modalRejeitar = true, anexoSelecionado = anexo"
                                v-if="anexo.status != 'REJEITADO' && anexo.status != 'APROVADO'"
                                x-small
                            >REJEITAR</v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-dialog
            v-model="modalVerificar"
            persistent
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title>Verificação</v-card-title>
                <v-card-text>
                    <h3 align="center">Tem certeza que deseja marcar o documento como verificado?</h3>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="default" @click="modalVerificar = false">Não</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="aprovar()">Sim</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="modalRejeitar"
            persistent
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title>Rejeitar</v-card-title>
                <v-card-text>
                    <v-form ref="formRejeitarDocumento" class="px-3">
                        <v-textarea
                            v-model="anexoSelecionado.motivo_rejeicao"
                            outlined
                            name="input-7-4"
                            label="Motivo da rejeição"
                            :rules="rules.motivo_rejeicao"
                        ></v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="default" @click="modalRejeitar = false">Voltar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="rejeitar()">Rejeitar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            modalVerificar: false,
            anexoSelecionado: "",
            anexos: [],
            modalRejeitar: false,
            rules: {
                motivo_rejeicao: [(v) => !!v || "Campo obrigatório."],
            }
        }
    },
    computed: {
        ...mapGetters({
            getCrediario: 'crediario/getCrediario'
        })
    },
    methods: {
        visualizar(url) {
            window.open(url, '_blank')
        },
        listar() {
            this.$axios.get(`anexos?crediario_id=${this.getCrediario.id}`)
                .then(res => {
                    this.anexos = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        },
        aprovar() {
            this.modalVerificar = false
            this.$store.commit('setOverlay', true)
            this.$axios.post(`anexo/${this.anexoSelecionado.id}/aprovar`)
                .then(res => {
                    this.$store.commit('setOverlay', false)
                    const anexoIndex = this.anexos.findIndex(obj => obj.id == this.anexoSelecionado.id)
                    this.anexos[anexoIndex].status = res.data.status
                    // alert('Documento aprovado.')
                    this.$store.dispatch('snackbarSuccess', 'Documento verificado.')

                })
                .catch(e => {
                    console.log(e)
                    this.$store.commit('setOverlay', false)
                })
        },
        rejeitar() {
            if (this.$refs.formRejeitarDocumento.validate() == false) {
                return
            }

            this.modalRejeitar = false
            this.$store.commit('setOverlay', true)
            this.$axios.post(`anexo/${this.anexoSelecionado.id}/rejeitar`, { motivo_rejeicao: this.anexoSelecionado.motivo_rejeicao })
                .then(res => {
                    this.anexoSelecionado.motivo_rejeicao = ''
                    this.$store.commit('setOverlay', false)
                    const anexoIndex = this.anexos.findIndex(obj => obj.id == this.anexoSelecionado.id)
                    this.anexos[anexoIndex].status = res.data.status
                    // alert('Documento rejeitado.')
                    this.$store.dispatch('snackbarWarning', 'Documento rejeitado.')


                })
                .catch(e => {
                    console.log(e)
                    this.$store.commit('setOverlay', false)
                })
        }


    },
    created() {
        this.listar()
        // this.anexos = this.getCrediario.anexos
    }
}
</script>