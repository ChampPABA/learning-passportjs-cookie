import axios from "../config/axios";

const authApi = {};

authApi.getAuthUser = () => axios.get("/auth/user");

authApi.logout = () => axios.post("/auth/logout");

export default authApi;
