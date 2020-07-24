<template>
  <div class='work-container'>
    <h1>My projects</h1>
    <div class='work-list-container'>
      <logo-link
        class="link app-link"
        href="https://tv-app-recommendations.beraliv.vercel.app/"
        iconContainerClass="icon-container"
        iconClass="app-icon"
        iconSrc='/tv-app-recommendations.svg'
        aria-label="TV app video recommendation"
        title="Similar videos"
      />
      <logo-link
        class="link app-link"
        href="https://nanoutils.github.io/"
        iconContainerClass="icon-container"
        iconClass="app-icon"
        iconSrc='/nanoutils.svg'
        aria-label="Tiniest FP-friendly JavaScript utils library"
        title="Nanoutils lib"
      />
      <logo-link
        class="link app-link"
        href="https://citrus-sportru-git-master.beraliv.now.sh/"
        iconContainerClass="icon-container"
        iconClass="app-icon"
        iconSrc='/citrus-sports-agency.png'
        aria-label="Citrus sports marketing agency"
        title="Sports agency"
      />
      <logo-link
        class="link app-link"
        href="https://weather.beraliv.dev"
        iconContainerClass="icon-container"
        iconClass="app-icon"
        iconSrc='/cloud.svg'
        aria-label="Weather application"
        title="Weather app"
      />
    </div>
  </div>
</template>

<script>
import LogoLink from './LogoLink.vue';

export default {
  components: {
    LogoLink,
  },
  props: [],
}
</script>

<style>
.work-container {
  margin: 50px 0;
}

.app-link {
  display: block;
  width: 80px;
  height: 80px;
  color: white;
}

.app-icon {
  width: 50px;
  height: 50px;
}

.icon-container {
  font-weight: 900;
  padding: 5px 5px 10px 5px;
}

.work-list-container {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
