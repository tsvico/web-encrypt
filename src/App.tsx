import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Encoding from './Encoding';
import Hashing from './Hashing';
import Header from './Header';


export const apps = [
  {
    link: "/encoding",
    title: "Encoding",
    description: "在几种编码之间互相转换",
    component: <Encoding />,
  },
  {
    link: "/hashing",
    title: "Hashing",
    description: "计算文本的哈希值",
    component: <Hashing />
  },
]

export const App = () => (
  <div style={{ textAlign: "center" }}>
    <BrowserRouter>
    <Switch>
      {apps.map(app => (
        <Route key={app.link} path={app.link}>
          <Header title={app.title} />{app.component}
        </Route>
      ))}
      <Route exact path="/">
        <Header title="Index" />
      </Route>
    </Switch>
    </BrowserRouter>
  </div>
)

export default App;
