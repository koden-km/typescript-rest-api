import { useMemo } from "react";
import styles from "./List.module.css";
import Entry from "./components/Entry";
import { type UserModel } from "../models";

interface Props {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  users: UserModel[];
}

export default function List(props: Props) {
  const { selected, setSelected, users } = props;

  const list = useMemo(() => {
    return users.map((user) => (
      <Entry
        key={user.id}
        isSelected={selected === user.id}
        setSelected={setSelected}
        user={user}
      />
    ));
  }, [selected, setSelected, users]);

  const hasUsers = list.length > 0;

  return (
    <div className={styles.container}>
      {!hasUsers && <p>No users</p>}
      {hasUsers && <ul>{list}</ul>}
    </div>
  );
}
