<template>
    <div class="container-item" :class="isTarefaEntregue" @click="showModal(tarefa)">
        <img
            :src="require('../../assets/images/' + getImageSrc + '')"
            :alt="getImageAlt" />
        <div>
            <p :class="getClassConcluido">{{tarefa.name}}</p>
            <span>{{getDataTexto}}</span>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    props: {
        tarefa: {
            name : '',
            finishPrevisionDate : '',
            finishDate : ''
        }
    },
    methods: {
        showModal(tarefa){
            if(tarefa && !tarefa.finishDate){
                this.$bvModal.show('modal-alterar');
                this.$emit('selecionar-tarefa', tarefa);
            }
        }
    },
    computed : {
        isTarefaEntregue(){
            if(this.tarefa && this.tarefa.finishDate){
                return ''
            }
            return 'ativo';
        },
        getClassConcluido(){
            if(this.tarefa && this.tarefa.finishDate){
                return "concluido";
            }
            return "";
        },
        getImageSrc(){
            if(this.tarefa && this.tarefa.finishDate){
                return "checked.svg";
            }
            return "not-checked.svg";
        },
        getImageAlt(){
            if(this.tarefa && this.tarefa.finishDate){
                return "tarefa concluída";
            }
            return "selecione a tarefa";
        },
        getDataTexto(){
            if (this.tarefa && this.tarefa.finishDate) {
                return `Concluído em: ${moment(this.tarefa && this.tarefa.finishDate).format('DD/MM/yyyy')}`
            } else {
                return `Previsão de conclusão em: ${moment(this.tarefa && this.tarefa.finishPrevisionDate).format('DD/MM/yyyy')}`
            }
        }
    }
}
</script>