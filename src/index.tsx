import 'mobx-react-lite/batchingForReactDom';
import * as React from "react";
import { render } from "react-dom";
import App from "./App";


const rootElement = document.getElementById("root");
render(<App />, rootElement);
