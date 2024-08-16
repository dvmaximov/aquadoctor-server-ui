import axios, { AxiosError } from 'axios';
import { Router, useRouter } from 'vue-router';
import eventBus, { EventType } from 'src/services/event.bus';

let host: string;

const event_bus = eventBus;

if (process.env.DEV) {
  host = `${location.protocol}//${location.hostname}:8882`;
} else {
  const port = location.port === '' ? '' : `:${location.port}`;
  host = `${location.protocol}//${location.hostname}${port}`;
}

export class CommonResponse {
  error = false;
  errorCode = 0;
  errorMessage = '';
  data?: any;
}

class ApiService {
  setAuth(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  public redirect(statusCode: number, router: Router): void {
    if (statusCode === 401) {
      event_bus.sendData({ type: EventType.EVENT_CLEAR_USER, data: {} });
      router.push('/signin');
    } else if (statusCode === 403) {
      router.push('/forbidden');
    }
  }

  private handleError(err: any, router: Router): CommonResponse {
    const statusCode = err.response.status || 401;
    this.redirect(statusCode, router);

    const res = new CommonResponse();
    const error = err as AxiosError;

    const data: any = error.response?.data;
    res.error = true;
    res.errorCode = data.statusCode;
    res.errorMessage = data.message;
    return res;
  }

  async find(path: string) {
    const router = useRouter();
    try {
      const response = await axios.get(`${host}/api/${path}`);
      const res = new CommonResponse();
      res.data = response.data;
      return res;
    } catch (err: any) {
      return this.handleError(err, router);
    }
  }

  async findById(path: string, id: number): Promise<unknown> {
    const router = useRouter();
    try {
      const response = await axios.get(`${host}/api/${path}/${id}`);
      const res = new CommonResponse();
      res.data = response.data;
      return res;
    } catch (err: any) {
      return this.handleError(err, router);
    }
  }

  async findByName(path: string, name: string): Promise<unknown> {
    const router = useRouter();
    try {
      const response = await axios.get(`${host}/api/${path}/${name}`);
      const res = new CommonResponse();
      res.data = response.data;
      return res;
    } catch (err: any) {
      return this.handleError(err, router);
    }
  }

  async insert(path: string, record: unknown = {}): Promise<any> {
    const router = useRouter();
    try {
      const response = await axios.post(`${host}/api/${path}`, record);
      const res = new CommonResponse();
      res.data = response.data;
      return res;
    } catch (err) {
      return this.handleError(err, router);
    }
  }

  async post(path: string, record: unknown = {}): Promise<CommonResponse> {
    const router = useRouter();
    try {
      const response = await axios.post(`${host}/api/${path}`, record);
      const res = new CommonResponse();
      res.data = response.data;
      return res;
    } catch (err) {
      return this.handleError(err, router);
    }
  }

  // async signUp(record: unknown = {}): Promise<unknown> {
  //   const res = await axios.post(`${host}/api/auth/signUp`, record);
  //   return res.data;
  // }

  // async signIn(email: string, password: string): Promise<UserResponse> {
  //   try {
  //     const response = await axios.post(`${host}/api/auth/signIn`, {
  //       email,
  //       password,
  //     });
  //     const res: UserResponse = {
  //       error: false,
  //       token: response.data!.token,
  //       user: response.data!.user,
  //     };

  //     console.log(res);
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //     const error = err as AxiosError;
  //     const res: UserResponse = {
  //       error: true,
  //       status: error.response?.data?.statusCode,
  //       statusText: error.response?.data?.message,
  //     };
  //     console.log(res);
  //     return res;
  //   }
  // }

  async delete(path: string, id: number): Promise<unknown> {
    const res = await axios.delete(`${host}/api/${path}/remove/${id}`);
    return res.data;
  }

  async update(path: string, value: unknown): Promise<unknown> {
    const res = await axios.put(`${host}/api/${path}/update`, value);
    return res.data;
  }
}

export default new ApiService();
