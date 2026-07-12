import { DashboardMetrics } from '@/types/dashboard';

// mudar dps quando tiver o supabase
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const mockData: DashboardMetrics = {
    faturamentoTotalBruto: 540500,
    valorRetidoTNM: 11111,
    repassesPendentes: 43123,
    atualizadoEm: new Date('2026-08-17T15:00:00'),
  };

  return mockData;
}