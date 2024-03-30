import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import useApi from "./useApi";
import { authAtom } from "state/authAtom";
import { profileAtom } from "state/profileAtom";
import { UserService } from "http-service";
import { parseMyDetails } from "utils";

export default function useUser({ redirectTo = "", token } = {}) {
  const cookies = useCookies();
  const router = useRouter();

  const [isAuth, setIsAuth] = useRecoilState(authAtom);
  const [profile, setProfile] = useRecoilState(profileAtom);

  let [{ data: user, isLoading, isError }, getMyDetails] = useApi(null);

  useEffect(() => {
    // if no redirect needed, just return
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user) return;

    if (user && user.code) {
      const { data: userDetails, code } = user;
      if (code === 200) {
        setProfile(parseMyDetails(userDetails));
      } else {
        cookies.remove("token");
        if (redirectTo !== "") {
          router.replace(redirectTo);
        }
        setIsAuth(null);
      }
    } else if (isError) {
      // If the token was fraud we first remove it from cookie and then redirect to "/"
      cookies.remove("token");
      if (redirectTo !== "") {
        router.replace(redirectTo);
      }
      setIsAuth(null);
    }
  }, [user, isError, redirectTo]);

  useEffect(() => {
    if (!token && redirectTo !== "") {
      router.replace(redirectTo);
    } else {
      if (!isAuth && token) {
        setIsAuth(token);
      }

      // we call the api that verifies the token.
      if (!profile) {
        getMyDetails(() => () => UserService.fetchUserDetails(token));
      }
    }
  }, []);
}
