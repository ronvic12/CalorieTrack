import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/";

class AuthService {
  async login(emailOrUsername, password) {
    const response = await axios
          .post(API_URL + "Login", {
            emailOrUsername,
              password
          });
      if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "Register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();