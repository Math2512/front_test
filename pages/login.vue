<template>
    <b-container>
        <b-row>
            <b-col cols="6" class="mx-auto mt-2">
                <h1 class="text-center">Login</h1>
                <span class="text-danger">{{error}}</span>
                <b-form-group id="input-email-label" label="Email :" label-for="input-email">
                    <b-form-input v-model="email" id="input-email" type="email">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-password-label" label="Mot de passe :" label-for="input-password">
                    <b-form-input v-model="password" id="input-password" type="password">
                    </b-form-input>
                </b-form-group>
                <b-button @click="Login()" class="btn btn-block mt-4">Envoyer</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" class="mx-auto text-center mt-2">
                <b-link href="/register">Inscription</b-link>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    middleware: 'notAuthenticated',
    data(){
        return{
            email: '',
            password: '',
            error: ''
        }
    },
    methods:{
        async Login(){
            try {
                const Response = await this.$axios.post('http://127.0.0.1:8000/api/login', {
                    email: this.email,
                    password: this.password
                })
                .then(function (response) {
                    if(response.data.api_token)
                        return response.data
                    else
                        return response.data
                })
                
                if(Response.api_token){
                    const auth = {
                        accessToken: Response.api_token
                    }
                    this.$store.commit('setAuth', auth) // mutating to store for client rendering
                    Cookie.set('auth', auth) // saving token in cookie for server rendering
                    this.$router.push('/')
                }else{
                    console.log(Response)
                    this.error = 'Identifiant ou mot de passe incorrect'
                }
            } catch (e) {
                
            }
        }
    }
}
</script>