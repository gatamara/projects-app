<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';

</script>

<template>
  <div class="flex flex-col">
    <TopMenu />
    <main class="flex flex-row ">

      <SideMenu />

      <RouterView />
    </main>
  </div>
</template>
