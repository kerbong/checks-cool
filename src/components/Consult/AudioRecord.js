import React, { useState, useRef, useEffect } from "react";
import classes from "./AudioRecord.module.css";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const mimeType = "audio/webm";

const AudioRecord = (props) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioBlob, setAudioBlob] = useState([]);
  const [audio, setAudio] = useState(null);
  const [recordStartTime, setRecordStartTime] = useState(null);
  const [recordOnTime, setRecordOnTime] = useState("00:00");

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        Swal.fire(
          "에러!",
          `${err.message}, 문제가 지속되면 kerbong@gmail.com / 잼잼-이거해요 에 알려주세요!`,
          "warning"
        );
      }
    } else {
      alert(
        "현재 브라우저에서 실행이 불가능한 기능입니다! 크롬에서 실행해주세요!"
      );
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;

    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioBlob(audioBlob);
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  useEffect(() => {
    let interval;
    //녹음중이면.. 경과된 시간을 업데이트 해주기..
    if (recordingStatus === "recording") {
      //시작 시간을 세팅하고, 시간이 세팅되면.. 인터벌 함수를 실행함. 1초마다 현재시각 - 시작시각을 보여주는...?
      setRecordOnTime("00:00");
      let startTime;
      if (recordStartTime === null) {
        startTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
        setRecordStartTime(startTime);
      } else {
        startTime = recordStartTime;
      }

      interval = setInterval(() => {
        // 차이를 구해서 상태로 세팅함.

        let now = dayjs().format("YYYY-MM-DD HH:mm:ss");
        let gap_second = dayjs(now).diff(
          dayjs(startTime).format("YYYY-MM-DD HH:mm:ss"),
          "s"
        );

        let min = Math.floor(+gap_second / 60);
        let sec = Math.floor(+gap_second % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }

        setRecordOnTime(min + ":" + sec);
      }, 1000);
    } else if (recordingStatus === "inactive") {
      //녹음된 자료가 있으면..
      if (audio) {
        setRecordStartTime(null);
        clearInterval(interval);
        Swal.fire(
          "녹음 종료",
          `녹음이 종료되었습니다. 저장하시려면 [파일추가] 를 누르신 후, [저장]을 눌러주세요!`,
          "warning"
        );
        props.uploadAudio(audioBlob);
      }
    }

    return () => clearInterval(interval);
  }, [recordingStatus]);

  const remain_swal = (time) => {
    Swal.fire("시간 제한", `자동 종료까지 ${time}분 남았습니다.`, "info");
  };

  useEffect(() => {
    if (recordStartTime !== null) {
      if (recordOnTime === "05:00") {
        remain_swal(3);
      } else if (recordOnTime === "07:00") {
        remain_swal(1);
        //8분이 최대 녹음...
      } else if (recordOnTime === "08:00") {
        stopRecording();
      }
    }
  }, [recordOnTime]);

  const uploadAudio = () => {
    props.uploadAudio(audioBlob);
  };

  return (
    <>
      <div className={classes["audio-controls"]}>
        <div className={classes["audio-container"]}>
          <audio src={audio} controls className={classes["audio"]}></audio>
        </div>

        <div className={classes["audio-btns"]}>
          {recordOnTime}초{" "}
          {!permission ? (
            <button
              onClick={getMicrophonePermission}
              type="button"
              className={classes["downRecordFile"]}
            >
              <i className="fa-solid fa-microphone"></i> 마이크 권한
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button
              onClick={startRecording}
              type="button"
              className={classes["fileUploadBtn"]}
            >
              <i className="fa-solid fa-record-vinyl"></i>{" "}
              {audio ? "다시녹음" : "녹음"}
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button
              onClick={stopRecording}
              type="button"
              className={classes["fileUploadBtn"]}
            >
              <i className="fa-regular fa-circle-stop"></i> 중지
            </button>
          ) : null}
        </div>
        <div className={classes["audio-btns"]}>
          {audio && (
            <>
              <button
                onClick={uploadAudio}
                className={classes["addRecordFile"]}
              >
                파일 추가
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AudioRecord;
