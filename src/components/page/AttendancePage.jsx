import attendanceOption from "../../attendanceOption";
import AttendContext from "../../store/attend-context";
import StudentCalendarLayout from "../Layout/StudentCalendarLayout";
import ExampleModal from "./ExampleModal";
import attendanceGif from "../../assets/attendanceGif.gif";

const AttendancePage = (props) => {
  return (
    <>
      <StudentCalendarLayout
        selectOption={attendanceOption}
        Context={AttendContext}
        students={props.students}
        userUid={props.userUid}
      />
      {/* <ExampleModal imgSrc={attendanceGif} /> */}
    </>
  );
};

export default AttendancePage;
