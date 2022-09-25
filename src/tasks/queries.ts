export const contaPorColunaQuery = (col: string) =>
  `SELECT count(*) as quantidade, ${col} FROM task GROUP BY ${col}`;
