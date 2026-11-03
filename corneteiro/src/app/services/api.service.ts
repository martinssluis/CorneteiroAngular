import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AtletaListaResponse,
  ClubeListaResponse,
  CustoBeneficioAtletasResponse,
  CustoBeneficioClubesResponse,
  FiltrosRecomendacao,
} from './models';

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

  custoBeneficioAtletas(filtros: FiltrosRecomendacao): Observable<CustoBeneficioAtletasResponse> {
    return this.http.get<CustoBeneficioAtletasResponse>(
      `${this.baseURL}/recomendacoes/custo-beneficio`,
      { params: this.montarParams(filtros, true) }
    );
  }

  custoBeneficioClubes(filtros: FiltrosRecomendacao): Observable<CustoBeneficioClubesResponse> {
    return this.http.get<CustoBeneficioClubesResponse>(
      `${this.baseURL}/recomendacoes/custo-beneficio/clubes`,
      { params: this.montarParams(filtros, false) }
    );
  }

  // Só envia o que foi preenchido; o backend aplica os padrões (minJogos=3, status=7, limite=20).
  private montarParams(filtros: FiltrosRecomendacao, incluirClube: boolean): HttpParams {
    let params = new HttpParams();
    if (filtros.posicaoId != null) params = params.set('posicaoId', filtros.posicaoId);
    if (incluirClube && filtros.clubeId != null) params = params.set('clubeId', filtros.clubeId);
    if (filtros.minJogos != null) params = params.set('minJogos', filtros.minJogos);
    if (filtros.limite != null) params = params.set('limite', filtros.limite);
    return params;
  }

}
