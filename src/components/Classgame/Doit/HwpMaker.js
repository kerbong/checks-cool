import React, { useEffect } from "react";
// import * as Webhwp from "./webhwp.js";

const HwpMaker = () => {
  function htmlToFile() {
    var header = "<html><head><meta charset='utf-8'></head><body>";
    var footer = "</body></html>";
    var sourceHTML =
      header +
      "<h1 style='text-align:center;'>제목</h1>\n<p>p 태그 내용 입니다.</p>\n<table border='1'>\n\t<th>테이블</th>\n\t<th>만들기</th>\n\t<tr>\n\t\t<td>첫번째줄 1</td>\n\t\t<td>첫번째줄 2</td>\n\t</tr>\n\t<tr>\n\t\t<td>두번째줄 1</td>\n\t\t<td>두번째줄 2</td>\n\t</tr>\n</table>" +
      footer;

    var source =
      "data:application/vnd.hwp; charset=utf-8," +
      encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    // 다운로드 되는 파일 이름
    fileDownload.download = "example.hwp";
    // 다운 받기
    fileDownload.click();
    document.body.removeChild(fileDownload);
  }
  return (
    <div>
      <button onClick={htmlToFile}>dd</button>
    </div>
  );
};

export default HwpMaker;
