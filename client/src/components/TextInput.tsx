interface Props {
  className?: string;
  disabled?: boolean;
  inputClassName?: string;
  name?: string;
}

export default function TextInput(props: Props) {
  const { className, disabled = false, inputClassName, name } = props;

  return (
    <div className={className}>
      <input
        type="text"
        name={name}
        className={inputClassName}
        disabled={disabled}
      />
    </div>
  );
}
