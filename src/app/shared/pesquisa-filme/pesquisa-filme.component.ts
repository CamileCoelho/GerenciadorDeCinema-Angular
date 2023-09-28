import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListagemFilme } from 'src/app/models/listagem-filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-pesquisa-filme',
  templateUrl: './pesquisa-filme.component.html',
  styleUrls: ['./pesquisa-filme.component.css']
})

export class PesquisaFilmeComponent {
  @Output() onTituloSelecionado: EventEmitter<string>;
  listagemFilmes: ListagemFilme[];
  titulo: string;

  constructor(
  private filmesService: FilmeService,
  private route: ActivatedRoute) {
  this.listagemFilmes = []
    this.titulo = '';
    this.onTituloSelecionado = new EventEmitter();
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.selecionarFilmesDetalhesPorTitulo(params['query']);
      }
    );
  }

  tituloSelecionado(): void {
    this.onTituloSelecionado.emit(this.titulo);
    this.titulo = '';
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
