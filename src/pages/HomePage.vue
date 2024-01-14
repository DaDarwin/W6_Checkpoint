<template>

  <body class="row justify-content-end">

    <section class="col-4 fixed-top mt-5 ms-5">

      <form @submit.prevent="search()">
        <input v-model="searchQuery.query" id="search" type="text">
        <button>Submit</button>
      </form>

      <Poster class="w-25"/>

    </section>

    <section class="col-6 justify-content-center mt-5 me-5">

      <button @click="loadNewPosts" role="button" class="btn btn-outline-secondary w-100 mt-5">

        <i class="mdi mdi-refresh"></i>

      </button>

      <div v-for="post in posts" class="mt-2">

        <PostCard :post="post"/>

      </div>

      <button :class="{':disabled': !loadTimedOut, ':enabled':loadTimedOut}" @click="addPosts" role="button" class="btn btn-outline-secondary w-100 mt-5">
        
        <i class="mdi mdi-floppy"></i>
      
      </button>

    </section>

  </body>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { postService } from '../services/PostService.js'
import { AppState } from '../AppState.js'
import  PostCard  from '../components/PostCard.vue'
import Poster from '../components/Poster.vue'
import { logger } from '../utils/Logger.js'
export default {
  setup() {
    let searchQuery = ref({});
    onMounted(()=> {
      scrollToTop()
    })

    function scrollToTop(){
      window.scrollTo({top:0, left:0, behavior: 'instant'})
    }

    async function loadNewPostsSub(){//The sub-function
      try{
        return await postService.loadNewPosts()
      }
      
      catch(error){
        Pop.error(error)
      }
    }

    async function addPostsSub(){
      try {
        await postService.addPosts()
      } 
      catch (error) {
        Pop.error(error)
      }
    }

    
    return {
      searchQuery,
      posts: computed(()=> AppState.posts),
      loadTimedOut: computed(()=> AppState.loadTimedOut),
      
      loadNewPosts: ()=>{//This entire function and sub-function is bad but I'm going to die on this hill
        
        logger.log('Timeout off', AppState.loadTimedOut)
          
          if(AppState.loadTimedOut){
            
            const addedPosts = loadNewPostsSub()
            
            if(addedPosts > 0){Pop.toast(`Added ${addedPosts} Posts`)}
            
            else{Pop.toast('No New Posts')}
          }
          else{
            Pop.toast('Request Underway')
          } 
      },
      
      addPosts: ()=>{//better but *sigh*
          if(loadTimeOut) addPostsSub()
          else Pop.toast('Request Underway')
      },

      async search(){
        try{
          await postService.search(searchQuery.value.query)
        }
        catch(error){
          Pop.error(error)
        }
      }
    }
  },
  components: {Poster, PostCard}
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
