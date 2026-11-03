// Os nomes dos campos seguem exatamente o JSON devolvido pelo backend (snake_case nos atletas).
export interface AtletaDTO {
  atleta_id: number;
  nome: string;
  apelido: string;
  slug: string;
  foto: string;
  apelido_abreviado: string;
  clube_id: number;
  posicao_id: number;
  status_id: number;
  preco_num: number;
  ponto_num: number;
  media_num: number;
  variacao_num: number;
  jogos_num: number;
  entrou_em_campo: boolean;
}

export interface AtletaListaResponse {
  quantidade: number;
  atletas: AtletaDTO[];
}

export interface AtletaBuscaResponse {
  termoBusca: string;
  quantidade: number;
  atletas: AtletaDTO[];
}

export interface ClubeDTO {
  id: number;
  slug: string;
  apelido: string;
  escudos: Record<string, string>;
  nome: string;
}

export interface ClubeListaResponse {
  quantidade: number;
  clubes: ClubeDTO[];
}
