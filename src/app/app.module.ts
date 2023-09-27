import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { PaginacaoComponent } from './shared/paginacao/paginacao.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PesquisaFilmeComponent } from './shared/pesquisa-filme/pesquisa-filme.component';
import { BuscaFilmesComponent } from './pages/busca-filmes/busca-filmes.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { FilmeDetalhesComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { UrlSeguroPipe } from './shared/pipes/url-seguro.pipe';
import { FilmeService } from './services/filme.service';

@NgModule({
  declarations: [
    AppComponent,    
    NavbarComponent,
    CardFilmeComponent,
    PaginacaoComponent,
    PesquisaFilmeComponent,
    BuscaFilmesComponent,
    HomeComponent,
    FilmeDetalhesComponent,
    UrlSeguroPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    CommonModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [FilmeService],
  bootstrap: [AppComponent]
})

export class AppModule { }
