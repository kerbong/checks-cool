import attendanceOption from "../../attendanceOption";
import StudentCalendarLayout from "../Layout/StudentCalendarLayout";
import ExampleModal from "./ExampleModal";

const AttendancePage = (props) => {
  return (
    <>
      <StudentCalendarLayout
        selectOption={attendanceOption}
        students={props.students}
        userUid={props.userUid}
      />
      {/* <ExampleModal imgSrc={attendanceGif} /> */}
    </>
  );
};

export default AttendancePage;
