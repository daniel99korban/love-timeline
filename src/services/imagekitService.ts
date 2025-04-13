export const uploadToImageKit = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", "public_KXpKhHJihjSylHYOxTLGXYgDU+w=");
  formData.append("uploadEndpoint", "https://ik.imagekit.io/nqabtlzxw");
  formData.append("useUniqueFileName", "true");

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro no upload: ${error}`);
  }

  const data = await response.json();
  return data.url;
};
