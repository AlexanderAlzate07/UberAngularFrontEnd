import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router) { }

  fgValidacion = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(6)]],
    correo: ['', [Validators.required, Validators.email]],
  });
  

  ngOnInit(): void {
  }

  store(){
    let usuario = new UsuarioModelo();
    usuario.nombre = this.fgValidacion.controls["nombre"].value;
    usuario.apellidos = this.fgValidacion.controls["apellidos"].value;
    usuario.correo = this.fgValidacion.controls["correo"].value;
    usuario.telefono = this.fgValidacion.controls["telefono"].value;
 
    this.usuarioService.store(usuario).subscribe((data: UsuarioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}
