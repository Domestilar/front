<template>
    <v-card outlined>
        <v-card-title>Crediário</v-card-title>
        <v-card-title>
             <v-tabs app grow v-model="tabs" class="hidden-sm-and-down">
            <v-tab>
              <span>DADOS GERAIS</span>
            </v-tab>
            <v-tab>
              <span>PROFISSIONAL</span>
            </v-tab>
            <v-tab>
              <span>DOCUMENTOS</span>
            </v-tab>
            <v-tab>
              <span>REFERÊNCIAS</span>
            </v-tab>
        </v-tabs>
        </v-card-title>
        <v-card-text>
         <v-tabs-items v-model="tabs" class="pa-8">
            <v-tab-item>
                <v-form ref="formCrediario" class="px-5 mt-5">
                <v-layout row wrap>
                    <v-flex xs12 md3>
                        <v-row justify="space-around" class="ml-3 mr-3 mb-3">
                            <v-img v-if="getCrediario.foto_selfie_url" :src="getCrediario.foto_selfie_url" aspect-ratio="1.4" contain></v-img>
                            <v-img v-else src="../../sem-foto.jpg" aspect-ratio="1.4" contain></v-img>
                        </v-row>
                    </v-flex>
                    <v-flex xs12 md9>
                        <v-layout row wrap class="pa-0 ma-0">
                            <v-flex xs12 md12>
                                <v-text-field
                                    label="Nome"
                                    v-model="getCrediario.nome"
                                    outlined
                                    dense
                                    class="ml-2 mr-2"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-text-field
                                    label="CPF"
                                    v-model="getCrediario.cpf_cnpj"
                                    outlined
                                    dense
                                    class="ml-2 mr-2"
                                    v-mask="'###.###.###-##'"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-text-field
                                    label="RG"
                                    v-model="getCrediario.rg"
                                    outlined
                                    dense
                                    class="ml-2 mr-2"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-text-field
                                    label="Data de nascimento"
                                    v-model="getCrediario.data_nascimento"
                                    outlined
                                    dense
                                    type="date"
                                    class="ml-2 mr-2"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-text-field
                                    label="Telefone"
                                    v-model="getCrediario.telefone"
                                    outlined
                                    dense
                                    class="ml-2 mr-2"
                                    v-mask="'(##) ####-#####'"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-text-field
                                    label="Celular"
                                    v-model="getCrediario.celular"
                                    outlined
                                    dense
                                    class="ml-2 mr-2"
                                    v-mask="'(##) #####-####'"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-text-field
                                    label="E-mail"
                                    v-model="getCrediario.email"
                                    outlined
                                    dense
                                    class="ml-2 mr-2"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <!-- <v-flex xs12 md2>
                        <v-text-field
                            label="CEP"
                            v-model="getCrediario.cep"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            v-mask="'#####-###'"
                            @blur="pesquisaCep()"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md8>
                        <v-text-field
                            label="Logradouro"
                            v-model="getCrediario.logradouro"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                        <v-text-field
                            label="Número"
                            v-model="getCrediario.numero"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            id="numero"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Bairro"
                            v-model="getCrediario.bairro"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md3>
                        <v-text-field
                            label="Cidade"
                            v-model="getCrediario.cidade"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                        <v-text-field
                            label="Estado"
                            v-model="getCrediario.estado"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md3>
                        <v-text-field
                            label="Complemento"
                            v-model="getCrediario.complemento"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    -->
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Status"
                            v-model="getCrediario.status"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            readonly
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-form>
            </v-tab-item>
            <v-tab-item>
                <v-form ref="formProfissional" class="px-5 mt-5">
                <v-layout row wrap>

                     <v-flex xs12 md6>
                        <v-select
                            label="Categoria profissional"
                            :items="getCategoriasProfissionais"
                            v-model="getCrediario.categoria_profissional"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 md6>
                        <v-text-field
                            label="Profissão"
                            v-model="getCrediario.profissao"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                        <v-text-field
                            label="Nome empresa"
                            v-model="getCrediario.nome_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                        <v-text-field
                            label="CNPJ empresa"
                            v-model="getCrediario.cnpj_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            v-mask="'##.###.###/####-##'"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                        <v-text-field
                            label="CEP empresa"
                            v-model="getCrediario.cep_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            v-mask="'#####-###'"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md8>
                        <v-text-field
                            label="Logradouro empresa"
                            v-model="getCrediario.logradouro_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            v-mask="'#####-###'"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                        <v-text-field
                            label="Número empresa"
                            v-model="getCrediario.numero_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Complemento empresa"
                            v-model="getCrediario.complemento_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Bairro empresa"
                            v-model="getCrediario.bairro_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                        <v-text-field
                            label="Cidade empresa"
                            v-model="getCrediario.cidade_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                        <v-text-field
                            label="Estado empresa"
                            v-model="getCrediario.estado_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Telefone empresa"
                            v-model="getCrediario.telefone_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            v-mask="['(##) #####-#####', '(##) ####-####']"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Celular empresa"
                            v-model="getCrediario.celular_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            v-mask="['(##) #####-#####', '(##) ####-####']"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Data de admissão"
                            v-model="getCrediario.data_admissao_empresa"
                            outlined
                            dense
                            class="ml-2 mr-2"
                            type="date"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                </v-form>
            </v-tab-item>
            <v-tab-item>
                <CardAnexos />
            </v-tab-item>
            <v-tab-item>
                <CardReferencia />
            </v-tab-item>
         </v-tabs-items>
            
        </v-card-text>
        <v-card-actions>
            <!-- <nuxt-link to="/admin/crediario"><v-btn text color="default" @click="$router.push('/admin/crediario')">voltar</v-btn></nuxt-link> -->
            <v-btn text color="default" @click="$router.push('/admin/crediario')">voltar</v-btn>
            <v-btn color="warning" @click="setModalValidarCrediario(true)" v-if="getCrediario.status == 'AGUARDANDO VALIDAÇÃO'">Validar cadastro</v-btn>
            <v-btn color="primary" @click="setModalAprovarCrediario(true)" v-if="getCrediario.status == 'AGUARDANDO APROVAÇÃO'">Aprovar cadastro</v-btn>
            <v-btn color="error" @click="setModalRejeitarCrediario(true)" v-if="getCrediario.status == 'AGUARDANDO APROVAÇÃO' || getCrediario.status == 'AGUARDANDO VALIDAÇÃO'">Rejeitar cadastro</v-btn>
            <!-- <v-btn color="error" @click="setModalRejeitarCrediario(true)">Rejeitar cadastro</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn color="success" @click="salvar()">Salvar</v-btn>
        </v-card-actions>
        <ModalValidar />
        <ModalAprovar />
        <ModalRejeitar />
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ModalValidar from "@/components/admin/crediario/ModalValidar"
import ModalAprovar from "@/components/admin/crediario/ModalAprovar"
import ModalRejeitar from "@/components/admin/crediario/ModalRejeitar"
import CardAnexos from "@/components/admin/crediario/CardAnexos"
import CardReferencia from "@/components/admin/crediario/CardReferenciaPessoal"
import axios from 'axios'
export default {
    layout: 'admin',
    components: {
        ModalValidar,
        ModalAprovar,
        CardAnexos,
        CardReferencia,
        ModalRejeitar,
    },
    data() {
        return {
            crediario: {},
            tabs: 0,
        }
    },

    computed: {
        ...mapGetters({
            getCrediario: 'crediario/getCrediario',
            getCategoriasProfissionais: 'crediario/getCategoriasProfissionais'
        }),
    },
    methods: {
        ...mapActions({
            visualizarCrediario: 'crediario/visualizarCrediario',
            atualizarCrediario: 'crediario/atualizarCrediario',
            validarCrediario: 'crediario/validarCrediario',
            setModalValidarCrediario: 'crediario/setModalValidarCrediario',
            setModalRejeitarCrediario: 'crediario/setModalRejeitarCrediario',
            setModalAprovarCrediario: 'crediario/setModalAprovarCrediario',
        }),
        salvar() {
            this.atualizarCrediario(this.getCrediario)
        },
        pesquisaCep() {
            this.$store.commit("setOverlay", true);
            axios
                .get(`https://viacep.com.br/ws/${this.getCrediario.cep}/json/`)
                .then((res) => {
                    this.$store.commit("setOverlay", false);
                    this.$store.commit('crediario/setCrediario', {
                        ...this.getCrediario, 
                        logradouro: res.data.logradouro,
                        bairro: res.data.bairro,
                        cidade: res.data.localidade,
                        estado: res.data.uf,
                    })

                    document.getElementById("numero").focus();

                })
                .catch((e) => {
                    console.log(e);
                    this.$store.commit("setOverlay", false);
                });
        },
    },
    created() {
        this.visualizarCrediario(this.$route.params.id)
    },
}
</script>