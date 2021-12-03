import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
  });
 
  id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.usuarioService.getWithId(id).subscribe((data: UsuarioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre)
      this.fgValidacion.controls["apellidos"].setValue(data.apellidos)
      this.fgValidacion.controls["correo"].setValue(data.correo)
      this.fgValidacion.controls["telefono"].setValue(data.telefono)
    })
  }

  edit(){
    let usuario = new UsuarioModelo();
    usuario.id = this.fgValidacion.controls["id"].value;
    usuario.nombre = this.fgValidacion.controls["nombre"].value;
    usuario.apellidos = this.fgValidacion.controls["apellidos"].value;
    usuario.correo = this.fgValidacion.controls["correo"].value;
    usuario.telefono = this.fgValidacion.controls["telefono"].value;
 
    this.usuarioService.update(usuario).subscribe((data: UsuarioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}
