import React from "react"

const HTML = props => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      <script
        key="initial-dark-mode"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `;(function () {
            var STORAGE_KEY = "darkMode";
            var CLASSNAME = "dark";
          
            var INITIAL_DARK_MODE = (() => {
              try {
                var persistedDarkMode = localStorage.getItem(STORAGE_KEY);
                if (persistedDarkMode === null) {
                  return false;
                }
          
                return JSON.parse(persistedDarkMode);
              } catch (error) {
                return false;
              }
            })();
          
            document.body.classList.toggle(CLASSNAME, INITIAL_DARK_MODE);
          })()`,
        }}
      />
      {props.preBodyComponents}
      <div
        key={`body`}
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
    </body>
  </html>
)

export default HTML
