import { defineStore } from 'pinia';
import { User } from 'src/stores/entities/users.entity';
import apiService from 'src/services/api.service';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
  }),
  getters: {},
  actions: {},
});
