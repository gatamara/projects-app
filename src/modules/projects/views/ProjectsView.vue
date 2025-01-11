<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projectsStore.projectsWitjCompletion" :key="index" class="hover">
          <th>{{ index + 1 }}</th>
          <td class="">{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress class="progress progress-primary w-56" :value="project.completion" max="100"></progress>
          </td>
          <td>
            <CircleButton @click="projectsStore.deleteTaskToProjects(project.id)">
              <TrashIcon />
            </CircleButton>
          </td>
        </tr>
      </tbody>
    </table>
    <CustomModal :open="customModalOpen">
      <template #header>
        <h1> header</h1>
      </template>
      <template #body>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus perferendis quisquam quo consequuntur,
          exercitationem aperiam. Possimus</p>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <button @click="customModalOpen = false" class="btn mr-4">Close</button>
          <button @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
        </div>
      </template>
    </CustomModal>

    <InputModal :open="modalOpen" @close="modalOpen = false" @value="projectsStore.addProject"
      placeholder="Ingrese el nombre del proyecto" title="Nuevo Proyecto"
      sub-title="Crea un titulo original a tu proyecto" />

    <FabButton @click="modalOpen = true">
      <AddCircle />
    </FabButton>
    <FabButton @click="customModalOpen = true" position="bottom-left">
      <ModalIcon />
    </FabButton>
  </div>
</template>


<script lang="ts" setup>
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import ModalIcon from '@/modules/common/icons/ModalIcon.vue';
import { ref } from 'vue';
import { useProjectsStore } from '../store/projects.store';
import CircleButton from '@/modules/common/components/CircleButton.vue';
import TrashIcon from '@/modules/common/icons/TrashIcon.vue';

const modalOpen = ref(false)

const customModalOpen = ref(false)

const projectsStore = useProjectsStore()


</script>

<style scoped></style>
