import { Project } from "@/types/council";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

interface ApiResponse<T> {
  data: T;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "An error occurred");
  }
  const json: ApiResponse<T> = await response.json();
  return json.data;
}

export const api = {
  projects: {
    list: async (): Promise<Project[]> => {
      const response = await fetch(`${API_BASE_URL}/projects`);
      return handleResponse<Project[]>(response);
    },

    create: async (data: {
      name: string;
      description?: string;
    }): Promise<Project> => {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse<Project>(response);
    },

    get: async (id: string): Promise<Project> => {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      return handleResponse<Project>(response);
    },

    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to delete project");
      }
    },
  },
};
