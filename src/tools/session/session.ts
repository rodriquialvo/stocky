export class Session {
  public accessToken?: string;
  public accessTokenRefresh?: string;
  public permissions: string[];
  constructor(
    accessToken?: string,
    accessTokenRefresh?: string,
    permissions?: string[],
  ) {
    this.accessToken = accessToken;
    this.accessTokenRefresh = accessTokenRefresh;
    this.permissions = permissions ?? [];
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
