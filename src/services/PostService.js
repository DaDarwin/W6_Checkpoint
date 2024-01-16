import { AppState } from "../AppState"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService"

class PostService{

    clearPosts(){
        AppState.profilePosts = []
    }

    // async getPosts(){
    //     const res = await api.get('api/posts')
    //     AppState.posts = res.data.posts.map(post => new Post(post))
    //     logger.log('get', res)
    //     AppState.page = res.data.page
    //     AppState.totalPages = res.data.totalPages
    // }

    async post(data){
        const res = await api.post('api/posts', data)
        logger.log(res)
        AppState.posts.splice(0, 0, new Post(res.data))
        // logger.log(AppState.posts)
    }

    async deletePost(id){
        await api.delete(`api/posts/${id}`)
        const index = AppState.posts.findIndex(post => post.id == id)
        AppState.posts.splice(index, 1)
        // logger.log(AppState.posts)
    }

    async likePost(id){
        const res = await api.post(`/api/posts/${id}/like`)
        // logger.log(res)
        AppState.posts.find(post=> post.id == id).likeIds = res.data.likeIds
    }

    // async getProfilePosts(id){
    //     const res = await api.get(`/api/profiles/${id}/posts`)
    //     // logger.log(res)
    //     AppState.posts = res.data.posts.map(post => new Post(post))

    // }

    // async addPosts(){
    //     // AppState.loadTimedOut = false
    //     AppState.page ++
    //     const res = await api.get(`/api/posts?page=${AppState.page}`)
    //     // logger.log('add res', res)
    //     const array = res.data.posts.map(post => new Post(post))
    //     logger.log('array', array)
    //     for(let i=0; i < array.length; i++){
    //         AppState.posts.push(array[i])
    //     }
    //     // setTimeout(()=> AppState.loadTimedOut = true, 5000)
    // }
    // async loadNewPosts(){
    //     // AppState.loadTimedOut = false
    //     let addedPosts = 0
    //     const res = await api.get('api/posts')
    //     logger.log(res)
    //     const posts = res.data.posts.map(post => new Post(post))
    //     for(let i = posts.length; i >= 0; i--){
    //         if(!(AppState.posts.includes(posts[i])), posts.length){
    //             AppState.posts.splice(0, 0, posts[i])
    //             addedPosts ++
    //         }
    //     }        
    //     // setTimeout(()=> AppState.loadTimedOut = true, 5000)
    //     return addedPosts
    // }
    
    // async search(query){
    //     const res = await api.get(`api/posts?query=${query}`)
    //     logger.log(res, query)
    //     if(res.data.posts.length > 0){
    //         AppState.posts = res.data.posts.map(post => new Post(post))
    //     }
    //     else{
    //         throw new Error('No Posts Found')
    //     }
    // }
    
    async getPosts(url){ // was switchPage(url) until i realized this can do all my get requests while remaining simple
        const res = await api.get(url)
        const posts = res.data.posts.map(post => new Post(post))

        if(AppState.posts[0] == posts[0]){//NOTE - With how the api works I'm pretty sure this would save a little bit of cpu, but i'm pretty sure it would be better handled in the api by checking if there where any posts added since the last request that match the filters and have it send back the error
            throw new Error('No New Posts')
        }
        if(!posts[0]){
            throw new Error('No Posts Found')
        }
        
        AppState.posts = posts
        AppState.page = res.data.page
        AppState.totalPages= res.data.totalPages
    }
}

export const postService = new PostService()