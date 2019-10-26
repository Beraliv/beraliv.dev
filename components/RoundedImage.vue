<template>
  <img 
    class="rounded-image"
    :src="source"
  />
</template>

<script>
export default {
  props: ['source'],
}
</script>

<style>
.rounded-image {
  border-radius: 50%;
}
</style>