import "mobx-react-lite/batchingForReactDom";
import * as React from "react";
// @ts-ignore - types arent available for this yet.
import { createRoot } from "react-dom";
import App from "./App";
import "./root.styles.css";

createRoot(document.getElementById("root")).render(<App />);
