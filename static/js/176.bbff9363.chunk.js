"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[176],{53776:function(n,t,e){e.d(t,{Z:function(){return l}});e(47313);var i="Student_div__ROh5A",a=e(77405),c=e(46417),l=function(n){var t;return(0,c.jsx)("div",{className:i,children:n.students&&(null===(t=n.students)||void 0===t?void 0:t.map((function(t){var e;return(0,c.jsx)(a.Z,{className:n.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(e=n.passStudent)||void 0===e?void 0:e.split(" ")[1])===t.name,manageEach:n.manageEach,name:t.name,num:t.num,woman:t.woman,onShowOption:function(t){n.showOption(t),t.target+="add"}},t.num)})))})}},77405:function(n,t,e){e.d(t,{Z:function(){return c}});e(47313);var i={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"},a=e(46417),c=function(n){return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("button",{className:"".concat(i[n.className]," ").concat(n.classAdd&&"clicked"," ").concat(!n.woman&&i.woman),id:"std-".concat(n.num," ").concat(n.name),onClick:function(t){n.onShowOption(t)},children:[n.num," ",n.name]},"stdBtn-".concat(n.num," ").concat(n.name))})}},63176:function(n,t,e){e.r(t);var i=e(74165),a=e(42982),c=e(15861),l=e(70885),o=e(47313),s=e(62118),r=e(10658),u=e.n(r),d=e(80650),f=e(90573),v=e(97890),m=e(72184),h=e(37692),p=e(48737),x=e(67114),Z=e.n(x),_=e(46417);t.default=function(n){var t,e,r,x,g,j,k,b,N,w=(0,o.useState)(""),E=(0,l.Z)(w,2),S=E[0],B=E[1],y=(0,o.useState)(""),M=(0,l.Z)(y,2),C=M[0],O=M[1],Y=(0,o.useState)([]),H=(0,l.Z)(Y,2),W=H[0],T=H[1],I=(0,o.useState)([]),U=(0,l.Z)(I,2),A=U[0],D=U[1],F=(0,o.useState)([]),P=(0,l.Z)(F,2),L=P[0],R=P[1],X=(0,o.useState)([]),J=(0,l.Z)(X,2),Q=J[0],q=J[1],G=(0,o.useState)(""),z=(0,l.Z)(G,2),K=z[0],V=z[1],$=(0,o.useState)(""),nn=(0,l.Z)($,2),tn=nn[0],en=nn[1],an=(0,o.useState)(""),cn=(0,l.Z)(an,2),ln=cn[0],on=cn[1],sn=(0,o.useState)(!1),rn=(0,l.Z)(sn,2),un=rn[0],dn=rn[1],fn=(0,o.useState)([]),vn=(0,l.Z)(fn,2),mn=vn[0],hn=vn[1],pn=(0,o.useState)({}),xn=(0,l.Z)(pn,2),Zn=xn[0],_n=xn[1],gn=(0,o.useState)(null),jn=(0,l.Z)(gn,2),kn=jn[0],bn=jn[1],Nn=(0,v.TH)().state,wn=function(n){var t=n||new Date;return+u()(t).format("MM")<=2?String(+u()(t).format("YYYY")-1):u()(t).format("YYYY")},En=function(t){var e,i,a,c;n.isSubject&&(e=null===(i=n.isSubject)||void 0===i||null===(a=i.filter((function(n){return Object.keys(n)[0]===t})))||void 0===a||null===(c=a[0])||void 0===c?void 0:c[t]);return e}(wn()),Sn=function(){var t=(0,c.Z)((0,i.Z)().mark((function t(){var e,c;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return T([]),e=(0,f.JU)(d.wO,"attend",n.userUid),t.next=4,(0,f.QT)(e);case 4:c=t.sent,(0,f.cf)(e,(function(n){if(c.exists()){var t,e,i,l,o=[];if(En)null===(t=n.data())||void 0===t||null===(e=t.attend_data)||void 0===e||e.forEach((function(n){var t,e;null===(t=Object.values(n))||void 0===t||null===(e=t[0])||void 0===e||e.forEach((function(t){var e;t.clName=null===(e=Object.keys(n))||void 0===e?void 0:e[0],o.push(t)}))}));else o=null===(i=n.data())||void 0===i||null===(l=i.attend_data)||void 0===l?void 0:l.filter((function(n){return wn(n.id.slice(0,10))===wn()}));T((0,a.Z)(o.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)}))))}}));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();(0,o.useEffect)((function(){Sn()}),[]),(0,o.useEffect)((function(){hn([]);var n,t,e,i=[];(V(""),""!==S)?i=En?(null===W||void 0===W||null===(n=W.filter((function(n){return n.name===S.split(" ")[1]&&n.clName===C})))||void 0===n?void 0:n.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})))||[]:(null===W||void 0===W||null===(t=W.filter((function(n){return n.name===S.split(" ")[1]})))||void 0===t?void 0:t.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})))||[]:i=En?(null===W||void 0===W||null===(e=W.filter((function(n){return n.clName===C})))||void 0===e?void 0:e.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})))||[]:(0,a.Z)(W).sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1}));D(i),R(i),function(n){var t=null===n||void 0===n?void 0:n.map((function(n){return n.option.slice(1)}));q(t)}(i)}),[S,W,C]),(0,o.useEffect)((function(){en(""),V("")}),[C]),(0,o.useEffect)((function(){var n=null===Nn||void 0===Nn?void 0:Nn.student,t=null===Nn||void 0===Nn?void 0:Nn.clName;""!==n&&B(n),""!==t&&O(t)}),[Nn]);(0,o.useEffect)((function(){if(en(""),on(""),""===K)R(A);else{var n=null===A||void 0===A?void 0:A.filter((function(n){return n.option.slice(1)===K}));R(n)}}),[K]),(0,o.useEffect)((function(){if(on(""),V(""),""===tn)R(A);else{var n=null===A||void 0===A?void 0:A.filter((function(n){return+n.id.slice(5,7)===tn}));R(n)}}),[tn]),(0,o.useEffect)((function(){if(en(""),V(""),""===ln)R(null===A||void 0===A?void 0:A.filter((function(n){return!n.paper})));else{var n=null===A||void 0===A?void 0:A.filter((function(n){return n.name===ln&&!n.paper}));R(n)}}),[ln]);var Bn=function(){var t=(0,c.Z)((0,i.Z)().mark((function t(e){var a;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=(0,f.JU)(d.wO,"attend",n.userUid),t.next=3,(0,f.pl)(a,e);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}();(0,o.useEffect)((function(){var n;0!==(null===(n=Object.keys(Zn))||void 0===n?void 0:n.length)&&Bn(Zn)}),[Zn]);var yn=function(){var n=(0,c.Z)((0,i.Z)().mark((function n(t){var e,l;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("all"===t||0!==(null===mn||void 0===mn?void 0:mn.length)){n.next=2;break}return n.abrupt("return");case 2:if(0!==(null===A||void 0===A?void 0:A.length)){n.next=4;break}return n.abrupt("return");case 4:e=(0,a.Z)(W),l=function(){var n=(0,c.Z)((0,i.Z)().mark((function n(t){var a,c;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e="all"===t?null===(a=e)||void 0===a?void 0:a.filter((function(n){return n.name!==S.split(" ")[1]})):null===(c=e)||void 0===c?void 0:c.filter((function(n){return!mn.includes(n.id)})),_n({attend_data:e});case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),"all"===t?Z().fire({icon:"warning",title:"\uc804\uccb4 \uc0ad\uc81c\ud560\uae4c\uc694?",text:"".concat(S.split(" ")[1]," \ud559\uc0dd\uc758 \ucd9c\uacb0 \uae30\ub85d\uc744 \ubaa8\ub450 \uc0ad\uc81c\ud560\uae4c\uc694? \uc0ad\uc81c \ud6c4\uc5d0\ub294 \uae30\ub85d\uc744 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc2e0\uc911\ud788 \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"),confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then(function(){var n=(0,c.Z)((0,i.Z)().mark((function n(t){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.isConfirmed){n.next=6;break}return dn(!1),n.next=4,l("all");case 4:n.next=7;break;case 6:return n.abrupt("return");case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()):Z().fire({icon:"warning",title:"\uc120\ud0dd \uc0ad\uc81c\ud560\uae4c\uc694?",text:"".concat(S.split(" ")[1]," \ud559\uc0dd\uc758 \uc120\ud0dd\ub41c \ucd9c\uacb0 \uae30\ub85d\uc744 \uc0ad\uc81c\ud560\uae4c\uc694? \uc0ad\uc81c \ud6c4\uc5d0\ub294 \uae30\ub85d\uc744 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc2e0\uc911\ud788 \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"),confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then(function(){var n=(0,c.Z)((0,i.Z)().mark((function n(t){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.isConfirmed){n.next=7;break}return dn(!1),hn([]),n.next=5,l("checked");case 5:n.next=8;break;case 7:return n.abrupt("return");case 8:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}());case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),Mn=function(){var n=(0,c.Z)((0,i.Z)().mark((function n(t){var e,c;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:"paper"===t?(c=(0,a.Z)(W),c=null===(e=c)||void 0===e?void 0:e.map((function(n){var t=n;return n.id===kn.id&&(t.paper=!t.paper),t})),_n({attend_data:c})):"delete"===t&&Z().fire({title:"\uc790\ub8cc \uc0ad\uc81c \ud655\uc778",text:"\ucd9c\uacb0 \uc790\ub8cc\ub97c \uc815\ub9d0 \uc0ad\uc81c\ud560\uae4c\uc694? \uc0ad\uc81c\ud55c \uc790\ub8cc\ub294 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.",icon:"warning",confirmButtonText:"\uc0ad\uc81c",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then((function(n){if(n.isConfirmed){var t;bn(null);var e=(0,a.Z)(W),i={attend_data:e=null===(t=e)||void 0===t?void 0:t.filter((function(n){return n.id!==kn.id}))};console.log(i),_n(i)}}));case 1:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}();return(0,_.jsxs)("div",{children:[(0,_.jsx)(s.Z,{students:n.students,userUid:n.userUid,isSubject:n.isSubject,selectStudentHandler:function(n){B(n)},clName:C,passStudent:S,nowClassNameHandler:function(n){O(n)}}),(0,_.jsxs)("ul",{className:"".concat(m.Z["bottom-content-ul"]," ").concat(m.Z["flex-wrap"]),children:[S&&(0,_.jsxs)("div",{children:[(0,_.jsxs)("div",{className:m.Z["flex-wrap"],children:[(0,_.jsxs)("li",{className:m.Z["bottom-content-li"],style:{minWidth:"200px"},children:[(0,_.jsxs)("b",{children:[" ",S," | \ucd9c\uacb0 \uc694\uc57d"]}),(0,_.jsx)("hr",{className:m.Z["margin-15"]}),0===(null===A||void 0===A?void 0:A.length)?(0,_.jsx)("div",{className:"".concat(m.Z["fs-13"]," ").concat(m.Z["margin-15"]),children:"\uac1c\uadfc\uc785\ub2c8\ub2e4!"}):(0,_.jsxs)("div",{children:[(0,_.jsx)(h.Z,{id:"whole",className:""===K?"sortBtn-clicked":"sortBtn",name:"\uc804\uccb4(".concat(null===Q||void 0===Q?void 0:Q.length,")"),onclick:function(){V("")}},"whole"),null===(t=(0,a.Z)(new Set(Q)))||void 0===t?void 0:t.map((function(n){return(0,_.jsx)(h.Z,{id:n,className:K===n?"sortBtn-clicked":"sortBtn",name:"".concat(n," (").concat(null===Q||void 0===Q?void 0:Q.filter((function(t){return t===n})).length,")"),onclick:function(){V(n)}},n)}))]})]}),(null===A||void 0===A?void 0:A.length)>0&&!En&&(0,_.jsx)("li",{className:m.Z["bottom-content-li"],style:{minWidth:"100px"},children:(0,_.jsxs)("div",{className:m.Z["flex-d-column"],children:[(0,_.jsx)(h.Z,{id:"attend-delete",className:"sortBtn",name:un?"\ud655\uc778":"\uc804\uccb4\uc0ad\uc81c",style:{backgroundColor:un?"#ff5a70":"#da9a9a",fontWeight:"bold"},onclick:function(){yn(un?"checked":"all")}}),(0,_.jsx)(h.Z,{id:"attend-delete",className:"sortBtn",name:un?"\ucde8\uc18c":"\uc120\ud0dd\uc0ad\uc81c",style:{backgroundColor:un?"gray":"#da9a9a",fontWeight:"bold"},onclick:function(){un?(hn([]),dn(!1)):dn(!0)}})]})})]}),un&&(0,_.jsx)("p",{style:{color:"white"},children:"* \uc0ad\uc81c\ud560 \ucd9c\uacb0\uc790\ub8cc\ub97c \uc120\ud0dd\ud558\uc2dc\uace0 \ud655\uc778\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694."}),(0,_.jsx)("div",{className:m.Z["btns-div"],style:{flexWrap:"wrap"},children:null===L||void 0===L?void 0:L.map((function(n){var t;return(0,_.jsxs)("li",{id:n.id,className:"".concat(m.Z["bottom-content-li"]," ").concat((null===mn||void 0===mn||null===(t=mn.filter((function(t){return t===n.id})))||void 0===t?void 0:t.length)>0?m.Z["list-clicked"]:""),onClick:function(){un?function(n){var t,e,i,c=(null===mn||void 0===mn||null===(t=mn.filter((function(t){return t===n.id})))||void 0===t?void 0:t.length)>0,l=(0,a.Z)(mn);c?l=null===(e=l)||void 0===e?void 0:e.filter((function(t){return t!==n.id})):null===(i=l)||void 0===i||i.push(n.id),hn(l)}(n):bn(kn?null:n)},style:{width:"260px",padding:"25px"},children:[(0,_.jsxs)("div",{className:m.Z["flex-ml-10"],children:[n.id.slice(0,10)," ",(0,_.jsx)("i",{className:"fa-solid fa-circle-check",style:n.paper?{color:"#ff5a71",margin:"0 10px"}:{color:"#cacaca",margin:"0 10px"}})]}),(0,_.jsxs)("div",{className:m.Z["fs-13"],children:[n.option.slice(1)," | ",n.note||"-"]}),(0,_.jsxs)("div",{className:"".concat(m.Z["attendEdit-div"]," ").concat((null===kn||void 0===kn?void 0:kn.id)===n.id?m.Z.show:""),children:[(0,_.jsx)("button",{className:m.Z["attend-edit-p"],onClick:function(){Mn("paper")},children:"\uc11c\ub958"}),(0,_.jsx)("button",{className:m.Z["attend-edit-d"],onClick:function(n){n.stopPropagation(),Mn("delete")},children:"\uc0ad\uc81c"}),(0,_.jsx)("button",{className:m.Z["attend-edit-c"],children:"\ucde8\uc18c"})]})]},"".concat(n.id).concat(C||""))}))}),0===(null===A||void 0===A?void 0:A.length)&&(0,_.jsx)("li",{className:m.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \ucd9c\uacb0\uae30\ub85d\uc774 \uc5c6\uc5b4\uc694!"})]}),""===S&&(0,_.jsxs)("div",{children:[(0,_.jsxs)("div",{className:m.Z["flex-wrap"],style:{alignItems:"center"},children:[(0,_.jsxs)("li",{className:m.Z["bottom-content-li"],style:{minWidth:"350px"},children:[(0,_.jsxs)("div",{className:m.Z["flex-center-ml-10"],children:[(0,_.jsx)("span",{className:m.Z["fs-13-bold"],children:C?"".concat(C," | \ucd9c\uacb0 \uc694\uc57d"):"\uc6b0\ub9ac\ubc18 \ucd9c\uacb0 \uc694\uc57d"}),"\xa0\xa0",(0,_.jsxs)("button",{className:m.Z["search-btns"],onClick:function(){var n,t=[];null===W||void 0===W||null===(n=W.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})))||void 0===n||n.forEach((function(n){var e=[+n.num,n.name,"".concat(n.id.slice(5,7),"\uc6d4"),"".concat(n.id.slice(8,10),"\uc77c"),n.option.slice(1),n.note];En&&e.unshift(n.clName),t.push(e)})),En?t.unshift(["\ubc18","\ubc88\ud638","\uc774\ub984","\ub0a0\uc9dc(\uc6d4)","\ub0a0\uc9dc(\uc77c)","\ucd9c\uacb0\uc635\uc158","\ube44\uace0"]):t.unshift(["\ubc88\ud638","\uc774\ub984","\ub0a0\uc9dc(\uc6d4)","\ub0a0\uc9dc(\uc77c)","\ucd9c\uacb0\uc635\uc158","\ube44\uace0"]);var e=p.P6.book_new(),i=p.P6.aoa_to_sheet(t);i["!cols"]=[{wpx:30},{wpx:60},{wpx:40},{wpx:40},{wpx:60},{wpx:100}],En&&i["!cols"].unshift({wpx:30}),p.P6.book_append_sheet(e,i,"\ucd9c\uacb0\uae30\ub85d"),(0,p.NC)(e,"".concat(wn(),"\ud559\ub144\ub3c4 \ucd9c\uacb0\uae30\ub85d(").concat(u()().format("YYYY-MM-DD"),").xlsx"))},children:[(0,_.jsx)("i",{className:"fa-solid fa-download"})," \uc5d1\uc140\uc800\uc7a5"]})]}),(0,_.jsx)("hr",{className:m.Z["margin-15"]}),0===(null===A||void 0===A?void 0:A.length)?(0,_.jsx)("div",{className:"".concat(m.Z["fs-13"]," ").concat(m.Z["margin-15"]),children:"* \ud559\uae09\uc758 \ucd9c\uacb0 \uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"}):(0,_.jsx)("div",{children:(0,_.jsxs)("div",{children:[(0,_.jsx)(h.Z,{id:"whole",className:""===K?"sortBtn-clicked":"sortBtn",name:"\uc804\uccb4(".concat(null===Q||void 0===Q?void 0:Q.length,")"),onclick:function(){V("")}}),null===(e=(0,a.Z)(new Set(Q)))||void 0===e?void 0:e.map((function(n){return(0,_.jsx)(h.Z,{id:n,className:K===n?"sortBtn-clicked":"sortBtn",name:"".concat(n," (").concat(null===Q||void 0===Q?void 0:Q.filter((function(t){return t===n})).length,")"),onclick:function(){V(n)}},n)}))]})})]}),0!==(null===A||void 0===A?void 0:A.length)&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)("li",{className:m.Z["bottom-content-li"],children:["\uc6d4\ubcc4\ub85c \ubcf4\uae30",(0,_.jsx)("hr",{className:m.Z["margin-15"]}),(0,_.jsx)(h.Z,{id:"\ubaa8\ub4e0 \ub2ec",className:""===tn?"sortBtn-clicked":"sortBtn",name:"\ubaa8\ub4e0 \ub2ec (".concat(null===A||void 0===A?void 0:A.length,")"),onclick:function(){en("")}}),null===(r=En?(0,a.Z)(new Set(null===W||void 0===W||null===(g=W.filter((function(n){return(null===n||void 0===n?void 0:n.clName)===C})))||void 0===g?void 0:g.map((function(n){return+n.id.slice(5,7)})))):(0,a.Z)(new Set(null===W||void 0===W?void 0:W.map((function(n){return+n.id.slice(5,7)})))))||void 0===r||null===(x=r.sort((function(n,t){return n>t?1:-1})))||void 0===x?void 0:x.map((function(n){var t;return(0,_.jsx)(_.Fragment,{children:(0,_.jsx)(h.Z,{id:"".concat(n,"\uc6d4"),className:tn===n?"sortBtn-clicked":"sortBtn",name:"".concat(n,"\uc6d4 (").concat(null===A||void 0===A||null===(t=A.filter((function(t){return+t.id.slice(5,7)===n})))||void 0===t?void 0:t.length,")"),onclick:function(){en(n)}},"".concat(n,"\uc6d4"))})}))]}),(0,_.jsxs)("li",{className:m.Z["bottom-content-li"],children:["\uc11c\ub958 \ubbf8\uc81c\ucd9c",(0,_.jsx)("hr",{className:m.Z["margin-15"]}),(0,_.jsx)(h.Z,{id:"\uc804\uccb4\ud559\uc0dd",className:""===ln?"sortBtn-clicked":"sortBtn",name:"\uc804\uccb4",onclick:function(){on("")}}),null===(j=En?(0,a.Z)(new Set(null===W||void 0===W||null===(b=W.filter((function(n){return(null===n||void 0===n?void 0:n.clName)===C&&!n.paper})))||void 0===b?void 0:b.map((function(n){return n.name})))):(0,a.Z)(new Set(null===W||void 0===W||null===(N=W.filter((function(n){return!n.paper})))||void 0===N?void 0:N.map((function(n){return n.name})))))||void 0===j||null===(k=j.sort((function(n,t){return n>t?1:-1})))||void 0===k?void 0:k.map((function(n){var t;return(0,_.jsx)(_.Fragment,{children:(0,_.jsx)(h.Z,{id:"noPaper-".concat(n),className:ln===n?"sortBtn-clicked":"sortBtn",name:"".concat(n," (").concat(null===W||void 0===W||null===(t=W.filter((function(t){return!t.paper&&t.name===n})))||void 0===t?void 0:t.length,")"),onclick:function(){on(n)}},"".concat(n))})}))]})]})]}),(0,_.jsx)("div",{className:m.Z["btns-div"],style:{flexWrap:"wrap"},children:null===L||void 0===L?void 0:L.map((function(n){return(0,_.jsxs)("li",{id:n.id,className:m.Z["bottom-content-li"],style:{width:"260px",padding:"25px"},onClick:function(){bn(kn?null:n)},children:[(0,_.jsxs)("div",{className:m.Z["flex-ml-10"],children:[n.id.slice(0,10)," ",(0,_.jsx)("i",{className:"fa-solid fa-circle-check",style:n.paper?{color:"#ff5a71",margin:"0 10px"}:{color:"#cacaca",margin:"0 10px"}}),n.name]}),(0,_.jsxs)("div",{className:m.Z["fs-13"],children:[n.option.slice(1)," | ",n.note||"-"]}),(0,_.jsxs)("div",{className:"".concat(m.Z["attendEdit-div"]," ").concat((null===kn||void 0===kn?void 0:kn.id)===n.id?m.Z.show:""),children:[(0,_.jsx)("button",{className:m.Z["attend-edit-p"],onClick:function(){Mn("paper")},children:"\uc11c\ub958"}),(0,_.jsx)("button",{className:m.Z["attend-edit-d"],onClick:function(n){n.stopPropagation(),Mn("delete")},children:"\uc0ad\uc81c"}),(0,_.jsx)("button",{className:m.Z["attend-edit-c"],children:"\ucde8\uc18c"})]})]},n.id)}))}),0===(null===A||void 0===A?void 0:A.length)&&(0,_.jsx)("li",{className:m.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \ucd9c\uacb0\uae30\ub85d\uc774 \uc5c6\uc5b4\uc694!"})]})]})]})}},62118:function(n,t,e){e.d(t,{Z:function(){return v}});var i=e(70885),a=e(47313),c=e(53776),l=e(10658),o=e.n(l),s=e(72184),r=e(37692),u=e(97890),d=e(46417),f=function(n){var t=(0,a.useState)(""),e=(0,i.Z)(t,2),c=e[0],l=e[1],o=(0,a.useState)(""),f=(0,i.Z)(o,2),v=f[0],m=f[1],h=(0,a.useState)(""),p=(0,i.Z)(h,2),x=p[0],Z=p[1],_=(0,u.s0)();return(0,a.useEffect)((function(){var n=window.location.href.split("/");l(n[n.length-1])}),[window.location.href]),(0,a.useEffect)((function(){""!==n.onStudent&&m(n.onStudent)}),[n.onStudent]),(0,a.useEffect)((function(){""!==n.clName&&Z(n.clName)}),[n.clName]),(0,d.jsxs)("div",{className:s.Z["btns-div"],children:[(0,d.jsx)(r.Z,{name:"\uc815\ubcf4",className:"manageStudent"!==c?"manageBtn":"manageBtn-clicked",onclick:function(){return _("/manageStudent",{state:{student:v,clName:x||""}})}}),(0,d.jsx)(r.Z,{name:"\ucd9c\uacb0",className:"manageAttendance"!==c?"manageBtn":"manageBtn-clicked",onclick:function(){return _("/manageAttendance",{state:{student:v,clName:x||""}})}}),(0,d.jsx)(r.Z,{name:"\uc0c1\ub2f4",className:"manageConsult"!==c?"manageBtn":"manageBtn-clicked",onclick:function(){return _("/manageConsult",{state:{student:v,clName:x||""}})}}),(0,d.jsx)(r.Z,{icon:"\uc81c\ucd9c/\uac1c\ubcc4",className:"manageCheckListMemo"!==c?"manageBtn":"manageBtn-clicked",onclick:function(){return _("/manageCheckListMemo",{state:{student:v,clName:x||""}})}})]})},v=function(n){var t,e=(0,a.useState)(""),l=(0,i.Z)(e,2),r=l[0],u=l[1],v=(0,a.useState)(""),m=(0,i.Z)(v,2),h=m[0],p=m[1],x=(0,a.useState)([]),Z=(0,i.Z)(x,2),_=Z[0],g=Z[1],j=(0,a.useState)([]),k=(0,i.Z)(j,2),b=k[0],N=k[1],w=(0,a.useState)(!1),E=(0,i.Z)(w,2),S=E[0],B=E[1],y=(0,a.useRef)();(0,a.useEffect)((function(){if(""!==r){var n=document.getElementById("std-".concat(r));null===n||void 0===n||n.classList.remove("none"),null===n||void 0===n||n.classList.add("clicked")}}),[r]);var M=function(n){var t=o()(n),e="",i=t.format("MM"),a=t.format("YYYY");return+i>=2?e=a:+i<=1&&(e=String(+a-1)),e};(0,a.useEffect)((function(){var t=function(t){var e,i,a,c;return n.isSubject&&(e=null===(i=n.isSubject)||void 0===i||null===(a=i.filter((function(n){return Object.keys(n)[0]===t})))||void 0===a||null===(c=a[0])||void 0===c?void 0:c[t]),e}(M());B(t)}),[n.isSubject]),(0,a.useEffect)((function(){var t,e,i,a=M(),c=null===n||void 0===n||null===(t=n.students)||void 0===t||null===(e=t.filter((function(n){return Object.keys(n)[0]===a})))||void 0===e||null===(i=e[0])||void 0===i?void 0:i[a];N(c)}),[n.students]);return(0,a.useEffect)((function(){null===b||void 0===b||b.forEach((function(n){Object.keys(n)[0]===h&&g(Object.values(n)[0])})),""===h&&g([]),n.nowClassNameHandler(h)}),[h]),(0,a.useEffect)((function(){n.selectStudentHandler(r)}),[r]),(0,a.useEffect)((function(){p(n.clName),u("")}),[n.clName]),(0,a.useEffect)((function(){""!==n.passStudent&&u(n.passStudent)}),[n.passStudent]),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{children:S&&(0,d.jsxs)("div",{children:[(0,d.jsxs)("select",{ref:y,onChange:function(){var n=y.current.value;p(n)},className:s.Z["class-select"],value:h,children:[(0,d.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===b||void 0===b?void 0:b.map((function(n){return(0,d.jsx)("option",{value:Object.keys(n),children:Object.keys(n)},Object.keys(n))}))]}),""===(null===y||void 0===y||null===(t=y.current)||void 0===t?void 0:t.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]})}),(0,d.jsx)("div",{children:(0,d.jsx)(c.Z,{students:S?_:b,showOption:function(n){var t=n.target.innerText;if(u(r===t?"":t),""!==r){var e=document.getElementById("std-".concat(r));null===e||void 0===e||e.classList.remove("clicked"),null===e||void 0===e||e.classList.add("none")}},isSubject:n.isSubject,manageEach:!0,passStudent:n.passStudent})}),(0,d.jsx)(f,{onStudent:r,clName:h}),(0,d.jsx)("div",{})]})}},72184:function(n,t){t.Z={"class-select":"ManageEach_class-select__IlQlu","flex-d-column":"ManageEach_flex-d-column__Dh-Iq","btns-div":"ManageEach_btns-div__Zivma","padd-5":"ManageEach_padd-5__-MakG","bottom-content-ul":"ManageEach_bottom-content-ul__xXaZv","bottom-content-li":"ManageEach_bottom-content-li__S8Tge","flex-ml-10":"ManageEach_flex-ml-10__whmHW","attendEdit-div":"ManageEach_attendEdit-div__7u3SK",show:"ManageEach_show__HHbXY","fs-13":"ManageEach_fs-13__7gMai","fs-15":"ManageEach_fs-15__stlkn","fs-11":"ManageEach_fs-11__dIRN5","fs-9":"ManageEach_fs-9__jSAIp","fs-13-bold":"ManageEach_fs-13-bold__HBo6n","clicked-title":"ManageEach_clicked-title__-ZVjL","search-title":"ManageEach_search-title__wX5x6","search-btns":"ManageEach_search-btns__aYFXS","flex-wrap":"ManageEach_flex-wrap__NnIS9","margin-15":"ManageEach_margin-15__R8DcB","margin-5":"ManageEach_margin-5__IctPu","flex-center-ml-10":"ManageEach_flex-center-ml-10__fmq5p","flex-center":"ManageEach_flex-center__Ent-o","width-max400":"ManageEach_width-max400__8b-OH","attend-edit-p":"ManageEach_attend-edit-p__SvrxQ","attend-edit-d":"ManageEach_attend-edit-d__-GFUJ","attend-edit-c":"ManageEach_attend-edit-c__XExyE","a-link":"ManageEach_a-link__oahRi",excelfileUploadBtn:"ManageEach_excelfileUploadBtn__vkRXS","list-clicked":"ManageEach_list-clicked__4v6iy","span-left":"ManageEach_span-left__PWcvA","onStudent-name":"ManageEach_onStudent-name__5dz+H"}}}]);