import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})

export class PaginacaoComponent implements OnInit{
  @Input() page: number;
  tamanho_tela: number;
  
  @Output() onPaginaSelecionada: EventEmitter<number>;

  constructor() {
    this.onPaginaSelecionada = new EventEmitter();
    this.page = 1;
    this.tamanho_tela = 1024;
  }

  ngOnInit(): void {
      this.tamanho_tela = window.innerWidth;
  }
  
  paginaSelecionada(event: any): void {
    if (typeof event === 'number') {
      this.onPaginaSelecionada.emit(event);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(evento: Event) {
    this.tamanho_tela = window.innerWidth;
  }
}