import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseURL = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemonList(limit = 151): Observable<any>{
    return this.http.get(`${this.baseURL}pokemon?limit=${limit}`);
  }

  getPokemonDetails(idOrName: string | number): Observable<any>{
    return this.http.get(`${this.baseURL}pokemon/${idOrName}/`);
  }
}
