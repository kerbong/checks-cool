"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[280],{1261:function(e,t,n){n.d(t,{Z:function(){return y}});var a=n(2982),o=n(885),i=n(7313),s="EventInput_event-area__HIhvd",l="EventInput_attendInfo-area__6dlzH",c="EventInput_optionChange-area__8AqDO",r="EventInput_button-area__Djlu5",u="EventInput_optionsSet__hyqeK",d="EventInput_attendInfo-student__wuEZD",f="EventInput_eventNameInput-area__fEujR",p="EventInput_note-area__x3iUw",x=n(7692),h=n(3776),m=n(3451),v=n(7114),_=n.n(v),g=n(5186),j=n(658),b=n.n(j),S=(n(3889),n(6417)),N=void 0;b().locale("ko");var y=function(e){var t,n,v,j=(0,i.useState)(""),y=(0,o.Z)(j,2),C=y[0],I=y[1],w=(0,i.useState)(!1),k=(0,o.Z)(w,2),Z=k[0],D=k[1],E=(0,i.useState)(!1),A=(0,o.Z)(E,2),B=(A[0],A[1],(0,i.useState)(!1)),F=(0,o.Z)(B,2),Y=F[0],O=F[1],q=(0,i.useState)([]),H=(0,o.Z)(q,2),M=H[0],V=H[1],T=(0,i.useState)(new Date),K=(0,o.Z)(T,2),L=K[0],U=K[1],R=(0,i.useState)(!1),J=(0,o.Z)(R,2),P=J[0],z=J[1],Q=(0,i.useState)(b()().format("YYYY-MM")),W=(0,o.Z)(Q,2),X=(W[0],W[1]),G=(0,i.useRef)(null),$=(0,i.useCallback)((function(){null!==G&&null!==G.current&&(G.current.style.height="10px",G.current.style.height=G.current.scrollHeight-13+"px")}),[]),ee=function(e,t){e.target.value.length>t&&(e.target.value=e.target.value.substr(0,t),_().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uae00\uc790\uc218\ub97c \ucd08\uacfc\ud588\uc5b4\uc694! \ub0b4\uc6a9\uc744 ".concat(t,"\uc790 \uc774\ub0b4\ub85c \uc904\uc5ec\uc8fc\uc138\uc694."),confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))},te=function(e){D(!1),I(e.target.innerText)},ne=function(e){return e.split(" ")[1].slice(0,4)+"-"+e.split(" ")[2].slice(0,-1).padStart(2,"0")+"-"+e.split(" ")[3].slice(0,-1).padStart(2,"0")},ae=function(){var t,n,a,i=document.querySelector("h1").getAttribute("class"),s=ne(i),l="";if("consulting"===e.about){var c=("0"+(a=new Date).getHours()).slice(-2)+":"+("0"+a.getMinutes()).slice(-2);l=s+c+C.split(" ")[0]}else if("attendance"===e.about){l=s+C.split(" ")[0];var r=document.querySelector(".eventOnDayList").querySelectorAll("li"),u=[];if(r.forEach((function(e){e.getAttribute("id")===l&&u.push(e)})),0!==u.length)return void _().fire({icon:"error",title:"\uc800\uc7a5 \uc2e4\ud328",text:"\uac19\uc740 \ub0a0, \uac19\uc740 \ud559\uc0dd\uc758 \ucd9c\uacb0\uc815\ubcf4\uac00 \uc788\uc5b4\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}else{n=document.querySelector("#todo-eventName").value,l=s+n;var d=document.querySelector(".eventOnDayList").querySelectorAll("li"),f=[];if(d.forEach((function(e){e.getAttribute("id")===l&&f.push(e)})),0!==f.length)return void _().fire({icon:"error",title:"\uc800\uc7a5 \uc2e4\ud328",text:"\uac19\uc740 \uc774\ub984\uc758 \ud589\uc0ac\uac00 \uac19\uc740 \ub0a0 \uc874\uc7ac\ud574\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}if(Array.isArray(L)){var p,x,h=(0,o.Z)(L,2);p=h[0],x=h[1];for(var m=b()(p),v=b()(x),g=[],j=m;j.isBefore(v)||j.isSame(v,"day");)0!==j.day()&&6!==j.day()&&g.push(j.format("YYYY-MM-DD")),j=j.add(1,"day");var S=[];g.forEach((function(e){t={id:e+n,eventName:n,option:document.getElementById("option-select").value,note:document.getElementById("option-note").value},S.push(t)})),e.rangeTodoData(S)}else t="todo"!==e.about?{eventDate:i,num:C.split(" ")[0],name:C.split(" ")[1],id:l}:{eventDate:i,eventName:n,id:l},"attendance"===e.about&&(t.paper=Y),e.saveNewData(t)};(0,i.useEffect)((function(){var t,n;if("attendance"===e.about&&e.events&&0!==(null===(t=e.events)||void 0===t?void 0:t.length)&&0!==(null===C||void 0===C?void 0:C.length)){var a=null===(n=e.events)||void 0===n?void 0:n.filter((function(e){return e.name===C.split(" ")[1]})),o=[];null===a||void 0===a||a.forEach((function(e){o.push(e.option)})),V(o)}}),[C]);return(0,i.useEffect)((function(){var e=document.querySelector(".modal");if(P){var t=e.clientHeight+350+"px";e.style.height=t}else e.style.height=document.querySelector(".eventOnDayList").clientHeight+45+"px"}),[P]),(0,S.jsx)(S.Fragment,{children:(0,S.jsx)("li",{className:s,style:{backgroundColor:"#ffe9ed"},children:(0,S.jsxs)("div",{className:l,children:[(0,S.jsxs)("div",{className:d,children:["todo"!==e.about.slice(0,4)?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(x.Z,{className:Y?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){O((function(e){return!e}))},name:"\uc11c\ub958",icon:(0,S.jsx)("span",{children:(0,S.jsx)("i",{className:"fa-solid fa-circle-check"})})}),(0,S.jsx)(x.Z,{className:"choose-studentBtn",name:C||"\ud559\uc0dd\uc120\ud0dd",onclick:function(){var t;void 0===e.students||0===(null===(t=e.students)||void 0===t?void 0:t.length)?_().fire({icon:"error",title:"\uc120\ud0dd \ubd88\uac00",text:"\uba54\ub274\uc758 \uacf0\ub3cc\uc774\ub97c \ub20c\ub7ec\uc11c \uba3c\uc800 \ud559\uc0dd\uba85\ub2e8\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}):D(!Z)}})]}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(x.Z,{className:P?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){return z((function(e){return!e}))},name:"\ubc18\ubcf5"}),(0,S.jsx)("input",{type:"text",placeholder:"\ud589\uc0ac\uba85",id:"todo-eventName",className:f,autoFocus:!0,onInput:function(e){return ee(e,20)}})]}),(0,S.jsxs)("div",{className:r,children:[(0,S.jsx)(x.Z,{className:"small-student",name:(0,S.jsx)("span",{children:(0,S.jsx)("i",{className:"fa-regular fa-floppy-disk"})}),id:"save-btn".concat(e.id),onclick:function(){ae()}}),(0,S.jsx)(x.Z,{className:"small-student",name:(0,S.jsx)("span",{children:(0,S.jsx)("i",{className:"fa-solid fa-xmark"})}),id:"cancle-btn".concat(e.id),onclick:function(){e.closeHandler()}})]}),Z&&(0,S.jsx)(m.Z,{onClose:te,children:(0,S.jsx)(h.Z,{students:e.students,showOption:te,isSubject:e.isSubject})})]}),(0,S.jsxs)("form",{className:c,onSubmit:function(e){e.preventDefault(),ae()},children:[e.selectOption&&(0,S.jsxs)("select",{name:"attend-option",id:C?"option-select".concat(C.split(" ")[0]):"option-select",defaultValue:e.dafaultValue,required:!0,children:[(0,S.jsx)("option",{value:"",children:"-- \ubd84\ub958 --"}),null===(t=e.selectOption)||void 0===t?void 0:t.map((function(e){return(0,S.jsx)("option",{value:e.value,children:e.class},e.id)}))]}),(0,S.jsx)("textarea",{ref:G,type:"text",onKeyDown:function(){return $(N)},onKeyUp:function(){return $(N)},onClick:function(){return $(N)},placeholder:e.placeholder,id:C?"option-note".concat(C.split(" ")[0]):"option-note",className:p,onInput:function(t){"todo"===e.about.slice(0,4)?ee(t,60):ee(t,40)}})]}),"attendance"===e.about&&(null===M||void 0===M?void 0:M.length)>0&&(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)("span",{className:u,children:[(0,S.jsx)("span",{className:u,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0\uc815\ubcf4:"}),null===(n=(0,a.Z)(new Set(M)))||void 0===n?void 0:n.map((function(e){return(0,S.jsxs)("span",{className:u,children:["\ud83d\ude42",null===e||void 0===e?void 0:e.slice(1)," ",null===M||void 0===M?void 0:M.filter((function(t){return t===e})).length,"\uc77c"]},"optionSet-".concat(e))}))]})}),"todo"===(null===(v=e.about)||void 0===v?void 0:v.slice(0,4))&&(0,S.jsx)(S.Fragment,{children:(0,S.jsx)("div",{className:d,style:{textAlign:"center"},children:P&&(0,S.jsx)(g.Z,{filterNone:!0,setStart:new Date(ne(e.today)),getDateValue:function(e){U(e)},about:"todo",getMonthValue:function(e){X(b()(e).format("YYYY-MM"))}})})}),"attendance"===e.about&&0===(null===M||void 0===M?void 0:M.length)&&(0,S.jsx)("span",{className:u,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0 \uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"})]})})})}},8202:function(e,t,n){n.d(t,{Z:function(){return N}});var a=n(1413),o=n(885),i=n(7313),s=n(7114),l=n.n(s),c="EventItem_event-area__HZzO9",r="EventItem_titleDate-area__nLD2U",u="EventItem_attendInfo-area__lANso",d="EventItem_option-area__LMxUJ",f="EventItem_optionChange-area__ypKm2",p="EventItem_button-area__k0N4P",x="EventItem_note-area__d51XB",h="EventItem_optionNote-area__JyY-B",m="EventItem_date-area__9Fkug",v="EventItem_datePick-area__ZF0TI",_="EventItem_title-h2__oIhg9",g=n(7692),j=n(5186),b=n(6417),S=void 0,N=function(e){var t,n,s=e.item,N=e.keyId,y=e.text,C=e.note,I=e.shownId,w=e.option,k=(0,i.useState)(N),Z=(0,o.Z)(k,2),D=Z[0],E=Z[1],A=(0,i.useState)(w),B=(0,o.Z)(A,2),F=B[0],Y=B[1],O=(0,i.useState)((null===s||void 0===s?void 0:s.paper)||!1),q=(0,o.Z)(O,2),H=q[0],M=q[1],V=(0,i.useRef)(null),T=(0,i.useCallback)((function(){null!==V&&null!==V.current&&(V.current.style.height="10px",V.current.style.height=V.current.scrollHeight-13+"px")}),[]),K=function(){var t=(0,a.Z)({},s);"attendance"===e.about&&(t.paper=H),D.slice(0,10)!==N.slice(0,10)?(t.id=D,e.saveFixedData(t)):e.saveFixedData(t)},L=function(e){Y(e.target.value)};return(0,i.useEffect)((function(){null!==V.current&&(V.current.style.height=V.current.scrollHeight-20+"px")}),[e.fixIsShown]),(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)("li",{id:N,className:"".concat(c),style:{backgroundColor:e.fixIsShown===I&&"#ffe9ed"},children:[(0,b.jsxs)("div",{id:"attendInfo-area".concat(I),className:u,children:[(0,b.jsxs)("div",{className:"".concat(r),children:[(0,b.jsxs)("h2",{id:"eventName"+I,className:_,children:["\ud83d\ude00 ".concat(y," ").concat(null!==e&&void 0!==e&&e.setNum?"(".concat(e.setNum,")"):""),"attendance"===e.about&&(0,b.jsxs)(b.Fragment,{children:[e.fixIsShown!==I&&H&&(0,b.jsx)(g.Z,{className:"paperSub-btn-s-clicked",icon:(0,b.jsx)("span",{children:(0,b.jsx)("i",{className:"fa-solid fa-circle-check"})})}),e.fixIsShown===I&&(0,b.jsx)(g.Z,{className:H?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){e.fixIsShown===I&&M((function(e){return!e}))},name:"\uc11c\ub958",icon:(0,b.jsx)("span",{children:(0,b.jsx)("i",{className:"fa-solid fa-circle-check"})})})]})]}),(0,b.jsxs)("div",{className:m,style:{display:e.fixIsShown!==I&&"none"},children:[(0,b.jsxs)("div",{className:"".concat(v),children:[(0,b.jsx)("i",{className:"fa-solid fa-circle-arrow-right"}),(0,b.jsx)(j.Z,{getDateValue:function(e){var t=e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2)+N.slice(10);E(t)},setStart:new Date((n=N,n.slice(0,10).replace(/-/g,"/"))),getMonthValue:function(){}})]}),"todo"!==e.about.slice(0,4)?"\ucd9c\uacb0\ubcf5\uc0ac(\ub0a0\uc9dc\uc120\ud0dd-\uc800\uc7a5)":"\uc77c\uc815\ubcf5\uc0ac(\ub0a0\uc9dc\uc120\ud0dd-\uc800\uc7a5)"]}),"todo"!==e.about.slice(0,4)&&(0,b.jsxs)("span",{id:"option-area".concat(y.replace(/ /g,"")),className:d,style:{display:e.fixIsShown===I&&"none"},children:[w.slice(1)," | ",C&&C]})]}),(0,b.jsxs)("div",{className:p,children:[(0,b.jsx)(g.Z,{className:"small-student",name:e.fixIsShown!==I?(0,b.jsx)("span",{children:(0,b.jsx)("i",{className:"fa-solid fa-pencil"})}):(0,b.jsx)("span",{children:(0,b.jsx)("i",{className:"fa-regular fa-floppy-disk"})}),id:e.fixIsShown!==I?"fix-btn".concat(I):"save-btn".concat(I),onclick:e.fixIsShown!==I?function(){e.setFixIsShown(I)}:K}),(0,b.jsx)(g.Z,{className:"small-student",name:e.fixIsShown!==I?(0,b.jsx)("span",{children:(0,b.jsx)("i",{className:"fa-regular fa-trash-can"})}):(0,b.jsx)("span",{children:(0,b.jsx)("i",{className:"fa-solid fa-xmark"})}),id:e.fixIsShown!==I?"delete-btn".concat(I):"cancle-btn".concat(I),onclick:e.fixIsShown!==I?function(){e.removeCheckSwal(s)}:function(){e.setFixIsShown("0"),Y("")}})]})]}),"todo"===e.about.slice(0,4)&&(0,b.jsxs)("span",{id:"option-area".concat(y.replace(/ /g,"")),className:d,style:{display:e.fixIsShown===I&&"none",marginLeft:"20px"},children:[w.slice(1)," | ",C&&C]}),(0,b.jsx)("div",{className:h,style:{display:e.fixIsShown!==I&&"none"},children:(0,b.jsxs)("form",{id:"optionChange-area".concat(I),className:f,style:{display:e.fixIsShown!==I&&"none"},onSubmit:function(e){e.preventDefault(),K()},children:[(0,b.jsxs)("select",{name:"option-selcet",id:"option-select".concat(y.replace(/ /g,"")),required:!0,defaultValue:F,onChange:L,style:{width:"30%"},children:[(0,b.jsx)("option",{value:"",onChange:L,disabled:!0,children:"-- \ubd84\ub958 --"}),null===(t=e.selectOption)||void 0===t?void 0:t.map((function(e){return(0,b.jsx)("option",{value:e.value,onChange:L,children:e.class},e.id)}))]},"option-select".concat(N)),(0,b.jsx)("textarea",{ref:V,onKeyDown:function(){return T(S)},onKeyUp:function(){return T(S)},onClick:function(){return T(S)},defaultValue:C||"",id:"option-note".concat(y.replace(/ /g,"")),className:x,onInput:function(e){!function(e,t){e.target.value.length>t&&(e.target.value=e.target.value.substr(0,t),l().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uc785\ub825\ud55c \ub0b4\uc6a9\uc744 \uc904\uc5ec\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))}(e,40)}},I)]})})]},N)})}},2652:function(e,t){t.Z={eventData:"AttendCtxCalendar_eventData__JV9KA",holidayData:"AttendCtxCalendar_holidayData__FAK80",showOptionCal:"AttendCtxCalendar_showOptionCal__09Ctn","todoExplain-p":"AttendCtxCalendar_todoExplain-p__ZuYpx","class-select":"AttendCtxCalendar_class-select__EDabe","classSelect-div":"AttendCtxCalendar_classSelect-div__vw7Rp","classSelect-title":"AttendCtxCalendar_classSelect-title__F1HBA",op1:"AttendCtxCalendar_op1__QA9ff",op2:"AttendCtxCalendar_op2__SN2md",op3:"AttendCtxCalendar_op3__xILxg",todoOption:"AttendCtxCalendar_todoOption__tDVsH","todo-option-btns":"AttendCtxCalendar_todo-option-btns__921+Z","todo-option":"AttendCtxCalendar_todo-option__+T1NU","todo-option-expl":"AttendCtxCalendar_todo-option-expl__Zx94W","memo-headerBtn":"AttendCtxCalendar_memo-headerBtn__PBuBZ"}}}]);