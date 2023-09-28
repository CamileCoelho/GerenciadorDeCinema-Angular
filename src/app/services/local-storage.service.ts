import { FilmesFavoritos } from "../models/filme-favorito";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService { 

  private endereco: string = "gerenciador-sistemas:favoritos";

  salvarDados(dados: FilmesFavoritos): void {
    const jsonString = JSON.stringify(dados);

    localStorage.setItem(this.endereco, jsonString);
  }

  carregarDados(): FilmesFavoritos {
    const dadosJson = localStorage.getItem(this.endereco);

    if (dadosJson)
      return JSON.parse(dadosJson) as FilmesFavoritos;

    return new FilmesFavoritos();
  }
}
