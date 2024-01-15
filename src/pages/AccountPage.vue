<template>

  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <form @submit.prevent="update()">

    <div>
      <label for="profile-name"></label>
      <input v-model="profileData.name" type="text" id="profile-name">
    </div>

    <div>
      <label for="profile-bio"></label>
      <textarea v-model="profileData.bio" name="bio" id="profile-bio" cols="30" rows="10"></textarea>
    </div>

    <div>
      <label for="profile-picture"></label>
      <input v-model="profileData.picture" type="text" id="profile-picture">
    </div>

    <div>
      <label for="profile-coverImg"></label>
      <input v-model="profileData.coverImg" type="text" id="profile-coverImg">
    </div>

    <div>
      <label for="profile-github"></label>
      <input v-model="profileData.github" type="text" id="profile-github">
    </div>

    <div>
      <label for="profile-linkedin"></label>
      <input v-model="profileData.linkedin" type="text" id="profile-linkedin">
    </div>

    <div>
      <label for="profile-resume"></label>
      <input v-model="profileData.resume" type="text" id="profile-resume">
    </div>

    <div>
      <label for="profile-class"></label>
      <input v-model="profileData.class" type="text" id="profile-class">
    </div>

    <div>
      <label for="profile-graduated"></label>
      <input v-model="profile.graduated" type="checkbox" id="profile-graduated">
      
    </div>

    

    
  </form>

</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    let profileData = ref({})
    return {
      profileData,
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
