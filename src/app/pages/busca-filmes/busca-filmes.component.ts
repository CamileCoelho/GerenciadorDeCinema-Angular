import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscaFilme } from 'src/app/models/busca-filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-busca-filmes',
  templateUrl: './busca-filmes.component.html',
  styleUrls: ['./busca-filmes.component.css']
})

export class BuscaFilmesComponent implements OnInit{
  filmesBusca: BuscaFilme[];

  constructor(
    private filmesService: FilmeService,
    private route: ActivatedRoute) {
    this.filmesBusca = []
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
      this.filmesBusca = [];
      return;
    }

    this.filmesService.buscarFilmePorTitulo(titulo).subscribe(filmesDetalhes => {
      this.filmesBusca = filmesDetalhes;
    });
  }
}
