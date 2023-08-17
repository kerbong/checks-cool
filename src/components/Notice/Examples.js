import React, { useState } from "react";
import ExampleModal from "components/page/ExampleModal";
const Examples = (props) => {
  const [showExample, setShowExample] = useState(false);
  const [examImg, setExamImg] = useState("");
  return (
    <div>
      {" "}
      {/* 움짤 보여주는 팝업창 */}
      {showExample && (
        <ExampleModal
          onClose={() => {
            setShowExample(false);
          }}
          imgSrc={examImg}
        />
      )}
    </div>
  );
};

export default Examples;
