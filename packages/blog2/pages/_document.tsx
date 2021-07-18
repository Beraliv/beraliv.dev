import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

const GOOGLE_ANALYTICS_TRACKING_ID = 'UA-191938568-1';

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
          <link rel="preconnect dns-prefetch" href="https://www.google-analytics.com" />
          <script type="text/javascript" async src="https://www.google-analytics.com/analytics.js" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer && window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_TRACKING_ID}', {"send_page_view":false});
              `
            }}
          />
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
