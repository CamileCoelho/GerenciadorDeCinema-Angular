import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListagemFilme } from 'src/app/models/listagem-filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-busca-filmes',
  templateUrl: './busca-filmes.component.html',
  styleUrls: ['./busca-filmes.component.css']
})

export class BuscaFilmesComponent implements OnInit{
  listagemFilmes: ListagemFilme[];

  constructor(
    private filmesService: FilmeService,
    private route: ActivatedRoute) {
    this.listagemFilmes = []
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.selecionarFilmesDetalhesPorTitulo(params['query']);
      }
    );
  }

  selecionarFilmesDetalhesPorTitulo(titulo: string) {  
    if(titulo == '') {
      this.listagemFilmes = [];
      return;
    }

    this.filmesService.buscarFilmePorTitulo(titulo).subscribe(filmesDetalhes => {
      this.listagemFilmes = filmesDetalhes;
    });
  }
}
