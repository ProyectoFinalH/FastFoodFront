import React, { useState, useEffect } from "react";
import "./Notification.css";

function Notification({ message }) {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`notification ${showNotification ? "show" : ""}`}>
      <div className="notification-content">
        <div className="fastfood-logo">
          <span className="fast">Fast</span>
          <span className="food">Food</span>
        </div>
        <div className="loading-spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Notification;
