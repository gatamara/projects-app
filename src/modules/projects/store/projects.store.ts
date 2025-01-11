import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    if (name.length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: name,
      task: [],
    });
  };

  const addTaskToProjects = (projectId: string, taskName: string) => {
    if (taskName.trim().length == 0) return;

    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    project.task.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  const deleteTaskToProjects = (projectId: string) => {
    const newProjects = projects.value.filter((d) => d.id !== projectId);
    projects.value = newProjects;
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;
    const task = project.task.find((t) => t.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  };

  return {
    //state
    projects,
    //getter o computed
    projectsList: computed(() => [...projects.value]),

    projectsWitjCompletion: computed(() => {
      return projects.value.map((project) => {
        const total = project.task.length;
        const completed = project.task.filter((t) => t.completedAt).length;
        const completion = total === 0 ? 0 : (completed / total) * 100;

        return {
          id: project.id,
          name: project.name,
          taskCount: total,
          completion: Math.round(completion),
        };
      });
    }),
    //Actions o metodos
    addProject,
    addTaskToProjects,
    toggleTask,
    deleteTaskToProjects,
  };
});
