<template>
  <b-col cols="12">
    <b-card v-if="me" class="mt-3 mb-2" :title="titre" style="color:#000; cursor:pointer" @click="edit(id)">
      <b-card-text>
        {{ content }}
      </b-card-text>
      <b-card-text class="small ">{{ publication }} par {{ user }}</b-card-text>
    </b-card>
    <b-card v-else class="mt-3 mb-2" :title="titre" style="color:#000; cursor:pointer" @click="showMore(id)" >
      <b-card-text>
        {{ content }}
      </b-card-text>
      <b-card-text class="small ">{{ publication }} par {{ user }}</b-card-text>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name:'CardArticle',
  props: ["titre", "content", "publication", "id", "user", "me"],
  filters: {
    truncate(string, value) {
      if(string.length > 17)
        return string.substring(0, value) + '…';
      else
        return string
    }
  },
  methods:{
    showMore(id)
    {
      this.$router.push({path: '/article/'+id, params:{ id: id }})
    },
    edit(id)
    {
      this.$router.push({path: '/me/'+id, params:{ id: id }})
    },
  }
}
</script>

<style scoped>
  .link:hover{
    text-decoration:none
  }
</style>