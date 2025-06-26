import { useEffect } from "react";
import { type UserModel } from "./models";
import { getUsers } from "./api";

interface UniqueUserModelMap {
  [key: number | string]: UserModel;
}

export function useFetchUsers(
  shouldFetchUsers: boolean,
  setShouldFetchUsers: React.Dispatch<React.SetStateAction<boolean>>,
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>
): void {
  useEffect(() => {
    if (!shouldFetchUsers) return;

    console.log("DEBUG: fetching users!");

    getUsers((userData) => {
      const users: UniqueUserModelMap = {};
      // Ensure uniqueness per id.
      userData.forEach((user: UserModel) => {
        users[user.id] = user;
      });
      setUsers(Object.values(users));
      setShouldFetchUsers(false);
    });
  }, [shouldFetchUsers, setShouldFetchUsers, setUsers]);
}
