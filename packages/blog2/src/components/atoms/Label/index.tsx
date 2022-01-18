import { classNames } from "../../../functions/classNames";
import styles from "./index.module.css";

interface LabelPropsType {
  selected?: boolean;
  title: string;
}

export const Label = ({ selected = false, title }: LabelPropsType) => (
  <a
    className={classNames(styles.label, {
      [styles.selected]: selected,
    })}
    href={selected ? `/search` : `/search?label=${title}`}
  >
    {title}
  </a>
);
