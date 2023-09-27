import { FilmeFavorito } from "../models/filme-favorito";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService { 

  private endereco: string = "gerenciador-sistemas:favoritos";

  salvarDados(dados: FilmeFavorito): void {
    const jsonString = JSON.stringify(dados);

    localStorage.setItem(this.endereco, jsonString);
  }

  carregarDados(): FilmeFavorito {
    const dadosJson = localStorage.getItem(this.endereco);

    if (dadosJson)
      return JSON.parse(dadosJson) as FilmeFavorito;

    return new FilmeFavorito();
  }
}
