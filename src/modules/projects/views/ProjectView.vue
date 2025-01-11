<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrumbs :name="project?.name ?? 'No name'" />
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completa en </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tas in project?.task" :key="tas.id" class="hover">
              <th>
                <input type="checkbox" :checked="!!tas.completedAt" class="checkbox  checkbox-primary"
                  @change="projectStore.toggleTask(project!.id, tas.id)" />
              </th>
              <td>{{ tas.name }}</td>
              <td>{{ tas.completedAt }}</td>
            </tr>
            <tr class="hover">
              <th></th>
              <td>
                <input type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-95 focus:opacity-100"
                  placeholder="nueva tarea" v-model="newTask" @keyup.enter="addTask" />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>

</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useProjectsStore } from '../store/projects.store';
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import type { Project } from '../interfaces/project.interface';

interface Props {
  id: string
}

const router = useRouter()
const props = defineProps<Props>()
const projectStore = useProjectsStore()
const project = ref<Project | null>()
const newTask = ref('')

const addTask = () => {
  if (!project.value) return
  projectStore.addTaskToProjects(project.value.id, newTask.value)
  newTask.value = ''
}

watch(() => props.id, () => { //cuando cambia esto, se dispara el sigueinte callback
  project.value = projectStore.projectsList.find((project) => project.id === props.id)  //este callback
  if (!project.value) {
    router.replace('/')
  }
},
  { immediate: true }) //con esto, le digo que tan pronto se cargue el componente, ejecutalo.





//:checked="!!tas.completedAt" la doble negacion lo convierte en l valor booleano y true
</script>
