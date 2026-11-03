import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtletaListaResponse, ClubeListaResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'http://localhost:1895'

  constructor(private http: HttpClient){}

  listarAtletas(): Observable<AtletaListaResponse> {
    return this.http.get<AtletaListaResponse>(`${this.baseURL}/atletas`);
  }

  listarClubes(): Observable<ClubeListaResponse> {
    return this.http.get<ClubeListaResponse>(`${this.baseURL}/clubes`);
  }

}
