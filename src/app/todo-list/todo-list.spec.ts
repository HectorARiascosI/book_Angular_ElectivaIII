import { TestBed } from '@angular/core/testing';
import { TodoList } from './todo-list';

describe('TodoList', () => {
  it('adds a task with the selected schedule and priority', async () => {
    await TestBed.configureTestingModule({ imports: [TodoList] }).compileComponents();

    const fixture = TestBed.createComponent(TodoList);
    const todoList = fixture.componentInstance;
    todoList.newTask.set('Revisar pruebas');
    todoList.newTaskDate.set('2026-09-27');
    todoList.newTaskTime.set('15:30');
    todoList.newTaskPriority.set('high');
    todoList.newTaskAlarm.set(false);

    todoList.addTask();

    expect(todoList.tags().at(-1)).toEqual({
      id: 8,
      title: 'Revisar pruebas',
      description: '',
      completed: false,
      dateline: '2026-09-27',
      dueTime: '15:30',
      priority: 'high',
      alarmEnabled: false,
    });
    expect(todoList.newTask()).toBe('');
  });

  it('updates completion and alarm states', async () => {
    await TestBed.configureTestingModule({ imports: [TodoList] }).compileComponents();

    const fixture = TestBed.createComponent(TodoList);
    const todoList = fixture.componentInstance;
    const task = todoList.tags()[0];

    todoList.toggleTask(task);
    todoList.toggleAlarm(task);

    expect(todoList.tags()[0].completed).toBe(true);
    expect(todoList.tags()[0].alarmEnabled).toBe(false);
  });
});