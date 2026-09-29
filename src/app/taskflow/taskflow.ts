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

  public taskTemp: Task = {
    id: Date.now(),
    title: '',
    description: '',
    priority: 'low',
    completed: false,
    dateLine: '',
  };
  isEmpty = signal(this.tasks().length === 0);

  public classPriority = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
  };

  constructor() {
    // inicializar el array de tareas
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  onChangeTask() {

    console.log('.:: tastk Temp', this.taskTemp);
    this.addTask(this.taskTemp);
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

  addTask(newTask: Task) {
    console.log('Nueva tarea agregada:', newTask);

    this.tasks.update((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        completed: newTask.completed,
        dateLine: newTask.dateLine,
      },
    ]);

    // Guardar el array de tareas actualizado en localStorage
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  recibirPrioridad(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedPriority = select.value;
    this.taskTemp.priority = selectedPriority as 'low' | 'medium' | 'high';
  }

  onChangeTitleTask(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTitle = input.value;
    this.taskTemp.title = newTitle;
  }
}
