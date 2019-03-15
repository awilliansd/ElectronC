const path = require("path");
const url = require("url");
const { ConnectionBuilder } = require("electron-cgi");

import { app, BrowserWindow } from "electron";

let window: BrowserWindow | null;

const createWindow = () => {
  window = new BrowserWindow({ width: 800, height: 600 });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    }),
  );

  window.on("closed", () => {
    window = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});

const connection = new ConnectionBuilder()
  .connectTo("dotnet", "run", "--project", "./core")
  .build();

connection.onDisconnect = () => {
  console.log("lost");
};

connection.send("greeting", " TTTeesstttt", (response: any) => {
  window.webContents.send("greeting", response);
  connection.close();
});
