import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
class PostService{

    clearPosts(){
        AppState.profilePosts = [
    new Post({
        body:' ', 
        imgUrl: 'https://www.transparenttextures.com/patterns/absurdity.png', 
        creator:{
          id: 'a', 
          picture: 'https://www.transparenttextures.com/patterns/absurdity.png'}, 
        likeIds: []
      }), 
      new Post({
        body:' ', 
        imgUrl: 'https://www.transparenttextures.com/patterns/absurdity.png', 
        creator:{
          id: 'a', 
          picture: 'https://www.transparenttextures.com/patterns/absurdity.png'}, 
        likeIds: []
      }), 
        ]
    }

    async getPosts(){
        const res = await api.get('api/posts')
        logger.log('get',res)
        AppState.posts = res.data.posts.map(post => new Post(post))
        logger.log('appstate',AppState.posts)
    }

    async post(data){
        const res = await api.post('api/posts', data)
        logger.log(res)
        AppState.posts.splice(0, 0, new Post(res.data))
        // logger.log(AppState.posts)
    }

    async deletePost(id){
        const res = await api.delete(`api/posts/${id}`)
        const index = AppState.posts.findIndex(post => post.id == id)
        AppState.posts.splice(index, 1)
        // logger.log(AppState.posts)
    }

    async likePost(id){
        const res = await api.post(`/api/posts/${id}/like`)
        // logger.log(res)
        AppState.posts.find(post=> post.id == id).likeIds = res.data.likeIds
    }

    async getProfilePosts(id){
        const res = await api.get(`/api/profiles/${id}/posts`)
        // logger.log(res)
        AppState.profilePosts = res.data.posts.map(post => new Post(post))

    }

    async addPosts(){
        AppState.page ++
        const res = await api.get(`/api/posts?page=${AppState.page}`)
        // logger.log('add res', res)
        const array = res.data.posts.map(post => new Post(post))
        // logger.log('array', array)
        for(let i=0; i < array.length; i++){
            AppState.posts.push(array[i])
        }
    }
    async loadNewPosts(){
        let addedPosts = 0
        const res = await api.get('api/posts')
        logger.log(res)
        const posts = res.data.posts.map(post => new Post(post))
        for(let i = posts.length; i >= 0; i--){
            if(AppState.posts.includes(posts[i]), posts.length){
                break
            }
            else{
                AppState.posts.splice(0, 0, posts[i])
                addedPosts ++
            }
        }
        return addedPosts
    }

}

export const postService = new PostService()