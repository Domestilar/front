<template>
    <v-simple-table dense>
        <template v-slot:default>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in getCrediario.referencias_pessoais" :key="r.id">
                    <td>{{r.nome}}</td>
                    <td>{{r.telefone}} <span v-if="r.ramal">RAMAL: {{r.ramal}}</span></td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            getCrediario: 'crediario/getCrediario'
        })
    },
    methods: {
        visualizar(url){
            window.open(url, '_blank')
        },
        aprovar(){

        },
        reitar(){

        }


    }
}
</script>