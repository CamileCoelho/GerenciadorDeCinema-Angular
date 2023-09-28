import { FilmesFavoritos } from "../models/filme-favorito";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService { 

  private endereco: string = "gerenciador-sistemas:favoritos";

  salvarDadosFavoritos(dados: FilmesFavoritos): void {
    localStorage.setItem(this.endereco, JSON.stringify(dados));
  }

  carregarDadosFavoritos(): FilmesFavoritos {
    const dadosJson = localStorage.getItem(this.endereco);

    if (dadosJson)
      return JSON.parse(dadosJson) as FilmesFavoritos;

    return new FilmesFavoritos();
  }
}
