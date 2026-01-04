import { getApiClient } from "@/shared/api/base";

export interface UploadFileResponse {
  url: string;
  key: string;
}

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await getApiClient().post<UploadFileResponse>(
    "/files/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function uploadCheatImage(file: File): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await getApiClient().post<UploadFileResponse>(
    "/files/upload/cheat-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

