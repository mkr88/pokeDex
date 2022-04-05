import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IPokemon, PokemonService } from '../services/pokemon.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  data: IPokemon[] = [];
  displayedColumns: string[] = ['url', 'name'];


  constructor(public pokemonService: PokemonService) {   }

  public getPokes() {
  this.pokemonService.GetPokemons().subscribe(x => {
    this.data = x as IPokemon[];
  })
}


  ngOnInit() {
    this.getPokes();
  }

}
