import ClipboardJS from "clipboard";
import React, { FunctionComponent, MutableRefObject, useEffect, useRef } from 'react';
import { Link, NavLink } from "react-router-dom";
import { apps } from "./App";
import './Header.css';
import { sendNotification } from "./Notification";


let Header: FunctionComponent<{ title: string }> = ({ title }) => {
  let toggle = () => {
    let icon = document.querySelector(".menu .menu-icon .icon");
    if (icon) {
      icon.classList.toggle("right");
    }
    let menubar = document.querySelector(".menu .menubar");
    if (menubar) {
      menubar.classList.toggle("menu-hidden");
    }
    let background = document.querySelector(".menu .menu-background");
    if (background) {
      background.toggleAttribute("hidden");
    }
  }
  let clipboard: MutableRefObject<ClipboardJS | null> = useRef(null);
  useEffect(() => {
      clipboard.current  = (new ClipboardJS("#share",{
        text: ()=>{
          return window.location.href
        }
      }));
    clipboard.current?.on("success", event => {
      sendNotification("success", "成功将URL复制到剪贴板")
    })
    return () => {
      clipboard.current?.destroy()
    };
  });

  return (
    <header className="pure-u-1"
      style={{ position: "sticky", top: 0, zIndex: 9999, display: "flex", justifyContent: "space-between" }}>
      <span className="menu center">
        <div className="center menu-icon" onClick={toggle}>
          <svg className="icon right" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2026">
            <path d="M 915.17 234.67 c 24.73 0 44.79 -17.92 44.79 -40 s -20.06 -40 -44.79 -40 H 108.81 c -24.74 0
                            -44.81 17.91 -44.81 40 s 20.07 40 44.81 40 Z M 915.17 552 c 24.73 0 44.79 -17.93 44.79 -40 s -20.02
                            -40 -44.79 -40 H 460.81 c -24.74 0 -44.81 17.91 -44.81 40 s 20.07 40 44.81 40 Z M 70.33 498.18 a
                            18.73 18.73 0 0 0 -1.74 26.32 c 0.46 0.58 1.16 1.16 1.74 1.75 L 262.64 694 a 9.39 9.39 0 0 0 15.5
                            -7.11 V 337.08 a 9.34 9.34 0 0 0 -15.5 -7 Z M 108.81 789.33 c -24.74 0 -44.81 17.92 -44.81 40 s
                            20.07 40 44.81 40 H 915.17 c 24.73 0 44.79 -17.91 44.79 -40 s -20.06 -40 -44.79 -40 Z"
              fill="#999999" p-id="2027">
            </path>
          </svg>
        </div>
        <div className="menu-background" hidden onClick={toggle}></div>
        <div className="menubar menu-hidden">
          <div className="content">
            <div className="menubar-header logo" style={{ lineHeight: "2.2" }}>
              <Link to="/tool">Tools</Link>
            </div>
            <div className="pure-menu">
              <ul className="pure-menu-list">
                {apps.map(app => (
                  <li key={app.link} className="pure-menu-item">
                    <NavLink to={app.link} className="pure-menu-link" activeClassName="menu-selected">
                      <span className="menu-item-name">{app.title}</span>
                      <span className="menu-item-description">{app.description}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer" style={{ padding: "3em", fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
            二改自<a href="https://pixiv.app/encoding" rel="noreferrer" target="_blank">@abersheeran</a>
          </div>
        </div>
      </span>

      <span className="logo">{title}</span>

      <span className="avatar center" id="share" title="分享">
        <div className="center" style={{ height: "1.6em" }}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1213" ><path d="M860.2 673.4c-66.8 0-121.4 35.8-146.8 91.3L390.6 627.3c18.8-29.2 29.2-64.9 29.2-103.5 0-16-1.9-32-5.6-47l206.1-160c27.3 20.7 62.1 32.9 100.7 32.9 93.2 0 162.8-69.6 162.8-161.8S814 26 720.9 26 559 95.6 559 187.8c0 23.5 4.7 45.2 12.2 64l-190 145.9c-37.6-56.5-99.7-96-170.3-96C95.2 301.7 2 394.8 2 510.6s93.2 208.9 208.9 208.9c43.3 0 83.7-11.3 116.7-32l370.7 158.1C703 933.1 770.8 998 860.2 998c93.2 0 161.8-69.6 161.8-161.8s-69.6-162.8-161.8-162.8zM720.9 93.7c46.1 0 93.2 34.8 93.2 93.2s-34.8 93.2-93.2 93.2-93.2-46.1-93.2-93.2 47.1-93.2 93.2-93.2z m-510 556.2c-69.6 0-128-58.3-128-128s58.3-128 128-128 128 58.3 128 128c-1 69.6-58.4 127.9-128 128z m649.3 278.5c-58.3 0-93.2-34.8-93.2-93.2s46.1-93.2 93.2-93.2c47 0 93.2 34.8 93.2 93.2-1 58.4-35.8 93.2-93.2 93.2z" p-id="1214"></path></svg>
        </div>
      </span>
    </header>
  );
}

export default Header;
