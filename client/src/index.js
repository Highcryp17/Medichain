import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {
  RouterProvider,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import router from './router'
import ContextProvider from "./Contexts/ContextProvider"


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
