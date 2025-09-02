import api from "./client";

export class AuthService {
  async createAccount({ email, password, name }) {
    const { data } = await api.post("/auth/register", { email, password, name });
    if (data.accessToken) localStorage.setItem("access_token", data.accessToken);
    return data.user;
  }

  async login({ email, password }) {
   
    const { data } = await api.post("/auth/login", { email, password });
    if (data.accessToken) localStorage.setItem("access_token", data.accessToken);
    return data.user;
  }

  async getCurrentUser() {
    // GET /auth/me returns {user}
    const { data } = await api.get("/auth/me");
    return data.user ?? null;
  }

  async logout() {
    try {
      await api.post("/auth/logout"); 
    } finally {
      localStorage.removeItem("access_token");
    }
  }
}

const authserve = new AuthService();
export default authserve;
