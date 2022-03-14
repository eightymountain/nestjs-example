interface IMakeResponse<T> {
  message?: string;
  data?: T;
}

export type commonResponse = ReturnType<typeof makeResponse>;
export function makeResponse<T>(arg: IMakeResponse<T>) {
  return {
    message: arg.message ?? '',
    data: arg.data ?? {},
  };
}
