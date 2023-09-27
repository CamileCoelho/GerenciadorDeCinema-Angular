import { Component, Input, OnInit } from '@angular/core';
import { ListagemFilme } from 'src/app/models/listagem-filme';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css']
})

export class CardFilmeComponent  implements OnInit{
  @Input() filme: ListagemFilme;
  imagem_url: string;

  constructor() {
    this.filme = {
      id: 0,
      titulo: '',
      poster: ''
    }

    this.imagem_url = "https://image.tmdb.org/t/p/original"
  }

  ngOnInit(): void {
    this.imagem_url = `https://image.tmdb.org/t/p/original${this.filme.poster}`;
  }
}