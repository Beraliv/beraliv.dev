<template>
  <a 
    class="logo-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class='icon-container'>
      <img class='icon' :class="iconClass" :src="iconSrc" />
      <span v-if="title">{{title}}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: ['iconClass', 'iconSrc', 'title'],
}
</script>

<style>
</style>