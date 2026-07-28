import type { User } from "../../features/users/types";

type State = {
  user: User | null;
};

type Action = { type: "SET_USER"; user: User } | { type: string };

const initialState: State = {
  user: null,
};

export const setUserReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: "user" in action ? action.user : state.user,
      };

    default:
      return state;
  }
};
