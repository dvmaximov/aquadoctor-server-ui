import { defineStore } from 'pinia';
import apiService, { RedirectCode } from 'src/services/api.service';
import { Musik } from './entities/musik.entity';

export const useMusikStore = defineStore('musik', {
  state: () => ({
    musiks: [] as Musik[],
    loading: false,
  }),
  getters: {
    musikList: (state) => (searchByName: string) => {
      if (searchByName !== '') {
        return state.musiks.filter((item) =>
          item.name?.toLowerCase().includes(searchByName.toLowerCase())
        );
      }
      return state.musiks;
    },
    apiUrl: () => {
      const domain = 'localhost';
      const port = location.port === '' ? '' : `:${location.port}`;
      const result = process.env.DEV
        ? `http://${domain}:8882/api/musik/upload`
        : `${location.protocol}//${location.hostname}${port}/api/musik/upload`;
      return result;
    },
    musikUrl: () => {
      const domain = 'localhost';
      const port = location.port === '' ? '' : `:${location.port}`;
      const result = process.env.DEV
        ? `http://${domain}:8882/musik`
        : `${location.protocol}//${location.hostname}${port}/musik`;
      return result;
    },
  },
  actions: {
    async load(): Promise<void> {
      this.loading = true;
      const response = await apiService.find(`musik`);
      if (!response.error) {
        this.musiks = response.data;
      }
      this.loading = false;
    },
    async insert(value: Musik): Promise<void> {
      const response = await apiService.insert('musik', value);
      if (!response.error) {
        this.musiks.push(response.data);
      }
    },
    async update(value: Musik): Promise<void> {
      const response = await apiService.post('musik', value);
      if (!response.error) {
        await this.load();
      }
    },
    async delete(id: number | undefined) {
      if (!id) return;
      apiService.delete('musik', id);
      apiService.redirect(RedirectCode.AQUADOCTOR_LIST);
    },
    getMusikById(id: number): Musik | null {
      const musik = this.musiks.find((item: Musik) => item.id === id);
      return musik ? musik : null;
    },
  },
});
