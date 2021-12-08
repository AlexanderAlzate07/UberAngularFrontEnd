import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import { ServicesService } from 'src/app/servicios/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  listadoRutas: RutaModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicioService: ServicesService,
    private rutaService: RutasService,
    private router: Router,
    private route: ActivatedRoute) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    placa: ['', [Validators.required]],
    nombre_conductor: ['', [Validators.required]],
    dinero: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });

  id: string='';

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
    this.getAllRutas();
  }

  buscarRegistro(id: string){
    this.servicioService.getWithId(id).subscribe((data: ServicioModelo) => {
    console.log(data)
    this.fgValidacion.controls["id"].setValue(id)
    this.fgValidacion.controls["fecha"].setValue(data.fecha)
    this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio)
    this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin)
    this.fgValidacion.controls["placa"].setValue(data.placa)
    this.fgValidacion.controls["nombre_conductor"].setValue(data.nombre_conductor)
    this.fgValidacion.controls["dinero"].setValue(data.dinero)
    this.fgValidacion.controls["ruta"].setValue(data.ruta)
    })
  }

  edit(){
    let servicio = new ServicioModelo();
    servicio.id = this.fgValidacion.controls["id"].value;
    servicio.fecha = this.fgValidacion.controls["fecha"].value;
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    servicio.placa = this.fgValidacion.controls["placa"].value;
    servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value;
    servicio.dinero = this.fgValidacion.controls["dinero"].value;
    servicio.ruta = this.fgValidacion.controls["ruta"].value;
 
    this.servicioService.update(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllRutas(){
    this.rutaService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }

}
