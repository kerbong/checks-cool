"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[433],{3776:function(t,e,n){n.d(e,{Z:function(){return c}});n(7313);var a="Student_div__ROh5A",i=n(7405),s=n(6417),c=function(t){var e;return(0,s.jsx)("div",{className:a,children:t.students&&(null===(e=t.students)||void 0===e?void 0:e.map((function(e){var n;return(0,s.jsx)(i.Z,{className:t.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(n=t.passStudent)||void 0===n?void 0:n.split(" ")[1])===e.name,manageEach:t.manageEach,name:e.name,num:e.num,onShowOption:function(e){t.showOption(e),e.target+="add"}},e.num)})))})}},7405:function(t,e,n){n.d(e,{Z:function(){return s}});n(7313);var a={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm"},i=n(6417),s=function(t){return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("button",{className:"".concat(a[t.className]," ").concat(t.classAdd&&"clicked"),id:"std-".concat(t.num," ").concat(t.name),onClick:function(e){t.onShowOption(e)},children:[t.num," ",t.name]})})}},3433:function(t,e,n){n.r(e),n.d(e,{default:function(){return Z}});var a=n(4165),i=n(2982),s=n(1413),c=n(5861),l=n(885),o=n(7313),u=n(2118),r=n(7692),d=n(658),f=n.n(d),m=n(650),h=n(573),v=n(7890),x=n(2184),_={thd:"CompareListMemoTable_thd__fhlXw","name-td":"CompareListMemoTable_name-td__vWFha",table:"CompareListMemoTable_table__52E7R","bg-white":"CompareListMemoTable_bg-white__o7Or-","bg-gray":"CompareListMemoTable_bg-gray__SfWec","bg-title":"CompareListMemoTable_bg-title__aEcVP","flex-center":"CompareListMemoTable_flex-center__+zH4h"},g=n(6417),j=function(t){var e,n;return(0,g.jsxs)("div",{className:_["flex-center"],children:[(0,g.jsx)("p",{style:{color:"white"},children:"* \uc790\ub8cc\uac00 \ubcf4\uae30 \uc5b4\ub824\uc6b4 \uacbd\uc6b0 \ud654\uba74 \ud655\ub300/\ucd95\uc18c\ub97c \ud65c\uc6a9\ud574\uc8fc\uc138\uc694"}),(0,g.jsxs)("table",{className:_.table,children:[(0,g.jsx)("thead",{className:_["bg-title"],children:(0,g.jsxs)("tr",{children:[(0,g.jsx)("th",{children:"\uc774\ub984"}),null===(e=t.listMemo)||void 0===e?void 0:e.map((function(t){return(0,g.jsx)("th",{className:"".concat(_.thd),children:t.title},"title"+t.id)}))]})}),(0,g.jsxs)("tbody",{children:[null===(n=t.students)||void 0===n?void 0:n.map((function(e,n){var a;return(0,g.jsxs)("tr",{className:"".concat(_.thd," ").concat(_[n%2===0?"bg-white":"bg-gray"]),children:[(0,g.jsx)("td",{className:_["name-td"],children:e.name}),null===(a=t.listMemo)||void 0===a?void 0:a.map((function(t){var n,a,i;return(0,g.jsx)("td",{className:"".concat(_.thd),children:(null===t||void 0===t||null===(n=t.data)||void 0===n||null===(a=n.filter((function(t){return t.name===e.name})))||void 0===a||null===(i=a[0])||void 0===i?void 0:i.memo)||"-"},"memo"+t.id)}))]},"data"+e.name+n)})),(0,g.jsx)("tr",{})]})]})]})},b=n(7114),p=n.n(b),Z=function(t){var e=(0,o.useState)([]),n=(0,l.Z)(e,2),d=n[0],_=n[1],b=(0,o.useState)(!0),Z=(0,l.Z)(b,2),N=Z[0],S=Z[1],E=(0,o.useState)([]),k=(0,l.Z)(E,2),M=k[0],w=k[1],y=(0,o.useState)([]),C=(0,l.Z)(y,2),Y=C[0],B=C[1],O=(0,o.useState)([]),L=(0,l.Z)(O,2),T=L[0],F=L[1],H=(0,o.useState)([]),R=(0,l.Z)(H,2),U=R[0],W=R[1],I=(0,o.useState)([]),A=(0,l.Z)(I,2),X=A[0],G=A[1],Q=(0,o.useState)([]),D=(0,l.Z)(Q,2),J=D[0],P=D[1],V=(0,o.useState)(!1),z=(0,l.Z)(V,2),q=z[0],K=z[1],$=(0,o.useState)([]),tt=(0,l.Z)($,2),et=tt[0],nt=tt[1],at=(0,o.useState)(""),it=(0,l.Z)(at,2),st=it[0],ct=it[1],lt=(0,o.useState)(""),ot=(0,l.Z)(lt,2),ut=ot[0],rt=ot[1],dt=(0,o.useState)(""),ft=(0,l.Z)(dt,2),mt=ft[0],ht=ft[1],vt=(0,v.TH)().state,xt=(0,o.useRef)(),_t=function(){return+f()().format("MM")<=2?String(+f()().format("YYYY")-1):f()().format("YYYY")},gt=function(e){var n,a,i,s;t.isSubject&&(n=null===(a=t.isSubject)||void 0===a||null===(i=a.filter((function(t){return Object.keys(t)[0]===e})))||void 0===i||null===(s=i[0])||void 0===s?void 0:s[e]);return n}(_t()),jt=function(){var e=(0,c.Z)((0,a.Z)().mark((function e(){var n,c,l,o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w([]),n=(0,h.JU)(m.wO,"checkLists",t.userUid),e.next=4,(0,h.QT)(n);case 4:return c=e.sent,(0,h.cf)(n,(function(t){if(c.exists()){var e,n,a,i=[];null===(e=t.data())||void 0===e||null===(n=e.checkLists_data)||void 0===n||null===(a=n.filter((function(t){return t.yearGroup===_t()})))||void 0===a||a.forEach((function(t){return t.unSubmitStudents.forEach((function(e){var n=(0,s.Z)((0,s.Z)({},e),{},{id:t.id,title:t.title});gt&&(n.clName=t.clName),i.push(n)}))})),w([].concat(i))}})),B([]),F([]),l=(0,h.JU)(m.wO,"listMemo",t.userUid),e.next=11,(0,h.QT)(l);case 11:o=e.sent,(0,h.cf)(l,(function(t){if(o.exists()){var e,n,a=[],c=null===(e=t.data())||void 0===e||null===(n=e.listMemo_data)||void 0===n?void 0:n.filter((function(t){return t.yearGroup===_t()}));null===c||void 0===c||c.forEach((function(t){var e;return null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.forEach((function(e){var n=(0,s.Z)((0,s.Z)({},e),{},{id:t.id,title:t.title});gt&&(n.clName=t.clName),a.push(n)}))})),B([].concat(a)),F((0,i.Z)(c)),W((0,i.Z)(c))}}));case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){jt()}),[]),(0,o.useEffect)((function(){if(""!==st)if(gt){var t=Y.filter((function(t){return t.name===st.split(" ")[1]&&t.clName===ut}));G(t);var e=M.filter((function(t){return t.name===st.split(" ")[1]&&t.clName===ut}));nt(e)}else{var n=Y.filter((function(t){return t.name===st.split(" ")[1]}));G(n);var a=M.filter((function(t){return t.name===st.split(" ")[1]}));nt(a)}}),[st,Y]),(0,o.useEffect)((function(){var t=null===vt||void 0===vt?void 0:vt.student,e=null===vt||void 0===vt?void 0:vt.clName;""!==e&&rt(e),""!==t&&ct(t)}),[vt]);(0,o.useEffect)((function(){if(""===mt)W((0,i.Z)(T));else{var t=null===T||void 0===T?void 0:T.filter((function(t){return t.title.includes(mt)}));W((0,i.Z)(t))}}),[mt]),(0,o.useEffect)((function(){}),[q]);(0,o.useEffect)((function(){var e,n,a,i=+f()().format("MM")<=2?String(+f()().format("YYYY")-1):f()().format("YYYY"),s=null===t||void 0===t||null===(e=t.students)||void 0===e||null===(n=e.filter((function(t){return Object.keys(t)[0]===i})))||void 0===n||null===(a=n[0])||void 0===a?void 0:a[i];_(s)}),[t.students]);return(0,g.jsxs)("div",{children:[(0,g.jsx)(u.Z,{students:t.students,userUid:t.userUid,isSubject:t.isSubject,selectStudentHandler:function(t){ct(t)},clName:ut,passStudent:st,nowClassNameHandler:function(t){rt(t)}}),(0,g.jsxs)("ul",{className:x.Z["bottom-content-ul"],children:[(0,g.jsx)("div",{className:x.Z["flex-center"],style:{margin:"-10px 0 15px 0",height:"60px"},children:(0,g.jsx)(r.Z,{name:N?(0,g.jsx)("span",{children:"\uc81c\ucd9c\ubcf4\uae30"}):" \uac1c\ubcc4\uae30\ub85d \ubcf4\uae30",icon:(0,g.jsx)("i",{className:"fa-solid fa-rotate"}),onclick:function(){return S((function(t){return!t}))},className:"save-classItem-button",style:{width:"auto",backgroundColor:"#f3feff",height:"auto",padding:"10px",position:"absolute",left:"2%"}})}),N?(0,g.jsxs)(g.Fragment,{children:[""!==st&&(0,g.jsxs)("div",{className:"".concat(x.Z["flex-wrap"]),style:{width:"100%"},children:[null===X||void 0===X?void 0:X.map((function(t){return(0,g.jsxs)("li",{id:t.id+t.num,className:x.Z["bottom-content-li"],style:{minWidth:"170px",maxWidth:"400px"},children:[(0,g.jsx)("div",{className:x.Z["flex-ml-10"],children:t.id.slice(0,10)}),(0,g.jsx)("div",{className:x.Z["fs-13"],children:t.title}),(0,g.jsx)("hr",{className:x.Z["margin-15"]}),(0,g.jsx)("div",{className:x.Z["fs-13"],children:t.memo})]},t.id+t.num)})),0===(null===X||void 0===X?void 0:X.length)&&(0,g.jsx)("li",{className:x.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \uac1c\ubcc4\uae30\ub85d \uc815\ubcf4\uac00 \uc5c6\uc5b4\uc694!"})]}),""===st&&(0,g.jsx)(g.Fragment,{children:q?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("button",{onClick:function(){P([]),K(!1)},className:x.Z["search-btns"],children:"\ube44\uad50\ub2eb\uae30"}),(0,g.jsx)(j,{listMemo:J,students:d})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("h2",{className:x.Z["fs-15"],children:"\uc804\uccb4\ud559\uc0dd \uac1c\ubcc4\uae30\ub85d \ubaa8\uc544\ubcf4\uae30"}),(0,g.jsxs)("h4",{style:{color:"white"},children:["* \uac80\uc0c9 \ud6c4 \uc5ec\ub7ec \uc790\ub8cc\ub97c \uc120\ud0dd(\ud074\ub9ad)\ud558\uc2dc\uace0",(0,g.jsx)("br",{}),"\uc644\ub8cc\ub97c \ub20c\ub7ec\uc8fc\uc138\uc694.(pc\ucd94\ucc9c) ",(0,g.jsx)("br",{})]}),(0,g.jsx)("input",{type:"text",ref:xt,placeholder:"\uc81c\ubaa9 \uac80\uc0c9",onChange:function(){var t=xt.current.value;ht(t)},className:x.Z["search-title"]}),(0,g.jsx)("button",{onClick:function(){return K(!0)},className:x.Z["search-btns"],children:"\uc644\ub8cc"}),(0,g.jsx)("button",{onClick:function(){0!==(null===J||void 0===J?void 0:J.length)&&p().fire({icon:"warning",title:"\ucd08\uae30\ud654 \ud560\uae4c\uc694?",text:"\uc120\ud0dd\ud588\ub358 \ud56d\ubaa9\ub4e4\uc744 \ubaa8\ub450 \uc120\ud0dd \ucde8\uc18c\ud560\uae4c\uc694?",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",showDenyButton:!0,denyButtonText:"\ucde8\uc18c"}).then((function(t){t.isConfirmed&&P([])}))},className:x.Z["search-btns"],children:"\ucd08\uae30\ud654"}),(0,g.jsxs)("div",{className:x.Z["bottom-content-li"],children:[(0,g.jsxs)("h3",{className:x.Z["margin-15"],children:["\uc120\ud0dd\ub41c \uc790\ub8cc"," ",(null===J||void 0===J?void 0:J.length)>0&&"(".concat(null===J||void 0===J?void 0:J.length,")")]}),(0,g.jsx)("div",{className:x.Z["flex-center"],style:{flexWrap:"wrap"},children:null===J||void 0===J?void 0:J.map((function(t){return(0,g.jsx)("div",{className:x.Z["clicked-title"],children:t.title},"compare"+t.title)}))})]}),(0,g.jsx)("div",{className:"".concat(x.Z["flex-wrap"]),style:{width:"100%"},children:null===U||void 0===U?void 0:U.map((function(t){var e;return(0,g.jsxs)("li",{id:t.id,className:"".concat(x.Z["bottom-content-li"]," ").concat((null===J||void 0===J||null===(e=J.filter((function(e){return e.id===t.id})))||void 0===e?void 0:e.length)>0?x.Z["list-clicked"]:""),style:{width:"200px"},onClick:function(){!function(t){var e,n,a,s=(null===J||void 0===J||null===(e=J.filter((function(e){return e.id===t.id})))||void 0===e?void 0:e.length)>0,c=(0,i.Z)(J);s?c=null===(n=c)||void 0===n?void 0:n.filter((function(e){return e.id!==t.id})):null===(a=c)||void 0===a||a.push(t),P(c.sort((function(t,e){return t.id>e.id})))}(t)},children:[t.id,(0,g.jsx)("br",{}),(0,g.jsx)("h3",{children:t.title})]},t.id)}))})]})})]}):(0,g.jsxs)(g.Fragment,{children:[""!==st&&(0,g.jsxs)("div",{className:"".concat(x.Z["flex-wrap"]),style:{width:"100%"},children:[null===et||void 0===et?void 0:et.map((function(t){return(0,g.jsxs)("li",{id:t.id+t.num,className:x.Z["bottom-content-li"],style:{width:"300px"},children:[(0,g.jsxs)("div",{className:x.Z["flex-ml-10"],children:[t.id.slice(0,10)," | \ubbf8\uc81c\ucd9c"]}),(0,g.jsxs)("div",{className:x.Z["fs-13"],children:[t.title," "]})]},t.id+t.num)})),0===(null===et||void 0===et?void 0:et.length)&&(0,g.jsx)("li",{className:x.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \ubbf8\uc81c\ucd9c \uc815\ubcf4\uac00 \uc5c6\uc5b4\uc694!"})]}),""===st&&""]})]})]})}},2118:function(t,e,n){n.d(e,{Z:function(){return m}});var a=n(885),i=n(7313),s=n(3776),c=n(658),l=n.n(c),o=n(2184),u=n(7692),r=n(7890),d=n(6417),f=function(t){var e=(0,i.useState)(""),n=(0,a.Z)(e,2),s=n[0],c=n[1],l=(0,i.useState)(""),f=(0,a.Z)(l,2),m=f[0],h=f[1],v=(0,i.useState)(""),x=(0,a.Z)(v,2),_=x[0],g=x[1],j=(0,r.s0)();return(0,i.useEffect)((function(){var t=window.location.href.split("/");c(t[t.length-1])}),[window.location.href]),(0,i.useEffect)((function(){""!==t.onStudent&&h(t.onStudent)}),[t.onStudent]),(0,i.useEffect)((function(){""!==t.clName&&g(t.clName)}),[t.clName]),(0,d.jsxs)("div",{className:o.Z["btns-div"],children:[(0,d.jsx)(u.Z,{name:"\uc815\ubcf4",className:"manageStudent"!==s?"manageBtn":"manageBtn-clicked",onclick:function(){return j("/manageStudent",{state:{student:m,clName:_||""}})}}),(0,d.jsx)(u.Z,{name:"\ucd9c\uacb0",className:"manageAttendance"!==s?"manageBtn":"manageBtn-clicked",onclick:function(){return j("/manageAttendance",{state:{student:m,clName:_||""}})}}),(0,d.jsx)(u.Z,{name:"\uc0c1\ub2f4",className:"manageConsult"!==s?"manageBtn":"manageBtn-clicked",onclick:function(){return j("/manageConsult",{state:{student:m,clName:_||""}})}}),(0,d.jsx)(u.Z,{name:"\uc81c\ucd9c/\uac1c\ubcc4",className:"manageCheckListMemo"!==s?"manageBtn":"manageBtn-clicked",onclick:function(){return j("/manageCheckListMemo",{state:{student:m,clName:_||""}})}})]})},m=function(t){var e,n=(0,i.useState)(""),c=(0,a.Z)(n,2),u=c[0],r=c[1],m=(0,i.useState)(""),h=(0,a.Z)(m,2),v=h[0],x=h[1],_=(0,i.useState)([]),g=(0,a.Z)(_,2),j=g[0],b=g[1],p=(0,i.useState)([]),Z=(0,a.Z)(p,2),N=Z[0],S=Z[1],E=(0,i.useState)(!1),k=(0,a.Z)(E,2),M=k[0],w=k[1],y=(0,i.useRef)();(0,i.useEffect)((function(){if(""!==u){var t=document.getElementById("std-".concat(u));null===t||void 0===t||t.classList.remove("none"),null===t||void 0===t||t.classList.add("clicked")}}),[u]);var C=function(t){var e=l()(t),n="",a=e.format("MM"),i=e.format("YYYY");return+a>=2?n=i:+a<=1&&(n=String(+i-1)),n};(0,i.useEffect)((function(){var e=function(e){var n,a,i,s;return t.isSubject&&(n=null===(a=t.isSubject)||void 0===a||null===(i=a.filter((function(t){return Object.keys(t)[0]===e})))||void 0===i||null===(s=i[0])||void 0===s?void 0:s[e]),n}(C());w(e)}),[t.isSubject]),(0,i.useEffect)((function(){var e,n,a,i=C(),s=null===t||void 0===t||null===(e=t.students)||void 0===e||null===(n=e.filter((function(t){return Object.keys(t)[0]===i})))||void 0===n||null===(a=n[0])||void 0===a?void 0:a[i];S(s)}),[t.students]);return(0,i.useEffect)((function(){null===N||void 0===N||N.forEach((function(t){Object.keys(t)[0]===v&&b(Object.values(t)[0])})),""===v&&b([]),t.nowClassNameHandler(v)}),[v]),(0,i.useEffect)((function(){t.selectStudentHandler(u)}),[u]),(0,i.useEffect)((function(){x(t.clName),r("")}),[t.clName]),(0,i.useEffect)((function(){""!==t.passStudent&&r(t.passStudent)}),[t.passStudent]),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{children:M&&(0,d.jsxs)("div",{children:[(0,d.jsxs)("select",{ref:y,onChange:function(){var t=y.current.value;x(t)},className:o.Z["class-select"],value:v,children:[(0,d.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===N||void 0===N?void 0:N.map((function(t){return(0,d.jsx)("option",{value:Object.keys(t),children:Object.keys(t)},Object.keys(t))}))]}),""===(null===y||void 0===y||null===(e=y.current)||void 0===e?void 0:e.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]})}),(0,d.jsx)("div",{children:(0,d.jsx)(s.Z,{students:M?j:N,showOption:function(t){var e=t.target.innerText;if(r(u===e?"":e),""!==u){var n=document.getElementById("std-".concat(u));null===n||void 0===n||n.classList.remove("clicked"),null===n||void 0===n||n.classList.add("none")}},isSubject:t.isSubject,manageEach:!0,passStudent:t.passStudent})}),(0,d.jsx)(f,{onStudent:u,clName:v}),(0,d.jsx)("div",{})]})}},2184:function(t,e){e.Z={"class-select":"ManageEach_class-select__IlQlu","btns-div":"ManageEach_btns-div__Zivma","padd-5":"ManageEach_padd-5__-MakG","bottom-content-ul":"ManageEach_bottom-content-ul__xXaZv","bottom-content-li":"ManageEach_bottom-content-li__S8Tge","flex-ml-10":"ManageEach_flex-ml-10__whmHW","fs-13":"ManageEach_fs-13__7gMai","fs-15":"ManageEach_fs-15__stlkn","fs-11":"ManageEach_fs-11__dIRN5","clicked-title":"ManageEach_clicked-title__-ZVjL","search-title":"ManageEach_search-title__wX5x6","search-btns":"ManageEach_search-btns__aYFXS","flex-wrap":"ManageEach_flex-wrap__NnIS9","margin-15":"ManageEach_margin-15__R8DcB","margin-5":"ManageEach_margin-5__IctPu","flex-center":"ManageEach_flex-center__Ent-o","width-max400":"ManageEach_width-max400__8b-OH","a-link":"ManageEach_a-link__oahRi",excelfileUploadBtn:"ManageEach_excelfileUploadBtn__vkRXS","list-clicked":"ManageEach_list-clicked__4v6iy"}}}]);