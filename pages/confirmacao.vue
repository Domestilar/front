<template>
    <v-row justify="center" align="center">
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
                <v-layout justify-center align-center>
                    <v-flex shrink>
                        <h3
                            align="center"
                        >Parabéns, seus dados foram encaminhados setor responsável pela análise, em breve entraremos em contato com você.</h3>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-col>
    </v-row>
</template>
<script>
export default {
    auth: false
}
</script>