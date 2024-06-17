import { defineStore } from 'pinia';
import { User } from 'src/stores/entities/users.entity';
import apiService from 'src/services/api.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    user: null as User | null,
  }),
  getters: {
    isAuth: (state) => state.user !== null && state.token !== '',
  },
  actions: {
    async signUp(user: User): Promise<void> {
      const response = await apiService.post('auth/signUp', user);
      console.log(response);
      if (!response.error && response.data) {
        this.token = response.data.token;
        this.user = response.data.user;
      }

      // this.token = response.token;
      // apiService.setAuth(this.token);
      // this.user = response.user;
    },
    async signIn(email: string, password: string): Promise<void> {
      // const response = await apiService.signIn(email, password);
      const response = await apiService.post('auth/signIn', {
        email,
        password,
      });
      console.log(response);
      if (!response.error && response.data) {
        this.token = response.data.token;
        this.user = response.data.user;
      }
    },
    signOut(): void {
      this.token = '';
      apiService.setAuth(this.token);
      this.user = null;
    },
  },
});
