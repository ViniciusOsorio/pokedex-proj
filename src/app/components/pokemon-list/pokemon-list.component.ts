import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class PokemonListComponent implements OnInit{
  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(){
    this.pokemonService.getPokemonList(151).subscribe(response => {
      this.pokemonList = response.results;
      this.pokemonList.forEach((pokemon: any, index: number) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        this.pokemonService.getPokemonDetails(id).subscribe(details => {
          console.log(details)
          this.pokemonList[index] = {
            ...this.pokemonList[index],
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
          }
        })
      })
    })
  }

  getPokemonId(url: string){
    return url.split('/').filter(Boolean).pop() || '';
  }
}
