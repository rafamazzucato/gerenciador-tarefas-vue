<template>
    <div class="container-footer">
            <button v-b-modal.modal-adicionar><img src="../../assets/images/adicionar.svg" alt="Adicionar tarefa" />Adicionar tarefa</button>
            <span>© Copyright {{getDate}} Fiap. Todos os direitos reservados.</span>
        </div>
</template>

<script>
export default {
    computed : {
        getDate(){
            return new Date().getFullYear();
        }
    }
}
</script>