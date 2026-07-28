type ApiErrorBody = {
  message?: string;
};

type ApiError = {
  message?: string;
  response?: {
    data?: ApiErrorBody;
  };
};

export function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;
    return apiError.response?.data?.message || apiError.message || fallback;
  }

  return fallback;
}
