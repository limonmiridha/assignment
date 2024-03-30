import { UserProfileMenu } from "components";

const DashboardHeader = (props) => {
  return (
    <header id="header" className="sticky top-0 bg-white z-40">
      <div className="flex justify-center">
        <div className="flex w-full max-w-screen-lg py-5 lg:py-3 px-5 lg:px-10 2xl:px-0 lg:justify-end">
          <UserProfileMenu source="lxp" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
