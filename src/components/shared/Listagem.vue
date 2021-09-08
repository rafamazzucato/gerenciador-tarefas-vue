<template>
    <div class="container-listagem" :class="getClassVazia">
        <item v-if="listaTemRegistros" v-for="tarefa of tarefas" :tarefa="tarefa" @selecionar-tarefa="selecionarTarefa" />
        <div v-if="!listaTemRegistros">
            <img
                src="../../assets/images/lista-vazia.svg"
                alt="Nenhuma atividade encontrada"
            />
            <p>Você ainda não possui tarefas cadastradas!</p>
        </div>
        <b-modal id="modal-alterar" hide-footer hide-header hide-backdrop>
            <div class="container-modal">
                <p>Alterar uma tarefa</p>
                <p v-if="erro" class="error">{{erro}}</p>
                <input type="text" name="nome"
                    placeholder="Nome da tarefa"
                    class="col-12"
                    v-model="name" />
                <input type="date" name="dataPrevisao"
                    placeholder="Data de previsão de conclusão"
                    class="col-12"
                    :value="formatedPrevision"
                    @input="finishPrevisionDate = $event.target.value"
                    @blur="onBlurDate"
                    @focus="onFocusDate"/>
                <input type="text" name="dataConclusao"
                    placeholder="Data de conclusão"
                    class="col-12"
                    :value="formatedFinish"
                    @input="finishDate = $event.target.value"
                    @blur="onBlurFinishDate"
                    @focus="onFocusDate"/>
                <div class="buttons col-12 mt-4">
                    <button @click="atualizarTarefa()">Alterar</button>
                    <span @click="excluirTarefa()">Excluir</span>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import Item from './ListagemItem.vue';
import moment from 'moment';

export default {
    data(){
        return {
            erro: '',
            id: null,
            name: '',
            finishPrevisionDate : '',
            finishDate : '',
        }
    },
    props: {
        tarefas: []
    },
    components: {
        item : Item
    },
    computed: {
        getClassVazia(){
            if(this.tarefas && this.tarefas.length > 0){
                return '';
            }
            return 'vazia';
        },
        listaTemRegistros(){
            return this.tarefas && this.tarefas.length > 0;
        },
        formatedPrevision(){
            if(this.finishPrevisionDate){
                return moment(this.finishPrevisionDate).format('yyyy-MM-DD');
            }
            return this.finishPrevisionDate;
        },
        formatedFinish(){
            if(this.finishDate){
                return moment(this.finishDate).format('yyyy-MM-DD');
            }
            return this.finishDate;
        }
    },
    methods: {
        doCancelar(){
            this.erro = '';
            this.name = '';
            this.finishPrevisionDate = '';
            this.finishDate = '';
            this.id = '';
            this.$bvModal.hide('modal-alterar');
        },
        selecionarTarefa(e){
            if(e){
                this.name = e.name;
                this.finishPrevisionDate = e.finishPrevisionDate;
                this.finishDate = e.finishDate;
                this.id = e._id
            }
        },
        atualizarTarefa(){
            if (!this.name || !this.finishPrevisionDate) {
                this.erro = 'Favor informar nome e data de previsão';
                return;
            }

            if (!this.id) {
                this.erro = 'Tarefa não informada';
                return;
            }

            const body = {
                name: this.name,
                finishPrevisionDate: this.finishPrevisionDate,
                finishDate: this.finishDate
            }

            const token = localStorage.getItem('accessToken');

            this.$http
            .put('task?id='+this.id, body, {headers: {'Authorization': 'Bearer ' + token}})
            .then(response => response.json())
            .then(resultado => {
                this.doCancelar();
                this.$emit('atualiza-lista', '');
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
        excluirTarefa(){
            if (!this.id) {
                this.erro = 'Tarefa não informada';
                return;
            }

            const token = localStorage.getItem('accessToken');

            this.$http
            .delete('task?id='+this.id, {headers: {'Authorization': 'Bearer ' + token}})
            .then(response => response.json())
            .then(resultado => {
                this.doCancelar();
                this.$emit('atualiza-lista', '');
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
        onBlurFinishDate(e){
            if(this.finishDate){
                e.target.type = 'date';
            }else{
                e.target.type = 'text'
            }
        },
        onFocusDate(e){
            e.target.type = 'date'   
        }
    }
}
</script>