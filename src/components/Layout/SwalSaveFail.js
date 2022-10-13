import Swal from "sweetalert2";

const SwalSaveFail = (props) => {
  return Swal.fire({
    icon: "error",
    title: "저장에 실패했어요!",
    html: props.text,
    confirmButtonText: "확인",
    confirmButtonColor: "#85bd82",
  });
};

export default SwalSaveFail;
