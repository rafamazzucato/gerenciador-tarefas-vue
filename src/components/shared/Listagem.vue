<template>
    <div class="container-listagem" :class="getClassVazia">
        <item v-if="listaTemRegistros" v-for="tarefa of tarefas" :tarefa="tarefa" />
        <div v-else="listaTemRegistros">
            <img
                src="../../assets/images/lista-vazia.svg"
                alt="Nenhuma atividade encontrada"
            />
            <p>Você ainda não possui tarefas cadastradas!</p>
        </div>
    </div>
</template>
<script>
import Item from './ListagemItem.vue';
export default {
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
        }
    }
}
</script>