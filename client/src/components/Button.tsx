export interface Props {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  type?: "button" | "submit" | "reset";
}

const noOp = () => {};

export default function Button(props: Props) {
  const {
    className,
    children,
    disabled = false,
    type = "button",
    onClick = noOp,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}
