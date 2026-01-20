import { jsx } from "react/jsx-runtime";
import { ViteReactSSG } from "vite-react-ssg";
import "react";
import { Outlet } from "react-router-dom";
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const routes = [{ path: "/", element: /* @__PURE__ */ jsx("div", { children: "Test" }) }];
const createApp = ViteReactSSG(
  App,
  { routes },
  ({ app, router, routes: routes2, isClient, initialState }) => {
  }
);
export {
  createApp
};
