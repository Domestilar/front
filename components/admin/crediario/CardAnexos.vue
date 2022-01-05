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
                            >APROVAR</v-btn> -->
                            <v-btn
                                color="success"
                                @click="modalVerificar = true, anexoSelecionado = anexo"
                                v-if="anexo.status != 'APROVADO'"
                                x-small
                            >APROVAR</v-btn>
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
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            modalVerificar: false,
            anexoSelecionado: "",
            anexos: []
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
        listar(){
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
                    alert('Documento verificado.')
                })
                .catch(e => {
                    console.log(e)
                    this.$store.commit('setOverlay', false)
                })
        },
        reitar() {

        }


    },
    created(){
        this.listar()
        // this.anexos = this.getCrediario.anexos
    }
}
</script>