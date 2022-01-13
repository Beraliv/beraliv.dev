import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class ExtendedDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@700;900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="preconnect dns-prefetch"
            href="https://www.google-analytics.com"
          />
          <script
            defer
            data-api="/stats/api/event"
            data-domain="blog.beraliv.dev"
            src="/stats/js/script.js"
          ></script>
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `;(function () {
                var STORAGE_KEY = "dark"
                var CLASSNAME = "dark"
              
                var INITIAL_DARK_MODE = (() => {
                  try {
                    var persistedDarkMode = localStorage.getItem(STORAGE_KEY)
                    if (persistedDarkMode === null) {
                      return false
                    }
              
                    return JSON.parse(persistedDarkMode)
                  } catch (error) {
                    return false
                  }
                })()
              
                document.body.classList.toggle(CLASSNAME, INITIAL_DARK_MODE)
              })();`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ExtendedDocument;
