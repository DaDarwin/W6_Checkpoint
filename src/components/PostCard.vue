<template>

    <div v-if="Object.hasOwn(post, 'creator')" class="row justify-content-between border border-2 rounded m-2 bg-card" 
        :class="{
            'border-success': post.creator.graduated,
            'bg-dark': post.creator.graduated, 
            'border-secondary': !post.creator.graduated}"
        >

        <div v-if="post.imgUrl" class="col-12 text-center p-2">

            <img  :src="post.imgUrl" 
                class="postImg border border-1 rounded" 
                :class="{
                    'border-success': post.creator.graduated, 
                    'border-secondary': !post.creator.graduated
                }"
            >

        </div>

        <p class="col-12 text-center fs-2" 
            :class="{
                        'text-success': post.creator.graduated, 
                        'text-secondary': !post.creator.graduated}"
        > {{ post.body }} </p>

        <div class="d-flex justify-content-between border-top border-2 col-12 p-2" 
            :class="{
                'border-success': post.creator.graduated, 
                'border-secondary': !post.creator.graduated
            }"
        >

            <div class="d-flex align-items-center">

                <ProfileIcon v-if="post.creator" :profile="post.creator"/>

                <button 
                    v-if="post.creatorID == account.id"
                    @click="deletePost(post.id)"
                    class="btn btn-outline-danger m-1"
                >

                    <i class="mdi mdi-delete text-danger fs-2"></i>

                </button>

                <button 
                    v-if="post.creatorID == account.id" 
                    @click="editPost()" 
                    data-bs-toggle="modal" :data-bs-target="`#edit-car-modal-${post.id}`"
                    class="btn btn-outline-warning m-1"
                >
                    <i class="mdi mdi-pen text-warning fs-2"></i>

                </button>

                <span v-else class="fs-4 ms-1" 
                    :class="{
                        'text-success': post.creator.graduated, 
                        'text-secondary': !post.creator.graduated}"
                    >{{post.creator.name}}</span>
                    
            </div>

            <div class="d-flex align-items-center">

            <span class="text-info fs-2" v-if="post.likeIds.length">Likes: {{ post.likeIds.length}}</span>

                <button
                    @click="likePost(post.id)"
                    class="btn btn-outline-info m-2">
                    <i class="mdi text-info fs-2" 
                    :class="{
                        'mdi-heart': post.likeIds.includes(account.id),
                        'mdi-heart-outline': !post.likeIds.includes(account.id)}">
                    </i>

                </button>

            </div>

        </div>

    </div>

    <ModalWrapper :modalId="`edit-post-modal-${post.id}`">

        <div>Edit Post</div>

        <Poster :post="post"/>

    </ModalWrapper>

    <div v-if="Object.hasOwn(post, 'banner')">
        <!-- {{post.title}} -->
        <img :src="post.square" :alt="post.title">
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Post } from '../models/Post.js';
import { Ad } from '../models/Ad.js'
import Pop from '../utils/Pop';
import { postService } from '../services/PostService';
import ModalWrapper from '../components/ModalSM.vue'
import ProfileIcon from './ProfileIcon.vue';
import Poster from './Poster.vue'
export default {
    props: {
        post: { type: Post || Ad, required: true }
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
                Pop.error(error)
            }
        },
        async likePost(id){
            try{
                postService.likePost(id)
            }
            catch(error){
                Pop.error(error)
            }
        },
     }
    },
    components: { ModalWrapper, ProfileIcon, Poster }
}
</script>


<style lang="scss" scoped>
    .postImg{
        height: 50vh;
        max-width: 95%;
        object-fit: cover;
        object-position: center;
    }
    .bg-card{
        box-shadow:0,0,5px,black;
        min-height: 50vh;
    }

</style>