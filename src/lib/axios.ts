import axios from "axios";

export const okamiNotifierApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_OKAMI_NOTIFIER_API as string,
});
