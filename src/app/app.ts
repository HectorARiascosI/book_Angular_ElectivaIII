import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  name = "Ivonne Carolina";

  person = {
    name: "Ivonne Carolina",
    age: 25,
    email: "ivonne@correo.com",
    profileImg: "https://placehold.co/80x100"
  }

  inputText = {
    name: "Edad",
    placeholder: "Ingrese su edad",
    type: "text",
    length: 3,
  }

  saludo() {
    alert("Hola " + this.name);
    console.log(".:: Ejecutando Event Binding");
  }

  recibirEdad(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(".:: Evento Change", value);
  }

  recibirEdadConInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.toLowerCase() === "a") {
      console.log(".:: Evento Input", value);
      console.error("Error: No se permite la letra 'a'");
    }
  }

}
