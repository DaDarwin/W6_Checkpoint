<template>
    <div class="d-flex">
        <p>
          {{ post.body }}  
        </p>
        <div>
            <button
                @click="likePost()"
                class="btn btn-outline-primary m-1">
                <i class="mdi text-primary fs-2" :class="{"mdi-heart": post.likeIds.includes(account.id)}"></i>
            </button>
            <button 
                v-if="post.creatorID == account.id"
                @click="deletePost(post.id)"
                class="btn btn-outline-danger m-1">
                <i class="mdi mdi-delete text-danger fs-2"></i>
            </button>
            <button 
                v-if="post.creatorID == account.id" 
                @click="" 
                data-bs-toggle="modal" :data-bs-target="`#edit-car-modal-${post.id}`"
                class="btn btn-outline-success m-1">
                <i class="mdi mdi-pen text-success fs-2"></i>
            </button>
        </div>


    </div>

    <ModalWrapper :modalId="`edit-post-modal-${post.id}`">
        <div>Edit Post</div>
        <!-- <Poster :post="post"/> -->
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