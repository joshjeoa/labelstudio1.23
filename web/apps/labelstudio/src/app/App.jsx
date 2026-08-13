/* global Sentry */

import setupI18n from '../i18n';
import { createBrowserHistory } from "history";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import { LEAVE_BLOCKER_KEY, leaveBlockerCallback } from "../components/LeaveBlocker/LeaveBlocker";
import { initSentry } from "../config/Sentry";
import { ApiProvider, useAPI } from "../providers/ApiProvider";
import { AppStoreProvider } from "../providers/AppStoreProvider";
import { ConfigProvider } from "../providers/ConfigProvider";
import { MultiProvider } from "../providers/MultiProvider";
import { ProjectProvider } from "../providers/ProjectProvider";
import { RoutesProvider } from "../providers/RoutesProvider";
import { DRAFT_GUARD_KEY, DraftGuard, draftGuardCallback } from "../components/DraftGuard/DraftGuard";
import { AsyncPage } from "./AsyncPage/AsyncPage";
import ErrorBoundary from "./ErrorBoundary";
import { FF_UNSAVED_CHANGES, isFF } from "../utils/feature-flags";
import { TourProvider } from "@humansignal/core";
import { ToastProvider, ToastViewport } from "@humansignal/ui";
import { JotaiProvider, JotaiStore } from "../utils/jotai-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@humansignal/core/lib/utils/query-client";
import { RootPage } from "./RootPage";
import { ff } from "@humansignal/core";
import "@humansignal/ui/src/tailwind.css";
import "./App.scss";
import { AuthProvider } from "@humansignal/core/providers/AuthProvider";

// ✅ 移到顶层！函数外面
export const UNBLOCK_HISTORY_MESSAGE = "UNBLOCK_HISTORY";

async function bootstrap() {
  // 第一步初始化国际化，在所有渲染、sentry、路由之前执行，顺序正确
  await setupI18n();

  const baseURL = new URL(APP_SETTINGS.hostname || location.origin);

  const browserHistory = createBrowserHistory({
    basename: baseURL.pathname || "/",
    getUserConfirmation: (message, callback) => {
      browserHistory.isBlocking = true;
      const callbackWrapper = (result) => {
        browserHistory.isBlocking = false;
        callback(result);
        isFF(FF_UNSAVED_CHANGES) && window.postMessage({ source: "label-studio", payload: UNBLOCK_HISTORY_MESSAGE });
      };
      if (message === DRAFT_GUARD_KEY) {
        draftGuardCallback.current = callbackWrapper;
      } else if (isFF(FF_UNSAVED_CHANGES) && message === LEAVE_BLOCKER_KEY) {
        leaveBlockerCallback.current = callbackWrapper;
      } else {
        callbackWrapper(window.confirm(message));
      }
    },
  });

  window.LSH = browserHistory;

  initSentry(browserHistory);

  const App = ({ content }) => {
    return (
      <ErrorBoundary>
        <Router history={browserHistory}>
          <MultiProvider
            providers={[
              <QueryClientProvider client={queryClient} key="query" />,
              <JotaiProvider key="jotai" store={JotaiStore} />,
              <AuthProvider key="auth" />,
              <AppStoreProvider key="app-store" />,
              <ToastProvider key="toast" />,
              <ApiProvider key="api" />,
              <ConfigProvider key="config" />,
              <RoutesProvider key="rotes" />,
              <ProjectProvider key="project" />,
              ff.isActive(ff.FF_PRODUCT_TOUR) && <TourProvider useAPI={useAPI} />,
            ].filter(Boolean)}
          >
            <AsyncPage>
              <DraftGuard />
              <RootPage content={content.innerHTML} />
              <ToastViewport />
            </AsyncPage>
          </MultiProvider>
        </Router>
      </ErrorBoundary>
    );
  };

  const root = document.querySelector(".app-wrapper");
  const content = document.querySelector("#main-content");

  render(<App content={content.innerHTML} />, root);

  if (module?.hot) {
    module.hot.accept();
  }
}

// 执行启动函数
bootstrap();
