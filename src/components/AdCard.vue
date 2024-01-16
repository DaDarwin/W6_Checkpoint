<template>

    <a :href="ad.banner" class="selectable">

        <div class="row justify-content-between border border-2 border-secondary rounded m-2 bg-card">
            
            <div class="col-12 text-center p-2">
                
                <img  :src="ad.square" class="adImg border border-1 border-secondary rounded">
                
            </div>
                        
        </div>
    
    </a>

</template>


<script>
import { Ad } from '../models/Ad.js'
export default {
    props: {
        ad: { type: Ad, required: true }
    },
    setup(){ return {

    }},
}
</script>


<style lang="scss" scoped>
    .adImg{
        aspect-ratio: 1;
        object-fit: cover;
        object-position: center;
    }
    .bg-card{
        box-shadow:0,0,5px,black;
        min-height: 50vh;
    }

</style>