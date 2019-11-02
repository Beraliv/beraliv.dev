<template>
  <div class="container">
    <main>
      <div>
        <rounded-image class="profile-image" src="https://avatars1.githubusercontent.com/u/2991847" alt="profile image" />
      </div>
      <p class="title name">Alexey Berezin</p>
      <p class="title role">Frontend Developer</p>
    </main>
    <footer>
      <logo-link
        class="link github"
        href="https://github.com/Beraliv"
        iconClass="github-icon"
        aria-label="Visit my GitHub page"
      />
      <logo-link
        class="link linkedin"
        href="https://www.linkedin.com/in/beraliv"
        iconClass="linkedin-icon"
        aria-label="Visit my LinkedIn page"
      />
      <logo-link
        class="link twitter"
        href="https://twitter.com/beraliv"
        iconClass="twitter-icon"
        aria-label="Visit my Twitter page"
      />
    </footer>
  </div>
</template>

<script>
import RoundedImage from '~/components/RoundedImage.vue'
import LogoLink from '~/components/LogoLink.vue'

export default {
  components: {
    RoundedImage,
    LogoLink,
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;

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

footer {
  display: flex;
}

.github-icon {
  background-image: url('/github.svg');
}

.linkedin-icon {
  background-image: url('/linkedin.svg');
}

.twitter-icon {
  background-image: url('/twitter.svg');
}
</style>
