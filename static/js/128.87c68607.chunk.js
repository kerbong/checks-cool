"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[128],{3776:function(n,e,t){t.d(e,{Z:function(){return l}});t(7313);var a="Student_div__ROh5A",c=t(7405),s=t(6417),l=function(n){var e;return(0,s.jsx)("div",{className:a,children:n.students&&(null===(e=n.students)||void 0===e?void 0:e.map((function(e){var t;return(0,s.jsx)(c.Z,{className:n.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(t=n.passStudent)||void 0===t?void 0:t.split(" ")[1])===e.name,manageEach:n.manageEach,name:e.name,num:e.num,woman:e.woman,onShowOption:function(e){n.showOption(e),e.target+="add"}},e.num)})))})}},7405:function(n,e,t){t.d(e,{Z:function(){return s}});t(7313);var a={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"},c=t(6417),s=function(n){return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("button",{className:"".concat(a[n.className]," ").concat(n.classAdd&&"clicked"," ").concat(!n.woman&&a.woman),id:"std-".concat(n.num," ").concat(n.name),onClick:function(e){n.onShowOption(e)},title:null===n||void 0===n?void 0:n.title,children:[n.num," ",n.name]},"stdBtn-".concat(n.num," ").concat(n.name))})}},2118:function(n,e,t){t.d(e,{Z:function(){return f}});var a=t(885),c=t(7313),s=t(3776),l=t(658),i=t.n(l),o=t(2184),d=t(7692),r=t(7890),u=t(6417),m=function(n){var e=(0,c.useState)(""),t=(0,a.Z)(e,2),s=t[0],l=t[1],i=(0,c.useState)(""),m=(0,a.Z)(i,2),f=m[0],h=m[1],v=(0,c.useState)(""),x=(0,a.Z)(v,2),j=x[0],p=x[1],g=(0,r.s0)();return(0,c.useEffect)((function(){var n=window.location.href.split("/");l(n[n.length-1])}),[window.location.href]),(0,c.useEffect)((function(){""!==n.onStudent&&h(n.onStudent)}),[n.onStudent]),(0,c.useEffect)((function(){""!==n.clName&&p(n.clName)}),[n.clName]),(0,u.jsxs)("div",{className:o.Z["btns-div"],children:[(0,u.jsx)(d.Z,{name:"\ucd9c\uacb0",className:"manageAttendance"!==s?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageAttendance",{state:{student:f,clName:j||""}})}}),(0,u.jsx)(d.Z,{name:"\uc0c1\ub2f4",className:"manageConsult"!==s?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageConsult",{state:{student:f,clName:j||""}})}}),(0,u.jsx)(d.Z,{icon:"\uc81c\ucd9c/\uac1c\ubcc4",className:"manageCheckListMemo"!==s?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageCheckListMemo",{state:{student:f,clName:j||""}})}}),(0,u.jsx)(d.Z,{name:"\uc815\ubcf4",className:"manageStudent"!==s?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageStudent",{state:{student:f,clName:j||""}})}})]})},f=function(n){var e,t=(0,c.useState)(""),l=(0,a.Z)(t,2),d=l[0],r=l[1],f=(0,c.useState)(""),h=(0,a.Z)(f,2),v=h[0],x=h[1],j=(0,c.useState)([]),p=(0,a.Z)(j,2),g=p[0],Z=p[1],_=(0,c.useState)([]),b=(0,a.Z)(_,2),N=b[0],S=b[1],w=(0,c.useState)(!1),E=(0,a.Z)(w,2),k=E[0],y=E[1],T=(0,c.useRef)();(0,c.useEffect)((function(){if(""!==d){var n=document.getElementById("std-".concat(d));null===n||void 0===n||n.classList.remove("none"),null===n||void 0===n||n.classList.add("clicked")}}),[d]);var M=function(n){var e=(null===n||void 0===n?void 0:n.length)>0?n:new Date;return i()(e).format("MM-DD")<="02-15"?String(+i()(e).format("YYYY")-1):i()(e).format("YYYY")};(0,c.useEffect)((function(){var e=function(e){var t,a,c,s;return n.isSubject&&(t=null===(a=n.isSubject)||void 0===a||null===(c=a.filter((function(n){return Object.keys(n)[0]===e})))||void 0===c||null===(s=c[0])||void 0===s?void 0:s[e]),t}(M());y(e)}),[n.isSubject]),(0,c.useEffect)((function(){var e,t,a,c=M(),s=null===n||void 0===n||null===(e=n.students)||void 0===e||null===(t=e.filter((function(n){return Object.keys(n)[0]===c})))||void 0===t||null===(a=t[0])||void 0===a?void 0:a[c];(null===s||void 0===s?void 0:s.length)>0?S(s):S([])}),[n.students]);return(0,c.useEffect)((function(){null===N||void 0===N||N.forEach((function(n){Object.keys(n)[0]===v&&Z(Object.values(n)[0])})),""===v&&Z([]),n.nowClassNameHandler(v)}),[v]),(0,c.useEffect)((function(){n.selectStudentHandler(d)}),[d]),(0,c.useEffect)((function(){x(n.clName),r("")}),[n.clName]),(0,c.useEffect)((function(){""!==n.passStudent&&r(n.passStudent)}),[n.passStudent]),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{children:k&&(0,u.jsxs)("div",{children:[(0,u.jsxs)("select",{ref:T,onChange:function(){var n=T.current.value;x(n)},className:o.Z["class-select"],value:v,children:[(0,u.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===N||void 0===N?void 0:N.map((function(n){return(0,u.jsx)("option",{value:Object.keys(n),children:Object.keys(n)},Object.keys(n))}))]}),""===(null===T||void 0===T||null===(e=T.current)||void 0===e?void 0:e.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]})}),(0,u.jsxs)("div",{children:[(0,u.jsx)(s.Z,{students:k?g:N,showOption:function(n){var e=n.target.innerText;if(r(d===e?"":e),""!==d){var t=document.getElementById("std-".concat(d));null===t||void 0===t||t.classList.remove("clicked"),null===t||void 0===t||t.classList.add("none")}},isSubject:n.isSubject,manageEach:!0,passStudent:n.passStudent}),!k&&(!N||0===(null===N||void 0===N?void 0:N.length))&&(0,u.jsxs)(u.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,u.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,u.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,u.jsx)("br",{})," ",(0,u.jsx)("br",{})]}),k&&(!g||0===(null===g||void 0===g?void 0:g.length))&&(0,u.jsxs)(u.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,u.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,u.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,u.jsx)("br",{})," ",(0,u.jsx)("br",{})]})]}),(0,u.jsx)(m,{onStudent:d,clName:v}),(0,u.jsx)("div",{})]})}},1128:function(n,e,t){t.r(e);var a=t(4165),c=t(2982),s=t(5861),l=t(885),i=t(7313),o=t(2118),d=t(658),r=t.n(d),u=t(650),m=t(573),f=t(7890),h=t(2184),v=t(7692),x=t(7114),j=t.n(x),p=t(8737),g=t(6417),Z=[["\uc0dd\uc77c(\uc6d4\ubcc4)","month"],["\ud559\uc0dd\uc5f0\ub77d\ucc98","studTel"],["\ubd80\ubaa8\uc5f0\ub77d\ucc98","parentsTel"],["\ud615\uc81c\uc790\ub9e4","bns"],["\uae30\ud0c0","etc"]];e.default=function(n){var e=(0,i.useState)(""),t=(0,l.Z)(e,2),d=t[0],x=t[1],_=(0,i.useState)([]),b=(0,l.Z)(_,2),N=b[0],S=b[1],w=(0,i.useState)(""),E=(0,l.Z)(w,2),k=E[0],y=E[1],T=(0,i.useState)(!1),M=(0,l.Z)(T,2),B=M[0],F=M[1],O=(0,i.useState)(""),C=(0,l.Z)(O,2),Y=C[0],I=C[1],H=(0,i.useState)([]),L=(0,l.Z)(H,2),U=L[0],$=L[1],A=(0,f.TH)().state,X=(0,i.useRef)();(0,i.useEffect)((function(){var e=function(e){var t,a,c,s;return n.isSubject&&(t=null===(a=n.isSubject)||void 0===a||null===(c=a.filter((function(n){return Object.keys(n)[0]===e})))||void 0===c||null===(s=c[0])||void 0===s?void 0:s[e]),t}(r()().format("MM-DD")<="02-15"?String(+r()().format("YYYY")-1):r()().format("YYYY"));F(e)}),[n.isSubject]);var D=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:$([]),t=(0,m.JU)(u.wO,"studentsInfo",n.userUid),(0,m.cf)(t,(function(n){var e;n.exists()&&$((0,c.Z)(null===(e=n.data())||void 0===e?void 0:e.info_datas))}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){D()}),[]),(0,i.useEffect)((function(){var n;if(""!==d){var e=P(),t=null===e||void 0===e||null===(n=e.filter((function(n){var e;return n.name===(null===d||void 0===d||null===(e=d.split(" "))||void 0===e?void 0:e[1])})))||void 0===n?void 0:n[0];S(t)}}),[d]),(0,i.useEffect)((function(){var n,e=P(),t=null===e||void 0===e||null===(n=e.filter((function(n){var e;return n.name===(null===d||void 0===d||null===(e=d.split(" "))||void 0===e?void 0:e[1])})))||void 0===n?void 0:n[0];S(t)}),[U]),(0,i.useEffect)((function(){var n=null===A||void 0===A?void 0:A.student,e=null===A||void 0===A?void 0:A.clName;""!==n&&n&&x(n),""!==e&&I(e)}),[A]);var R=function(n){return n.sort((function(n,e){return"".concat(n.num)-"".concat(e.num)}))},W=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){var c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=(0,m.JU)(u.wO,"studentsInfo",n.userUid),e.next=3,(0,m.pl)(c,t);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),G=function(n){var e;if(B){var t=(0,c.Z)(n);null===t||void 0===t||t.map((function(n){return R(Object.values(n)),n})),e={info_datas:t}}else e={info_datas:R(n)};$(e.info_datas),W(e),j().fire({icon:"success",title:"\uc800\uc7a5\ub418\uc5c8\uc5b4\uc694!",text:"\uc5d1\uc140\ud30c\uc77c\uc758 \ud559\uc0dd\uc815\ubcf4\uac00 \uc5c5\ub85c\ub4dc \ub418\uc5c8\uc2b5\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})},P=function(){return B?(0,c.Z)(null===U||void 0===U?void 0:U.filter((function(n){return n.clName===Y}))):(0,c.Z)(U)},J=function(){var n=navigator.userAgent.toLowerCase();return n.indexOf("android")>-1?"?":n.indexOf("iphone")>-1||n.indexOf("ipad")>-1||n.indexOf("ipod")>-1||n.indexOf("ios")>-1?"&":"?"},q=function(){var n=P(),e=null===n||void 0===n?void 0:n.map((function(n){return n.month})),t=(0,c.Z)(new Set(e.sort((function(n,e){return n-e})))).map((function(e){var t;return(0,g.jsxs)("div",{className:"".concat(h.Z["bottom-content-li"]),style:{width:"300px"},children:[(0,g.jsxs)("h2",{children:[e,"\uc6d4 (",null===n||void 0===n||null===(t=n.filter((function(n){return n.month===e})))||void 0===t?void 0:t.length,"\uba85)"]}),(0,g.jsx)("hr",{className:h.Z["margin-15"]}),(0,g.jsx)("div",{className:"".concat(h.Z["margin-15"]," ").concat(h.Z["fs-11"]," "),children:null===n||void 0===n?void 0:n.map((function(n){return n.month!==e?null:(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]),children:[n.name," (",n.day,"\uc77c)"]},n.name)}))})]},e+"\uc6d4")}));return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"".concat(h.Z["flex-wrap"]),style:{width:"90%"},children:(0,g.jsx)("h2",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]),style:{width:"200px"},children:"\uc0dd\uc77c (\uc6d4\ubcc4)"})}),t,";"]})},z=function(){var n=P(),e=null===n||void 0===n?void 0:n.map((function(n){return(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["padd-5"]," ").concat(h.Z["span-left"]),children:[(0,g.jsxs)("span",{children:[n.num," ",n.name]})," ",n.studTel,"\xa0\xa0",(0,g.jsxs)("span",{children:[(0,g.jsx)("a",{className:h.Z["a-link"],href:"sms:".concat(null===n||void 0===n?void 0:n.studTel).concat(J(),"body="),children:(0,g.jsx)("i",{className:"fa-regular fa-comment-dots"})}),"\xa0\xa0",(0,g.jsx)("a",{className:h.Z["a-link"],href:"tel:".concat(null===n||void 0===n?void 0:n.studTel),children:(0,g.jsx)("i",{className:"fa-solid fa-phone"})})]})]},n.studTel)}));return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"".concat(h.Z["flex-wrap"]),style:{width:"90%"},children:(0,g.jsx)("h2",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]),style:{width:"200px"},children:"\ud559\uc0dd \uc5f0\ub77d\ucc98"})}),(0,g.jsx)("div",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["fs-11"]),style:{width:"80%",justifyContent:"space-evenly"},children:e})]})},K=function(){var n=P(),e=null===n||void 0===n?void 0:n.map((function(n){return(0,g.jsxs)("div",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["fs-11"]),style:{width:"350px"},children:[(0,g.jsxs)("h3",{style:{width:"300px",marginBottom:"-5px"},children:[n.num," ",n.name,(0,g.jsx)("hr",{className:h.Z["margin-15"]})]})," ",(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["padd-5"]," ").concat(h.Z["span-left"]),children:[(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]),children:["(\ubd80) ",n.dad]}),"\xa0\xa0",n.dadTel,"\xa0\xa0",(0,g.jsxs)("span",{children:[(0,g.jsx)("a",{className:h.Z["a-link"],href:"sms:".concat(null===n||void 0===n?void 0:n.dadTel).concat(J(),"body=\uc548\ub155\ud558\uc138\uc694 \uc544\ubc84\ub2d8"),children:(0,g.jsx)("i",{className:"fa-regular fa-comment-dots"})}),"\xa0\xa0",(0,g.jsx)("a",{className:h.Z["a-link"],href:"tel:".concat(null===n||void 0===n?void 0:n.dadTel),children:(0,g.jsx)("i",{className:"fa-solid fa-phone"})})]})]}),(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["padd-5"]," ").concat(h.Z["span-left"]),children:[(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]),children:["(\ubaa8) ",n.mom]}),"\xa0\xa0",n.momTel,"\xa0\xa0",(0,g.jsxs)("span",{children:[(0,g.jsx)("a",{className:h.Z["a-link"],href:"sms:".concat(null===n||void 0===n?void 0:n.momTel).concat(J(),"body=\uc548\ub155\ud558\uc138\uc694 \uc5b4\uba38\ub2d8"),children:(0,g.jsx)("i",{className:"fa-regular fa-comment-dots"})}),"\xa0\xa0",(0,g.jsx)("a",{className:h.Z["a-link"],href:"tel:".concat(null===n||void 0===n?void 0:n.momTel),children:(0,g.jsx)("i",{className:"fa-solid fa-phone"})})]})]})]},n.momTel)}));return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"".concat(h.Z["flex-wrap"]),style:{width:"90%"},children:(0,g.jsx)("h2",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]),style:{width:"200px"},children:"\ubd80\ubaa8 \uc5f0\ub77d\ucc98"})}),e]})},Q=function(){var n,e=P(),t=null===e||void 0===e?void 0:e.map((function(n){return""===n.bns?null:(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["padd-5"]),style:{width:"auto",alignItems:"center"},children:[(0,g.jsx)("span",{children:(0,g.jsxs)("b",{children:[n.num," ",n.name]})}),(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]),children:[" \ud83d\udc49 ",n.bns]})]},n.num+"bns")}));return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"".concat(h.Z["flex-wrap"]),style:{width:"90%"},children:(0,g.jsx)("h2",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]),style:{width:"200px"},children:"\ud615\uc81c\uc790\ub9e4"})}),0===(null===e||void 0===e||null===(n=e.filter((function(n){return""!==n.bns})))||void 0===n?void 0:n.length)?"* \uc790\ub8cc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.":(0,g.jsx)("div",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["fs-11"]),style:{width:"80%",justifyContent:"space-evenly"},children:t})]})},V=function(){var n,e=P(),t=null===e||void 0===e?void 0:e.map((function(n){return""===n.etc?null:(0,g.jsxs)("div",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["fs-11"]),style:{width:"300px"},children:[(0,g.jsxs)("h3",{style:{width:"300px"},children:[n.num," ",n.name]})," ",(0,g.jsx)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["padd-5"]),style:{width:"",alignItems:"center"},children:(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]),children:[" ",n.etc]})})]},n.num+"etc")}));return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"".concat(h.Z["flex-wrap"]),style:{width:"90%"},children:(0,g.jsx)("h2",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["flex-wrap"]),style:{width:"200px"},children:"\uae30\ud0c0 \uc815\ubcf4"})}),t,0===(null===e||void 0===e||null===(n=e.filter((function(n){return""!==n.etc})))||void 0===n?void 0:n.length)&&"* \uc790\ub8cc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."]})},nn=function(){var n=[0,1,2],e=(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("h3",{children:"\uc0dd\uc77c"}),(0,g.jsx)("hr",{className:h.Z["margin-15"]}),(0,g.jsxs)("p",{children:[null===N||void 0===N?void 0:N.month,"\uc6d4 ",null===N||void 0===N?void 0:N.day,"\uc77c"]})]}),t=[(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("h3",{children:"\uc5f0\ub77d\ucc98 \ubaa8\uc74c"}),(0,g.jsx)("hr",{className:h.Z["margin-15"]}),(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["padd-5"]," ").concat(h.Z["span-left"]),children:[(0,g.jsx)("span",{children:(0,g.jsxs)("b",{children:["(\ubd80) ",(null===N||void 0===N?void 0:N.dad)||"-"]})})," ",(null===N||void 0===N?void 0:N.dadTel)||"-",(0,g.jsxs)("span",{children:[(0,g.jsx)("a",{className:h.Z["a-link"],href:"sms:".concat(null===N||void 0===N?void 0:N.dadTel).concat(J(),"body=\uc548\ub155\ud558\uc138\uc694 \uc544\ubc84\ub2d8"),children:(0,g.jsx)("i",{className:"fa-regular fa-comment-dots"})}),"\xa0\xa0",(0,g.jsx)("a",{className:h.Z["a-link"],href:"tel:".concat(null===N||void 0===N?void 0:N.dadTel),children:(0,g.jsx)("i",{className:"fa-solid fa-phone"})})]})]}),(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["padd-5"]," ").concat(h.Z["span-left"]),children:[(0,g.jsx)("span",{children:(0,g.jsxs)("b",{children:["(\ubaa8) ",(null===N||void 0===N?void 0:N.mom)||"-"]})})," ",(null===N||void 0===N?void 0:N.momTel)||"-",(0,g.jsxs)("span",{children:[(0,g.jsx)("a",{className:h.Z["a-link"],href:"sms:".concat(null===N||void 0===N?void 0:N.momTel).concat(J(),"body=\uc548\ub155\ud558\uc138\uc694 \uc5b4\uba38\ub2d8"),children:(0,g.jsx)("i",{className:"fa-regular fa-comment-dots"})}),"\xa0\xa0",(0,g.jsx)("a",{className:h.Z["a-link"],href:"tel:".concat(null===N||void 0===N?void 0:N.momTel),children:(0,g.jsx)("i",{className:"fa-solid fa-phone"})})]})]}),(0,g.jsxs)("span",{className:"".concat(h.Z["margin-5"]," ").concat(h.Z["flex-wrap"]," ").concat(h.Z["padd-5"]," ").concat(h.Z["span-left"]),children:[(0,g.jsx)("b",{children:"\ud559\uc0dd"})," ",(null===N||void 0===N?void 0:N.studTel)||"-",(0,g.jsxs)("span",{children:[(0,g.jsx)("a",{className:h.Z["a-link"],href:"sms:".concat(null===N||void 0===N?void 0:N.studTel).concat(J(),"body="),children:(0,g.jsx)("i",{className:"fa-regular fa-comment-dots"})}),"\xa0\xa0",(0,g.jsx)("a",{className:h.Z["a-link"],href:"tel:".concat(null===N||void 0===N?void 0:N.studTel),children:(0,g.jsx)("i",{className:"fa-solid fa-phone"})})]})]})]}),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("h3",{children:"\ud615\uc81c\uc790\ub9e4 | \uae30\ud0c0\uc815\ubcf4"}),(0,g.jsx)("hr",{className:h.Z["margin-15"]}),(0,g.jsxs)("p",{children:[(0,g.jsx)("b",{children:"(\ud615\uc81c\uc790\ub9e4) "})," \xa0\xa0"," ",null!==N&&void 0!==N&&N.bns?null===N||void 0===N?void 0:N.bns:"-"]}),(0,g.jsxs)("p",{children:[(0,g.jsx)("b",{children:"(\uae30\ud0c0\uc815\ubcf4) "})," \xa0\xa0"," ",null!==N&&void 0!==N&&N.etc?null===N||void 0===N?void 0:N.etc:"-"]})]}),e];return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:h.Z["flex-center"],children:(0,g.jsx)("div",{className:"".concat(h.Z["bottom-content-li"]," ").concat(h.Z["onStudent-name"]),children:(0,g.jsxs)("h2",{children:[null===N||void 0===N?void 0:N.name," \uc815\ubcf4 \ubaa8\uc74c"]})})}),(0,g.jsxs)("div",{className:"".concat(h.Z["flex-wrap"]),children:[null===n||void 0===n?void 0:n.map((function(n){return(0,g.jsx)("div",{className:"".concat(h.Z["bottom-content-li"]),style:{width:"330px"},children:t[n]},"htmlInfoData"+n)})),(0,g.jsx)("p",{children:"* \uc815\ubcf4\uac00 - \ub85c \ud45c\uc2dc\ub420 \uacbd\uc6b0 \uc5c5\ub85c\ub4dc\ud55c \uc5d1\uc140\ud30c\uc77c\uc5d0 \uc790\ub8cc\uac00 \uc815\ud655\ud788 \uc785\ub825\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694. \uc9c0\uc18d\uc801\uc73c\ub85c \ubb38\uc81c\uac00 \uc0dd\uae30\uc2dc\uba74, [\uad50\uc0ac\ub791] - [\uc774\uac70\ud574\uc694] \ud639\uc740 kerbong@gmail.com\uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!"})]})]})};return(0,i.useEffect)((function(){S([])}),[Y]),(0,g.jsxs)("div",{children:[(0,g.jsx)(o.Z,{students:n.students,userUid:n.userUid,isSubject:n.isSubject,selectStudentHandler:function(n){x(n)},clName:Y,passStudent:d,nowClassNameHandler:function(n){I(n)}}),(0,g.jsxs)("ul",{className:h.Z["bottom-content-ul"],children:[(0,g.jsxs)("div",{className:"".concat(h.Z["flex-center"]),style:{margin:"-10px 0 15px 0"},children:[(0,g.jsx)(v.Z,{name:(0,g.jsxs)("a",{className:h.Z["a-link"],href:B?"https://docs.google.com/uc?export=download&id=1TlTFGcZO3f6i_tToLyjwxKgVnvcz5TXX":"https://docs.google.com/uc?export=download&id=1h6klLxXkld4ZUeWedjCiO3XN7-4GWO9M",children:["\uc591\uc2dd\ud30c\uc77c \ub2e4\uc6b4",(0,g.jsx)("i",{className:"fa-solid fa-download"})]}),className:"down-classItem-button"}),(0,g.jsx)("label",{id:"excelFileLabel",htmlFor:"excelFile",className:h.Z.excelfileUploadBtn,children:"\uc5c5\ub85c\ub4dc&\uc800\uc7a5"}),(0,g.jsx)("input",{type:"file",id:"excelFile",ref:X,onChange:function(n){!function(n){var e=n.target;if(void 0!==e.files[0]){var t=new FileReader;t.onload=function(){try{var n=t.result,e=(0,p.ij)(n,{type:"binary"}),a=function(n){var e,t,a,c,s=n;return""===n?"":(n&&0!==+(null===n||void 0===n?void 0:n.slice(0,1))&&(s="0".concat(String(n))),null!==(e=s)&&void 0!==e&&e.includes("-")||("010"===String(null===(t=s)||void 0===t?void 0:t.slice(0,3))?s=s.replace(/(\d{3})(\d{4})(\d{4})/,"$1-$2-$3"):"02"===String(null===(a=s)||void 0===a?void 0:a.slice(0,2))?s=s.replace(/^(\d{2})(\d{3,4})(\d{4})$/,"$1-$2-$3"):"02"!==String(null===(c=s)||void 0===c?void 0:c.slice(0,2))&&(s=s.replace(/^(\d{3})(\d{3,4})(\d{4})$/,"$1-$2-$3"))),String(s))};if(B){var s=[];e.SheetNames.forEach((function(n){var t=p.P6.sheet_to_json(e.Sheets[n]),l=null===t||void 0===t?void 0:t.map((function(e){return{num:String(e["\ubc88\ud638"]||""),name:String(e["\uc774\ub984"]||e["\uc131\uba85"]),month:String(e["\uc6d4"]||""),day:String(e["\uc77c"]||""),studTel:a(String(e["\ud559\uc0dd\uc5f0\ub77d\ucc98"]||"")),mom:String(e["\ubaa8\uc131\uba85"]||""),momTel:a(String(e["\ubaa8\uc5f0\ub77d\ucc98"]||"")),dad:String(e["\ubd80\uc131\uba85"]||""),dadTel:a(String(e["\ubd80\uc5f0\ub77d\ucc98"]||"")),bns:String(e["\ud615\uc81c\uc790\ub9e4"]||""),etc:String(e["\uae30\ud0c0"]||""),clName:String(n)}})),i=!1;l.forEach((function(n){var e;(null===(e=Object.values(n))||void 0===e?void 0:e.filter((function(n){return void 0===n})).length)>0&&(i=!0)})),i?j().fire({icon:"error",title:"\uc5c5\ub85c\ub4dc \uc2e4\ud328!",html:"\ud559\uc0dd \uc815\ubcf4\uc5d0 \ube44\uc5b4\uc788\ub294 \uce78\uc774\ub098 \uc904\uc740 \uc5c6\ub294\uc9c0 \ub2e4\ub978 \uc785\ub825 \uc624\ub958\ub4e4\uc740 \uc5c6\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694! \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uba74 kerbong@gmail.com \uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"}):s.push.apply(s,(0,c.Z)(l))})),G(s)}else e.SheetNames.forEach((function(n){var t=p.P6.sheet_to_json(e.Sheets[n]),c=null===t||void 0===t?void 0:t.map((function(n){return{num:String(n["\ubc88\ud638"]||""),name:String(n["\uc774\ub984"]||n["\uc131\uba85"]),month:String(n["\uc6d4"]||""),day:String(n["\uc77c"]||""),studTel:a(String(n["\ud559\uc0dd\uc5f0\ub77d\ucc98"]||"")),mom:String(n["\ubaa8\uc131\uba85"]||""),momTel:a(String(n["\ubaa8\uc5f0\ub77d\ucc98"]||"")),dad:String(n["\ubd80\uc131\uba85"]||""),dadTel:a(String(n["\ubd80\uc5f0\ub77d\ucc98"]||"")),bns:String(n["\ud615\uc81c\uc790\ub9e4"]||""),etc:String(n["\uae30\ud0c0"]||"")}})),s=!1;c.forEach((function(n){var e;(null===(e=Object.values(n))||void 0===e?void 0:e.filter((function(n){return void 0===n})).length)>0&&(s=!0)})),s?j().fire({icon:"error",title:"\uc5c5\ub85c\ub4dc \uc2e4\ud328!",html:"\ubc88\ud638, \uc774\ub984, \uc6d4, \uc77c, \ud559\uc0dd\uc5f0\ub77d\ucc98 \ub4f1 \ubb38\uc790\uc758 \ucca0\uc790\uac00 \uc815\ud655\ud55c\uc9c0, \ubb38\uc790 \uc55e/\ub4a4\uc5d0 \ub744\uc5b4\uc4f0\uae30\ub294 \uc5c6\ub294\uc9c0, \ube44\uc5b4\uc788\ub294 \uce78\uc774\ub098 \uc904\uc740 \uc5c6\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694! \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uba74 kerbong@gmail.com \uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"}):G(c)}))}catch(l){j().fire({icon:"error",title:"\uc5c5\ub85c\ub4dc \uc2e4\ud328!",html:"\ubc88\ud638, \uc774\ub984 \ud589\uc758 \ucca0\uc790\uac00 \uc815\ud655\ud55c\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"})}},t.readAsBinaryString(e.files[0])}}(n)},style:{display:"none"},accept:".xls,.xlsx"})]}),B&&(0,g.jsxs)(g.Fragment,{children:[""===d&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{children:Z.map((function(n){return(0,g.jsx)(v.Z,{name:n[0],onclick:function(){y(n[1])},className:"stdInfo-btn"},n[0])}))}),(0,g.jsxs)("div",{className:"".concat(h.Z["flex-wrap"]),children:["month"===k&&q(),"studTel"===k&&z(),"parentsTel"===k&&K(),"bns"===k&&Q(),"etc"===k&&V()]})]}),""!==d&&(0,g.jsx)(g.Fragment,{children:nn()})]}),!B&&(0,g.jsxs)(g.Fragment,{children:[""===d&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{children:Z.map((function(n){return(0,g.jsx)(v.Z,{name:n[0],onclick:function(){y(n[1])},className:"stdInfo-btn"},n[0])}))}),(0,g.jsxs)("div",{className:"".concat(h.Z["flex-wrap"]),children:["month"===k&&q(),"studTel"===k&&z(),"parentsTel"===k&&K(),"bns"===k&&Q(),"etc"===k&&V()]})]}),""!==d&&(0,g.jsx)(g.Fragment,{children:nn()})]})]})]})}},2184:function(n,e){e.Z={"class-select":"ManageEach_class-select__IlQlu","flex-d-column":"ManageEach_flex-d-column__Dh-Iq","btns-div":"ManageEach_btns-div__Zivma","padd-5":"ManageEach_padd-5__-MakG","bottom-content-ul":"ManageEach_bottom-content-ul__xXaZv","bottom-content-li":"ManageEach_bottom-content-li__S8Tge","flex-ml-10":"ManageEach_flex-ml-10__whmHW","attendEdit-div":"ManageEach_attendEdit-div__7u3SK",show:"ManageEach_show__HHbXY","fs-13":"ManageEach_fs-13__7gMai","fs-15":"ManageEach_fs-15__stlkn","fs-11":"ManageEach_fs-11__dIRN5","fs-9":"ManageEach_fs-9__jSAIp","fs-13-bold":"ManageEach_fs-13-bold__HBo6n","clicked-title":"ManageEach_clicked-title__-ZVjL","search-title":"ManageEach_search-title__wX5x6","search-btns":"ManageEach_search-btns__aYFXS","flex-wrap":"ManageEach_flex-wrap__NnIS9","margin-15":"ManageEach_margin-15__R8DcB","margin-5":"ManageEach_margin-5__IctPu","flex-center-ml-10":"ManageEach_flex-center-ml-10__fmq5p","flex-center":"ManageEach_flex-center__Ent-o","width-max400":"ManageEach_width-max400__8b-OH","attend-edit-p":"ManageEach_attend-edit-p__SvrxQ","attend-edit-d":"ManageEach_attend-edit-d__-GFUJ","attend-edit-c":"ManageEach_attend-edit-c__XExyE","a-link":"ManageEach_a-link__oahRi",excelfileUploadBtn:"ManageEach_excelfileUploadBtn__vkRXS","list-clicked":"ManageEach_list-clicked__4v6iy","span-left":"ManageEach_span-left__PWcvA","onStudent-name":"ManageEach_onStudent-name__5dz+H","fs-22-bold":"ManageEach_fs-22-bold__Irb6D"}}}]);