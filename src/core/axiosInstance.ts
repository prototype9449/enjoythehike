import axios from "axios";
import { wrapAxiosAdapter } from "@exness-tech/mock-xhr-request/lazy";

const axiosInstance = axios.create();
wrapAxiosAdapter(axiosInstance);

export { axiosInstance };
