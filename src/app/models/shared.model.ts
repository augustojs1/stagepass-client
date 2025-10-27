export interface FetchResponse<T> {
  message: string | null;
  success: boolean;
  data: T | null;
}
