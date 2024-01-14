<template>
  <header>
    <Navbar class="fixed-top mb-5"/>
  </header>
  <main class="container-fluid">
    <router-view />
  </main>
   <footer class="bg-dark text-light">
    The Network ©
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import { postService } from './services/PostService'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    getPosts()

    async function getPosts(){
      try {
        await postService.getPosts()  
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    return {
      appState: computed(() => AppState)
      
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
