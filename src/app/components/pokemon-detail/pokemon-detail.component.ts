import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})

export class PokemonDetailComponent implements OnInit{
  pokemon: any;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
  ){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idOrName = params.get('id');
      if(idOrName){
        this.getPokemonDetails(idOrName);
      }
    });
  }

  getPokemonDetails(idOrName: string | number) {
    this.loading = true;
    this.error = false;
    this.pokemonService.getPokemonDetails(idOrName).subscribe({
      next: (data) => {
        console.log(data)
        this.pokemon = data;
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao buscar detalhes do Pokemon:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }
}
