export class Profile{
    constructor(data){
        this.id = data._id || data.id
        
        this.name = data.name
        this.bio = data.bio
        this.picture = data.picture
        this.coverImg = data.coverImg
        this.createdAt = data.createdAt
        this.subs = data.subs

        this.github = data.github
        this.linkedin = data.linkedin
        this.resume = data.resume

        this.class = data.class
        this.graduated = data.graduated
    }
}
