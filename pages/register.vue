<template>
    <b-container>
        <b-row>
            <b-col cols="6" class="mx-auto mt-2">
                <h1 class="text-center">Register</h1>
                <span class="text-danger">{{error_email}}</span>
                <b-form-group id="input-email-label" label="Email :" label-for="input-email">
                    <b-form-input v-model="email" id="input-email" type="email">
                    </b-form-input>
                </b-form-group>
                <span class="text-danger">{{error_password}}</span>
                <b-form-group id="input-password-label" label="Mot de passe :" label-for="input-password">
                    <b-form-input v-model="password" id="input-password" type="password">
                    </b-form-input>
                </b-form-group>
                <span class="text-danger">{{error_name}}</span>
                <b-form-group id="input-name-label" label="Votre nom :" label-for="input-name">
                    <b-form-input v-model="name" id="input-name">
                    </b-form-input>
                </b-form-group>
                <b-button @click="Register()" class="btn btn-block mt-4">S'inscrire</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" class="mx-auto text-center mt-2">
                Already have an account ? <b-link href="/login">Login</b-link>
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
            name: '',
            error_email: '',
            error_password: '',
            error_name: ''
        }
    },
    methods:{
        async Register(){
            try {
                const Response = await this.$axios.post('http://127.0.0.1:8000/api/register', {
                    email: this.email,
                    password: this.password,
                    name: this.name
                })
                .then(function (response) {
                    if(response.data.created_at)
                        return response.data
                    else
                        return response.data
                })
                console.log(Response)
                if(Response.created_at){
                    this.$router.push('/login')
                }else{
                    this.error_email    = Response.errors.email ? Response.errors.email[0] :''
                    this.error_name     = Response.errors.name ? Response.errors.name[0] :''
                    this.error_password = Response.errors.password ? Response.errors.password[0] :''
                }
            } catch (e) {
                
            }
        }
    }
}
</script>