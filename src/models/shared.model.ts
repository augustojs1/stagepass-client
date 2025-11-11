export interface FetchResponse<T> {
  data: T | null;
  headers: Headers;
  status: number;
}

export interface ApiResponse<T = void> {
  message: string | null;
  success: boolean;
  data: T | null;
}
