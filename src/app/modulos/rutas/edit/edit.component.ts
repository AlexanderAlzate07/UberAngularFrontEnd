import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  listadoRutas: RutaModelo[] = [];

  constructor(private fb: FormBuilder,
    private rutaService: RutasService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      tiempo_estimado: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
    });

    id: string='';

    ngOnInit(): void {
      this.id = this.route.snapshot.params["id"]
      this.buscarRegistro(this.id);
      this.getAllRutas();
    }

    buscarRegistro(id: string){
      this.rutaService.getWithId(id).subscribe((data: RutaModelo) => {
        console.log(data)
        this.fgValidacion.controls["id"].setValue(id)
        this.fgValidacion.controls["tiempo_estimado"].setValue(data.tiempo_estimado)
        this.fgValidacion.controls["origen"].setValue(data.origen)
        this.fgValidacion.controls["destino"].setValue(data.destino)
      })
    }

    edit(){
      let ruta = new RutaModelo();
      ruta.id = this.fgValidacion.controls["id"].value;
      ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value;
      ruta.origen = this.fgValidacion.controls["origen"].value;
      ruta.destino = this.fgValidacion.controls["destino"].value;
   
      this.rutaService.update(ruta).subscribe((data: RutaModelo)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/rutas/get']);
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
