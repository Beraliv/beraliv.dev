import styles from "./index.module.css";
import { BuyMeCoffeeIcon } from "../../atoms/BuyMeCoffeeIcon";

export const BuyMeCoffeeButton = () => (
  <a
    className={styles.buymecoffee}
    href="https://www.buymeacoffee.com/beraliv"
    target="_blank"
    rel="nofollow noopener noreferrer"
    tabIndex={-1}
  >
    <BuyMeCoffeeIcon />
  </a>
);
