<template>
  <button @click="$emit('click')" class="btn btn-circle  btn-secondary ">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits(['click'])
</script>

<style scoped></style>
