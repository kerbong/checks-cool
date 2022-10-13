import React from "react";
import Swal from "sweetalert2";

const SwalSaveFail = (props) => {
  Swal.fire({
    icon: "success",
    title: "저장되었어요!",
    text: props.text,
    confirmButtonText: "확인",
    confirmButtonColor: "#85bd82",
    timer: 5000,
  });
};

export default SwalSaveFail;
