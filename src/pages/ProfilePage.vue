<template>
    <section class="container-fluid">

        <header class="row justify-content-center" :class="{'border-success': profile.graduated,'border-secondary': !profile.graduated}">

            <div class="col-10 position-relative">

                <img :src="profile.coverImg" alt="" class="coverImg p-0 w-100 border" :class="{'border-3': profile.graduated,}">

                    <span class="d-flex align-items-center p-0 position-absolute border rounded-pill bg-page profile-icon" :class="{'border-3': profile.graduated,}">

                    <img :src="profile.picture" alt="" class="profilePic p-0">

                    <div v-if="profile.github || profile.linkedin || profile.resume" class="d-flex flex-column me-4">

                        <a v-if="profile.github" :href="profile.github" :title="`Go to ${profile.name}'s Github'`" target="_blank">
                            <i class="mdi mdi-github fs-2 me-2" :class="{'text-success': profile.graduated, 'text-secondary': !profile.graduated}">Github</i>
                        </a>

                        <a v-if="profile.linkedin" :to="profile.linkedin" :title="`Go to ${profile.name}'s LinkedIn'`" target="_blank" class="ms-2">
                            <i class="mdi mdi-linkedin fs-2 ms-2" :class="{'text-success': profile.graduated, 'text-secondary': !profile.graduated}">LinkedIn</i>
                        </a>

                        <a v-if="profile.resume" :to="profile.resume" title="View Resume" target="_blank">
                            <i class="mdi mdi-account fs-2 me-2" :class="{'text-success': profile.graduated, 'text-secondary': !profile.graduated}">Resume</i>
                        </a>
                        
                    </div>

                </span>
            </div>

        </header>

        <body class="row justify-content-center">

            <p class="text-primary col-10">{{profile.bio}}</p>

            <section class="col-6 justify-content-center mt-5 me-5">
                <div v-for="post in posts" class="mt-5">
                  <PostCard v-if="profile.id == post.creatorID" :post="post"/>
                </div>
            </section>

        </body>
        
    </section>
</template>
  
<script>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { profileService } from '../services/ProfileService.js'
import { postService } from '../services/PostService.js'
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
export default {
    setup() {
        const route = useRoute()
        const routeProfile = computed(() => route.params.profileId)

        function scolltoTop(){
            window.scrollTo({top:0, left:0, behavior: 'instant'})
        }

        async function findProfile(){
            try {
                profileService.findProfile(route.params.profileId)
            } 
            catch (error) {
                Pop.error(error)
            }
        }

        async function getProfilePosts(){
            try{
                await postService.getProfilePosts(route.params.profileId)
            }
            catch(error){
                Pop.error(error)
            }
        }
        watch(
            routeProfile,
            () => {
                logger.log('watch', routeProfile)
                postService.clearPosts()
                scolltoTop()
                profileService.clearProfile()
                /**@ts-ingore*/
                findProfile()
                getProfilePosts()
                
            },
            { immediate: true }
            )
            return {
                profile: computed(()=> AppState.profile),
                posts: computed(()=> AppState.posts)
                
                
            }
        }
    }
</script>

<style scoped>
.coverImg{
    height: 40vh;
    object-fit: cover;
    object-position: center;
}
.profilePic{
    height: 20vh;
    width: 20vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    
}
.profile-icon{
    left: 5vw;
    bottom: 2vh;
    width:fit-content;
}
.bg-page{
    background-color: var(--bs-page);
}
</style> 

/**@ts-ignore*/
