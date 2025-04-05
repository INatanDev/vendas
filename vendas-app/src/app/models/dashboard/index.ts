export interface DashboardData {
  produtos?: number;
  clientes?: number;
  vendas?: number;
  vendasPorMes?: Array<VendaPorMes>;
}

export interface VendaPorMes{
  mes?: number;
  valor?: number;
}