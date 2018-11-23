import * as React from "react";
import * as ReactDOM from "react-dom";

import { App, AppProps } from "./components/app";

const todos: AppProps = {
  items: [
    {id: "-1", title: "title -1", done: false },
    {id: "-2", title: "title -2", done: false },
    {id: "-3", title: "title -3", done: false },
  ]
}

ReactDOM.render(
  <App {...todos}></App>,
  document.getElementById("example")
);
