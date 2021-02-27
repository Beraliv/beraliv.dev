<template>
  <img 
    class="rounded-image"
    :alt="alt"
    :src="src"
  />
</template>

<script>
export default {
  props: ['src', 'alt'],
}
</script>

<style>
.rounded-image {
  border-radius: 50%;
}
</style>