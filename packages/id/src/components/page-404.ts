import { footer } from "./footer";
import { header } from "./header";

const mainContent = `<h1>404</h1><p>Page not found.</p>`;

export const page404 = `
	<div class="layout">
		${header}
		${mainContent}
		${footer}
	</div>
`;
