import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,
  ]
})
export class PokemonListComponent implements OnInit{
  pokemonList: any[] = [];
  loading: Boolean = true;
  error: Boolean = false;

  constructor(private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(){
    this.pokemonService.getPokemonList(0, 1500).subscribe({
      next: (data) => {
        this.pokemonList = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar lista de Pokémon: ', err);
        this.loading = false;
        this.error = true;
      }      
    })
  }

  getPokemonId(url: string){
    return url.split('/').filter(Boolean).pop() || '';
  }
}
