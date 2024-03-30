import useUser from "hooks/useUser";
import { useCookies } from "next-client-cookies";

const AuthHoc = ({ children }) => {
  const cookies = useCookies();

  useUser({
    redirectTo: "/auth/login",
    token: cookies.get("token"),
  });

  return (
    <div>
      <div> {children}</div>
    </div>
  );
};

export default AuthHoc;
