import { Footer } from "../Footer";
import { Header } from "../Header";
import { Link } from "../Link";
import { tsEnumToConstObjectAndTypeAlias } from "../../utils/tsEnumToConstObjectAndTypeAlias";

const handleInputChange = () => {
  const input = document.querySelector(".enum-input") as HTMLTextAreaElement;
  const output = document.querySelector(".enum-output") as HTMLTextAreaElement;

  output.value = tsEnumToConstObjectAndTypeAlias(input.value);
};

const MainContent = () => (
  <main>
    <header>
      <h1>Enum Converter</h1>

      <p>
        Converting enum to object and type alias in TypeScript using{" "}
        <Link
          href="https://github.com/itsdouges/typescript-transformer-handbook"
          text="TypeScript Transform API"
          external
        />
      </p>

      <h3>Input</h3>

      <textarea
        className="enum-input"
        autofocus
        rows={10}
        placeholder="Paste code example with enum here..."
        cols={50}
        value="enum Color {Red, Green, Blue}"
        onfocus={handleInputChange}
        oninput={handleInputChange}
      ></textarea>

      <h3>Output</h3>

      <textarea className="enum-output" rows={10} cols={50} readOnly></textarea>

      <Link
        href="https://github.com/Beraliv/beraliv.dev/blob/main/packages/id/src/utils/tsEnumToConstObjectAndTypeAlias.ts"
        text="View transformer source code"
        external
      />
    </header>
  </main>
);

export const EnumConverterSnippet = () => (
  <div className="layout">
    <Header />
    <MainContent />
    <Footer />
  </div>
);
