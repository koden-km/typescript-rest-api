import TextInput from "./TextInput";

interface Props {
  className?: string;
  disabled?: boolean;
  inputClassName?: string;
  label: string;
  name: string;
}

export default function LabeledTextInput(props: Props) {
  const { className, disabled = false, inputClassName, label, name } = props;

  return (
    <div className={className}>
      <label>
        <div>{label}</div>
        <TextInput
          name={name}
          inputClassName={inputClassName}
          disabled={disabled}
        />
      </label>
    </div>
  );
}
