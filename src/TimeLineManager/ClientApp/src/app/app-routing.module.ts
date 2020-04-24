import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GlobalErrorComponent } from './core/exceptions/global-error.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule)},
  {
    path: 'error',
    component: GlobalErrorComponent
  },
  {
    path: '',
    redirectTo: '/post',
    pathMatch: 'full'
  },
  // default redirect to /post
  {
    path: '**',
    redirectTo: '/post',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
