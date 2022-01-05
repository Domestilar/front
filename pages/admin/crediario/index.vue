<template>
    <v-card outlined>
        <v-card-title>
            Crediários
            <v-spacer></v-spacer>
            <h3>Registros: {{ getCrediarios.total }} -</h3>
            <v-pagination
                outlined
                total-visible="7"
                v-model="getCrediarios.current_page"
                :length="getCrediarios.last_page"
                @input="listarCrediario({ ...filtros, page: $event })"
            ></v-pagination>
        </v-card-title>
        <v-card-text>
            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>CÓD</th>
                            <th>
                                <v-text-field
                                    v-model="filtros.nome"
                                    outlined
                                    dense
                                    label="Nome"
                                    class="mt-2"
                                    @input="debouncedPesquisar()"
                                ></v-text-field>
                            </th>
                            <th>
                                <v-text-field
                                    v-model="filtros.cpf_cnpj"
                                    outlined
                                    dense
                                    label="CPF"
                                    class="mt-2"
                                    @input="debouncedPesquisar()"
                                ></v-text-field>
                            </th>
                            <th>
                                <v-select
                                    outlined
                                    class="mt-2"
                                    label="Status"
                                    dense
                                    :items="['AGUARDANDO VALIDAÇÃO', 'VALIDADO', 'AGUARDANDO APROVAÇÃO', 'APROVADO']"
                                    @input="debouncedPesquisar"
                                    v-model="filtros.status"
                                ></v-select>
                            </th>
                            <th>
                                <v-text-field
                                    v-model="filtros.created_at"
                                    outlined
                                    dense
                                    label="Data"
                                    class="mt-2"
                                    type="date"
                                    @input="debouncedPesquisar()"
                                ></v-text-field>
                            </th>
                            <th>
                                <v-select
                                    outlined
                                    label="Exibir"
                                    dense
                                    :items="[10, 20, 30, 40, 50]"
                                    item-value="value"
                                    item-text="label"
                                    v-model="filtros.limit"
                                    @change="listarCrediario({ ...filtros })"
                                    class="mt-2"
                                ></v-select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="c in getCrediarios.data" :key="c.id">
                            <td>{{ c.id }}</td>
                            <td>{{ c.nome }}</td>
                            <td>{{ c.cpf_cnpj }}</td>
                            <td>{{ c.status }}</td>
                            <td>{{ $helper.formatDateTime(c.created_at) }}</td>
                            <td>
                                <nuxt-link :to="`/admin/crediario/${c.id}`">
                                    <v-btn color="primary" x-small>Visualizar</v-btn>
                                </nuxt-link>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-card-actions>
            
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
var _ = require("lodash");
export default {
    layout: 'admin',
    // auth: 'guest',
    data() {
        return {
            filtros: {
                nome: '',
                cpf_cnpj: '',
                status: '',
                created_at: '',
                limit: 10,
                page: 1,
            }
        }
    },
    computed: {
        ...mapGetters({
            getCrediarios: 'crediario/getCrediarios'
        })
    },
    methods: {
        ...mapActions({
            listarCrediario: 'crediario/listarCrediario'
        }),
        pesquisar() {
            this.listarCrediario({ ...this.filtros });
        },
    },
    created() {
        this.listarCrediario({ ...this.filtros })
        this.debouncedPesquisar = _.debounce(this.pesquisar, 300);
    }
}
</script>