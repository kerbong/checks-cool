"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[798],{5186:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(885),r=n(7313),i=n(1378),o=n.n(i),s=(n(658),n(2632),n(1560)),c=n(6417),u=function(e){var t=(0,r.useState)(e.setStart||new Date),n=(0,a.Z)(t,2),i=n[0],u=n[1],l=(0,r.useState)(i),d=(0,a.Z)(l,2),f=d[0],m=d[1];(0,r.useEffect)((function(){"main"===e.about&&u(e.setStart)}),[e.setStart]);var h=r.forwardRef((function(e,t){var n=e.value,a=e.onClick;return(0,c.jsx)("button",{className:"custom-input",onClick:a,ref:t,children:n})}));return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(o(),{selected:i,onChange:function(t){if("attendance"===e.about){var n=(0,a.Z)(t,2),r=n[0],i=n[1];u(r),m(i)}else u(t);e.getDateValue(t)},filterDate:function(t){if(e.filterNone)return t;var n=t.getDay(t);return 0!==n&&6!==n},startDate:i,showMonthDropdown:!0,onMonthChange:function(t){e.getMonthValue(t)},dateFormatCalendar:"yyyy\ub144 ",endDate:"attendance"===e.about&&f,selectsRange:"attendance"===e.about&&!0,disabledKeyboardNavigation:!0,highlightDates:e.highlight,customInput:(0,c.jsx)(h,{}),fixedHeight:e.fixedHeight,inline:e.inline,locale:s.Z,dateFormat:"yy\ub144 MMMM d\uc77c(eee)"})})}},9720:function(e,t,n){n.d(t,{Z:function(){return q}});var a=n(885),r="Attendance_student__zQCyC",i="Attendance_form-section__SmTcW",o="Attendance_date__PNNb3",s="Attendance_closeBtn__E609D",c="Attendance_datepick-explain__LXpeq",u="Attendance_holidayData__72cLY",l=n(3451),d=n(7313),f=n(5186),m=n(658),h=n.n(m),p=n(2982),v=n(4165),x=n(1413),_=n(5861),b=n(7287),g=n(4484),j=n(7114),Z=n.n(j),S="AttendanceOption_option__04AUt",w="AttendanceOption_option-select__5pc8P",N="AttendanceOption_ul__HzrL4",y=n(6417),k=function(e){var t,n=(0,d.useState)(""),r=(0,a.Z)(n,2),i=r[0],o=r[1],s=function(t){o(t.target.id+t.target.innerText),e.showNote(t.target.id+t.target.innerText)};return(0,y.jsx)("ul",{className:N,children:e.selectOption&&(null===(t=e.selectOption)||void 0===t?void 0:t.map((function(e){return(0,y.jsx)("li",{className:e.value===i?w:S,id:e.id,onClick:s,children:e.class},e.id)})))})},C=n(5729),A=n(7692),D=n(7121),F=n(650),M=n(573),E="AudioRecord_audio-controls__2Hajc",O="AudioRecord_audio__B9hmM",H="AudioRecord_audio-container__Q7SBV",R="AudioRecord_fileUploadBtn__9aPc1",I="AudioRecord_addRecordFile__J2UkD",Y="AudioRecord_downRecordFile__EhfPR",B="AudioRecord_audio-btns__0DaJq",U="audio/mp4",T=function(e){var t=(0,d.useState)(!1),n=(0,a.Z)(t,2),r=n[0],i=n[1],o=(0,d.useRef)(null),s=(0,d.useState)("inactive"),c=(0,a.Z)(s,2),u=c[0],l=c[1],f=(0,d.useState)(null),m=(0,a.Z)(f,2),p=m[0],x=m[1],b=(0,d.useState)([]),g=(0,a.Z)(b,2),j=g[0],S=g[1],w=(0,d.useState)([]),N=(0,a.Z)(w,2),k=N[0],C=N[1],A=(0,d.useState)(null),D=(0,a.Z)(A,2),F=D[0],M=D[1],T=(0,d.useState)(null),z=(0,a.Z)(T,2),V=z[0],q=z[1],L=(0,d.useState)("00:00"),P=(0,a.Z)(L,2),W=P[0],J=P[1],K=function(){var e=(0,_.Z)((0,v.Z)().mark((function e(){var t;return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!("MediaRecorder"in window)){e.next=14;break}return e.prev=1,e.next=4,navigator.mediaDevices.getUserMedia({audio:!0,video:!1});case 4:t=e.sent,i(!0),x(t),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),Z().fire("\uc5d0\ub7ec!","".concat(e.t0.message,", \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uba74 kerbong@gmail.com / \uc7bc\uc7bc-\uc774\uac70\ud574\uc694 \uc5d0 \uc54c\ub824\uc8fc\uc138\uc694!"),"warning");case 12:e.next=15;break;case 14:alert("\ud604\uc7ac \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc2e4\ud589\uc774 \ubd88\uac00\ub2a5\ud55c \uae30\ub2a5\uc785\ub2c8\ub2e4! \ud06c\ub86c\uc5d0\uc11c \uc2e4\ud589\ud574\uc8fc\uc138\uc694!");case 15:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=(0,_.Z)((0,v.Z)().mark((function e(){var t,n;return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l("recording"),t=new MediaRecorder(p,{type:U}),o.current=t,o.current.start(),n=[],o.current.ondataavailable=function(e){"undefined"!==typeof e.data&&0!==e.data.size&&n.push(e.data)},S(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Q=function(){l("inactive"),o.current.stop(),o.current.onstop=function(){var e=new Blob(j,{type:U});C(e);var t=URL.createObjectURL(e);M(t),S([])}};(0,d.useEffect)((function(){var t,n;"recording"===u?(J("00:00"),null===V?(n=h()().format("YYYY-MM-DD HH:mm:ss"),q(n)):n=V,t=setInterval((function(){var e=h()().format("YYYY-MM-DD HH:mm:ss"),t=h()(e).diff(h()(n).format("YYYY-MM-DD HH:mm:ss"),"s"),a=Math.floor(+t/60),r=Math.floor(+t%60);a<10&&(a="0"+a),r<10&&(r="0"+r),J(a+":"+r)}),1e3)):"inactive"===u&&F&&(q(null),clearInterval(t),Z().fire("\ub179\uc74c \uc885\ub8cc","\ub179\uc74c\uc774 \uc885\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc800\uc7a5\ud558\uc2dc\ub824\uba74 [\ud30c\uc77c\ucd94\uac00] \ub97c \ub204\ub974\uc2e0 \ud6c4, [\uc800\uc7a5]\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694!","warning"),e.uploadAudio(k));return function(){return clearInterval(t)}}),[u]);var X=function(e){Z().fire("\uc2dc\uac04 \uc81c\ud55c","\uc790\ub3d9 \uc885\ub8cc\uae4c\uc9c0 ".concat(e,"\ubd84 \ub0a8\uc558\uc2b5\ub2c8\ub2e4."),"info")};(0,d.useEffect)((function(){null!==V&&("05:00"===W?X(3):"07:00"===W?X(1):"08:00"===W&&Q())}),[W]);return(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)("div",{className:E,children:[(0,y.jsx)("div",{className:H,children:(0,y.jsx)("audio",{src:F,controls:!0,className:O})}),(0,y.jsxs)("div",{className:B,children:[W,"\ucd08"," ",r?null:(0,y.jsxs)("button",{onClick:K,type:"button",className:Y,children:[(0,y.jsx)("i",{className:"fa-solid fa-microphone"})," \ub9c8\uc774\ud06c \uad8c\ud55c"]}),r&&"inactive"===u?(0,y.jsxs)("button",{onClick:G,type:"button",className:R,children:[(0,y.jsx)("i",{className:"fa-solid fa-record-vinyl"})," ",F?"\ub2e4\uc2dc\ub179\uc74c":"\ub179\uc74c"]}):null,"recording"===u?(0,y.jsxs)("button",{onClick:Q,type:"button",className:R,children:[(0,y.jsx)("i",{className:"fa-regular fa-circle-stop"})," \uc911\uc9c0"]}):null]}),(0,y.jsx)("div",{className:B,children:F&&(0,y.jsx)(y.Fragment,{children:(0,y.jsx)("button",{onClick:function(){e.uploadAudio(k)},className:I,children:"\ud30c\uc77c \ucd94\uac00"})})})]})})},z=function(e){var t=(0,d.useState)(""),n=(0,a.Z)(t,2),r=n[0],i=n[1],o=(0,d.useState)(""),s=(0,a.Z)(o,2),c=s[0],u=s[1],l=(0,d.useState)(!1),f=(0,a.Z)(l,2),m=f[0],h=f[1],j=(0,d.useState)(!1),S=(0,a.Z)(j,2),w=S[0],N=S[1],E=(0,d.useState)(!0),O=(0,a.Z)(E,2),H=O[0],R=O[1],I=(0,d.useState)([]),Y=(0,a.Z)(I,2),B=Y[0],U=Y[1],z=(0,d.useState)(!1),V=(0,a.Z)(z,2),q=V[0],L=V[1],P=(0,d.useState)([]),W=(0,a.Z)(P,2),J=W[0],K=W[1],G=(0,d.useRef)(null);(0,d.useEffect)((function(){!function(){var t=(0,M.JU)(F.wO,"attend",e.userUid);(0,M.cf)(t,(function(e){var t,n;U([]);var a=[];null===e||void 0===e||null===(t=e.data())||void 0===t||null===(n=t.attend_data)||void 0===n||n.forEach((function(e){a.push(e)})),U([].concat(a))}))}()}),[]);var Q=function(e){return e.getFullYear()+"-"+("0"+(1+e.getMonth())).slice(-2)+"-"+("0"+e.getDate()).slice(-2)},X=function(){var t=(0,_.Z)((0,v.Z)().mark((function t(n){var o,s,u,l,d,f,m,p,_,b,g,j,S,N,y;return(0,v.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),o=document.getElementById("textArea").value,s=e.who.split(" "),u="","consulting"!==e.about){t.next=12;break}l=Q(e.attendDate),k=e.attendDate,d=("0"+k.getHours()).slice(-2)+":"+("0"+k.getMinutes()).slice(-2),u=l+d+s[0],f={num:s[0],name:s[1],id:u,option:c,note:o,attachedFileUrl:r,related:J},e.addData(f),t.next=25;break;case 12:if("attendance"!==e.about){t.next=25;break}if(Array.isArray(e.attendDate)?(_=(0,a.Z)(e.attendDate,2),m=_[0],p=_[1]):(m=e.attendDate,p=e.attendDate),0!==m.getDay()&&6!==m.getDay()){t.next=17;break}return Z().fire({icon:"error",title:"\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694!",html:"\ud1a0 / \uc77c\uc694\uc77c\uc740 \uc800\uc7a5\uc774 \ubd88\uac00\ub2a5\ud569\ub2c8\ub2e4. <br>\ub0a0\uc9dc\ub97c \ud655\uc778, \ubcc0\uacbd\ud574\uc8fc\uc138\uc694",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"}),t.abrupt("return");case 17:if(b={num:s[0],name:s[1],option:c,note:o,paper:w},g=[],j=m,m===p)S=Q(m),u=S+s[0],g.push(u);else for(;j<=p;)0===j.getDay()||6===j.getDay()||(N=Q(j),u=N+s[0],g.push(u)),j.setDate(j.getDate()+1);return y=JSON.parse(JSON.stringify(B)),g.forEach((function(e){0===(null===B||void 0===B?void 0:B.filter((function(t){return t.id===e}))).length&&y.push((0,x.Z)((0,x.Z)({},b),{},{id:e}))})),t.next=25,(0,M.pl)((0,M.JU)(F.wO,"attend",e.userUid),{attend_data:y});case 25:v="".concat(s[1]," \ud559\uc0dd\uc758 ").concat(c.slice(1)," \uc815\ubcf4\uac00 \uc800\uc7a5\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \n(5\ucd08 \ud6c4 \ucc3d\uc774 \uc790\ub3d9\uc73c\ub85c \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.)"),Z().fire({icon:"success",title:"\uc800\uc7a5\ub418\uc5c8\uc5b4\uc694!",text:v,confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}),h(!1),i(""),e.onClose();case 29:case"end":return t.stop()}var v,k}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,y.jsxs)(y.Fragment,{children:[q&&(0,y.jsx)(D.Z,{who:e.who,confirmBtnHandler:function(){return L(!1)},studentClickHandler:function(t){return function(t){var n,a=t.target.innerText,r=(0,p.Z)(J);if(a!==e.who){var i;null!==(n=r)&&void 0!==n&&n.includes(a)?r=null===(i=r)||void 0===i?void 0:i.filter((function(e){return e!==a})):r.push(a),K(r)}}(t)},students:e.students,isSubject:e.isSubject,relatedStudent:J,closeModalHandler:function(){L(!1),K([])}}),(0,y.jsx)(k,{selectOption:e.selectOption,showNote:function(e){h(!0),u(e)}}),"consulting"===e.about&&(0,y.jsxs)("div",{className:b.Z.btnArea,children:[(0,y.jsxs)("div",{className:b.Z.relStdArea,children:[(0,y.jsx)("b",{children:"\uc120\ud0dd\ub41c \uad00\ub828\ud559\uc0dd"}),(0,y.jsx)("div",{className:b.Z.relStdShowDiv,children:(null===J||void 0===J?void 0:J.length)>0&&(null===J||void 0===J?void 0:J.map((function(e){return(0,y.jsx)("span",{className:b.Z["margin-5"],children:e},e)})))})]}),(0,y.jsx)(A.Z,{className:"consult-relatedStdBtn",name:"\uad00\ub828\ud559\uc0dd",onclick:function(){L(!q)}})]}),m&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("form",{id:"area-form",className:b.Z.form,onSubmit:X,children:["attendance"===e.about&&(0,y.jsx)(A.Z,{className:w?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),N((function(e){return!e}))},name:"\uc11c\ub958",icon:(0,y.jsx)("span",{children:(0,y.jsx)("i",{className:"fa-solid fa-circle-check"})})}),(0,y.jsx)(g.Z,{ref:G,id:"textArea",className:"attendForm-input",label:"inputData",input:{type:"textarea",placeholder:"\ube44\uace0\ub97c \uc785\ub825\ud558\uc138\uc694.",autoFocus:!0},defaultValue:"",onInput:function(t){return function(t){var n;"consulting"===e.about?n=500:"attendance"===e.about&&(n=30),t.target.value.length>n&&(t.target.value=t.target.value.substr(0,n),Z().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uc785\ub825\ud55c \ub0b4\uc6a9\uc744 \uc904\uc5ec\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))}(t)}})]}),(0,y.jsxs)("div",{className:b.Z.btnArea,children:["consulting"===e.about?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("button",{className:b.Z.btn,onClick:function(){return R((function(e){return!e}))},children:(0,y.jsx)("i",{className:"fa-solid fa-rotate"})}),H?(0,y.jsx)(C.Z,{about:e.about,attachedFileHandler:function(e){i(e)}}):(0,y.jsx)(T,{userUid:e.userUid,uploadAudio:function(e){i(e)}})]}):(0,y.jsx)(C.Z,{about:e.about,attachedFileHandler:function(e){i(e)}}),(0,y.jsx)("button",{className:b.Z.btn,onClick:X,children:"\uc800\uc7a5"})]})]})]})},V=n(7984),q=function(e){var t=(0,d.useState)(new Date),n=(0,a.Z)(t,2),m=n[0],p=n[1],v=(0,d.useState)(!1),x=(0,a.Z)(v,2),_=x[0],b=x[1],g=(0,d.useState)(h()().format("YYYY-MM")),j=(0,a.Z)(g,2),Z=j[0],S=j[1];return(0,d.useEffect)((function(){Z&&(null===V.Z||void 0===V.Z||V.Z.forEach((function(e){if(e[0]===Z){var t=e[1].split("*"),n=document.querySelectorAll(t[0])[0];if(!n)return;if(n.classList.contains("eventAdded"))return;var a=document.createElement("button");a.className="".concat(u," eventBtn"),a.innerText=t[1],null===n||void 0===n||n.appendChild(a),n.style.borderRadius="5px",n.classList.add("eventAdded")}})))}),[Z,_]),(0,d.useEffect)((function(){if("attendance"!==e.about){var t=document.querySelector(".react-datepicker__day-names"),n=document.querySelectorAll(".react-datepicker__day-name");t&&n&&(t.style.width="95%",n[0].style.width="14%",n[6].style.width="14%")}}),[_]),(0,y.jsxs)(l.Z,{onClose:e.onClose,addStyle:"attendHeight",children:[(0,y.jsxs)("div",{className:r,children:[(0,y.jsxs)("span",{children:[" ",e.who," "]}),(0,y.jsx)("span",{className:s,onClick:e.onClose,children:(0,y.jsx)("i",{className:"fa-regular fa-circle-xmark"})})]}),(0,y.jsxs)("div",{className:o,onClick:function(){return b((function(e){return!e}))},children:[" ",(0,y.jsx)(f.Z,{filterNone:"consulting"===e.about&&!0,getDateValue:function(e){p(e)},about:e.about,isSubject:e.isSubject,getMonthValue:function(e){S(h()(e).format("YYYY-MM"))}})]}),(0,y.jsx)("div",{className:c,children:"attendance"===e.about&&"*\uc2dc\uc791 \ub0a0\uc9dc\uc640 \ub05d \ub0a0\uc9dc\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"}),(0,y.jsx)("div",{className:i,children:(0,y.jsx)(z,{id:e.id,selectOption:e.selectOption,students:e.students,attendDate:m,about:e.about,addData:function(t){return e.addData(t)},userUid:e.userUid,who:e.who,onClose:e.onClose})})]})}},7121:function(e,t,n){n(7313);var a=n(3451),r=n(3776),i=n(7287),o=n(7692),s=n(6417);t.Z=function(e){var t,n;return console.log(e.students),(0,s.jsxs)(a.Z,{onClose:e.closeModalHandler,children:[e.who,(0,s.jsxs)("h2",{className:i.Z.btnArea,children:["\uad00\ub828\ud559\uc0dd \ub4f1\ub85d",(0,s.jsxs)("div",{children:[(0,s.jsx)(o.Z,{name:"\ucde8\uc18c",className:"student-add",style:{width:"50px",backgroundColor:"#ff6600a6"},onclick:function(){e.closeModalHandler()}}),(0,s.jsx)(o.Z,{name:"\ud655\uc778",style:{width:"50px",backgroundColor:"#ff6600a6"},className:"student-add",onclick:e.confirmBtnHandler})]})]}),(null===(t=e.relatedStudent)||void 0===t?void 0:t.length)>0&&(0,s.jsx)("div",{className:i.Z.relStdShowDiv,children:null===(n=e.relatedStudent)||void 0===n?void 0:n.map((function(e){return(0,s.jsx)("span",{className:i.Z["margin-5"],children:e},e)}))}),(0,s.jsx)(r.Z,{students:e.students,showOption:e.studentClickHandler,isSubject:e.isSubject})]})}},5729:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(885),r=n(7313),i="FileArea_fileArea__MQmcW",o="FileArea_previewImg__+SvF8",s=n(7785),c=n(6417),u=function(e){var t=(0,r.useState)(e.file||""),n=(0,a.Z)(t,2),u=n[0],l=n[1];return(0,c.jsxs)("div",{className:i,children:[u&&(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("img",{src:u,className:o,alt:"filePreview"})}),"attendance"!==e.about&&(0,c.jsx)(s.Z,{attachedFileHandler:function(t){e.attachedFileHandler(t),l(t)}})]})}},7785:function(e,t,n){n.d(t,{Z:function(){return l}});var a=n(4165),r=n(5861),i=n(885),o=n(7313),s="FileForm_fileUploadBtn__r9msD",c=n(2964),u=n(6417),l=function(e){var t=(0,o.useState)(""),n=(0,i.Z)(t,2),l=n[0],d=n[1],f=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={maxSizeMb:1,maxWidthOrHeight:900},e.next=4,(0,c.Z)(t,n);case 4:return e.abrupt("return",e.sent);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),m=function(){var t=(0,r.Z)((0,a.Z)().mark((function t(n){var r,i,o;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r=n.target.files[0])){t.next=8;break}return t.next=4,f(r);case 4:i=t.sent,(o=new FileReader).onloadend=function(t){d(t.currentTarget.result),e.attachedFileHandler(t.currentTarget.result)},o.readAsDataURL(i);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("label",{id:"attachedFile",htmlFor:"attachFile",className:s,onClick:function(){l&&d("")},children:l?"\ucd08\uae30\ud654&\uc774\ubbf8\uc9c0\ucd94\uac00":"\uc774\ubbf8\uc9c0 \ucd94\uac00"}),(0,u.jsx)("input",{type:"file",accept:"image/*",onChange:m,style:{display:"none"},id:"attachFile"})]})}},4484:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(1413),r=n(885),i=n(7313),o={"class-subject":"Input_class-subject__E+qGy","rowcolumn-input":"Input_rowcolumn-input__MzKWZ","simsim-Text":"Input_simsim-Text__7+u+1","meetSum-Text":"Input_meetSum-Text__0ijY3","class-memo":"Input_class-memo__eXBTy","attendForm-input":"Input_attendForm-input__KLvku","memo-section":"Input_memo-section__CGRYR","simsimMain-input":"Input_simsimMain-input__TVHos","board-input":"Input_board-input__2xPzk","board-input-half":"Input_board-input-half__Lu9st","fs-80px":"Input_fs-80px__t0quj","fs-70px":"Input_fs-70px__ZcOO7","fs-60px":"Input_fs-60px__QNEgw","fs-50px":"Input_fs-50px__GEaU0","fs-40px":"Input_fs-40px__OICBO"},s=n(6417),c=void 0,u=i.forwardRef((function(e,t){var n=(0,i.useRef)(null),u=(0,i.useState)(""),l=(0,r.Z)(u,2),d=l[0],f=l[1],m=(0,i.useState)(""),h=(0,r.Z)(m,2),p=h[0],v=h[1];(0,i.useEffect)((function(){f("")}),[]),(0,i.useEffect)((function(){f(e.defaultValue)}),[e.defaultValue]);var x=function(){var t;return"40px"===e.fontSize?t="10-900":"50px"===e.fontSize?t="9-310":"60px"===e.fontSize?t="8-190":"70px"===e.fontSize?t="7-150":"80px"===e.fontSize&&(t="6-120"),/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)&&(t="25-400"),t},_=function(){f(n.current.value)};(0,i.useEffect)((function(){!0===e.showOn?v("1"):!1===e.showOn?v("0"):v(e.showOn)}),[e.showOn]),(0,i.useEffect)((function(){"textarea"===e.input.type&&g()}),[p]),(0,i.useEffect)((function(){n.current.style.height=e.startheight}),[e.startheight]);var b=function(){var t,a,r,i,o=null===(t=x())||void 0===t||null===(a=t.split("-"))||void 0===a?void 0:a[0],s=null===(r=x())||void 0===r||null===(i=r.split("-"))||void 0===i?void 0:i[1],c=n.current.value.split("\n"),u=Math.ceil((n.current.clientWidth-50)/(+e.fontSize.slice(0,2)+2)),l=c.length;c.forEach((function(e){var t=Math.floor(e.length/u);t>1&&(l+=t)})),+l>+o?e.maxRowAlert("enter"):n.current.value.length>+s&&e.maxRowAlert("length")};(0,i.useEffect)((function(){""!==e.fontSize&&void 0!==e.fontSize&&b()}),[e.fontSize]);var g=function(t){if(null!==n&&null!==n.current){if(e.alarm)return window.scrollTo(0,n.current.scrollHeight),void b();n.current.style.height="10px",n.current.style.height=n.current.scrollHeight-13+"px"}};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("label",{htmlFor:e.input.id}),"textarea"===e.input.type?(0,s.jsx)("textarea",(0,a.Z)((0,a.Z)({id:e.id,ref:n},e.input),{},{className:o[e.className],onKeyDown:function(){return g(c)},onKeyUp:function(){return g(c)},onClick:function(){return g(c)},value:d||"",onInput:e.onInput,required:!!e.required,onChange:_,placeholder:e.placeholder||""}),"textArea"+e.myKey):(0,s.jsx)("input",(0,a.Z)((0,a.Z)({id:e.input.id,type:e.input.type,required:!!e.required,className:o[e.className],onInput:e.onInput,ref:n},e.input),{},{value:d||"",onChange:_,placeholder:e.placeholder||""}),e.myKey)]})}))},3776:function(e,t,n){n.d(t,{Z:function(){return o}});n(7313);var a="Student_div__ROh5A",r=n(7405),i=n(6417),o=function(e){var t;return(0,i.jsx)("div",{className:a,children:e.students&&(null===(t=e.students)||void 0===t?void 0:t.map((function(t){var n;return(0,i.jsx)(r.Z,{className:e.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(n=e.passStudent)||void 0===n?void 0:n.split(" ")[1])===t.name,manageEach:e.manageEach,name:t.name,num:t.num,onShowOption:function(t){e.showOption(t),t.target+="add"}},t.num)})))})}},7405:function(e,t,n){n.d(t,{Z:function(){return i}});n(7313);var a={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm"},r=n(6417),i=function(e){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("button",{className:"".concat(a[e.className]," ").concat(e.classAdd&&"clicked"),id:"std-".concat(e.num," ").concat(e.name),onClick:function(t){e.onShowOption(t)},children:[e.num," ",e.name]},"stdBtn-".concat(e.num," ").concat(e.name))})}},571:function(e,t,n){n.d(t,{Z:function(){return c}});n(7313);var a=n(3451),r="ExampleModal_xmark__aUZiP",i="ExampleModal_img-div__6WVX9",o="ExampleModal_img__oJEG0",s=n(6417),c=function(e){return(0,s.jsxs)(a.Z,{onClose:e.onClose,children:[(0,s.jsx)("span",{onClick:e.onClose,className:r,children:(0,s.jsx)("i",{className:"fa-regular fa-circle-xmark"})}),(0,s.jsx)("div",{children:e.text}),(0,s.jsx)("div",{className:i,children:(0,s.jsx)("img",{src:e.imgSrc,className:o,alt:"exampleGif"})}),(0,s.jsx)("div",{children:e.bottomText})]})}},7984:function(e,t){t.Z=[["2023-03",'div[aria-label="Choose 2023\ub144 3\uc6d4 1\uc77c \uc218\uc694\uc77c"]*3.1\uc808'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 5\uc77c \uae08\uc694\uc77c"]*\uc5b4\ub9b0\uc774\ub0a0'],["2023-06",'div[aria-label="Choose 2023\ub144 6\uc6d4 6\uc77c \ud654\uc694\uc77c"]*\ud604\ucda9\uc77c'],["2023-08",'div[aria-label="Choose 2023\ub144 8\uc6d4 15\uc77c \ud654\uc694\uc77c"]*\uad11\ubcf5\uc808'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 28\uc77c \ubaa9\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 29\uc77c \uae08\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 3\uc77c \ud654\uc694\uc77c"]*\uac1c\ucc9c\uc808'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 9\uc77c \uc6d4\uc694\uc77c"]*\ud55c\uae00\ub0a0'],["2023-12",'div[aria-label="Choose 2023\ub144 12\uc6d4 25\uc77c \uc6d4\uc694\uc77c"]*\uc131\ud0c4\uc808'],["2024-01",'div[aria-label="Choose 2024\ub144 1\uc6d4 1\uc77c \uc6d4\uc694\uc77c"]*\uc0c8\ud574'],["2024-02",'div[aria-label="Choose 2024\ub144 2\uc6d4 9\uc77c \uae08\uc694\uc77c"]*\uc124\ub0a0']]},7287:function(e,t){t.Z={form:"AttendanceForm_form__d8p8O",input:"AttendanceForm_input__euFwF",relStdShowDiv:"AttendanceForm_relStdShowDiv__McyvL",relStdArea:"AttendanceForm_relStdArea__kWci2","margin-5":"AttendanceForm_margin-5__6jnTk",btn:"AttendanceForm_btn__VV+7-",btnArea:"AttendanceForm_btnArea__eGu5D"}}}]);