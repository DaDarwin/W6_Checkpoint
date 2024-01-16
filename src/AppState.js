import { reactive } from 'vue'

export const AppState = reactive({
  user: {},
  
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {import('./models/Post.js').Post[]} */
  posts: [],

  page:1,

  totalPages:1,

  /**@type {import('./models/Profile.js').Profile)} */
  profile:{},

  /**@type {import('./models/Ad.js').Ad[]} */
  ads:[],

  // loadTimedOut: true
})