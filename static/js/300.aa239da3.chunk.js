"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[300],{571:function(A,e,n){n.d(e,{Z:function(){return c}});n(7313);var t=n(3451),s="ExampleModal_xmark__aUZiP",a="ExampleModal_img-div__6WVX9",i="ExampleModal_img__oJEG0",l=n(6417),c=function(A){return(0,l.jsxs)(t.Z,{onClose:A.onClose,children:[(0,l.jsx)("span",{onClick:A.onClose,className:s,children:(0,l.jsx)("i",{className:"fa-regular fa-circle-xmark"})}),(0,l.jsx)("div",{children:A.title}),(0,l.jsx)("hr",{style:{margin:"20px 15px"}}),(0,l.jsx)("div",{className:a,children:A.imgSrc&&(0,l.jsx)("img",{src:A.imgSrc,className:i,alt:"exampleGif"})}),(0,l.jsx)("div",{children:A.text}),(0,l.jsx)("div",{children:A.bottomText})]})}},5823:function(A,e,n){n.r(e),n.d(e,{default:function(){return P}});var t=n(4942),s=n(4165),a=n(1413),i=n(5861),l=n(2982),c=n(885),r=n(7313),o=n(7692),u={inputArea:"TypingStudent_inputArea__KGHVK","input-name":"TypingStudent_input-name__7Wd6Q","input-num":"TypingStudent_input-num__HM57y",studentListArea:"TypingStudent_studentListArea__vNcZk",addStudentInputs:"TypingStudent_addStudentInputs__iw77U","span-highlight":"TypingStudent_span-highlight__mYdrT",hr:"TypingStudent_hr__7Y3yJ","span-explain":"TypingStudent_span-explain__TYmbn","span-title":"TypingStudent_span-title__qnFjg","div-explain":"TypingStudent_div-explain__0FOVu",genderExample:"TypingStudent_genderExample__y9EK8","deleteAll-div":"TypingStudent_deleteAll-div__QG+t4","class-select":"TypingStudent_class-select__Hj8hH",studentBgColorInfo:"TypingStudent_studentBgColorInfo__jt9xq"},d="StudentLiWithDelete_inputStudentLi__1xkN1",m="StudentLiWithDelete_studentNumName__hwai1",f="StudentLiWithDelete_span-expain__KfjZF",x="StudentLiWithDelete_image-upload-btn__ytRIT",p="StudentLiWithDelete_span-highlight__vEjj1",h="StudentLiWithDelete_studentListArea__y6roQ",g="StudentLiWithDelete_span-small__lyx66",j="StudentLiWithDelete_hr__LcYoE",v="StudentLiWithDelete_excelUploadArea__HhpRJ",B="StudentLiWithDelete_exampleImg__Tj62-",S="StudentLiWithDelete_example__gQu1o",F="StudentLiWithDelete_excelUploadTop__5VVml",b="StudentLiWithDelete_accent__USa2r",y="StudentLiWithDelete_excelfileUploadBtn__i2u8I",N="StudentLiWithDelete_excelfileUploadBtnUploaded__GKz3s",I="StudentLiWithDelete_a-link__gOfnt",k="StudentLiWithDelete_span-title__YL5H9",U="StudentLiWithDelete_explain__Ium3B",w="StudentLiWithDelete_womanBg__-rkC5",_="StudentLiWithDelete_btn-div__ADrYS",C=n(7114),Z=n.n(C),D=n(6417),R=function(A){return(0,D.jsxs)("li",{id:A.student.num,className:d,children:[(0,D.jsx)("span",{className:"".concat(m).concat(A.student.woman?" ".concat(w):" "),onClick:function(){var e=A.student.woman||!1;A.studentFixHandler({num:A.student.num,name:A.student.name,woman:!e})},children:A.student.num+" "+A.student.name}),(0,D.jsx)(o.Z,{className:"student-remove",name:(0,D.jsx)("i",{className:"fa-solid fa-minus"}),onclick:function(){var e;e=A.student,Z().fire({icon:"question",title:"\uc0ad\uc81c\ud560\uae4c\uc694?",text:'"'.concat(e.name,'" \ud559\uc0dd\uc815\ubcf4\ub97c \uc0ad\uc81c\ud560\uae4c\uc694?.'),showDenyButton:!0,confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#db100cf2",denyButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c"}).then((function(e){e.isConfirmed&&A.deleteStudentHandler(A.student)}))}})]},A.myKey)},E=function(A){var e,n,t=(0,r.useState)(1),s=(0,c.Z)(t,2),i=s[0],l=s[1],d=(0,r.useState)({}),m=(0,c.Z)(d,2),f=m[0],x=m[1],p=(0,r.useRef)(null),h=(0,r.useRef)(null),g=function(e){e.preventDefault();var n=p.current.value,t={num:n,name:h.current.value};Object.keys(f).length>0?t.woman=f.woman:t.woman=!1,console.log(t),A.setAddStudentsInfo(t),l(+n+1),p=i,h.current.value="",x({})};return(0,D.jsx)(D.Fragment,{children:(0,D.jsxs)("div",{className:u.addStudent,children:[(0,D.jsxs)("div",{className:u.addStudentInputs,children:[(0,D.jsx)("form",{onSubmit:g,children:(0,D.jsxs)("div",{className:u.inputArea,children:[(0,D.jsx)("input",{ref:p,className:u["input-num"],label:"inputData",type:"number",placeholder:"\ubc88\ud638",defaultValue:i,min:"1",step:"1",required:!0},i),(0,D.jsx)("input",{ref:h,className:u["input-name"],label:"inputData",type:"text",placeholder:"\uc774\ub984\uc744 \uc785\ub825\ud558\uc138\uc694.",defaultValue:"",autoFocus:!0,required:!0}),(0,D.jsx)(o.Z,{className:"student-add",name:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("i",{className:"fa-solid fa-plus"}),"/",(0,D.jsx)("i",{className:"fa-solid fa-pencil"})]}),onclick:g})]})}),!A.isSubject&&(0,D.jsx)(o.Z,{className:"student-save",name:(0,D.jsx)(D.Fragment,{children:(0,D.jsx)("i",{className:"fa-regular fa-floppy-disk"})}),onclick:function(){A.uploadStudentsInfo()}})]}),(0,D.jsxs)("p",{className:u.studentBgColorInfo,children:[" ",(0,D.jsx)("span",{className:u.genderExample,children:"\uc5ec"}),"\xa0\xa0\xa0\ub0a8\xa0\xa0\xa0| \uc131\ubcc4 \ubcc0\uacbd \ud83d\udc49 \ud559\uc0dd\uc774\ub984 \ud074\ub9ad, \uc800\uc7a5"]}),(0,D.jsx)("div",{className:u.studentListArea,children:null===(e=A.studentsInfo)||void 0===e?void 0:e.map((function(e){return(0,D.jsx)(R,{myKey:e.num+e.name,student:e,deleteStudentHandler:function(e){!function(e){A.deleteStudentHandler(e)}(e)},studentFixHandler:function(e){!function(e){p.current.value=e.num,h.current.value=e.name,x((0,a.Z)({},e)),A.studentGenderChange(e)}(e)}},e.num+e.name)}))}),(0,D.jsx)("div",{className:u["deleteAll-div"],children:0!==(null===(n=A.studentsInfo)||void 0===n?void 0:n.length)&&(0,D.jsx)(o.Z,{className:"student-save",name:(0,D.jsxs)(D.Fragment,{children:["\uc804\uccb4",(0,D.jsx)("i",{className:"fa-solid fa-trash-can"})]}),onclick:function(){Z().fire({icon:"question",title:"\uc0ad\uc81c\ud560\uae4c\uc694?",text:"\ud559\uc0dd\uc815\ubcf4\ub97c \ubaa8\ub450 \uc0ad\uc81c\ud560\uae4c\uc694?.",showDenyButton:!0,confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#db100cf2",denyButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c"}).then((function(e){e.isConfirmed&&A.deleteAllHandler()}))}})}),(0,D.jsxs)("div",{className:u.studentListArea,children:[(0,D.jsx)("hr",{className:u.hr}),(0,D.jsx)("div",{children:(0,D.jsx)("span",{className:u["span-title"],children:"\ud559\uc0dd \uc9c1\uc811 \uc785\ub825/\uc218\uc815"})}),(0,D.jsx)("hr",{className:u.hr}),(0,D.jsxs)("div",{className:u["div-explain"],children:[(0,D.jsxs)("span",{className:u["span-explain"],children:["* \ubc88\ud638\uc640 \uc774\ub984\uc744 \uc9c1\uc811 \uc785\ub825\ud558\uac70\ub098 ",(0,D.jsx)("br",{}),"\ud559\uc0dd\uc758 \uc774\ub984\uc744 \ub20c\ub7ec\uc11c \uc218\uc815\ud55c \ud6c4",(0,D.jsx)("br",{}),(0,D.jsx)("span",{className:u["span-highlight"],children:"\ucd94\uac00/\uc218\uc815 \ubc84\ud2bc"}),"\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694."]}),(0,D.jsxs)("span",{className:u["span-explain"],children:["* \ubaa8\ub4e0 \uc785\ub825/\uc218\uc815\uc774 \ub05d\ub098\uba74 \uaf2d!!!",(0,D.jsx)("br",{}),(0,D.jsxs)("span",{className:u["span-highlight"],children:[" ","\uc800\uc7a5\ubc84\ud2bc\uc73c\ub85c \ubc18\uc601"]}),"\ud574\uc8fc\uc138\uc694!"]})]}),(0,D.jsx)("hr",{className:u.hr}),(0,D.jsxs)("span",{className:u["span-explain"],children:["* \ud654\uba74 \uc67c\ucabd \uc0c1\ub2e8\uc758 \ubcf4\ub77c\uc0c9 [\ud559\uc0dd\ub4f1\ub85d] ",(0,D.jsx)("br",{}),"\ubc84\ud2bc\uc744 \ub204\ub974\uc2dc\uba74 \uc608\uc2dc\ub97c \ubcf4\uc2e4 \uc218 \uc788\uc5b4\uc694!",(0,D.jsx)("br",{})]}),(0,D.jsx)("hr",{className:u.hr})]})]})})},Q=n(573),K=n(650),W=n(8737),O=n.p+"static/media/excel_gender_example.f8ba40b1043a4a255572.jpg",M=function(A){var e,n=(0,r.useState)(!1),t=(0,c.Z)(n,2),s=t[0],i=t[1],u=(0,r.useRef)(null),d=A.isSubject?"<span class=".concat(b,">\ubc18\ubcc4 \uc2dc\ud2b8</span>\uc5d0 <span class=").concat(b,">\ubc88\ud638 \uc131\ubcc4 \uc774\ub984</span>\uc744 \uc785\ub825\ud55c<br/> \uc5d1\uc140\ud30c\uc77c\uc744 \uc5c5\ub85c\ub4dc \ud574\uc8fc\uc138\uc694"):"<span class=".concat(b,"> \ubc88\ud638, \uc131\ubcc4, \uc774\ub984</span>\uc774 \uc785\ub825\ub41c \uc5d1\uc140\ud30c\uc77c \ucd94\uac00"),m="<span class=".concat(b,">\uc800\uc7a5</span> \uc744 \ub204\ub974\uc2dc\uba74 \ubc18\uc601\ub429\ub2c8\ub2e4."),f="<span class=".concat(U,">   * \uc218\uc815\uc774 \ud544\uc694\ud558\uc2dc\uba74 \uc800\uc7a5\ud558\uc2e0 \ud6c4\uc5d0<br/> <b> [\uc9c1\uc811] </b>\uc744 \ud65c\uc6a9\ud574\uc8fc\uc138\uc694.<br />* \uacf5\uc720\ubb38\uc11c\uc5d0 \uc9c1\uc811 \uc791\uc131\ud558\uc9c0 \uc54a\ub3c4\ub85d \uc8fc\uc758\ud574\uc8fc\uc138\uc694.  <br />* pc \uc5c5\ub85c\ub4dc\uac00 \ud3b8\ub9ac\ud569\ub2c8\ub2e4! \ud83d\udc49 bit.ly/\uccb5\uc2a4\ucfe8 </span>");return(0,D.jsxs)("div",{className:v,children:[(0,D.jsxs)("div",{className:F,children:[(0,D.jsxs)("label",{id:"excelFileLabel",htmlFor:"excelFile",className:"".concat(s?N:y),children:["\uc5d1\uc140\ud30c\uc77c \uc5c5\ub85c\ub4dc ",(0,D.jsx)("i",{className:"fa-regular fa-file-excel"})]}),(0,D.jsx)("input",{type:"file",id:"excelFile",ref:u,onChange:function(e){!function(e){var n=e.target;if(void 0!==n.files[0]){var t=new FileReader;t.onload=function(){try{var e=t.result,n=(0,W.ij)(e,{type:"binary"});if(A.isSubject){var s=[];n.SheetNames.forEach((function(A){var e={},t=W.P6.sheet_to_json(n.Sheets[A]),i=null===t||void 0===t?void 0:t.map((function(A){return{num:String(A["\ubc88\ud638"]),name:String(A["\uc774\ub984"]||A["\uc131\uba85"]),woman:"\ub0a8"!==String(A["\uc131\ubcc4"])}})),c=!1;i.forEach((function(A){void 0!==A.num&&void 0!==A.name&&void 0!==A.woman||(c=!0)})),c?Z().fire({icon:"error",title:"\uc5c5\ub85c\ub4dc \uc2e4\ud328!",html:"\ubc88\ud638, \uc774\ub984, \uc131\ubcc4 \ubb38\uc790\uc758 \ucca0\uc790\uac00 \uc815\ud655\ud55c\uc9c0, \ubb38\uc790 \uc55e/\ub4a4\uc5d0 \ub744\uc5b4\uc4f0\uae30\ub294 \uc5c6\ub294\uc9c0, \ube44\uc5b4\uc788\ub294 \uce78\uc774\ub098 \uc904\uc740 \uc5c6\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694! \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uba74 kerbong@gmail.com \uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"}):(e[A]=(0,l.Z)(i),s.push((0,a.Z)({},e)))})),i(!0),A.studentsInfoHandler(s)}else n.SheetNames.forEach((function(e){var t=W.P6.sheet_to_json(n.Sheets[e]),s=null===t||void 0===t?void 0:t.map((function(A){return{num:String(A["\ubc88\ud638"]),name:String(A["\uc774\ub984"]||A["\uc131\uba85"]),woman:"\ub0a8"!==String(A["\uc131\ubcc4"])}})),a=!1;s.forEach((function(A){void 0!==A.num&&void 0!==A.name&&void 0!==A.woman||(a=!0)})),a?Z().fire({icon:"error",title:"\uc5c5\ub85c\ub4dc \uc2e4\ud328!",html:"\ubc88\ud638, \uc774\ub984, \uc131\ubcc4 \ubb38\uc790\uc758 \ucca0\uc790\uac00 \uc815\ud655\ud55c\uc9c0, \ubb38\uc790 \uc55e/\ub4a4\uc5d0 \ub744\uc5b4\uc4f0\uae30\ub294 \uc5c6\ub294\uc9c0, \ube44\uc5b4\uc788\ub294 \uce78\uc774\ub098 \uc904\uc740 \uc5c6\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694! \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uba74 kerbong@gmail.com \uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"}):(i(!0),A.studentsInfoHandler(s))}))}catch(c){Z().fire({icon:"error",title:"\uc5c5\ub85c\ub4dc \uc2e4\ud328!",html:"\ubc88\ud638, \uc774\ub984 \ud589\uc758 \ucca0\uc790\uac00 \uc815\ud655\ud55c\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"})}},t.readAsBinaryString(n.files[0])}}(e)},style:{display:"none"},accept:".xls,.xlsx"}),!A.isSubject&&(0,D.jsx)(o.Z,{className:s?"student-save-uploaded":"student-save",name:(0,D.jsxs)(D.Fragment,{children:[s&&"\ud074\ub9ad! ",(0,D.jsx)("i",{className:"fa-regular fa-floppy-disk"})]}),onclick:A.uploadStudentsInfo})]}),(0,D.jsxs)("div",{className:S,children:[0===(null===(e=A.studentsInfo)||void 0===e?void 0:e.length)&&(0,D.jsx)("img",{src:O,alt:"",className:B}),(0,D.jsx)("hr",{className:j}),(0,D.jsx)("span",{className:k,children:"\uc5d1\uc140\ud30c\uc77c\ub85c \ud559\uc0dd\uc5c5\ub85c\ub4dc"}),(0,D.jsx)("hr",{className:j}),(0,D.jsx)("span",{dangerouslySetInnerHTML:{__html:d}}),(0,D.jsx)("span",{dangerouslySetInnerHTML:{__html:m}}),(0,D.jsx)("button",{className:"".concat(s?N:y),children:(0,D.jsxs)("a",{href:A.isSubject?"https://docs.google.com/uc?export=download&id=1Wgk9DPx-wPl04ZhOsq0yjn0UePJwavD9":"https://docs.google.com/uc?export=download&id=1tdHVIke3tlak2xCvIV_GAj0UcRRSIjjZ",className:I,children:["\uc591\uc2dd\ud30c\uc77c \ub2e4\uc6b4 ",(0,D.jsx)("i",{className:"fa-solid fa-download"})]})}),(0,D.jsx)("hr",{className:j}),(0,D.jsx)("span",{dangerouslySetInnerHTML:{__html:f}}),(0,D.jsx)("hr",{className:j})]})]})},L=n(2964),T=function(A){var e=(0,r.useRef)(null),n=(0,r.useState)(A.studentsInfo),t=(0,c.Z)(n,2),a=t[0],l=t[1],o=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n){var t,a,i,c,r,o,u;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=function(){var A={value:1,dataWhen:(new Date).getDate()};localStorage.setItem("todayOcrTry",JSON.stringify(A))},!((a=localStorage.getItem("todayOcrTry")||"").length>0)){e.next=17;break}if(i=JSON.parse(a),(new Date).getDate()===i.dataWhen){e.next=8;break}t(),e.next=15;break;case 8:if(!(i.value>3)){e.next=13;break}return Z().fire({icon:"error",title:"\uc778\uc2dd\ubd88\uac00",text:"\ub2e4\ub978 \uc120\uc0dd\ub2d8\ub4e4\uc744 \uc704\ud574\uc11c \ud558\ub8e8\uc5d0 3\ubc88\uae4c\uc9c0\ub9cc OCR\uae30\ub2a5 \ud65c\uc6a9\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4. \uc9c1\uc811\uc785\ub825 / \uc5d1\uc140\ud30c\uc77c \uc5c5\ub85c\ub4dc \uae30\ub2a5\uc744 \ud65c\uc6a9\ud574\uc8fc\uc138\uc694. \uc6d0\ud65c\ud558\uc9c0 \ubabb\ud55c \uc790\ub3d9\uc778\uc2dd\uc5d0 \uc8c4\uc1a1\ud558\uace0, \ubc30\ub824 \uac10\uc0ac\ud569\ub2c8\ub2e4! "}),e.abrupt("return",!1);case 13:i.value+=1,localStorage.setItem("todayOcrTry",JSON.stringify(i));case 15:e.next=18;break;case 17:t();case 18:return"AIzaSyBZOH8k3MvnN5QuOLz5SDIbp-RLNn-Lhec",c=[],r=[],o=[],u="https://vision.googleapis.com/v1/images:annotate?key=".concat("AIzaSyBZOH8k3MvnN5QuOLz5SDIbp-RLNn-Lhec"),e.next=25,fetch(u,{method:"POST",body:JSON.stringify({requests:[{image:{content:n},features:[{type:"TEXT_DETECTION"}]}]}),headers:{"Content-Type":"application/json"}}).then((function(A){return A.json()})).then((function(e){var n,t=e.responses[0].fullTextAnnotation.text;console.log(e.responses[0]),c=t.replace(/[^0-9]+/g," ").trim(" ").split(" ");var s=[];c.forEach((function(A,e){if(+c[e+1]-1===+A||+c[e-1]+1===+A)s.push(A);else{var n=Math.abs(+c[e+1]-+c[e-1]);n>=4?"2"===c[e+1].slice(1)?s.push(String(+c[e+1]-1)):String(+s[e-1]+1)!==c[e+1]&&s.push(String(+s[e-1]+1)):3===n?(s.push(String(+c[e-1]+1)),s.push(String(+c[e-1]+2))):2===n&&s.push(String(+c[e-1]+1))}})),r=null===(n=r=t.replace(/[^\u3131-\u314e\uac00-\ud7a3]+/g," ").trim(" ").split(" "))||void 0===n?void 0:n.filter((function(A){return 1!==A.length&&A.length<5})),s.forEach((function(A){var e=r.shift();void 0===e&&(e="\uc7ac\uc785\ub825"),o.push({num:A,name:e,woman:!1})})),l([].concat(o)),A.setAddStudentsInfo([].concat(o))})).catch((function(A){return Z().fire({icon:"error",title:"\uc778\uc2dd\uc774 \ubd88\uac00\ub2a5\ud574\uc694",text:"\uc624\ub958\uac00 \uc0dd\uaca8\uc11c \uc778\uc2dd\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694! \ub2e4\ub978 \ubc29\ubc95\uc744 \ud65c\uc6a9\ud558\uc2dc\uac70\ub098 \uba54\uc77c\ub85c \uc5f0\ub77d\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}));case 25:case"end":return e.stop()}}),e)})));return function(A){return e.apply(this,arguments)}}(),u=function(){var A=(0,i.Z)((0,s.Z)().mark((function A(e){var n,t,a;return(0,s.Z)().wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return n={maxSizeMB:.2,maxWidthOrHeight:1920,useWebWorker:!0},A.prev=1,A.next=4,(0,L.Z)(e,n);case 4:t=A.sent,(a=new FileReader).readAsDataURL(t),a.onloadend=function(){var A=a.result;o(A.split(",")[1])},A.next=13;break;case 10:A.prev=10,A.t0=A.catch(1),Z().fire({icon:"error",title:"\uc778\uc2dd\ubd88\uac00",text:"\ud30c\uc77c \ubcc0\ud658\uacfc\uc815\uc5d0\uc11c \uc624\ub958\uac00 \uc0dd\uacbc\uc5b4\uc694. \ubb38\uc81c\uac00 \ubc18\ubcf5\ub418\uc2dc\uba74 kerbong@gmail.com\uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!"});case 13:case"end":return A.stop()}}),A,null,[[1,10]])})));return function(e){return A.apply(this,arguments)}}(),v=function(){var A=(0,i.Z)((0,s.Z)().mark((function A(e){var n;return(0,s.Z)().wrap((function(A){for(;;)switch(A.prev=A.next){case 0:if(void 0===(n=e.target).files[0]){A.next=5;break}u(n.files[0]),A.next=6;break;case 5:return A.abrupt("return");case 6:case"end":return A.stop()}}),A)})));return function(e){return A.apply(this,arguments)}}();return(0,D.jsx)(D.Fragment,{children:A.isSubject?(0,D.jsx)("div",{className:f,children:"\uc804\ub2f4\uc120\uc0dd\ub2d8\uc740 \uc5d1\uc140\uc5c5\ub85c\ub4dc / \uc9c1\uc811 \uc785\ub825\uc744 \ud65c\uc6a9\ud574\uc8fc\uc138\uc694!"}):(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("div",{className:_,children:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)("label",{id:"imageFileLabel",htmlFor:"imageFile",className:x,children:[(0,D.jsx)("i",{className:"fa-regular fa-file-image"})," \uc5c5\ub85c\ub4dc"]}),(0,D.jsx)("input",{type:"file",id:"imageFile",ref:e,onChange:v,style:{display:"none"},accept:".jpg,.jpeg"})]})}),(0,D.jsxs)("div",{className:f,children:[0===(null===a||void 0===a?void 0:a.length)&&(0,D.jsx)(D.Fragment,{children:(0,D.jsx)("img",{src:"data:image/jpeg;base64,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",alt:""})}),(0,D.jsx)("hr",{className:j}),(0,D.jsx)("span",{className:k,children:"\uba85\ub82c\ud45c \uc774\ubbf8\uc9c0\ub85c \ud559\uc0dd\ub4f1\ub85d"}),(0,D.jsx)("hr",{className:j}),(0,D.jsxs)("span",{children:[(0,D.jsx)("span",{className:p,children:"\ubc88\ud638, \uc774\ub984\ub9cc"})," ","\ubcf4\uc774\ub3c4\ub85d \uba85\ub82c\ud45c \ucd2c\uc601\ud558\uae30"]}),(0,D.jsxs)("span",{children:["\uc5c5\ub85c\ub4dc \ubc84\ud2bc\uc73c\ub85c"," ",(0,D.jsx)("span",{className:p,children:"\ud30c\uc77c \ubd88\ub7ec\uc624\uae30!"})]}),(0,D.jsxs)("span",{children:["\uc131\ubcc4 \uc785\ub825 \ubc0f \ub0b4\uc6a9\ud655\uc778 \ud6c4",(0,D.jsx)("span",{className:p,children:" \uc800\uc7a5\ub204\ub974\uae30"})]}),(0,D.jsx)("hr",{className:j}),(0,D.jsxs)("span",{className:g,children:["* \uc778\uc1c4\ub41c \ud30c\uc77c\uc744 \ucd2c\uc601\ud558\uba74 \uc778\uc2dd\ub960\uc774 \ub192\uc544\uc9d1\ub2c8\ub2e4.",(0,D.jsx)("br",{}),"* \ud654\uba74 \uc67c\ucabd \uc0c1\ub2e8\uc758 \ubcf4\ub77c\uc0c9 [\ud559\uc0dd\ub4f1\ub85d]",(0,D.jsx)("br",{}),"\ubc84\ud2bc\uc744 \ub204\ub974\uc2dc\uba74 \uc608\uc2dc\ub97c \ubcf4\uc2e4 \uc218 \uc788\uc5b4\uc694!"]}),(0,D.jsx)("hr",{className:j})]}),0!==(null===a||void 0===a?void 0:a.length)&&(0,D.jsx)("div",{className:h,children:null===a||void 0===a?void 0:a.map((function(A){return(0,D.jsx)("li",{id:A.num,className:d,children:(0,D.jsx)("span",{className:m,children:A.num+" "+A.name})},A.num+A.name)}))})]})})},Y=n(571),H=n(658),z=n.n(H),J=n.p+"static/media/teacher-ocr.44349b1c0fe0652be90b.gif",G=n.p+"static/media/teacher-typing.f82dbc64495a78c6242f.gif",V=n(5699),q=n.p+"static/media/subject-excel.bdd1613186abfdff44cf.gif",P=function(A){var e=(0,r.useState)(0!==A.students.length?"typing":"excelFile"),n=(0,c.Z)(e,2),d=n[0],m=n[1],f=(0,r.useState)([]),x=(0,c.Z)(f,2),p=x[0],h=x[1],g=(0,r.useState)([]),j=(0,c.Z)(g,2),v=j[0],B=j[1],S=(0,r.useState)(!1),F=(0,c.Z)(S,2),b=F[0],y=F[1],N=(0,r.useState)(""),I=(0,c.Z)(N,2),k=I[0],U=I[1],w=(0,r.useState)(""),_=(0,c.Z)(w,2),C=_[0],W=_[1],O=(0,r.useRef)();(0,r.useEffect)((function(){!function(){var e;e=A.isSubject?"typing"===d?G:q:"imageFile"===d?J:"typing"===d?G:V,W(e)}()}),[d]);var L=function(){return+z()().format("MM")<=1?String(+z()().format("YYYY")-1):z()().format("YYYY")};(0,r.useEffect)((function(){var e,n,t,s=L(),a=null===A||void 0===A||null===(e=A.students)||void 0===e||null===(n=e.filter((function(A){return String(Object.keys(A)[0])===s})))||void 0===n||null===(t=n[0])||void 0===t?void 0:t[s];A.isSubject?(null===a||void 0===a?void 0:a.length)>0&&(h($(a)),B.apply(void 0,(0,l.Z)(Object.values(a[0]))),U(Object.keys(a[0])[0])):B(a)}),[A.isSubject]);var H=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n){var t,i,l,c,r,o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,Q.JU)(K.wO,"students",A.userUid),e.next=3,(0,Q.QT)(t);case 3:return i=e.sent,l=[],i.exists()?(o=[],console.log(i),null===(c=i.data())||void 0===c||null===(r=c.studentDatas)||void 0===r||r.forEach((function(A){Object.keys(A)[0]!==Object.keys(n)[0]&&o.push(A)})),o.push((0,a.Z)({},n)),l=o):l=[(0,a.Z)({},n)],e.next=8,(0,Q.pl)((0,Q.JU)(K.wO,"students",A.userUid),{studentDatas:l});case 8:case"end":return e.stop()}}),e)})));return function(A){return e.apply(this,arguments)}}(),P=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n){var a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=function(){if(A.isSubject){var e=(0,l.Z)(p);null===e||void 0===e||e.map((function(A){var e;return null===(e=X(Object.values(A)))||void 0===e||e.map((function(A){return A.hasOwnProperty("woman")||(A.woman=!1),A.hasOwnProperty("pair")&&delete A.pair,A})),A}));var n=(0,t.Z)({},L(),e);H(n)}else{console.log(v);var s=(0,l.Z)(v);null===s||void 0===s||s.map((function(A){return A.hasOwnProperty("woman")||(A.woman=!1),A.hasOwnProperty("pair")&&delete A.pair,A}));var a=(0,t.Z)({},L(),X(s));H(a)}},!0===n?(a(),Z().fire({icon:"success",title:"\uc800\uc7a5\ub418\uc5c8\uc5b4\uc694!",text:"\uc5d1\uc140\ud30c\uc77c\uc758 \ud559\uc0dd\uc815\ubcf4\uac00 \uc5c5\ub85c\ub4dc \ub418\uc5c8\uc2b5\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})):Z().fire({icon:"question",title:"\uc800\uc7a5\ud560\uae4c\uc694?",html:'\ubc88\ud638\ub098 \uc774\ub984\uc774 \uc911\ubcf5\ub418\uc9c0 \uc54a\uc558\ub294\uc9c0 \ud655\uc778 \ud6c4 \uc800\uc7a5 \ubc84\ud2bc <i class="fa-regular fa-floppy-disk"></i> \uc744 \ub20c\ub7ec\uc8fc\uc138\uc694!',showDenyButton:!0,confirmButtonText:"\uc800\uc7a5",confirmButtonColor:"#db100cf2",denyButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c"}).then((function(A){A.isConfirmed&&(a(),Z().fire({icon:"success",title:"\uc800\uc7a5\ub418\uc5c8\uc5b4\uc694!",text:"\uc218\uc815/\ucd94\uac00\ub41c \ud559\uc0dd \uba85\ub2e8\uc774 \uc800\uc7a5\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))}));case 2:case"end":return e.stop()}}),e)})));return function(A){return e.apply(this,arguments)}}(),X=function(A){return A.sort((function(A,e){return"".concat(A.num)-"".concat(e.num)}))},$=function(A){return A.sort((function(A,e){return"".concat(Object.keys(A))>"".concat(Object.keys(e))?1:-1}))};(0,r.useEffect)((function(){if(A.isSubject&&""!==k){var e,n=null===(e=(0,l.Z)(p))||void 0===e?void 0:e.map((function(A){var e=A;return Object.keys(A)[0]===k&&(e=(0,t.Z)({},k,v)),e}));h((0,l.Z)(n))}}),[v]);var AA=function(A){var e,n=null===(e=(0,l.Z)(v))||void 0===e?void 0:e.filter((function(e){return+e.num!==+A.num}));return B((0,l.Z)(n)),n},eA=function(A){var e=(0,l.Z)(v);e.forEach((function(n,t){n.name===A.name&&(e[t].woman=A.woman)})),B((0,l.Z)(e))};return(0,D.jsxs)("div",{children:[(0,D.jsxs)("div",{id:"title-div",children:[(0,D.jsxs)("button",{id:"title-btn",className:"upload",onClick:function(){return y(!0)},children:[(0,D.jsx)("i",{className:"fa-solid fa-user-plus"})," \ud559\uc0dd\ub4f1\ub85d"]}),b&&(0,D.jsx)(Y.Z,{onClose:function(){return y(!1)},imgSrc:C,text:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)("p",{style:{fontSize:"1.3em",textAlign:"center",margin:"5px"},children:["=== ","imageFile"===d&&"\ud559\uc0dd\uba85\ubd80 \uc5c5\ub85c\ub4dc"," ","typing"===d&&"\uc9c1\uc811 \uc785\ub825"," ","excelFile"===d&&"\uc5d1\uc140 \uc5c5\ub85c\ub4dc "," \uc608\uc2dc ==="]}),(0,D.jsx)("p",{style:{margin:"15px"},children:"* \ud398\uc774\uc9c0\uc758 \uc67c\ucabd \uc0c1\ub2e8, [\ubcf4\ub77c\uc0c9 \ud559\uc0dd\ub4f1\ub85d]\uc744 \ud074\ub9ad\ud558\uc2dc\uba74 \ub2e4\uc2dc \ubcf4\uc2e4 \uc218 \uc788\uc5b4\uc694!"})]})}),"typing"===d&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(o.Z,{id:"excelFile",className:"studentAddBtn",name:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("span",{className:"excel-upload-text",children:"\uc5d1\uc140"})," ",(0,D.jsx)("i",{className:"fa-solid fa-file-arrow-up"})]}),onclick:function(){return m("excelFile")}}),!A.isSubject&&(0,D.jsx)(o.Z,{id:"imageFile",className:"studentAddBtn",name:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("span",{className:"excel-upload-text",children:"\uba85\ub82c\ud45c"})," ",(0,D.jsx)("i",{className:"fa-regular fa-file-image"})]}),onclick:function(){return m("imageFile")}})]}),"excelFile"===d&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(o.Z,{id:"typing",className:"studentAddBtn",name:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("span",{className:"excel-upload-text",children:"\uc9c1\uc811"})," ",(0,D.jsx)("i",{className:"fa-solid fa-circle-arrow-up"})]}),onclick:function(){return m("typing")}}),!A.isSubject&&(0,D.jsx)(o.Z,{id:"imageFile",className:"studentAddBtn",name:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("span",{className:"excel-upload-text",children:"\uba85\ub82c\ud45c"})," ",(0,D.jsx)("i",{className:"fa-regular fa-file-image"})]}),onclick:function(){return m("imageFile")}})]}),"imageFile"===d&&!A.isSubject&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(o.Z,{id:"typing",className:"studentAddBtn",name:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("span",{className:"excel-upload-text",children:"\uc9c1\uc811"})," ",(0,D.jsx)("i",{className:"fa-solid fa-circle-arrow-up"})]}),onclick:function(){return m("typing")}}),(0,D.jsx)(o.Z,{id:"excelFile",className:"studentAddBtn",name:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)("span",{className:"excel-upload-text",children:"\uc5d1\uc140"})," ",(0,D.jsx)("i",{className:"fa-solid fa-file-arrow-up"})]}),onclick:function(){return m("excelFile")}})]})]}),A.isSubject&&"imageFile"!==d&&(0,D.jsxs)("div",{className:u.addStudentInputs,children:[(0,D.jsxs)("select",{ref:O,onChange:function(){var A=O.current.value;p.forEach((function(e){Object.keys(e)[0]===A&&B(Object.values(e)[0])})),U(A)},className:u["class-select"],value:k,children:[(0,D.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===p||void 0===p?void 0:p.map((function(A){return(0,D.jsx)("option",{value:Object.keys(A),children:Object.keys(A)},Object.keys(A))}))]}),(0,D.jsx)(o.Z,{className:p.length>0?"student-save-uploaded":"student-save",id:"studentLists-save",name:(0,D.jsxs)(D.Fragment,{children:[p.length>0&&"\ud074\ub9ad! ",(0,D.jsx)("i",{className:"fa-regular fa-floppy-disk"})]}),onclick:P})]}),"typing"===d&&(0,D.jsx)(D.Fragment,{children:(0,D.jsx)(E,{studentsInfo:v,setAddStudentsInfo:function(A){return function(A){var e=[];((null===v||void 0===v?void 0:v.length)>0||void 0!==v)&&(e=AA(A)),e.push(A),B(X(e))}(A)},studentGenderChange:function(A){eA(A)},deleteStudentHandler:function(A){return AA(A)},uploadStudentsInfo:P,deleteAllHandler:function(){B([])},isSubject:A.isSubject})}),"excelFile"===d&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(M,{studentsInfoHandler:function(e){!function(e){A.isSubject?(h($(e)),U(Object.keys(e[0])[0]),B.apply(void 0,(0,l.Z)(Object.values(e[0])))):B((0,l.Z)(e))}(e)},studentsInfo:v,uploadStudentsInfo:P,isSubject:A.isSubject}),(0,D.jsx)("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"},children:v&&(null===v||void 0===v?void 0:v.map((function(e){return(0,D.jsx)(R,{myKey:e.num+e.name,student:e,studentFixHandler:function(A){eA(A)},deleteStudentHandler:function(A){AA(A)},isSubject:A.isSubject},"key"+e.num+e.name)})))})]}),"imageFile"===d&&(0,D.jsx)(T,{studentsInfo:v,setAddStudentsInfo:function(A){B((0,l.Z)(A)),m("typing")},isSubject:A.isSubject}),(0,D.jsxs)("p",{children:["* \ubb38\uc81c\ub294 kerbong@gmail.com\uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694.",(0,D.jsx)("br",{}),"\ucd5c\ub300\ud55c \ube60\ub974\uac8c \ud574\uacb0\ud574 \ub4dc\ub9b4\uac8c\uc694!"]})]})}},5699:function(A,e,n){A.exports=n.p+"static/media/teacher-excel.e6955cccf0ee0cffd757.gif"}}]);