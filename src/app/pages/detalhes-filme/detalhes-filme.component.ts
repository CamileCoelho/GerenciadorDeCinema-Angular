import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, filter } from "rxjs";
import { FilmeCreditos } from 'src/app/models/creditos-filme';
import { DetalhesFilmes } from 'src/app/models/detalhes-filme';
import { FilmeFavorito } from 'src/app/models/filme-favorito';
import { FilmeTrailer } from 'src/app/models/trailer-filme';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.component.html',
  styleUrls: ['./detalhes-filme.component.css']
})

export class FilmeDetalhesComponent {
  filmeDetalhes: DetalhesFilmes;
  filmeCreditos: FilmeCreditos;
  filmeTrailer: FilmeTrailer;
  avaliacaoVisivel: boolean;
  imagem_url: string;
  video_url: string;
  ehFavorito: boolean;
  favoritos: FilmeFavorito;

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private filmeService: FilmeService,
    private toastService: ToastrService,
    private sanitizer: DomSanitizer
    ) {

    this.filmeDetalhes = {
      id: 0,
      titulo: '',
      poster: '',
      votos: 0,
      nota: 0,
      data: '',
      descricao: '',
      generos: [],
      dataLancamento: '',
    };
    
    this.filmeTrailer = {
      trailer_caminho: ''
    };

    this.filmeCreditos = {
      diretores: [],
      escritores: [],
      atores: [],
    };

    this.favoritos = new FilmeFavorito();
    this.imagem_url = "";
    this.video_url = "";
    this.avaliacaoVisivel = false;
    this.ehFavorito = false;
  }

  ngOnInit() {
    this.favoritos = this.localStorageService.carregarDados();

    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    console.log(id);

    this.filmeService.selecionarDetalhesFilmePorId(id).subscribe(filmeDetalhes => {
      this.filmeDetalhes = filmeDetalhes;
      this.imagem_url = this.filmeDetalhes.poster;
      this.ehFavorito = this.favoritos.ids_filmes.includes(this.filmeDetalhes.id);
    });

    this.filmeService.selecionarTrailerPorId(id).subscribe(filmeTrailer => {
      this.filmeTrailer = filmeTrailer;
      this.video_url = this.filmeTrailer.trailer_caminho;
    });

    this.filmeService.selecionarCreditosFilmePorId(id).subscribe(filmeCreditos => {
      this.filmeCreditos = filmeCreditos;
    });
  }
  

  formatarListaCreditos(lista: string[]): string {
    return lista.map((c, i) => i == 0 ? c : '  -  ' + c ).join('');
  }

  atualizarFavoritos(): void {
    if(this.favoritos.ids_filmes.includes(this.filmeDetalhes.id)) {
      this.toastService.success('Filme retirado dos seus favoritos', 'Success');
      this.favoritos.ids_filmes = this.favoritos.ids_filmes
        .filter(f => f != this.filmeDetalhes.id);
        this.ehFavorito = false;
    }

    else {
      this.toastService.success('Filme adicionado aos seus favoritos', 'Success');
      this.favoritos.ids_filmes.push(this.filmeDetalhes.id);
      this.ehFavorito = true;
    }

    this.localStorageService.salvarDados(this.favoritos);
  }
}
