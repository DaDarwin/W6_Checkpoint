import { reactive } from 'vue'
import { Post } from './models/Post.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  // /**@type {import('./models/Post.js').Post[]} */
  posts: [
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
    new Post({
      body:' ', 
      imgUrl: 'https://www.transparenttextures.com/patterns/absurdity.png', 
      creator:{
        id: 'a', 
        picture: 'https://www.transparenttextures.com/patterns/absurdity.png'}, 
      likeIds: []
    })
    ],
  /**@type {import('./models/Profile.js').Profile)} */
  profile:{},
  page: 1,
  /**@type {import('./models/Post.js').Post[]} */
  profilePosts:[],

  loadTimedOut: true
})