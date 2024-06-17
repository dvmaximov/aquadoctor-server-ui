import axios, { AxiosError } from 'axios';

let host: string;

if (process.env.DEV) {
  host = `${location.protocol}//${location.hostname}:8882`;
} else {
  host = `${location.protocol}//${location.hostname}`;
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

  private handleError(err: unknown): CommonResponse {
    const res = new CommonResponse();
    const error = err as AxiosError;
    const data: any = error.response?.data;
    res.error = true;
    res.errorCode = data.statusCode;
    res.errorMessage = data.message;
    return res;
  }

  async find(path: string) {
    const res = await axios.get(`${host}/api/${path}`);
    return res.data;
  }

  async findById(path: string, id: number): Promise<unknown> {
    const res = await axios.get(`${host}/api/${path}/${id}`);
    return res.data;
  }

  async findByName(path: string, name: string): Promise<unknown> {
    const res = await axios.get(`${host}/api/${path}/${name}`);
    return res.data;
  }

  async insert(path: string, record: unknown = {}): Promise<unknown> {
    try {
      const response = await axios.post(`${host}/api/${path}/insert`, record);
      const res = new CommonResponse();
      res.data = response.data;
      return res;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async post(path: string, record: unknown = {}): Promise<CommonResponse> {
    try {
      const response = await axios.post(`${host}/api/${path}`, record);
      const res = new CommonResponse();
      res.data = response.data;
      return res;
    } catch (err) {
      return this.handleError(err);
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
