<template>
  <b-container><a href="/me/profil"><b-icon  class="mt-2 mb-2" style="color:#FFF" font-scale="2" icon="arrow-left"></b-icon></a>
    <b-row>
        <b-col cols="6" class="mx-auto">
            <h1 class="mt-3 mb-5 text-center" v-if="published">Modifier l'article : {{ this.title }}</h1>
            <h1 class="mt-3 mb-5 text-center" v-else>Article : {{ this.title }} <span class="text-muted">(Publié)</span></h1>
            
            <span class="text-danger">{{error_title}}</span>
            <b-form-group v-if="published" id="input-titre-label" label="Titre :" label-for="input-titre">
                <b-form-input v-model="title" id="input-titre" type="text">
                </b-form-input>
            </b-form-group>
            <b-row v-else> 
                <b-col class="text-center">
                    <h1>{{ title }}</h1>
                </b-col>
            </b-row>
            <span class="text-danger">{{error_content}}</span>
            <b-form-textarea
                v-if="published"
                id="content"
                v-model="content"
                placeholder="Votre article..."
                rows="3"
                max-rows="6"
            ></b-form-textarea>
             <b-row v-else> 
                <b-col class="p-5">
                    <p>{{ this.content }}</p>
                </b-col>
            </b-row>
            <label class="mt-4" for="published-datepicker">Date de publication :</label>
            <b-form-datepicker v-if="published" id="published-datepicker" v-model="publication" class="mb-2"></b-form-datepicker>
            <b-form-timepicker v-if="published" v-model="time_published" locale="en"></b-form-timepicker>
            <p v-else>{{publication}}</p>
            <button v-if="status == 0"  @click="Edit()" class="btn btn-lg btn-primary btn-block mt-4">Enregistrer</button>
            <button  @click="Destroy()" class="btn btn-lg btn-danger btn-block mt-4">Supprimer</button>
        </b-col>
    </b-row>  
    
  </b-container>
</template>


<script>
import { BIcon, BIconPlus, BIconArrowLeft } from 'bootstrap-vue'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  components:{
    BIcon,
    BIconPlus,
    BIconArrowLeft
  },
  middleware: 'authenticated',
  data(){
    return{
      title:'',
      content:'',
      user:'',
      publication:'',
      user:'',
      id: '',
      status: 0,
      seen:false,
      error_title:'',
      error_content: '',
      published: true,
      time_published: ''
    }
  },
  beforeMount(){
    this.id = this.$route.params['id']
    this.getArticle()
  },
  methods:{
    async getArticle(){
      try{
        const Response = await this.$axios.get('http://127.0.0.1:8000/api/article/'+this.id,{ headers: {
          'Authorization': this.$store.state.auth.accessToken
        }
        })
        if(Response.data){
            this.title = Response.data['data']['title'],
            this.content = Response.data['data']['full_content'],
            this.user = Response.data['data']['user'],
            this.publication = Response.data['data']['published'],
            this.published = Response.data['data']['published'] ? false : true
        }
        
      }catch{
        Cookie.remove('auth')
        this.$store.commit('setAuth', null)
      }
    },
    async Edit(){
      try {
          const Response = await this.$axios.put('http://127.0.0.1:8000/api/article/'+this.id, {
              title: this.title,
              content: this.content,
              published_at: this.publication+' '+this.time_published,
              status: this.status,
              deleted: 0
          },
          { headers: {'Authorization': this.$store.state.auth.accessToken }
          })
          .then(function (response) {
              return response
          })
          console.log(Response);
          if(Response.data.created_at){
              this.$router.push('/me/profil')
          }else{
              this.error_content = Response.data.errors.content ? Response.data.errors.content[0] : ''
              this.error_title   = Response.data.errors.title ? Response.data.errors.title[0]  : ''
              return
          }

      } catch (e) {
          console.log(e)
      }
    },
    async Destroy(){
      try {
          const Response = await this.$axios.put('http://127.0.0.1:8000/api/article/'+this.id, {
              deleted: 1
          },
          { headers: {'Authorization': this.$store.state.auth.accessToken }
          })
          .then(function (response) {
            return response
          })
          
          this.$router.push('/me/profil')
          

      } catch (e) {
          console.log(e)
      }
    },
    check: function(e) {
    this.seen = !this.seen
    },
  }
}
</script>