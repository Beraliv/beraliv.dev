import { type Person } from "../Types/Person";

const createShortName = ({ firstName, lastName }: Person): string =>
  `${firstName[0]}. ${lastName}`;

export { createShortName };
