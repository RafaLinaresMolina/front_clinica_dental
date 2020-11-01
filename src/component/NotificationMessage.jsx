import React from "react";
import { connect } from "react-redux";
import {
  CLEAR_NOTIFICATION_WARNING,
  CLEAR_NOTIFICATION_ERROR,
  CLEAR_NOTIFICATION_SUCCESS,
  CLEAR_NOTIFICATION_INFO,
} from "../redux/types";
import "./CustomNotification.scss";

const NotificationMessage = (props) => {

  const stateClearType = {
    warning: CLEAR_NOTIFICATION_WARNING,
    error: CLEAR_NOTIFICATION_ERROR,
    success: CLEAR_NOTIFICATION_SUCCESS,
    info: CLEAR_NOTIFICATION_INFO,
  };

  const getIcon = (type) =>{
    const icons = {
      error: "❌",
      warning: "❗",
      success: "✅",
      info: "🏷",
    }
    return icons[type]
  }

  const clearNotification = (props) => {
    if(props.showNotification)
      setTimeout(() => {
        props.dispatch({ type: stateClearType[props.type], payload: {notification: {}, show: false} });
      }, 6000);
    };

  return (
    <div className={`notification-body ${props.type}Toast ${props.showNotification
        ? "notification-display-block"
        : "notification-display-none"}`}
    >
      <div className="notification-icon">
        <span role="img" aria-label={`${props.type} icon`}>
          {getIcon(props.type)}
        </span>
      </div>
      <div className="notification-message">
        <span className="notification-title">{props.notification.title}</span>
        <span>{props.notification.msg}</span>
        {clearNotification(props)}
      </div>
    </div>
  );
}



export default connect()(NotificationMessage);
