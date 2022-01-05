<template>
    <v-row justify="center" align="center">
    <Overlay />
        <v-col cols="12" sm="12" md="8" class="mt-12">
            <v-container fluid>
                <v-layout justify-center align-center>
                    <v-flex shrink>
                        <v-img
                            align="center"
                            lazy-src="logo-domestilar.png"
                            max-height="150"
                            max-width="250"
                            src="../../logo-domestilar.png"
                            class="mb-5"
                        ></v-img>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 md12 class="mt-4 mb-4">
                        <h3 align="center">Complete seu cadastro.</h3>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-stepper v-model="e1" outlined>
                <v-stepper-header outlined>
                    <v-stepper-step :complete="e1 > 1" step="1">Referência pessoal</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2">Documentos</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <h3>Indique algumas referências pessoais</h3>
                        <v-form ref="formDadosReferencias" class="mt-3">
                            <h5 class="mb-4">1ª Referência</h5>
                            <v-card-text outlined>
                                <v-layout row>
                                    <v-flex xs12 md12>
                                        <v-text-field
                                            label="Nome Completo *"
                                            v-model="referencia.nome1"
                                            outlined
                                            dense
                                            class="ml-1 mr-1"
                                            :rules="rules.nome"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex x12 md8>
                                        <v-text-field
                                            label="Telefone fixo ou celular"
                                            outlined
                                            dense
                                            class="ml-1 mr-1"
                                            v-model="referencia.telefone1"
                                            :rules="rules.telefone"
                                            v-mask="['(##) ####-####', '(##) #####-####']"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex x12 md4>
                                        <v-text-field
                                            label="Ramal"
                                            outlined
                                            dense
                                            class="ml-1 mr-1"
                                            v-model="referencia.ramal1"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <h5 class="mb-4">2ª Referência</h5>
                            <v-card-text outlined>
                                <v-layout row>
                                    <v-flex xs12 md12>
                                        <v-text-field
                                            label="Nome Completo *"
                                            v-model="referencia.nome2"
                                            outlined
                                            dense
                                            class="ml-1 mr-1"
                                            :rules="rules.nome"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex x12 md8>
                                        <v-text-field
                                            label="Telefone fixo ou celular"
                                            outlined
                                            dense
                                            class="ml-1 mr-1"
                                            v-model="referencia.telefone2"
                                            :rules="rules.telefone"
                                            v-mask="['(##) ####-####', '(##) #####-####']"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex x12 md4>
                                        <v-text-field
                                            label="Ramal"
                                            outlined
                                            dense
                                            class="ml-1 mr-1"
                                            v-model="referencia.ramal2"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-form>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="avancarEtapa2()">Próximo</v-btn>
                        </v-card-actions>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <h3>Anexe os documentos abaixo</h3>
                        <v-form ref="formDocumentos" class="mt-3">
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex xs12 md12>
                                        <v-select
                                            :items="getCategoriasProfissionais"
                                            v-model="crediario.categoria_profissional"
                                            label="Categoria profissional"
                                            outlined
                                            dense
                                            class="ml-1 mr-1"
                                        ></v-select>
                                    </v-flex>
                                </v-layout>
                                <!-- Arquivos assalariado -->
                                <v-layout
                                    row
                                    wrap
                                    v-if="crediario.categoria_profissional == 'ASSALARIADO (funcionário de empresa privada, empregado doméstico)'"
                                >
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Carteira de trabalho"
                                            class="mr-1 ml-1"
                                            hint="Mínimo de 120 dias assinado"
                                            :rules="rules.carteira_trabalho_arquivo"
                                            @change="selecionaCarteiraTrabalho"
                                        ></v-file-input>
                                    </v-flex>
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Contra cheque atual (Salário variável trazer os 3 últimos para média salarial)"
                                            class="mr-1 ml-1"
                                            :rules="rules.contra_cheque_arquivo"
                                            multiple
                                            @change="selecionaContraCheque"
                                        ></v-file-input>
                                    </v-flex>
                                    <v-flex xs12 md12>
                                        <v-text-field
                                            label="Telefone fixo do trabalho"
                                            outlined
                                            dense
                                            v-model="crediario.telefone_empresa"
                                            class="ml-1 mr-1"
                                            v-mask="['(##) ####-####', '(##) #####-####']"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <!-- Arquivos funcionário público -->
                                <v-layout
                                    row
                                    wrap
                                    v-if="crediario.categoria_profissional == 'FUNCIONÁRIO PÚBLICO (federal, estadual, municipal, autarquia)'"
                                >
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Contra cheque atual (Salário variável trazer os 3 últimos para média salarial)"
                                            class="mr-1 ml-1"
                                            :rules="rules.contra_cheque_arquivo"
                                            @change="selecionaCarteiraContraCheque"
                                        ></v-file-input>
                                    </v-flex>
                                    <v-text-field
                                        label="Telefone fixo do trabalho"
                                        outlined
                                        dense
                                        v-model="crediario.telefone_empresa"
                                        class="ml-1 mr-1"
                                    ></v-text-field>
                                </v-layout>

                                <!-- Arquvios aposentado e pensionista -->
                                <v-layout
                                    row
                                    wrap
                                    v-if="crediario.categoria_profissional == 'APOSENTADO E PENSIONISTA (INSS ou Órgãos Públicos)'"
                                >
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Cartão do benefício"
                                            class="mr-1 ml-1"
                                            :rules="rules.cartao_beneficio_arquivo"
                                            @change="selecionaCartaoBeneficio"
                                        ></v-file-input>
                                    </v-flex>

                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Contra cheque"
                                            class="mr-1 ml-1"
                                            hint="Do beneficiário ou aposentado"
                                            :rules="rules.contra_cheque_arquivo"
                                            @change="selecionaCarteiraContraCheque"
                                        ></v-file-input>
                                    </v-flex>
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Demonstrativo de pagamento"
                                            class="mr-1 ml-1"
                                            hint="Aposentadoria e/ou pensão ou carta de concessão"
                                            :rules="rules.demonstrativo_pagamento_arquivo"
                                            @change="selecionaDemonstrativoPagamento"
                                        ></v-file-input>
                                    </v-flex>
                                </v-layout>

                                <!-- Arquivos autônomo -->
                                <v-layout row wrap>
                                    <v-flex xs12 md12>
                                        <v-select
                                            :items="categoriasAutonomo"
                                            label="Categoria"
                                            outlined
                                            dense
                                            class="ml-1 mr-1"
                                            v-model="crediario.categoria_autonomo"
                                            v-if="crediario.categoria_profissional == 'AUTÔNOMO'"
                                        ></v-select>
                                    </v-flex>
                                    <v-layout
                                        row
                                        wrap
                                        v-if="crediario.categoria_autonomo == 'Micro Empreendedor Individual'"
                                        class="ma-0"
                                    >
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="DECORE com assinatura autenticada"
                                                class="mr-1 ml-1"
                                                :rules="rules.decore_arquivo"
                                                @change="selecionaDecore"
                                            ></v-file-input>
                                        </v-flex>
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Declaração IRPF"
                                                class="mr-1 ml-1"
                                                :rules="rules.declaracao_irpf_arquivo"
                                                @change="selecionaDeclaracaoIRPF"
                                            ></v-file-input>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout
                                        row
                                        wrap
                                        v-if="crediario.categoria_autonomo == 'Profissional Liberal'"
                                        class="ma-0"
                                    >
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Carteira do Conselho Regulador (CRA, OAB, CRO,CRE, CRC ou outros)"
                                                class="mr-1 ml-1"
                                                :rules="rules.carteira_conselho_arquivo"
                                                @change="selecionaCarteiraConselho"
                                            ></v-file-input>
                                        </v-flex>
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="DECORE com assinatura autenticada"
                                                class="mr-1 ml-1"
                                                :rules="rules.decore_arquivo"
                                                @change="selecionaDecore"
                                            ></v-file-input>
                                        </v-flex>
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Declaração IRPF"
                                                class="mr-1 ml-1"
                                                :rules="rules.declaracao_irpf"
                                                @change="selecionaDeclaracaoIRPF"
                                            ></v-file-input>
                                        </v-flex>
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Contrato de Trabalho (se ouver)"
                                                class="mr-1 ml-1"
                                                @change="selecionaContratoTrabalho"
                                            ></v-file-input>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout
                                        row
                                        wrap
                                        v-if="crediario.categoria_autonomo == 'Revendedores de Produtos Porta à Porta'"
                                        class="ma-0"
                                    >
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="3 Últimos boletos de compra dos produtos que revende quitados"
                                                class="mr-1 ml-1"
                                                :rules="rules.boleto_quitado"
                                                @change="selecionaBoletoQuitado"
                                                multiple
                                            ></v-file-input>
                                        </v-flex>
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="3 carnês quitados de crediários na praça"
                                                class="mr-1 ml-1"
                                                :rules="rules.carne_quitado"
                                                @change="selecionaCarneQuitado"
                                                multiple
                                            ></v-file-input>
                                        </v-flex>

                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="DECORE com assinatura autenticada"
                                                class="mr-1 ml-1"
                                                :rules="rules.decore_arquivo"
                                                @change="selecionaDecore"
                                            ></v-file-input>
                                        </v-flex>
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Declaração IRPF"
                                                class="mr-1 ml-1"
                                                :rules="rules.declaracao_irpf"
                                                @change="selecionaDeclaracaoIRPF"
                                            ></v-file-input>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout
                                        row
                                        wrap
                                        v-if="crediario.categoria_autonomo == 'Trabalhador Rural'"
                                        class="ma-0"
                                    >
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="3 carnês quitados de crediários na praça"
                                                class="mr-1 ml-1"
                                                :rules="rules.carne_quitado"
                                                @change="selecionaCarneQuitado"
                                            ></v-file-input>
                                        </v-flex>

                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Carteira de trabalhador rural"
                                                class="mr-1 ml-1"
                                                :rules="rules.cartateira_trabalho_arquivo"
                                                @change="selecionaCarteiraTrabalho"
                                            ></v-file-input>
                                        </v-flex>
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Carteira de cooperativa"
                                                class="mr-1 ml-1"
                                                :rules="rules.carteira_cooperativa_arquivo"
                                                @change="selecionaCarteiraCooperativa"
                                            ></v-file-input>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout
                                        row
                                        wrap
                                        v-if="crediario.categoria_autonomo == 'Renda Proveniente de Trabalho no Exterior'"
                                        class="ma-0"
                                    >
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Comprovante de rendimentos"
                                                class="mr-1 ml-1"
                                                :rules="rules.comprovante_rendimento"
                                                @change="selecionaComprovanteRendimento"
                                            ></v-file-input>
                                        </v-flex>

                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Contrato de trabalho (se ouver)"
                                                class="mr-1 ml-1"
                                                @change="selecionaContratoTrabalho"
                                            ></v-file-input>
                                        </v-flex>
                                        <v-flex xs12 md12>
                                            <v-file-input
                                                outlined
                                                dense
                                                label="Declaração IRPF"
                                                class="mr-1 ml-1"
                                                :rules="rules.declaracao_irpf"
                                                @change="selecionaDeclaracaoIRPF"
                                            ></v-file-input>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                                <v-layout
                                    row
                                    wrap
                                    v-if="crediario.categoria_profissional == 'EMPRESÁRIO'"
                                >
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Cartão CNPJ da empresa"
                                            class="mr-1 ml-1"
                                            :rules="rules.cartao_cnpj"
                                            @change="selecionaCartaoCNPJ"
                                        ></v-file-input>
                                    </v-flex>

                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Pró-labore"
                                            class="mr-1 ml-1"
                                            :rules="rules.pro_labore"
                                            @change="selecionaProLabore"
                                        ></v-file-input>
                                    </v-flex>
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Declaração IRPF"
                                            class="mr-1 ml-1"
                                            :rules="rules.declaracao_irpf_arquivo"
                                            @change="selecionaDeclaracaoIRPF"
                                        ></v-file-input>
                                    </v-flex>
                                </v-layout>
                                <v-layout
                                    row
                                    wrap
                                    v-if="crediario.categoria_profissional == 'EMPRESÁRIO'"
                                >
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Cartão CNPJ da empresa"
                                            class="mr-1 ml-1"
                                            :rules="rules.cartao_cnpj"
                                            @change="selecionaCartaoCNPJ"
                                        ></v-file-input>
                                    </v-flex>

                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Pró-labore"
                                            class="mr-1 ml-1"
                                            :rules="rules.pro_labore"
                                            @change="selecionaProLabore"
                                        ></v-file-input>
                                    </v-flex>
                                </v-layout>
                                <h5
                                    v-if="crediario.categoria_profissional == 'DO LAR'"
                                    class="mt-5 mb-5"
                                >Documentação do Cônjuge</h5>
                                <v-layout
                                    row
                                    wrap
                                    v-if="crediario.categoria_profissional == 'DO LAR'"
                                >
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Certidão de união estável ou casamento"
                                            class="mr-1 ml-1"
                                            :rules="rules.certidao_casamento_uniao_estavel"
                                            @change="selecionaCertidaoCasamentoUniaoEstavel"
                                        ></v-file-input>
                                    </v-flex>
                                    <v-flex xs12 md12>
                                        <v-file-input
                                            outlined
                                            dense
                                            label="Contra cheque atual"
                                            class="mr-1 ml-1"
                                            hint="Salário variável trazer os 3 últimos para média salarial"
                                            :rules="rules.contra_cheque_arquivo"
                                            @change="selecionaContraCheque"
                                            multiple
                                        ></v-file-input>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-form>

                        <v-card-actions>
                            <v-btn color="default" @click="e1 = 1" :loading="$store.getters.getOverlay">Anterior</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="modalConfirmar = true" :loading="$store.getters.getOverlay">Enviar dados</v-btn>
                        </v-card-actions>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-col>
        <v-dialog
            v-model="modalConfirmar"
            persistent
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title>Confirmação</v-card-title>
                <v-card-text>
                    <h3 align="center">Tem certeza que deseja enviar?</h3>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="default" text @click="modalConfirmar = false">Não</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="salvar(), modalConfirmar = false">Sim</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import {PhotoCapture} from 'vue-media-recorder'
