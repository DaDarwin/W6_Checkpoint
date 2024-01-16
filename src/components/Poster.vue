<template>
        <form @submit.prevent="makePost()" v-if="account.id" class="mt-1 p-1 border border-secondary rounded border-2">
            <div class="fs-4 text-center text-secondary border border-secondary rounded p-1 mb-1">Make A Post!</div>
            <textarea v-model="postData.body" minlength="1" maxlength="5000" rows="10" name="post-body" id="post-body" type="text" class="m-0 w-100 form-control" placeholder="Post Body"/>
            <input v-model="postData.imgUrl" type="text" class="my-1 w-100 form-control" placeholder="http://ImgUrl">
            <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-outline-info">Submit</button>
            </div>
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