import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmeDetalhesComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { BuscaFilmesComponent } from './pages/busca-filmes/busca-filmes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: `detalhes-filme/:id`,
    component: FilmeDetalhesComponent,
  },
  {
    path: 'busca-filmes',
    component: BuscaFilmesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
