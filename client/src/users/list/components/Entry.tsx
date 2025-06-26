import { useCallback } from "react";
import { type UserModel } from "../../models";
import styles from "../List.module.css";

interface Props {
  user: UserModel;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export default function Entry(props: Props) {
  const { isSelected, setSelected, user } = props;
  const { id, email, name } = user;

  const handleClick = useCallback(() => {
    setSelected(id);
  }, [id, setSelected]);

  return (
    <li key={user.id} className={styles.entry}>
      <button
        type="button"
        onClick={handleClick}
        className={isSelected ? styles.selected : undefined}
      >
        {name} - {email}
      </button>
    </li>
  );
}
