import { RenderBodyArgs } from "gatsby"
import { INITIAL_DARK_MODE } from "../src/hooks/useDarkMode"

export const onRenderBody = ({ setBodyAttributes }: RenderBodyArgs) => {
  if (INITIAL_DARK_MODE) {
    setBodyAttributes({
      className: "dark",
    })
  }
}
