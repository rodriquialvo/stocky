import servers from '../../constants/servers';
import isTokenExpired from '../../utils/isTokenExpired';
// remember: if local, to do requests, run adb reverse tcp:3300 tcp:3300
export const DOMAIN = servers.qa;
const JSON_MIME_TYPE = 'application/json';

class Http {
  private idToken: string | undefined;
  private readonly endpoint: string | undefined;
  private readonly refreshToken?: () => Promise<void>;

  constructor(
    idToken?: string,
    endpoint?: string,
    refreshToken?: () => Promise<void>,
  ) {
    this.idToken = idToken;
    this.endpoint = !endpoint?.startsWith('http')
      ? `${DOMAIN}/${endpoint}`
      : endpoint;
    this.refreshToken = refreshToken;
  }

  setIdToken = (idToken: string) => (this.idToken = idToken);

  getUrl = (url?: string) => {
    if (url && url?.startsWith('http')) {
      return url;
    }
    console.log({url, endpoint: this.endpoint});
    return url ? `${this.endpoint}/${url}` : this.endpoint;
  };

  /**
   * Get the session token.
   * @returns {string} Returns the current session token.
   */
  getIdToken = () => this.idToken;

  /**
   * Check if a token session is present.
   * @returns {boolean} Returns True when a token is present.
   */
  hasSession = () => !!this.idToken;

  /**
   * Get a Bearer Auth Header for make HTTP requests.
   * @returns {any} An authorization header.
   */
  getAuthHeader = () =>
    this.hasSession() ? {Authorization: `Bearer ${this.idToken}`} : undefined;

  getSearchParams = <T>(params?: T) => {
    if (!params) {
      return '';
    }
    const entries = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]: [string, any]) => `${key}=${value.toString()}`)
      .join('&');

    return `?${entries}`;
  };

  processResponse = async <T>(response: Response): Promise<T> => {
    if (this.idToken && isTokenExpired(this.idToken) && this.refreshToken) {
      await this.refreshToken();
    }
    const result = await response.json();
    if (response.ok) {
      return result.response?.data || result;
    }

    // for now, we will not take the result.message only statusText.
    const message = response.statusText;
    throw {message, status: response.status, response: result};
  };

  get = async <T, U>(url: string, params?: U): Promise<T> => {
    console.info(
      'GET',
      `${this.getUrl(url)}${this.getSearchParams<U>(params)}`,
    );
    const response = await fetch(
      `${this.getUrl(url)}${this.getSearchParams(params)}`,
      {
        headers: {
          ...this.getAuthHeader(),
          Accept: JSON_MIME_TYPE,
        },
      },
    );
    console.log(this.getUrl(url));
    return this.processResponse<T>(response);
  };

  post = async <T>(url: string, data: any, params?: any) => {
    const body = JSON.stringify(data);
    console.info('POST', `${this.getUrl(url)}${this.getSearchParams(params)}`);
    const response = await fetch(
      `${this.getUrl(url)}${this.getSearchParams(params)}`,
      {
        method: 'POST',
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': JSON_MIME_TYPE,
          Accept: 'application/json',
        },
        body,
      },
    );
    return this.processResponse<T>(response);
  };
}

export default Http;
