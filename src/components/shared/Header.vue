<template>
    <div class="container-header">
        <img class="logo" src="../../assets/images/logo.svg" alt="Logo Devaria" />
        <button><span>+</span> Adicionar tarefa</button>
        <div class="mobile">
            <span>Olá, {{primeiroNome}}</span>
            <img class="sair" src="../../assets/images/exit.svg" alt="Deslogar" @click="sair" />
        </div>
        <div class="desktop">
            <span>Olá, {{primeiroNome}}</span>
            <img class="sair" src="../../assets/images/exit-desktop.svg" alt="Deslogar" @click="sair" />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            primeiroNome : localStorage.getItem('usuarioNome')
        }
    },
    methods: {
        sair(){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('usuarioNome');
            localStorage.removeItem('usuarioEmail');

            this.$emit('efetuarSair', '');
        }
    }
}
</script>