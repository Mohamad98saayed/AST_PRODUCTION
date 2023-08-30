import axiosConf from "../../../utils/axiosConf";
const baseUrl = "/cars";

export interface TransmitionEnum {
  transmition: "automatic" | "manual" | "SMG"
}

export interface CarData {
  manufacturer: string,
  model: string,
  year: number,
  color: string,
  fuelType: string,
  transmition: TransmitionEnum["transmition"],
  price: number,
  images: string[],
}

export const getAllCars = async () => {
  const response = await axiosConf.get(baseUrl);
  return response.data;
};

export const getOneCar = async (id: string) => {
  const response = await axiosConf.get(baseUrl + `/${id}`);
  return response.data;
};

export const createCar = async (carData: CarData) => {
  const response = await axiosConf.post(baseUrl, carData);
  return response.data;
};

export const updateCar = async (id: string, carData: CarData) => {
  const response = await axiosConf.put(baseUrl + `/${id}`, carData);
  return response.data;
};

export const deleteCar = async (id: string) => {
  const response = await axiosConf.delete(baseUrl + `/${id}`);
  return response.data;
};
