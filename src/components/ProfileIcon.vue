<template>
    <router-link @click="window.scrollTo(0,0, {behavior: smooth})" :to="{ name: 'Profile', params: { profileId: profile.id } }">
          <img :title="`Go to ${profile.name}'s Profile`" :src="profile.picture" :alt="profile.name">
    </router-link>
</template>


<script>
import { computed, ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { Profile } from '../models/Profile';

export default {
    props: {
        profile: { type: Profile }
    },
    
    setup(){
        
        return {
            scrollToTop(){
                
            }
        }
    },
    components: { RouterLink }
}
</script>


<style lang="scss" scoped>
    img{
        height: 8vh;
        aspect-ratio: 1/1;
        border-radius: 50%;
    }

</style>