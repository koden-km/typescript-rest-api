import { useState } from "react";
import { useFetchUsers } from "./hooks.ts";
import styles from "./Users.module.css";
import Panel from "../components/Panel";
import Create from "./create/Create";
import Details from "./details/Details";
import List from "./list/List";
import type { UserModel } from "./models.ts";

export default function Users() {
  const [shouldFetchUsers, setShouldFetchUsers] = useState(true);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [selected, setSelected] = useState(0);
  useFetchUsers(shouldFetchUsers, setShouldFetchUsers, setUsers);

  const selectedUser = users.find(({ id }) => id === selected);

  return (
    <div>
      <h1>Users</h1>

      <div className={styles.panels}>
        <Panel>
          <h2>Create</h2>
          <Create setShouldFetchUsers={setShouldFetchUsers} />
        </Panel>

        <Panel>
          <h2>List</h2>
          <List selected={selected} setSelected={setSelected} users={users} />
        </Panel>

        <Panel>
          <h2>Details</h2>
          {selectedUser && (
            <Details
              user={selectedUser}
              setShouldFetchUsers={setShouldFetchUsers}
            />
          )}
          {!selectedUser && <p>Select a user to view details</p>}
        </Panel>
      </div>
    </div>
  );
}
