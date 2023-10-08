import { type Person } from "../Types/Person";

const createShortName = ({ lastName }: Person): string => lastName;

export { createShortName };
