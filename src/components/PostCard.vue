<template>
    <div class="row">
        <p>
          {{ post.body }}  
        </p>
        <button 
            v-if="post.creatorID == account.id"
            @click="deletePost(post.id)"
            class="col-2 btn btn-outline-danger">
                <i class="mdi mdi-bin text-danger"></i>
        </button>
        <button 
            v-if="post.creatorID == account.id" 
            @click="" 
            class="col-2 btn btn-outline-danger">
                <i class="mdi mdi-bin text-danger"></i>
        </button>


    </div>

    <ModalWrapper modalId="edit-post-modal">
        <div>Edit Post</div>
        <Poster :post="post"/>
    </ModalWrapper>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Post } from '../models/Post';
import Pop from '../utils/Pop';
import { postService } from '../services/PostService';
import { Account } from '../models/Account';
import ModalWrapper from '../components/ModalSM.vue'
export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(){
    return {
        account: computed(()=> AppState.account),
        async deletePost(id){
            try {
               const res = await Pop.confirm('Are you sure you want to delete this Post?')
               if(res){
                    postService.deletePost(id)
               } 
            } catch (error) {
                
            }
        } 
     }
    },
    components: { ModalWrapper }
};
</script>


<style lang="scss" scoped>

</style>