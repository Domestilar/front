<template>
    <v-container fluid class="mt-12">
        <v-layout justify-center align-center>
            <v-flex shrink>
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
                <v-card outlined>
                
                    <v-card-title>Entrar</v-card-title>
                    <v-card-text>
                        <v-form ref="formLogin" class="px-3">
                            <v-layout row wrap>
                                <v-flex md12 xs12>
                                    <v-text-field
                                        label="E-mail"
                                        v-model="dadosLogin.email"
                                        outlined
                                        dense
                                        :rules="rules.email"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex md12 xs12>
                                    <v-text-field
                                        label="Senha"
                                        type="password"
                                        v-model="dadosLogin.password"
                                        outlined
                                        dense
                                        :rules="rules.password"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="login()">Entrar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import LoginService from "@/services/LoginService"
export default {
    auth: false,
    data() {
        return {
            dadosLogin: {
                email: "administrador@domestilar.com",
                password: "123456"
            },
            rules: {
                email: [(v) => !!v || "Campo obrigatório."],
                password: [(v) => !!v || "Campo obrigatório."],
            }
        }
    },
    computed: {
        ...mapGetters({

        })
    },
    methods: {
        login() {
            if (this.$refs.formLogin.validate() == false) {
                return
            }

            // this.$store.commit("setOverlay", true)

            // LoginService.login(this.dadosLogin)
            //     .then(res => {
            //         this.$store.commit("setUser", res.data)
            //         sessionStorage.setItem("user", JSON.stringify(res.data.user));
            //         sessionStorage.setItem("token", res.data.user.token)
            //     })
            //     .catch(e => {
            //         console.log(e)
            //         this.$store.commit("setOverlay", false)
            //     })

            try {
                this.$auth.loginWith('laravelJWT', {
                    data: {
                        email: this.dadosLogin.email,
                        password: this.dadosLogin.password
                    }
                })
                .then(res => {
                    if(res.data.access_token){
                        this.$router.push('/admin/crediario')
                    }
                })

                // this.$route.push('/admin/crediarios')
            } catch (error) {
                console.log(e)
            }


        }
    },
    created(){
        if(this.$auth.loggedIn){
            this.$router.push('/admin/crediario')
        }
    }
}
</script>
