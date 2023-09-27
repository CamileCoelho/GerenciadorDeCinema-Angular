import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pesquisa-filme',
  templateUrl: './pesquisa-filme.component.html',
  styleUrls: ['./pesquisa-filme.component.css']
})
export class PesquisaFilmeComponent {
  @Output() onTituloSelecionado: EventEmitter<string>;
  titulo: string;

  constructor() {
    this.titulo = '';
    this.onTituloSelecionado = new EventEmitter();
  }

  tituloSelecionado(): void {
    this.onTituloSelecionado.emit(this.titulo);
    this.titulo = '';
  }
}
