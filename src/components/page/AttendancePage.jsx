import attendanceOption from "../../attendanceOption";
import StudentCalendarLayout from "../Layout/StudentCalendarLayout";

const AttendancePage = (props) => {
  return (
    <>
      <StudentCalendarLayout
        isSubject={props.isSubject}
        selectOption={attendanceOption}
        students={props.students}
        userUid={props.userUid}
      />
      {/* <ExampleModal imgSrc={attendanceGif} /> */}
    </>
  );
};

export default AttendancePage;
