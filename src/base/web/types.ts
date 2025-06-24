

export interface ServiceMeta {
  user: object | null;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
}
