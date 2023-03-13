import React, { useCallback, useEffect, useState, useRef } from "react";
import { authService } from "../../fbase";
import Button from "./Button";
import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const HeaderProfileBtn = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scaleValue, setScaleValue] = useState(1);
  const [isNotificationPermission, setNotificationPermission] = useState(false);
  const [permissionChanged, setPermissionChanged] = useState(false);
  const toggleRef = useRef();

  useEffect(() => {
    if (showDropdown) {
      setScaleValue(document.body.style.zoom);
    }
  }, [showDropdown]);

  //드롭다운 후 4초 후에 해당 버튼이 클릭되거나 메뉴를 누르지 않아 상태 변경이 되지 않은 경우 상태 변경하기

  useEffect(() => {
    let timerId;
    if (showDropdown) {
      timerId = setTimeout(() => {
        setShowDropdown(false);
      }, 4000);
    }
    // 언마운트 되면 큐에 있던 셋타임아웃 지우기
    return () => clearTimeout(timerId);
  }, [showDropdown]);

  const logOutHandler = (e) => {
    authService.signOut();
    props.logOutHandler();
    setShowDropdown(false);
  };

  let navigate = useNavigate();

  const dropdownHandler = () => {
    setShowDropdown((prev) => !prev);
  };

  const fontSizeHandler = (isPlus) => {
    let new_scaleValue = scaleValue;
    if (isPlus) {
      new_scaleValue *= 1.2;
      if (new_scaleValue > 1) {
        new_scaleValue = 1;
      }
    } else {
      new_scaleValue /= 1.2;
      if (new_scaleValue < 0.55) {
        new_scaleValue = 0.555;
      }
    }
    if (new_scaleValue === scaleValue) {
      return;
    }
    setScaleValue(new_scaleValue);
  };

  useEffect(() => {
    document.body.style.zoom = scaleValue;
  }, [scaleValue]);

  //푸시알림 허용 관련 함수
  const askNotificationPermission = () => {
    //브라우저 별 함수가 달라서 requestPermission이 promise 로 then을 갖는지 확인하는 함수
    function checkNotificationPromise() {
      try {
        Notification.requestPermission().then();
      } catch (e) {
        return false;
      }

      return true;
    }
    // 권한을 실제로 요구하는 함수
    function handlePermission(permission) {
      // 사용자의 응답에 관계 없이 크롬이 정보를 저장할 수 있도록 함
      if (!("permission" in Notification)) {
        Notification.permission = permission;
      }

      // 사용자 응답에 따라 단추를 보이거나 숨기도록 설정
      if (
        Notification.permission === "denied" ||
        Notification.permission === "default"
      ) {
        // console.log("푸시알림 거절");
        setNotificationPermission(false);
      } else {
        // console.log("푸시알림 승인");
        setNotificationPermission(true);
      }
    }

    // 브라우저가 알림을 지원하는지 확인
    if (!("Notification" in window)) {
      console.log("이 브라우저는 알림을 지원하지 않습니다.");
    } else {
      if (checkNotificationPromise()) {
        Notification.requestPermission().then((permission) => {
          handlePermission(permission);
        });
      } else {
        Notification.requestPermission(function (permission) {
          handlePermission(permission);
        });
      }
    }
  };

  useEffect(() => {
    askNotificationPermission();
  }, []);

  useEffect(() => {
    if (permissionChanged) {
    }
  }, [permissionChanged]);

  return (
    <>
      <Button
        onclick={props.isLoggedIn && dropdownHandler}
        icon={
          props.isLoggedIn ? (
            <i className="fa-solid fa-user"></i>
          ) : (
            <i className="fa-regular fa-user"></i>
          )
        }
        name={props.isLoggedIn ? "On" : "-"}
        className="header-logInOut"
      />
      {permissionChanged && (
        <Modal onClose={() => setPermissionChanged(false)}>
          {isNotificationPermission ? (
            <span>
              푸시 알림을 받고 싶지 않으시면 메뉴바 - [공지사항] - [푸시알림
              설정] 내용을 확인하시고 조치를 취해주세요!{" "}
            </span>
          ) : (
            <span>
              푸시 알림을 받고 싶으시면 메뉴바 - [공지사항] - [푸시알림 설정]
              내용을 확인하고 조치를 취해주세요!{" "}
            </span>
          )}
        </Modal>
      )}

      {props.isLoggedIn && (
        <ul
          className={`
            ${
              classes[
                showDropdown
                  ? "profile-dropdown-div"
                  : "profile-dropdown-div-hide"
              ]
            } 
            ${
              classes[
                props.menuOnHead
                  ? "profile-dropdown-ul"
                  : "profile-dropdown-ul-bottom"
              ]
            }`}
        >
          {/* email의 4번째 자리부터 *로 표시 */}
          <li
            className={classes["profile-dropdown-li-nonehover"]}
            onClick={() => {
              navigate(`/manageStudent`);
            }}
          >
            {props.user.email.slice(0, 4) +
              props.user.email.split("@")[0].slice(4).replace(/./g, "*")}
          </li>

          {/* <li className={classes["profile-dropdown-li-nonehover"]}>
            푸시알림
            <input type="checkbox" id="toggle" hidden />
            <label
              htmlFor="toggle"
              className={
                isNotificationPermission
                  ? `${classes["toggleSwitch"]} ${classes["active"]}`
                  : `${classes["toggleSwitch"]}`
              }
              onClick={() => {
                setPermissionChanged(true);
              }}
              ref={toggleRef}
            >
              <span className={classes["toggleButton"]}></span>
            </label>
          </li> */}
          <li
            className={classes["profile-dropdown-li"]}
            onClick={() => {
              navigate(`/${"notice"}`);
              setShowDropdown(false);
            }}
          >
            공지사항
          </li>
          <li
            className={classes["profile-dropdown-li"]}
            onClick={() => {
              navigate(`/${"profile"}`);
              setShowDropdown(false);
            }}
          >
            프로필 수정
          </li>
          <li
            className={classes["profile-dropdown-li"]}
            onClick={() => {
              props.setMenuHandler();
              setShowDropdown(false);
            }}
          >
            메뉴바 위치변경
          </li>

          {!/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent) && (
            <li>
              <span
                className={classes["profile-dropdown-li"]}
                onClick={() => fontSizeHandler(true)}
              >
                <i className="fa-solid fa-magnifying-glass-plus"></i>
              </span>{" "}
              /{" "}
              <span
                className={classes["profile-dropdown-li"]}
                onClick={() => fontSizeHandler(false)}
              >
                <i className="fa-solid fa-magnifying-glass-minus"></i>
              </span>
            </li>
          )}

          <li
            className={classes["profile-dropdown-li"]}
            onClick={logOutHandler}
          >
            로그아웃
          </li>
        </ul>
      )}
    </>
  );
};

export default HeaderProfileBtn;
