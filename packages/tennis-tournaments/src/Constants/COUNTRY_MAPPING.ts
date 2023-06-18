import UnitedStatesOfAmericaIcon from "../Icons/USA.svg";
import SpainIcon from "../Icons/Spain.svg";

// TODO: move it to CDN, e.g. Cloudflare, and remove
const COUNTRY_MAPPING: Record<string, string> = {
  USA: UnitedStatesOfAmericaIcon,
  Spain: SpainIcon,
};

export { COUNTRY_MAPPING };
