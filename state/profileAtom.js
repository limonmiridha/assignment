import { atom } from "recoil";

const profileAtom = atom({
  key: "profile-atom",
  default: null,
});

export { profileAtom };
