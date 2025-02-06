import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // return the decoded token
    const token = this.getToken();
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("JWT DIDNT DECODE!", error);
    }
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token)
  }

  isTokenExpired(token: string) {
    // return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    // return the token
    const loggedUser = localStorage.getItem("idToken") || "";
    return loggedUser;
  }

  login(idToken: string) {
    // set the token to localStorage
    localStorage.setItem("id_token", idToken);
    // redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // remove the token from localStorage
    localStorage.removeItem("id_token");
    // Tredirect to the login page
    window.location.assign("/");
  }
}

export default new AuthService();
