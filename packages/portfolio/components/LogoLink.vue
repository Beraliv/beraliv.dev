<template>
  <a class="logo-link" target="_blank" rel="noopener noreferrer">
    <div :class="iconContainerClass">
      <img class="icon" :class="iconClass" :src="iconSrc" />
      <span v-if="title">{{ title }}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: ["iconContainerClass", "iconClass", "iconSrc", "title"],
};
</script>

<style>
.icon {
  transition: all 0.2s ease-in-out;
}

.icon:hover {
  transform: scale(1.1);
}
</style>
