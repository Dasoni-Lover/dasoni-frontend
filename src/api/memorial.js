import client from "./client";

export const getPhotos = async (hallId, body) => {
  const res = await client.post(`/api/halls/${hallId}/photos`, body);
  return res.data.photos;
};