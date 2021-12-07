import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GetComponent } from './get/get.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'get',
    component: GetComponent,
    canActivate: [SessionGuard]
  },
  {
    path: '',
    component: GetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstacionesRoutingModule { }
