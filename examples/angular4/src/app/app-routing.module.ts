import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicUsageComponent } from './page/basic-usage/basic-usage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'basic-usage',
    pathMatch: 'full'
  },
  {
    path: 'basic-usage',
    component: BasicUsageComponent
  },
  {
    path: '**',
    redirectTo: 'basic-usage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
