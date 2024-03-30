import request from "../authRequest";

const emailLogin = (email, password, product = "lms") => {
  return request({
    url: "/v1/auth/login",
    method: "POST",
    data: {
      email,
      password,
      product,
    },
  });
};

const AuthService = {
  emailLogin,
};

export default AuthService;
