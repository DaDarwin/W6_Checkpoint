<template>

    <div class="d-flex justify-content-evenly fs-2">

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

    </div>

</template>


<script>
import { computed, onMounted, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { AppState } from '../AppState';
import { postService } from '../services/PostService.js'
import { adService } from '../services/AdService.js'

import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { profileService } from '../services/ProfileService';
import { Profile } from '../models/Profile';
export default {
    props:{
        profile:{type: Profile}
    },

    setup(props){
        const route = useRoute()
        const query = computed(()=> AppState.query)
        onMounted(()=> {
            // profileService.clearProfile()
            // postService.clearPosts()
            // postService.clearSearch()
            // getPosts(1)
            getAds()
        })
        
        getPosts(1)

        
        watch(query, ()=>{
            logger.log(query)
            getPosts(1)})
            
        async function getPosts(page){
            try {
                let url = ''

                if(route.name == 'Home'){
                    url = `api/posts?page=${page}`
                }
                else if(query.value){
                    url = `api/posts?query=${query.value}&page=${page}`
                }
                else if(props.profile.id){
                    logger.log(props.profile.id)
                    url = `api/profiles/${props.profile.id}/posts?page=${page}`
                }
                await postService.getPosts(url)  
            } 
            catch (error) {
                Pop.error(error)
            }
        }

        async function getAds(){
            try {
                await adService.getAds()  
            } 
            catch (error) {
                Pop.error(error)
            }
        }

    return {
        page: computed(()=> AppState.page),
        totalPages: computed(()=> AppState.totalPages),


        switchPage(page){
            getPosts(page)
            getAds()
        }
      }
    }
};
</script>


<style lang="scss" scoped>

</style>