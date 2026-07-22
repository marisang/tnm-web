import { DashboardMetrics } from '@/types/dashboard';
import { calculateSplit } from '@/lib/splitCalculator';


export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const valorBrutoONErpm = 2750000;

  const split = calculateSplit({ valorBrutoONErpm });

  return {
    // Card "Faturamento Total Bruto" = TNM + Artista = 70% do valor bruto
    // (é o total que a ONErpm efetivamente repassa, sem contar a fatia dela)
    faturamentoTotalBruto: split.totalRepassadoPelaONErpm,

    // Card "Valor Retido pela TNM" = 20% do valor bruto
    valorRetidoTNM: split.parteTNM,

    
    repassesPendentes: split.parteArtistaBruta,

    atualizadoEm: new Date(),
  };
}