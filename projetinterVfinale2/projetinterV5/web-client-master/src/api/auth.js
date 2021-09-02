import axios from "axios"

// { token: Token, name: String, manager: Boolean }
export const login = (data) =>
  axios
    .post("http://localhost:3000/api/auth/login", data)
    .then((res) => res.data)
  

export const register = (data) =>
  axios
    .post("http://localhost:3000/api/auth/register", data)
    .then((res) => res.data)


export const promoteToManager = () =>
  axios
    .put("http://localhost:3000/api/auth/promote/to/manager", null, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) => localStorage.setItem("manager", "true"))

