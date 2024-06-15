import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "src/redux/index";

import "../resources/global.css";
import "../resources/font-awesome6pro/css/all.min.css";
import "antd/dist/reset.css";
import { useRouter } from "next/router";
import viVN from "antd/locale/vi_VN";
import { ConfigProvider } from "antd";
import "dayjs/locale/vi";
import MainLayout from "@layouts/main";


function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const PAGES_NO_LAYOUT_ADMIN = ["/login", "/404"];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Admin</title>

        {/* CSS custom */}
      </Head>

      <Provider store={store}>
        <ConfigProvider locale={viVN}>
          {PAGES_NO_LAYOUT_ADMIN.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <MainLayout menuCollapsed={false}>
              <Component {...pageProps} />
            </MainLayout>
          )}
        </ConfigProvider>
      </Provider>
    </>
  );
}

export default App;
