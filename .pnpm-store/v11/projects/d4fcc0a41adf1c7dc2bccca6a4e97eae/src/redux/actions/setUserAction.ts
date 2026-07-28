import { User } from "../../features/users/types";

export const setUser = (user: User) => {
  return {
    type: "SET_USER",
    user,
  };
};
