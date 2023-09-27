import { Component } from "@angular/core";
import { ListagemFilme } from "src/app/models/listagem-filme";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  filmes: ListagemFilme[] = [];

  selecionarFilmesPorTitulo(titulo?: string) { 
    if(!titulo) {
      this.filmes = [];
      return;
    }
  }  
}
