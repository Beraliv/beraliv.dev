import { ParentComponent } from "solid-js";

import styles from "./SelectGroup.module.css";
import { classNames } from "./Utils/classNames";

interface SelectGroupParameters {
  className?: string;
}

const SelectGroup: ParentComponent<SelectGroupParameters> = ({
  children,
  className,
}) => <div class={classNames(styles.SelectGroup, className)}>{children}</div>;

export { SelectGroup };
