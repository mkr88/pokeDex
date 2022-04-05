import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';
  id: any = '';

  constructor(private pokemonService: PokemonService, private activatedRouter: ActivatedRoute,
    public dialogRef: MatDialogRef<PokeDetailComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    );
   }

  ngOnInit(): void {
  }


  getPokemon(id: any){
      id = this.pokemonService.getMessage();
      this.pokemonService.getPokemons(id).subscribe(
        res => {
          this.pokemon = res;
          this.pokemonImg = this.pokemon.sprites.front_default;
          this.pokemonType = res.types[0].type.name;
        },
        err => {
          console.log(err);
        }
      )
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
