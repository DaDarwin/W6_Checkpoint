<template>

  <div class="about text-center mt-5">
    <h1 class="mt-5">Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <form @submit.prevent="updateAccount()">

    <div>
      <label for="profile-name">name</label>
      <input v-model="profileData.name" type="text" id="profile-name">
    </div>

    <div>
      <label for="profile-bio">bio</label>
      <textarea v-model="profileData.bio" name="bio" id="profile-bio" cols="30" rows="10"></textarea>
    </div>

    <div>
      <label for="profile-picture">picture</label>
      <input v-model="profileData.picture" type="text" id="profile-picture">
    </div>

    <div>
      <label for="profile-coverImg">coverImg</label>
      <input v-model="profileData.coverImg" type="text" id="profile-coverImg">
    </div>

    <div>
      <label for="profile-github">github</label>
      <input v-model="profileData.github" type="text" id="profile-github">
    </div>

    <div>
      <label for="profile-linkedin">linkedin</label>
      <input v-model="profileData.linkedin" type="text" id="profile-linkedin">
    </div>

    <div>
      <label for="profile-resume">resume</label>
      <input v-model="profileData.resume" type="text" id="profile-resume">
    </div>

    <div>
      <label for="profile-class">class</label>
      <input v-model="profileData.class" type="text" id="profile-class">
    </div>

    <div>
      <label for="profile-graduated">graduated?</label>
      <input v-model="profileData.graduated" type="checkbox" id="profile-graduated">
    </div>

    <div>
      <button class="">Submit</button>
    </div>

    

    
  </form>

</template>

<script>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';
export default {
  setup() {
    let profileData = ref({})
    let account = computed(()=> AppState.account)

    watch(
      account,
      () => {
        profileData.value = { ...AppState.account }
      },
      { immediate: true }
    )
    
    return {
      profileData,
      account: computed(() => AppState.account),
      
      async updateAccount(){
        try {
          await accountService.updateAccount(profileData.value)
          Pop.toast('Account Updated')  
        } 
        catch (error) {
          Pop.error(error)
          
        }
      }

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
