import { useCallback } from "react";
import styles from "./Details.module.css";
import { type UserModel } from "../models";
import { deleteUser } from "../api";
import Button from "../../components/Button";

interface Props {
  setShouldFetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserModel;
}

export default function Details(props: Props) {
  const { setShouldFetchUsers } = props;
  const { id, email, name } = props.user;

  const handleDelete = useCallback(() => {
    deleteUser(id, () => {
      console.log("api delete user success!");
      setShouldFetchUsers(true);
    });
  }, [id, setShouldFetchUsers]);

  return (
    <div className={styles.container}>
      <div className={styles.name}>Name: {name}</div>
      <div className={styles.email}>Email: {email}</div>

      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}
