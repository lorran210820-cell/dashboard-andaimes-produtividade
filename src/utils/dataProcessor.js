const TURNO_HORAS = 8.8;

/**
 * Processa a lista de registros da planilha
 */
export function processDashboardData(rawData, filters = {}) {
  // 1. Aplicação de Filtros (Semana, Data, Montador)
  let filtered = rawData.filter(row => {
    if (filters.semana && row.Semana !== filters.semana) return false;
    if (filters.nome && row.Nome !== filters.nome) return false;
    if (filters.dataInicio && new Date(row.Data) < new Date(filters.dataInicio)) return false;
    if (filters.dataFim && new Date(row.Data) > new Date(filters.dataFim)) return false;
    return true;
  });

  // 2. Acumuladores de Totais
  let totalPresentes = 0;
  let totalMontagem = 0;
  let totalDesmontagem = 0;

  // Estruturas de Agrupamento
  const workerMap = {};
  const weeklyMap = {};

  filtered.forEach(row => {
    const presente = parseFloat(row.Presente) || 0;
    const montagem = parseFloat(row.Montagem) || 0;
    const desmontagem = parseFloat(row.Desmontagem) || 0;
    const totalProducao = montagem + desmontagem;

    totalPresentes += presente;
    totalMontagem += montagem;
    totalDesmontagem += desmontagem;

    // --- Agrupamento por Montador ---
    if (!workerMap[row['ID Enesa']]) {
      workerMap[row['ID Enesa']] = {
        id: row['ID Enesa'],
        nome: row.Nome,
        diasPresentes: 0,
        montagem: 0,
        desmontagem: 0,
        totalProducao: 0,
      };
    }

    workerMap[row['ID Enesa']].diasPresentes += presente;
    workerMap[row['ID Enesa']].montagem += montagem;
    workerMap[row['ID Enesa']].desmontagem += desmontagem;
    workerMap[row['ID Enesa']].totalProducao += totalProducao;

    // --- Agrupamento por Semana ---
    if (!weeklyMap[row.Semana]) {
      weeklyMap[row.Semana] = {
        semana: row.Semana,
        presentes: 0,
        montagem: 0,
        desmontagem: 0,
        totalProducao: 0,
      };
    }
    weeklyMap[row.Semana].presentes += presente;
    weeklyMap[row.Semana].montagem += montagem;
    weeklyMap[row.Semana].desmontagem += desmontagem;
    weeklyMap[row.Semana].totalProducao += totalProducao;
  });

  // 3. Cálculos Globais de HH e STD
  const totalProducaoGeral = totalMontagem + totalDesmontagem;
  const totalHHGeral = totalPresentes * TURNO_HORAS;
  const stdGeral = totalProducaoGeral > 0 ? (totalHHGeral / totalProducaoGeral) : 0;

  // 4. Formatação dos Dados Individuais com STD por Montador
  const workers = Object.values(workerMap).map(w => {
    const hh = w.diasPresentes * TURNO_HORAS;
    const std = w.totalProducao > 0 ? (hh / w.totalProducao) : 0;
    return { ...w, hh, std: std.toFixed(3) };
  });

  // 5. Formatação do Resumo Semanal com STD por Semana
  const weeklySummary = Object.values(weeklyMap).map(w => {
    const hh = w.presentes * TURNO_HORAS;
    const std = w.totalProducao > 0 ? (hh / w.totalProducao) : 0;
    return { ...w, hh, std: std.toFixed(3) };
  });

  return {
    kpis: {
      totalPresentes,
      totalHH: totalHHGeral.toFixed(1),
      totalMontagem: totalMontagem.toFixed(1),
      totalDesmontagem: totalDesmontagem.toFixed(1),
      totalProducao: totalProducaoGeral.toFixed(1),
      stdGeral: stdGeral.toFixed(3),
    },
    workers,
    weeklySummary,
    filteredRaw: filtered,
  };
}
