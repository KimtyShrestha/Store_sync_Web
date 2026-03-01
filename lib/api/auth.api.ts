import api from "@/lib/axios"

export const registerApi = (data: {
  name: string
  email: string
  password: string
}) => {
  return api.post("/auth/register", {
    username: data.email,
    email: data.email,
    password: data.password,
    firstName: data.name,
  })
}

export const loginApi = async (data: {
  email: string
  password: string
}) => {
  const res = await api.post("/auth/login", data);

  // Store token & role
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);

  return res.data;
};

export const logoutApi = () => {
  return api.post("/auth/logout");
};
