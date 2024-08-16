import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from 'src/stores/entities/users.entity';
import apiService from 'src/services/api.service';
import eventBus, { EventType } from 'src/services/event.bus';

export interface AdminLink {
  title: string;
  caption: string;
  icon: string;
  link: string;
}

let event_bus;

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = ref<string>('');
    const user = ref<User | null>(null);
    const links = ref<AdminLink[]>([]);
    event_bus: eventBus.getData().subscribe((event) => {
      if (event.type == EventType.EVENT_CLEAR_USER) {
        token.value = '';
        user.value = null;
        links.value = [];
        localStorage.setItem('token', '');
      }
    });
    return {
      token,
      user,
      links,
      lang: 'en-US' as string,
      langOptions: [
        { label: 'Русский', value: 'ru' },
        { label: 'English', value: 'en-US' },
      ],
    };
  },
  // state: () => ({
  //   token: '' as string,
  //   lang: 'en-US' as string,
  //   user: null as User | null,
  //   links: [] as AdminLink[],
  //   langOptions: [
  //     { label: 'Русский', value: 'ru' },
  //     { label: 'English', value: 'en-US' },
  //   ],
  // }),
  getters: {
    isAuth: (state): boolean => state.user !== null && state.token !== '',
    isHasAdminLinks: (state): boolean =>
      Array.isArray(state.links) && state.links.length != 0,
  },
  actions: {
    async signUp(user: User): Promise<boolean> {
      const response = await apiService.post('auth/signUp', user);
      if (!response.error && response.data) {
        this.user = response.data.user;
        this.links = response.data.links;
        this.setToken(response.data.token);
        return true;
      }
      return false;
    },
    async signIn(email: string, password: string): Promise<boolean> {
      const response = await apiService.post('auth/signIn', {
        email,
        password,
      });
      if (!response.error && response.data) {
        this.user = response.data.user;
        this.links = response.data.links;
        this.setToken(response.data.token);
        return true;
      }
      return false;
    },
    async setToken(token: string): Promise<void> {
      // if (token == null || token == undefined) return;
      localStorage.setItem('token', token);
      this.token = token;
      apiService.setAuth(this.token);
    },
    async getToken(): Promise<string> {
      const token = localStorage.getItem('token');
      if (!token) {
        this.setToken('');
      } else {
        this.setToken(token);
        const response = await apiService.post('auth/getAuthUser', { token });
        if (!response.error) {
          this.links = response.data['links'];
          delete response.data['links'];
          this.user = response.data;
        }
      }
      return this.token;
    },
    getLang(): string {
      const result = localStorage.getItem('lang');
      if (result) {
        this.lang = result;
      }
      return this.lang;
    },
    setLang(newLang: string): void {
      localStorage.setItem('lang', newLang);
      this.lang = newLang;
    },
    signOut(): void {
      this.setToken('');
      this.user = null;
      this.links = [];
    },
    save(user: User) {
      if (user.id == this.user?.id) {
        this.user = user;
      }
    },
  },
});
