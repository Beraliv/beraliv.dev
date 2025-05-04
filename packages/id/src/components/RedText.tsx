interface RedTextProps {
  children?: JSX.Element;
}

export const RedText = ({ children }: RedTextProps) => (
  <span className="redText">{children}</span>
);
