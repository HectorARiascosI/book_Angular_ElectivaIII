import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  imports: [CommonModule],
  selector: 'app-taskflow',
  styleUrl: './taskflow.scss',
  templateUrl: './taskflow.html',
})
export class Taskflow {
  public tasks = signal<Task[]>([
    // {
    //   id: Date.now(),
    //   title: 'Tarea de ejemplo 1',
    //   description: 'Esta es una tarea de ejemplo para demostrar el flujo de trabajo.',
    //   priority: 'low',
    //   completed: false,
    //   dateLine: '',
    // },
    // {
    //   id: Date.now(),
    //   title: 'Tarea de ejemplo 2',
    //   description: 'Esta es una tarea de ejemplo para demostrar el flujo de trabajo.',
    //   priority: 'medium',
    //   completed: false,
    //   dateLine: '',
    // },
    // {
    //   id: Date.now(),
    //   title: 'Tarea de ejemplo 3',
    //   description: 'Esta es una tarea de ejemplo para demostrar el flujo de trabajo.',
    //   priority: 'high',
    //   completed: true,
    //   dateLine: '',
    // },
  ]);

  public classPriority = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
  };

  constructor() {
    // inicializar el array de tareas
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  onChangeTask(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }

  setClassPriority(priority: any) {
    switch (priority) {
      case 'low':
        return this.classPriority.low;
      case 'medium':
        return this.classPriority.medium;
      case 'high':
        return this.classPriority.high;
      default:
        return 'medium';
    }
  }

  addTask(newTask: string) {
    console.log('Nueva tarea agregada:', newTask);

    this.tasks.update((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: newTask,
        description: '',
        priority: 'low',
        completed: false,
        dateLine: '',
      },
    ]);

    // Guardar el array de tareas actualizado en localStorage
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
