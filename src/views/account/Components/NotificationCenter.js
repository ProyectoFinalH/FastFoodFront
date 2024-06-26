import React from "react";
import "./notificationCenter.css";

function NotificationCenter() {
  return (
    <div className="notification-center">
      <h2>Centro de notificaciones</h2>
      <div className="notification-option">
        <input type="checkbox" id="sms" name="sms" />
        <label htmlFor="sms">SMS</label>
      </div>
      <div className="notification-option">
        <input type="checkbox" id="email" name="email" />
        <label htmlFor="email">Correos electrónicos</label>
      </div>
      <div className="notification-option">
        <input type="checkbox" id="push" name="push" />
        <label htmlFor="push">Notificaciones push</label>
      </div>
      <button className="save-button">Guardar</button>
    </div>
  );
}

export default NotificationCenter;
