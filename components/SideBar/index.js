"use client"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "state/authAtom";
import { profileAtom } from "state/profileAtom";
import { useCookies } from "next-client-cookies";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnalyzeIcon,
  CalibrLogo,
  ChevronRightIcon,
  ChevronUpIcon,
  ContinueReading,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SettingsFillIcon,
  SpaceIcon,
  StarIcon,
  XIcon,
} from "Icons";
import CustomButton from "components/CustomButton";
import { useTranslations } from "use-intl";

const SideBar = (props) => {
  const { onClose } = props;

  const t = useTranslations("Common");

  const profile = useRecoilValue(profileAtom);
  const setIsAuth = useSetRecoilState(authAtom);
  const cookies = useCookies();

  const [activePath, setActivePath] = useState("my-learning");
  const [subPath, setSubPath] = useState("");
  const [userRole, setUserRole] = useState();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      let pathParts = pathname.split("/");

      if (pathParts.length > 2) {
        let path = pathParts[2];
        if (path === "manage") {
          setActivePath(path);
          if (pathParts.length > 3) {
            setSubPath(pathParts[3]);
          }
        } else {
          setActivePath(path);
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (profile && profile.role) {
      setUserRole(profile.role);
    } else {
      setUserRole();
    }
  }, [profile]);

  const logout = () => {
    cookies.remove("token");
    sessionStorage.removeItem("pageData");
    router.replace("/auth/login");
    setIsAuth(null);
  };

  return (
    <>
      <nav
        id="sidebar"
        className="top-0 px-4 h-screen left-0 w-screen lg:w-56 z-20 fixed bg-white border-r border-gray-300 lg:sticky overflow-y-auto pb-10"
      >
        <div id="logo-container" className="py-4 flex items-center">
          <button
            className="mr-4 lg:hidden"
            onClick={() => {
              onClose();
            }}
          >
            <div className="h-8 w-8 text-gray-900">
              <XIcon />
            </div>
          </button>

          <Link href="/dashboard/my-learning">
            <div className="mt-5 h-10">
              {profile ? (
                <div className="h-14">
                  {profile.orgDetails &&
                  profile.orgDetails.logo &&
                  profile.orgDetails.logo !== "" ? (
                    <img
                      alt="Company Logo"
                      src={`${process.env.NEXT_PUBLIC_ASSETS_CDN_BASE}${profile.orgDetails.logo}`}
                      className="h-full object-contain"
                    />
                  ) : (
                    <div className="ml-5 w-24 max-h-14">
                      <CalibrLogo />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </Link>
        </div>

        <div id="sidebar-top" className="pt-6">
          <Link href="/dashboard/my-learning">
            <div
              onClick={() => {}}
              className={`py-3 px-5 mb-2 flex items-center hover:bg-bg-500 hover:rounded-lg cursor-pointer
              ${
                activePath === "my-learning" ? "bg-bg-500 rounded-lg" : ""
              } text-quaternary-900 `}
            >
              <HomeIcon />
              <div className="ml-5 text-sm  font-medium">
                <span>{t("my_learning")}</span>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/discover">
            <div
              onClick={() => {}}
              className={`py-3 px-5 mb-2 flex items-center hover:bg-bg-500 hover:rounded-lg cursor-pointer
              ${
                activePath === "discover" || activePath === "book"
                  ? "bg-bg-500 rounded-lg"
                  : ""
              } text-quaternary-900 `}
            >
              <SpaceIcon />
              <div className="ml-5 text-sm  font-medium">
                <span>{t("discover")}</span>
              </div>
            </div>
          </Link>

          {userRole && (userRole === "Admin" || userRole === "Author") ? (
            <div className="hidden lg:block">
              <Link href="/dashboard/create">
                <div
                  onClick={() => {}}
                  className={`py-3 px-5 mb-2 flex items-center hover:bg-bg-500 hover:rounded-lg cursor-pointer ${
                    activePath === "create" ? "bg-bg-500 rounded-lg" : ""
                  } text-quaternary-900 `}
                >
                  <PlusIcon />
                  <div className="ml-5 text-sm  font-medium">
                    <span>Create</span>
                  </div>
                </div>
              </Link>
            </div>
          ) : null}

          <div id="sidebar-middle">
            <Link href="/dashboard/my-activities">
              <div
                onClick={() => {}}
                className={`py-3 px-5 mb-2 flex items-center hover:bg-bg-500 hover:rounded-lg cursor-pointer ${
                  activePath === "my-activities" ? "bg-bg-500 rounded-lg" : ""
                } text-quaternary-900 `}
              >
                <ContinueReading />
                <div className="ml-5 text-sm  font-medium">
                  <span>My Activities</span>
                </div>
              </div>
            </Link>
            <Link href="/dashboard/favourites" legacyBehavior>
              <a
                onClick={() => {}}
                className={`py-3 px-5 mb-2 flex items-center hover:bg-bg-500 hover:rounded-lg cursor-pointer ${
                  activePath === "favourites" ? "bg-bg-500 rounded-lg" : ""
                } text-quaternary-900 `}
              >
                <StarIcon />
                <div className="ml-5 text-sm  font-medium">
                  <span>{t("starred")}</span>
                </div>
              </a>
            </Link>

            <div className="px-3 lg:hidden">
              <CustomButton type="icon" onClick={logout}>
                <div className="flex">
                  <LogoutIcon />
                  <div className="ml-5">
                    <span>{t("logout")}</span>
                  </div>
                </div>
              </CustomButton>
            </div>
          </div>

          <div className="my-10">
            <div className="w-full border-t border-gray-300"></div>
          </div>

          {userRole && (userRole === "Admin" || userRole === "Group Admin") ? (
            <div className="hidden lg:block">
              <Link href="/dashboard/analyze">
                <div
                  onClick={() => {}}
                  className={`py-3 px-5 mb-3 flex items-center hover:bg-bg-500 hover:rounded-lg cursor-pointer ${
                    activePath === "analyze" ? "bg-bg-500 rounded-lg" : ""
                  } text-quaternary-900 `}
                >
                  <AnalyzeIcon />
                  <div className="ml-5 text-sm  font-medium">
                    <span>Analyze</span>
                  </div>
                </div>
              </Link>
            </div>
          ) : null}

          {userRole && (userRole === "Admin" || userRole === "Group Admin") ? (
            <div className="hidden lg:block">
              <Link href="/dashboard/manage/people/users">
                <div
                  onClick={() => {}}
                  className={`py-3 px-5 flex items-center justify-between ${
                    activePath !== "manage"
                      ? "hover:bg-bg-500 hover:rounded-lg  cursor-pointer"
                      : ""
                  } text-quaternary-900 `}
                >
                  <div className="flex">
                    <SettingsFillIcon />
                    <div className="ml-5 text-sm  font-medium">
                      <span>Manage</span>
                    </div>
                  </div>
                  <div>
                    {activePath === "manage" ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" isOutline />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ) : null}

          {activePath === "manage" ? (
            <div className="hidden lg:block border-l border-secondary-900 ml-7">
              <Link href="/dashboard/manage/people/users">
                <div
                  onClick={() => {}}
                  className={`ml-3 py-2 px-3 mb-3 flex items-center justify-between hover:bg-bg-500 hover:rounded-lg cursor-pointer text-quaternary-900 ${
                    subPath === "people" ? "bg-bg-500 rounded-lg" : ""
                  }`}
                >
                  <div className="flex">
                    <div className="text-sm  font-medium">
                      <span>People</span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/manage/resources">
                <div
                  onClick={() => {}}
                  className={`ml-3 py-2 px-3 mb-3 flex items-center justify-between hover:bg-bg-500 hover:rounded-lg cursor-pointer text-quaternary-900 ${
                    subPath === "resources" ? "bg-bg-500 rounded-lg" : ""
                  }`}
                >
                  <div className="flex">
                    <div className="text-sm  font-medium">
                      <span>Resources</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default SideBar;
