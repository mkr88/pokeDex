import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  //pokemons = ['Bulbasaur', 'Bulbasaur'];
  pokemons: any[] = [];

  constructor(private httpClient: HttpClient) {
   // this.carregarPokemons();
   }

  carregarPokemons(limit: number, offset: number) {

    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

    //const requisicao = await this.httpClient.get<any>('https://pokeapi.co/api/v2/pokemon?limit=151').toPromise;
  
    //this.pokemons = requisicao.results;

    //console.log(requisicao);
  }

  getMoreData(name: string) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }

}
