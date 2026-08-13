import { createElement } from "react";
import { createRoot } from "react-dom/client";

import ProfilePage from "./pages/ProfilePage";

createRoot(document.getElementById("root")).render(
  createElement(ProfilePage)
);