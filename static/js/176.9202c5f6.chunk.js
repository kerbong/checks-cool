"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[176],{3776:function(n,t,e){e.d(t,{Z:function(){return c}});e(7313);var i="Student_div__ROh5A",a=e(7405),o=e(6417),c=function(n){var t;return(0,o.jsx)("div",{className:i,children:n.students&&(null===(t=n.students)||void 0===t?void 0:t.map((function(t){var e;return(0,o.jsx)(a.Z,{className:n.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(e=n.passStudent)||void 0===e?void 0:e.split(" ")[1])===t.name,manageEach:n.manageEach,name:t.name,num:t.num,woman:t.woman,onShowOption:function(t){n.showOption(t),t.target+="add"}},t.num)})))})}},7405:function(n,t,e){e.d(t,{Z:function(){return o}});e(7313);var i={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"},a=e(6417),o=function(n){return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("button",{className:"".concat(i[n.className]," ").concat(n.classAdd&&"clicked"," ").concat(!n.woman&&i.woman),id:"std-".concat(n.num," ").concat(n.name),onClick:function(t){n.onShowOption(t)},title:null===n||void 0===n?void 0:n.title,children:[n.num," ",n.name]},"stdBtn-".concat(n.num," ").concat(n.name))})}},3176:function(n,t,e){e.r(t);var i=e(7762),a=e(4165),o=e(2982),c=e(1413),l=e(5861),r=e(885),s=e(7313),u=e(2118),d=e(658),v=e.n(d),f=e(650),p=e(573),m=e(7890),h=e(2184),x=e(7692),Z=e(8737),g=e(7114),b=e.n(g),j=e(6797),k=e(6417);t.default=function(n){var t,e,d,g,_,w,N,S,E,y=(0,s.useState)(""),B=(0,r.Z)(y,2),M=B[0],C=B[1],H=(0,s.useState)(""),q=(0,r.Z)(H,2),Y=q[0],O=q[1],F=(0,s.useState)([]),U=(0,r.Z)(F,2),P=U[0],R=U[1],D=(0,s.useState)([]),L=(0,r.Z)(D,2),I=L[0],T=L[1],W=(0,s.useState)([]),A=(0,r.Z)(W,2),J=A[0],X=A[1],z=(0,s.useState)([]),Q=(0,r.Z)(z,2),G=Q[0],K=Q[1],V=(0,s.useState)(""),$=(0,r.Z)(V,2),nn=$[0],tn=$[1],en=(0,s.useState)(""),an=(0,r.Z)(en,2),on=an[0],cn=an[1],ln=(0,s.useState)(null),rn=(0,r.Z)(ln,2),sn=rn[0],un=rn[1],dn=(0,s.useState)(!1),vn=(0,r.Z)(dn,2),fn=vn[0],pn=vn[1],mn=(0,s.useState)([]),hn=(0,r.Z)(mn,2),xn=hn[0],Zn=hn[1],gn=(0,s.useState)({}),bn=(0,r.Z)(gn,2),jn=bn[0],kn=bn[1],_n=(0,s.useState)(null),wn=(0,r.Z)(_n,2),Nn=wn[0],Sn=wn[1],En=(0,m.TH)().state,yn=function(n){var t=(null===n||void 0===n?void 0:n.length)>0?n:new Date;return v()(t).format("MM-DD")<="02-15"?String(+v()(t).format("YYYY")-1):v()(t).format("YYYY")},Bn=function(t){var e,i,a,o;n.isSubject&&(e=null===(i=n.isSubject)||void 0===i||null===(a=i.filter((function(n){return Object.keys(n)[0]===t})))||void 0===a||null===(o=a[0])||void 0===o?void 0:o[t]);return e}(yn()),Mn=function(){var t=(0,l.Z)((0,a.Z)().mark((function t(){var e,i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return R([]),e=(0,p.JU)(f.wO,"attend",n.userUid),t.next=4,(0,p.QT)(e);case 4:i=t.sent,(0,p.cf)(e,(function(n){if(i.exists()){var t,e,a,l=[];null===(t=n.data())||void 0===t||null===(e=t.attend_data)||void 0===e||e.forEach((function(n){var t,e;n.id?l.push(n):null===(t=Object.values(n))||void 0===t||null===(e=t[0])||void 0===e||e.forEach((function(t){var e;l.push((0,c.Z)((0,c.Z)({},t),{},{clName:null===(e=Object.keys(n))||void 0===e?void 0:e[0]}))}))})),l=null===(a=l)||void 0===a?void 0:a.filter((function(n){return yn(n.id.slice(0,10))===yn()})),R((0,o.Z)(l.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1}))))}}));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();(0,s.useEffect)((function(){Mn()}),[]),(0,s.useEffect)((function(){Zn([]);var n,t,e,i=[];(tn(""),""!==M)?i=Bn?(null===P||void 0===P||null===(n=P.filter((function(n){var t;return n.name===(null===M||void 0===M||null===(t=M.split(" "))||void 0===t?void 0:t[1])&&n.clName===Y})))||void 0===n?void 0:n.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})))||[]:(null===P||void 0===P||null===(t=P.filter((function(n){var t;return n.name===(null===M||void 0===M||null===(t=M.split(" "))||void 0===t?void 0:t[1])})))||void 0===t?void 0:t.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})))||[]:i=Bn?(null===P||void 0===P||null===(e=P.filter((function(n){return n.clName===Y})))||void 0===e?void 0:e.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})))||[]:(0,o.Z)(P).sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1}));T(i),X(i),function(n){var t=null===n||void 0===n?void 0:n.map((function(n){return n.option.slice(1)}));K(t)}(i)}),[M,P,Y]),(0,s.useEffect)((function(){cn(""),tn("")}),[Y]),(0,s.useEffect)((function(){var n=null===En||void 0===En?void 0:En.student,t=null===En||void 0===En?void 0:En.clName;""!==n&&n&&C(n),""!==t&&O(t)}),[En]);function Cn(n){return n.sort((function(n,t){return n.name<t.name?-1:n.name>t.name?1:0}))}(0,s.useEffect)((function(){if(cn(""),un(null),""===nn)X(I);else{var n=null===I||void 0===I?void 0:I.filter((function(n){return n.option.slice(1)===nn}));X(n)}}),[nn]),(0,s.useEffect)((function(){if(un(null),tn(""),""===on)X(I);else{var n=null===I||void 0===I?void 0:I.filter((function(n){return+n.id.slice(5,7)===on}));X(n)}}),[on]);var Hn=function(n,t){return null===n||void 0===n?void 0:n.filter((function(n){if("one"===t&&sn!==n.name)return!1;if("cl"===t&&(null===n||void 0===n?void 0:n.clName)!==Y)return!1;var e=!1;return void 0!==(null===n||void 0===n?void 0:n.paper)?null!==n&&void 0!==n&&n.paper||(e=!0):null!==n&&void 0!==n&&n.request&&null!==n&&void 0!==n&&n.report||(e=!0),e}))};(0,s.useEffect)((function(){var n;null!==sn&&(cn(""),tn(""),n=""!==sn?Hn(I,"one"):Hn(I),X(Cn(n)))}),[sn]);var qn=function(){var t=(0,l.Z)((0,a.Z)().mark((function t(e){var i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=(0,p.JU)(f.wO,"attend",n.userUid),t.next=3,(0,p.pl)(i,e);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}();(0,s.useEffect)((function(){var n;Zn([]),0!==(null===(n=Object.keys(jn))||void 0===n?void 0:n.length)&&qn(jn)}),[jn]);var Yn=function(){var t=(0,l.Z)((0,a.Z)().mark((function t(e){var i,c,r,s,u;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("all"===e||0!==(null===xn||void 0===xn?void 0:xn.length)){t.next=2;break}return t.abrupt("return");case 2:if(0!==(null===I||void 0===I?void 0:I.length)){t.next=4;break}return t.abrupt("return");case 4:i=(0,o.Z)(xn),c=(0,o.Z)(P),r=function(){var t=(0,l.Z)((0,a.Z)().mark((function t(e){var o;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:"all"===e?(c=[],null===P||void 0===P||P.forEach((function(n){var t;n.name!==(null===M||void 0===M||null===(t=M.split(" "))||void 0===t?void 0:t[1])?c.push(n):i.push(n.id)}))):c=null===(o=c)||void 0===o?void 0:o.filter((function(n){return!xn.includes(n.id)}));try{null===i||void 0===i||i.forEach((function(t){var e="".concat(n.userUid,"/attend/").concat(t),i=(0,j.iH)(f.Hw,e);(0,j.aF)(i).then((function(n){n.items.forEach(function(){var n=(0,l.Z)((0,a.Z)().mark((function n(t){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,j.oq)((0,j.iH)(f.Hw,t._location.path));case 2:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}))}))}catch(r){console.log(r)}kn({attend_data:c});case 4:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),"all"===e?b().fire({icon:"warning",title:"\uc804\uccb4 \uc0ad\uc81c\ud560\uae4c\uc694?",text:"".concat(null===M||void 0===M||null===(s=M.split(" "))||void 0===s?void 0:s[1]," \ud559\uc0dd\uc758 \ucd9c\uacb0 \uae30\ub85d\uc744 \ubaa8\ub450 \uc0ad\uc81c\ud560\uae4c\uc694? \uc0ad\uc81c \ud6c4\uc5d0\ub294 \uae30\ub85d\uc744 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc2e0\uc911\ud788 \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"),confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then(function(){var n=(0,l.Z)((0,a.Z)().mark((function n(t){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.isConfirmed){n.next=6;break}return pn(!1),n.next=4,r("all");case 4:n.next=7;break;case 6:return n.abrupt("return");case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()):b().fire({icon:"warning",title:"\uc120\ud0dd \uc0ad\uc81c\ud560\uae4c\uc694?",text:"".concat(null===M||void 0===M||null===(u=M.split(" "))||void 0===u?void 0:u[1]," \ud559\uc0dd\uc758 \uc120\ud0dd\ub41c \ucd9c\uacb0 \uae30\ub85d\uc744 \uc0ad\uc81c\ud560\uae4c\uc694? \uc0ad\uc81c \ud6c4\uc5d0\ub294 \uae30\ub85d\uc744 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc2e0\uc911\ud788 \uc120\ud0dd\ud574\uc8fc\uc138\uc694!"),confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then(function(){var n=(0,l.Z)((0,a.Z)().mark((function n(t){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.isConfirmed){n.next=6;break}return pn(!1),n.next=4,r("checked");case 4:n.next=7;break;case 6:return n.abrupt("return");case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}());case 8:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),On=function(){var t=(0,l.Z)((0,a.Z)().mark((function t(e){var i,c;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:"delete"!==e?(c=(0,o.Z)(P),c=null===(i=c)||void 0===i?void 0:i.map((function(n){var t=n;return n.id===Nn.id&&(t[e]=!(null!==t&&void 0!==t&&t[e])),t})),kn({attend_data:c})):"delete"===e&&b().fire({title:"\uc790\ub8cc \uc0ad\uc81c \ud655\uc778",text:"\ucd9c\uacb0 \uc790\ub8cc\ub97c \uc815\ub9d0 \uc0ad\uc81c\ud560\uae4c\uc694? \uc0ad\uc81c\ud55c \uc790\ub8cc\ub294 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.",icon:"warning",confirmButtonText:"\uc0ad\uc81c",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then((function(t){if(t.isConfirmed){var e;Sn(null);var i=(0,o.Z)(P);i=null===(e=i)||void 0===e?void 0:e.filter((function(n){return n.id!==Nn.id}));try{var c="".concat(n.userUid,"/attend/").concat(Nn.id),r=(0,j.iH)(f.Hw,c);(0,j.aF)(r).then((function(n){n.items.forEach(function(){var n=(0,l.Z)((0,a.Z)().mark((function n(t){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,j.oq)((0,j.iH)(f.Hw,t._location.path));case 2:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}))}catch(s){console.log(s)}kn({attend_data:i})}}));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}();function Fn(n,t){fetch(n).then((function(n){return n.blob()})).then((function(n){var e=window.URL.createObjectURL(n),i=document.createElement("a");i.href=e,i.download=t,i.click(),window.URL.revokeObjectURL(e)})).catch((function(n){}))}var Un=function(){b().fire("\ub2e4\uc6b4\ub85c\ub4dc\uc911...","\ubaa8\ub4e0 \ud30c\uc77c\uc744 \ub2e4\uc6b4\ubc1b\uace0 \uc788\uc2b5\ub2c8\ub2e4. \ud574\ub2f9 \ud30c\uc77c\uc774 \ub2e4\uc6b4\ub85c\ub4dc \ub418\ub294 \ud3f4\ub354\ub294 \uae30\uae30/\ube0c\ub77c\uc6b0\uc800 \uc124\uc815\ub9c8\ub2e4 \ub2e4\ub97c \uc218 \uc788\uc73c\ub2c8 \ud655\uc778\ud574\uc8fc\uc138\uc694! \ubb38\uc81c\uac00 \uc9c0\uc18d\ub420 \uacbd\uc6b0 kerbong@gmail.com\uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!","info")},Pn=function(){b().fire("\uc11c\ub958 \uc5c6\uc74c","\uc800\uc7a5\ub41c \uc11c\ub958\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc544\uc694! \ub85c\uadf8\uc778 \ud558\uc2e0 \uacc4\uc815\uc744 \ud655\uc778\ud574\uc8fc\uc2dc\uace0, \ud30c\uc77c\uc744 \uc5c5\ub85c\ub4dc \ud55c \uac83\uc774 \ub9de\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694. \ubb38\uc81c\uac00 \uc9c0\uc18d\ub420 \uacbd\uc6b0 kerbong@gmail.com\uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!","warning")},Rn=function(){b().fire("\uc11c\ub958 \uc5c6\uc74c","\ud574\ub2f9 \ub0a0\uc9dc\uc5d0 \uc800\uc7a5\ub41c \uc11c\ub958\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc544\uc694! \ud639\uc2dc \uc5ec\ub7ec \ub0a0\uc9dc\uc758 \ucd9c\uacb0\uc815\ubcf4(\uae30\uac04\uc73c\ub85c \uc785\ub825\ub41c) \uc778 \uacbd\uc6b0, \ud574\ub2f9 \ucd9c\uacb0\uc758 \uac00\uc7a5 \ucc98\uc74c \ub0a0\uc9dc\uc5d0 \ub370\uc774\ud130\uac00 \uc800\uc7a5\ub429\ub2c8\ub2e4. \ubb38\uc81c\uac00 \uc9c0\uc18d\ub420 \uacbd\uc6b0 kerbong@gmail.com\uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694!","warning")},Dn=function(){var t=(0,l.Z)((0,a.Z)().mark((function t(e,o){var c,r,s;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{"all"===o?(c=(0,j.iH)(f.Hw,"".concat(n.userUid,"/attend/")),(0,j.aF)(c).then(function(){var t=(0,l.Z)((0,a.Z)().mark((function t(e){var o,c,r;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==(null===(o=e.prefixes)||void 0===o?void 0:o.length)){t.next=3;break}return Pn(),t.abrupt("return");case 3:null===(c=e.prefixes)||void 0===c||c.forEach((function(t){r=(0,j.iH)(f.Hw,"".concat(n.userUid,"/attend/").concat(t.name)),(0,j.aF)(r).then(function(){var n=(0,l.Z)((0,a.Z)().mark((function n(t){var e,o,c,l,r,s,u,d,v,p,m;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(0!==(null===(e=t.items)||void 0===e?void 0:e.length)){n.next=3;break}return Rn(),n.abrupt("return");case 3:Un(),o=(0,i.Z)(t.items),n.prev=5,o.s();case 7:if((c=o.n()).done){n.next=15;break}return l=c.value,n.next=11,(0,j.Jt)((0,j.iH)(f.Hw,l._location.path));case 11:(r=n.sent)&&(v=null===l||void 0===l||null===(s=l.fullPath)||void 0===s||null===(u=s.split("attend/"))||void 0===u?void 0:u[1],p=null===v||void 0===v?void 0:v.slice(0,10),m=null===v||void 0===v||null===(d=v.split("/"))||void 0===d?void 0:d[1],Fn(r,p+" "+m));case 13:n.next=7;break;case 15:n.next=20;break;case 17:n.prev=17,n.t0=n.catch(5),o.e(n.t0);case 20:return n.prev=20,o.f(),n.finish(20);case 23:case"end":return n.stop()}}),n,null,[[5,17,20,23]])})));return function(t){return n.apply(this,arguments)}}()).catch((function(n){console.log(n)}))}));case 4:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()).catch((function(n){console.log(n)}))):(s=+(null===o||void 0===o||null===(r=o.split(" "))||void 0===r?void 0:r[0]),isNaN(+s)?(c=(0,j.iH)(f.Hw,"".concat(n.userUid,"/attend/").concat(e.id)),(0,j.aF)(c).then(function(){var n=(0,l.Z)((0,a.Z)().mark((function n(t){var e,o,c,l,r,s,u,d,v,p,m;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(0!==(null===(e=t.items)||void 0===e?void 0:e.length)){n.next=3;break}return Rn(),n.abrupt("return");case 3:Un(),o=(0,i.Z)(t.items),n.prev=5,o.s();case 7:if((c=o.n()).done){n.next=15;break}return l=c.value,n.next=11,(0,j.Jt)((0,j.iH)(f.Hw,l._location.path));case 11:(r=n.sent)&&(v=null===l||void 0===l||null===(s=l.fullPath)||void 0===s||null===(u=s.split("attend/"))||void 0===u?void 0:u[1],p=null===v||void 0===v?void 0:v.slice(0,10),m=null===v||void 0===v||null===(d=v.split("/"))||void 0===d?void 0:d[1],Fn(r,p+" "+m));case 13:n.next=7;break;case 15:n.next=20;break;case 17:n.prev=17,n.t0=n.catch(5),o.e(n.t0);case 20:return n.prev=20,o.f(),n.finish(20);case 23:case"end":return n.stop()}}),n,null,[[5,17,20,23]])})));return function(t){return n.apply(this,arguments)}}()).catch((function(n){console.log(n)}))):(c=(0,j.iH)(f.Hw,"".concat(n.userUid,"/attend/")),(0,j.aF)(c).then(function(){var t=(0,l.Z)((0,a.Z)().mark((function t(e){var o,c,r,u;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==(null===(o=e.prefixes)||void 0===o?void 0:o.length)){t.next=3;break}return Pn(),t.abrupt("return");case 3:u=0,null===(c=e.prefixes)||void 0===c||c.forEach((function(t){var e,o,c;+(null===(e=t.name)||void 0===e||null===(o=e.split(" "))||void 0===o||null===(c=o[0])||void 0===c?void 0:c.slice(10))===+s&&(r=(0,j.iH)(f.Hw,"".concat(n.userUid,"/attend/").concat(t.name)),(0,j.aF)(r).then(function(){var n=(0,l.Z)((0,a.Z)().mark((function n(t){var e,o,c,l,r,s,d,v,p,m,h;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(0!==(null===(e=t.items)||void 0===e?void 0:e.length)){n.next=3;break}return Rn(),n.abrupt("return");case 3:Un(),o=(0,i.Z)(t.items),n.prev=5,o.s();case 7:if((c=o.n()).done){n.next=15;break}return l=c.value,n.next=11,(0,j.Jt)((0,j.iH)(f.Hw,l._location.path));case 11:(r=n.sent)&&(p=null===l||void 0===l||null===(s=l.fullPath)||void 0===s||null===(d=s.split("attend/"))||void 0===d?void 0:d[1],m=null===p||void 0===p?void 0:p.slice(0,10),h=null===p||void 0===p||null===(v=p.split("/"))||void 0===v?void 0:v[1],Fn(r,m+" "+h),u+=1);case 13:n.next=7;break;case 15:n.next=20;break;case 17:n.prev=17,n.t0=n.catch(5),o.e(n.t0);case 20:return n.prev=20,o.f(),n.finish(20);case 23:case"end":return n.stop()}}),n,null,[[5,17,20,23]])})));return function(t){return n.apply(this,arguments)}}()).catch((function(n){console.log(n)})))})),0===u&&Pn();case 6:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()).catch((function(n){console.log(n)}))))}catch(u){Pn()}case 1:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}();return(0,k.jsxs)("div",{children:[(0,k.jsx)(u.Z,{students:n.students,userUid:n.userUid,isSubject:n.isSubject,selectStudentHandler:function(n){C(n)},clName:Y,passStudent:M,nowClassNameHandler:function(n){O(n)}}),(0,k.jsxs)("ul",{className:"".concat(h.Z["bottom-content-ul"]," ").concat(h.Z["flex-wrap"]),children:[M&&(0,k.jsxs)("div",{children:[(0,k.jsxs)("div",{className:h.Z["flex-wrap"],children:[(0,k.jsxs)("li",{className:h.Z["bottom-content-li"],style:{minWidth:"200px"},children:[(0,k.jsx)("div",{className:h.Z["fs-22-bold"],style:0!==(null===I||void 0===I?void 0:I.length)?{margin:"15px"}:{},children:M}),0!==(null===I||void 0===I?void 0:I.length)&&(0,k.jsx)(k.Fragment,{children:(0,k.jsxs)("button",{className:h.Z["search-btns"],onClick:function(){return Dn(void 0,M)},title:'"'.concat(M,'" \uc73c\ub85c \uc5c5\ub85c\ub4dc \ub41c \ubaa8\ub4e0 \uc11c\ub958\ub97c \ub2e4\uc6b4\ud569\ub2c8\ub2e4.'),style:{marginLeft:"15px",fontSize:"0.7rem"},children:[(0,k.jsx)("i",{className:"fa-solid fa-download"}),"\uc11c\ub958"]})}),(0,k.jsx)("hr",{className:h.Z["margin-15"]}),0===(null===I||void 0===I?void 0:I.length)?(0,k.jsx)("div",{className:"".concat(h.Z["fs-13"]," ").concat(h.Z["margin-15"]),children:"\uac1c\uadfc\uc785\ub2c8\ub2e4!"}):(0,k.jsxs)("div",{children:[(0,k.jsx)(x.Z,{id:"whole",className:""===nn?"sortBtn-clicked":"sortBtn",name:"\uc804\uccb4(".concat(null===G||void 0===G?void 0:G.length,")"),onclick:function(){tn("")}},"whole"),null===(t=(0,o.Z)(new Set(G)))||void 0===t?void 0:t.map((function(n){return(0,k.jsx)(x.Z,{id:n,className:nn===n?"sortBtn-clicked":"sortBtn",name:"".concat(n," (").concat(null===G||void 0===G?void 0:G.filter((function(t){return t===n})).length,")"),onclick:function(){tn(n)}},n)}))]})]}),(null===I||void 0===I?void 0:I.length)>0&&!Bn&&(0,k.jsx)("li",{className:h.Z["bottom-content-li"],style:{minWidth:"100px"},children:(0,k.jsxs)("div",{className:h.Z["flex-d-column"],children:[(0,k.jsx)(x.Z,{id:"attend-delete",className:"sortBtn",name:fn?"\ud655\uc778":"\uc804\uccb4\uc0ad\uc81c",style:{backgroundColor:fn?"#ff5a70":"#da9a9a"},onclick:function(){Yn(fn?"checked":"all")}}),(0,k.jsx)(x.Z,{id:"attend-delete",className:"sortBtn",name:fn?"\ucde8\uc18c":"\uc120\ud0dd\uc0ad\uc81c",style:{backgroundColor:fn?"gray":"#da9a9a"},onclick:function(){fn?(Zn([]),pn(!1)):pn(!0)}})]})})]}),fn&&(0,k.jsx)("p",{style:{color:"white"},children:"* \uc0ad\uc81c\ud560 \ucd9c\uacb0\uc790\ub8cc\ub97c \uc120\ud0dd\ud558\uc2dc\uace0 \ud655\uc778\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694."}),(0,k.jsx)("div",{className:h.Z["btns-div"],style:{flexWrap:"wrap"},children:null===J||void 0===J?void 0:J.map((function(n){var t;return(0,k.jsxs)("li",{id:n.id,className:"".concat(h.Z["bottom-content-li"]," ").concat((null===xn||void 0===xn||null===(t=xn.filter((function(t){return t===n.id})))||void 0===t?void 0:t.length)>0?h.Z["list-clicked"]:""),onClick:function(){fn?function(n){var t,e,i,a=(null===xn||void 0===xn||null===(t=xn.filter((function(t){return t===n.id})))||void 0===t?void 0:t.length)>0,c=(0,o.Z)(xn);a?c=null===(e=c)||void 0===e?void 0:e.filter((function(t){return t!==n.id})):null===(i=c)||void 0===i||i.push(n.id),Zn(c)}(n):Sn(Nn?null:n)},style:{width:"260px",padding:"25px"},children:[(0,k.jsxs)("div",{className:h.Z["flex-ml-10"],children:[n.id.slice(0,10),void 0!==(null===n||void 0===n?void 0:n.paper)&&(0,k.jsx)("i",{className:"fa-solid fa-circle-check fa-xl",style:n.paper?{color:"#ff5a71",margin:"0 10px",cursor:"help"}:{color:"#cacaca",margin:"0 10px"},title:"\uc5c5\ub85c\ub4dc \ub41c \uc11c\ub958 \ub2e4\uc6b4\ubc1b\uae30",onClick:function(t){t.stopPropagation(),null!==n&&void 0!==n&&n.paper&&Dn(n,"\uc11c\ub958")}}),void 0!==(null===n||void 0===n?void 0:n.request)&&(0,k.jsx)(x.Z,{className:null!==n&&void 0!==n&&n.request?"reqRepSub-btn-s-clicked":"reqRepSub-btn-s",name:"\uc2e0",title:"\uc5c5\ub85c\ub4dc \ub41c \uc11c\ub958 \ub2e4\uc6b4\ubc1b\uae30",onclick:function(t){t.stopPropagation(),null!==n&&void 0!==n&&n.request&&Dn(n,"\uc2e0\uccad\uc11c")}}),void 0!==(null===n||void 0===n?void 0:n.report)&&(0,k.jsx)(x.Z,{className:null!==n&&void 0!==n&&n.report?"reqRepSub-btn-s-clicked":"reqRepSub-btn-s",name:"\ubcf4",title:"\uc5c5\ub85c\ub4dc \ub41c \uc11c\ub958 \ub2e4\uc6b4\ubc1b\uae30",onclick:function(t){t.stopPropagation(),null!==n&&void 0!==n&&n.report&&Dn(n,"\ubcf4\uace0\uc11c")}})]}),(0,k.jsxs)("div",{className:h.Z["fs-13"],children:[n.option.slice(1)," * ",n.note||""]}),(0,k.jsxs)("div",{className:"".concat(h.Z["attendEdit-div"]," ").concat((null===Nn||void 0===Nn?void 0:Nn.id)===n.id?h.Z.show:""),children:[void 0!==(null===n||void 0===n?void 0:n.paper)&&(0,k.jsx)("button",{className:h.Z["attend-edit-p"],onClick:function(){On("paper")},children:"\uc11c\ub958"}),void 0!==(null===n||void 0===n?void 0:n.request)&&(0,k.jsx)("button",{className:h.Z["attend-edit-p"],onClick:function(){On("request")},children:"\uc2e0\uccad\uc11c"}),void 0!==(null===n||void 0===n?void 0:n.report)&&(0,k.jsx)("button",{className:h.Z["attend-edit-p"],onClick:function(){On("report")},children:"\ubcf4\uace0\uc11c"}),(0,k.jsx)("button",{className:h.Z["attend-edit-d"],onClick:function(n){n.stopPropagation(),On("delete")},children:"\uc0ad\uc81c"}),(0,k.jsx)("button",{className:h.Z["attend-edit-c"],children:"\ucde8\uc18c"})]})]},"".concat(n.id).concat(Y||""))}))}),0===(null===I||void 0===I?void 0:I.length)&&(0,k.jsx)("li",{className:h.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \ucd9c\uacb0\uae30\ub85d\uc774 \uc5c6\uc5b4\uc694!"})]}),""===M&&(0,k.jsxs)("div",{children:[(0,k.jsxs)("div",{className:h.Z["flex-wrap"],style:{alignItems:"center"},children:[(0,k.jsxs)("li",{className:h.Z["bottom-content-li"],style:{minWidth:"350px"},children:[(0,k.jsxs)("div",{className:h.Z["flex-center-ml-10"],children:[(0,k.jsx)("span",{className:h.Z["fs-13-bold"],children:Y?"\ucd9c\uacb0 \uc694\uc57d (".concat(Y,")"):"\uc6b0\ub9ac\ubc18 \ucd9c\uacb0 \uc694\uc57d"}),"\xa0\xa0",(0,k.jsxs)("button",{className:h.Z["search-btns"],onClick:function(){function n(n){return n.replace(/^0+/,"")}var t=function(t,e){var i=[],a="paper"!==e?null===t||void 0===t?void 0:t.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1})):Cn(Hn(null===t||void 0===t?void 0:t.sort((function(n,t){return n.id.slice(0,10)>t.id.slice(0,10)?1:-1}))));return null===a||void 0===a||a.forEach((function(t){var e=[+t.num,t.name,"".concat(n(t.id.slice(5,7)),"\uc6d4"),"".concat(n(t.id.slice(8,10)),"\uc77c"),void 0===(null===t||void 0===t?void 0:t.paper)?"-":null!==t&&void 0!==t&&t.paper?"\uc81c\ucd9c":"\ubbf8\uc81c\ucd9c",void 0===(null===t||void 0===t?void 0:t.request)?"-":null!==t&&void 0!==t&&t.request?"\uc81c\ucd9c":"\ubbf8\uc81c\ucd9c",void 0===(null===t||void 0===t?void 0:t.report)?"-":null!==t&&void 0!==t&&t.report?"\uc81c\ucd9c":"\ubbf8\uc81c\ucd9c",t.option.slice(1),t.note];Bn&&e.unshift(t.clName),i.push(e)})),Bn?i.unshift(["\ubc18","\ubc88\ud638","\uc774\ub984","\ub0a0\uc9dc(\uc6d4)","\ub0a0\uc9dc(\uc77c)","\uc11c\ub958\uc81c\ucd9c","\uc2e0\uccad\uc11c\uc81c\ucd9c","\ubcf4\uace0\uc11c\uc81c\ucd9c","\ucd9c\uacb0\uc635\uc158","\ube44\uace0"]):i.unshift(["\ubc88\ud638","\uc774\ub984","\ub0a0\uc9dc(\uc6d4)","\ub0a0\uc9dc(\uc77c)","\uc11c\ub958\uc81c\ucd9c","\uc2e0\uccad\uc11c\uc81c\ucd9c","\ubcf4\uace0\uc11c\uc81c\ucd9c","\ucd9c\uacb0\uc635\uc158","\ube44\uace0"]),i},e=t(P),i=Z.P6.book_new(),a=Z.P6.aoa_to_sheet(e);a["!cols"]=[{wpx:30},{wpx:60},{wpx:50},{wpx:50},{wpx:60},{wpx:60},{wpx:60},{wpx:60},{wpx:100}],Bn&&a["!cols"].unshift({wpx:30}),Z.P6.book_append_sheet(i,a,"\ucd9c\uacb0\uae30\ub85d");var o=t(P,"paper"),c=Z.P6.aoa_to_sheet(o);c["!cols"]=[{wpx:30},{wpx:60},{wpx:50},{wpx:50},{wpx:60},{wpx:60},{wpx:100}],Bn&&c["!cols"].unshift({wpx:30}),Z.P6.book_append_sheet(i,c,"\ubbf8\uc81c\ucd9c"),(0,Z.NC)(i,"".concat(yn(),"\ud559\ub144\ub3c4 \ucd9c\uacb0\uae30\ub85d(").concat(v()().format("YYYY-MM-DD"),").xlsx"))},title:"\ucd9c\uacb0 \ub370\uc774\ud130 \uc5d1\uc140\ud30c\uc77c\ub85c \uc800\uc7a5\ud558\uae30",style:{fontSize:"0.7rem"},children:[(0,k.jsx)("i",{className:"fa-solid fa-download"}),"\uc5d1\uc140"]})]}),(0,k.jsx)("hr",{className:h.Z["margin-15"]}),0===(null===I||void 0===I?void 0:I.length)?(0,k.jsx)("div",{className:"".concat(h.Z["fs-13"]," ").concat(h.Z["margin-15"]),children:"* \ud559\uae09\uc758 \ucd9c\uacb0 \uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"}):(0,k.jsx)("div",{children:(0,k.jsxs)("div",{children:[(0,k.jsx)(x.Z,{id:"whole",className:""===nn?"sortBtn-clicked":"sortBtn",name:"\uc804\uccb4(".concat(null===G||void 0===G?void 0:G.length,")"),onclick:function(){tn("")}}),null===(e=(0,o.Z)(new Set(G)))||void 0===e?void 0:e.map((function(n){return(0,k.jsx)(x.Z,{id:n,className:nn===n?"sortBtn-clicked":"sortBtn",name:"".concat(n," (").concat(null===G||void 0===G?void 0:G.filter((function(t){return t===n})).length,")"),onclick:function(){tn(n)}},n)}))]})})]}),0!==(null===I||void 0===I?void 0:I.length)&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)("li",{className:h.Z["bottom-content-li"],children:[(0,k.jsx)("b",{children:"\uc6d4\ubcc4\ub85c \ubcf4\uae30"}),(0,k.jsx)("hr",{className:h.Z["margin-15"]}),(0,k.jsx)(x.Z,{id:"\ubaa8\ub4e0 \ub2ec",className:""===on?"sortBtn-clicked":"sortBtn",name:"\ubaa8\ub4e0 \ub2ec (".concat(null===I||void 0===I?void 0:I.length,")"),onclick:function(){cn("")}}),null===(d=Bn?(0,o.Z)(new Set(null===P||void 0===P||null===(_=P.filter((function(n){return(null===n||void 0===n?void 0:n.clName)===Y})))||void 0===_?void 0:_.map((function(n){return+n.id.slice(5,7)})))):(0,o.Z)(new Set(null===P||void 0===P?void 0:P.map((function(n){return+n.id.slice(5,7)})))))||void 0===d||null===(g=d.sort((function(n,t){return n>t?1:-1})))||void 0===g?void 0:g.map((function(n){var t;return(0,k.jsx)(k.Fragment,{children:(0,k.jsx)(x.Z,{id:"".concat(n,"\uc6d4"),className:on===n?"sortBtn-clicked":"sortBtn",name:"".concat(n,"\uc6d4 (").concat(null===I||void 0===I||null===(t=I.filter((function(t){return+t.id.slice(5,7)===n})))||void 0===t?void 0:t.length,")"),onclick:function(){cn(n)}},"".concat(n,"\uc6d4"))})}))]}),(0,k.jsxs)("li",{className:h.Z["bottom-content-li"],children:[(0,k.jsxs)("div",{className:h.Z["flex-center-ml-10"],children:[(0,k.jsx)("b",{style:{whiteSpace:"nowrap"},children:"\uc11c\ub958 \ubbf8\uc81c\ucd9c"}),(0,k.jsxs)("button",{className:h.Z["search-btns"],onClick:function(){return Dn(void 0,"all")},title:"\uc5c5\ub85c\ub4dc \ub41c \ubaa8\ub4e0 \uc81c\ucd9c\ub41c \uc11c\ub958\ub97c \ub2e4\uc6b4\ud569\ub2c8\ub2e4.",style:{marginLeft:"5px",whiteSpace:"nowrap",fontSize:"0.7rem"},children:[(0,k.jsx)("i",{className:"fa-solid fa-download"}),"\uc11c\ub958"]})]}),(0,k.jsx)("hr",{className:h.Z["margin-15"]}),(0,k.jsx)(x.Z,{id:"\uc804\uccb4\ud559\uc0dd",className:""===sn?"sortBtn-clicked":"sortBtn",name:"\uc804\uccb4",onclick:function(){un("")}}),null===(w=Bn?(0,o.Z)(new Set(null===(S=Hn(P,"cl"))||void 0===S?void 0:S.map((function(n){return n.name})))):(0,o.Z)(new Set(null===(E=Hn(P))||void 0===E?void 0:E.map((function(n){return n.name})))))||void 0===w||null===(N=w.sort((function(n,t){return n>t?1:-1})))||void 0===N?void 0:N.map((function(n){var t;return(0,k.jsx)(k.Fragment,{children:(0,k.jsx)(x.Z,{id:"noPaper-".concat(n),className:sn===n?"sortBtn-clicked":"sortBtn",name:"".concat(n," (").concat(null===P||void 0===P||null===(t=P.filter((function(t){var e=!1;return t.name!==n||(void 0===(null===t||void 0===t?void 0:t.paper)||null!==t&&void 0!==t&&t.paper?(void 0===(null===t||void 0===t?void 0:t.request)||null!==t&&void 0!==t&&t.request||(e=!0),void 0===(null===t||void 0===t?void 0:t.report)||null!==t&&void 0!==t&&t.report||(e=!0)):e=!0),e})))||void 0===t?void 0:t.length,")"),onclick:function(){un(n)}},"".concat(n))})}))]})]})]}),(0,k.jsx)("div",{className:h.Z["btns-div"],style:{flexWrap:"wrap",justifyContent:null!==sn?"flex-start":"center"},children:null===J||void 0===J?void 0:J.map((function(n,t){var e;return(0,k.jsxs)(k.Fragment,{children:[t>0&&null!==sn&&(null===(e=J[t-1])||void 0===e?void 0:e.name)!==n.name&&(0,k.jsx)("div",{style:{flexBasis:"100%"}},n.id+"div"),(0,k.jsxs)("li",{id:n.id,className:h.Z["bottom-content-li"],style:{width:"260px",padding:"25px"},onClick:function(){Sn(Nn?null:n)},children:[(0,k.jsxs)("div",{className:h.Z["btns-div"],children:[n.id.slice(0,10),"\xa0\xa0",n.name,void 0!==(null===n||void 0===n?void 0:n.paper)&&(0,k.jsx)(k.Fragment,{children:(0,k.jsx)("i",{className:"fa-solid fa-circle-check fa-xl",style:n.paper?{color:"#ff5a71",margin:"0 10px",cursor:"help"}:{color:"#cacaca",margin:"0 10px"},title:"\uc5c5\ub85c\ub4dc \ub41c \uc11c\ub958 \ub2e4\uc6b4\ubc1b\uae30",onClick:function(t){t.stopPropagation(),null!==n&&void 0!==n&&n.paper&&Dn(n,"\uc11c\ub958")}})}),void 0!==(null===n||void 0===n?void 0:n.request)&&(0,k.jsx)(x.Z,{className:null!==n&&void 0!==n&&n.request?"reqRepSub-btn-s-clicked":"reqRepSub-btn-s",name:"\uc2e0",style:{marginLeft:"10px"},title:"\uc5c5\ub85c\ub4dc \ub41c \uc11c\ub958 \ub2e4\uc6b4\ubc1b\uae30",onclick:function(t){t.stopPropagation(),null!==n&&void 0!==n&&n.request&&Dn(n,"\uc2e0\uccad\uc11c")}}),void 0!==(null===n||void 0===n?void 0:n.report)&&(0,k.jsx)(x.Z,{className:null!==n&&void 0!==n&&n.report?"reqRepSub-btn-s-clicked":"reqRepSub-btn-s",name:"\ubcf4",title:"\uc5c5\ub85c\ub4dc \ub41c \uc11c\ub958 \ub2e4\uc6b4\ubc1b\uae30",onclick:function(t){t.stopPropagation(),null!==n&&void 0!==n&&n.report&&Dn(n,"\ubcf4\uace0\uc11c")}})]}),(0,k.jsxs)("div",{className:h.Z["fs-13"],children:[n.option.slice(1)," * ",n.note||""]}),(0,k.jsxs)("div",{className:"".concat(h.Z["attendEdit-div"]," ").concat((null===Nn||void 0===Nn?void 0:Nn.id)===n.id?h.Z.show:""),children:[void 0!==(null===n||void 0===n?void 0:n.paper)&&(0,k.jsx)("button",{className:h.Z["attend-edit-p"],onClick:function(){On("paper")},children:"\uc11c\ub958"}),void 0!==(null===n||void 0===n?void 0:n.request)&&(0,k.jsx)("button",{className:h.Z["attend-edit-p"],onClick:function(){On("request")},children:"\uc2e0\uccad\uc11c"}),void 0!==(null===n||void 0===n?void 0:n.report)&&(0,k.jsx)("button",{className:h.Z["attend-edit-p"],onClick:function(){On("report")},children:"\ubcf4\uace0\uc11c"}),(0,k.jsx)("button",{className:h.Z["attend-edit-d"],onClick:function(n){n.stopPropagation(),On("delete")},children:"\uc0ad\uc81c"}),(0,k.jsx)("button",{className:h.Z["attend-edit-c"],children:"\ucde8\uc18c"})]})]},n.id)]})}))}),0===(null===I||void 0===I?void 0:I.length)&&(0,k.jsx)("li",{className:h.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \ucd9c\uacb0\uae30\ub85d\uc774 \uc5c6\uc5b4\uc694!"})]})]})]})}},2118:function(n,t,e){e.d(t,{Z:function(){return f}});var i=e(885),a=e(7313),o=e(3776),c=e(658),l=e.n(c),r=e(2184),s=e(7692),u=e(7890),d=e(6417),v=function(n){var t=(0,a.useState)(""),e=(0,i.Z)(t,2),o=e[0],c=e[1],l=(0,a.useState)(""),v=(0,i.Z)(l,2),f=v[0],p=v[1],m=(0,a.useState)(""),h=(0,i.Z)(m,2),x=h[0],Z=h[1],g=(0,u.s0)();return(0,a.useEffect)((function(){var n=window.location.href.split("/");c(n[n.length-1])}),[window.location.href]),(0,a.useEffect)((function(){""!==n.onStudent&&p(n.onStudent)}),[n.onStudent]),(0,a.useEffect)((function(){""!==n.clName&&Z(n.clName)}),[n.clName]),(0,d.jsxs)("div",{className:r.Z["btns-div"],children:[(0,d.jsx)(s.Z,{name:"\ucd9c\uacb0",className:"manageAttendance"!==o?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageAttendance",{state:{student:f,clName:x||""}})}}),(0,d.jsx)(s.Z,{name:"\uc0c1\ub2f4",className:"manageConsult"!==o?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageConsult",{state:{student:f,clName:x||""}})}}),(0,d.jsx)(s.Z,{icon:"\uc81c\ucd9c/\uac1c\ubcc4",className:"manageCheckListMemo"!==o?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageCheckListMemo",{state:{student:f,clName:x||""}})}}),(0,d.jsx)(s.Z,{name:"\uc815\ubcf4",className:"manageStudent"!==o?"manageBtn":"manageBtn-clicked",onclick:function(){return g("/manageStudent",{state:{student:f,clName:x||""}})}})]})},f=function(n){var t,e=(0,a.useState)(""),c=(0,i.Z)(e,2),s=c[0],u=c[1],f=(0,a.useState)(""),p=(0,i.Z)(f,2),m=p[0],h=p[1],x=(0,a.useState)([]),Z=(0,i.Z)(x,2),g=Z[0],b=Z[1],j=(0,a.useState)([]),k=(0,i.Z)(j,2),_=k[0],w=k[1],N=(0,a.useState)(!1),S=(0,i.Z)(N,2),E=S[0],y=S[1],B=(0,a.useRef)();(0,a.useEffect)((function(){if(""!==s){var n=document.getElementById("std-".concat(s));null===n||void 0===n||n.classList.remove("none"),null===n||void 0===n||n.classList.add("clicked")}}),[s]);var M=function(n){var t=(null===n||void 0===n?void 0:n.length)>0?n:new Date;return l()(t).format("MM-DD")<="02-15"?String(+l()(t).format("YYYY")-1):l()(t).format("YYYY")};(0,a.useEffect)((function(){var t=function(t){var e,i,a,o;return n.isSubject&&(e=null===(i=n.isSubject)||void 0===i||null===(a=i.filter((function(n){return Object.keys(n)[0]===t})))||void 0===a||null===(o=a[0])||void 0===o?void 0:o[t]),e}(M());y(t)}),[n.isSubject]),(0,a.useEffect)((function(){var t,e,i,a=M(),o=null===n||void 0===n||null===(t=n.students)||void 0===t||null===(e=t.filter((function(n){return Object.keys(n)[0]===a})))||void 0===e||null===(i=e[0])||void 0===i?void 0:i[a];(null===o||void 0===o?void 0:o.length)>0?w(o):w([])}),[n.students]);return(0,a.useEffect)((function(){null===_||void 0===_||_.forEach((function(n){Object.keys(n)[0]===m&&b(Object.values(n)[0])})),""===m&&b([]),n.nowClassNameHandler(m)}),[m]),(0,a.useEffect)((function(){n.selectStudentHandler(s)}),[s]),(0,a.useEffect)((function(){h(n.clName),u("")}),[n.clName]),(0,a.useEffect)((function(){""!==n.passStudent&&u(n.passStudent)}),[n.passStudent]),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{children:E&&(0,d.jsxs)("div",{children:[(0,d.jsxs)("select",{ref:B,onChange:function(){var n=B.current.value;h(n)},className:r.Z["class-select"],value:m,children:[(0,d.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===_||void 0===_?void 0:_.map((function(n){return(0,d.jsx)("option",{value:Object.keys(n),children:Object.keys(n)},Object.keys(n))}))]}),""===(null===B||void 0===B||null===(t=B.current)||void 0===t?void 0:t.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]})}),(0,d.jsxs)("div",{children:[(0,d.jsx)(o.Z,{students:E?g:_,showOption:function(n){var t=n.target.innerText;if(u(s===t?"":t),""!==s){var e=document.getElementById("std-".concat(s));null===e||void 0===e||e.classList.remove("clicked"),null===e||void 0===e||e.classList.add("none")}},isSubject:n.isSubject,manageEach:!0,passStudent:n.passStudent}),!E&&(!_||0===(null===_||void 0===_?void 0:_.length))&&(0,d.jsxs)(d.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,d.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,d.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,d.jsx)("br",{})," ",(0,d.jsx)("br",{})]}),E&&(!g||0===(null===g||void 0===g?void 0:g.length))&&(0,d.jsxs)(d.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,d.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,d.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,d.jsx)("br",{})," ",(0,d.jsx)("br",{})]})]}),(0,d.jsx)(v,{onStudent:s,clName:m}),(0,d.jsx)("div",{})]})}},2184:function(n,t){t.Z={"class-select":"ManageEach_class-select__IlQlu","flex-d-column":"ManageEach_flex-d-column__Dh-Iq","btns-div":"ManageEach_btns-div__Zivma","padd-5":"ManageEach_padd-5__-MakG","bottom-content-ul":"ManageEach_bottom-content-ul__xXaZv","bottom-content-li":"ManageEach_bottom-content-li__S8Tge","flex-ml-10":"ManageEach_flex-ml-10__whmHW","attendEdit-div":"ManageEach_attendEdit-div__7u3SK",show:"ManageEach_show__HHbXY","fs-13":"ManageEach_fs-13__7gMai","fs-15":"ManageEach_fs-15__stlkn","fs-11":"ManageEach_fs-11__dIRN5","fs-9":"ManageEach_fs-9__jSAIp","fs-13-bold":"ManageEach_fs-13-bold__HBo6n","clicked-title":"ManageEach_clicked-title__-ZVjL","search-title":"ManageEach_search-title__wX5x6","search-btns":"ManageEach_search-btns__aYFXS","flex-wrap":"ManageEach_flex-wrap__NnIS9","margin-15":"ManageEach_margin-15__R8DcB","margin-5":"ManageEach_margin-5__IctPu","flex-center-ml-10":"ManageEach_flex-center-ml-10__fmq5p","flex-center":"ManageEach_flex-center__Ent-o","width-max400":"ManageEach_width-max400__8b-OH","attend-edit-p":"ManageEach_attend-edit-p__SvrxQ","attend-edit-d":"ManageEach_attend-edit-d__-GFUJ","attend-edit-c":"ManageEach_attend-edit-c__XExyE","a-link":"ManageEach_a-link__oahRi",excelfileUploadBtn:"ManageEach_excelfileUploadBtn__vkRXS","list-clicked":"ManageEach_list-clicked__4v6iy","span-left":"ManageEach_span-left__PWcvA","onStudent-name":"ManageEach_onStudent-name__5dz+H","fs-22-bold":"ManageEach_fs-22-bold__Irb6D"}}}]);