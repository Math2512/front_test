<template>
  <b-container>
    <b-row> 
        <b-col class="text-center">
            <h1>Mes Articles</h1>
        </b-col>
    </b-row>
    <b-row> 
      <CardArticle :key="article.id" v-for="article in articles"
        :id="article.id" 
        :titre="article.title" 
        :content="article.content" 
        :publication="article.publication"
        :user="article.user"
        :me="true"  />

      <a href="/article/add" class="float" style="z-index:10000">
        <b-icon icon="plus" class="my-float"></b-icon>
      </a>
    </b-row>
    
  </b-container>
</template>

<script>
import CardArticle from '@/components/CardArticle'
import { BIcon, BIconPlus } from 'bootstrap-vue'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  
  components:{
    CardArticle,
    BIcon,
    BIconPlus
  },
  middleware: 'authenticated',
  data(){
    return{
      articles:[],
      pseudo: this.$store.state.auth.pseudo
    }
  },
  beforeMount(){
    this.getArticles()
  },
  methods:{
    async getArticles(){
      try{
        const Response = await this.$axios.get('http://127.0.0.1:8000/api/me',{ headers: {
          'Authorization': this.$store.state.auth.accessToken
        }
        })
        Response.data['data'].forEach((elem) => {
          this.articles.push({
            id: elem.id,
            title: elem.title,
            content: elem.content,
            user: elem.user,
            publication: elem.published ? elem.published :''
          })
        })
      }catch{
        Cookie.remove('auth')
        this.$store.commit('setAuth', null)
      }
    },
  }
}
</script>

<style scoped>

.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:#0C9;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
}

.my-float{
	margin-top:5px;
	margin-left:5px;
  font-size: 50px;
}

</style>