import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

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
  currentPokemonId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router,
  ){ }

  ngOnInit(): void {
    this.route.paramMap.pipe().subscribe(params => {
      const idParam = params.get('id');
      if (idParam){
        this.currentPokemonId = +idParam;
        this.getPokemonDetails(this.currentPokemonId)
      }
    })
  }

  getPokemonDetails(idOrName: string | number) {
    this.loading = true;
    this.error = false;
    this.pokemonService.getPokemonDetails(idOrName).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao buscar detalhes do Pokemon:', err);
        this.loading = false;
        this.error = true;
        this.pokemon = null;
      }
    });
  }

  goToPreviousPokemon(){
    if(this.currentPokemonId > 1){
      this.router.navigate(['/pokemon', this.currentPokemonId - 1]);
    }
  }

  goToNextPokemon(){
    if(this.currentPokemonId < 1025){
      this.router.navigate(['/pokemon', this.currentPokemonId + 1]);
    }
  }
}
