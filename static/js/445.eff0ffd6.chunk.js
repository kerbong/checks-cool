"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[445],{95186:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(70885),i=n(47313),r=n(61378),s=n.n(r),l=(n(72632),n(21560)),o=n(46417),u=function(e){var t=(0,i.useState)(e.setStart||new Date),n=(0,a.Z)(t,2),r=n[0],u=n[1],c=(0,i.useState)(r),d=(0,a.Z)(c,2),f=d[0],v=d[1],m=i.forwardRef((function(e,t){var n=e.value,a=e.onClick;return(0,o.jsx)("button",{className:"custom-input",onClick:a,ref:t,title:"\ub0a0\uc9dc \uc120\ud0dd\ud558\uae30",children:n})}));(0,i.useEffect)((function(){if("main"===e.about)u(e.setStart);else if("tableInput"===e.about){if(!e.setStart||"object"!==typeof e.setStart)return;u(e.setStart)}}),[e.setStart]);return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(s(),{selected:r,onChange:function(t){if("attendance"===e.about||"todo"===e.about){var n=(0,a.Z)(t,2),i=n[0],r=n[1];u(i),v(r)}else u(t);e.getDateValue(t),"tableInput"===e.about&&e.tableDateChangeHandler(t)},filterDate:function(t){if(e.filterNone)return t;var n=t.getDay(t);return 0!==n&&6!==n},startDate:r,showMonthDropdown:!0,onMonthChange:function(t){e.getMonthValue(t)},dateFormatCalendar:"yyyy\ub144 ",endDate:("attendance"===e.about||"todo"===e.about)&&f,selectsRange:("attendance"===e.about||"todo"===e.about)&&!0,disabledKeyboardNavigation:!0,highlightDates:e.highlight,customInput:(0,o.jsx)(m,{onClick:function(){if(e.filterNone){var t=document.querySelector(".react-datepicker__day-names"),n=document.querySelectorAll(".react-datepicker__day-name");t&&n&&(t.style.width="95%",n[0].style.width="14%",n[6].style.width="14%")}}}),fixedHeight:e.fixedHeight,inline:e.inline,locale:l.Z,dateFormat:e.showJustTime?"aa h:mm":e.showTime?"yy\ub144 MMMM d\uc77c(eee) aa h:mm":"yy\ub144 MMMM d\uc77c(eee)",showTimeSelectOnly:e.showJustTime,timeFormat:"aa h:mm",timeInputLabel:"\uc785\ub825/\uc120\ud0dd",showTimeInput:e.showTime,timeIntervals:10})})}},35729:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(70885),i=n(47313),r="FileArea_fileArea__MQmcW",s="FileArea_previewImg__+SvF8",l=n(47785),o=n(46417),u=function(e){var t=(0,i.useState)(e.file||""),n=(0,a.Z)(t,2),u=n[0],c=n[1];return(0,o.jsxs)("div",{className:r,children:[u&&(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("img",{src:u,className:s,alt:"filePreview"})}),"attendance"!==e.about&&(0,o.jsx)(l.Z,{attachedFileHandler:function(t){e.attachedFileHandler(t),c(t)},src:u,about:e.about})]})}},47785:function(e,t,n){n.d(t,{Z:function(){return c}});var a=n(74165),i=n(15861),r=n(70885),s=n(47313),l="FileForm_fileUploadBtn__r9msD",o=n(42964),u=n(46417),c=function(e){var t=(0,s.useState)(e.src||""),n=(0,r.Z)(t,2),c=n[0],d=n[1],f=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={maxSizeMb:1,maxWidthOrHeight:900},e.next=4,(0,o.Z)(t,n);case 4:return e.abrupt("return",e.sent);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),v=function(){var t=(0,i.Z)((0,a.Z)().mark((function t(n){var i,r,s;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(i=n.target.files[0])){t.next=8;break}return t.next=4,f(i);case 4:r=t.sent,(s=new FileReader).onloadend=function(t){d(t.currentTarget.result),e.attachedFileHandler(t.currentTarget.result)},s.readAsDataURL(r);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("label",{id:"attachedFile",htmlFor:"attachFile",className:l,onClick:function(){c&&d("")},style:"padIt"===e.about?{backgroundColor:"#687f7f"}:{},children:c?"\ucd08\uae30\ud654 & \uc774\ubbf8\uc9c0 \ubcc0\uacbd":"\uc774\ubbf8\uc9c0 \ucd94\uac00"}),(0,u.jsx)("input",{type:"file",accept:"image/*",onChange:v,style:{display:"none"},id:"attachFile"})]})}},44484:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(1413),i=n(70885),r=n(47313),s={"class-subject":"Input_class-subject__E+qGy","rowcolumn-input":"Input_rowcolumn-input__MzKWZ","simsim-Text":"Input_simsim-Text__7+u+1","meetSum-Text":"Input_meetSum-Text__0ijY3","class-memo":"Input_class-memo__eXBTy","attendForm-input":"Input_attendForm-input__KLvku","memo-section":"Input_memo-section__CGRYR","simsimMain-input":"Input_simsimMain-input__TVHos","board-input":"Input_board-input__2xPzk","board-input-half":"Input_board-input-half__Lu9st","fs-80px":"Input_fs-80px__t0quj","fs-70px":"Input_fs-70px__ZcOO7","fs-60px":"Input_fs-60px__QNEgw","fs-50px":"Input_fs-50px__GEaU0","fs-40px":"Input_fs-40px__OICBO","memoAdd-textarea":"Input_memoAdd-textarea__dssNI"},l=n(46417),o=void 0,u=r.forwardRef((function(e,t){var n=(0,r.useRef)(null),u=(0,r.useState)(""),c=(0,i.Z)(u,2),d=c[0],f=c[1],v=(0,r.useState)(""),m=(0,i.Z)(v,2),h=m[0],p=m[1];(0,r.useEffect)((function(){f("")}),[]),(0,r.useEffect)((function(){f(e.defaultValue)}),[e.defaultValue]);var x=function(){var t;return"40px"===e.fontSize?t="10-900":"50px"===e.fontSize?t="9-310":"60px"===e.fontSize?t="8-190":"70px"===e.fontSize?t="7-150":"80px"===e.fontSize&&(t="6-120"),/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)&&(t="25-400"),t},j=function(t){f(n.current.value),e.getValue&&e.getValueHandler(t)};(0,r.useEffect)((function(){!0===e.showOn?p("1"):!1===e.showOn?p("0"):p(e.showOn)}),[e.showOn]),(0,r.useEffect)((function(){"textarea"===e.input.type&&g()}),[h]),(0,r.useEffect)((function(){n.current.style.height=e.startheight}),[e.startheight]);var _=function(){var t,a,i,r,s=null===(t=x())||void 0===t||null===(a=t.split("-"))||void 0===a?void 0:a[0],l=null===(i=x())||void 0===i||null===(r=i.split("-"))||void 0===r?void 0:r[1],o=n.current.value.split("\n"),u=Math.ceil((n.current.clientWidth-50)/(+e.fontSize.slice(0,2)+2)),c=o.length;o.forEach((function(e){var t=Math.floor(e.length/u);t>1&&(c+=t)})),+c>+s?e.maxRowAlert("enter"):n.current.value.length>+l&&e.maxRowAlert("length")};(0,r.useEffect)((function(){""!==e.fontSize&&void 0!==e.fontSize&&_()}),[e.fontSize]);var g=function(t){if(null!==n&&null!==n.current){if(e.alarm)return window.scrollTo(0,n.current.scrollHeight/2),void _();n.current.style.height="10px",n.current.style.height=n.current.scrollHeight-13+"px"}};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("label",{htmlFor:e.input.id}),"textarea"===e.input.type?(0,l.jsx)("textarea",(0,a.Z)((0,a.Z)({id:e.id,ref:n},e.input),{},{className:s[e.className],onKeyDown:function(){return g(o)},onKeyUp:function(){return g(o)},onClick:function(){return g(o)},value:d||"",onInput:e.onInput,required:!!e.required,onChange:j,placeholder:e.placeholder||""}),"textArea"+e.myKey):(0,l.jsx)("input",(0,a.Z)((0,a.Z)({id:e.input.id,type:e.input.type,required:!!e.required,className:s[e.className],onInput:e.onInput,ref:n},e.input),{},{value:d||"",onChange:j,placeholder:e.placeholder||""}),e.myKey)]})}))},53776:function(e,t,n){n.d(t,{Z:function(){return s}});n(47313);var a="Student_div__ROh5A",i=n(77405),r=n(46417),s=function(e){var t;return(0,r.jsx)("div",{className:a,children:e.students&&(null===(t=e.students)||void 0===t?void 0:t.map((function(t){var n;return(0,r.jsx)(i.Z,{className:e.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(n=e.passStudent)||void 0===n?void 0:n.split(" ")[1])===t.name,manageEach:e.manageEach,name:t.name,num:t.num,woman:t.woman,onShowOption:function(t){e.showOption(t),t.target+="add"}},t.num)})))})}},77405:function(e,t,n){n.d(t,{Z:function(){return r}});n(47313);var a={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"},i=n(46417),r=function(e){return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("button",{className:"".concat(a[e.className]," ").concat(e.classAdd&&"clicked"," ").concat(!e.woman&&a.woman),id:"std-".concat(e.num," ").concat(e.name),onClick:function(t){e.onShowOption(t)},children:[e.num," ",e.name]},"stdBtn-".concat(e.num," ").concat(e.name))})}},80129:function(e,t,n){n.r(t),n.d(t,{default:function(){return O}});var a=n(42982),i=n(1413),r=n(74165),s=n(15861),l=n(70885),o=n(47313),u=[{class:"\ud559\uc5c5\ud559\uc2b5",id:"1",value:"1\ud559\uc5c5\ud559\uc2b5"},{class:"\uad50\uc6b0\uad00\uacc4",id:"2",value:"2\uad50\uc6b0\uad00\uacc4"},{class:"\uc0dd\ud65c\ud0dc\ub3c4",id:"3",value:"3\uc0dd\ud65c\ud0dc\ub3c4"},{class:"\ud559\ubd80\ubaa8",id:"4",value:"4\ud559\ubd80\ubaa8"}],c=n(59720),d=n(53776),f=n(10658),v=n.n(f),m=n(67114),h=n.n(m),p={listArea:"ConsultLists_listArea__cdc1k","bg-gray":"ConsultLists_bg-gray__pesUI","listArea-div":"ConsultLists_listArea-div__Cnu9c",nameArea:"ConsultLists_nameArea__-zF7h","consults-lists-div":"ConsultLists_consults-lists-div__abIhj",fileArea:"ConsultLists_fileArea__GwBM9",noteArea:"ConsultLists_noteArea__JyczP",nameSpan:"ConsultLists_nameSpan__4PEYx",nameIcon:"ConsultLists_nameIcon__3NmaI",editDeleteArea:"ConsultLists_editDeleteArea__x0JBh",input:"ConsultLists_input__3GPGK",selectArea:"ConsultLists_selectArea__45m6A",editFileArea:"ConsultLists_editFileArea__2w4yw","editImg-prev":"ConsultLists_editImg-prev__khqzn",consultDate:"ConsultLists_consultDate__sP2hx",noteTextArea:"ConsultLists_noteTextArea__gQ7Si",sortBtnArea:"ConsultLists_sortBtnArea__r60o9","select-area":"ConsultLists_select-area__peb+p","student-select":"ConsultLists_student-select__ZY9aE","select-year":"ConsultLists_select-year__OxSF+"},x=n(37692),j=n(47785),_=n(44484),g=n(95186),b=n(57121),y=n(46417),S=function(e){var t,n,r=e.consult,s=(0,o.useState)(""),u=(0,l.Z)(s,2),c=u[0],d=u[1],f=(0,o.useState)(e.consult.id),m=(0,l.Z)(f,2),S=m[0],Z=m[1],w=(0,o.useState)(!1),C=(0,l.Z)(w,2),N=C[0],k=C[1],F=(0,o.useState)(null===(t=e.consult)||void 0===t?void 0:t.related),A=(0,l.Z)(F,2),E=A[0],I=A[1],O=function(){e.cancelEditor()},U=function(e){e.currentTarget.style.display="none"};(0,o.useEffect)((function(){var e=document.getElementById("newFile");e&&(e.style.maxHeight="250px")}),[c]);return(0,y.jsxs)(y.Fragment,{children:[N&&(0,y.jsx)(b.Z,{who:r.num+" "+r.name,cancleBtnHandler:function(){k(!1),I(r.related)},confirmBtnHandler:function(){return k(!1)},studentClickHandler:function(t){return function(t){var n,i=t.target.innerText,r=(0,a.Z)(E);if(i!==e.who){var s;null!==(n=r)&&void 0!==n&&n.includes(i)?r=null===(s=r)||void 0===s?void 0:s.filter((function(e){return e!==i})):r.push(i),I(r)}}(t)},students:e.students,isSubject:e.isSubject,relatedStudent:E,closeModalHandler:function(){k(!1),I(r.related)}}),(0,y.jsxs)("div",{className:p.nameArea,children:[(0,y.jsx)("span",{className:p.nameIcon,children:(0,y.jsx)("i",{className:"fa-regular fa-id-badge"})}),(0,y.jsx)("span",{className:p["hide-cal"],children:(0,y.jsx)(g.Z,{getDateValue:function(e){var t=v()(e).format("YYYY-MM-DD")+S.slice(10,15)+r.num;console.log(t),Z(t)},about:"main",setStart:new Date(S.slice(0,10)),getMonthValue:function(){}})}),(0,y.jsxs)("span",{className:p.nameSpan,children:[r.name," "," | ",e.selectOption&&(0,y.jsxs)("select",{name:"consult-option",id:"option-select",className:p.selectArea,defaultValue:r.option,children:[(0,y.jsx)("option",{value:"",children:"-- \ubd84\ub958 --"}),null===(n=e.selectOption)||void 0===n?void 0:n.map((function(e){return(0,y.jsx)("option",{value:e.value,children:e.class},e.id)}))]})]})]}),(0,y.jsxs)("div",{className:p.noteArea,children:[(0,y.jsx)(x.Z,{className:"consult-relatedStdBtn",name:"\uad00\ub828\ud559\uc0dd",onclick:function(){k(!N)}}),(null===E||void 0===E?void 0:E.length)>0&&(0,y.jsx)("div",{className:p.noteArea,style:{flexWrap:"wrap"},children:null===E||void 0===E?void 0:E.map((function(e){return(0,y.jsx)("span",{className:p.nameSpan,children:e},e)}))}),0===(null===E||void 0===E?void 0:E.length)&&(0,y.jsx)("div",{className:p.noteArea,style:{flexWrap:"wrap",width:"50%",justifyContent:"center"},children:(0,y.jsx)("span",{className:p.nameSpan,children:"* \uad00\ub828 \ud559\uc0dd \uc5c6\uc74c"})})]}),r.attachedFileUrl&&(0,y.jsx)("div",{className:p.fileArea,children:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("img",{src:r.attachedFileUrl,width:"60%","max-height":"250px",alt:"filePreview",onError:U}),(0,y.jsx)("audio",{controls:!0,src:r.attachedFileUrl,onError:U})]})}),(0,y.jsx)(_.Z,{myKey:r.id,className:p.input,id:"consult_note",label:"inputData",defaultValue:r.note&&r.note,input:{type:"textarea",style:{height:e.initTextareaHeight+"px"},autoFocus:!0}}),(0,y.jsxs)("div",{className:p.editDeleteArea,children:[(0,y.jsx)(x.Z,{id:"save"+r.id,className:"consultEditBtn",onclick:function(){!function(t){var n,a=document.querySelector("#consult_note").value,r=document.querySelector("#option-select").value;n=""===c?t.attachedFileUrl:c;var s=(0,i.Z)((0,i.Z)({},t),{},{id:S,option:r,attachedFileUrl:n,note:a,related:E});JSON.stringify(t)!==JSON.stringify(s)||s.id!==t.id?(s.beforeId=t.id,e.addData(s),h().fire({icon:"success",title:"\uc790\ub8cc\uac00 \uc800\uc7a5\ub418\uc5c8\uc5b4\uc694.",text:"5\ucd08 \ud6c4\uc5d0 \ucc3d\uc774 \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}),O()):h().fire({icon:"error",title:"\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694.",text:"\ubcc0\uacbd\ub41c \ub0b4\uc6a9\uc774 \uc5c6\uc5b4\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}(r)},icon:(0,y.jsx)("i",{className:"fa-solid fa-floppy-disk"})}),(0,y.jsx)(x.Z,{id:"cancel"+r.id,className:"consultEditBtn",onclick:O,icon:(0,y.jsx)("i",{className:"fa-solid fa-rectangle-xmark"})})]}),(0,y.jsxs)("div",{className:p.editFileArea,children:[(0,y.jsx)(j.Z,{src:r.attachedFileUrl||"",attachedFileHandler:function(e){d(e)}}),c&&(0,y.jsx)("div",{className:p["editImg-prev"],children:(0,y.jsx)("img",{src:c,style:{maxHeight:"250px",maxwidth:"300px"},alt:"filePreview",id:"newFile"})})]})]})},Z=n(80650),w=n(90573),C=n(48737);n(23889);v().locale("ko");var N=function(e){var t,n=(0,o.useState)([]),r=(0,l.Z)(n,2),s=r[0],u=r[1],c=(0,o.useState)([]),d=(0,l.Z)(c,2),f=d[0],m=d[1],j=(0,o.useState)([]),_=(0,l.Z)(j,2),g=_[0],b=_[1],N=(0,o.useState)(""),k=(0,l.Z)(N,2),F=k[0],A=k[1],E=(0,o.useState)(""),I=(0,l.Z)(E,2),O=I[0],U=I[1],D=(0,o.useState)([]),T=(0,l.Z)(D,2),M=T[0],B=T[1],H=(0,o.useState)([]),L=(0,l.Z)(H,2),R=L[0],V=L[1],z=(0,o.useState)([]),Y=(0,l.Z)(z,2),P=Y[0],q=Y[1],G=(0,o.useState)(""),W=(0,l.Z)(G,2),J=W[0],K=W[1],Q=(0,o.useState)(!1),X=(0,l.Z)(Q,2),$=X[0],ee=X[1],te=(0,o.useRef)(),ne=(0,o.useRef)(),ae=(0,o.useRef)();function ie(e,t){var n=null===e||void 0===e?void 0:e.sort((function(e,t){var n="".concat(e.id.slice(0,10)," ").concat(e.id.slice(10,15)),a="".concat(t.id.slice(0,10)," ").concat(t.id.slice(10,15));return new Date(n)-new Date(a)}));return"up"===t&&(null===n||void 0===n||n.reverse()),n}(0,o.useEffect)((function(){!function(){var t=(0,w.JU)(Z.wO,"consult",e.userUid);(0,w.cf)(t,(function(e){var t,n;u([]);var r=[],s=[];null===(t=e.data())||void 0===t||null===(n=t.consult_data)||void 0===n||n.forEach((function(e){var t={},n=e.id.slice(5,7),a=e.id.slice(0,4);if(+n>=3)s.push(a),t=(0,i.Z)((0,i.Z)({},e),{},{yearGroup:a});else if(+n<=2){var l=String(+a-1);s.push(l),t=(0,i.Z)((0,i.Z)({},e),{},{yearGroup:l})}r.push(t)})),B((0,a.Z)(new Set(s))),u([].concat(r))}))}()}),[]),(0,o.useEffect)((function(){var e,t;""!==(null===te||void 0===te||null===(e=te.current)||void 0===e?void 0:e.value)&&le(null===te||void 0===te||null===(t=te.current)||void 0===t?void 0:t.value)}),[s]),(0,o.useEffect)((function(){var e;""!==(null===te||void 0===te||null===(e=te.current)||void 0===e?void 0:e.value)&&se("\uc804\uccb4\ud559\uc0dd")}),[R]);var re=function(e){var t=v()(e).format("ddd"),n=e.split("-")[0].slice(2),a=e.split("-")[1].replace(/(^0+)/,""),i=e.split("-")[2].replace(/(^0+)/,"");return"".concat(n,"\ub144 ").concat(a,"\uc6d4 ").concat(i,"\uc77c(").concat(t,")")},se=function(e){var t,n=$?null===f||void 0===f?void 0:f.filter((function(e){return e.clName===J})):f;t=ie("\uc804\uccb4\ud559\uc0dd"===e?n:null===n||void 0===n?void 0:n.filter((function(t){return t.name===e})),"up"),b(t)},le=function(t){var n,i,r,l=null===s||void 0===s?void 0:s.filter((function(e){return e.yearGroup===t}));m(l),oe(t)?(ee(!0),K("")):(ee(!1),V((0,a.Z)(new Set(null===l||void 0===l?void 0:l.map((function(e){return e.name}))))));var o=null===(n=e.students)||void 0===n||null===(i=n.filter((function(e){return Object.keys(e)[0]===t})))||void 0===i||null===(r=i[0])||void 0===r?void 0:r[t];q(o),ne.current.value=""};(0,o.useEffect)((function(){if(s.length>0){var e=null===s||void 0===s?void 0:s.filter((function(e){return e.clName===J}));m(e);var t=null===e||void 0===e?void 0:e.map((function(e){return e.name}));V((0,a.Z)(new Set(t))),ne.current.value=""}}),[J]);var oe=function(t){var n,a,i;return null===(n=e.isSubject)||void 0===n||null===(a=n.filter((function(e){return Object.keys(e)[0]===t})))||void 0===a||null===(i=a[0])||void 0===i?void 0:i[t]};(0,o.useEffect)((function(){var e=function(){var e=v()(),t="",n=e.format("MM"),a=e.format("YYYY");return+n>=2?t=a:+n<=1&&(t=String(+a-1)),t}(),t=oe(e);ee(t)}),[e.isSubject]);var ue,ce=function(e){e.currentTarget.style.display="none"};return(0,y.jsxs)("div",{className:p["bg-gray"],children:[(0,y.jsx)("h1",{children:"\uc0c1\ub2f4\uae30\ub85d"}),(0,y.jsx)("br",{}),(0,y.jsxs)("div",{className:p.sortBtnArea,children:[(0,y.jsxs)("div",{className:p["select-area"],children:[(0,y.jsxs)("select",{name:"searchYear-selcet",ref:te,defaultValue:"",className:p["student-select"],onChange:function(e){return le(e.target.value)},children:[(0,y.jsx)("option",{value:"",defaultChecked:!0,children:"--\ud559\ub144\ub3c4--"}),null===M||void 0===M?void 0:M.map((function(e){return(0,y.jsxs)("option",{value:e,children:[e,"\ud559\ub144\ub3c4"]},e)}))]}),$&&(0,y.jsxs)("select",{ref:ae,onChange:function(){var e=ae.current.value;K(e)},className:p["student-select"],value:J,children:[(0,y.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===P||void 0===P?void 0:P.map((function(e){return(0,y.jsx)("option",{value:Object.keys(e),children:Object.keys(e)},Object.keys(e))}))]}),(0,y.jsxs)("select",{name:"student-selcet",ref:ne,className:p["student-select"],defaultValue:"",onChange:function(e){return se(e.target.value)},children:[(0,y.jsx)("option",{value:"",defaultChecked:!0,children:"--\ud559\uc0dd--"}),(null===f||void 0===f?void 0:f.length)>0&&(0,y.jsx)("option",{value:"\uc804\uccb4\ud559\uc0dd",children:"\uc804\uccb4\ubcf4\uae30"}),null===(ue=R,t=ue.sort((function(e,t){return e>t?1:-1})))||void 0===t?void 0:t.map((function(e){return(0,y.jsx)("option",{value:e,children:e},e)}))]})]}),(0,y.jsx)(x.Z,{id:"saveExcel",className:"sortBtn-consult",name:"\uc5d1\uc140\uc800\uc7a5",onclick:function(){var e=[];s.forEach((function(t){var n=[+t.num,t.name,+t.id.slice(0,4),+t.id.slice(5,7),+t.id.slice(8,10),t.option.slice(1),null===t||void 0===t?void 0:t.note,null===t||void 0===t?void 0:t.attachedFileUrl];$&&n.unshift(t.clName),e.push(n)}));var t=["\ubc88\ud638","\uc774\ub984","\ub144","\uc6d4","\uc77c","\uc0c1\ub2f4\uc635\uc158","\uba54\ubaa8\ub0b4\uc6a9","\ucca8\ubd80\ud30c\uc77c"];$&&t.unshift("\ubc18"),e.unshift(t);var n=C.P6.book_new(),a=C.P6.aoa_to_sheet(e);a["!cols"]=[{wpx:30},{wpx:50},{wpx:40},{wpx:25},{wpx:25},{wpx:60},{wpx:500},{wpx:120}],$&&a["!cols"].unshift({wpx:50}),C.P6.book_append_sheet(n,a,"\uc0c1\ub2f4\uae30\ub85d"),(0,C.NC)(n,"\uc0c1\ub2f4\uae30\ub85d(".concat(te.current.value,").xlsx"))}})]}),f?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("br",{}),(0,y.jsx)("p",{children:"* \uc815\ubcf4\ubcf4\ud638\ub97c \uc704\ud574 \uba3c\uc800 \ud56d\ubaa9\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."}),(0,y.jsx)("br",{})]}):(0,y.jsx)("p",{children:"* \uc790\ub8cc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. "}),(0,y.jsx)("div",{className:p["consults-lists-div"],children:f&&(null===g||void 0===g?void 0:g.map((function(t){var n,r;return(0,y.jsx)("div",{className:p["listArea-div"],children:(0,y.jsx)("li",{className:p.listArea,id:t.id,children:F===t.id?(0,y.jsx)(S,{isSubject:e.isSubject,students:P,selectOption:e.selectOption,consult:t,cancelEditor:function(){return A("")},initTextareaHeight:O,addData:function(t){return function(t){var n=t.beforeId;u((function(e){var r,s=(0,a.Z)(e);return e.forEach((function(e,t){e.id===n&&(r=t)})),s[r]=$?(0,i.Z)((0,i.Z)({},t),{},{clName:J}):t,s})),m((function(e){var r,s=(0,a.Z)(e);return e.forEach((function(e,t){e.id===n&&(r=t)})),s[r]=$?(0,i.Z)((0,i.Z)({},t),{},{clName:J}):t,s})),b((function(e){var r,s=(0,a.Z)(e);return e.forEach((function(e,t){e.id===n&&(r=t)})),s[r]=$?(0,i.Z)((0,i.Z)({},t),{},{clName:J}):t,ie(s,"up")})),e.addData(t)}(t)}}):(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{className:p.nameArea,children:[(0,y.jsx)("span",{className:p.nameIcon,children:(0,y.jsx)("i",{className:"fa-regular fa-id-badge"})}),(0,y.jsx)("p",{className:p.consultDate,children:re(t.id.slice(0,10))}),(0,y.jsx)("span",{className:p.nameSpan,id:"1"+t.id,children:"".concat(t.name," | ").concat(t.option.slice(1))})]}),(null===t||void 0===t||null===(n=t.related)||void 0===n?void 0:n.length)>0&&(0,y.jsx)(y.Fragment,{children:(0,y.jsx)("div",{className:p.noteArea,children:null===t||void 0===t||null===(r=t.related)||void 0===r?void 0:r.map((function(e){return(0,y.jsx)("span",{className:p.nameSpan,children:e},e)}))})}),t.attachedFileUrl&&(0,y.jsxs)("div",{className:p.fileArea,children:[(0,y.jsx)("img",{src:t.attachedFileUrl,style:{maxHeight:"470px",maxWidth:"95%"},alt:"filePreview",onError:ce}),(0,y.jsx)("audio",{controls:!0,src:t.attachedFileUrl,onError:ce})]}),(0,y.jsx)("div",{className:p.noteArea,children:(0,y.jsx)("span",{className:p.noteTextArea,id:"note"+t.id,children:t.note?t.note:"'\uae30\ub85d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.'"})}),(0,y.jsxs)("div",{className:p.editDeleteArea,children:[(0,y.jsx)(x.Z,{id:"edit"+t.id,className:"consultEditBtn",onclick:function(){var e;e=t.id,A(e);var n=document.getElementById("note".concat(t.id)).scrollHeight;U(n)},icon:(0,y.jsx)("i",{className:"fa-solid fa-pencil"})}),(0,y.jsx)(x.Z,{id:"delete"+t.id,className:"consultEditBtn",onclick:function(){!function(t){h().fire({title:"\uc790\ub8cc\ub97c \uc9c0\uc6b8\uae4c\uc694?",text:"".concat(t.id.slice(0,10)," | ").concat(t.name," | ").concat(t.option.slice(1)),showDenyButton:!0,confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#db100cf2",denyButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c"}).then((function(n){var i;n.isConfirmed&&(e.deleteConsult(t.id,t.attachedFileUrl),u((function(e){return null===e||void 0===e?void 0:e.filter((function(e){return e.id!==t.id}))})),m((function(e){return null===e||void 0===e?void 0:e.filter((function(e){return e.id!==t.id}))})),b((function(e){return null===e||void 0===e?void 0:e.filter((function(e){return e.id!==t.id}))})),$||V((0,a.Z)(new Set(null===s||void 0===s||null===(i=s.filter((function(e){return e.yearGroup===te.current.value&&e.id!==t.id})))||void 0===i?void 0:i.map((function(e){return e.name}))))))}))}(t)},icon:(0,y.jsx)("i",{className:"fa-solid fa-trash-can"})})]})]},t.id+"item")},t.id)},t.id)})))})]})},k=n(80571),F=n.p+"static/media/consultAdd.88e54d44455fc22d2a09.gif",A=n(97890),E=n(36797),I=n(95162),O=function(e){var t,n=(0,o.useState)(!1),f=(0,l.Z)(n,2),m=f[0],h=f[1],p=(0,o.useState)(""),x=(0,l.Z)(p,2),j=x[0],_=x[1],g=(0,o.useState)(!1),b=(0,l.Z)(g,2),S=b[0],C=b[1],O=(0,o.useState)(!1),U=(0,l.Z)(O,2),D=U[0],T=U[1],M=(0,o.useState)(""),B=(0,l.Z)(M,2),H=B[0],L=B[1],R=(0,o.useState)([]),V=(0,l.Z)(R,2),z=V[0],Y=V[1],P=(0,o.useState)([]),q=(0,l.Z)(P,2),G=q[0],W=q[1],J=(0,o.useState)(!1),K=(0,l.Z)(J,2),Q=K[0],X=K[1],$=(0,A.TH)().state,ee=(0,A.s0)(),te=(0,o.useRef)();(0,o.useEffect)((function(){"addConsult"===(null===$||void 0===$?void 0:$.doWhat)?C(!1):"showConsult"===(null===$||void 0===$?void 0:$.doWhat)&&C(!0)}),[$]);var ne=function(){var t=(0,s.Z)((0,r.Z)().mark((function t(n){var l,o,u,c,d,f,v,m,h,p;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(l="",""===n.attachedFileUrl){t.next=15;break}if(!(n.attachedFileUrl instanceof Object)){t.next=9;break}return o=function(){var t=(0,s.Z)((0,r.Z)().mark((function t(n){var a;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,E.KV)((0,E.iH)(Z.Hw,"".concat(e.userUid,"/").concat((0,I.Z)())),n,{contentType:"audio/mp4"});case 2:return a=t.sent,t.next=5,(0,E.Jt)(a.ref);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),t.next=6,o(n.attachedFileUrl);case 6:l=t.sent,t.next=15;break;case 9:return t.next=11,(0,E.sf)((0,E.iH)(Z.Hw,"".concat(e.userUid,"/").concat((0,I.Z)())),n.attachedFileUrl,"data_url");case 11:return u=t.sent,t.next=14,(0,E.Jt)(u.ref);case 14:l=t.sent;case 15:return c=(0,i.Z)((0,i.Z)({},n),{},{attachedFileUrl:l}),d=re(n.id.slice(0,10)),se(d)&&(c=(0,i.Z)((0,i.Z)({},c),{},{clName:""===H?c.clName:H})),delete c.yearGroup,f=(0,w.JU)(Z.wO,"consult",e.userUid),t.next=22,(0,w.QT)(f);case 22:if(!(v=t.sent).exists()){t.next=32;break}return h=c.beforeId?c.beforeId:c.id,p=(0,a.Z)(null===(m=v.data().consult_data)||void 0===m?void 0:m.filter((function(e){return e.id!==h}))),c.beforeId&&delete c.beforeId,p.push(c),t.next=30,(0,w.pl)(f,{consult_data:p});case 30:t.next=34;break;case 32:return t.next=34,(0,w.pl)(f,{consult_data:[c]});case 34:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),ae=function(){var t=(0,s.Z)((0,r.Z)().mark((function t(n,i){var s,l,o,u,c;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===i){t.next=3;break}return t.next=3,(0,E.oq)((0,E.iH)(Z.Hw,i));case 3:return o=(0,w.JU)(Z.wO,"consult",e.userUid),t.next=6,(0,w.QT)(o);case 6:return u=t.sent,c=(0,a.Z)(null===u||void 0===u||null===(s=u.data())||void 0===s||null===(l=s.consult_data)||void 0===l?void 0:l.filter((function(e){return e.id!==n}))),t.next=10,(0,w.pl)(o,{consult_data:c});case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();(0,o.useEffect)((function(){ie()}),[H]);var ie=function(){null===G||void 0===G||G.forEach((function(e){Object.keys(e)[0]===H&&Y(Object.values(e)[0])})),""===H&&Y([])},re=function(e){var t=v()(e),n="",a=t.format("MM"),i=t.format("YYYY");return+a>=2?n=i:+a<=1&&(n=String(+i-1)),n};(0,o.useEffect)((function(){var t,n,a,i=re(),r=null===e||void 0===e||null===(t=e.students)||void 0===t||null===(n=t.filter((function(e){return Object.keys(e)[0]===i})))||void 0===n||null===(a=n[0])||void 0===a?void 0:a[i];W(r)}),[e.students]);var se=function(t){var n,a,i,r;e.isSubject&&(n=null===(a=e.isSubject)||void 0===a||null===(i=a.filter((function(e){return Object.keys(e)[0]===t})))||void 0===i||null===(r=i[0])||void 0===r?void 0:r[t]);return n};return(0,o.useEffect)((function(){var e=re(),t=se(e);X(t)}),[e.isSubject]),(0,y.jsxs)(y.Fragment,{children:[D&&(0,y.jsx)(k.Z,{onClose:function(){return T(!1)},imgSrc:F,text:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("p",{style:{fontSize:"1.3em",textAlign:"center",margin:"5px"},children:"=== \uc0c1\ub2f4\uae30\ub85d \uc608\uc2dc ==="}),(0,y.jsx)("p",{style:{margin:"15px"},children:"* \ud654\uba74 \uc67c\ucabd \uc0c1\ub2e8\uc758 \ud604\uc7ac \ud398\uc774\uc9c0 \ud0c0\uc774\ud2c0\uc744 \ud074\ub9ad\ud558\uc2dc\uba74 \ub2e4\uc2dc \ubcf4\uc2e4 \uc218 \uc788\uc5b4\uc694!"})]})}),(0,y.jsxs)("div",{id:"title-div",children:[(0,y.jsxs)("button",{id:"title-btn",onClick:function(){return T(!0)},children:[(0,y.jsx)("i",{className:"fa-regular fa-comments",style:{fontSize:"1em"}})," ","\uc0c1\ub2f4\uad00\ub9ac"]}),(0,y.jsxs)("div",{style:{height:"70px",display:"flex",alignItems:"center",width:"auto",justifyContent:"flex-end",lineHeight:"20px",fontSize:"0.9rem"},children:[(0,y.jsxs)("span",{id:"switch-btn",onClick:function(){ee("/attendance",{state:{doWhat:"addAttend"}})},children:[(0,y.jsx)("i",{className:"fa-regular fa-calendar-days"})," \ucd9c\uacb0",(0,y.jsx)("br",{}),"\uae30\ub85d"]}),(0,y.jsx)("span",{id:"switch-btn",onClick:function(){C(!1)},children:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("i",{className:"fa-regular fa-comments"})," \uc0c1\ub2f4",(0,y.jsx)("br",{}),"\uad00\ub9ac"]})}),(0,y.jsxs)("span",{id:"switch-btn",onClick:function(){ee("/checkListMemo",{state:{about:"checkLists"}})},children:[(0,y.jsx)("i",{className:"fa-regular fa-square-check"})," \uc81c\ucd9c",(0,y.jsx)("br",{}),"ox"]}),(0,y.jsxs)("span",{id:"switch-btn",onClick:function(){ee("/checkListMemo",{state:{about:"listMemo"}})},children:[(0,y.jsx)("i",{className:"fa-solid fa-clipboard-check"})," \uac1c\ubcc4",(0,y.jsx)("br",{}),"\uae30\ub85d"]})]})]}),m&&(0,y.jsx)(c.Z,{onClose:function(){h(!1)},students:Q?z:G,who:j,date:new Date,selectOption:u,addData:ne,about:"consulting",userUid:e.userUid,isSubject:!0}),0===(null===G||void 0===G?void 0:G.length)&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{children:"\uc62c\ud574 \ud559\uc0dd \uba85\ub2e8\uc774 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub124\uc694!"}),(0,y.jsx)("div",{children:"\uba54\ub274\uc758 \uacf0\ub3cc\uc774\ub97c \ub20c\ub7ec\uc11c"}),(0,y.jsx)("div",{children:"\ud559\uc0dd \uba85\ub2e8\uc744 \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694!"})]}),S?(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(N,{userUid:e.userUid,selectOption:u,addData:function(e){return ne(e)},deleteConsult:function(e,t){return ae(e,t)},isSubject:e.isSubject,students:e.students})}):(0,y.jsxs)(y.Fragment,{children:[Q&&(0,y.jsxs)("div",{children:[(0,y.jsxs)("select",{ref:te,onChange:function(){var e=te.current.value;L(e)},style:{fontSize:"1.2rem",width:"auto",margin:"10px 0 20px 0"},value:H,children:[(0,y.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===G||void 0===G?void 0:G.map((function(e){return(0,y.jsx)("option",{value:Object.keys(e),children:Object.keys(e)},Object.keys(e))}))]}),""===(null===te||void 0===te||null===(t=te.current)||void 0===t?void 0:t.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]}),(0,y.jsx)(d.Z,{students:Q?z:G,showOption:function(e){_(e.target.innerText),h(!0)},isSubject:e.isSubject}),(0,y.jsx)("br",{}),(0,y.jsx)(N,{userUid:e.userUid,selectOption:u,addData:function(e){return ne(e)},deleteConsult:function(e,t){return ae(e,t)},isSubject:e.isSubject,students:e.students})]})]})}},80571:function(e,t,n){n.d(t,{Z:function(){return o}});n(47313);var a=n(33451),i="ExampleModal_xmark__aUZiP",r="ExampleModal_img-div__6WVX9",s="ExampleModal_img__oJEG0",l=n(46417),o=function(e){return(0,l.jsxs)(a.Z,{onClose:e.onClose,addStyle:e.addStyle,children:[(0,l.jsx)("span",{onClick:e.onClose,className:i,children:(0,l.jsx)("i",{className:"fa-regular fa-circle-xmark"})}),(0,l.jsx)("div",{children:e.title}),(0,l.jsx)("hr",{style:{margin:"20px 15px"}}),(0,l.jsx)("div",{className:r,children:e.imgSrc&&(0,l.jsx)("img",{src:e.imgSrc,className:s,alt:"exampleGif"})}),(0,l.jsx)("div",{children:e.text}),(0,l.jsx)("div",{children:e.bottomText})]})}},27984:function(e,t){t.Z=[["2023-03",'div[aria-label="Choose 2023\ub144 3\uc6d4 1\uc77c \uc218\uc694\uc77c"]*3.1\uc808'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 5\uc77c \uae08\uc694\uc77c"]*\uc5b4\ub9b0\uc774\ub0a0'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 29\uc77c \uc6d4\uc694\uc77c"]*\uc11d\uac00\ud0c4\uc2e0\uc77c'],["2023-06",'div[aria-label="Choose 2023\ub144 6\uc6d4 6\uc77c \ud654\uc694\uc77c"]*\ud604\ucda9\uc77c'],["2023-08",'div[aria-label="Choose 2023\ub144 8\uc6d4 15\uc77c \ud654\uc694\uc77c"]*\uad11\ubcf5\uc808'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 28\uc77c \ubaa9\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 29\uc77c \uae08\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 2\uc77c \uc6d4\uc694\uc77c"]*\uc784\uc2dc\uacf5\ud734\uc77c'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 3\uc77c \ud654\uc694\uc77c"]*\uac1c\ucc9c\uc808'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 9\uc77c \uc6d4\uc694\uc77c"]*\ud55c\uae00\ub0a0'],["2023-12",'div[aria-label="Choose 2023\ub144 12\uc6d4 25\uc77c \uc6d4\uc694\uc77c"]*\uc131\ud0c4\uc808'],["2024-01",'div[aria-label="Choose 2024\ub144 1\uc6d4 1\uc77c \uc6d4\uc694\uc77c"]*\uc0c8\ud574'],["2024-02",'div[aria-label="Choose 2024\ub144 2\uc6d4 9\uc77c \uae08\uc694\uc77c"]*\uc124\ub0a0']]},95162:function(e,t,n){var a;n.d(t,{Z:function(){return d}});var i=new Uint8Array(16);function r(){if(!a&&!(a="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return a(i)}var s=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var l=function(e){return"string"===typeof e&&s.test(e)},o=[],u=0;u<256;++u)o.push((u+256).toString(16).substr(1));var c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(o[e[t+0]]+o[e[t+1]]+o[e[t+2]]+o[e[t+3]]+"-"+o[e[t+4]]+o[e[t+5]]+"-"+o[e[t+6]]+o[e[t+7]]+"-"+o[e[t+8]]+o[e[t+9]]+"-"+o[e[t+10]]+o[e[t+11]]+o[e[t+12]]+o[e[t+13]]+o[e[t+14]]+o[e[t+15]]).toLowerCase();if(!l(n))throw TypeError("Stringified UUID is invalid");return n};var d=function(e,t,n){var a=(e=e||{}).random||(e.rng||r)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){n=n||0;for(var i=0;i<16;++i)t[n+i]=a[i];return t}return c(a)}}}]);