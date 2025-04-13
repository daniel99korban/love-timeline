import api from "./axiosInstance";

export const getUsers = async () => {
  try {
    const response = await api.get("/users/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const getUserByName = async (name: string) => {
  try {
    const response = await api.get("/users/by-name", {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário pelo nome ${name}:`, error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário pelo ID ${id}:`, error);
    throw error;
  }
};

export const getSortedUsers = async () => {
  try {
    const response = await api.get("/users/sorted");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários ordenados:", error);
    throw error;
  }
};

export const getSortedUsersBy = async (param: string) => {
  try {
    const response = await api.get("/users/sorted-by", {
      params: { param },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao buscar usuários ordenados pelo parâmetro ${param}:`,
      error
    );
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await api.post("/users/", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};