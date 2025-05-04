interface DropCapProps {
  children?: JSX.Element;
}

export const DropCap = ({ children }: DropCapProps) => (
  <span className="dropCap">{children}</span>
);
