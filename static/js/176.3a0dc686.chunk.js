"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[176],{3776:function(n,t,e){e.d(t,{Z:function(){return u}});e(7313);var a="Student_div__ROh5A",c=e(7405),s=e(6417),u=function(n){var t;return(0,s.jsx)("div",{className:a,children:n.students&&(null===(t=n.students)||void 0===t?void 0:t.map((function(t){return(0,s.jsx)(c.Z,{className:n.manageEach?"button-student-manageEach":"button-student",manageEach:n.manageEach,name:t.name,num:t.num,onShowOption:function(t){n.showOption(t),t.target+="add"}},t.num)})))})}},7405:function(n,t,e){e.d(t,{Z:function(){return s}});e(7313);var a={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm"},c=e(6417),s=function(n){return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("button",{className:"".concat(a[n.className]," "),id:"std-".concat(n.num," ").concat(n.name),onClick:function(t){n.onShowOption(t)},children:[n.num," ",n.name]})})}},3176:function(n,t,e){e.r(t);e(7313);var a=e(9247),c=e(556),s=e(7890),u=e(6417);t.default=function(n){(0,s.TH)().state;return(0,u.jsxs)("div",{children:[(0,u.jsx)(c.Z,{students:n.students,userUid:n.userUid,isSubject:n.isSubject,selectStudentHandler:function(n){console.log(n)}}),(0,u.jsx)(a.Z,{}),(0,u.jsx)("div",{})]})}},9247:function(n,t,e){var a=e(885),c=e(7313),s=e(7692),u=e(7890),o=e(2184),i=e(6417);t.Z=function(n){var t=(0,c.useState)(""),e=(0,a.Z)(t,2),l=e[0],d=e[1],r=(0,c.useState)(""),f=(0,a.Z)(r,2),m=f[0],v=f[1],h=(0,u.s0)();return(0,c.useEffect)((function(){var n=window.location.href.split("/");d(n[n.length-1]),console.log(l)}),[window.location.href]),(0,c.useEffect)((function(){""!==n.onStudent&&v(n.onStudent)}),[n.onStudent]),(0,i.jsxs)("div",{className:o.Z["btns-div"],children:[(0,i.jsx)(s.Z,{name:"\uc815\ubcf4",className:"manageStudent"!==l?"manageBtn":"manageBtn-clicked",onclick:function(){return h("/manageStudent",{state:m})}}),(0,i.jsx)(s.Z,{name:"\ucd9c\uacb0",className:"manageAttendance"!==l?"manageBtn":"manageBtn-clicked",onclick:function(){return h("/manageAttendance",{state:n.onStudent})}}),(0,i.jsx)(s.Z,{name:"\uc0c1\ub2f4",className:"manageConsult"!==l?"manageBtn":"manageBtn-clicked",onclick:function(){return h("/manageConsult",{state:n.onStudent})}}),(0,i.jsx)(s.Z,{name:"\uc81c\ucd9c/\uac1c\ubcc4",className:"manageCheckListMemo"!==l?"manageBtn":"manageBtn-clicked",onclick:function(){return h("/manageCheckListMemo",{state:n.onStudent})}})]})}},556:function(n,t,e){var a=e(885),c=e(7313),s=e(3776),u=e(658),o=e.n(u),i=e(2184),l=e(6417);t.Z=function(n){var t,e=(0,c.useState)(""),u=(0,a.Z)(e,2),d=u[0],r=u[1],f=(0,c.useState)(""),m=(0,a.Z)(f,2),v=m[0],h=m[1],g=(0,c.useState)([]),j=(0,a.Z)(g,2),S=j[0],_=j[1],b=(0,c.useState)([]),k=(0,a.Z)(b,2),x=k[0],Z=k[1],E=(0,c.useState)(!1),p=(0,a.Z)(E,2),B=p[0],O=p[1],w=(0,c.useRef)();(0,c.useEffect)((function(){if(""!==d){var n=document.getElementById("std-".concat(d));n.classList.remove("none"),n.classList.add("clicked")}}),[d]);var M=function(n){var t=o()(n),e="",a=t.format("MM"),c=t.format("YYYY");return+a>=2?e=c:+a<=1&&(e=String(+c-1)),e};(0,c.useEffect)((function(){var t=function(t){var e,a,c,s;return n.isSubject&&(e=null===(a=n.isSubject)||void 0===a||null===(c=a.filter((function(n){return Object.keys(n)[0]===t})))||void 0===c||null===(s=c[0])||void 0===s?void 0:s[t]),e}(M());O(t)}),[n.isSubject]),(0,c.useEffect)((function(){var t,e,a,c=M(),s=null===n||void 0===n||null===(t=n.students)||void 0===t||null===(e=t.filter((function(n){return Object.keys(n)[0]===c})))||void 0===e||null===(a=e[0])||void 0===a?void 0:a[c];Z(s)}),[n.students]);return(0,c.useEffect)((function(){null===x||void 0===x||x.forEach((function(n){Object.keys(n)[0]===v&&_(Object.values(n)[0])})),""===v&&_([])}),[v]),(0,c.useEffect)((function(){n.selectStudentHandler(d)}),[d]),(0,l.jsxs)("div",{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{children:"* \ud559\uc0dd \uac1c\ubcc4 \uc870\ud68c(\uc815\ud655\ud55c \uba85\uce6d \ubbf8\uc815) \ud0ed \uc2e0\uc124 \ud14c\uc2a4\ud2b8\ud654\uba74"}),B&&(0,l.jsxs)("div",{children:[(0,l.jsxs)("select",{ref:w,onChange:function(){var n=w.current.value;h(n)},className:i.Z["class-select"],value:v,children:[(0,l.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===x||void 0===x?void 0:x.map((function(n){return(0,l.jsx)("option",{value:Object.keys(n),children:Object.keys(n)},Object.keys(n))}))]}),""===(null===w||void 0===w||null===(t=w.current)||void 0===t?void 0:t.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]})]}),(0,l.jsx)("div",{children:(0,l.jsx)(s.Z,{students:B?S:x,showOption:function(n){if(r(n.target.innerText),""!==d){var t=document.getElementById("std-".concat(d));t.classList.remove("clicked"),t.classList.add("none")}},isSubject:n.isSubject,manageEach:!0})}),(0,l.jsx)("div",{})]})}},2184:function(n,t){t.Z={"class-select":"ManageEach_class-select__IlQlu","btns-div":"ManageEach_btns-div__Zivma","bottom-content-ul":"ManageEach_bottom-content-ul__xXaZv","bottom-content-li":"ManageEach_bottom-content-li__S8Tge","flex-ml-10":"ManageEach_flex-ml-10__whmHW","fs-13":"ManageEach_fs-13__7gMai"}}}]);