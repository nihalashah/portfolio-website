import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyContainerComponent } from './ui/container/empty-container/empty-container.component';
import { MainContainerComponent } from './ui/container/main-container/main-container.component';
import { HomeExpertiseComponent } from './ui/pages/home/home-expertise/home-expertise.component'; 
import { HomeAboutComponent } from './ui/pages/home/home-about/home-about.component';
import { HomeShowcasesComponent } from './ui/pages/home/home-showcases/home-showcases.component';

const routes: Routes = [

  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./ui/pages/home/home.module').then((m) => m.HomeModule),
      }
    ]

  },

  // { path: 'experience', component: HomeExpertiseComponent },

  // { path: 'about', component: HomeAboutComponent },

  // { path: 'projects', component: HomeShowcasesComponent},
  
  {
    path: 'documents',
    component: EmptyContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./ui/pages/documents/document.module').then((m) => m.DocumentModule),
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
