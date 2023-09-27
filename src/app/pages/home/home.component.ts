import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmeFavorito } from 'src/app/models/filme-favorito';
import { ListagemFilme } from 'src/app/models/listagem-filme';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  filmes: ListagemFilme[] = [];
  historico: FilmeFavorito;
  listagemTipo: string;
  ehPaginado: boolean;
  paginaAtual: number;

  constructor(
    private filmesService: FilmeService,
    private localStorageService: LocalStorageService,
    private router: Router
    ) {
      this.historico = new FilmeFavorito();
      this.listagemTipo = 'populares';
      this.ehPaginado = true;
      this.paginaAtual = 1;
    }

  ngOnInit(): void {  
      this.historico = this.localStorageService.carregarDados();
  
      this.selecionarFilmesPopulares();
    }

  selecionarFavoritos() {
    this.listagemTipo = 'favoritos';
    this.ehPaginado = false;

    if(this.historico.ids_filmes.length == 0) {
      this.filmes = [];
    }

    this.filmesService.selecionarFilmesPorIds(this.historico.ids_filmes).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  selecionarFilmesPopulares(pagina?:number) {
    pagina = pagina ? pagina : 1;
    this.paginaAtual = pagina;

    this.listagemTipo = 'populares';
    this.ehPaginado = true;

    this.filmesService.selecionarFilmesMaisPopulares(pagina).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  selecionarFilmesMelhoresAvaliados(pagina?:number) {
    pagina = pagina ? pagina : 1;
    this.paginaAtual = pagina;

    this.listagemTipo = 'avaliados';
    this.ehPaginado = true;

    this.filmesService.selecionarFilmesMelhoresAvaliados(pagina).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  paginaSelecionada(pagina: number) {
    window.scroll(0, 0);

    if(this.listagemTipo == 'populares') {
      this.selecionarFilmesPopulares(pagina);
    }

    else if(this.listagemTipo == 'avaliados') {
      this.selecionarFilmesMelhoresAvaliados(pagina);
    }
  }
}
