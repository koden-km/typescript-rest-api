import { useCallback } from "react";
import styles from "./Create.module.css";
import SubmitButton from "../../components/SubmitButton";
import LabeledTextInput from "../../components/LabeledTextInput";
import { createUser } from "../api";

interface Props {
  setShouldFetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Create(props: Props) {
  const { setShouldFetchUsers } = props;

  const handleSubmit = useCallback(
    (formData: FormData) => {
      const errors: string[] = [];
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;

      const isNameValidLength = name.trim().length >= 1;
      const isEmailValidLength = email.trim().length >= 3;
      const isEmailValidFormat = email.includes("@");

      if (!isNameValidLength) {
        errors.push("- 'name' is invalid length!");
      }
      if (!isEmailValidLength) {
        errors.push("- 'email' is invalid length!");
      }
      if (!isEmailValidFormat) {
        errors.push("- 'email' is invalid format (eg. missing '@')!");
      }

      if (errors.length > 0) {
        console.warn("form data errors!\n" + errors.join("\n"));
        return;
      }

      console.log("creating user via api!");
      createUser(
        { name: name.trim(), email: email.trim() },
        (user) => {
          console.log("api create user success!", user);
          setShouldFetchUsers(true);
        },
        (err) => {
          console.error("api create user error!", err);
        }
      );
    },
    [setShouldFetchUsers]
  );

  return (
    <div className={styles.container}>
      <form action={handleSubmit}>
        <LabeledTextInput
          label="Name:"
          name="name"
          className={styles.textInput}
        />
        <LabeledTextInput
          label="Email:"
          name="email"
          className={styles.textInput}
        />
        <SubmitButton className={styles.button}>Submit</SubmitButton>
      </form>
    </div>
  );
}
