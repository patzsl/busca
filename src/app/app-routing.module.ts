// src/app/app-routing.module.ts
import { NgModule } from '@angular/core'; // Corrigido
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // { 
    //   path: '', 
    //   loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent) 
    // },
    // Adicione outras rotas aqui
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
