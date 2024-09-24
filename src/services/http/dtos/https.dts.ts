export interface ErrorResponse {
  message: string;
  status: number;
  response: Response;
}

export interface Response {
  type: string;
  title: string;
  status: number;
  success: boolean;
  message: string;
  errors: Record<string, any>;
}
