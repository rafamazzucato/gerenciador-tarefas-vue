<template>
  <div id="main">
    <home v-if="token" @token="setToken"/>
    <login v-else="token" @token="setToken"/>
  </div>
</template>

<script>
import Login from './components/pages/Login.vue';
import Home from './components/pages/Home.vue';
export default {
  data(){
    return {
      token: localStorage.getItem('accessToken')
    }
  },
  components: {
    login : Login,
    home : Home
  },
  methods: {
    setToken(e){
      this.token = e;
    }
  }
}
</script>

<style lang="scss">
</style>
