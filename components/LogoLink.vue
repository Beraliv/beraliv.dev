<template>
  <a 
    class="logo-link"
    :href="href"
    target="_blank"
  >
    <div class="icon" :class="iconClass" />
  </a>
</template>

<script>
export default {
  props: ['href', 'iconClass'],
}
</script>

<style>
.logo-link > .icon {
  width: 50px;
  height: 50px;
  margin: 10px;
}
</style>