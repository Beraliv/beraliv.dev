<template>
  <div class="container">
    <div>
      <div>
        <rounded-image class="profile-image" src="https://avatars1.githubusercontent.com/u/2991847" alt="profile image" />
      </div>
      <p class="title name">Alexey Berezin</p>
      <p class="title role">Frontend Developer</p>
    </div>
  </div>
</template>

<script>
import RoundedImage from '~/components/RoundedImage.vue'

export default {
  components: {
    RoundedImage
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: #192343;
  font-family: sans-serif;
}

@keyframes profile-animation {
  0% { transform: translate(0, 0); }
  50% { transform: translate(0, -20px); }
  100% { transform: translate(0, 0); }
}

.profile-image {
  width: 50%;
  animation: profile-animation 3s infinite linear;
  will-change: translate;
}

.title {
  color: #fff;
}

.name {
  margin: 0 18px;
  font-size: 36px;
  font-weight: bold;
}

.role {
  font-size: 18px;
}
</style>
