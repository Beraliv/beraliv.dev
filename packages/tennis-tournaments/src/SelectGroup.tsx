import { ParentComponent } from "solid-js";

import styles from "./SelectGroup.module.css";

const SelectGroup: ParentComponent = ({ children }) => (
  <div class={styles.SelectGroup}>{children}</div>
);

export { SelectGroup };
