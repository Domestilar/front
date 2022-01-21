<template>
    <v-card outlined>
        <v-card-title>Usuário</v-card-title>
        <v-card-text>
            <v-form class="px-3 mt-4" ref="formUsuario">
                <v-layout row wrap>
                    <v-flex xs12 md12>
                        <v-text-field label="Nome" id="id" dense outlined v-model="usuario.name" :rules="rules.password"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md12>
                        <v-text-field label="E-mail" id="id" dense outlined v-model="usuario.email" :rules="rules.password"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md12>
                        <v-text-field
                            label="Senha"
                            id="id"
                            dense
                            outlined
                            v-model="usuario.password"
                            type="password"
                            :rules="rules.password"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" block @click="atualizar()">Atualizar</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    layout: 'admin',
    data() {
        return {
            usuario: {},
            rules: {
                email: [(v) => !!v || "Campo obrigatório."],
                password: [(v) => !!v || "Campo obrigatório."],
            }
        }
    },
    methods: {
        atualizar(){
            if(this.$refs.formUsuario.validate()){
                this.$store.commit('setOverlay', true)
                this.$axios.put(`/usuarios/${this.usuario.id}/update`, this.usuario)
                .then(res => {
                    this.$store.commit('setOverlay', false)
                    this.$store.dispatch('snackbarSuccess', 'Dados atualizados.');
                })
                .catch(e => {
                    this.$store.commit('setOverlay', false)
                    console.log(e)
                })
            }
        }
    },
    created() {
        this.usuario = { ...this.$auth.user }
    }
}
</script>