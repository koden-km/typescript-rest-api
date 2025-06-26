interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Panel(props: Props) {
  const { className, children } = props;

  return <span className={className}>{children}</span>;
}
