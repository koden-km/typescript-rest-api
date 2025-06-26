import Button, { type Props } from "./Button";

export default function SubmitButton(props: Props) {
  return <Button {...props} type="submit" />;
}
