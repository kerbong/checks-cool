"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[280],{21261:function(e,t,n){n.d(t,{Z:function(){return y}});var a=n(42982),o=n(70885),i=n(47313),l="EventInput_event-area__HIhvd",s="EventInput_attendInfo-area__6dlzH",c="EventInput_optionChange-area__8AqDO",r="EventInput_button-area__Djlu5",u="EventInput_optionsSet__hyqeK",d="EventInput_attendInfo-student__wuEZD",p="EventInput_eventNameInput-area__fEujR",f="EventInput_note-area__x3iUw",x=n(37692),v=n(53776),m=n(33451),h=n(67114),_=n.n(h),b=n(95186),S=n(10658),j=n.n(S),g=(n(23889),n(46417)),N=void 0;j().locale("ko");var y=function(e){var t,n,h,S=(0,i.useState)(""),y=(0,o.Z)(S,2),I=y[0],C=y[1],w=(0,i.useState)(!1),Z=(0,o.Z)(w,2),k=Z[0],D=Z[1],E=(0,i.useState)(!1),A=(0,o.Z)(E,2),F=(A[0],A[1],(0,i.useState)(!1)),B=(0,o.Z)(F,2),q=B[0],O=B[1],Y=(0,i.useState)(!1),H=(0,o.Z)(Y,2),M=H[0],V=H[1],K=(0,i.useState)(!1),R=(0,o.Z)(K,2),T=R[0],L=R[1],U=(0,i.useState)([]),J=(0,o.Z)(U,2),P=J[0],z=J[1],Q=(0,i.useState)(new Date),W=(0,o.Z)(Q,2),X=W[0],G=W[1],$=(0,i.useState)(!0),ee=(0,o.Z)($,2),te=ee[0],ne=ee[1],ae=(0,i.useState)(!1),oe=(0,o.Z)(ae,2),ie=oe[0],le=oe[1],se=(0,i.useState)(j()().format("YYYY-MM")),ce=(0,o.Z)(se,2),re=(ce[0],ce[1]),ue=(0,i.useRef)(null);(0,i.useEffect)((function(){"1\ud604\uc7a5\uccb4\ud5d8"!==te&&"3\uac00\uc815\ud559\uc2b5"!==te&&(V(!1),O(!1))}),[te]);var de=(0,i.useCallback)((function(){null!==ue&&null!==ue.current&&(ue.current.style.height="10px",ue.current.style.height=ue.current.scrollHeight-13+"px")}),[]),pe=function(e,t){e.target.value.length>t&&(e.target.value=e.target.value.substr(0,t),_().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uae00\uc790\uc218\ub97c \ucd08\uacfc\ud588\uc5b4\uc694! \ub0b4\uc6a9\uc744 ".concat(t,"\uc790 \uc774\ub0b4\ub85c \uc904\uc5ec\uc8fc\uc138\uc694."),confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))},fe=function(e){D(!1),C(e.target.innerText)},xe=function(e){return e.split(" ")[1].slice(0,4)+"-"+e.split(" ")[2].slice(0,-1).padStart(2,"0")+"-"+e.split(" ")[3].slice(0,-1).padStart(2,"0")},ve=function(e){return("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)},me=function(){var t,n,a=document.querySelector("h1").getAttribute("class"),i=xe(a),l="";if("consulting"===e.about){var s=ve(new Date);l=i+s+I.split(" ")[0]}else if("attendance"===e.about){l=i+I.split(" ")[0]+" "+ve(new Date);var c=document.querySelector(".eventOnDayList").querySelectorAll("li"),r=[];if(c.forEach((function(e){e.getAttribute("id")===l&&r.push(e)})),0!==r.length)return void _().fire({icon:"error",title:"\uc800\uc7a5 \uc2e4\ud328",html:"\uac19\uc740 \ub0a0, \uac19\uc740 \ud559\uc0dd\uc758 \ucd9c\uacb0\uc790\ub8cc\uac00 \uc788\uc5b4\uc694! <br/> ** \uac19\uc740 \ud559\uc0dd\uc758 \ucd9c\uacb0\uc790\ub8cc\ub97c \ucd94\uac00\ud558\uc2dc\ub824\uba74 <br/> 1\ubd84 \ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}else{n=document.querySelector("#todo-eventName").value,l=i+n;var u=document.querySelector(".eventOnDayList").querySelectorAll("li"),d=[];if(u.forEach((function(e){e.getAttribute("id")===l&&d.push(e)})),0!==d.length)return void _().fire({icon:"error",title:"\uc800\uc7a5 \uc2e4\ud328",text:"\uac19\uc740 \uc774\ub984\uc758 \ud589\uc0ac\uac00 \uac19\uc740 \ub0a0 \uc874\uc7ac\ud574\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}if(Array.isArray(X)){var p,f,x=(0,o.Z)(X,2);p=x[0],f=x[1];for(var v=j()(p),m=j()(f),h=[],b=v;b.isBefore(m)||b.isSame(m,"day");)0!==b.day()&&6!==b.day()&&h.push(b.format("YYYY-MM-DD")),b=b.add(1,"day");var S=[];h.forEach((function(e){t={id:e+n,eventName:n,option:document.getElementById("option-select").value,note:document.getElementById("option-note").value},S.push(t)})),e.rangeTodoData(S)}else t="todo"!==e.about?{eventDate:a,num:I.split(" ")[0],name:I.split(" ")[1],id:l}:{eventDate:a,eventName:n,id:l},"attendance"===e.about&&("1\ud604\uc7a5\uccb4\ud5d8"===te||"3\uac00\uc815\ud559\uc2b5"===te?(t.request=q,t.report=M):t.paper=T),e.saveNewData(t)};(0,i.useEffect)((function(){var t,n;if("attendance"===e.about&&e.events&&0!==(null===(t=e.events)||void 0===t?void 0:t.length)&&0!==(null===I||void 0===I?void 0:I.length)){var a=null===(n=e.events)||void 0===n?void 0:n.filter((function(e){return e.name===I.split(" ")[1]})),o=[];null===a||void 0===a||a.forEach((function(e){o.push(e.option)})),z(o)}}),[I]);return(0,i.useEffect)((function(){var e=document.querySelector(".modal");if(ie){var t=e.clientHeight+350+"px";e.style.height=t}else e.style.height=document.querySelector(".eventOnDayList").clientHeight+45+"px"}),[ie]),(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("li",{className:l,style:{backgroundColor:"#ffe9ed"},children:(0,g.jsxs)("div",{className:s,children:[(0,g.jsxs)("div",{className:d,children:["todo"!==e.about.slice(0,4)?(0,g.jsxs)(g.Fragment,{children:["1\ud604\uc7a5\uccb4\ud5d8"!==te&&"3\uac00\uc815\ud559\uc2b5"!==te?(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(x.Z,{className:T?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),L((function(e){return!e}))},title:"\uc11c\ub958",name:"\uc11c\ub958"})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x.Z,{className:q?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),O((function(e){return!e}))},title:"\uc2e0\uccad\uc11c",name:"\uc2e0\uccad\uc11c"}),(0,g.jsx)(x.Z,{className:M?"paperSub-btn-clicked":"paperSub-btn",onclick:function(e){e.preventDefault(),V((function(e){return!e}))},title:"\ubcf4\uace0\uc11c",name:"\ubcf4\uace0\uc11c"})]}),(0,g.jsx)(x.Z,{className:"choose-studentBtn",name:I||"\ud559\uc0dd\uc120\ud0dd",onclick:function(){var t;void 0===e.students||0===(null===(t=e.students)||void 0===t?void 0:t.length)?_().fire({icon:"error",title:"\uc120\ud0dd \ubd88\uac00",text:"\uba54\ub274\uc758 \uacf0\ub3cc\uc774\ub97c \ub20c\ub7ec\uc11c \uba3c\uc800 \ud559\uc0dd\uba85\ub2e8\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}):D(!k)}})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x.Z,{className:ie?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){return le((function(e){return!e}))},name:"\ubc18\ubcf5"}),(0,g.jsx)("input",{type:"text",placeholder:"\ud589\uc0ac\uba85",id:"todo-eventName",className:p,autoFocus:!0,onInput:function(e){return pe(e,20)}})]}),(0,g.jsxs)("div",{className:r,children:[(0,g.jsx)(x.Z,{className:"small-student",name:(0,g.jsx)("span",{children:(0,g.jsx)("i",{className:"fa-regular fa-floppy-disk"})}),id:"save-btn".concat(e.id),onclick:function(){me()}}),(0,g.jsx)(x.Z,{className:"small-student",name:(0,g.jsx)("span",{children:(0,g.jsx)("i",{className:"fa-solid fa-xmark"})}),id:"cancle-btn".concat(e.id),onclick:function(){e.closeHandler()}})]}),k&&(0,g.jsx)(m.Z,{onClose:fe,children:(0,g.jsx)(v.Z,{students:e.students,showOption:fe,isSubject:e.isSubject})})]}),(0,g.jsxs)("form",{className:c,onSubmit:function(e){e.preventDefault(),me()},children:[e.selectOption&&(0,g.jsxs)("select",{name:"attend-option",id:I?"option-select".concat(I.split(" ")[0]):"option-select",defaultValue:e.dafaultValue,required:!0,onChange:function(e){return ne(e.target.value)},children:[(0,g.jsx)("option",{value:"",children:"-- \ubd84\ub958 --"}),null===(t=e.selectOption)||void 0===t?void 0:t.map((function(e){return(0,g.jsx)("option",{value:e.value,children:e.class},e.id)}))]}),(0,g.jsx)("textarea",{ref:ue,type:"text",onKeyDown:function(){return de(N)},onKeyUp:function(){return de(N)},onClick:function(){return de(N)},placeholder:e.placeholder,id:I?"option-note".concat(I.split(" ")[0]):"option-note",className:f,onInput:function(t){"todo"===e.about.slice(0,4)?pe(t,60):pe(t,40)}})]}),"attendance"===e.about&&(null===P||void 0===P?void 0:P.length)>0&&(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)("span",{className:u,children:[(0,g.jsx)("span",{className:u,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0\uc815\ubcf4:"}),null===(n=(0,a.Z)(new Set(P)))||void 0===n?void 0:n.map((function(e){return(0,g.jsxs)("span",{className:u,children:["\ud83d\ude42",null===e||void 0===e?void 0:e.slice(1)," ",null===P||void 0===P?void 0:P.filter((function(t){return t===e})).length,"\uc77c"]},"optionSet-".concat(e))}))]})}),"todo"===(null===(h=e.about)||void 0===h?void 0:h.slice(0,4))&&(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("div",{className:d,style:{textAlign:"center"},children:ie&&(0,g.jsx)(b.Z,{filterNone:!0,setStart:new Date(xe(e.today)),getDateValue:function(e){G(e)},about:"todo",getMonthValue:function(e){re(j()(e).format("YYYY-MM"))}})})}),"attendance"===e.about&&0===(null===P||void 0===P?void 0:P.length)&&(0,g.jsx)("span",{className:u,children:"* \uc800\uc7a5\ub41c \ucd9c\uacb0 \uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"})]})})})}},48202:function(e,t,n){n.d(t,{Z:function(){return y}});var a=n(1413),o=n(70885),i=n(47313),l=n(67114),s=n.n(l),c="EventItem_event-area__HZzO9",r="EventItem_titleDate-area__nLD2U",u="EventItem_attendInfo-area__lANso",d="EventItem_option-area__LMxUJ",p="EventItem_optionChange-area__ypKm2",f="EventItem_button-area__k0N4P",x="EventItem_note-area__d51XB",v="EventItem_optionNote-area__JyY-B",m="EventItem_date-area__9Fkug",h="EventItem_datePick-area__ZF0TI",_="EventItem_eventNameInput-area__7hnmS",b="EventItem_title-h2__oIhg9",S=n(37692),j=n(95186),g=n(46417),N=void 0,y=function(e){var t,n,l=e.item,y=e.keyId,I=e.text,C=e.note,w=e.shownId,Z=e.option,k=(0,i.useState)(y),D=(0,o.Z)(k,2),E=D[0],A=D[1],F=(0,i.useState)(Z),B=(0,o.Z)(F,2),q=B[0],O=B[1],Y=(0,i.useState)((null===l||void 0===l?void 0:l.paper)||!1),H=(0,o.Z)(Y,2),M=H[0],V=H[1],K=(0,i.useState)((null===l||void 0===l?void 0:l.request)||!1),R=(0,o.Z)(K,2),T=R[0],L=R[1],U=(0,i.useState)((null===l||void 0===l?void 0:l.report)||!1),J=(0,o.Z)(U,2),P=J[0],z=J[1],Q=(0,i.useRef)(null),W=(0,i.useRef)(null),X=(0,i.useRef)(null),G=(0,i.useCallback)((function(){null!==Q&&null!==Q.current&&(Q.current.style.height="10px",Q.current.style.height=Q.current.scrollHeight-13+"px")}),[]),$=function(e,t){e.target.value.length>t&&(e.target.value=e.target.value.substr(0,t),s().fire({icon:"error",title:"\uc785\ub825 \ubd88\uac00",text:"\uc785\ub825\ud55c \ub0b4\uc6a9\uc744 \uc904\uc5ec\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))},ee=function(){var t=(0,a.Z)({},l);"attendance"===e.about&&(void 0===(null===l||void 0===l?void 0:l.paper)?(t.request=T,t.report=P):t.paper=M),"todo"===e.about.slice(0,4)&&(t.eventName=W.current.value,t.option=X.current.value,t.note=Q.current.value),E.slice(0,10)!==y.slice(0,10)?(t.id=E,"attendance"===e.about&&(t.beforeId=y),e.saveFixedData(t)):e.saveFixedData(t)},te=function(e){O(e.target.value)};return(0,i.useEffect)((function(){null!==Q.current&&(Q.current.style.height=Q.current.scrollHeight-20+"px")}),[e.fixIsShown]),(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)("li",{id:y,className:"".concat(c),style:{backgroundColor:e.fixIsShown===w&&"#ffe9ed"},children:[(0,g.jsxs)("div",{id:"attendInfo-area".concat(w),className:u,children:[(0,g.jsxs)("div",{className:"".concat(r),children:[(0,g.jsxs)("h2",{id:"eventName"+w,className:b,style:{display:"todo"===e.about.slice(0,4)&&e.fixIsShown===w&&"none"},children:["\ud83d\ude00 ".concat(I," ").concat(null!==e&&void 0!==e&&e.setNum?"(".concat(e.setNum,")"):""),"attendance"===e.about&&(0,g.jsxs)(g.Fragment,{children:[e.fixIsShown!==w&&M&&(0,g.jsx)(S.Z,{className:"paperSub-btn-s-clicked",icon:(0,g.jsx)("span",{children:(0,g.jsx)("i",{className:"fa-solid fa-circle-check"})})}),e.fixIsShown!==w&&void 0===(null===l||void 0===l?void 0:l.paper)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(S.Z,{className:T?"reqRepSub-btn-s-clicked":"reqRepSub-btn-s",name:"\uc2e0",style:{marginLeft:"10px",cursor:"auto"}}),(0,g.jsx)(S.Z,{className:P?"reqRepSub-btn-s-clicked":"reqRepSub-btn-s",style:{cursor:"auto"},name:"\ubcf4"})]}),e.fixIsShown===w&&void 0!==(null===l||void 0===l?void 0:l.paper)&&(0,g.jsx)(S.Z,{className:M?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){e.fixIsShown===w&&V((function(e){return!e}))},name:"\uc11c\ub958",icon:(0,g.jsx)("span",{children:(0,g.jsx)("i",{className:"fa-solid fa-circle-check"})})}),e.fixIsShown===w&&void 0===(null===l||void 0===l?void 0:l.paper)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(S.Z,{className:T?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){e.fixIsShown===w&&L((function(e){return!e}))},style:{width:"auto",letterSpacing:"-1px"},name:"\uc2e0\uccad\uc11c"}),(0,g.jsx)(S.Z,{className:P?"paperSub-btn-clicked":"paperSub-btn",onclick:function(){e.fixIsShown===w&&z((function(e){return!e}))},style:{width:"auto",letterSpacing:"-1px"},name:"\ubcf4\uace0\uc11c"})]})]})]}),"todo"===e.about.slice(0,4)&&e.fixIsShown===w&&(0,g.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:(0,g.jsx)("input",{type:"text",placeholder:"\ud589\uc0ac\uba85",id:"todo-eventName",className:_,autoFocus:!0,ref:W,defaultValue:I,onInput:function(e){return $(e,20)}})}),(0,g.jsxs)("div",{className:m,style:{display:e.fixIsShown!==w&&"none"},children:[(0,g.jsxs)("div",{className:"".concat(h),children:[(0,g.jsx)("i",{className:"fa-solid fa-circle-arrow-right"}),(0,g.jsx)(j.Z,{getDateValue:function(e){var t=e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2)+y.slice(10);A(t)},setStart:new Date((n=y,n.slice(0,10).replace(/-/g,"/"))),getMonthValue:function(){}})]}),"todo"!==e.about.slice(0,4)?"\ucd9c\uacb0\ubcf5\uc0ac(\ub0a0\uc9dc\uc120\ud0dd-\uc800\uc7a5)":"\uc77c\uc815\ubcf5\uc0ac(\ub0a0\uc9dc\uc120\ud0dd-\uc800\uc7a5)"]}),"todo"!==e.about.slice(0,4)&&(0,g.jsxs)("span",{id:"option-area".concat(y),className:d,style:{display:e.fixIsShown===w&&"none"},children:[Z.slice(1)," | ",C&&C]})]}),(0,g.jsxs)("div",{className:f,children:[(0,g.jsx)(S.Z,{className:"small-student",name:e.fixIsShown!==w?(0,g.jsx)("span",{children:(0,g.jsx)("i",{className:"fa-solid fa-pencil"})}):(0,g.jsx)("span",{children:(0,g.jsx)("i",{className:"fa-regular fa-floppy-disk"})}),id:e.fixIsShown!==w?"fix-btn".concat(w):"save-btn".concat(w),onclick:e.fixIsShown!==w?function(){e.setFixIsShown(w)}:ee}),(0,g.jsx)(S.Z,{className:"small-student",name:e.fixIsShown!==w?(0,g.jsx)("span",{children:(0,g.jsx)("i",{className:"fa-regular fa-trash-can"})}):(0,g.jsx)("span",{children:(0,g.jsx)("i",{className:"fa-solid fa-xmark"})}),id:e.fixIsShown!==w?"delete-btn".concat(w):"cancle-btn".concat(w),onclick:e.fixIsShown!==w?function(){e.removeCheckSwal(l)}:function(){V((null===l||void 0===l?void 0:l.paper)||!1),L((null===l||void 0===l?void 0:l.request)||!1),z((null===l||void 0===l?void 0:l.report)||!1),e.setFixIsShown("0"),O("")}})]})]}),"todo"===e.about.slice(0,4)&&(0,g.jsxs)("span",{id:"option-area".concat(I.replace(/ /g,"")),className:d,style:{display:e.fixIsShown===w&&"none",marginLeft:"20px"},children:[Z.slice(1)," | ",C&&C]}),(0,g.jsx)("div",{className:v,style:{display:e.fixIsShown!==w&&"none"},children:(0,g.jsxs)("form",{id:"optionChange-area".concat(w),className:p,style:{display:e.fixIsShown!==w&&"none"},onSubmit:function(e){e.preventDefault(),ee()},children:[(0,g.jsxs)("select",{name:"option-selcet",id:"option-select".concat("todo"===e.about.slice(0,4)?I.replace(/ /g,""):y),required:!0,defaultValue:q,onChange:te,ref:X,style:{width:"30%"},children:[(0,g.jsx)("option",{value:"",onChange:te,disabled:!0,children:"-- \ubd84\ub958 --"}),null===(t=e.selectOption)||void 0===t?void 0:t.map((function(e){return(0,g.jsx)("option",{value:e.value,onChange:te,children:e.class},e.id)}))]},"option-select".concat(y)),(0,g.jsx)("textarea",{ref:Q,onKeyDown:function(){return G(N)},onKeyUp:function(){return G(N)},onClick:function(){return G(N)},defaultValue:C||"",id:"option-note".concat("todo"===e.about.slice(0,4)?I.replace(/ /g,""):y),className:x,onInput:function(e){$(e,40)}},w)]})})]},y)})}},62652:function(e,t){t.Z={eventData:"AttendCtxCalendar_eventData__JV9KA",holidayData:"AttendCtxCalendar_holidayData__FAK80",showOptionCal:"AttendCtxCalendar_showOptionCal__09Ctn",paperOn:"AttendCtxCalendar_paperOn__KwKsr","todoExplain-p":"AttendCtxCalendar_todoExplain-p__ZuYpx","class-select":"AttendCtxCalendar_class-select__EDabe","classSelect-div":"AttendCtxCalendar_classSelect-div__vw7Rp","classSelect-title":"AttendCtxCalendar_classSelect-title__F1HBA",op1:"AttendCtxCalendar_op1__QA9ff",op2:"AttendCtxCalendar_op2__SN2md",op3:"AttendCtxCalendar_op3__xILxg",todoOption:"AttendCtxCalendar_todoOption__tDVsH","todo-option-btns":"AttendCtxCalendar_todo-option-btns__921+Z","todo-option":"AttendCtxCalendar_todo-option__+T1NU","todo-option-expl":"AttendCtxCalendar_todo-option-expl__Zx94W","memo-headerBtn":"AttendCtxCalendar_memo-headerBtn__PBuBZ"}}}]);