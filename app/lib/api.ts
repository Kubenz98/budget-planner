export class ApiError extends Error {
  constructor(
    url: string,
    public status: number,
    public responseText: string,
  ) {
    super(`'${url}' returned ${status}:`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.responseText = responseText;
    this.name = "ApiError";
  }
}

export const fetchJson = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const responseText = await response.text();
    throw new ApiError(url, response.status, responseText);
  }
  return await response.json();
};
