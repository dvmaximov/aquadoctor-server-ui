import axios, { AxiosError } from 'axios';
import eventBus, { EventType } from 'src/services/event.bus';

let host: string;
const event_bus = eventBus;

export enum RedirectCode {
  AQUADOCTOR_LIST,
}

export const RedirectConstants = {
  [RedirectCode.AQUADOCTOR_LIST]: '/musik',
};

// export class RedirectConstants {
//   static AQUADOCTOR_LIST = '/musik';
// }

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
  message = '';
  data?: any = {};
}

class ApiService {
  setAuth(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  public redirect(statusCode: number): void {
    if (statusCode === 401) {
      event_bus.sendData({ type: EventType.EVENT_CLEAR_USER, data: {} });
      event_bus.sendData({
        type: EventType.EVENT_REDIRECT, // signal to auth.store
        data: { path: '/signin' },
      });
    } else if (statusCode === 403) {
      event_bus.sendData({
        type: EventType.EVENT_REDIRECT, // signal to auth.store
        data: { path: '/forbidden' },
      });
    } else if (statusCode === RedirectCode.AQUADOCTOR_LIST) {
      event_bus.sendData({
        type: EventType.EVENT_REDIRECT, // signal to auth.store
        data: { path: RedirectConstants[statusCode] },
      });
    }
  }

  private handleError(err: any): CommonResponse {
    const statusCode = err.response.status || 401;
    const error = err as AxiosError;
    const data: any = error.response?.data;

    if (statusCode === 400) {
      event_bus.sendData({
        type: EventType.EVENT_MESSAGE_ERROR, // signal to message.store
        data: { message: data.message },
      });
    }

    this.redirect(statusCode);

    const res = new CommonResponse();

    res.error = true;
    res.errorCode = data.statusCode;
    res.errorMessage = data.message;
    return res;
  }

  private handleSuccess(response: any): CommonResponse {
    const { message, data } = response.data;
    if (message !== '') {
      event_bus.sendData({
        type: EventType.EVENT_MESSAGE_SUCCESS, // signal to message.store
        data: { message },
      });
    }

    const res = new CommonResponse();

    res.error = false;
    res.message = message;
    res.data = data;

    return res;
  }

  async find(path: string): Promise<CommonResponse> {
    try {
      const response = await axios.get(`${host}/api/${path}`);
      const res = this.handleSuccess(response);
      return res;
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  async findById(path: string, id: number): Promise<CommonResponse> {
    try {
      const response = await axios.get(`${host}/api/${path}/${id}`);
      const res = this.handleSuccess(response);
      return res;
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  async findByName(path: string, name: string): Promise<CommonResponse> {
    try {
      const response = await axios.get(`${host}/api/${path}/${name}`);
      const res = this.handleSuccess(response);
      return res;
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  async insert(path: string, record: unknown = {}): Promise<CommonResponse> {
    try {
      const response = await axios.post(`${host}/api/${path}/insert`, record);
      const res = this.handleSuccess(response);
      return res;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async post(path: string, record: unknown = {}): Promise<CommonResponse> {
    try {
      const response = await axios.post(`${host}/api/${path}`, record);
      const res = this.handleSuccess(response);
      return res;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async delete(path: string, id: number): Promise<CommonResponse> {
    try {
      const response = await axios.delete(`${host}/api/${path}/remove/${id}`);
      const res = this.handleSuccess(response);
      return res;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async update(path: string, value: unknown): Promise<CommonResponse> {
    try {
      const response = await axios.put(`${host}/api/${path}/update`, value);
      const res = this.handleSuccess(response);
      return res;
    } catch (err) {
      return this.handleError(err);
    }
  }
}

export default new ApiService();
