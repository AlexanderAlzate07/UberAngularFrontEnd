import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { EstacionesService } from 'src/app/servicios/estaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  listadoEstaciones: EstacionModelo[] = [];

  constructor(private fb: FormBuilder,
    private estacionService: EstacionesService,
    private router: Router,
    private route: ActivatedRoute) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    coordx: ['', [Validators.required]],
    coordy: ['', [Validators.required]],
    tipo: ['', [Validators.required]]
  });

  id: string='';

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
    this.getAllEstaciones();
  }

  buscarRegistro(id: string){
    this.estacionService.getWithId(id).subscribe((data: EstacionModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre)
      this.fgValidacion.controls["direccion"].setValue(data.direccion)
      this.fgValidacion.controls["coordx"].setValue(data.coordx)
      this.fgValidacion.controls["coordy"].setValue(data.coordy)
      this.fgValidacion.controls["tipo"].setValue(data.tipo)
    })
  }

  edit(){
    let estacion = new EstacionModelo();
    estacion.id = this.fgValidacion.controls["id"].value;
    estacion.nombre = this.fgValidacion.controls["nombre"].value;
    estacion.direccion = this.fgValidacion.controls["direccion"].value;
    estacion.coordx = this.fgValidacion.controls["coordx"].value;
    estacion.coordy = this.fgValidacion.controls["coordy"].value;
    estacion.tipo = this.fgValidacion.controls["tipo"].value;
 
    this.estacionService.update(estacion).subscribe((data: EstacionModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/estaciones/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllEstaciones(){
    this.estacionService.getAll().subscribe((data: EstacionModelo[]) => {
      this.listadoEstaciones = data
      console.log(data)
    })
  }

}
