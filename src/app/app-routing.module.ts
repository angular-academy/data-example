import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'callback',
    loadChildren: './callback/callback.module#CallbackModule'
  },
  {
    path: 'promise',
    loadChildren: './promise/promise.module#PromiseModule'
  },
  {
    path: 'observable',
    loadChildren: './observable/observable.module#ObservableModule'
  },
  {
    path: '**',
    redirectTo: 'callback'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
