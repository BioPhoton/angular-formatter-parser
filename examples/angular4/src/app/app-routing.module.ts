import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicUsageComponent } from './page/basic-usage/basic-usage.component';
import { BuiltInFunctionsComponent } from './pages/built-in-functions/built-in-functions.component';

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
    path: 'built-in-functions',
    component: BuiltInFunctionsComponent
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
