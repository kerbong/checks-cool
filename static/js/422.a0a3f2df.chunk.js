"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[422],{53776:function(n,t,e){e.d(t,{Z:function(){return l}});e(47313);var a="Student_div__ROh5A",i=e(77405),c=e(46417),l=function(n){var t;return(0,c.jsx)("div",{className:a,children:n.students&&(null===(t=n.students)||void 0===t?void 0:t.map((function(t){var e;return(0,c.jsx)(i.Z,{className:n.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(e=n.passStudent)||void 0===e?void 0:e.split(" ")[1])===t.name,manageEach:n.manageEach,name:t.name,num:t.num,woman:t.woman,onShowOption:function(t){n.showOption(t),t.target+="add"}},t.num)})))})}},77405:function(n,t,e){e.d(t,{Z:function(){return c}});e(47313);var a={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"},i=e(46417),c=function(n){return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("button",{className:"".concat(a[n.className]," ").concat(n.classAdd&&"clicked"," ").concat(!n.woman&&a.woman),id:"std-".concat(n.num," ").concat(n.name),onClick:function(t){n.onShowOption(t)},title:null===n||void 0===n?void 0:n.title,children:[n.num," ",n.name]},"stdBtn-".concat(n.num," ").concat(n.name))})}},87422:function(n,t,e){e.r(t);var a=e(74165),i=e(42982),c=e(15861),l=e(70885),s=e(47313),o=e(62118),r=e(97890),u=e(10658),d=e.n(u),f=e(80650),v=e(90573),m=e(72184),h=e(37692),x=e(48737),p=e(67114),_=e.n(p),g=e(36797),Z=e(46417);t.default=function(n){var t,e,u,p,j,b=(0,s.useState)(""),k=(0,l.Z)(b,2),w=k[0],N=k[1],E=(0,s.useState)([]),S=(0,l.Z)(E,2),M=S[0],B=S[1],y=(0,s.useState)([]),Y=(0,l.Z)(y,2),C=Y[0],O=Y[1],F=(0,s.useState)([]),U=(0,l.Z)(F,2),D=U[0],H=U[1],I=(0,s.useState)(""),T=(0,l.Z)(I,2),W=T[0],A=T[1],L=(0,s.useState)(""),R=(0,l.Z)(L,2),P=R[0],X=R[1],q=(0,s.useState)(""),J=(0,l.Z)(q,2),Q=J[0],G=J[1],z=(0,s.useState)([]),K=(0,l.Z)(z,2),V=K[0],$=K[1],nn=(0,s.useState)(!1),tn=(0,l.Z)(nn,2),en=tn[0],an=tn[1],cn=(0,s.useState)([]),ln=(0,l.Z)(cn,2),sn=ln[0],on=ln[1],rn=(0,s.useState)({}),un=(0,l.Z)(rn,2),dn=un[0],fn=un[1],vn=(0,r.TH)().state,mn=function(n){var t=(null===n||void 0===n?void 0:n.length)>0?n:new Date;return d()(t).format("MM-DD")<="02-15"?String(+d()(t).format("YYYY")-1):d()(t).format("YYYY")},hn=function(t){var e,a,i,c;n.isSubject&&(e=null===(a=n.isSubject)||void 0===a||null===(i=a.filter((function(n){return Object.keys(n)[0]===t})))||void 0===i||null===(c=i[0])||void 0===c?void 0:c[t]);return e}(mn()),xn=function(n,t){return"past"===t?null===n||void 0===n||n.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})):null===n||void 0===n||n.sort((function(n,t){return n.id.slice(0,10)<t.id.slice(0,10)?1:-1})),n},pn=function(){var t=(0,c.Z)((0,a.Z)().mark((function t(){var e,c;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return B([]),e=(0,v.JU)(f.wO,"consult",n.userUid),t.next=4,(0,v.QT)(e);case 4:c=t.sent,(0,v.cf)(e,(function(n){if(c.exists()){var t,e,a=null===(t=n.data())||void 0===t||null===(e=t.consult_data)||void 0===e?void 0:e.filter((function(n){return mn(n.id.slice(0,10))===mn()}));a=xn(a,"past"),B((0,i.Z)(a))}}));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();(0,s.useEffect)((function(){pn()}),[]),(0,s.useEffect)((function(){var n=[];if(console.log(w),""!==w)n=hn?null===M||void 0===M?void 0:M.filter((function(n){var t;return n.clName===W&&n.name===w.split(" ")[1]||(null===n||void 0===n||null===(t=n.related)||void 0===t?void 0:t.includes(w))})):null===M||void 0===M?void 0:M.filter((function(n){var t;return n.name===w.split(" ")[1]||(null===n||void 0===n||null===(t=n.related)||void 0===t?void 0:t.includes(w))}));else{var t;if(n=(0,i.Z)(M),""!==W)n=null===(t=n)||void 0===t?void 0:t.filter((function(n){return n.clName===W}));n=xn(n,"past")}O(n),H(n),function(n){var t=null===n||void 0===n?void 0:n.map((function(n){return n.option.slice(1)}));$(t)}(n)}),[w,M,W]);var _n=function(n){n.currentTarget.style.display="none"};(0,s.useEffect)((function(){var n=null===vn||void 0===vn?void 0:vn.student,t=null===vn||void 0===vn?void 0:vn.clName;""!==t&&A(t),""!==n&&n&&(console.log(n),N(n))}),[vn]);var gn=function(){var t=(0,c.Z)((0,a.Z)().mark((function t(e){var i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=(0,v.JU)(f.wO,"consult",n.userUid),t.next=3,(0,v.pl)(i,e);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}();(0,s.useEffect)((function(){var n;0!==(null===(n=Object.keys(dn))||void 0===n?void 0:n.length)&&gn(dn)}),[dn]);var Zn=function(){var n=(0,c.Z)((0,a.Z)().mark((function n(t){var e,l;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("all"===t||0!==(null===sn||void 0===sn?void 0:sn.length)){n.next=2;break}return n.abrupt("return");case 2:if(0!==(null===C||void 0===C?void 0:C.length)){n.next=4;break}return n.abrupt("return");case 4:e=(0,i.Z)(M),l=function(){var n=(0,c.Z)((0,a.Z)().mark((function n(t){var i,l,s,o,r,u;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:l=[],"all"===t?(l=null===(s=e)||void 0===s?void 0:s.filter((function(n){return n.name===w.split(" ")[1]})),e=null===(o=e)||void 0===o?void 0:o.filter((function(n){return n.name!==w.split(" ")[1]}))):(l=null===(r=e)||void 0===r?void 0:r.filter((function(n){return sn.includes(n.id)})),e=null===(u=e)||void 0===u?void 0:u.filter((function(n){return!sn.includes(n.id)}))),null===(i=l)||void 0===i||i.forEach(function(){var n=(0,c.Z)((0,a.Z)().mark((function n(t){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(""===t.attachedFileUrl){n.next=3;break}return n.next=3,(0,g.oq)((0,g.iH)(f.Hw,t.attachedFileUrl));case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()),fn({consult_data:e});case 5:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),"all"===t?_().fire({icon:"warning",title:"\uc804\uccb4 \uc0ad\uc81c\ud560\uae4c\uc694?",text:"".concat(w.split(" ")[1]," \ud559\uc0dd\uc758 \ucd9c\uacb0 \uae30\ub85d\uc744 \ubaa8\ub450 \uc0ad\uc81c\ud560\uae4c\uc694? \uc0ad\uc81c \ud6c4\uc5d0\ub294 \uae30\ub85d\uc744 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc2e0\uc911\ud788 \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"),confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then(function(){var n=(0,c.Z)((0,a.Z)().mark((function n(t){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.isConfirmed){n.next=6;break}return an(!1),n.next=4,l("all");case 4:n.next=7;break;case 6:return n.abrupt("return");case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()):_().fire({icon:"warning",title:"\uc120\ud0dd \uc0ad\uc81c\ud560\uae4c\uc694?",text:"".concat(w.split(" ")[1]," \ud559\uc0dd\uc758 \uc120\ud0dd\ub41c \ucd9c\uacb0 \uae30\ub85d\uc744 \uc0ad\uc81c\ud560\uae4c\uc694? \uc0ad\uc81c \ud6c4\uc5d0\ub294 \uae30\ub85d\uc744 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc2e0\uc911\ud788 \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"),confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then(function(){var n=(0,c.Z)((0,a.Z)().mark((function n(t){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.isConfirmed){n.next=7;break}return an(!1),on([]),n.next=5,l("checked");case 5:n.next=8;break;case 7:return n.abrupt("return");case 8:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}());case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}();return(0,s.useEffect)((function(){G(""),X("")}),[W]),(0,s.useEffect)((function(){if(""===P)H(C);else{G("");var n=null===C||void 0===C?void 0:C.filter((function(n){return n.option.slice(1)===P}));H(n)}}),[P]),(0,s.useEffect)((function(){if(""===Q)H(C);else{X("");var n=null===C||void 0===C?void 0:C.filter((function(n){return+n.id.slice(5,7)===Q}));H(n)}}),[Q]),(0,Z.jsxs)("div",{children:[(0,Z.jsx)(o.Z,{students:n.students,userUid:n.userUid,isSubject:n.isSubject,selectStudentHandler:function(n){N(n)},clName:W,passStudent:w,nowClassNameHandler:function(n){A(n)}}),(0,Z.jsxs)("ul",{className:"".concat(m.Z["bottom-content-ul"]," ").concat(m.Z["flex-wrap"]),children:[""===w&&(0,Z.jsx)(Z.Fragment,{children:(0,Z.jsx)("div",{children:(0,Z.jsxs)("div",{className:m.Z["flex-wrap"],style:{alignItems:"flex-end"},children:[(0,Z.jsxs)("li",{className:m.Z["bottom-content-li"],style:{minWidth:"350px"},children:[(0,Z.jsxs)("div",{className:m.Z["flex-center-ml-10"],children:[(0,Z.jsx)("span",{className:m.Z["fs-13-bold"],children:W?"".concat(W," | \uc0c1\ub2f4 \uc694\uc57d"):"\uc6b0\ub9ac\ubc18 \uc0c1\ub2f4 \uc694\uc57d"}),"\xa0\xa0",(0,Z.jsxs)("button",{className:m.Z["search-btns"],onClick:function(){var n=[];M.forEach((function(t){var e=[t.num,t.name,t.option.slice(1),"".concat(t.id.slice(0,10)," ").concat(t.id.slice(10,15)),t.note,t.attachedFileUrl];hn&&e.unshift(t.clName),n.push(e)}));var t=["\ubc88\ud638","\uc774\ub984","\uad00\ub828","\ub0a0\uc9dc(\ub144\uc6d4\uc77c \uc2dc\uac01)","\uae30\ub85d\ub0b4\uc6a9","\ucca8\ubd80\ud30c\uc77c \uc8fc\uc18c"];hn&&t.unshift("\ubc18"),n.unshift(t);var e=x.P6.book_new(),a=x.P6.aoa_to_sheet(n);a["!cols"]=[{wpx:40},{wpx:60},{wpx:60},{wpx:100},{wpx:200},{wpx:100}],hn&&a["!cols"].unshift({wpx:30}),x.P6.book_append_sheet(e,a,"\uc0c1\ub2f4\uae30\ub85d"),(0,x.NC)(e,"".concat(mn(),"\ud559\ub144\ub3c4 \uc0c1\ub2f4\uae30\ub85d(").concat(d()().format("YYYY-MM-DD"),").xlsx"))},children:[(0,Z.jsx)("i",{className:"fa-solid fa-download"})," \uc5d1\uc140\uc800\uc7a5"]})]}),(0,Z.jsx)("hr",{className:m.Z["margin-15"]}),0===(null===C||void 0===C?void 0:C.length)?(0,Z.jsx)("div",{className:"".concat(m.Z["fs-13"]," ").concat(m.Z["margin-15"]),children:"* \ud559\uae09\uc758 \uc0c1\ub2f4 \uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"}):(0,Z.jsx)("div",{children:(0,Z.jsxs)("div",{children:[(0,Z.jsx)(h.Z,{id:"whole",className:""===P?"sortBtn-clicked":"sortBtn",name:"\uc804\uccb4(".concat(null===V||void 0===V?void 0:V.length,")"),onclick:function(){X("")}}),null===(t=(0,i.Z)(new Set(V)))||void 0===t?void 0:t.map((function(n){return(0,Z.jsx)(h.Z,{id:n,className:P===n?"sortBtn-clicked":"sortBtn",name:"".concat(n," (").concat(null===V||void 0===V?void 0:V.filter((function(t){return t===n})).length,")"),onclick:function(){G(""),X(n)}},"whole"+n)}))]})})]}),0!==(null===C||void 0===C?void 0:C.length)&&(0,Z.jsxs)("li",{className:m.Z["bottom-content-li"],children:[(0,Z.jsx)("b",{children:"\uc6d4\ubcc4\ub85c \ubcf4\uae30"}),(0,Z.jsx)("hr",{className:m.Z["margin-15"]}),(0,Z.jsx)(h.Z,{id:"\ubaa8\ub4e0 \ub2ec",className:""===Q?"sortBtn-clicked":"sortBtn",name:"\ubaa8\ub4e0 \ub2ec",onclick:function(){G("")}}),null===(e=hn?(0,i.Z)(new Set(null===M||void 0===M||null===(p=M.filter((function(n){return(null===n||void 0===n?void 0:n.clName)===W})))||void 0===p?void 0:p.map((function(n){return+n.id.slice(5,7)})))):(0,i.Z)(new Set(null===M||void 0===M?void 0:M.map((function(n){return+n.id.slice(5,7)})))))||void 0===e||null===(u=e.sort((function(n,t){return n>t?1:-1})))||void 0===u?void 0:u.map((function(n){return(0,Z.jsx)(h.Z,{id:"".concat(n,"\uc6d4"),className:Q===n?"sortBtn-clicked":"sortBtn",name:"".concat(n,"\uc6d4"),onclick:function(){X(""),G(n)}},"".concat(n,"\uc6d4"))}))]})]})})}),w&&(0,Z.jsxs)("div",{children:[(0,Z.jsxs)("div",{className:m.Z["flex-wrap"],children:[(0,Z.jsxs)("li",{className:m.Z["bottom-content-li"],style:{minWidth:"200px"},children:[(0,Z.jsxs)("b",{children:[w," | \uc0c1\ub2f4 \uc694\uc57d"]}),(0,Z.jsx)("hr",{className:m.Z["margin-15"]}),0===(null===C||void 0===C?void 0:C.length)?(0,Z.jsx)("div",{className:"".concat(m.Z["fs-13"]," ").concat(m.Z["margin-15"]),children:"\uae30\ub85d\uc774 \uc5c6\uc5b4\uc694!"}):(0,Z.jsxs)("div",{children:[(0,Z.jsx)(h.Z,{id:"whole",className:""===P?"sortBtn-clicked":"sortBtn",name:"\uc804\uccb4(".concat(null===V||void 0===V?void 0:V.length,")"),onclick:function(){X("")}}),null===(j=(0,i.Z)(new Set(V)))||void 0===j?void 0:j.map((function(n){return(0,Z.jsx)(h.Z,{id:n,className:P===n?"sortBtn-clicked":"sortBtn",name:"".concat(n," (").concat(null===V||void 0===V?void 0:V.filter((function(t){return t===n})).length,")"),onclick:function(){X(n)}},n)}))]})]}),(null===C||void 0===C?void 0:C.length)>0&&!hn&&(0,Z.jsx)("li",{className:m.Z["bottom-content-li"],style:{minWidth:"100px"},children:(0,Z.jsxs)("div",{className:m.Z["flex-d-column"],children:[(0,Z.jsx)(h.Z,{id:"attend-delete",className:"sortBtn",name:en?"\ud655\uc778":"\uc804\uccb4\uc0ad\uc81c",onclick:function(){Zn(en?"checked":"all")}}),(0,Z.jsx)(h.Z,{id:"attend-delete",className:"sortBtn",name:en?"\ucde8\uc18c":"\uc120\ud0dd\uc0ad\uc81c",onclick:function(){en?(on([]),an(!1)):an(!0)}})]})})]}),en&&(0,Z.jsx)("p",{style:{color:"white"},children:"* \uc0ad\uc81c\ud560 \ucd9c\uacb0\uc790\ub8cc\ub97c \uc120\ud0dd\ud558\uc2dc\uace0 \ud655\uc778\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694."})]}),(0,Z.jsxs)("div",{className:"".concat(m.Z["flex-wrap"]),style:{width:"100%"},children:[null===D||void 0===D?void 0:D.map((function(n){var t,e,a;return(0,Z.jsxs)("li",{id:n.id,className:"".concat(m.Z["bottom-content-li"]," ").concat((null===sn||void 0===sn||null===(t=sn.filter((function(t){return t===n.id})))||void 0===t?void 0:t.length)>0?m.Z["list-clicked"]:""),style:{minWidth:"240px",maxWidth:"540px"},onClick:function(){!function(n){var t;if(en){var e,a,c=(null===sn||void 0===sn||null===(t=sn.filter((function(t){return t===n.id})))||void 0===t?void 0:t.length)>0,l=(0,i.Z)(sn);c?l=null===(e=l)||void 0===e?void 0:e.filter((function(t){return t!==n.id})):null===(a=l)||void 0===a||a.push(n.id),on(l)}}(n)},children:[(0,Z.jsx)("div",{className:m.Z["flex-ml-10"],children:"".concat(n.id.slice(0,10)," ").concat(n.id.slice(10,15))}),(0,Z.jsx)("div",{className:m.Z["fs-13"],children:"".concat(hn&&""===W?n.clName:""," ").concat(n.name," \ud83d\ude42 ").concat(n.option.slice(1))}),(0,Z.jsx)("hr",{className:m.Z["margin-15"]}),(null===(e=n.related)||void 0===e?void 0:e.length)>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("div",{className:m.Z["flex-wrap"],children:null===(a=n.related)||void 0===a?void 0:a.map((function(n){return(0,Z.jsx)("span",{style:{margin:"3px 5px"},children:n},n)}))}),(0,Z.jsx)("hr",{className:m.Z["margin-15"]})]}),(0,Z.jsx)("div",{className:m.Z["fs-13"],children:n.note}),n.attachedFileUrl&&(0,Z.jsxs)("div",{className:m.Z["margin-15"],children:[(0,Z.jsx)("img",{className:m.Z["width-max400"],src:n.attachedFileUrl,height:"auto",alt:"filePreview",onError:_n}),(0,Z.jsx)("audio",{controls:!0,className:m.Z["width-max400"],src:n.attachedFileUrl,onError:_n})]})]},n.id)})),0===(null===C||void 0===C?void 0:C.length)&&(0,Z.jsx)("li",{className:m.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \uc0c1\ub2f4\uae30\ub85d\uc774 \uc5c6\uc5b4\uc694!"})]})]})]})}},62118:function(n,t,e){e.d(t,{Z:function(){return v}});var a=e(70885),i=e(47313),c=e(53776),l=e(10658),s=e.n(l),o=e(72184),r=e(37692),u=e(97890),d=e(46417),f=function(n){var t=(0,i.useState)(""),e=(0,a.Z)(t,2),c=e[0],l=e[1],s=(0,i.useState)(""),f=(0,a.Z)(s,2),v=f[0],m=f[1],h=(0,i.useState)(""),x=(0,a.Z)(h,2),p=x[0],_=x[1],g=(0,u.s0)();return(0,i.useEffect)((function(){var n=window.location.href.split("/");l(n[n.length-1])}),[window.location.href]),(0,i.useEffect)((function(){""!==n.onStudent&&m(n.onStudent)}),[n.onStudent]),(0,i.useEffect)((function(){""!==n.clName&&_(n.clName)}),[n.clName]),(0,d.jsxs)("div",{className:o.Z["btns-div"],children:[(0,d.jsx)(r.Z,{name:"\ucd9c\uacb0",className:"manageAttendance"!==c?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageAttendance",{state:{student:v,clName:p||""}})}}),(0,d.jsx)(r.Z,{name:"\uc0c1\ub2f4",className:"manageConsult"!==c?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageConsult",{state:{student:v,clName:p||""}})}}),(0,d.jsx)(r.Z,{icon:"\uc81c\ucd9c/\uac1c\ubcc4",className:"manageCheckListMemo"!==c?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageCheckListMemo",{state:{student:v,clName:p||""}})}}),(0,d.jsx)(r.Z,{name:"\uc815\ubcf4",className:"manageStudent"!==c?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageStudent",{state:{student:v,clName:p||""}})}})]})},v=function(n){var t,e=(0,i.useState)(""),l=(0,a.Z)(e,2),r=l[0],u=l[1],v=(0,i.useState)(""),m=(0,a.Z)(v,2),h=m[0],x=m[1],p=(0,i.useState)([]),_=(0,a.Z)(p,2),g=_[0],Z=_[1],j=(0,i.useState)([]),b=(0,a.Z)(j,2),k=b[0],w=b[1],N=(0,i.useState)(!1),E=(0,a.Z)(N,2),S=E[0],M=E[1],B=(0,i.useRef)();(0,i.useEffect)((function(){if(""!==r){var n=document.getElementById("std-".concat(r));null===n||void 0===n||n.classList.remove("none"),null===n||void 0===n||n.classList.add("clicked")}}),[r]);var y=function(n){var t=(null===n||void 0===n?void 0:n.length)>0?n:new Date;return s()(t).format("MM-DD")<="02-15"?String(+s()(t).format("YYYY")-1):s()(t).format("YYYY")};(0,i.useEffect)((function(){var t=function(t){var e,a,i,c;return n.isSubject&&(e=null===(a=n.isSubject)||void 0===a||null===(i=a.filter((function(n){return Object.keys(n)[0]===t})))||void 0===i||null===(c=i[0])||void 0===c?void 0:c[t]),e}(y());M(t)}),[n.isSubject]),(0,i.useEffect)((function(){var t,e,a,i=y(),c=null===n||void 0===n||null===(t=n.students)||void 0===t||null===(e=t.filter((function(n){return Object.keys(n)[0]===i})))||void 0===e||null===(a=e[0])||void 0===a?void 0:a[i];(null===c||void 0===c?void 0:c.length)>0?w(c):w([])}),[n.students]);return(0,i.useEffect)((function(){null===k||void 0===k||k.forEach((function(n){Object.keys(n)[0]===h&&Z(Object.values(n)[0])})),""===h&&Z([]),n.nowClassNameHandler(h)}),[h]),(0,i.useEffect)((function(){n.selectStudentHandler(r)}),[r]),(0,i.useEffect)((function(){x(n.clName),u("")}),[n.clName]),(0,i.useEffect)((function(){""!==n.passStudent&&u(n.passStudent)}),[n.passStudent]),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{children:S&&(0,d.jsxs)("div",{children:[(0,d.jsxs)("select",{ref:B,onChange:function(){var n=B.current.value;x(n)},className:o.Z["class-select"],value:h,children:[(0,d.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===k||void 0===k?void 0:k.map((function(n){return(0,d.jsx)("option",{value:Object.keys(n),children:Object.keys(n)},Object.keys(n))}))]}),""===(null===B||void 0===B||null===(t=B.current)||void 0===t?void 0:t.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]})}),(0,d.jsxs)("div",{children:[(0,d.jsx)(c.Z,{students:S?g:k,showOption:function(n){var t=n.target.innerText;if(u(r===t?"":t),""!==r){var e=document.getElementById("std-".concat(r));null===e||void 0===e||e.classList.remove("clicked"),null===e||void 0===e||e.classList.add("none")}},isSubject:n.isSubject,manageEach:!0,passStudent:n.passStudent}),!S&&(!k||0===(null===k||void 0===k?void 0:k.length))&&(0,d.jsxs)(d.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,d.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,d.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,d.jsx)("br",{})," ",(0,d.jsx)("br",{})]}),S&&(!g||0===(null===g||void 0===g?void 0:g.length))&&(0,d.jsxs)(d.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,d.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,d.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,d.jsx)("br",{})," ",(0,d.jsx)("br",{})]})]}),(0,d.jsx)(f,{onStudent:r,clName:h}),(0,d.jsx)("div",{})]})}},72184:function(n,t){t.Z={"class-select":"ManageEach_class-select__IlQlu","flex-d-column":"ManageEach_flex-d-column__Dh-Iq","btns-div":"ManageEach_btns-div__Zivma","padd-5":"ManageEach_padd-5__-MakG","bottom-content-ul":"ManageEach_bottom-content-ul__xXaZv","bottom-content-li":"ManageEach_bottom-content-li__S8Tge","flex-ml-10":"ManageEach_flex-ml-10__whmHW","attendEdit-div":"ManageEach_attendEdit-div__7u3SK",show:"ManageEach_show__HHbXY","fs-13":"ManageEach_fs-13__7gMai","fs-15":"ManageEach_fs-15__stlkn","fs-11":"ManageEach_fs-11__dIRN5","fs-9":"ManageEach_fs-9__jSAIp","fs-13-bold":"ManageEach_fs-13-bold__HBo6n","clicked-title":"ManageEach_clicked-title__-ZVjL","search-title":"ManageEach_search-title__wX5x6","search-btns":"ManageEach_search-btns__aYFXS","flex-wrap":"ManageEach_flex-wrap__NnIS9","margin-15":"ManageEach_margin-15__R8DcB","margin-5":"ManageEach_margin-5__IctPu","flex-center-ml-10":"ManageEach_flex-center-ml-10__fmq5p","flex-center":"ManageEach_flex-center__Ent-o","width-max400":"ManageEach_width-max400__8b-OH","attend-edit-p":"ManageEach_attend-edit-p__SvrxQ","attend-edit-d":"ManageEach_attend-edit-d__-GFUJ","attend-edit-c":"ManageEach_attend-edit-c__XExyE","a-link":"ManageEach_a-link__oahRi",excelfileUploadBtn:"ManageEach_excelfileUploadBtn__vkRXS","list-clicked":"ManageEach_list-clicked__4v6iy","span-left":"ManageEach_span-left__PWcvA","onStudent-name":"ManageEach_onStudent-name__5dz+H","fs-22-bold":"ManageEach_fs-22-bold__Irb6D"}}}]);