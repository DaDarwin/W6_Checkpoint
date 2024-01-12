<template>
    <form @submit.prevent="post()">
        <textarea v-model="postData.body" minlength="1" maxlength="5000" rows="10" name="post-body" id="post-body" type="text"/>
        <button type="submit">Submit</button>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted, watch } from 'vue';
import Pop from '../utils/Pop';
import { postService } from '../services/PostService';
import { logger } from '../utils/Logger';
import { Post } from '../models/Post.js'

export default {
    props: {
        post: { type: Post }
    },
    setup(props){
        const postData = ref({});
        watch(
            props,
            ()=>{setData()},
        );
        function setData(){
            postData = props.post
        }
    return {
        postData,
        post(){
            try{
                // logger.log(postData.value)
                if(props.post){
                    postService.updatePost(postData.value)
                }
                else{
                    postService.post(postData.value)
                }
            }
            catch(error){
                Pop.error(error)
            }
        },
      }
    }
};
</script>


<style lang="scss" scoped>

</style>