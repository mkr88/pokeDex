import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];

  constructor(public pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.carregarPokemons()
    .subscribe((response: any) => {
      response.results.forEach((result: { name: string; }) => {
        this.pokemonService.getMoreData(result.name)
        .subscribe((uniqResponse: any) => {
          this.pokemons.push(uniqResponse);
        });
      })
    });
  }

}
