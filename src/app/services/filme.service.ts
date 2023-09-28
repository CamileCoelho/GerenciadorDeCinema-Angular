import { ListagemFilme } from "../models/listagem-filme";
import { DetalhesFilmes as DetalhesFilme } from "../models/detalhes-filme";
import { Observable, forkJoin, map, filter } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Injectable } from '@angular/core';
import { FilmeCreditos } from "../models/creditos-filme";
import { FilmeTrailer } from "../models/trailer-filme";

@Injectable() 
export class FilmeService {

  constructor(private http: HttpClient) { }

  public selecionarFilmePorId(id: number): Observable<ListagemFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;
    
    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => this.mapearFilme(obj))
      );
  }

  public selecionarFilmesPorTitulo(titulo: string): Observable<ListagemFilme[]> {
    const query: string  = titulo.split(' ').join('+');

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${query}&language=pt-BR&page=1`;
    
    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmes(results))
      );
  }

  public buscarFilmePorTitulo(titulo: string): Observable<ListagemFilme[]> {
    const query: string  = titulo.split(' ').join('+');

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${query}&language=pt-BR&page=1`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmes(results))
      );
  }

  public selecionarDetalhesFilmePorId(id: number): Observable<DetalhesFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;
   
    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(detalhesFilme => this.mapearDetalhesFilme(detalhesFilme))
      );
  }

  public selecionarCreditosFilmePorId(id: number): Observable<FilmeCreditos> {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.crew),
        map(crew => this.mapearCreditosFilme(crew))
      );
  }

  public selecionarFilmesMelhoresAvaliados(pagina?: number): Observable<ListagemFilme[]> {
    pagina = pagina ? pagina : 1;

    const url = "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=" + pagina;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmes(results))
    );
  }

  public selecionarFilmesMaisPopulares(pagina?: number): Observable<ListagemFilme[]> {
    pagina = pagina ? pagina : 1;
    const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=" + pagina;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmes(results))
      );
  }
  
  public selecionarTrailerPorId(id: number): Observable<FilmeTrailer> {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmeTrailer(results))
      );
  }

  public selecionarFilmesPorIds(ids: number[]): Observable<ListagemFilme[]> {
    const observables = ids.map(id => this.selecionarFilmePorId(id));

    return forkJoin(observables);
  }

  private obterHeaderAutorizacao() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': environment.API_KEY,
      })
    };
  }

  private mapearFilme(obj: any): ListagemFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      poster: 'https://image.tmdb.org/t/p/original/' + obj.poster_path,
    }
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilme {
    const apiGeneros: any[] = obj.genres ?? [];

    return {
      id: obj.id,
      titulo: obj.title,
      poster: `https://image.tmdb.org/t/p/original${obj.poster_path}`,
      votos: obj.vote_count,
      nota: Math.round(obj.vote_average * 100) / 100,
      data: obj.release_date,
      descricao: obj.overview,
      generos: apiGeneros.map(g => g.name),
      dataLancamento: obj.release_date,      
    }
  }
  
  private mapearCreditosFilme(obj: any[]): FilmeCreditos {
    let creditos = {
      diretores: obj.filter(c => c.known_for_department == "Directing")?.map(c => c.name),
      escritores: obj.filter(c => c.known_for_department == "Writing")?.map(c => c.name),
      atores: obj.filter(c => c.known_for_department == "Acting")?.map(c => c.name)
    }

    let valores = Object.values(creditos);

    creditos.diretores = valores[0].filter((v, indice) => valores[0].indexOf(v) == indice);
    creditos.escritores = valores[1].filter((v, indice) => valores[1].indexOf(v) == indice);
    creditos.atores = valores[2].filter((v, indice) => valores[2].indexOf(v) == indice);

    return creditos;
  }

  private mapearFilmes(obj: any[]): ListagemFilme[] {
    const filmesMapeados = obj.map(filme => this.mapearFilme(filme));
    return filmesMapeados;
  }
  
  private mapearFilmeTrailer(obj: any): FilmeTrailer {
    const trailer = obj[obj.length - 1]?.key;
    return {
      trailer_caminho: `https://www.youtube.com/embed/${trailer == null ? "" : trailer}/`
    };
  }
}
