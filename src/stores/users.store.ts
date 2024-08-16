import { defineStore } from 'pinia';
import { User } from 'src/stores/entities/users.entity';
import apiService from 'src/services/api.service';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false,
    saving: false,
  }),
  getters: {
    usersList: (state) => (searchByName: string, searchByEmail: string) => {
      if (searchByEmail !== '') {
        return state.users.filter((item) =>
          item.email?.toLowerCase().includes(searchByEmail.toLowerCase())
        );
      } else if (searchByName !== '') {
        return state.users.filter(
          (item) =>
            item.firstName
              ?.toLowerCase()
              .includes(searchByName.toLowerCase()) ||
            item.lastName?.toLowerCase().includes(searchByName.toLowerCase())
        );
      }
      return state.users;
    },
  },
  actions: {
    async load(): Promise<void> {
      this.loading = true;
      const response = await apiService.find('users');
      if (!response.error) {
        this.users = response.data;
      }
      this.loading = false;
    },
    getUser(userId: number | undefined): User | null {
      if (!userId) return null;
      const user = this.users.find((user: User) => user.id == userId);
      if (!user) return null;
      return user;
    },
    async save(user: User) {
      this.saving = true;
      await apiService.post(`users/${user.id}`, user);
      this.saving = false;
    },
  },
});