import PhotoCaptureVue from "@/components/PhotoCapture.vue";
export default {
    name: "IndexPage",
    auth: false,
    components: {
        PhotoCaptureVue
    },
    data() {
        return {
            crediario: {
                categoria_profissional: "EMPRESÁRIO",
                contra_cheque_arquivo: "",
                telefone_empresa: "",
                cartao_beneficio_arquivo: "",
                demonstrativo_pagamento_arquivo: "",
                categoria_autonomo: "",
                decore_arquivo: "",
                carteira_conselho_arquivo: "",
                declaracao_irpf_arquivo: "",
                contrato_trabalho_arquivo: "",
                carne_quitado_arquivo: "",
                boleto_quitado_arquivo: "",
                carteira_trabalho_arquivo: "",
                comprovante_rendimento_arquivo: "",
                cartao_cnpj_arquivo: "",
                pro_labore_arquivo: "",
                certidao_casamento_uniao_estavel_arquivo: "",
            },
            referencia: {
                nome1: '',
                telefone1: '',
                ramal1: '',
                nome2: '',
                telefone2: '',
                ramal2: '',
            },
            e1: 1,
            rules: {
                nome: [(v) => !!v || "Campo obrigatório."],
                telefone: [(v) => !!v || "Campo obrigatório."],
                categoria_profissional: [(v) => !!v || "Campo obrigatório."],
                carteira_trabalho_arquivo: [(v) => !!v || "Campo obrigatório."],
                contra_cheque_arquivo: [(v) => !!v || "Campo obrigatório."],
                telefone_empresa: [(v) => !!v || "Campo obrigatório."],
                cartao_beneficio_arquivo: [(v) => !!v || "Campo obrigatório."],
                demonstrativo_pagamento_arquivo: [(v) => !!v || "Campo obrigatório."],
                categoria_autonomo: [(v) => !!v || "Campo obrigatório."],
                decore: [(v) => !!v || "Campo obrigatório."],
                carteira_conselho: [(v) => !!v || "Campo obrigatório."],
                declaracao_irpf: [(v) => !!v || "Campo obrigatório."],
                carne_quitado: [(v) => !!v || "Campo obrigatório."],
                boleto_quitado: [(v) => !!v || "Campo obrigatório."],
                carteira_cooperativa_arquivo: [(v) => !!v || "Campo obrigatório."],
                comprovante_rendimento: [(v) => !!v || "Campo obrigatório."],
                cartao_cnpj: [(v) => !!v || "Campo obrigatório."],
                certidao_casamento_uniao_estavel: [(v) => !!v || "Campo obrigatório."],
            },
            categoriasAutonomo: [
                'Micro Empreendedor Individual',
                'Profissional Liberal',
                'Revendedores de Produtos Porta à Porta',
                'Trabalhador Rural',
                'Renda Proveniente de Trabalho no Exterior',
            ],
            carteiraTrabalhoArquivo: "",
            modalConfirmar: false
        };
    },
    watch: {
        carteiraTrabalhoArquivo() {
            console.log(this.carteiraTrabalhoArquivo)
        }
    },
    computed: {
        ...mapGetters({
            getCrediario: "crediario/getCrediario",
            getCategoriasProfissionais: "crediario/getCategoriasProfissionais",
        }),
    },
    methods: {
        ...mapActions({
            completarCrediario: "crediario/completarCrediario",
        }),
        avancarEtapa2() {
            if (this.$refs.formDadosReferencias.validate() == false) {
                return;
            }
            this.e1 = 2;
        },
        selecionComprovanteResidencial(e) {
            this.crediario.comprovante_residencia_arquivo = e;
        },
        selecionaCpf(e) {
            this.crediario.cpf_cnpj_arquivo = e;
        },
        selecionaDocumentoFoto(e) {
            this.crediario.documento_foto_arquivo = e;
        },
        selecionaCarteiraTrabalho(e) {
            this.crediario.carteira_trabalho_arquivo = e;
        },
        selecionaContraCheque(e) {
            this.crediario.contra_cheque_arquivo = e;
        },
        selecionaCartaoBeneficio(e) {
            this.crediario.cartao_beneficio_arquivo = e;
        },
        selecionaDemonstrativoPagamento(e) {
            this.crediario.demonstrativo_pagamento_arquivo = e;
        },
        selecionaDecore(e) {
            this.crediario.decore = e;
        },
        selecionaDeclaracaoIRPF(e) {
            this.crediario.declaracao_irpf_arquivo = e;
        },
        selecionaCarteiraConselho(e) {
            this.crediario.carteira_conselho_arquivo = e;
        },
        selecionaContratoTrabalho(e) {
            this.crediario.contrato_trabalho_arquivo = e;
        },
        selecionaCarneQuitado(e) {
            this.crediario.carne_quitado_arquivo = e;
        },
        selecionaBoletoQuitado(e) {
            this.crediario.boleto_quitado_arquivo = e;
        },
        selecionaCarteiraCooperativa(e) {
            this.crediario.carteira_cooperativa_arquivo = e;
        },
        selecionaComprovanteRendimento(e) {
            this.crediario.comprovante_rendimento_arquivo = e;
        },
        selecionaCartaoCNPJ(e) {
            this.crediario.cartao_cnpj_arquivo = e;
        },
        selecionaProLabore(e) {
            this.crediario.pro_labore_arquivo = e;
        },
        selecionaCertidaoCasamentoUniaoEstavel(e) {
            this.crediario.certidao_casamento_uniao_estavel_arquivo = e;
        },
        salvar() {
            if (this.$refs.formDocumentos.validate() == false) {
                return
            }
            const data = new FormData();
            data.append('uuid', this.crediario.uuid);
            data.append(
                "categoria_profissional",
                this.crediario.categoria_profissional
            );

            data.append("cpf_cnpj_arquivo", this.crediario.cpf_cnpj_arquivo);

            if (this.crediario.telefone_empresa) {
                data.append('telefone_empresa', this.crediario.telefone_empresa);
            }
            if (this.crediario.carteira_trabalho_arquivo) {
                data.append('carteira_trabalho_arquivo', this.crediario.carteira_trabalho_arquivo);
            }
            if (this.crediario.contra_cheque_arquivo && this.crediario.contra_cheque_arquivo.length > 0) {
                this.crediario.contra_cheque_arquivo.forEach((file) => {
                    data.append('contra_cheque_arquivo[]', file)
                })
            }
            if (this.crediario.cartao_beneficio_arquivo) {
                data.append('cartao_beneficio_arquivo', this.crediario.cartao_beneficio_arquivo)
            }
            if (this.crediario.demonstrativo_pagamento_arquivo) {
                data.append('demonstrativo_pagamento_arquivo', this.crediario.demonstrativo_pagamento_arquivo)
            }
            if (this.crediario.decore_arquivo) {
                data.append('decore_arquivo', this.crediario.decore_arquivo)
            }
            if (this.crediario.carteira_conselho_arquivo) {
                data.append('carteira_conselho_arquivo', this.crediario.carteira_conselho_arquivo)
            }
            if (this.crediario.declaracao_irpf_arquivo) {
                data.append('declaracao_irpf_arquivo', this.crediario.declaracao_irpf_arquivo)
            }
            if (this.crediario.declaracao_irpf_arquivo) {
                data.append('declaracao_irpf_arquivo', this.crediario.declaracao_irpf_arquivo)
            }
            if (this.crediario.contrato_trabalho_arquivo) {
                data.append('contrato_trabalho_arquivo', this.crediario.contrato_trabalho_arquivo)
            }
            if (this.crediario.carne_quitado_arquivo && this.crediario.carne_quitado_arquivo.length > 0) {
                this.crediario.carne_quitado_arquivo.forEach((file) => {
                    data.append('carne_quitado_arquivo[]', file)
                })
            }
            if (this.crediario.boleto_quitado_arquivo && this.crediario.boleto_quitado_arquivo.length > 0) {
                this.crediario.boleto_quitado_arquivo.forEach((file) => {
                    data.append('boleto_quitado_arquivo[]', file)
                })
            }
            if (this.crediario.carteira_trabalho_arquivo) {
                data.append('carteira_trabalho_arquivo', this.crediario.carteira_trabalho_arquivo)
            }
            if (this.crediario.comprovante_rendimento_arquivo) {
                data.append('comprovante_rendimento_arquivo', this.crediario.comprovante_rendimento_arquivo)
            }
            if (this.crediario.cartao_cnpj_arquivo) {
                data.append('cartao_cnpj_arquivo', this.crediario.cartao_cnpj_arquivo)
            }
            if (this.crediario.pro_labore_arquivo) {
                data.append('pro_labore_arquivo', this.crediario.pro_labore_arquivo)
            }
            if (this.crediario.certidao_casamento_uniao_estavel_arquivo) {
                data.append('certidao_casamento_uniao_estavel_arquivo', this.crediario.certidao_casamento_uniao_estavel_arquivo)
            }

            if (this.referencia.nome1) {
                data.append('referencia_nome1', this.referencia.nome1)
            }
            if (this.referencia.telefone1) {
                data.append('referencia_telefone1', this.referencia.telefone1)
            }
            if (this.referencia.ramal1) {
                data.append('referencia_ramal1', this.referencia.ramal1)
            }

            if (this.referencia.nome2) {
                data.append('referencia_nome2', this.referencia.nome2)
            }
            if (this.referencia.telefone2) {
                data.append('referencia_telefone2', this.referencia.telefone2)
            }
            if (this.referencia.ramal2) {
                data.append('referencia_ramal2', this.referencia.ramal2)
            }

            this.completarCrediario(data);
        },
    },
    created() {
        // console.log(this.$store.getters.getOverlay)

        this.$axios.get(`/crediario/${this.$route.params.uuid}/visualizar`)
            .then(res => {
                this.crediario = res.data
            })
            .catch(e => {
                console.log(e)
            })
        this.$store.dispatch('alert', { type: 'success', message: 'teste alert' })
    }
};
</script>
