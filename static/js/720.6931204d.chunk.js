"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[720],{5186:function(e,t,n){n.d(t,{Z:function(){return l}});var a=n(885),i=n(7313),r=n(35),o=n.n(r),s=(n(2632),n(1560)),u=n(6417),l=function(e){var t=(0,i.useState)(e.setStart||new Date),n=(0,a.Z)(t,2),r=n[0],l=n[1],c=(0,i.useState)(e.setEnd||r),d=(0,a.Z)(c,2),f=d[0],m=d[1],p=i.forwardRef((function(e,t){var n=e.value,a=e.onClick;return(0,u.jsx)("button",{className:"custom-input",onClick:a,ref:t,title:"\ub0a0\uc9dc \uc120\ud0dd\ud558\uae30",children:n})}));(0,i.useEffect)((function(){if("main"===e.about)l(e.setStart);else if("tableInput"===e.about){if(!e.setStart||"object"!==typeof e.setStart)return;l(e.setStart)}}),[e.setStart]);return(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(o(),{selected:r,onChange:function(t){if("attendance"===e.about||"todo"===e.about){var n=(0,a.Z)(t,2),i=n[0],r=n[1];l(i),m(r)}else l(t);e.getDateValue(t),"tableInput"===e.about&&e.tableDateChangeHandler(t)},filterDate:function(t){if(e.filterNone)return t;var n=t.getDay(t);return 0!==n&&6!==n},startDate:r,showMonthDropdown:!0,showYearDropdown:!0,scrollableYearDropdown:!0,onMonthChange:function(t){e.getMonthValue(t)},onYearChange:function(t){e.getYearValue(t)},dateFormatCalendar:"yyyy\ub144 ",endDate:("attendance"===e.about||"todo"===e.about)&&f,selectsRange:("attendance"===e.about||"todo"===e.about)&&!0,disabledKeyboardNavigation:!0,highlightDates:e.highlight,customInput:(0,u.jsx)(p,{onClick:function(){if(e.filterNone){var t=document.querySelector(".react-datepicker__day-names"),n=document.querySelectorAll(".react-datepicker__day-name");t&&n&&(t.style.width="95%",n[0].style.width="14%",n[6].style.width="14%")}}}),fixedHeight:e.fixedHeight,inline:e.inline,locale:s.Z,dateFormat:e.showJustTime?"aa h:mm":e.showTime?"yy\ub144 MMMM d\uc77c(eee) aa h:mm":"yy\ub144 MMMM d\uc77c(eee)",showTimeSelectOnly:e.showJustTime,timeFormat:"aa h:mm",timeInputLabel:"\uc785\ub825/\uc120\ud0dd",showTimeInput:e.showTime,timeIntervals:10})})}},9720:function(e,t,n){n.d(t,{Z:function(){return L}});var a=n(885),i="Attendance_student__zQCyC",r="Attendance_form-section__SmTcW",o="Attendance_date__PNNb3",s="Attendance_closeBtn__E609D",u="Attendance_datepick-explain__LXpeq",l="Attendance_holidayData__72cLY",c=n(3451),d=n(7313),f=n(5186),m=n(658),p=n.n(m),h=n(2982),v=n(4165),b=n(1413),_=n(5861),x=n(7287),g=n(4484),Z=n(7114),j=n.n(Z),S="AttendanceOption_option__04AUt",w="AttendanceOption_option-select__5pc8P",y="AttendanceOption_ul__HzrL4",C=n(6417),k=function(e){var t,n,i,r=(0,d.useState)((null===(t=e.selectOption)||void 0===t||null===(n=t[0])||void 0===n?void 0:n.value)||""),o=(0,a.Z)(r,2),s=o[0],u=o[1];(0,d.useEffect)((function(){e.showNote(s)}),[s]);var l=function(e){u(e.target.id+e.target.innerText)};return(0,C.jsx)("ul",{className:y,children:e.selectOption&&(null===(i=e.selectOption)||void 0===i?void 0:i.map((function(e){return(0,C.jsx)("li",{className:e.value===s?w:S,id:e.id,onClick:l,children:e.class},e.id)})))})},N=n(5729),A=n(7692),D=n(7121),F=n(650),M=n(573),I="AudioRecord_audio-controls__2Hajc",H="AudioRecord_audio__B9hmM",E="AudioRecord_audio-container__Q7SBV",O="AudioRecord_fileUploadBtn__9aPc1",R="AudioRecord_addRecordFile__J2UkD",Y="AudioRecord_downRecordFile__EhfPR",B="AudioRecord_audio-btns__0DaJq",T="audio/mp4",U=function(e){var t=(0,d.useState)(!1),n=(0,a.Z)(t,2),i=n[0],r=n[1],o=(0,d.useRef)(null),s=(0,d.useState)("inactive"),u=(0,a.Z)(s,2),l=u[0],c=u[1],f=(0,d.useState)(null),m=(0,a.Z)(f,2),h=m[0],b=m[1],x=(0,d.useState)([]),g=(0,a.Z)(x,2),Z=g[0],S=g[1],w=(0,d.useState)([]),y=(0,a.Z)(w,2),k=y[0],N=y[1],A=(0,d.useState)(null),D=(0,a.Z)(A,2),F=D[0],M=D[1],U=(0,d.useState)(null),q=(0,a.Z)(U,2),V=q[0],L=q[1],J=(0,d.useState)("00:00"),z=(0,a.Z)(J,2),K=z[0],P=z[1],W=function(){var e=(0,_.Z)((0,v.Z)().mark((function e(){var t;return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!("MediaRecorder"in window)){e.next=14;break}return e.prev=1,e.next=4,navigator.mediaDevices.getUserMedia({audio:!0,video:!1});case 4:t=e.sent,r(!0),b(t),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),j().fire("\uc5d0\ub7ec!","".concat(e.t0.message,", \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uba74 kerbong@gmail.com / \uc7bc\uc7bc-\uc774\uac70\ud574\uc694 \uc5d0 \uc54c\ub824\uc8fc\uc138\uc694!"),"warning");case 12:e.next=15;break;case 14:alert("\ud604\uc7ac \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc2e4\ud589\uc774 \ubd88\uac00\ub2a5\ud55c \uae30\ub2a5\uc785\ub2c8\ub2e4! \ud06c\ub86c\uc5d0\uc11c \uc2e4\ud589\ud574\uc8fc\uc138\uc694!");case 15:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}(),Q=function(){var e=(0,_.Z)((0,v.Z)().mark((function e(){var t,n;return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c("recording"),t=new MediaRecorder(h,{type:T}),o.current=t,o.current.start(),n=[],o.current.ondataavailable=function(e){"undefined"!==typeof e.data&&0!==e.data.size&&n.push(e.data)},S(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){c("inactive"),o.current.stop(),o.current.onstop=function(){var e=new Blob(Z,{type:T});N(e);var t=URL.createObjectURL(e);M(t),S([])}};(0,d.useEffect)((function(){var t,n;"recording"===l?(P("00:00"),null===V?(n=p()().format("YYYY-MM-DD HH:mm:ss"),L(n)):n=V,t=setInterval((function(){var e=p()().format("YYYY-MM-DD HH:mm:ss"),t=p()(e).diff(p()(n).format("YYYY-MM-DD HH:mm:ss"),"s"),a=Math.floor(+t/60),i=Math.floor(+t%60);a<10&&(a="0"+a),i<10&&(i="0"+i),P(a+":"+i)}),1e3)):"inactive"===l&&F&&(L(null),clearInterval(t),j().fire("\ub179\uc74c \uc885\ub8cc","\ub179\uc74c\uc774 \uc885\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc800\uc7a5\ud558\uc2dc\ub824\uba74 [\ud30c\uc77c\ucd94\uac00] \ub97c \ub204\ub974\uc2e0 \ud6c4, [\uc800\uc7a5]\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694!","warning"),e.uploadAudio(k));return function(){return clearInterval(t)}}),[l]);var X=function(e){j().fire("\uc2dc\uac04 \uc81c\ud55c","\uc790\ub3d9 \uc885\ub8cc\uae4c\uc9c0 ".concat(e,"\ubd84 \ub0a8\uc558\uc2b5\ub2c8\ub2e4."),"info")};(0,d.useEffect)((function(){null!==V&&("05:00"===K?X(3):"07:00"===K?X(1):"08:00"===K&&G())}),[K]);return(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)("div",{className:I,children:[(0,C.jsx)("div",{className:E,children:(0,C.jsx)("audio",{src:F,controls:!0,className:H})}),(0,C.jsxs)("div",{className:B,children:[K,"\ucd08"," ",i?null:(0,C.jsxs)("button",{onClick:W,type:"button",className:Y,children:[(0,C.jsx)("i",{className:"fa-solid fa-microphone"})," \ub9c8\uc774\ud06c \uad8c\ud55c"]}),i&&"inactive"===l?(0,C.jsxs)("button",{onClick:Q,type:"button",className:O,children:[(0,C.jsx)("i",{className:"fa-solid fa-record-vinyl"})," ",F?"\ub2e4\uc2dc\ub179\uc74c":"\ub179\uc74c"]}):null,"recording"===l?(0,C.jsxs)("button",{onClick:G,type:"button",className:O,children:[(0,C.jsx)("i",{className:"fa-regular fa-circle-stop"})," \uc911\uc9c0"]}):null]}),(0,C.jsx)("div",{className:B,children:F&&(0,C.jsx)(C.Fragment,{children:(0,C.jsx)("button",{onClick:function(){e.uploadAudio(k)},className:R,children:"\ud30c\uc77c \ucd94\uac00"})})})]})})},q=function(e){var t,n=(0,d.useState)(""),i=(0,a.Z)(n,2),r=i[0],o=i[1],s=(0,d.useState)(""),u=(0,a.Z)(s,2),l=u[0],c=u[1],f=(0,d.useState)(!1),m=(0,a.Z)(f,2),Z=m[0],S=m[1],w=(0,d.useState)(!1),y=(0,a.Z)(w,2),I=y[0],H=y[1],E=(0,d.useState)(!1),O=(0,a.Z)(E,2),R=O[0],Y=O[1],B=(0,d.useState)(!1),T=(0,a.Z)(B,2),q=T[0],V=T[1],L=(0,d.useState)(!1),J=(0,a.Z)(L,2),z=J[0],K=J[1],P=(0,d.useState)([]),W=(0,a.Z)(P,2),Q=W[0],G=W[1],X=(0,d.useState)(!1),$=(0,a.Z)(X,2),ee=$[0],te=$[1],ne=(0,d.useState)([]),ae=(0,a.Z)(ne,2),ie=ae[0],re=ae[1],oe=(0,d.useState)([]),se=(0,a.Z)(oe,2),ue=se[0],le=se[1],ce=(0,d.useRef)(null);(0,d.useEffect)((function(){!function(){var t=(0,M.JU)(F.wO,"attend",e.userUid);(0,M.cf)(t,(function(e){var t,n;G([]);var a=[];null===e||void 0===e||null===(t=e.data())||void 0===t||null===(n=t.attend_data)||void 0===n||n.forEach((function(e){a.push(e)})),G([].concat(a))}))}()}),[]);var de=function(e){return e.getFullYear()+"-"+("0"+(1+e.getMonth())).slice(-2)+"-"+("0"+e.getDate()).slice(-2)},fe=function(){var t=(0,_.Z)((0,v.Z)().mark((function t(n){var i,s,u,c,d,f,m,h,_,x,g,Z,w,y,C;return(0,v.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),i=document.getElementById("textArea").value,s=e.who.split(" "),u="","consulting"!==e.about){t.next=12;break}c=de(e.attendDate),k=e.attendDate,d=("0"+k.getHours()).slice(-2)+":"+("0"+k.getMinutes()).slice(-2),u=c+d+s[0],f={num:s[0],name:s[1],id:u,option:l,note:i,attachedFileUrl:r,related:ie},e.addData(f),t.next=26;break;case 12:if("attendance"!==e.about){t.next=26;break}if(Array.isArray(e.attendDate)?(_=(0,a.Z)(e.attendDate,2),m=_[0],h=_[1]):(m=e.attendDate,h=e.attendDate),0!==m.getDay()&&6!==m.getDay()){t.next=17;break}return j().fire({icon:"error",title:"\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694!",html:"\ud1a0 / \uc77c\uc694\uc77c\uc740 \uc800\uc7a5\uc774 \ubd88\uac00\ub2a5\ud569\ub2c8\ub2e4. <br>\ub0a0\uc9dc\ub97c \ud655\uc778, \ubcc0\uacbd\ud574\uc8fc\uc138\uc694",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"}),t.abrupt("return");case 17:if(x={num:s[0],name:s[1],option:l,note:i},"1\uad50\uc678\uccb4\ud5d8"===l||"3\uac00\uc815\ud559\uc2b5"===l?(x.request=R,x.report=q):x.paper=I,g=[],Z=m,m===h)w=de(m),u=w+s[0]+" "+p()().format("HH:mm"),g.push(u);else for(;Z<=h;)0===Z.getDay()||6===Z.getDay()||(y=de(Z),u=y+s[0]+" "+p()().format("HH:mm"),g.push(u)),Z.setDate(Z.getDate()+1);return C=JSON.parse(JSON.stringify(Q)),g.forEach((function(e){(null===Q||void 0===Q?void 0:Q.filter((function(t){var n,a,i;return(null===(n=t.id)||void 0===n||null===(a=n.split(" "))||void 0===a?void 0:a[0])===(null===e||void 0===e||null===(i=e.split(" "))||void 0===i?void 0:i[0])}))).length<3?C.push((0,b.Z)((0,b.Z)({},x),{},{id:e})):j().fire("\uc800\uc7a5 \uc2e4\ud328","\ucd9c\uacb0\uc790\ub8cc\ub294 \ud559\uc0dd\ub2f9 \ud558\ub8e8\uc5d0 3\uac1c \uae4c\uc9c0\ub9cc \uc800\uc7a5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","error")})),t.next=26,(0,M.pl)((0,M.JU)(F.wO,"attend",e.userUid),{attend_data:C});case 26:v="".concat(s[1]," \ud559\uc0dd\uc758 ").concat(l.slice(1)," \uc815\ubcf4\uac00 \uc800\uc7a5\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \n(5\ucd08 \ud6c4 \ucc3d\uc774 \uc790\ub3d9\uc73c\ub85c \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.)"),j().fire({icon:"success",title:"\uc800\uc7a5\ub418\uc5c8\uc5b4\uc694!",text:v,confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}),S(!1),o(""),e.onClose();case 30:case"end":return t.stop()}var v,k}),t)})));return function(e){return t.apply(this,arguments)}}(),me=function(){var t=(0,_.Z)((0,v.Z)().mark((function t(){var n,a,i,r,o,s,u,l,c;return(0,v.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=(0,M.JU)(F.wO,"attend",e.userUid),o=[],t.next=4,(0,M.QT)(r);case 4:if((s=t.sent).exists()&&(o=null===(u=s.data())||void 0===u?void 0:u.attend_data),o&&0!==(null===(n=o)||void 0===n?void 0:n.length)&&0!==(null===(a=e.students)||void 0===a?void 0:a.length)){t.next=8;break}return t.abrupt("return");case 8:l=null===(i=o)||void 0===i?void 0:i.filter((function(t){var n,a,i,r;return(null===t||void 0===t?void 0:t.name)===(null===(n=e.who)||void 0===n||null===(a=n.split(" "))||void 0===a?void 0:a[1])&&(null===t||void 0===t?void 0:t.num)===(null===(i=e.who)||void 0===i||null===(r=i.split(" "))||void 0===r?void 0:r[0])})),c=[],null===l||void 0===l||l.forEach((function(e){c.push(e.option)})),le(c);case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(0,d.useEffect)((function(){"attendance"===e.about&&me()}),[e.students]),(0,C.jsxs)(C.Fragment,{children:[ee&&(0,C.jsx)(D.Z,{who:e.who,confirmBtnHandler:function(){return te(!1)},studentClickHandler:function(t){return function(t){var n,a=t.target.innerText,i=(0,h.Z)(ie);if(a!==e.who){var r;null!==(n=i)&&void 0!==n&&n.includes(a)?i=null===(r=i)||void 0===r?void 0:r.filter((function(e){return e!==a})):i.push(a),re(i)}}(t)},students:e.students,isSubject:e.isSubject,relatedStudent:ie,closeModalHandler:function(){te(!1),re([])}}),(0,C.jsx)(k,{selectOption:e.selectOption,showNote:function(e){S(!0),c(e)}}),"attendance"===e.about&&(null===ue||void 0===ue?void 0:ue.length)>0&&(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)("span",{className:x.Z.optionsSet,children:[(0,C.jsx)("span",{className:x.Z.optionsSet,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0\uc815\ubcf4:"}),null===(t=(0,h.Z)(new Set(ue)))||void 0===t?void 0:t.map((function(e){return(0,C.jsxs)("span",{className:x.Z.optionsSet,children:["\ud83d\ude42",null===e||void 0===e?void 0:e.slice(1)," ",null===ue||void 0===ue?void 0:ue.filter((function(t){return t===e})).length,"\uc77c"]},"optionSet-".concat(e))}))]})}),"attendance"===e.about&&0===(null===ue||void 0===ue?void 0:ue.length)&&(0,C.jsx)("span",{className:x.Z.optionsSet,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0 \uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"}),"consulting"===e.about&&(0,C.jsxs)("div",{className:x.Z.btnArea,children:[(0,C.jsxs)("div",{className:x.Z.relStdArea,children:[(0,C.jsx)("b",{children:"\uc120\ud0dd\ub41c \uad00\ub828\ud559\uc0dd"}),(0,C.jsx)("div",{className:x.Z.relStdShowDiv,children:(null===ie||void 0===ie?void 0:ie.length)>0&&(null===ie||void 0===ie?void 0:ie.map((function(e){return(0,C.jsx)("span",{className:x.Z["margin-5"],children:e},e)})))})]}),(0,C.jsx)(A.Z,{className:"consult-relatedStdBtn",name:"\uad00\ub828\ud559\uc0dd",onclick:function(){te(!ee)}})]}),Z&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)("form",{id:"area-form",className:x.Z.form,onSubmit:fe,children:["attendance"===e.about&&(0,C.jsx)(C.Fragment,{children:"1\uad50\uc678\uccb4\ud5d8"===l||"3\uac00\uc815\ud559\uc2b5"===l?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(A.Z,{className:R?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),Y((function(e){return!e}))},title:"\uc2e0\uccad\uc11c",name:"\uc2e0\uccad\uc11c"}),(0,C.jsx)(A.Z,{className:q?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),V((function(e){return!e}))},title:"\ubcf4\uace0\uc11c",name:"\ubcf4\uace0\uc11c"})]}):(0,C.jsx)(C.Fragment,{children:(0,C.jsx)(A.Z,{className:I?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),H((function(e){return!e}))},title:"\uc11c\ub958",name:"\uc11c\ub958"})})}),(0,C.jsx)(g.Z,{ref:ce,id:"textArea",className:"attendForm-input",label:"inputData",input:{type:"textarea",placeholder:"\ube44\uace0\ub97c \uc785\ub825\ud558\uc138\uc694.",autoFocus:!0},defaultValue:"",onInput:function(t){return function(t){var n;"consulting"===e.about?n=4e3:"attendance"===e.about&&(n=30),t.target.value.length>n&&(t.target.value=t.target.value.substr(0,n),j().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uc785\ub825\ud55c \ub0b4\uc6a9\uc744 \uc904\uc5ec\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))}(t)}})]}),(0,C.jsx)("div",{className:x.Z.btnArea,style:{justifyContent:"center"},children:"consulting"===e.about?(0,C.jsx)(C.Fragment,{children:z?(0,C.jsx)(N.Z,{about:e.about,attachedFileHandler:function(e){o(e)}}):(0,C.jsx)(U,{userUid:e.userUid,uploadAudio:function(e){o(e)}})}):(0,C.jsx)(N.Z,{about:e.about,attachedFileHandler:function(e){o(e)}})}),(0,C.jsxs)("div",{className:x.Z.btnArea,style:"attendance"===e.about?{justifyContent:"center"}:{},children:["consulting"===e.about&&(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)("button",{className:x.Z.btn,onClick:function(){return K((function(e){return!e}))},style:{fontSize:"1em"},children:[(0,C.jsx)("i",{className:"fa-solid fa-rotate"})," ",z?"\uc624\ub514\uc624 \ub179\uc74c\ud558\uae30":"\uc0ac\uc9c4 \uc62c\ub9ac\uae30"]})}),(0,C.jsx)("button",{className:x.Z.btn,onClick:fe,style:"attendance"===e.about?{width:"98%"}:{width:"50%"},children:"\uc800\uc7a5"})]})]})]})},V=n(7984),L=function(e){var t=(0,d.useState)(new Date),n=(0,a.Z)(t,2),m=n[0],h=n[1],v=(0,d.useState)(!1),b=(0,a.Z)(v,2),_=b[0],x=b[1],g=(0,d.useState)(p()().format("YYYY-MM")),Z=(0,a.Z)(g,2),j=Z[0],S=Z[1],w=function(e){S(p()(e).format("YYYY-MM"))};return(0,d.useEffect)((function(){"consulting"===e.about&&j&&(null===V.Z||void 0===V.Z||V.Z.forEach((function(e){if(e[0]===j){var t=e[1].split("*"),n=document.querySelectorAll(t[0])[0];if(!n)return;if(n.classList.contains("eventAdded"))return;var a=document.createElement("button");a.className="".concat(l," eventBtn"),a.innerText=t[1],null===n||void 0===n||n.appendChild(a),n.style.borderRadius="5px",n.classList.add("eventAdded")}})))}),[j,_]),(0,d.useEffect)((function(){if("attendance"!==e.about){var t=document.querySelector(".react-datepicker__day-names"),n=document.querySelectorAll(".react-datepicker__day-name");t&&n&&(t.style.width="95%",n[0].style.width="14%",n[6].style.width="14%")}}),[_]),(0,C.jsxs)(c.Z,{onClose:e.onClose,addStyle:"attendHeight",children:[(0,C.jsxs)("div",{className:i,children:[(0,C.jsxs)("span",{children:[" ",e.who," "]}),(0,C.jsx)("span",{className:s,onClick:e.onClose,children:(0,C.jsx)("i",{className:"fa-regular fa-circle-xmark"})})]}),(0,C.jsxs)("div",{className:o,onClick:function(){return x((function(e){return!e}))},children:[" ",(0,C.jsx)(f.Z,{filterNone:"consulting"===e.about&&!0,getDateValue:function(e){h(e)},about:e.about,isSubject:e.isSubject,getMonthValue:w,getYearValue:w})]}),(0,C.jsx)("div",{className:u,children:"attendance"===e.about&&"*\uc2dc\uc791 \ub0a0\uc9dc\uc640 \ub05d \ub0a0\uc9dc\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"}),(0,C.jsx)("div",{className:r,children:(0,C.jsx)(q,{id:e.id,selectOption:e.selectOption,students:e.students,attendDate:m,about:e.about,addData:function(t){return e.addData(t)},userUid:e.userUid,who:e.who,onClose:e.onClose})})]})}},7121:function(e,t,n){n(7313);var a=n(3451),i=n(3776),r=n(7287),o=n(7692),s=n(6417);t.Z=function(e){var t,n;return(0,s.jsxs)(a.Z,{onClose:e.closeModalHandler,children:[e.who,(0,s.jsxs)("h2",{className:r.Z.btnArea,children:["\uad00\ub828\ud559\uc0dd \ub4f1\ub85d",(0,s.jsxs)("div",{children:[(0,s.jsx)(o.Z,{name:"\ucde8\uc18c",className:"student-add",style:{width:"50px",backgroundColor:"#ff6600a6"},onclick:function(){e.closeModalHandler()}}),(0,s.jsx)(o.Z,{name:"\ud655\uc778",style:{width:"50px",backgroundColor:"#ff6600a6"},className:"student-add",onclick:e.confirmBtnHandler})]})]}),(null===(t=e.relatedStudent)||void 0===t?void 0:t.length)>0&&(0,s.jsx)("div",{className:r.Z.relStdShowDiv,children:null===(n=e.relatedStudent)||void 0===n?void 0:n.map((function(e){return(0,s.jsx)("span",{className:r.Z["margin-5"],children:e},e)}))}),(0,s.jsx)(i.Z,{students:e.students,showOption:e.studentClickHandler,isSubject:e.isSubject})]})}},5729:function(e,t,n){n.d(t,{Z:function(){return c}});var a=n(885),i=n(7313),r="FileArea_fileArea__MQmcW",o="FileArea_a__PHHp8",s="FileArea_img__qKac6",u=n(7785),l=n(6417),c=function(e){var t=(0,i.useState)(e.file||""),n=(0,a.Z)(t,2),c=n[0],d=n[1],f=(0,i.useState)(!1),m=(0,a.Z)(f,2),p=m[0],h=m[1];return(0,l.jsxs)("div",{className:r,children:[c&&!p?(0,l.jsx)("img",{src:c,alt:"filePreview",onError:function(){h(!0)},className:s}):c&&(0,l.jsx)("a",{href:c,target:"_blank",rel:"noopener noreferrer",className:o,children:"\ud30c\uc77c \ub2e4\uc6b4\ubc1b\uae30"}),"attendance"!==e.about&&(0,l.jsx)(u.Z,{attachedFileHandler:function(t){e.attachedFileHandler(t),d(t)},src:c,about:e.about})]})}},7785:function(e,t,n){n.d(t,{Z:function(){return f}});var a=n(4165),i=n(5861),r=n(885),o=n(7313),s="FileForm_fileUploadBtn__r9msD",u=n(2964),l=n(7114),c=n.n(l),d=n(6417),f=function(e){var t=(0,o.useState)(e.src||""),n=(0,r.Z)(t,2),l=n[0],f=n[1],m=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t){var n,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,5,n=["application/pdf","application/x-hwp","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],!(t.size<=5242880&&n.includes(t.type))){e.next=7;break}return e.abrupt("return",t);case 7:return i={maxSizeMb:2,maxWidthOrHeight:1920},e.next=10,(0,u.Z)(t,i);case 10:return e.abrupt("return",e.sent);case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0),c().fire("\uc5c5\ub85c\ub4dc \uc2e4\ud328","\uc5c5\ub85c\ub4dc\uc5d0 \ubb38\uc81c\uac00 \uc0dd\uacbc\uc2b5\ub2c8\ub2e4. \ud30c\uc77c\uc758 \ud06c\uae30\uac00 5Mb \uc774\uc0c1\uc774\uac70\ub098 \ucc98\ub9ac \uacfc\uc815\uc5d0 \ubb38\uc81c\uac00 \uc0dd\uae38 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc774\ubbf8\uc9c0 \ud30c\uc77c\ub85c \uc5c5\ub85c\ub4dc \ud558\uc2dc\uba74 \ud3b8\ub9ac\ud569\ub2c8\ub2e4.","warning");case 17:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}(),p=function(){var t=(0,i.Z)((0,a.Z)().mark((function t(n){var i,r,o;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(i=n.target.files[0])){t.next=12;break}if((r=new FileReader).onloadend=function(t){f(t.currentTarget.result),e.attachedFileHandler(t.currentTarget.result)},!i.type.startsWith("image/")){t.next=11;break}return t.next=7,m(i);case 7:o=t.sent,r.readAsDataURL(o),t.next=12;break;case 11:r.readAsDataURL(i);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("label",{id:"attachedFile",htmlFor:"attachFile",className:s,onClick:function(){l&&f("")},style:"padIt"===e.about?{backgroundColor:"#687f7f"}:{},children:["meetSum"===e.about&&(0,d.jsx)(d.Fragment,{children:l?"\ucd08\uae30\ud654 & \ud30c\uc77c \ubcc0\uacbd":"\ud30c\uc77c \ucd94\uac00"}),"meetSum"!==e.about&&(0,d.jsx)(d.Fragment,{children:l?"\ucd08\uae30\ud654 & \uc774\ubbf8\uc9c0 \ubcc0\uacbd":"\uc774\ubbf8\uc9c0 \ucd94\uac00"})]}),(0,d.jsx)("input",{type:"file",accept:".pdf,.hwp,.xls,.xlsx,image/*",onChange:p,style:{display:"none"},id:"attachFile"})]})}},4484:function(e,t,n){n.d(t,{Z:function(){return l}});var a=n(1413),i=n(885),r=n(7313),o={"class-subject":"Input_class-subject__E+qGy","rowcolumn-input":"Input_rowcolumn-input__MzKWZ","simsim-Text":"Input_simsim-Text__7+u+1","meetSum-Text":"Input_meetSum-Text__0ijY3","class-memo":"Input_class-memo__eXBTy","attendForm-input":"Input_attendForm-input__KLvku","memo-section":"Input_memo-section__CGRYR","simsimMain-input":"Input_simsimMain-input__TVHos","board-input":"Input_board-input__2xPzk","board-input-half":"Input_board-input-half__Lu9st","fs-80px":"Input_fs-80px__t0quj","fs-70px":"Input_fs-70px__ZcOO7","fs-60px":"Input_fs-60px__QNEgw","fs-50px":"Input_fs-50px__GEaU0","fs-40px":"Input_fs-40px__OICBO","memoAdd-textarea":"Input_memoAdd-textarea__dssNI","gptResult-input":"Input_gptResult-input__6i8It"},s=n(6417),u=void 0,l=r.forwardRef((function(e,t){var n=(0,r.useRef)(null),l=(0,r.useState)(""),c=(0,i.Z)(l,2),d=c[0],f=c[1],m=(0,r.useState)(""),p=(0,i.Z)(m,2),h=p[0],v=p[1];(0,r.useEffect)((function(){f("")}),[]),(0,r.useEffect)((function(){f(e.defaultValue)}),[e.defaultValue]);var b=function(t){f(n.current.value),e.getValue&&e.getValueHandler(t)};(0,r.useEffect)((function(){!0===e.showOn?v("1"):!1===e.showOn?v("0"):v(e.showOn)}),[e.showOn]),(0,r.useEffect)((function(){"textarea"===e.input.type&&_()}),[h]),(0,r.useEffect)((function(){n.current.style.height=e.startheight}),[e.startheight]);var _=function(t){null!==n&&null!==n.current&&(e.alarm||(n.current.style.height="10px",n.current.style.height=n.current.scrollHeight-13+"px"))};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("label",{htmlFor:e.input.id}),"textarea"===e.input.type?(0,s.jsx)("textarea",(0,a.Z)((0,a.Z)({id:e.id,ref:n},e.input),{},{className:o[e.className],onKeyDown:function(){return _(u)},onKeyUp:function(){return _(u)},onClick:function(){return _(u)},value:d||"",onInput:e.onInput,required:!!e.required,onChange:b,placeholder:e.placeholder||""}),"textArea"+e.myKey):(0,s.jsx)("input",(0,a.Z)((0,a.Z)({id:e.input.id,type:e.input.type,required:!!e.required,className:o[e.className],onInput:e.onInput,ref:n},e.input),{},{value:d||"",onChange:b,placeholder:e.placeholder||""}),e.myKey)]})}))},3776:function(e,t,n){n.d(t,{Z:function(){return o}});n(7313);var a="Student_div__ROh5A",i=n(7405),r=n(6417),o=function(e){var t;return(0,r.jsx)("div",{className:a,children:e.students&&(null===(t=e.students)||void 0===t?void 0:t.map((function(t){var n;return(0,r.jsx)(i.Z,{className:e.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(n=e.passStudent)||void 0===n?void 0:n.split(" ")[1])===t.name,manageEach:e.manageEach,name:t.name,num:t.num,woman:t.woman,onShowOption:function(t){e.showOption(t),t.target+="add"}},t.num)})))})}},7405:function(e,t,n){n.d(t,{Z:function(){return r}});n(7313);var a={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"},i=n(6417),r=function(e){return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("button",{className:"".concat(a[e.className]," ").concat(e.classAdd&&"clicked"," ").concat(!e.woman&&a.woman),id:"std-".concat(e.num," ").concat(e.name),onClick:function(t){e.onShowOption(t)},title:null===e||void 0===e?void 0:e.title,children:[e.num," ",e.name]},"stdBtn-".concat(e.num," ").concat(e.name))})}},7984:function(e,t){t.Z=[["2023-03",'div[aria-label="Choose 2023\ub144 3\uc6d4 1\uc77c \uc218\uc694\uc77c"]*3.1\uc808'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 5\uc77c \uae08\uc694\uc77c"]*\uc5b4\ub9b0\uc774\ub0a0'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 29\uc77c \uc6d4\uc694\uc77c"]*\uc11d\uac00\ud0c4\uc2e0\uc77c'],["2023-06",'div[aria-label="Choose 2023\ub144 6\uc6d4 6\uc77c \ud654\uc694\uc77c"]*\ud604\ucda9\uc77c'],["2023-08",'div[aria-label="Choose 2023\ub144 8\uc6d4 15\uc77c \ud654\uc694\uc77c"]*\uad11\ubcf5\uc808'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 28\uc77c \ubaa9\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 29\uc77c \uae08\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 2\uc77c \uc6d4\uc694\uc77c"]*\uc784\uc2dc\uacf5\ud734\uc77c'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 3\uc77c \ud654\uc694\uc77c"]*\uac1c\ucc9c\uc808'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 9\uc77c \uc6d4\uc694\uc77c"]*\ud55c\uae00\ub0a0'],["2023-12",'div[aria-label="Choose 2023\ub144 12\uc6d4 25\uc77c \uc6d4\uc694\uc77c"]*\uc131\ud0c4\uc808'],["2024-01",'div[aria-label="Choose 2024\ub144 1\uc6d4 1\uc77c \uc6d4\uc694\uc77c"]*\uc0c8\ud574'],["2024-02",'div[aria-label="Choose 2024\ub144 2\uc6d4 9\uc77c \uae08\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2024-02",'div[aria-label="Choose 2024\ub144 2\uc6d4 12\uc77c \uc6d4\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2024-03",'div[aria-label="Choose 2024\ub144 3\uc6d4 1\uc77c \uae08\uc694\uc77c"]*\uc0bc\uc77c\uc808'],["2024-04",'div[aria-label="Choose 2024\ub144 4\uc6d4 10\uc77c \uc218\uc694\uc77c"]*\uad6d\ud68c\uc120\uac70'],["2024-05",'div[aria-label="Choose 2024\ub144 5\uc6d4 6\uc77c \uc6d4\uc694\uc77c"]*\uc5b4\ub9b0\uc774\ub0a0\ub300\uccb4'],["2024-05",'div[aria-label="Choose 2024\ub144 5\uc6d4 15\uc77c \uc218\uc694\uc77c"]*\ubd80\ucc98\ub2d8\uc624\uc2e0\ub0a0'],["2024-06",'div[aria-label="Choose 2024\ub144 6\uc6d4 6\uc77c \ubaa9\uc694\uc77c"]*\ud604\ucda9\uc77c'],["2024-08",'div[aria-label="Choose 2024\ub144 8\uc6d4 15\uc77c \ubaa9\uc694\uc77c"]*\uad11\ubcf5\uc808'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 16\uc77c \uc6d4\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 17\uc77c \ud654\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 18\uc77c \uc218\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-10",'div[aria-label="Choose 2024\ub144 10\uc6d4 3\uc77c \ubaa9\uc694\uc77c"]*\uac1c\ucc9c\uc808'],["2024-10",'div[aria-label="Choose 2024\ub144 10\uc6d4 9\uc77c \uc218\uc694\uc77c"]*\ud55c\uae00\ub0a0'],["2024-12",'div[aria-label="Choose 2024\ub144 12\uc6d4 25\uc77c \uc218\uc694\uc77c"]*\ud06c\ub9ac\uc2a4\ub9c8\uc2a4'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 1\uc77c \uc218\uc694\uc77c"]*\uc2e0\uc815'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 28\uc77c \ud654\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 29\uc77c \uc218\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 30\uc77c \ubaa9\uc694\uc77c"]*\uc124\uc5f0\ud734']]},7287:function(e,t){t.Z={form:"AttendanceForm_form__d8p8O",input:"AttendanceForm_input__euFwF",relStdShowDiv:"AttendanceForm_relStdShowDiv__McyvL",relStdArea:"AttendanceForm_relStdArea__kWci2","margin-5":"AttendanceForm_margin-5__6jnTk",btn:"AttendanceForm_btn__VV+7-",btnArea:"AttendanceForm_btnArea__eGu5D",optionsSet:"AttendanceForm_optionsSet__qPsn2"}}}]);