import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "../../fbase";

const Notification = (props) => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  requestForToken().then((token) => {
    console.log(token);
  });

  //   useEffect(() => {
  //     const getFcmToken = async () => {
  //       return await requestForToken();
  //     };
  //     const userFcmToken = getFcmToken();
  //     console.log(userFcmToken);
  //   }, []);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return <Toaster position="top-right" />;
};

export default Notification;
