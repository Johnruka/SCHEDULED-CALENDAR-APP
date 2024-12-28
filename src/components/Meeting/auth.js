export const isAuthenticated = () => {
    return Boolean(localStorage.getItem("authToken"));
  };