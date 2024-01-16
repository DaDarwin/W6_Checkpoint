<template>
    <div v-if="account.id" class="mt-5">
        <form @submit.prevent="makePost()" class="mt-5 row">
            <textarea v-model="postData.body" minlength="1" maxlength="5000" rows="10" name="post-body" id="post-body" type="text" class="col-12"/>
            <input v-model="postData.imgUrl" type="text" class="col-12 my-1">
            <button type="submit" class="col-12">Submit</button>
        </form>
    </div>
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
        let postData = ref({});
        watch(
            props,
            ()=>{setData()},
        );
        function setData(){
            postData = props.post
        }
    return {
        postData,
        account: computed(()=> AppState.account),
        makePost(){
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