"use client";

import { useTranslations } from "next-intl";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { authAtom } from "state/authAtom";
import { profileAtom } from "state/profileAtom";
import { useEffect, useState } from "react";
import useApi from "hooks/useApi";
import { parseMyDetails, validateEmail } from "utils";
import { AuthService, UserService } from "http-service";
import { AuthHeader, CustomButton, FormInput } from "components";
import Link from "next/link";

const LoginPage = () => {
  const t = useTranslations("Login");

  const cookies = useCookies();
  const router = useRouter();

  const setIsAuth = useSetRecoilState(authAtom);
  const setProfile = useSetRecoilState(profileAtom);

  const [email, setEmail] = useState({
    value: "",
    label: t("email"),
    type: "email",
    id: "email",
    name: "email",
    required: true,
    placeholder: t("email"),
    error: false,
  });

  const [password, setPassword] = useState({
    value: "",
    label: t("password"),
    type: "password",
    id: "password",
    name: "password",
    placeholder: "*******",
    error: false,
  });

  const [errorMessage, setErrorMessage] = useState({ status: false, msg: "" });

  let [
    { data: loginData, isLoading: loginLoader, isError: loginError },
    emailLogin,
  ] = useApi(null);
  let [
    { data: myDetails, isLoading: myDetailsLoading, isError: myDetailsError },
    getMyDetails,
  ] = useApi(null);

  useEffect(() => {
    if (loginData && loginData.code) {
      const { user: userDetails, token, code, message, email } = loginData;
      if (code === 200) {
        cookies.set("token", token, { expires: 365 });

        setIsAuth(token);
        setProfile(parseMyDetails(userDetails));

        //call my details
        getMyDetails(() => () => UserService.fetchUserDetails(token));
      } else if (code === 401) {
        router.replace(`/auth/verify-account?email=${email}`);
      } else {
        setErrorMessage({ status: true, msg: message });
      }
    } else if (loginError) {
      //Show Error
      setErrorMessage({ status: true, msg: loginError.message });
    }
  }, [loginData, loginError]);

  useEffect(() => {
    if (myDetails && myDetails.code) {
      const { data: userDetails, code } = myDetails;
      if (code === 200) {
        setProfile(parseMyDetails(userDetails));

        router.push("/dashboard/discover");
      }
    } else if (myDetailsError) {
    }
  }, [myDetails, myDetailsError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    email.error = false;
    password.error = false;
    if (!validateEmail(email.value)) {
      email.error = true;
      setErrorMessage({ status: true, msg: t("please_provide") });
    } else if (password.value.length < 6) {
      password.error = true;
      setErrorMessage({ status: true, msg: t("password_should") });
    } else {
      setErrorMessage({ status: false });
      emailLogin(
        () => () =>
          AuthService.emailLogin(
            email.value.trim().toLocaleLowerCase(),
            password.value.trim(),
            "lms"
          )
      );
    }
  };

  return (
    <div className="relative h-screen">
      <AuthHeader />
      <div id="main-content" className="w-screen h-full bg-white">
        <div className="w-full flex justify-center h-full">
          <div
            id="main-wrapper"
            className="relative w-full flex justify-center"
          >
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 bg-gray-200 w-[38%]"></div>
            <div className="flex-col flex lg:flex-row w-full h-full lg:container">
              <div className="lg:h-full w-full z-10 relative">
                <div className="bg-gray-200 lg:bg-primary-900 rounded-xl p-5 lg:w-72 lg:ml-10 xl:p-10 xl:w-80 lg:mt-28 xl:mt-52 relative 2xl:mt-[40%]">
                  <div>
                    <h1 className="font-bold text-secondary-900 lg:text-white text-xl lg:text-3xl mr-5">
                      <span>All-in-one</span>
                      <br />
                      <span>Collaborative</span>
                      <br />
                      <span> Learning Platform</span>
                    </h1>
                    <p className="text-secondary-500 lg:text-white mt-5 text-sm mr-5">
                      Helping organizations foster a culture of continuous
                      learning and build a future-ready workforce.
                    </p>
                  </div>

                  <div className="hidden xl:block absolute top-[-70px] right-[-220px] bg-white rounded-xl shadow-lg p-5">
                    <img
                      layout="fill"
                      src="/images/hero.webp"
                      alt="Hero image"
                      className="w-60 h-60"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full mt-5 lg:mt-10 xl:mt-10 2xl:mt-[10%]">
                <div className="w-full px-5 lg:px-0 xl:ml-32 lg:w-80 xl:w-96">
                  <div>
                    <h2 className="hidden md:block text-center sm:text-left font-extrabold text-3xl text-quaternary-900">
                      Sign In
                    </h2>

                    <form className="mt-9">
                      <FormInput
                        {...email}
                        onChange={(e) =>
                          setEmail((prev) => ({
                            ...prev,
                            value: e.target.value,
                          }))
                        }
                        autoFocus={true}
                      />
                      <div className="mt-4">
                        <FormInput
                          {...password}
                          onChange={(e) =>
                            setPassword((prev) => ({
                              ...prev,
                              value: e.target.value,
                            }))
                          }
                          autoFocus={false}
                        />
                      </div>

                      {errorMessage.status ? (
                        <p className="mt-2 peer-invalid:visible text-pink-600 text-sm">
                          {errorMessage.msg}
                        </p>
                      ) : null}

                      <div className="block mt-6 items-center object-fill mx-auto font-bold text-base text-primary-900 cursor-pointer hover:underline">
                        <Link href="/auth/forgot-password">
                          <div>{t("forgot_password")}</div>
                        </Link>
                      </div>
                      <div className="mt-6">
                        <CustomButton
                          onClick={handleSubmit}
                          rounded="rounded-md"
                          width="w-full"
                          isLoading={loginLoader || myDetailsLoading}
                          font="font-semibold"
                        >
                          <div>{t("sign_in_button")}</div>
                        </CustomButton>
                      </div>
                      <div className="my-4">
                        <div className="flex justify-center mb-4">
                          <div className="h-px w-full bg-gray-400 mx-10" />
                        </div>
                        <div className="mt-6">
                          <Link href={"/auth/sso"}>
                            <button className="w-full bg-gray-800 py-2.5 px-14 font-semibold text-white rounded-lg">
                              Login with SSO
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-700">
                        <span>{`By signing in, I agree to the `}</span>
                        <span className="text-primary-900 cursor-default hover:underline">
                          <Link
                            href={"https://calibr.ai/privacy"}
                            target="_blank"
                          >
                            <span>{`Calibr's Privacy Statement`}</span>
                          </Link>
                        </span>
                        <span>{" and "}</span>
                        <span className="text-primary-900 cursor-default hover:underline">
                          <Link
                            href={"https://calibr.ai/terms"}
                            target="_blank"
                          >
                            <span>{`Terms of Service.`}</span>
                          </Link>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
