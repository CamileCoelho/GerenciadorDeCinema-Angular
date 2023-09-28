import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmesFavoritos } from 'src/app/models/filme-favorito';
import { ListagemFilme } from 'src/app/models/listagem-filme';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  listagemFilmes: ListagemFilme[] = [];
  tipoDaLista: string;
  favoritos: FilmesFavoritos;
  ehPaginado: boolean;
  paginaAtual: number;

  constructor(
    private filmesService: FilmeService,
    private localStorageService: LocalStorageService,
    private router: Router
    ) {      
      this.favoritos = new FilmesFavoritos;
      this.tipoDaLista = 'populares';
      this.ehPaginado = true;
      this.paginaAtual = 1;
    }

  ngOnInit(): void {  
      this.favoritos = this.localStorageService.carregarDadosFavoritos();  
      this.selecionarFilmesPopulares();
    }

  selecionarFavoritos() {
    this.tipoDaLista = 'favoritos';
    this.ehPaginado = false;

    if(this.favoritos.ids_filmes.length == 0) {
      this.listagemFilmes = [];
    }

    this.filmesService.selecionarFilmesPorIds(this.favoritos.ids_filmes).subscribe(listagemFilmes => {
      this.listagemFilmes = listagemFilmes;
    });
  }

  selecionarFilmesPopulares(pagina?:number) {
    pagina = pagina ? pagina : 1;
    this.paginaAtual = pagina;

    this.tipoDaLista = 'populares';
    this.ehPaginado = true;

    this.filmesService.selecionarFilmesMaisPopulares(pagina).subscribe(listagemFilmes => {
      this.listagemFilmes = listagemFilmes;
    });
  }

  selecionarFilmesMelhoresAvaliados(pagina?:number) {
    pagina = pagina ? pagina : 1;
    this.paginaAtual = pagina;

    this.tipoDaLista = 'avaliados';
    this.ehPaginado = true;

    this.filmesService.selecionarFilmesMelhoresAvaliados(pagina).subscribe(listagemFilmes => {
      this.listagemFilmes = listagemFilmes;
    });
  }

  paginaSelecionada(pagina: number) {
    window.scroll(0, 0);

    if(this.tipoDaLista == 'populares') {
      this.selecionarFilmesPopulares(pagina);
    }

    else if(this.tipoDaLista == 'avaliados') {
      this.selecionarFilmesMelhoresAvaliados(pagina);
    }
  }
}
