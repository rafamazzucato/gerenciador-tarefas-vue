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
        <listagem :tarefas="tarefas" @atualiza-lista="atualizaLista"/>
        <custom-footer />
        <b-modal id="modal-adicionar" hide-footer hide-header hide-backdrop>
            <div class="container-modal">
                <p>Adicionar uma tarefa</p>
                <p v-if="erro" class="error">{{erro}}</p>
                <input type="text" name="nome"
                    placeholder="Nome da tarefa"
                    class="col-12"
                    v-model="name" />
                <input type="text" name="dataPrevisao"
                    placeholder="Data de previsão de conclusão"
                    class="col-12"
                    v-model="finishPrevisionDate"
                    @blur="onBlurDate"
                    @focus="onFocusDate"/>
                <div class="buttons col-12 mt-4">
                    <button @click="adicionarTarefa()">Salvar</button>
                    <span @click="doCancelar()">Cancelar</span>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Header from '../shared/Header.vue';
import Filtros from '../shared/Filtros.vue';
import Listagem from '../shared/Listagem.vue';
import Footer from '../shared/Footer.vue';
export default {
    data(){
        return {
            tarefas : [],
            periodoDe : '',
            periodoAte : '',
            status : '0',
            erro: '',
            name: '',
            finishPrevisionDate : ''
        }
    },
    components : {
        'custom-header' : Header,
        'filtro-lista' : Filtros,
        'listagem' : Listagem,
        'custom-footer' : Footer,
    },
    methods : {
        atualizaLista(){
            this.getTarefasComFiltro();
        },
        doCancelar(){
            this.erro = '';
            this.name = '';
            this.finishPrevisionDate = '';
            this.$bvModal.hide('modal-adicionar');
        },
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
        },
        adicionarTarefa(){
            if (!this.name || !this.finishPrevisionDate) {
                this.erro = 'Favor informar nome e data de previsão';
                return;
            }

            const body = {
                name: this.name,
                finishPrevisionDate: this.finishPrevisionDate
            }

            const token = localStorage.getItem('accessToken');

            this.$http
            .post('task', body, {headers: {'Authorization': 'Bearer ' + token}})
            .then(response => response.json())
            .then(resultado => {
                this.doCancelar();
                this.getTarefasComFiltro();
            })
            .catch(e => {
                console.log(e);
                if (e && e.response && e.response.data && e.response.data.erro) {
                    this.msgErro = e.response.data.erro;
                } else {
                    this.msgErro = 'Não foi possível salvar a tarefa tente novamente.';
                }
            });
        },
        onBlurDate(e){
            if(this.finishPrevisionDate){
                e.target.type = 'date';
            }else{
                e.target.type = 'text'
            }
        },
        onFocusDate(e){
            e.target.type = 'date'
            
        }
    },
    created(){
        this.getTarefasComFiltro();
    }
}
</script>