<template>
    <form @submit.prevent="addSearch()" class="d-flex rounded overflow-hidden">
        <input v-model="searchQuery.query" id="search" type="text" class="w-75 form-control border border-secondary border-end-0 rounded-end-0" placeholder="Search...">
        <button class="w-25 btn btn-outline-info rounded-start-0">Submit</button>
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