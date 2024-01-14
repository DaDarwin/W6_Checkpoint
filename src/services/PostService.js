import { AppState } from "../AppState"
import { Post } from "../models/Post.js"
import { Ad } from "../models/Ad.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService"

class PostService{

    clearPosts(){
        AppState.profilePosts = []
    }

    async getPosts(){
        const res = await api.get('api/posts')
        let posts = res.data.posts.map(post => new Post(post))
        
        const adRes = await api.get('api/ads')
        logger.log('get',res, adRes)
        let ads = adRes.data.map(ad => new Ad(ad))

        posts.splice(5, 0, ads[0])
        posts.splice(15, 0, ads[1])

        AppState.posts = posts



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
        AppState.loadTimedOut = false
        AppState.page ++
        const res = await api.get(`/api/posts?page=${AppState.page}`)
        // logger.log('add res', res)
        const array = res.data.posts.map(post => new Post(post))
        logger.log('array', array)
        for(let i=0; i < array.length; i++){
            AppState.posts.push(array[i])
        }
        setTimeout(()=> AppState.loadTimedOut = true, 5000)
    }
    async loadNewPosts(){
        AppState.loadTimedOut = false
        let addedPosts = 0
        const res = await api.get('api/posts')
        logger.log(res)
        const posts = res.data.posts.map(post => new Post(post))
        for(let i = posts.length; i >= 0; i--){
            if(!(AppState.posts.includes(posts[i])), posts.length){
                AppState.posts.splice(0, 0, posts[i])
                addedPosts ++
            }
        }        
        setTimeout(()=> AppState.loadTimedOut = true, 5000)
        return addedPosts
    }

    async search(query){
        const res = await api.get(`api/posts?query=${query}`)
        logger.log(res, query)
        if(res.data.posts.length > 0){
            AppState.posts = res.data.posts.map(post => new Post(post))
        }
        else{
            throw new Error('No Posts Found')
        }
    }

}

export const postService = new PostService()