<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" v-if="this.$store.state.auth">
      <b-navbar-brand href="#">TEST</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/me/profil">Mes articles</b-nav-item>
          <b-nav-item @click="logout()">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
    <footer class=" text-center pb-2 mt-1" style="color:#FFF;">
        <p class="text-muted"></p>
        <small>
            &copy; {{ date }} &middot; <a href="">Mathieu Fontaine</a> <span class="text-danger">&hearts;</span>
        </small>
    </footer>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
var d = new Date();
var n = d.getFullYear();

export default {
  data(){
    return{
      pseudo: '',
      date: n
    }
  },
  beforeMount(){
    this.pseudo = this.$store.state.auth ? this.$store.state.auth.pseudo : ''
  },
  methods:{
    logout(){
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.$router.push('/login')
    }
  },
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  background-color: #000000 !important;
  color: #FFF;
}

</style>
