<template class="container-fluid">
  <Poster/>
  <section class="row">
    <div v-for="post in posts">
      <PostCard :post="post"/>
    </div>
  </section>
  
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
    onMounted(()=> getPosts())

    async function getPosts(){
      try {
        await postService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      posts: computed(()=> AppState.posts)
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
