"use client"
import DropDown from "components/DropDown";
import HomeMenu from "components/HomeMenu";
import { useOnClickOutSide } from "hooks";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { profileAtom } from "state/profileAtom";

const UserProfileMenu = (props) => {
  const { source } = props;
  const dropdownRef = useRef();

  const profile = useRecoilValue(profileAtom);
  const [showDropdown, setShowDropdown] = useState(false);

  const closeDropdownHandler = () => setShowDropdown(false);
  useOnClickOutSide(dropdownRef, closeDropdownHandler);

  return (
    <div>
      {profile ? (
        profile.profile_image ? (
          <div
            className="m-auto w-fit hidden lg:block  py-1 px-3 rounded-full cursor-pointer"
            onClick={() => {
              setShowDropdown(true);
            }}
          >
            <div className="h-10 w-10">
              <img
                alt="Profile Image"
                src={profile.profile_image}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div
            className={`m-auto hidden lg:block text-white w-fit font-extrabold text-2xl py-1 px-3 rounded-full bg-[#B366CC] cursor-pointer`}
            onClick={() => {
              setShowDropdown(true);
            }}
          >
            {profile.first_name.charAt(0).toUpperCase()}
          </div>
        )
      ) : null}

      {showDropdown && (
        <DropDown fullScreen ref={dropdownRef}>
          <HomeMenu source={source} />
        </DropDown>
      )}
    </div>
  );
};

export default UserProfileMenu;
