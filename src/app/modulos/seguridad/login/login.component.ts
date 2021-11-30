import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidacion = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(6)]]
  });

  //El constructor es lo que se carga primero dentro de una clase
  //por lo tanto, la variable fb se puede usar en la parte de arriba
  constructor(private fb: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
  }

  identificarUsuario() {
    let usuario = this.fgValidacion.controls["correo"].value;
    let clave = this.fgValidacion.controls["clave"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();

    this.seguridadService.login(usuario, claveCifrada).subscribe(
      (data: any) => {
        this.seguridadService.almacenarSesion(data)
        // this.router.navigate(['/index']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        }).then(() =>{
          this.router.navigate(['/index']);
        })

      },
      (error: any) => {
        console.log(error)
        // alert("Datos inválidos");
        Swal.fire({
          title: 'Error!',
          text: 'Datos invalidos',
          icon: 'error',
          confirmButtonText: 'Cool'
        })

      }
      );
  }
  


}
