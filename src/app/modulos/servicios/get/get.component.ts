import { Component, OnInit } from '@angular/core';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServicesService } from 'src/app/servicios/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private ServicioService: ServicesService) { }

  listado: ServicioModelo[] = [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.ServicioService.getAll().subscribe((data: ServicioModelo[]) => {
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
        this.ServicioService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }
}
