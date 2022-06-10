import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './components/App/App';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.querySelector("#root")).render(<React.StrictMode>
  <App />
  {/* <Header />
  <Main />
  <Footer /> */}
</React.StrictMode>);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
