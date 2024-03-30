"use client";
import { DashboardHeader, SideBar } from "components";
import { AuthHoc } from "hoc";
import { useRecoilValue } from "recoil";
import { authAtom } from "state/authAtom";

const HomePage = () => {
  const token = useRecoilValue(authAtom);

  return (
    <AuthHoc>
      <div className="flex relative">
        {token && (
          <div className="hidden lg:block">
            <SideBar />
          </div>
        )}

        <div id="main-content" className="h-full w-full">
          {token ? <DashboardHeader isHome={true} /> : null}
        </div>
      </div>
    </AuthHoc>
  );
};
export default HomePage;
