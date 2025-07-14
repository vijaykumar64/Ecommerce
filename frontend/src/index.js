import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from "@chakra-ui/react"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
   <BrowserRouter><ChakraProvider><App /></ChakraProvider></BrowserRouter>
   </Provider>
    
  </React.StrictMode>
);

reportWebVitals();
