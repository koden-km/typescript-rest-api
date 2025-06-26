import axios from "axios";
import type { UserModel } from "./models";

type ErrorCallback = ((error: Error) => void) | undefined;
type FinallyCallback = (() => void) | undefined;
type GetUserDataCallback = (user: UserModel) => void;
type GetUsersDataCallback = (users: UserModel[]) => void;
type CreateUserDataCallback = (user: UserModel) => void;
type DeleteUserDataCallback = () => void;

const apiUrl = "http://localhost:3000/api/users/";

export function getUsers(
  onSuccess: GetUsersDataCallback,
  onError?: ErrorCallback,
  onFinally?: FinallyCallback
): void {
  axios
    .get(apiUrl)
    .then((response) => {
      console.log("DEBUG: getUsers:\n", response.data);
      if (Array.isArray(response.data)) {
        onSuccess(response.data);
      }
    })
    .catch((error) => {
      console.error("DEBUG: Error:\n", error);
      if (onError) onError(error);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
}

export function getUserById(
  id: number,
  onSuccess: GetUserDataCallback,
  onError?: ErrorCallback,
  onFinally?: FinallyCallback
): void {
  axios
    .get(apiUrl + id)
    .then((response) => {
      console.log("DEBUG: getUserById:\n", response.data);
      if (typeof response.data === "object") {
        onSuccess(response.data);
      }
    })
    .catch((error) => {
      console.error("DEBUG: Error:\n", error);
      if (onError) onError(error);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
}

export function createUser(
  params: { name: string; email: string },
  onSuccess: CreateUserDataCallback,
  onError?: ErrorCallback,
  onFinally?: FinallyCallback
): void {
  axios
    .post(apiUrl, params)
    .then((response) => {
      console.log("DEBUG: createUser:\n", response);
      if (typeof response.data === "object") {
        onSuccess(response.data);
      }
    })
    .catch((error) => {
      console.log("DEBUG: Error:\n", error);
      if (onError) onError(error);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
}

export function deleteUser(
  id: number,
  onSuccess: DeleteUserDataCallback,
  onError?: ErrorCallback,
  onFinally?: FinallyCallback
): void {
  axios
    .delete(apiUrl + id)
    .then((response) => {
      console.log("DEBUG: deleteUser:\n", response);
      onSuccess();
    })
    .catch((error) => {
      console.error("DEBUG: Error:\n", error);
      if (onError) onError(error);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
}
