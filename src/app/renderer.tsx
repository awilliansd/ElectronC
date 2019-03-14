import * as React from "react";
import * as ReactDOM from "react-dom";
import {Dashboard} from "./components/Dashboard";

const element = (<Dashboard />);

ReactDOM.render(element, document.getElementById('renderer'));