import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;
  message: string = '';

  constructor(private http: HttpClient) { }

  
    getPokemons(index: any){
      return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
   }

   setMessage(data: any){
     this.message=data;
   }

   getMessage(){
    return this.message;
  }



}
