<template>

  <body class="row justify-content-end">

    <section class="col-5 fixed-top ms-5 user-forms border border-secondary border-3 rounded p-1 d-flex justify-content-center flex-column">
      
      <SearchBar class=""/>

      <div v-if="account.id" class="mt-1 border border-secondary rounded border-2">
        <div class="p-2 profile-bg text-center d-flex align-items-center" :style="`background-image: url(${account.coverImg});`">
          <div class="bg-dark  rounded-pill d-flex justify-content-center align-items-center">
            <ProfileIcon :profile="account" class="me-1 border border-secondary rounded-circle"/>
            <span class="fs-2 text-light pb-1 pe-2">{{ account.name }}</span>  
          </div>
        </div>
      </div>

      <Poster class=""/>

    </section>

    <section class="col-5 justify-content-center mt-2 me-5">

      <PageTurner/>

      <!-- <div class="d-flex justify-content-evenly fs-2">//NOTE moved to component

        <button v-if="page <= 1" @click="switchPage(page)" class="btn btn-outline-info px-3">
          <i class="mdi mdi-refresh text-info"></i>
        </button>

        <button v-if="page > 1" @click="switchPage(page - 1)" class="btn btn-outline-info px-3">
          <i class="mdi mdi-arrow-left text-info"></i>
        </button>

        <span class="text-info">Page: {{ page }} of {{ totalPages }}<i class="mdi mdi-file"></i></span>

        <button @click="switchPage(page + 1)" class="btn px-3" :class="{'disabled': page == totalPages, 'btn-outline-secondary': page == totalPages, 'btn-outline-info': page != totalPages}">
          <i class="mdi mdi-arrow-right" :class="{'text-secondary': page == totalPages, 'text-info': page != totalPages}"></i>
        </button>

      </div> -->

      <!-- <button @click="loadNewPosts" role="button" class="btn btn-outline-secondary w-100 mt-5">

        <i class="mdi mdi-refresh"></i>

      </button> -->

      <div v-for="post in posts1">

        <PostCard :post="post"/>

      </div>

      <AdCard v-if="ads[0]" :ad="ads[0]"/>

      <div v-for="post in posts2">

        <PostCard :post="post"/>

      </div>

      <AdCard v-if="posts2.length && ads[1]" :ad="ads[1]"/>

      <div v-for="post in posts3">

        <PostCard :post="post"/>

      </div>

      <button @click="goUp()" class="btn btn-outline-info w-100 mb-2"><i class="mdi mdi-arrow-up"></i></button>



      <!-- <button :class="{':disabled': !loadTimedOut, ':enabled':loadTimedOut}" @click="addPosts" role="button" class="btn btn-outline-secondary w-100 mt-5">
        
        <i class="mdi mdi-floppy"></i>
      
      </button> -->

    </section>

  </body>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import  PostCard  from '../components/PostCard.vue'
import AdCard from '../components/AdCard.vue';
import Poster from '../components/Poster.vue'
import PageTurner from '../components/PageTurner.vue';
import SearchBar from '../components/SearchBar.vue';
// import { postService } from '../services/PostService.js'
// import { adService } from '../services/AdService.js'
import { AppState } from '../AppState.js'
import ProfileIcon from '../components/ProfileIcon.vue';
import { Profile } from '../models/Profile';
// import Pop from '../utils/Pop';
// import { logger } from '../utils/Logger.js'

export default {
  setup() {
    onMounted(()=> {
      // getPosts(1, null)
      // getAds()
      scrollToTop()
    })

    // async function getPosts(page, query){
    //   try {
    //     let url = `api/posts?page=${page}`
    //     if(searchQuery.value.query){
    //         url = `api/posts?query=${query}&page=${page}`
    //     }
    //     await postService.getPosts(url)  
    //   } 
    //   catch (error) {
    //     Pop.error(error)
    //   }
    // }

    // async function getAds(){
    //   try {
    //     await adService.getAds()  
    //   } 
    //   catch (error) {
    //     Pop.error(error)
    //   }
    // }

    function scrollToTop(){
      window.scrollTo({top:0, left:0, behavior: 'smooth'})
    }

    // async function loadNewPostsSub(){//The sub-function
    //   try{
    //     return await postService.loadNewPosts()
    //   }
      
    //   catch(error){
    //     Pop.error(error)
    //   }
    // }

    // async function addPostsSub(){
    //   try {
    //     await postService.addPosts()
    //   } 
    //   catch (error) {
    //     Pop.error(error)
    //   }
    // }
    
    return {
      posts1: computed(()=> AppState.posts.slice(0, 5)),
      posts2: computed(()=> AppState.posts.slice(5, 15)),
      posts3: computed(()=> AppState.posts.slice(15)),
      ads: computed(()=> AppState.ads),
      account: computed(()=> new Profile(AppState.account)),
      goUp(){
        scrollToTop()
      }
      // page: computed(()=> AppState.page),
      // totalPages: computed(()=> AppState.totalPages),
      // loadTimedOut: computed(()=> AppState.loadTimedOut),
      
      // loadNewPosts: ()=>{//This entire function and sub-function is bad but I'm going to die on this hill sadly
        
      //   logger.log('Timeout off', AppState.loadTimedOut)
          
      //     if(AppState.loadTimedOut){
            
      //       const addedPosts = loadNewPostsSub()
            
      //       if(addedPosts > 0){Pop.toast(`Added ${addedPosts} Posts`)}
            
      //       else{Pop.toast('No New Posts')}
      //     }
      //     else{
      //       Pop.toast('Request Underway')
      //     } 
      // },
      
      // addPosts: ()=>{//better but *sigh*
      //     if(AppState.loadTimedOut) addPostsSub()
      //     else Pop.toast('Request Underway')
      // },

      // async search(){
      //   try{
      //     await postService.search(searchQuery.value.query)
      //     searchQuery.value.query = ''
      //   }
      //   catch(error){
      //     Pop.error(error)
      //   }
      // },

      // switchPage(page){ //NOTE moved to component
      //     if(searchQuery.value.query){
      //       // logger.log(page, searchQuery.value.query)
      //       getPosts(page, searchQuery.value.query)
      //       getAds()
      //     }
      //     else{
      //       // logger.log(page)
      //       getPosts(page, null)
      //       getAds()
      //     }  
      // },

      // search(){
      //   getPosts(1, searchQuery.value.query)
      // }
    }
  },
  components: { Poster, PostCard, AdCard, PageTurner, SearchBar, ProfileIcon }
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
.user-forms{
  margin-top: 70px;
}
.profile-bg{
  height: 20vh;
  background-position: center;
  background-size: cover;
}
</style>
