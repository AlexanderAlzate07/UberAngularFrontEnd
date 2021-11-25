import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidacion = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]]
  });

  //El constructor es lo que se carga primero dentro de una clase
  //por lo tanto, la variable fb se puede usar en la parte de arriba
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  identificarUsuario() {}

}
