import attendanceOption from "../../attendanceOption";
import AttendContext from "../../store/attend-context";
import StudentCalendarLayout from "../Layout/StudentCalendarLayout";

const AttendancePage = (props) => {
  return (
    <StudentCalendarLayout
      selectOption={attendanceOption}
      Context={AttendContext}
      students={props.students}
    />
  );
};

export default AttendancePage;
