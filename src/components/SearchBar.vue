<template>
    <form @submit.prevent="addSearch()" class="mt-2">
        <input v-model="searchQuery.query" id="search" type="text">
        <button>Submit</button>
    </form>
</template>


<script>
import { ref } from 'vue';
import { postService } from '../services/PostService';
export default {
    setup(){
    let searchQuery = ref({})

    return {
        searchQuery,
        addSearch(){
            postService.addSearch(searchQuery.value.query)
        }
      }
    }
};
</script>


<style lang="scss" scoped>

</style>