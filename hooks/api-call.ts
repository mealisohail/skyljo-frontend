
export const makeApiCall = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    headers: Record<string, string> = {},
    bearer?: string
  ): Promise<T> => {

    try {
      const response = await fetch(`http://localhost:3001/v1/admin/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      return response.json();
    } catch (error) {
      console.error(`API Call Error: ${error}`);
      throw error;
    }
  };
  