<template>
    <b-container><a href="/"><b-icon  class="mt-2 mb-2" style="color:#FFF" font-scale="2" icon="arrow-left"></b-icon></a>
    <b-row> 
        <b-col class="text-center">
            <h1>{{ this.title }}</h1>
        </b-col>
    </b-row>
    <b-row> 
        <b-col class="p-5">
            <p>{{ this.content }}</p>
        </b-col>
    </b-row>
    <b-row> 
        <b-col class="p-5">
            <p>Publié le {{ this.publication }} - {{ this.user }}</p>
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
      update: ''
    }
  },
  beforeMount(){
    this.id = this.$route.params['id']
    this.update = this.$route.params['update']
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
            this.publication = Response.data['data']['published'] ? Response.data['data']['published'] :''
        }
        
      }catch{
        Cookie.remove('auth')
        this.$store.commit('setAuth', null)
      }
    },
  }
}
</script>