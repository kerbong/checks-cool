"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[9720],{5186:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(7313),s=a(35),o=a.n(s),l=(a(2632),a(1560)),i=a(6417);const r=e=>{const[t,a]=(0,n.useState)(e.setStart||new Date),[s,r]=(0,n.useState)(e.setEnd||t),d=n.forwardRef(((e,t)=>{let{value:a,onClick:n}=e;return(0,i.jsx)("button",{className:"custom-input",onClick:n,ref:t,title:"\ub0a0\uc9dc \uc120\ud0dd\ud558\uae30",children:a})}));(0,n.useEffect)((()=>{if("main"===e.about)a(e.setStart);else if("tableInput"===e.about){if(!e.setStart||"object"!==typeof e.setStart)return;a(e.setStart)}}),[e.setStart]);return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(o(),{selected:t,onChange:t=>{if("attendance"===e.about||"todo"===e.about){const[e,n]=t;a(e),r(n)}else a(t);e.getDateValue(t),"tableInput"===e.about&&e.tableDateChangeHandler(t)},filterDate:t=>{if(e.filterNone)return t;const a=t.getDay(t);return 0!==a&&6!==a},startDate:t,showMonthDropdown:!0,showYearDropdown:!0,scrollableYearDropdown:!0,onMonthChange:t=>{e.getMonthValue(t)},onYearChange:t=>{e.getYearValue(t)},dateFormatCalendar:"yyyy\ub144 ",endDate:("attendance"===e.about||"todo"===e.about)&&s,selectsRange:("attendance"===e.about||"todo"===e.about)&&!0,disabledKeyboardNavigation:!0,highlightDates:e.highlight,customInput:(0,i.jsx)(d,{onClick:()=>{if(!e.filterNone)return;let t=document.querySelector(".react-datepicker__day-names"),a=document.querySelectorAll(".react-datepicker__day-name");t&&a&&(t.style.width="95%",a[0].style.width="14%",a[6].style.width="14%")}}),fixedHeight:e.fixedHeight,inline:e.inline,locale:l.Z,dateFormat:e.showJustTime?"aa h:mm":e.showTime?"yy\ub144 MMMM d\uc77c(eee) aa h:mm":"yy\ub144 MMMM d\uc77c(eee)",showTimeSelectOnly:e.showJustTime,timeFormat:"aa h:mm",timeInputLabel:"\uc785\ub825/\uc120\ud0dd",showTimeInput:e.showTime,timeIntervals:10})})}},9720:(e,t,a)=>{a.d(t,{Z:()=>T});const n="Attendance_student__zQCyC",s="Attendance_form-section__SmTcW",o="Attendance_date__PNNb3",l="Attendance_closeBtn__E609D",i="Attendance_datepick-explain__LXpeq",r="Attendance_holidayData__72cLY";var d=a(3451),c=a(7313),u=a(5186),m=a(658),h=a.n(m),p=a(7287),v=a(4484),_=a(7114),f=a.n(_);const b="AttendanceOption_option__04AUt",x="AttendanceOption_option-select__5pc8P",g="AttendanceOption_ul__HzrL4";var j=a(6417);const S=e=>{var t,a,n;const[s,o]=(0,c.useState)((null===(t=e.selectOption)||void 0===t||null===(a=t[0])||void 0===a?void 0:a.value)||"");(0,c.useEffect)((()=>{e.showNote(s)}),[s]);const l=e=>{o(e.target.id+e.target.innerText)};return(0,j.jsx)("ul",{className:g,children:e.selectOption&&(null===(n=e.selectOption)||void 0===n?void 0:n.map((e=>(0,j.jsx)("li",{className:e.value===s?x:b,id:e.id,onClick:l,children:e.class},e.id))))})};var w=a(5729),y=a(7692),C=a(7121),N=a(650),A=a(573);const D="AudioRecord_audio-controls__2Hajc",F="AudioRecord_audio__B9hmM",k="AudioRecord_audio-container__Q7SBV",Z="AudioRecord_fileUploadBtn__9aPc1",M="AudioRecord_addRecordFile__J2UkD",I="AudioRecord_downRecordFile__EhfPR",H="AudioRecord_audio-btns__0DaJq";var O=a(2050);const E="audio/mp4",R=e=>{const[t,a]=(0,c.useState)(!1),n=(0,c.useRef)(null),[s,o]=(0,c.useState)("inactive"),[l,i]=(0,c.useState)(null),[r,d]=(0,c.useState)([]),[u,m]=(0,c.useState)([]),[p,v]=(0,c.useState)(null),[_,b]=(0,c.useState)(null),[x,g]=(0,c.useState)("00:00"),S=()=>{o("inactive"),n.current.stop(),n.current.onstop=()=>{const e=new Blob(r,{type:E});m(e);const t=URL.createObjectURL(e);v(t),d([])}};(0,c.useEffect)((()=>{let t;if("recording"===s){let e;g("00:00"),null===_?(e=h()().format("YYYY-MM-DD HH:mm:ss"),b(e)):e=_,t=setInterval((()=>{let t=h()().format("YYYY-MM-DD HH:mm:ss"),a=h()(t).diff(h()(e).format("YYYY-MM-DD HH:mm:ss"),"s"),n=Math.floor(+a/60),s=Math.floor(+a%60);n<10&&(n="0"+n),s<10&&(s="0"+s),g(n+":"+s)}),1e3)}else"inactive"===s&&p&&(b(null),clearInterval(t),f().fire("\ub179\uc74c \uc885\ub8cc","\ub179\uc74c\uc774 \uc885\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc800\uc7a5\ud558\uc2dc\ub824\uba74 [\ud30c\uc77c\ucd94\uac00] \ub97c \ub204\ub974\uc2e0 \ud6c4, [\uc800\uc7a5]\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694!","warning"),e.uploadAudio(u));return()=>clearInterval(t)}),[s]);const w=e=>{f().fire("\uc2dc\uac04 \uc81c\ud55c","\uc790\ub3d9 \uc885\ub8cc\uae4c\uc9c0 ".concat(e,"\ubd84 \ub0a8\uc558\uc2b5\ub2c8\ub2e4."),"info")};(0,c.useEffect)((()=>{null!==_&&("05:00"===x?w(3):"07:00"===x?w(1):"08:00"===x&&S())}),[x]);return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)("div",{className:D,children:[(0,j.jsx)("div",{className:k,children:(0,j.jsx)("audio",{src:p,controls:!0,className:F})}),(0,j.jsxs)("div",{className:H,children:[x,"\ucd08"," ",t?null:(0,j.jsxs)("button",{onClick:async()=>{if("MediaRecorder"in window)try{const e=await navigator.mediaDevices.getUserMedia({audio:!0,video:!1});a(!0),i(e)}catch(e){f().fire("\uc5d0\ub7ec!","".concat(e.message,", \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uba74 kerbong@gmail.com / \uc7bc\uc7bc-\uc774\uac70\ud574\uc694 \uc5d0 \uc54c\ub824\uc8fc\uc138\uc694!"),"warning")}else alert("\ud604\uc7ac \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc2e4\ud589\uc774 \ubd88\uac00\ub2a5\ud55c \uae30\ub2a5\uc785\ub2c8\ub2e4! \ud06c\ub86c\uc5d0\uc11c \uc2e4\ud589\ud574\uc8fc\uc138\uc694!")},type:"button",className:I,children:[(0,j.jsx)(O.uYL,{}),"\ub9c8\uc774\ud06c \uad8c\ud55c"]}),t&&"inactive"===s?(0,j.jsxs)("button",{onClick:async()=>{o("recording");const e=new MediaRecorder(l,{type:E});n.current=e,n.current.start();let t=[];n.current.ondataavailable=e=>{"undefined"!==typeof e.data&&0!==e.data.size&&t.push(e.data)},d(t)},type:"button",className:Z,children:[(0,j.jsx)(O.uoU,{})," ",p?"\ub2e4\uc2dc\ub179\uc74c":"\ub179\uc74c"]}):null,"recording"===s?(0,j.jsxs)("button",{onClick:S,type:"button",className:Z,children:[(0,j.jsx)(O.wTG,{}),"\uc911\uc9c0"]}):null]}),(0,j.jsx)("div",{className:H,children:p&&(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("button",{onClick:()=>{e.uploadAudio(u)},className:M,children:"\ud30c\uc77c \ucd94\uac00"})})})]})})},Y=e=>{var t;const[a,n]=(0,c.useState)(""),[s,o]=(0,c.useState)(""),[l,i]=(0,c.useState)(!1),[r,d]=(0,c.useState)(!1),[u,m]=(0,c.useState)(!1),[_,b]=(0,c.useState)(!1),[x,g]=(0,c.useState)(!1),[D,F]=(0,c.useState)([]),[k,Z]=(0,c.useState)(!1),[M,I]=(0,c.useState)([]),[H,E]=(0,c.useState)([]),Y=(0,c.useRef)(null);(0,c.useEffect)((()=>{(()=>{let t=(0,A.JU)(N.wO,"attend",e.userUid);(0,A.cf)(t,(e=>{if(e.exists()){var t,a;const n=[];null===e||void 0===e||null===(t=e.data())||void 0===t||null===(a=t.attend_data)||void 0===a||a.forEach((e=>{n.push(e)})),F([...n])}else F([])}))})()}),[e.userUid]);const B=e=>e.getFullYear()+"-"+("0"+(1+e.getMonth())).slice(-2)+"-"+("0"+e.getDate()).slice(-2),T=async t=>{t.preventDefault();const o=document.getElementById("textArea").value,l=e.who.split(" ");let d="";if("consulting"===e.about){d=B(e.attendDate)+(("0"+(c=e.attendDate).getHours()).slice(-2)+":"+("0"+c.getMinutes()).slice(-2))+l[0];const t={num:l[0],name:l[1],id:d,option:s,note:o,attachedFileUrl:a,related:M};e.addData(t)}else if("attendance"===e.about){let t,a;if(Array.isArray(e.attendDate)?[t,a]=e.attendDate:(t=e.attendDate,a=e.attendDate),0===t.getDay()||6===t.getDay())return void f().fire({icon:"error",title:"\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694!",html:"\ud1a0 / \uc77c\uc694\uc77c\uc740 \uc800\uc7a5\uc774 \ubd88\uac00\ub2a5\ud569\ub2c8\ub2e4. <br>\ub0a0\uc9dc\ub97c \ud655\uc778, \ubcc0\uacbd\ud574\uc8fc\uc138\uc694",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"});let n={num:l[0],name:l[1],option:s,note:o};"1\uad50\uc678\uccb4\ud5d8"===s||"3\uac00\uc815\ud559\uc2b5"===s?(n.request=u,n.report=_):n.paper=r;let i=[],c=t;if(t===a){d=B(t)+l[0]+" "+h()().format("HH:mm"),i.push(d)}else for(;c<=a;)if(0===c.getDay()||6===c.getDay())c.setDate(c.getDate()+1);else{d=B(c)+l[0]+" "+h()().format("HH:mm"),i.push(d),c.setDate(c.getDate()+1)}let m=JSON.parse(JSON.stringify(D));i.forEach((e=>{(null===D||void 0===D?void 0:D.filter((t=>{var a,n,s;return(null===(a=t.id)||void 0===a||null===(n=a.split(" "))||void 0===n?void 0:n[0])===(null===e||void 0===e||null===(s=e.split(" "))||void 0===s?void 0:s[0])}))).length<3?m.push({...n,id:e}):f().fire("\uc800\uc7a5 \uc2e4\ud328","\ucd9c\uacb0\uc790\ub8cc\ub294 \ud559\uc0dd\ub2f9 \ud558\ub8e8\uc5d0 3\uac1c \uae4c\uc9c0\ub9cc \uc800\uc7a5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","error")})),await(0,A.pl)((0,A.JU)(N.wO,"attend",e.userUid),{attend_data:m})}var c,m;m="".concat(l[1]," \ud559\uc0dd\uc758 ").concat(s.slice(1)," \uc815\ubcf4\uac00 \uc800\uc7a5\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \n(5\ucd08 \ud6c4 \ucc3d\uc774 \uc790\ub3d9\uc73c\ub85c \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.)"),f().fire({icon:"success",title:"\uc800\uc7a5\ub418\uc5c8\uc5b4\uc694!",text:m,confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}),i(!1),n(""),e.onClose()};return(0,c.useEffect)((()=>{"attendance"===e.about&&(async()=>{var t,a,n;let s=(0,A.JU)(N.wO,"attend",e.userUid),o=[];const l=await(0,A.QT)(s);var i;if(l.exists()&&(o=null===(i=l.data())||void 0===i?void 0:i.attend_data),!o||0===(null===(t=o)||void 0===t?void 0:t.length)||0===(null===(a=e.students)||void 0===a?void 0:a.length))return;let r=null===(n=o)||void 0===n?void 0:n.filter((t=>{var a,n,s,o;return(null===t||void 0===t?void 0:t.name)===(null===(a=e.who)||void 0===a?void 0:a.substring((null===(n=e.who)||void 0===n?void 0:n.indexOf(" "))+1))&&(null===t||void 0===t?void 0:t.num)===(null===(s=e.who)||void 0===s||null===(o=s.split(" "))||void 0===o?void 0:o[0])})),d=[];null===r||void 0===r||r.forEach((e=>{d.push(e.option)})),E(d)})()}),[e.students]),(0,j.jsxs)(j.Fragment,{children:[k&&(0,j.jsx)(C.Z,{who:e.who,confirmBtnHandler:()=>Z(!1),studentClickHandler:t=>(t=>{var a;let n=t.target.innerText,s=[...M];if(n!==e.who){var o;null!==(a=s)&&void 0!==a&&a.includes(n)?s=null===(o=s)||void 0===o?void 0:o.filter((e=>e!==n)):s.push(n),I(s)}})(t),students:e.students,isSubject:e.isSubject,relatedStudent:M,closeModalHandler:()=>{Z(!1),I([])}}),(0,j.jsx)(S,{selectOption:e.selectOption,showNote:e=>{i(!0),o(e)}}),"attendance"===e.about&&(null===H||void 0===H?void 0:H.length)>0&&(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)("span",{className:p.Z.optionsSet,children:[(0,j.jsx)("span",{className:p.Z.optionsSet,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0\uc815\ubcf4:"}),null===(t=[...new Set(H)])||void 0===t?void 0:t.map((e=>(0,j.jsxs)("span",{className:p.Z.optionsSet,children:["\ud83d\ude42",null===e||void 0===e?void 0:e.slice(1)," ",null===H||void 0===H?void 0:H.filter((t=>t===e)).length,"\uc77c"]},"optionSet-".concat(e))))]})}),"attendance"===e.about&&0===(null===H||void 0===H?void 0:H.length)&&(0,j.jsx)("span",{className:p.Z.optionsSet,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0 \uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"}),"consulting"===e.about&&(0,j.jsxs)("div",{className:p.Z.btnArea,children:[(0,j.jsxs)("div",{className:p.Z.relStdArea,children:[(0,j.jsx)("b",{children:"\uc120\ud0dd\ub41c \uad00\ub828\ud559\uc0dd"}),(0,j.jsx)("div",{className:p.Z.relStdShowDiv,children:(null===M||void 0===M?void 0:M.length)>0&&(null===M||void 0===M?void 0:M.map((e=>(0,j.jsx)("span",{className:p.Z["margin-5"],children:e},e))))})]}),(0,j.jsx)(y.Z,{className:"consult-relatedStdBtn",name:"\uad00\ub828\ud559\uc0dd",onclick:function(){Z(!k)}})]}),l&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("form",{id:"area-form",className:p.Z.form,onSubmit:T,children:["attendance"===e.about&&(0,j.jsx)(j.Fragment,{children:"1\uad50\uc678\uccb4\ud5d8"===s||"3\uac00\uc815\ud559\uc2b5"===s?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(y.Z,{className:u?"paperSub-btn-clicked":"paperSub-btn",onclick:e=>{e.preventDefault(),m((e=>!e))},title:"\uc2e0\uccad\uc11c",name:"\uc2e0\uccad\uc11c"}),(0,j.jsx)(y.Z,{className:_?"paperSub-btn-clicked":"paperSub-btn",onclick:e=>{e.preventDefault(),b((e=>!e))},title:"\ubcf4\uace0\uc11c",name:"\ubcf4\uace0\uc11c"})]}):(0,j.jsx)(j.Fragment,{children:(0,j.jsx)(y.Z,{className:r?"paperSub-btn-clicked":"paperSub-btn",onclick:e=>{e.preventDefault(),d((e=>!e))},title:"\uc11c\ub958",name:"\uc11c\ub958"})})}),(0,j.jsx)(v.Z,{ref:Y,id:"textArea",className:"attendForm-input",label:"inputData",input:{type:"textarea",placeholder:"\ube44\uace0\ub97c \uc785\ub825\ud558\uc138\uc694.",autoFocus:!0},defaultValue:"",onInput:t=>(t=>{let a;"consulting"===e.about?a=4e3:"attendance"===e.about&&(a=30),t.target.value.length>a&&(t.target.value=t.target.value.substr(0,a),f().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uc785\ub825\ud55c \ub0b4\uc6a9\uc744 \uc904\uc5ec\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))})(t)})]}),(0,j.jsx)("div",{className:p.Z.btnArea,style:{justifyContent:"center"},children:"consulting"===e.about?(0,j.jsx)(j.Fragment,{children:x?(0,j.jsx)(w.Z,{about:e.about,attachedFileHandler:e=>{n(e)}}):(0,j.jsx)(R,{userUid:e.userUid,uploadAudio:e=>{n(e)}})}):(0,j.jsx)(w.Z,{about:e.about,attachedFileHandler:e=>{n(e)}})}),(0,j.jsxs)("div",{className:p.Z.btnArea,style:"attendance"===e.about?{justifyContent:"center"}:{},children:["consulting"===e.about&&(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)("button",{className:p.Z.btn,onClick:()=>g((e=>!e)),style:{fontSize:"1em"},children:[(0,j.jsx)(O.Rc_,{})," ",x?"\uc624\ub514\uc624 \ub179\uc74c\ud558\uae30":"\uc0ac\uc9c4 \uc62c\ub9ac\uae30"]})}),(0,j.jsx)("button",{className:p.Z.btn,onClick:T,style:"attendance"===e.about?{width:"98%"}:{width:"50%"},children:"\uc800\uc7a5"})]})]})]})};var B=a(7984);const T=e=>{const[t,a]=(0,c.useState)(new Date),[m,p]=(0,c.useState)(!1),[v,_]=(0,c.useState)(h()().format("YYYY-MM")),f=e=>{_(h()(e).format("YYYY-MM"))};return(0,c.useEffect)((()=>{"consulting"===e.about&&v&&(null===B.Z||void 0===B.Z||B.Z.forEach((e=>{if(e[0]===v){let t=e[1].split("*"),a=document.querySelectorAll(t[0])[0];if(!a)return;if(a.classList.contains("eventAdded"))return;const n=document.createElement("button");n.className="".concat(r," eventBtn"),n.innerText=t[1],null===a||void 0===a||a.appendChild(n),a.style.borderRadius="5px",a.classList.add("eventAdded")}})))}),[v,m]),(0,c.useEffect)((()=>{if("attendance"===e.about)return;let t=document.querySelector(".react-datepicker__day-names"),a=document.querySelectorAll(".react-datepicker__day-name");t&&a&&(t.style.width="95%",a[0].style.width="14%",a[6].style.width="14%")}),[m]),(0,j.jsxs)(d.Z,{onClose:e.onClose,addStyle:"attendHeight",children:[(0,j.jsxs)("div",{className:n,children:[(0,j.jsxs)("span",{children:[" ",e.who," "]}),(0,j.jsx)("span",{className:l,onClick:e.onClose,children:(0,j.jsx)(O.zu6,{})})]}),(0,j.jsxs)("div",{className:o,onClick:()=>p((e=>!e)),children:[" ",(0,j.jsx)(u.Z,{filterNone:"consulting"===e.about&&!0,getDateValue:e=>{a(e)},about:e.about,isSubject:e.isSubject,getMonthValue:f,getYearValue:f})]}),(0,j.jsx)("div",{className:i,children:"attendance"===e.about&&"*\uc2dc\uc791 \ub0a0\uc9dc\uc640 \ub05d \ub0a0\uc9dc\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"}),(0,j.jsx)("div",{className:s,children:(0,j.jsx)(Y,{id:e.id,selectOption:e.selectOption,students:e.students,attendDate:t,about:e.about,addData:t=>e.addData(t),userUid:e.userUid,who:e.who,onClose:e.onClose})})]})}},7121:(e,t,a)=>{a.d(t,{Z:()=>r});a(7313);var n=a(3451),s=a(3776),o=a(7287),l=a(7692),i=a(6417);const r=e=>{var t,a;return(0,i.jsxs)(n.Z,{onClose:e.closeModalHandler,children:[e.who,(0,i.jsxs)("h2",{className:o.Z.btnArea,children:["\uad00\ub828\ud559\uc0dd \ub4f1\ub85d",(0,i.jsxs)("div",{children:[(0,i.jsx)(l.Z,{name:"\ucde8\uc18c",className:"student-add",style:{width:"50px",backgroundColor:"#ff6600a6"},onclick:()=>{e.closeModalHandler()}}),(0,i.jsx)(l.Z,{name:"\ud655\uc778",style:{width:"50px",backgroundColor:"#ff6600a6"},className:"student-add",onclick:e.confirmBtnHandler})]})]}),(null===(t=e.relatedStudent)||void 0===t?void 0:t.length)>0&&(0,i.jsx)("div",{className:o.Z.relStdShowDiv,children:null===(a=e.relatedStudent)||void 0===a?void 0:a.map((e=>(0,i.jsx)("span",{className:o.Z["margin-5"],children:e},e)))}),(0,i.jsx)(s.Z,{students:e.students,showOption:e.studentClickHandler,isSubject:e.isSubject})]})}},5729:(e,t,a)=>{a.d(t,{Z:()=>d});var n=a(7313);const s="FileArea_fileArea__MQmcW",o="FileArea_a__PHHp8",l="FileArea_img__qKac6";var i=a(7785),r=a(6417);const d=e=>{const[t,a]=(0,n.useState)(e.file||""),[d,c]=(0,n.useState)(!1);return(0,r.jsxs)("div",{className:s,children:[t&&!d?(0,r.jsx)("img",{src:t,alt:"filePreview",onError:()=>{c(!0)},className:l}):t&&(0,r.jsx)("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:o,children:"\ud30c\uc77c \ub2e4\uc6b4\ubc1b\uae30"}),"attendance"!==e.about&&(0,r.jsx)(i.Z,{attachedFileHandler:t=>{e.attachedFileHandler(t),a(t)},src:t,about:e.about})]})}},7785:(e,t,a)=>{a.d(t,{Z:()=>d});var n=a(7313);const s="FileForm_fileUploadBtn__r9msD";var o=a(2964),l=a(7114),i=a.n(l),r=a(6417);const d=e=>{const[t,a]=(0,n.useState)(e.src||"");return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("label",{id:"attachedFile",htmlFor:"attachFile",className:s,onClick:()=>{t&&a("")},style:"padIt"===e.about?{backgroundColor:"#687f7f"}:{},children:["meetSum"===e.about&&(0,r.jsx)(r.Fragment,{children:t?"\ucd08\uae30\ud654 & \ud30c\uc77c \ubcc0\uacbd":"\ud30c\uc77c \ucd94\uac00"}),"meetSum"!==e.about&&(0,r.jsx)(r.Fragment,{children:t?"\ucd08\uae30\ud654 & \uc774\ubbf8\uc9c0 \ubcc0\uacbd":"\uc774\ubbf8\uc9c0 \ucd94\uac00"})]}),(0,r.jsx)("input",{type:"file",accept:".pdf,.hwp,.xls,.xlsx,image/*",onChange:async t=>{const n=t.target.files[0];if(n){const s=new FileReader;if(s.onloadend=t=>{a(t.currentTarget.result),e.attachedFileHandler(t.currentTarget.result)},n.type.startsWith("image/")){const e=await(async e=>{try{const t=5,a=["application/pdf","application/x-hwp","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];if(e.size<=1024*t*1024&&a.includes(e.type))return e;{const t={maxSizeMb:2,maxWidthOrHeight:1920};return await(0,o.Z)(e,t)}}catch(t){console.log(t),i().fire("\uc5c5\ub85c\ub4dc \uc2e4\ud328","\uc5c5\ub85c\ub4dc\uc5d0 \ubb38\uc81c\uac00 \uc0dd\uacbc\uc2b5\ub2c8\ub2e4. \ud30c\uc77c\uc758 \ud06c\uae30\uac00 5Mb \uc774\uc0c1\uc774\uac70\ub098 \ucc98\ub9ac \uacfc\uc815\uc5d0 \ubb38\uc81c\uac00 \uc0dd\uae38 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc774\ubbf8\uc9c0 \ud30c\uc77c\ub85c \uc5c5\ub85c\ub4dc \ud558\uc2dc\uba74 \ud3b8\ub9ac\ud569\ub2c8\ub2e4.","warning")}})(n);s.readAsDataURL(e)}else s.readAsDataURL(n)}},style:{display:"none"},id:"attachFile"})]})}},4484:(e,t,a)=>{a.d(t,{Z:()=>l});var n=a(7313);const s={"class-subject":"Input_class-subject__E+qGy","rowcolumn-input":"Input_rowcolumn-input__MzKWZ","simsim-Text":"Input_simsim-Text__7+u+1","meetSum-Text":"Input_meetSum-Text__0ijY3","class-memo":"Input_class-memo__eXBTy","attendForm-input":"Input_attendForm-input__KLvku","memo-section":"Input_memo-section__CGRYR","simsimMain-input":"Input_simsimMain-input__TVHos","board-input":"Input_board-input__2xPzk","board-input-half":"Input_board-input-half__Lu9st","fs-80px":"Input_fs-80px__t0quj","fs-70px":"Input_fs-70px__ZcOO7","fs-60px":"Input_fs-60px__QNEgw","fs-50px":"Input_fs-50px__GEaU0","fs-40px":"Input_fs-40px__OICBO","memoAdd-textarea":"Input_memoAdd-textarea__dssNI","gptResult-input":"Input_gptResult-input__6i8It"};var o=a(6417);const l=n.forwardRef(((e,t)=>{const a=(0,n.useRef)(null),[l,i]=(0,n.useState)(""),[r,d]=(0,n.useState)("");(0,n.useEffect)((()=>{i("")}),[]),(0,n.useEffect)((()=>{i(e.defaultValue)}),[e.defaultValue]);const c=t=>{i(a.current.value),e.getValue&&e.getValueHandler(t)};(0,n.useEffect)((()=>{!0===e.showOn?d("1"):!1===e.showOn?d("0"):d(e.showOn)}),[e.showOn]),(0,n.useEffect)((()=>{"textarea"===e.input.type&&u()}),[r]),(0,n.useEffect)((()=>{a.current.style.height=e.startheight}),[e.startheight]);const u=t=>{null!==a&&null!==a.current&&(e.alarm||(a.current.style.height="10px",a.current.style.height=a.current.scrollHeight-13+"px"))};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("label",{htmlFor:e.input.id}),"textarea"===e.input.type?(0,o.jsx)("textarea",{id:e.id,ref:a,...e.input,className:s[e.className],onKeyDown:()=>u(void 0),onKeyUp:()=>u(void 0),onClick:()=>u(void 0),value:l||"",onInput:e.onInput,required:!!e.required,onChange:c,placeholder:e.placeholder||""},"textArea"+e.myKey):(0,o.jsx)("input",{id:e.input.id,type:e.input.type,required:!!e.required,className:s[e.className],onInput:e.onInput,ref:a,...e.input,value:l||"",onChange:c,placeholder:e.placeholder||""},e.myKey)]})}))},3776:(e,t,a)=>{a.d(t,{Z:()=>l});a(7313);const n="Student_div__ROh5A";var s=a(7405),o=a(6417);const l=e=>{var t;return(0,o.jsx)("div",{className:n,children:e.students&&(null===(t=e.students)||void 0===t?void 0:t.map((t=>{var a;return(0,o.jsx)(s.Z,{className:e.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(a=e.passStudent)||void 0===a?void 0:a.split(" ")[1])===t.name,manageEach:e.manageEach,name:t.name,num:t.num,woman:t.woman,onShowOption:t=>{e.showOption(t),t.target+="add"}},t.num)})))})}},7405:(e,t,a)=>{a.d(t,{Z:()=>o});a(7313);const n={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"};var s=a(6417);const o=e=>(0,s.jsxs)("button",{className:"".concat(n[e.className]," ").concat(e.classAdd&&"clicked"," ").concat(!e.woman&&n.woman),id:"std-".concat(e.num," ").concat(e.name),onClick:t=>{e.onShowOption(t)},title:null===e||void 0===e?void 0:e.title,children:[e.num," ",e.name]},"stdBtn-".concat(e.num," ").concat(e.name))},7984:(e,t,a)=>{a.d(t,{Z:()=>n});const n=[["2023-03",'div[aria-label="Choose 2023\ub144 3\uc6d4 1\uc77c \uc218\uc694\uc77c"]*3.1\uc808'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 5\uc77c \uae08\uc694\uc77c"]*\uc5b4\ub9b0\uc774\ub0a0'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 29\uc77c \uc6d4\uc694\uc77c"]*\uc11d\uac00\ud0c4\uc2e0\uc77c'],["2023-06",'div[aria-label="Choose 2023\ub144 6\uc6d4 6\uc77c \ud654\uc694\uc77c"]*\ud604\ucda9\uc77c'],["2023-08",'div[aria-label="Choose 2023\ub144 8\uc6d4 15\uc77c \ud654\uc694\uc77c"]*\uad11\ubcf5\uc808'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 28\uc77c \ubaa9\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 29\uc77c \uae08\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 2\uc77c \uc6d4\uc694\uc77c"]*\uc784\uc2dc\uacf5\ud734\uc77c'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 3\uc77c \ud654\uc694\uc77c"]*\uac1c\ucc9c\uc808'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 9\uc77c \uc6d4\uc694\uc77c"]*\ud55c\uae00\ub0a0'],["2023-12",'div[aria-label="Choose 2023\ub144 12\uc6d4 25\uc77c \uc6d4\uc694\uc77c"]*\uc131\ud0c4\uc808'],["2024-01",'div[aria-label="Choose 2024\ub144 1\uc6d4 1\uc77c \uc6d4\uc694\uc77c"]*\uc0c8\ud574'],["2024-02",'div[aria-label="Choose 2024\ub144 2\uc6d4 9\uc77c \uae08\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2024-02",'div[aria-label="Choose 2024\ub144 2\uc6d4 12\uc77c \uc6d4\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2024-03",'div[aria-label="Choose 2024\ub144 3\uc6d4 1\uc77c \uae08\uc694\uc77c"]*\uc0bc\uc77c\uc808'],["2024-04",'div[aria-label="Choose 2024\ub144 4\uc6d4 10\uc77c \uc218\uc694\uc77c"]*\uad6d\ud68c\uc120\uac70'],["2024-05",'div[aria-label="Choose 2024\ub144 5\uc6d4 6\uc77c \uc6d4\uc694\uc77c"]*\uc5b4\ub9b0\uc774\ub0a0\ub300\uccb4'],["2024-05",'div[aria-label="Choose 2024\ub144 5\uc6d4 15\uc77c \uc218\uc694\uc77c"]*\ubd80\ucc98\ub2d8\uc624\uc2e0\ub0a0'],["2024-06",'div[aria-label="Choose 2024\ub144 6\uc6d4 6\uc77c \ubaa9\uc694\uc77c"]*\ud604\ucda9\uc77c'],["2024-08",'div[aria-label="Choose 2024\ub144 8\uc6d4 15\uc77c \ubaa9\uc694\uc77c"]*\uad11\ubcf5\uc808'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 16\uc77c \uc6d4\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 17\uc77c \ud654\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 18\uc77c \uc218\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-10",'div[aria-label="Choose 2024\ub144 10\uc6d4 3\uc77c \ubaa9\uc694\uc77c"]*\uac1c\ucc9c\uc808'],["2024-10",'div[aria-label="Choose 2024\ub144 10\uc6d4 9\uc77c \uc218\uc694\uc77c"]*\ud55c\uae00\ub0a0'],["2024-12",'div[aria-label="Choose 2024\ub144 12\uc6d4 25\uc77c \uc218\uc694\uc77c"]*\ud06c\ub9ac\uc2a4\ub9c8\uc2a4'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 1\uc77c \uc218\uc694\uc77c"]*\uc2e0\uc815'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 28\uc77c \ud654\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 29\uc77c \uc218\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 30\uc77c \ubaa9\uc694\uc77c"]*\uc124\uc5f0\ud734']]},7287:(e,t,a)=>{a.d(t,{Z:()=>n});const n={form:"AttendanceForm_form__d8p8O",input:"AttendanceForm_input__euFwF",relStdShowDiv:"AttendanceForm_relStdShowDiv__McyvL",relStdArea:"AttendanceForm_relStdArea__kWci2","margin-5":"AttendanceForm_margin-5__6jnTk",btn:"AttendanceForm_btn__VV+7-",btnArea:"AttendanceForm_btnArea__eGu5D",optionsSet:"AttendanceForm_optionsSet__qPsn2"}}}]);