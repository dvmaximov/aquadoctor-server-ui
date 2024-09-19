import { defineStore } from 'pinia';
import apiService from 'src/services/api.service';
import { Aquadoctor } from './entities/aquadoctor.entity';

export const useAquadoctorStore = defineStore('aquadoctor', {
  state: () => ({
    aquadoctors: [] as Aquadoctor[],
    loading: false,
  }),
  getters: {
    aquadoctorList: (state) => (searchByName: string) => {
      if (searchByName !== '') {
        return state.aquadoctors.filter((item) =>
          item.name?.toLowerCase().includes(searchByName.toLowerCase())
        );
      }
      return state.aquadoctors;
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
    async load(userId: number): Promise<void> {
      if (userId === 0) {
        this.aquadoctors = [];
        return;
      }
      this.loading = true;
      const response = await apiService.findById(`aquadoctor`, userId);
      if (!response.error) {
        this.aquadoctors = response.data;
      }
      this.loading = false;
    },
    async insert(userId: number, musikId: number): Promise<void> {
      const response = await apiService.insert('aquadoctor', {
        userId,
        musikId,
      });
      if (!response.error) {
        this.aquadoctors.unshift(response.data);
      }
    },
    async update(value: Aquadoctor): Promise<void> {
      const response = await apiService.post('aquadoctor', value);
      if (!response.error && value.userId) {
        await this.load(value.userId);
      }
    },
    async delete(id: number | undefined) {
      if (!id) return;
      const response = await apiService.delete('aquadoctor', id);
    },
    getAquadoctorById(id: number): Aquadoctor | null {
      const aquadoctor = this.aquadoctors.find(
        (item: Aquadoctor) => item.id === id
      );
      return aquadoctor ? aquadoctor : null;
    },
  },
});
