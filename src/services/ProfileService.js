import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfileService{
    async findProfile(id){
        const res = await api.get(`api/profiles/${id}`)
        // logger.log('response',res)
        AppState.profile = new Profile(res.data)
    }

    clearProfile(){
        AppState.profile = {}
    }
    
    
    
}

export const profileService = new ProfileService()