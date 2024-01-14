<template>
  <body class="row justify-content-between">
    <section class="col-4">
      <Poster class="fixed-top ms-5 w-25"/>
    </section>
    <section class="col-6 justify-content-center mt-5 me-5">
      <button @click="loadNewPosts" role="button" class="btn btn-outline-secondary w-100 mt-5"><i class="mdi mdi-refresh"></i></button>
      <div v-for="post in posts" class="mt-2">
        <PostCard :post="post"/>
      </div>
      <button @click="addPosts" role="button" class="btn btn-outline-secondary w-100 mt-5"><i class="mdi mdi-floppy"></i></button>
    </section>
  </body>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { postService } from '../services/PostService.js'
import { AppState } from '../AppState.js'
import  PostCard  from '../components/PostCard.vue'
import Poster from '../components/Poster.vue'
export default {
  setup() {
    getPosts()
    onMounted(()=> {
      scolltoTop()
    })

    function scolltoTop(){
      window.scrollTo({top:0, left:0, behavior: 'instant'})
    }

    async function getPosts(){
      try {
        await postService.getPosts()  
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    async function addPosts(){
      try {
        await postService.addPosts()
      } catch (error) {
        Pop.error(error)
      }
    }
    async function loadNewPosts(){
      try{
        const addedPosts = await postService.loadNewPosts()
        if(addedPosts > 0){
          Pop.toast(`Added ${addedPosts} Posts`)
        }
        else{
          Pop.toast('No New Posts')
        }
      }
      catch(error){
        Pop.error(error)
      }
    }
    return {
      posts: computed(()=> AppState.posts),
      loadNewPosts: ()=> loadNewPosts(),
      addPosts: ()=> addPosts()

    }
  },
  components:{Poster, PostCard}
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
