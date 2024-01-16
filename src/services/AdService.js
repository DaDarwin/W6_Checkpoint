import { AppState } from "../AppState"
import { Ad } from "../models/Ad"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AdService{

    async getAds(){
        const adRes = await api.get('api/ads')
        AppState.ads = adRes.data.map(ad => new Ad(ad))
        // logger.log(AppState.ads)
    }

}

export const adService = new AdService()