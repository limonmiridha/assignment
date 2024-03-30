import request from "../request";

const fetchUserDetails = (token) => {
  return request({
    url: "/v1/user/user-details",
    method: "GET",
    data: {},
    headers: { "x-auth-token": token },
  });
};

const UserService = {
  fetchUserDetails,
};

export default UserService;
