import { getMonthlySummary } from '../../../server/index';

export const load = async () => {
  return {
    monthlySummary: await getMonthlySummary()
  }
}