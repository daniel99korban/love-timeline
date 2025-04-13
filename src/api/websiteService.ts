import api from "./axiosInstance";

export const getWebsites = async () => {
  try {
    const response = await api.get("/websites/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar websites:", error);
    throw error;
  }
};

export const getWebsitesSortedBy = async (orderBy: string) => {
  try {
    const response = await api.get(`/websites/sorted-by`, {
      params: { param: orderBy },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar websites ordenados:", error);
    throw error;
  }
};

export const createWebsite = async (websiteData: {
  title: string;
  text: string;
  plan: number;
  dataCouple: string;
  // imgs: string[];
  music_url: string | null;
}) => {
  try {
    const response = await api.post("/websites/", websiteData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar website:", error);
    throw error;
  }
};

export const addImageToWebsite = async (websiteId: number, formData: FormData) => {
  try {
    console.log("Dados da imagem:", formData.get("file"));
    const response = await api.post(`/websites/add-img/${websiteId}`, formData, {headers: {"Content-Type": "multipart/form-data"}});
    return response.data;
  } catch (error) {
    console.error(`Erro ao adicionar imagem no website ${websiteId}:`, error);
    throw error;
  }
};

export const handleFileUpload = async (file: File, websiteId: number) => {
  const formData = new FormData();
  console.log("Arquivo a ser enviado:", file);
  formData.append("file", file);

  const result = await addImageToWebsite(websiteId, formData);
  console.log("Imagem adicionada com sucesso:", result);
};

export const getImagesByWebsiteId = async (websiteId: number) => {
  try {
    const response = await api.get(`/websites/get-img/${websiteId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar as imagens para o website ${websiteId}:`, error);
    throw error;
  }
};