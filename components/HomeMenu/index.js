import CustomButton from "components/CustomButton";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "state/authAtom";
import { profileAtom } from "state/profileAtom";

const HomeMenu = (props) => {
  const { source } = props;

  const router = useRouter();
  const setIsAuth = useSetRecoilState(authAtom);
  const profile = useRecoilValue(profileAtom);
  const cookies = useCookies();

  const logout = () => {
    cookies.remove("token");
    sessionStorage.removeItem("pageData");
    router.replace("/auth/login");
    setIsAuth(null);
  };

  return (
    <div>
      <div className="block">
        <div className="flex">
          <div className="p-4">
            <Link href="/profile">
              <div className="text-sm leading-6 text-slate-900  font-semibold">
                {profile["first_name"] + " " + profile["last_name"] || ""}
              </div>
            </Link>
            <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>{profile["email"]["id"] || ""}</p>
            </div>
          </div>

          <div className="px-2 m-auto">
            <CustomButton
              type="secondary"
              rounded={"rounded-lg"}
              onClick={logout}
            >
              <div className="px-4">
                <span>Logout</span>
              </div>
            </CustomButton>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-300"></div>

      <div className="pb-4 px-2">
        <Link href="/dashboard/profile">
          <div className="py-2 cursor-pointer mt-1 px-2 hover:bg-gray-100 rounded hover:border-r-4 border-red-500 font-semibold text-sm text-black">
            <span>Profile</span>
          </div>
        </Link>

        {source === "craft" ? (
          <Link href="/dashboard/billing">
            <div className="py-2 cursor-pointer mt-1 px-2 hover:bg-gray-100 rounded hover:border-r-4 border-red-500 font-semibold text-sm text-black">
              <span>Billing</span>
            </div>
          </Link>
        ) : null}

        <Link href="https://forms.gle/GXmSHtQyLL1841qN8" legacyBehavior>
          <a target="_blank">
            <div className="py-2 cursor-pointer mt-1 px-2 hover:bg-gray-100 rounded hover:border-r-4 border-red-500 font-semibold text-sm text-black">
              <span>Report an Issue</span>
            </div>
          </a>
        </Link>

        {source === "craft" ? (
          <Link href="/dashboard/knowledge-base">
            <div className="py-2 cursor-pointer mt-1 px-2 hover:bg-gray-100 rounded hover:border-r-4 border-red-500 font-semibold text-sm text-black">
              <span>Knowledge Base</span>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default HomeMenu;
