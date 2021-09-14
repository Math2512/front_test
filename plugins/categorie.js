
async getArticles(){
    try{
    const Response = await this.$axios.get('https://d-watch.herokuapp.com/api/categories',{ headers: {
        'Authorization': this.$store.state.auth.accessToken
    }
    })
    Response.data['hydra:member'].forEach((elem) => {
        this.articles.push({
        title: elem.nom
        })
    })
    }catch{
    Cookie.remove('auth')
    this.$store.commit('setAuth', null)
    }
};

export default {
  name: 'GetArticles'
}