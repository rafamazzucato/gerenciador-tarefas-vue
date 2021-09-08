<template>
    <div class="container-home">
        <custom-header @efetuarSair="efetuarSair"/>
        <filtro-lista 
            :periodoDe="periodoDe"
            @setPeriodoDe="setPeriodoDe"
            :periodoAte="periodoAte"
            @setPeriodoAte="setPeriodoAte"
            :status="status"
            @setStatus="setStatus"
        />
        <listagem :tarefas="tarefas"/>
    </div>
</template>

<script>
import Header from '../shared/Header.vue';
import Filtros from '../shared/Filtros.vue';
import Listagem from '../shared/Listagem.vue';
export default {
    data(){
        return {
            tarefas : [],
            periodoDe : '',
            periodoAte : '',
            status : '0',
        }
    },
    components : {
        'custom-header' : Header,
        'filtro-lista' : Filtros,
        'listagem' : Listagem,
    },
    methods : {
        efetuarSair(e){
            this.$emit('token', '');
        },
        setPeriodoDe(e){
            this.periodoDe = e;
            this.getTarefasComFiltro();
        },
        setPeriodoAte(e){
            this.periodoAte = e;
            this.getTarefasComFiltro();
        },
        setStatus(e){
            this.status = e;
            this.getTarefasComFiltro();
        },
        getTarefasComFiltro(){
            let filtros = '?status=' + this.status;

            if (this.periodoDe) {
                filtros += '&periodoDe=' + this.periodoDe;
            }

            if (this.periodoAte) {
                filtros += '&periodoAte=' + this.periodoAte;
            }

            const token = localStorage.getItem('accessToken');

            this.$http
            .get('task'+filtros, {headers: {'Authorization': 'Bearer ' + token}})
            .then(response => response.json())
            .then(resultado => {
                this.tarefas = resultado;
            })
            .catch(e => {
                console.log(e);
                if (e && e.response && e.response.data && e.response.data.erro) {
                    this.msgErro = e.response.data.erro;
                } else {
                    this.msgErro = 'Não foi possível efetuar o login, fale com o administrador.';
                }
            });
        }
    },
    created(){
        this.getTarefasComFiltro();
    }
}
</script>