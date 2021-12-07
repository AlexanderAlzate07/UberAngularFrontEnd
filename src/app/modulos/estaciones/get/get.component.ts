import { Component, OnInit } from '@angular/core';
import { EstacionesService } from 'src/app/servicios/estaciones.service';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private EstacionService: EstacionesService) { }
  listado: EstacionModelo[] = [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.EstacionService.getAll().subscribe((data: EstacionModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }

  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.EstacionService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }
}
