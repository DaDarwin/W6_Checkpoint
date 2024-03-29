import { Profile } from "./Profile"

export class Post{
    constructor(data){
        this.id = data._id
        this.body = data.body,
        this.imgUrl = data.imgUrl,
        this.creatorID = data.creatorID || data.creator._id
        this.creator = new Profile(data.creator)
        this.likeIds = data.likeIds        
    }
}
// {
// "type": "String",
// "required": true,
// "maxLength": 5000
// },
// "imgUrl": {
// "type": "String",
// "maxLength": 500
// },
// "creatorId": {
// "type": "ObjectId",
// "required": true,
// "ref": "Account"
// },
// "likeIds": 
// {
// "type": "ObjectId",
// "ref": "Account"
// }