import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokeDetailComponent } from '../poke-detail/poke-detail.component';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})

export class PokeTableComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';

  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private pokeService: PokemonService, private router: Router,
    public dialog: MatDialog) { }

   public openD(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'add-more-pop';
    dialogConfig.data = data;
    let dialogRef: MatDialogRef<PokeDetailComponent>;
    dialogRef = this.dialog.open(PokeDetailComponent, dialogConfig);
   return dialogRef.afterClosed();
 }
    //  dialogRef.afterClosed().subscribe(result => {
     //   console.log(`Dialog result: ${result}`);
     // });
    

  ngOnInit(): void {
    this.getPokemons();
    
  }

  getPokemons(){
    let pokemonData;

    for (let i = 1; i <= 150; i++){
      this.pokeService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any){
    this.pokeService.setMessage(row.position)
    this.openD();
  }

}
