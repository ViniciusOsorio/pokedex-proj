import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseURL = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number= 20): Observable<any>{
    return this.http.get<any>(`${this.baseURL}pokemon?offset=${offset}&limit=${limit}`).pipe(
      map(response => response.results),
      switchMap((pokemonResults: {name: string, url: string}[]) => {
        if (pokemonResults.length === 0){
          return of([]);
        }
        const detailRequests = pokemonResults.map(pokemon => {
          const match = pokemon.url.match(/\/(\d+)\/?$/);
          const id = match ? parseInt(match[1], 10) : null;

          if (id === null){
            console.warn(`Could not extract ID from URL: ${pokemon.url}. Skipping this Pokémon.`)
            return of(null)
          }

          return this.getPokemonDetails(id).pipe(
            map(details => ({
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
            }))
          );
        });

        return forkJoin(detailRequests);
      })
    );
  }

  getPokemonDetails(idOrName: string | number): Observable<any>{
    return this.http.get(`${this.baseURL}pokemon/${idOrName}/`);
  }
}
