<template>
  <div class='work-container'>
    <h1>My projects</h1>
    <div class='work-list-container'>
      <logo-link
        class="link weather-app"
        href="https://weather.beraliv.dev"
        iconContainerClass="icon-container weather-app-icon-container"
        iconClass="weather-app-icon"
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

.weather-app {
  display: block;
  width: 80px;
  height: 80px;
  color: white;
}

.weather-app-icon {
  width: 50px;
  height: 50px;
}

.icon-container {
  font-weight: 900;
  background-color: #e67e22;
  border-radius: 15px;
  padding: 5px 5px 10px 5px;
}

.work-list-container {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>