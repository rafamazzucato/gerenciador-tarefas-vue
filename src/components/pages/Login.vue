<template>
    <div class="container-login">
      <img
        src="../../assets/images/logo.svg"
        alt="Logo Devaria"
        class="logo"
      />
      <form>
        <p>{{msgErro}}</p>
        
        <input-customizado
            srcImg="mail.svg"
            altImg="Icone email"
            inputType="text"
            inputName="login"
            inputPlaceholder="Informe seu email"
            :value="body.login"
            @input="setLogin"
            />
         
        <input-customizado
            :value="body.password"
            @input="setPassword"
            srcImg="lock.svg"
            altImg="Icone password"
            inputType="password"
            inputName="password"
            inputPlaceholder="Informe sua password"
            />

        <button type="button" @click="efetuarLogin()">{{labelButton}}</button>
      </form>
    </div>
</template>
<script>
import Input from '../shared/Input.vue';
export default {
    
    components: {
        'input-customizado' : Input
    },    
    data(){
        return {
            labelButton: 'Login',
            msgErro: '',
            body: {
                login: '',
                password:''
            }
        }
    },
    methods : {
        efetuarLogin(){
            this.labelButton = '...Carregando';
            this.msgErro = '';
        
            this.$http
            .post('login', this.body)
            .then(response => {
                console.log(response);
                this.labelButton = 'Login';
                // localStorage.setItem('accessToken', resultado.data.token);
                // localStorage.setItem('usuarioNome', resultado.data.name);
                // localStorage.setItem('usuarioEmail', resultado.data.email);

                // this.$emit('token', resultado.data.token);
            })
            .catch(e => {
                if (e && e.response && e.response.data && e.response.data.erro) {
                    this.msgErro = e.response.data.erro;
                } else {
                    this.msgErro = 'Não foi possível efetuar o login, fale com o administrador.';
                }

                this.labelButton = 'Login';
            });
        },
        setLogin(e){
            this.body.login = e;
        },
        setPassword(e){
            this.body.password = e;
        }
    }
}
</script>