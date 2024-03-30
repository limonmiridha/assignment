import { atom } from "recoil";

const authAtom = atom({
  key: "auth-atom",
  default: null,
});

export { authAtom };
