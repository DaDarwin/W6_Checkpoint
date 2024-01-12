import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostService{

    async getPosts(){
        const res = await api.get('api/posts')
        logger.log(res)
        AppState.posts = res.data.posts.map(post => new Post(post))
        logger.log(AppState.posts)
    }

    async post(data){
        const res = await api.post('api/posts', data)
        logger.log(res)
        AppState.posts.splice(0, 0, new Post(res.data))
        logger.log(AppState.posts)
    }

    async deletePost(id){
        const res = await api.delete(`api/posts/${id}`)
        const index = AppState.posts.findIndex(post => post.id == id)
        AppState.posts.splice(index, 1)
        logger.log(AppState.posts)
    }

}

export const postService = new PostService()