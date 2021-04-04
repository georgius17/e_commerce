import * as React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { CzechResourcesDictionary } from "Translations/CzechResourcesDictionary";
import { Routes } from "Routes/Routes";
import { Layout } from "Components/Layout/Layout";
import { Provider } from "react-redux";
import { useApplicationStore } from "State/Store";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalErrorHandler } from "Components/Error/GlobalErrorHandler";
import { resetUser } from "State/Auth/AuthReducer";
import { configureApiCalls } from "Api/Api";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      cs: CzechResourcesDictionary,
    },
    lng: "cs",
    fallbackLng: "cs",

    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  const appStore = useApplicationStore();
  configureApiCalls({
    jwtKey: "jwtToken",
    onResponse: r => {
      if (r.status === 401) {
        appStore.store.dispatch(resetUser());
      }
    },
  });

  return (
    <Provider store={appStore.store}>
      <PersistGate loading={null} persistor={appStore.persistor}>
        <GlobalErrorHandler>
          <Layout>
            <Routes />
          </Layout>
        </GlobalErrorHandler>
      </PersistGate>
    </Provider>
  );
}

export default App;
