import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LedComponent } from './led/led.component';

const routes: Routes = [
  {
    path: 'leds',
    component: LedComponent
  },
  {
    path: '',
    redirectTo: '/leds',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
