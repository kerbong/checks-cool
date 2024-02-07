"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[650],{95186:function(e,t,n){n.d(t,{Z:function(){return c}});var a=n(70885),o=n(47313),i=n(61378),l=n.n(i),s=(n(72632),n(21560)),r=n(46417),c=function(e){var t=(0,o.useState)(e.setStart||new Date),n=(0,a.Z)(t,2),i=n[0],c=n[1],u=(0,o.useState)(e.setEnd||i),d=(0,a.Z)(u,2),p=d[0],f=d[1],h=o.forwardRef((function(e,t){var n=e.value,a=e.onClick;return(0,r.jsx)("button",{className:"custom-input",onClick:a,ref:t,title:"\ub0a0\uc9dc \uc120\ud0dd\ud558\uae30",children:n})}));(0,o.useEffect)((function(){if("main"===e.about)c(e.setStart);else if("tableInput"===e.about){if(!e.setStart||"object"!==typeof e.setStart)return;c(e.setStart)}}),[e.setStart]);return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(l(),{selected:i,onChange:function(t){if("attendance"===e.about||"todo"===e.about){var n=(0,a.Z)(t,2),o=n[0],i=n[1];c(o),f(i)}else c(t);e.getDateValue(t),"tableInput"===e.about&&e.tableDateChangeHandler(t)},filterDate:function(t){if(e.filterNone)return t;var n=t.getDay(t);return 0!==n&&6!==n},startDate:i,showMonthDropdown:!0,showYearDropdown:!0,scrollableYearDropdown:!0,onMonthChange:function(t){e.getMonthValue(t)},dateFormatCalendar:"yyyy\ub144 ",endDate:("attendance"===e.about||"todo"===e.about)&&p,selectsRange:("attendance"===e.about||"todo"===e.about)&&!0,disabledKeyboardNavigation:!0,highlightDates:e.highlight,customInput:(0,r.jsx)(h,{onClick:function(){if(e.filterNone){var t=document.querySelector(".react-datepicker__day-names"),n=document.querySelectorAll(".react-datepicker__day-name");t&&n&&(t.style.width="95%",n[0].style.width="14%",n[6].style.width="14%")}}}),fixedHeight:e.fixedHeight,inline:e.inline,locale:s.Z,dateFormat:e.showJustTime?"aa h:mm":e.showTime?"yy\ub144 MMMM d\uc77c(eee) aa h:mm":"yy\ub144 MMMM d\uc77c(eee)",showTimeSelectOnly:e.showJustTime,timeFormat:"aa h:mm",timeInputLabel:"\uc785\ub825/\uc120\ud0dd",showTimeInput:e.showTime,timeIntervals:10})})}},21261:function(e,t,n){n.d(t,{Z:function(){return C}});var a=n(42982),o=n(70885),i=n(47313),l="EventInput_event-area__HIhvd",s="EventInput_attendInfo-area__6dlzH",r="EventInput_optionChange-area__8AqDO",c="EventInput_button-area__Djlu5",u="EventInput_optionsSet__hyqeK",d="EventInput_attendInfo-student__wuEZD",p="EventInput_eventNameInput-area__fEujR",f="EventInput_note-area__x3iUw",h=n(37692),m=n(53776),v=n(33451),x=n(67114),_=n.n(x),b=n(95186),g=n(10658),S=n.n(g),j=(n(23889),n(46417)),y=void 0;S().locale("ko");var C=function(e){var t,n,x,g=(0,i.useState)(""),C=(0,o.Z)(g,2),w=C[0],I=C[1],N=(0,i.useState)(!1),Z=(0,o.Z)(N,2),k=Z[0],E=Z[1],D=(0,i.useState)(!1),F=(0,o.Z)(D,2),A=(F[0],F[1],(0,i.useState)(!1)),B=(0,o.Z)(A,2),M=B[0],O=B[1],q=(0,i.useState)(!1),R=(0,o.Z)(q,2),T=R[0],H=R[1],Y=(0,i.useState)(!1),V=(0,o.Z)(Y,2),K=V[0],z=V[1],L=(0,i.useState)([]),U=(0,o.Z)(L,2),P=U[0],W=U[1],J=(0,i.useState)(new Date),G=(0,o.Z)(J,2),Q=G[0],X=G[1],$=(0,i.useState)(!0),ee=(0,o.Z)($,2),te=ee[0],ne=ee[1],ae=(0,i.useState)(!1),oe=(0,o.Z)(ae,2),ie=oe[0],le=oe[1],se=(0,i.useState)(S()().format("YYYY-MM")),re=(0,o.Z)(se,2),ce=(re[0],re[1]),ue=(0,i.useRef)(null);(0,i.useEffect)((function(){"1\ud604\uc7a5\uccb4\ud5d8"!==te&&"3\uac00\uc815\ud559\uc2b5"!==te&&(H(!1),O(!1))}),[te]);var de=(0,i.useCallback)((function(){null!==ue&&null!==ue.current&&(ue.current.style.height="10px",ue.current.style.height=ue.current.scrollHeight-13+"px")}),[]),pe=function(e,t){e.target.value.length>t&&(e.target.value=e.target.value.substr(0,t),_().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uae00\uc790\uc218\ub97c \ucd08\uacfc\ud588\uc5b4\uc694! \ub0b4\uc6a9\uc744 ".concat(t,"\uc790 \uc774\ub0b4\ub85c \uc904\uc5ec\uc8fc\uc138\uc694."),confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))},fe=function(e){E(!1),I(e.target.innerText)},he=function(e){return e.split(" ")[1].slice(0,4)+"-"+e.split(" ")[2].slice(0,-1).padStart(2,"0")+"-"+e.split(" ")[3].slice(0,-1).padStart(2,"0")},me=function(e){return("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)},ve=function(){var t,n,a=document.querySelector("h1").getAttribute("class"),i=he(a),l="";if("consulting"===e.about){var s=me(new Date);l=i+s+w.split(" ")[0]}else if("attendance"===e.about){l=i+w.split(" ")[0]+" "+me(new Date);var r=document.querySelector(".eventOnDayList").querySelectorAll("li"),c=[];if(r.forEach((function(e){e.getAttribute("id")===l&&c.push(e)})),0!==c.length)return void _().fire({icon:"error",title:"\uc800\uc7a5 \uc2e4\ud328",html:"\uac19\uc740 \ub0a0, \uac19\uc740 \ud559\uc0dd\uc758 \ucd9c\uacb0\uc790\ub8cc\uac00 \uc788\uc5b4\uc694! <br/> ** \uac19\uc740 \ud559\uc0dd\uc758 \ucd9c\uacb0\uc790\ub8cc\ub97c \ucd94\uac00\ud558\uc2dc\ub824\uba74 <br/> 1\ubd84 \ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}else{n=document.querySelector("#todo-eventName").value,l=i+n;var u=document.querySelector(".eventOnDayList").querySelectorAll("li"),d=[];if(u.forEach((function(e){e.getAttribute("id")===l&&d.push(e)})),0!==d.length)return void _().fire({icon:"error",title:"\uc800\uc7a5 \uc2e4\ud328",text:"\uac19\uc740 \uc774\ub984\uc758 \ud589\uc0ac\uac00 \uac19\uc740 \ub0a0 \uc874\uc7ac\ud574\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}if(Array.isArray(Q)){var p,f,h=(0,o.Z)(Q,2);p=h[0],f=h[1];for(var m=S()(p),v=S()(f),x=[],b=m;b.isBefore(v)||b.isSame(v,"day");)0!==b.day()&&6!==b.day()&&x.push(b.format("YYYY-MM-DD")),b=b.add(1,"day");var g=[];x.forEach((function(e){t={id:e+n,eventName:n,option:document.getElementById("option-select").value,note:document.getElementById("option-note").value},g.push(t)})),e.rangeTodoData(g)}else t="todo"!==e.about?{eventDate:a,num:w.split(" ")[0],name:w.split(" ")[1],id:l}:{eventDate:a,eventName:n,id:l},"attendance"===e.about&&("1\ud604\uc7a5\uccb4\ud5d8"===te||"3\uac00\uc815\ud559\uc2b5"===te?(t.request=M,t.report=T):t.paper=K),e.saveNewData(t)};(0,i.useEffect)((function(){var t,n;if("attendance"===e.about&&e.events&&0!==(null===(t=e.events)||void 0===t?void 0:t.length)&&0!==(null===w||void 0===w?void 0:w.length)){var a=null===(n=e.events)||void 0===n?void 0:n.filter((function(e){return e.name===w.split(" ")[1]})),o=[];null===a||void 0===a||a.forEach((function(e){o.push(e.option)})),W(o)}}),[w]);return(0,i.useEffect)((function(){var e=document.querySelector(".modal");if(ie){var t=e.clientHeight+350+"px";e.style.height=t}else e.style.height=document.querySelector(".eventOnDayList").clientHeight+45+"px"}),[ie]),(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("li",{className:l,style:{backgroundColor:"#ffe9ed"},children:(0,j.jsxs)("div",{className:s,children:[(0,j.jsxs)("div",{className:d,children:["todo"!==e.about.slice(0,4)?(0,j.jsxs)(j.Fragment,{children:["1\ud604\uc7a5\uccb4\ud5d8"!==te&&"3\uac00\uc815\ud559\uc2b5"!==te?(0,j.jsx)(j.Fragment,{children:(0,j.jsx)(h.Z,{className:K?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),z((function(e){return!e}))},title:"\uc11c\ub958",name:"\uc11c\ub958"})}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(h.Z,{className:M?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),O((function(e){return!e}))},title:"\uc2e0\uccad\uc11c",name:"\uc2e0\uccad\uc11c"}),(0,j.jsx)(h.Z,{className:T?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),H((function(e){return!e}))},title:"\ubcf4\uace0\uc11c",name:"\ubcf4\uace0\uc11c"})]}),(0,j.jsx)(h.Z,{className:"choose-studentBtn",name:w||"\ud559\uc0dd\uc120\ud0dd",onclick:function(){var t;void 0===e.students||0===(null===(t=e.students)||void 0===t?void 0:t.length)?_().fire({icon:"error",title:"\uc120\ud0dd \ubd88\uac00",text:"\uba54\ub274\uc758 \uacf0\ub3cc\uc774\ub97c \ub20c\ub7ec\uc11c \uba3c\uc800 \ud559\uc0dd\uba85\ub2e8\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}):E(!k)}})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(h.Z,{className:ie?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){return le((function(e){return!e}))},name:"\ubc18\ubcf5"}),(0,j.jsx)("input",{type:"text",placeholder:"\ud589\uc0ac\uba85",id:"todo-eventName",className:p,autoFocus:!0,onInput:function(e){return pe(e,20)}})]}),(0,j.jsxs)("div",{className:c,children:[(0,j.jsx)(h.Z,{className:"small-student",name:(0,j.jsx)("span",{children:(0,j.jsx)("i",{className:"fa-regular fa-floppy-disk"})}),id:"save-btn".concat(e.id),onclick:function(){ve()}}),(0,j.jsx)(h.Z,{className:"small-student",name:(0,j.jsx)("span",{children:(0,j.jsx)("i",{className:"fa-solid fa-xmark"})}),id:"cancle-btn".concat(e.id),onclick:function(){e.closeHandler()}})]}),k&&(0,j.jsx)(v.Z,{onClose:fe,children:(0,j.jsx)(m.Z,{students:e.students,showOption:fe,isSubject:e.isSubject})})]}),(0,j.jsxs)("form",{className:r,onSubmit:function(e){e.preventDefault(),ve()},children:[e.selectOption&&(0,j.jsxs)("select",{name:"attend-option",id:w?"option-select".concat(w.split(" ")[0]):"option-select",defaultValue:e.dafaultValue,required:!0,onChange:function(e){return ne(e.target.value)},children:[(0,j.jsx)("option",{value:"",children:"-- \ubd84\ub958 --"}),null===(t=e.selectOption)||void 0===t?void 0:t.map((function(e){return(0,j.jsx)("option",{value:e.value,children:e.class},e.id)}))]}),(0,j.jsx)("textarea",{ref:ue,type:"text",onKeyDown:function(){return de(y)},onKeyUp:function(){return de(y)},onClick:function(){return de(y)},placeholder:e.placeholder,id:w?"option-note".concat(w.split(" ")[0]):"option-note",className:f,onInput:function(t){"todo"===e.about.slice(0,4)?pe(t,60):pe(t,40)}})]}),"attendance"===e.about&&(null===P||void 0===P?void 0:P.length)>0&&(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)("span",{className:u,children:[(0,j.jsx)("span",{className:u,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0\uc815\ubcf4:"}),null===(n=(0,a.Z)(new Set(P)))||void 0===n?void 0:n.map((function(e){return(0,j.jsxs)("span",{className:u,children:["\ud83d\ude42",null===e||void 0===e?void 0:e.slice(1)," ",null===P||void 0===P?void 0:P.filter((function(t){return t===e})).length,"\uc77c"]},"optionSet-".concat(e))}))]})}),"todo"===(null===(x=e.about)||void 0===x?void 0:x.slice(0,4))&&(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:d,style:{textAlign:"center"},children:ie&&(0,j.jsx)(b.Z,{filterNone:!0,setStart:new Date(he(e.today)),getDateValue:function(e){X(e)},about:"todo",getMonthValue:function(e){ce(S()(e).format("YYYY-MM"))}})})}),"attendance"===e.about&&0===(null===P||void 0===P?void 0:P.length)&&(0,j.jsx)("span",{className:u,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0 \uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"})]})})})}},48202:function(e,t,n){n.d(t,{Z:function(){return C}});var a=n(1413),o=n(70885),i=n(47313),l=n(67114),s=n.n(l),r="EventItem_event-area__HZzO9",c="EventItem_titleDate-area__nLD2U",u="EventItem_attendInfo-area__lANso",d="EventItem_option-area__LMxUJ",p="EventItem_optionChange-area__ypKm2",f="EventItem_button-area__k0N4P",h="EventItem_note-area__d51XB",m="EventItem_optionNote-area__JyY-B",v="EventItem_date-area__9Fkug",x="EventItem_datePick-area__ZF0TI",_="EventItem_eventNameInput-area__7hnmS",b="EventItem_title-h2__oIhg9",g=n(37692),S=n(95186),j=n(46417),y=void 0,C=function(e){var t,n,l=e.item,C=e.keyId,w=e.text,I=e.note,N=e.shownId,Z=e.option,k=(0,i.useState)(C),E=(0,o.Z)(k,2),D=E[0],F=E[1],A=(0,i.useState)(Z),B=(0,o.Z)(A,2),M=B[0],O=B[1],q=(0,i.useState)((null===l||void 0===l?void 0:l.paper)||!1),R=(0,o.Z)(q,2),T=R[0],H=R[1],Y=(0,i.useState)((null===l||void 0===l?void 0:l.request)||!1),V=(0,o.Z)(Y,2),K=V[0],z=V[1],L=(0,i.useState)((null===l||void 0===l?void 0:l.report)||!1),U=(0,o.Z)(L,2),P=U[0],W=U[1],J=(0,i.useRef)(null),G=(0,i.useRef)(null),Q=(0,i.useRef)(null),X=(0,i.useCallback)((function(){null!==J&&null!==J.current&&(J.current.style.height="10px",J.current.style.height=J.current.scrollHeight-13+"px")}),[]),$=function(e,t){e.target.value.length>t&&(e.target.value=e.target.value.substr(0,t),s().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uc785\ub825\ud55c \ub0b4\uc6a9\uc744 \uc904\uc5ec\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))},ee=function(){var t=(0,a.Z)({},l);"attendance"===e.about&&(void 0===(null===l||void 0===l?void 0:l.paper)?(t.request=K,t.report=P):t.paper=T),"todo"===e.about.slice(0,4)&&(t.eventName=G.current.value,t.option=Q.current.value,t.note=J.current.value),D.slice(0,10)!==C.slice(0,10)?(t.id=D,"attendance"===e.about&&(t.beforeId=C),e.saveFixedData(t)):e.saveFixedData(t)},te=function(e){O(e.target.value)};return(0,i.useEffect)((function(){null!==J.current&&(J.current.style.height=J.current.scrollHeight-20+"px")}),[e.fixIsShown]),(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)("li",{id:C,className:"".concat(r),style:{backgroundColor:e.fixIsShown===N&&"#ffe9ed"},children:[(0,j.jsxs)("div",{id:"attendInfo-area".concat(N),className:u,children:[(0,j.jsxs)("div",{className:"".concat(c),children:[(0,j.jsxs)("h2",{id:"eventName"+N,className:b,style:{display:"todo"===e.about.slice(0,4)&&e.fixIsShown===N&&"none"},children:["\ud83d\ude00 ".concat(w," ").concat(null!==e&&void 0!==e&&e.setNum?"(".concat(e.setNum,")"):""),"attendance"===e.about&&(0,j.jsxs)(j.Fragment,{children:[e.fixIsShown!==N&&T&&(0,j.jsx)(g.Z,{className:"paperSub-btn-s-clicked",icon:(0,j.jsx)("span",{children:(0,j.jsx)("i",{className:"fa-solid fa-circle-check"})})}),e.fixIsShown!==N&&void 0===(null===l||void 0===l?void 0:l.paper)&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(g.Z,{className:K?"reqRepSub-btn-s-clicked":"reqRepSub-btn-s",name:"\uc2e0",style:{marginLeft:"10px",cursor:"auto"}}),(0,j.jsx)(g.Z,{className:P?"reqRepSub-btn-s-clicked":"reqRepSub-btn-s",style:{cursor:"auto"},name:"\ubcf4"})]}),e.fixIsShown===N&&void 0!==(null===l||void 0===l?void 0:l.paper)&&(0,j.jsx)(g.Z,{className:T?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){e.fixIsShown===N&&H((function(e){return!e}))},name:"\uc11c\ub958",icon:(0,j.jsx)("span",{children:(0,j.jsx)("i",{className:"fa-solid fa-circle-check"})})}),e.fixIsShown===N&&void 0===(null===l||void 0===l?void 0:l.paper)&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(g.Z,{className:K?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){e.fixIsShown===N&&z((function(e){return!e}))},style:{width:"auto",letterSpacing:"-1px"},name:"\uc2e0\uccad\uc11c"}),(0,j.jsx)(g.Z,{className:P?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){e.fixIsShown===N&&W((function(e){return!e}))},style:{width:"auto",letterSpacing:"-1px"},name:"\ubcf4\uace0\uc11c"})]})]})]}),"todo"===e.about.slice(0,4)&&e.fixIsShown===N&&(0,j.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:(0,j.jsx)("input",{type:"text",placeholder:"\ud589\uc0ac\uba85",id:"todo-eventName",className:_,autoFocus:!0,ref:G,defaultValue:w,onInput:function(e){return $(e,20)}})}),(0,j.jsxs)("div",{className:v,style:{display:e.fixIsShown!==N&&"none"},children:[(0,j.jsxs)("div",{className:"".concat(x),children:[(0,j.jsx)("i",{className:"fa-solid fa-circle-arrow-right"}),(0,j.jsx)(S.Z,{getDateValue:function(e){var t=e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2)+C.slice(10);F(t)},setStart:new Date((n=C,n.slice(0,10).replace(/-/g,"/"))),getMonthValue:function(){}})]}),"todo"!==e.about.slice(0,4)?"\ucd9c\uacb0\ubcf5\uc0ac(\ub0a0\uc9dc\uc120\ud0dd-\uc800\uc7a5)":"\uc77c\uc815\ubcf5\uc0ac(\ub0a0\uc9dc\uc120\ud0dd-\uc800\uc7a5)"]}),"todo"!==e.about.slice(0,4)&&(0,j.jsxs)("span",{id:"option-area".concat(C),className:d,style:{display:e.fixIsShown===N&&"none"},children:[Z.slice(1)," | ",I&&I]})]}),(0,j.jsxs)("div",{className:f,children:[(0,j.jsx)(g.Z,{className:"small-student",name:e.fixIsShown!==N?(0,j.jsx)("span",{children:(0,j.jsx)("i",{className:"fa-solid fa-pencil"})}):(0,j.jsx)("span",{children:(0,j.jsx)("i",{className:"fa-regular fa-floppy-disk"})}),id:e.fixIsShown!==N?"fix-btn".concat(N):"save-btn".concat(N),onclick:e.fixIsShown!==N?function(){e.setFixIsShown(N)}:ee}),(0,j.jsx)(g.Z,{className:"small-student",name:e.fixIsShown!==N?(0,j.jsx)("span",{children:(0,j.jsx)("i",{className:"fa-regular fa-trash-can"})}):(0,j.jsx)("span",{children:(0,j.jsx)("i",{className:"fa-solid fa-xmark"})}),id:e.fixIsShown!==N?"delete-btn".concat(N):"cancle-btn".concat(N),onclick:e.fixIsShown!==N?function(){e.removeCheckSwal(l)}:function(){H((null===l||void 0===l?void 0:l.paper)||!1),z((null===l||void 0===l?void 0:l.request)||!1),W((null===l||void 0===l?void 0:l.report)||!1),e.setFixIsShown("0"),O("")}})]})]}),"todo"===e.about.slice(0,4)&&(0,j.jsxs)("span",{id:"option-area".concat(w.replace(/ /g,"")),className:d,style:{display:e.fixIsShown===N&&"none",marginLeft:"20px"},children:[Z.slice(1)," | ",I&&I]}),(0,j.jsx)("div",{className:m,style:{display:e.fixIsShown!==N&&"none"},children:(0,j.jsxs)("form",{id:"optionChange-area".concat(N),className:p,style:{display:e.fixIsShown!==N&&"none"},onSubmit:function(e){e.preventDefault(),ee()},children:[(0,j.jsxs)("select",{name:"option-selcet",id:"option-select".concat("todo"===e.about.slice(0,4)?w.replace(/ /g,""):C),required:!0,defaultValue:M,onChange:te,ref:Q,style:{width:"30%"},children:[(0,j.jsx)("option",{value:"",onChange:te,disabled:!0,children:"-- \ubd84\ub958 --"}),null===(t=e.selectOption)||void 0===t?void 0:t.map((function(e){return(0,j.jsx)("option",{value:e.value,onChange:te,children:e.class},e.id)}))]},"option-select".concat(C)),(0,j.jsx)("textarea",{ref:J,onKeyDown:function(){return X(y)},onKeyUp:function(){return X(y)},onClick:function(){return X(y)},defaultValue:I||"",id:"option-note".concat("todo"===e.about.slice(0,4)?w.replace(/ /g,""):C),className:h,onInput:function(e){$(e,40)}},N)]})})]},C)})}},35729:function(e,t,n){n.d(t,{Z:function(){return c}});var a=n(70885),o=n(47313),i="FileArea_fileArea__MQmcW",l="FileArea_previewImg__+SvF8",s=n(47785),r=n(46417),c=function(e){var t=(0,o.useState)(e.file||""),n=(0,a.Z)(t,2),c=n[0],u=n[1];return(0,r.jsxs)("div",{className:i,children:[c&&(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("img",{src:c,className:l,alt:"filePreview"})}),"attendance"!==e.about&&(0,r.jsx)(s.Z,{attachedFileHandler:function(t){e.attachedFileHandler(t),u(t)},src:c,about:e.about})]})}},47785:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(74165),o=n(15861),i=n(70885),l=n(47313),s="FileForm_fileUploadBtn__r9msD",r=n(42964),c=n(46417),u=function(e){var t=(0,l.useState)(e.src||""),n=(0,i.Z)(t,2),u=n[0],d=n[1],p=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={maxSizeMb:1,maxWidthOrHeight:1e3},e.next=4,(0,r.Z)(t,n);case 4:return e.abrupt("return",e.sent);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),f=function(){var t=(0,o.Z)((0,a.Z)().mark((function t(n){var o,i,l;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(o=n.target.files[0])){t.next=8;break}return t.next=4,p(o);case 4:i=t.sent,(l=new FileReader).onloadend=function(t){d(t.currentTarget.result),e.attachedFileHandler(t.currentTarget.result)},l.readAsDataURL(i);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("label",{id:"attachedFile",htmlFor:"attachFile",className:s,onClick:function(){u&&d("")},style:"padIt"===e.about?{backgroundColor:"#687f7f"}:{},children:u?"\ucd08\uae30\ud654 & \uc774\ubbf8\uc9c0 \ubcc0\uacbd":"\uc774\ubbf8\uc9c0 \ucd94\uac00"}),(0,c.jsx)("input",{type:"file",accept:"image/*",onChange:f,style:{display:"none"},id:"attachFile"})]})}},44484:function(e,t,n){n.d(t,{Z:function(){return c}});var a=n(1413),o=n(70885),i=n(47313),l={"class-subject":"Input_class-subject__E+qGy","rowcolumn-input":"Input_rowcolumn-input__MzKWZ","simsim-Text":"Input_simsim-Text__7+u+1","meetSum-Text":"Input_meetSum-Text__0ijY3","class-memo":"Input_class-memo__eXBTy","attendForm-input":"Input_attendForm-input__KLvku","memo-section":"Input_memo-section__CGRYR","simsimMain-input":"Input_simsimMain-input__TVHos","board-input":"Input_board-input__2xPzk","board-input-half":"Input_board-input-half__Lu9st","fs-80px":"Input_fs-80px__t0quj","fs-70px":"Input_fs-70px__ZcOO7","fs-60px":"Input_fs-60px__QNEgw","fs-50px":"Input_fs-50px__GEaU0","fs-40px":"Input_fs-40px__OICBO","memoAdd-textarea":"Input_memoAdd-textarea__dssNI","gptResult-input":"Input_gptResult-input__6i8It"},s=n(46417),r=void 0,c=i.forwardRef((function(e,t){var n=(0,i.useRef)(null),c=(0,i.useState)(""),u=(0,o.Z)(c,2),d=u[0],p=u[1],f=(0,i.useState)(""),h=(0,o.Z)(f,2),m=h[0],v=h[1];(0,i.useEffect)((function(){p("")}),[]),(0,i.useEffect)((function(){p(e.defaultValue)}),[e.defaultValue]);var x=function(){var t;return"40px"===e.fontSize?t="10-900":"50px"===e.fontSize?t="9-310":"60px"===e.fontSize?t="8-190":"70px"===e.fontSize?t="7-150":"80px"===e.fontSize&&(t="6-120"),/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)&&(t="25-400"),t},_=function(t){p(n.current.value),e.getValue&&e.getValueHandler(t)};(0,i.useEffect)((function(){!0===e.showOn?v("1"):!1===e.showOn?v("0"):v(e.showOn)}),[e.showOn]),(0,i.useEffect)((function(){"textarea"===e.input.type&&g()}),[m]),(0,i.useEffect)((function(){n.current.style.height=e.startheight}),[e.startheight]);var b=function(){var t,a,o,i,l=null===(t=x())||void 0===t||null===(a=t.split("-"))||void 0===a?void 0:a[0],s=null===(o=x())||void 0===o||null===(i=o.split("-"))||void 0===i?void 0:i[1],r=n.current.value.split("\n"),c=Math.ceil((n.current.clientWidth-50)/(+e.fontSize.slice(0,2)+2)),u=r.length;r.forEach((function(e){var t=Math.floor(e.length/c);t>1&&(u+=t)})),+u>+l?e.maxRowAlert("enter"):n.current.value.length>+s&&e.maxRowAlert("length")};(0,i.useEffect)((function(){""!==e.fontSize&&void 0!==e.fontSize&&b()}),[e.fontSize]);var g=function(t){if(null!==n&&null!==n.current){if(e.alarm)return window.scrollTo(0,n.current.scrollHeight/2),void b();n.current.style.height="10px",n.current.style.height=n.current.scrollHeight-13+"px"}};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("label",{htmlFor:e.input.id}),"textarea"===e.input.type?(0,s.jsx)("textarea",(0,a.Z)((0,a.Z)({id:e.id,ref:n},e.input),{},{className:l[e.className],onKeyDown:function(){return g(r)},onKeyUp:function(){return g(r)},onClick:function(){return g(r)},value:d||"",onInput:e.onInput,required:!!e.required,onChange:_,placeholder:e.placeholder||""}),"textArea"+e.myKey):(0,s.jsx)("input",(0,a.Z)((0,a.Z)({id:e.input.id,type:e.input.type,required:!!e.required,className:l[e.className],onInput:e.onInput,ref:n},e.input),{},{value:d||"",onChange:_,placeholder:e.placeholder||""}),e.myKey)]})}))},53776:function(e,t,n){n.d(t,{Z:function(){return l}});n(47313);var a="Student_div__ROh5A",o=n(77405),i=n(46417),l=function(e){var t;return(0,i.jsx)("div",{className:a,children:e.students&&(null===(t=e.students)||void 0===t?void 0:t.map((function(t){var n;return(0,i.jsx)(o.Z,{className:e.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(n=e.passStudent)||void 0===n?void 0:n.split(" ")[1])===t.name,manageEach:e.manageEach,name:t.name,num:t.num,woman:t.woman,onShowOption:function(t){e.showOption(t),t.target+="add"}},t.num)})))})}},77405:function(e,t,n){n.d(t,{Z:function(){return i}});n(47313);var a={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"},o=n(46417),i=function(e){return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("button",{className:"".concat(a[e.className]," ").concat(e.classAdd&&"clicked"," ").concat(!e.woman&&a.woman),id:"std-".concat(e.num," ").concat(e.name),onClick:function(t){e.onShowOption(t)},title:null===e||void 0===e?void 0:e.title,children:[e.num," ",e.name]},"stdBtn-".concat(e.num," ").concat(e.name))})}},27984:function(e,t){t.Z=[["2023-03",'div[aria-label="Choose 2023\ub144 3\uc6d4 1\uc77c \uc218\uc694\uc77c"]*3.1\uc808'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 5\uc77c \uae08\uc694\uc77c"]*\uc5b4\ub9b0\uc774\ub0a0'],["2023-05",'div[aria-label="Choose 2023\ub144 5\uc6d4 29\uc77c \uc6d4\uc694\uc77c"]*\uc11d\uac00\ud0c4\uc2e0\uc77c'],["2023-06",'div[aria-label="Choose 2023\ub144 6\uc6d4 6\uc77c \ud654\uc694\uc77c"]*\ud604\ucda9\uc77c'],["2023-08",'div[aria-label="Choose 2023\ub144 8\uc6d4 15\uc77c \ud654\uc694\uc77c"]*\uad11\ubcf5\uc808'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 28\uc77c \ubaa9\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-09",'div[aria-label="Choose 2023\ub144 9\uc6d4 29\uc77c \uae08\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 2\uc77c \uc6d4\uc694\uc77c"]*\uc784\uc2dc\uacf5\ud734\uc77c'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 3\uc77c \ud654\uc694\uc77c"]*\uac1c\ucc9c\uc808'],["2023-10",'div[aria-label="Choose 2023\ub144 10\uc6d4 9\uc77c \uc6d4\uc694\uc77c"]*\ud55c\uae00\ub0a0'],["2023-12",'div[aria-label="Choose 2023\ub144 12\uc6d4 25\uc77c \uc6d4\uc694\uc77c"]*\uc131\ud0c4\uc808'],["2024-01",'div[aria-label="Choose 2024\ub144 1\uc6d4 1\uc77c \uc6d4\uc694\uc77c"]*\uc0c8\ud574'],["2024-02",'div[aria-label="Choose 2024\ub144 2\uc6d4 9\uc77c \uae08\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2024-02",'div[aria-label="Choose 2024\ub144 2\uc6d4 12\uc77c \uc6d4\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2024-03",'div[aria-label="Choose 2024\ub144 3\uc6d4 1\uc77c \uae08\uc694\uc77c"]*\uc0bc\uc77c\uc808'],["2024-04",'div[aria-label="Choose 2024\ub144 4\uc6d4 10\uc77c \uc218\uc694\uc77c"]*\uad6d\ud68c\uc120\uac70'],["2024-05",'div[aria-label="Choose 2024\ub144 5\uc6d4 6\uc77c \uc6d4\uc694\uc77c"]*\uc5b4\ub9b0\uc774\ub0a0\ub300\uccb4'],["2024-05",'div[aria-label="Choose 2024\ub144 5\uc6d4 15\uc77c \uc218\uc694\uc77c"]*\ubd80\ucc98\ub2d8\uc624\uc2e0\ub0a0'],["2024-06",'div[aria-label="Choose 2024\ub144 6\uc6d4 6\uc77c \ubaa9\uc694\uc77c"]*\ud604\ucda9\uc77c'],["2024-08",'div[aria-label="Choose 2024\ub144 8\uc6d4 15\uc77c \ubaa9\uc694\uc77c"]*\uad11\ubcf5\uc808'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 16\uc77c \uc6d4\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 17\uc77c \ud654\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-09",'div[aria-label="Choose 2024\ub144 9\uc6d4 18\uc77c \uc218\uc694\uc77c"]*\ucd94\uc11d\uc5f0\ud734'],["2024-10",'div[aria-label="Choose 2024\ub144 10\uc6d4 3\uc77c \ubaa9\uc694\uc77c"]*\uac1c\ucc9c\uc808'],["2024-10",'div[aria-label="Choose 2024\ub144 10\uc6d4 9\uc77c \uc218\uc694\uc77c"]*\ud55c\uae00\ub0a0'],["2024-12",'div[aria-label="Choose 2024\ub144 12\uc6d4 25\uc77c \uc218\uc694\uc77c"]*\ud06c\ub9ac\uc2a4\ub9c8\uc2a4'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 1\uc77c \uc218\uc694\uc77c"]*\uc2e0\uc815'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 28\uc77c \ud654\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 29\uc77c \uc218\uc694\uc77c"]*\uc124\uc5f0\ud734'],["2025-01",'div[aria-label="Choose 2025\ub144 1\uc6d4 30\uc77c \ubaa9\uc694\uc77c"]*\uc124\uc5f0\ud734']]},62652:function(e,t){t.Z={eventData:"AttendCtxCalendar_eventData__JV9KA",holidayData:"AttendCtxCalendar_holidayData__FAK80",showOptionCal:"AttendCtxCalendar_showOptionCal__09Ctn",paperOn:"AttendCtxCalendar_paperOn__KwKsr","todoExplain-p":"AttendCtxCalendar_todoExplain-p__ZuYpx","class-select":"AttendCtxCalendar_class-select__EDabe","classSelect-div":"AttendCtxCalendar_classSelect-div__vw7Rp","classSelect-title":"AttendCtxCalendar_classSelect-title__F1HBA",op1:"AttendCtxCalendar_op1__QA9ff",op2:"AttendCtxCalendar_op2__SN2md",op3:"AttendCtxCalendar_op3__xILxg",todoOption:"AttendCtxCalendar_todoOption__tDVsH","todo-option-btns":"AttendCtxCalendar_todo-option-btns__921+Z","todo-option":"AttendCtxCalendar_todo-option__+T1NU","todo-option-expl":"AttendCtxCalendar_todo-option-expl__Zx94W","memo-headerBtn":"AttendCtxCalendar_memo-headerBtn__PBuBZ"}}}]);