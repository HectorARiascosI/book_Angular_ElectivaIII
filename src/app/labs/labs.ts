import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
}

@Component({
  imports: [FormsModule],
  selector: 'app-labs',
  styleUrl: './labs.scss',
  templateUrl: './labs.html',
})
export class Labs {
  name = 'Hector Riascos';
  inputText = {
    name: 'Edad',
    placeholder: 'Ingrese su edad',
    type: 'number',
  };
  edad = '';
  color = signal('rojo');
  usuarios = signal<User[]>([
    { id: 1, nombre: 'Ana Gómez', email: 'ana.gomez@example.com', rol: 'Diseñadora', activo: true },
    { id: 2, nombre: 'Carlos López', email: 'carlos.lopez@example.com', rol: 'Desarrollador', activo: true },
    { id: 3, nombre: 'María Rodríguez', email: 'maria.rodriguez@example.com', rol: 'Product Manager', activo: false },
    { id: 4, nombre: 'Juan Pérez', email: 'juan.perez@example.com', rol: 'QA Engineer', activo: true },
    { id: 5, nombre: 'Laura Martínez', email: 'laura.martinez@example.com', rol: 'Analista', activo: false },
  ]);
  usuariosActivos = computed(() => this.usuarios().filter((usuario) => usuario.activo).length);

  cambiarColor() {
    this.color.update((currentColor) => currentColor === 'rojo' ? 'verde' : 'rojo');
  }

  cambiarEstado(usuario: User) {
    this.usuarios.update((usuarios) => usuarios.map((currentUser) => currentUser.id === usuario.id
      ? { ...currentUser, activo: !currentUser.activo }
      : currentUser));
  }
}