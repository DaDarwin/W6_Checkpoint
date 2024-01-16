import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfileService{
    async findProfile(id){
        AppState.profile = {}
        if(id){
            const res = await api.get(`api/profiles/${id}`)
            const profile = new Profile(res.data)
            logger.log('Profile', profile)
            AppState.profile = profile
        }
    }

    clearProfile(){
    }
    
    
    
}

export const profileService = new ProfileService()