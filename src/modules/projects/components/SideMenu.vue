<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <RouterLink to="/">
      <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    </RouterLink>

    <p v-if="projectsStore.projectsList.length == 0" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <ul v-else class="menu ">

      <li v-for=" project in projectsStore.projectsList" :key="project.id">
        <template v-if="project.task.length > 0">
          <details open>
            <summary>
              <RouterLink :to="`/project/${project.id}`">
                {{ project.name }}
              </RouterLink>
            </summary>
            <ul>
              <li v-for="tas in project.task" :key="tas.id">
                <RouterLink :to="`/project/${project.id}`">{{ tas.name }}</RouterLink>
              </li>

            </ul>
          </details>
        </template>

        <template v-else>
          <RouterLink :to="`/project/${project.id}`">
            {{ project.name }}
          </RouterLink>
        </template>

      </li>

    </ul>
  </aside>

</template>

<script lang="ts" setup>
import { useProjectsStore } from '../store/projects.store';


const projectsStore = useProjectsStore()

</script>
