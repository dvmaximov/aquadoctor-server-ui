import { defineStore } from 'pinia';
import apiService from 'src/services/api.service';
import { Diagnostic } from './entities/diagnostic.enyity';

export const useDiagnosticStore = defineStore('diagnostic', {
  state: () => ({
    diagnostics: [] as Diagnostic[],
    loading: false,
  }),
  getters: {},
  actions: {
    async load(userId: number): Promise<void> {
      this.loading = true;
      const response = await apiService.find(`diagnostics/${userId}`);
      if (!response.error) {
        this.diagnostics = response.data;
      }
      this.loading = false;
    },
    async insert(value: Diagnostic): Promise<void> {
      const response = await apiService.insert('diagnostics', value);
      if (!response.error) {
        this.diagnostics.push(response.data);
      }
    },
  },
});
