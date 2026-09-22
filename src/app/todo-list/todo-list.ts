import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, afterNextRender, Component, computed, ElementRef, inject, Injector, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bell, CalendarDays, Check, Clock3, createIcons, Pencil, Plus, Trash2 } from 'lucide';
import { Task, TaskPriority } from '../models/tags';

@Component({
  imports: [CommonModule, DatePipe, FormsModule],
  selector: 'app-todo-list',
  styleUrl: './todo-list.scss',
  templateUrl: './todo-list.html',
})
export class TodoList implements AfterViewInit {
  private readonly iconRoot = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);
  private nextTaskId = 8;
  public newTask = signal('');
  public newTaskDate = signal('2026-09-22');
  public newTaskTime = signal('09:00');
  public newTaskPriority = signal<TaskPriority>('medium');
  public newTaskAlarm = signal(true);
  public newTaskDescription = signal('');
  public interaction = signal({
    title: 'Organiza tu semana',
    message: 'Agrega una tarea y define cuándo debes cumplirla.',
  });
  public tags = signal<Task[]>([
    { id: 1, title: 'Repasar los componentes de Angular', description: 'Repasar señales y componentes standalone.', completed: false, dateline: '2026-09-22', dueTime: '09:00', priority: 'high', alarmEnabled: true },
    { id: 2, title: 'Organizar los apuntes de la clase', description: 'Ordenar los ejemplos vistos en clase.', completed: true, dateline: '2026-09-22', dueTime: '11:30', priority: 'low', alarmEnabled: false },
    { id: 3, title: 'Terminar el ejercicio de eventos', description: 'Completar los bindings del ejercicio.', completed: false, dateline: '2026-09-23', dueTime: '14:00', priority: 'high', alarmEnabled: true },
  ]);
  public completedTasks = computed(() => this.tags().filter((task) => task.completed).length);
  public pendingTasks = computed(() => this.tags().length - this.completedTasks());

  addTask() {
    const title = this.newTask().trim();

    if (!title) {
      return;
    }

    this.tags.update((tasks) => [...tasks, {
      id: this.nextTaskId++,
      title,
      description: this.newTaskDescription().trim(),
      completed: false,
      dateline: this.newTaskDate(),
      dueTime: this.newTaskTime(),
      priority: this.newTaskPriority(),
      alarmEnabled: this.newTaskAlarm(),
    }]);
    this.resetForm();
    afterNextRender({ write: () => this.renderIcons() }, { injector: this.injector });
  }

  private resetForm() {
    this.newTask.set('');
    this.newTaskDescription.set('');
    this.newTaskDate.set('2026-09-22');
    this.newTaskTime.set('09:00');
    this.newTaskPriority.set('medium');
    this.newTaskAlarm.set(true);
  }

  ngAfterViewInit() {
    this.renderIcons();
  }

  private renderIcons() {
    createIcons({
      root: this.iconRoot.nativeElement,
      icons: { Bell, CalendarDays, Check, Clock3, Pencil, Plus, Trash2 },
    });
  }

  toggleTask(task: Task) {
    this.tags.update((tasks) => tasks.map((currentTask) => currentTask.id === task.id
      ? { ...currentTask, completed: !currentTask.completed }
      : currentTask));
  }

  toggleAlarm(task: Task) {
    this.tags.update((tasks) => tasks.map((currentTask) => currentTask.id === task.id
      ? { ...currentTask, alarmEnabled: !currentTask.alarmEnabled }
      : currentTask));
  }

  editTask(task: Task) {
    const updatedTitle = window.prompt('Edita la tarea', task.title)?.trim();

    if (updatedTitle) {
      this.tags.update((tasks) => tasks.map((currentTask) => currentTask.id === task.id
        ? { ...currentTask, title: updatedTitle }
        : currentTask));
    }
  }

  removeTask(id: number) {
    this.tags.update((tasks) => tasks.filter((currentTask) => currentTask.id !== id));
  }

}
