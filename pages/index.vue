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
              src="logo-domestilar.png"
              class="mb-5"
            ></v-img>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md12 class="mt-4 mb-4">
            <h3 align="center">Preencha seu pré-cadastro e conheça as nossas vantagens.</h3>
          </v-flex>
        </v-layout>
      </v-container>

      <v-stepper v-model="e1" outlined>
        <v-stepper-header outlined>
          <v-stepper-step :complete="e1 > 1" step="1">Dados Gerais</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">Documentos</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Selfie</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <h3>Fale sobre você</h3>
            <v-form ref="formDadosGerais" class="mt-3">
              <v-card-text outlined>
                <v-layout row>
                  <v-flex xs12 md12>
                    <v-text-field
                      label="Nome Completo *"
                      v-model="crediario.nome"
                      outlined
                      dense
                      class="ml-1 mr-1"
                      :rules="rules.nome"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field
                      label="CPF *"
                      v-model="crediario.cpf_cnpj"
                      outlined
                      dense
                      class="ml-1 mr-1"
                      v-mask="'###.###.###-##'"
                      :rules="rules.cpf_cnpj"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field
                      label="RG *"
                      v-model="crediario.rg"
                      outlined
                      dense
                      class="ml-1 mr-1"
                      :rules="rules.rg"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field
                      label="Data de Nascimento *"
                      v-model="crediario.data_nascimento"
                      outlined
                      dense
                      v-mask="'##/##/####'"
                      class="ml-1 mr-1"
                      :rules="rules.data_nascimento"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      label="Telefone"
                      v-model="crediario.telefone"
                      dense
                      outlined
                      v-mask="'(##) ####-####'"
                      class="ml-1 mr-1"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      label="Celular *"
                      v-model="crediario.celular"
                      dense
                      outlined
                      v-mask="'(##) #####-####'"
                      class="ml-1 mr-1"
                      :rules="rules.celular"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field
                      label="E-mail *"
                      v-model="crediario.email"
                      dense
                      outlined
                      class="ml-1 mr-1"
                      type="email"
                      :rules="rules.email"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-select
                      :items="getCategoriasProfissionais"
                      v-model="crediario.categoria_profissional"
                      outlined
                      dense
                      class="ml-1 mr-1"
                      label="Categoria profissional *"
                      :rules="rules.categoria_profissional"
                    ></v-select>
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
                    <v-file-input
                      outlined
                      dense
                      label="Comprovante de residência no nome do titular"
                      class="mr-1 ml-1"
                      placeholder="Energia, água, telefone fixo ou faturas (TV por assinatura, cartão de crédito ou IPTU)"
                      :rules="rules.comprovante_residencia_arquivo"
                      @change="selecionComprovanteResidencial"
                    ></v-file-input>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-file-input
                      outlined
                      dense
                      label="CPF"
                      class="mr-1 ml-1"
                      :rules="rules.cpf_arquivo"
                      @change="selecionaCpf"
                    ></v-file-input>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-file-input
                      outlined
                      dense
                      label="Documento com foto"
                      placeholder="RG, CNH, CPTS ou outros"
                      class="mr-1 ml-1"
                      :rules="rules.documento_foto_arquivo"
                      @change="selecionaDocumentoFoto"
                    ></v-file-input>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-form>

            <v-card-actions>
              <v-btn color="default" @click="e1 = 1">Anterior</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="avancarEtapa3()">Próximo</v-btn>
            </v-card-actions>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card-text>
              <h3>Bata uma selfie</h3>
              <PhotoCaptureVue v-model="imageBase64" v-if="e1 == 3" align="center" class="mt-3" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="default" @click="e1 = 2" :loading="$store.getters.getOverlay">Anterior</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                @click="modalConfirmar = true"
                :loading="$store.getters.getOverlay"
                v-if="this.getCrediario.foto_selfie"
              >Enviar dados</v-btn>
            </v-card-actions>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
    <v-dialog v-model="modalConfirmar" persistent max-width="500px" transition="dialog-transition">
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
    <v-dialog
      v-model="termos"
      scrollable
      persistent
      :overlay="false"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-actions>Termos</v-card-actions>
        <v-card-text align="">
          <p align="justify">
            Declaro exatos e verdadeiros os dados constantes neste formulário de Pré-Cadastro e autorizo a minha inclusão no seu cadastro,
            de acordo com o artigo 43, parágrafo 2º, do Código de Defesa do Consumidor. Autorizo a confirmação das informações acima apresentadas,
            Autorizo aconsultas ao SCR (Sistema de Crédito do Banco Central),
            <b>SPC, SERASA</b> eaos orgãos de Proteção ao Crédito.
            Autorizo o envio de informações e o contato por telefone fixo, celular e/ou email.
            <b>Crédito sujeito a análise e aprovação</b>
          </p>
          <p align="justify">Autorizo o envio pela Domestilar LTDA. de informações, promoções, novidade dos produtos e serviços da loja, para os meus contatos indicados no formulário de pré-cadastro.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" block @click="termos = false">ACEITAR TERMOS</v-btn>
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
        nome: "",
        cpf_cnpj: "",
        rg: "",
        data_nascimento: "",
        celular: "",
        email: "",
        categoria_profissional: "",
        comprovante_residencia_arquivo: "",
        documento_foto_arquivo: "",
        cpf_cnpj_arquivo: "",
      },
      e1: 1,
      rules: {
        nome: [(v) => !!v || "Campo obrigatório."],
        cpf_cnpj: [(v) => !!v || "Campo obrigatório."],
        rg: [(v) => !!v || "Campo obrigatório."],
        data_nascimento: [(v) => !!v || "Campo obrigatório."],
        celular: [(v) => !!v || "Campo obrigatório."],
        email: [(v) => !!v || "Campo obrigatório."],
        categoria_profissional: [(v) => !!v || "Campo obrigatório."],
        comprovante_residencia_arquivo: [(v) => !!v || "Campo obrigatório."],
        documento_foto_arquivo: [(v) => !!v || "Campo obrigatório."],
        cpf_arquivo: [(v) => !!v || "Campo obrigatório."],
      },
      modalConfirmar: false,
      imageBase64: "",
      termos: true
    };
  },
  watch() {
    // getCrediario(){
    //   if(this.getCrediario.foto_selfie){

    //   }
    // }
  },
  computed: {
    ...mapGetters({
      getCrediario: "crediario/getCrediario",
      getCategoriasProfissionais: "crediario/getCategoriasProfissionais",
    }),
  },
  methods: {
    ...mapActions({
      salvarCrediario: "crediario/salvarCrediario",
    }),
    avancarEtapa2() {
      if (this.$refs.formDadosGerais.validate() == false) {
        return;
      }
      this.e1 = 2;
    },
    avancarEtapa3() {
      if (this.$refs.formDocumentos.validate() == false) {
        return;
      }
      this.e1 = 3;
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
    salvar() {
      const data = new FormData();

      data.append("nome", this.crediario.nome);
      data.append("cpf_cnpj", this.crediario.cpf_cnpj);
      data.append("rg", this.crediario.rg);
      data.append("data_nascimento", this.crediario.data_nascimento);

      if (this.crediario.telefone) {
        data.append("telefone", this.crediario.telefone);
      }

      data.append("celular", this.crediario.celular);
      data.append("email", this.crediario.email);
      data.append(
        "categoria_profissional",
        this.crediario.categoria_profissional
      );
      data.append(
        "comprovante_residencia_arquivo",
        this.crediario.comprovante_residencia_arquivo
      );
      data.append(
        "documento_foto_arquivo",
        this.crediario.documento_foto_arquivo
      );
      data.append("cpf_cnpj_arquivo", this.crediario.cpf_cnpj_arquivo);
      console.log("dados crediario", this.crediario);

      if (this.getCrediario.foto_selfie) {
        data.append("foto_selfie", this.getCrediario.foto_selfie)
      }

      console.log(data);

      this.salvarCrediario(data);
    },
  },
  created() {
    // console.log(this.$store.getters.getOverlay)
    this.$store.dispatch('alert', { type: 'success', message: 'teste alert' })
  }
};
</script>
