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
  pontos_num: number;
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

export interface FiltrosRecomendacao {
  posicaoId?: number | null;
  clubeId?: number | null;
  minJogos?: number;
  limite?: number;
}

export interface CustoBeneficioAtleta {
  atleta_id: number;
  apelido: string;
  clube_id: number;
  posicao_id: number;
  status_id: number;
  preco_num: number;
  media_num: number;
  jogos_num: number;
  custo_beneficio: number;
  motivo: string;
}

export interface CustoBeneficioAtletasResponse {
  posicao_id: number | null;
  clube_id: number | null;
  min_jogos: number;
  status: number[];
  quantidade: number;
  atletas: CustoBeneficioAtleta[];
}

export interface CustoBeneficioClube {
  clube_id: number;
  apelido: string;
  escudos: Record<string, string>;
  quantidade_atletas: number;
  custo_beneficio_medio: number;
  motivo: string;
}

export interface CustoBeneficioClubesResponse {
  posicao_id: number | null;
  min_jogos: number;
  status: number[];
  quantidade: number;
  clubes: CustoBeneficioClube[];
}
