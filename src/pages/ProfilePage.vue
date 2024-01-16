<template>
    <section v-if="profile.id" class="container-fluid">

        <header class="row justify-content-center" 
            :class="{
                'border-success': profile.graduated,
                'border-secondary': !profile.graduated
            }"
        >

            <div class="col-10 position-relative">

                <img :src="profile.coverImg" alt="" 
                    class="coverImg p-0 w-100 border" 
                    :class="{'border-3': profile.graduated,}"
                >

                    <span class="d-flex align-items-center p-0 position-absolute border rounded-pill bg-page profile-icon" 
                        :class="{'border-3': profile.graduated,}"
                    >

                    <img :src="profile.picture" 
                        alt="" 
                        class="profilePic p-0"
                    >

                    <div v-if="profile.github || profile.linkedin || profile.resume" 
                        class="d-flex flex-column me-4"
                    >

                        <a v-if="profile.github" 
                            :href="profile.github" 
                            :title="`Go to ${profile.name}'s Github'`" 
                            target="_blank"
                        >

                            <i class="mdi mdi-github fs-2 me-2" 
                                :class="{
                                    'text-success': profile.graduated, 
                                    'text-secondary': !profile.graduated
                                }"
                            >Github</i>

                        </a>

                        <a v-if="profile.linkedin" 
                            :href="profile.linkedin" 
                            :title="`Go to ${profile.name}'s LinkedIn'`" 
                            target="_blank" class="ms-2"
                        >

                            <i class="mdi mdi-linkedin fs-2 ms-2" 
                                :class="{
                                    'text-success': profile.graduated, 
                                    'text-secondary': !profile.graduated
                                }">LinkedIn</i>

                        </a>

                        <a v-if="profile.resume" 
                            :href="profile.resume" 
                            title="View Resume" 
                            target="_blank"
                        >

                            <i class="mdi mdi-account fs-2 me-2" 
                            :class="{'text-success': profile.graduated, 'text-secondary': !profile.graduated}">Resume</i>

                        </a>
                        
                    </div>

                </span>
            </div>

        </header>

        <body class="row justify-content-center">

            <p class="text-secondary col-10 fs-3">{{profile.class}}</p>

            <p class="text-secondary col-10">{{profile.bio}}</p>

            <!-- <button @click="loadNewPosts" role="button" class="btn btn-outline-secondary w-100 mt-5">

                <i class="mdi mdi-refresh"></i>

            </button> -->

            <section class="col-6 justify-content-center mt-5 me-5">

                <PageTurner :profile="profile"/>

                <div v-for="post in posts" class="mt-5">

                  <!-- <PostCard v-if="profile.id == post.creatorID || Object.hasOwn(post, 'banner')" :post="post"/> -->
                  <PostCard :post="post"/>

                </div>

                <button @click="goUp()" class="btn btn-outline-info w-100 mb-2"><i class="mdi mdi-arrow-up"></i></button>


                <!-- <div v-for="post in profilePosts">

                    <PostCard v-if="!posts.includes(post)"/>
                        
                </div> -->

                <!-- <button :class="{':disabled': !loadTimedOut, ':enabled':loadTimedOut}" @click="addPosts" role="button" class="btn btn-outline-secondary w-100 mt-5">
        
                    <i class="mdi mdi-floppy"></i>
      
                </button> -->

            </section>

        </body>
        
    </section>
</template>
  
<script>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { profileService } from '../services/ProfileService.js'
// import { postService } from '../services/PostService.js'
import Pop from '../utils/Pop';
import PageTurner from '../components/PageTurner.vue';
import { AppState } from '../AppState';

export default {
    setup() {
        const route = useRoute()
        const routeProfile = computed(() => route.params.profileId)

        function scrollToTop(){
            window.scrollTo({top:0, left:0, behavior: 'smooth'})
        }

        async function findProfile(){
            try {
                profileService.findProfile(route.params.profileId)
            } 
            catch (error) {
                Pop.error(error)
            }
        }

        // async function getProfilePosts(){
        //     try{
        //         postService.clearPosts()
        //         await postService.getPosts(`api/profiles/${route.params.profileId}/posts`)
        //     }
        //     catch(error){
        //         Pop.error(error)
        //     }
        // }

        // async function loadNewPostsSub(){//The sub-function
        //     try{
        //         return await postService.loadNewPosts()
        //     }
        //     catch(error){
        //         Pop.error(error)
        //     }
        // }

        // async function addPostsSub(){
        //     try {
        //         await postService.addPosts()
        //     } 
        //     catch (error) {
        //         Pop.error(error)
        //     }
        // }
        watch(
            routeProfile,
            () => {
                scrollToTop()
                findProfile()
                // logger.log('watch', routeProfile)
                // postService.clearPosts()
                // profileService.clearProfile()
                /**@ts-ignore*/
                // getProfilePosts()
                
            },
            {immediate: true}
            )
            return {
                profile: computed(()=> AppState.profile),
                posts: computed(()=> AppState.posts),
                loadTimedOut: computed(()=> AppState.loadTimedOut),
                goUp(){
                    scrollToTop()
                }

                // loadNewPosts: ()=>{//This entire function and sub-function is bad but I'm going to die on this hill sadly, also i copy & pasted this yes
        
                //     logger.log('Timeout off', AppState.loadTimedOut)
                    
                //     if(AppState.loadTimedOut){
                        
                //         const addedPosts = loadNewPostsSub()
                        
                //         if(addedPosts > 0){Pop.toast(`Added ${addedPosts} Posts`)}
                        
                //         else{Pop.toast('No New Posts')}
                //     }
                //     else{
                //         Pop.toast('Request Underway')
                //     } 
                // },
      
                // addPosts: ()=>{//better but *sigh*
                //     if(AppState.loadTimedOut) addPostsSub()
                //     else Pop.toast('Request Underway')
                // },
                // profilePosts: computed(()=> AppState.profilePosts)
                            
                            
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
