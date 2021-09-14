<template>
  <b-container>
    <a href="/"><b-icon  class="mt-2 mb-2" style="color:#FFF" font-scale="2" icon="arrow-left"></b-icon></a>
    <b-row>
        <b-col cols="6" class="mx-auto">
            <h1 class="mt-3 mb-5 text-center">Ajouter un article</h1>
            <span class="text-danger">{{error_title}}</span>
            <b-form-group id="input-titre-label" label="Titre :" label-for="input-titre">
                <b-form-input v-model="titre" id="input-titre" type="text">
                </b-form-input>
            </b-form-group>
            <span class="text-danger">{{error_content}}</span>
            <b-form-textarea
                id="content"
                v-model="content"
                placeholder="Votre article..."
                rows="3"
                max-rows="6"
            ></b-form-textarea>
            <b-form-checkbox
                id="status"
                v-model="status"
                name="status"
                value='1'
                class="mt-2"
                @change="check($event)"
                unchecked-value='0'
            >
               Publier ?
            </b-form-checkbox>
            <label v-if="seen" class="mt-4" for="published-datepicker">Date de publication :</label>
            <b-form-datepicker v-if="seen" id="published-datepicker" v-model="published" class="mb-2"></b-form-datepicker>          
            <b-form-timepicker v-if="seen" v-model="time_published" locale="en"></b-form-timepicker>
            <button  @click="Save()" class="btn btn-lg btn-primary btn-block mt-4">Enregistrer</button>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { BIcon, BIconArrowLeft } from 'bootstrap-vue'
export default {
    middleware: 'authenticated',
    components:{
        BIcon,
        BIconArrowLeft
    },
    data(){
        return{
            titre: '',
            content: '',
            published: '',
            status: 0,
            error: '',
            seen:false,
            error_title:'',
            error_content: '',
            time_published: ''
        }
    },
    beforeMount(){
    },
    methods:{
        async Save(){
            try {
                const Response = await this.$axios.post('http://127.0.0.1:8000/api/article', {
                    title: this.titre,
                    content: this.content,
                    published: this.published+' '+this.time_published,
                    status: this.status
                },
                { headers: {'Authorization': this.$store.state.auth.accessToken }
                })
                .then(function (response) {
                    console.log(response)
                    return response
                })
                if(Response.data.created_at){
                    this.$router.push('/')
                }else{
                    this.error_content = Response.data.errors.content ? Response.data.errors.content[0] : ''
                    this.error_title   = Response.data.errors.title ? Response.data.errors.title[0]  : ''
                    return
                }

            } catch (e) {
                this.error = e.response.data.message
            }
        },
        check: function(e) {
		    this.seen = !this.seen
        },
        
    }

}
</script>