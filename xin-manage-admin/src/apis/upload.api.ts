import { axiosClient } from "./axios-client";

const paths = {
  uploadFile: "/v1/upload/file",
};

const uploadFile = (file: File) => {
  let formData = new FormData();
  formData.append("file", file);

  return axiosClient<string>({
    url: paths.uploadFile,
    method: "POST",
    data: formData,
  });
};

export const uploadApi = {
    uploadFile
}