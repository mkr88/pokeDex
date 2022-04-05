import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  page = 1;
  limit = 20;
  offset = 0;
  totalPokemons: number = 150;

  constructor(public pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
    //this.getId();
  }

  getPokemons(){
    this.pokemonService.carregarPokemons(this.limit, this.offset = (this.page * this.limit) - this.limit)
    .subscribe((response: any) => {
      this.totalPokemons = response.count;

      response.results.forEach((result: { name: string }) => {
        this.pokemonService.getMoreData(result.name)
        .subscribe((uniqResponse: any) => {
          this.pokemons.push(uniqResponse);

        });
      })
    });
  }

  // getId(){
  //   this.pokemonService.carregarPokemons(this.limit, this.offset = (this.page * this.limit) - this.limit)
  //   .subscribe((response: any) => {
  //     this.totalPokemons = response.count;

  //     response.results.forEach((result: { id: string }) => {
  //       this.pokemonService.getMoreData(result.id)
  //       .subscribe((uniqResponse: any) => {
  //         this.pokemons.push(uniqResponse);

  //       });
  //     })
  //   });
  // }


}
