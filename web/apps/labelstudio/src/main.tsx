// ========== 新增全局fetch强制携带Cookie，放在文件最开头 ==========
const originalFetch = window.fetch;
window.fetch = function(input, init) {
  const newInit = { ...(init || {}), credentials: "include" };
  return originalFetch(input, newInit);
};

import { registerAnalytics } from "@humansignal/core";
registerAnalytics();

import "./app/App";
import "./utils/service-worker";
import "./utils/state-registry-lso";