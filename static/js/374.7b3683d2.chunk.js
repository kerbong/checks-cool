(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[374],{34469:function(e,t){"use strict";t.Z=[{class:"\ud604\uc7a5\uccb4\ud5d8",id:"1",value:"1\ud604\uc7a5\uccb4\ud5d8"},{class:"\uc9c8\ubcd1\uacb0\uc11d",id:"2",value:"2\uc9c8\ubcd1\uacb0\uc11d"},{class:"\uac00\uc815\ud559\uc2b5",id:"3",value:"3\uac00\uc815\ud559\uc2b5"},{class:"\uacbd\uc870\uc0ac",id:"4",value:"4\uacbd\uc870\uc0ac"},{class:"\uc778\uc815\uacb0\uc11d",id:"5",value:"5\uc778\uc815\uacb0\uc11d"},{class:"\uae30\ud0c0\uacb0\uc11d",id:"6",value:"6\uae30\ud0c0\uacb0\uc11d"},{class:"\uc870\ud1f4",id:"7",value:"7\uc870\ud1f4"},{class:"\uc9c0\uac01",id:"8",value:"8\uc9c0\uac01"},{class:"\ubbf8\uc778\uc815",id:"9",value:"9\ubbf8\uc778\uc815"},{class:"\uc778\uc815\uc870\ud1f4",id:"10",value:"10\uc778\uc815\uc870\ud1f4"},{class:"\uc778\uc815\uc9c0\uac01",id:"11",value:"11\uc778\uc815\uc9c0\uac01"},{class:"\uacb0\uacfc",id:"12",value:"12\uacb0\uacfc"}]},19999:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return A}});var i=n(34469),a=n(70885),o=n(47313),l=n(97890),c=n(4942),r=n(1413),s=n(74165),d=n(42982),u=n(15861),v=n(95186),f=n(33451),m=n(27984),p=n(48202),h=n(67114),x=n.n(h),b=n(21261),j="EventLists_no-events-div__4bwNC",_="EventLists_add-event-div__YHkWc",y="EventLists_closeBtn__wzf8P",k="EventLists_event-input-div__c5NcU",S=n(37692),g=n(46417),Z=function(e){var t=(0,o.useState)(e.eventOnDay),n=(0,a.Z)(t,2),i=n[0],l=n[1],c=(0,o.useState)(!1),s=(0,a.Z)(c,2),u=s[0],v=s[1],f=e.fixIsShown,m=function(t){var n,a=null===(n=document.getElementById("option-area".concat(t.id)))||void 0===n?void 0:n.innerText;x().fire({title:"\uc790\ub8cc\ub97c \uc9c0\uc6b8\uae4c\uc694?",text:"".concat(t.id.slice(0,10)," | ").concat(t.name," | ").concat(a),showDenyButton:!0,confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#db100cf2",denyButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c"}).then((function(n){if(n.isConfirmed){e.removeData(t),document.querySelectorAll("button[id='".concat(t.id,"']"))[0].remove();var a=null===i||void 0===i?void 0:i.filter((function(e){return e.id!==t.id}));0===a.length&&a.push({eventDate:t.eventDate}),l((0,d.Z)(a))}}))},h=function(e){var t=function(){x().fire({icon:"error",title:"\uc815\ubcf4\uac00 \ubd80\uc871\ud574\uc694!",text:"\uc774\ub984\uacfc \uc635\uc158\uc120\ud0dd\uc740 \ud544\uc218 \uc694\uc18c\uc785\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})},n=document.getElementById("option-select".concat(e.num));if(n){if(""===n.value)return t(),!1;if(e.id&&e.name){var i,a,o,l,c=[];return null===(i=document.querySelectorAll("h2"))||void 0===i||i.forEach((function(e){var t,n;null!==e&&void 0!==e&&null!==(t=e.id)&&void 0!==t&&t.includes("eventName")&&c.push(null===e||void 0===e||null===(n=e.id)||void 0===n?void 0:n.split(" ")[0])})),!Z(c)||(null===(a=Z(c))||void 0===a?void 0:a.slice(9))!==(null===e||void 0===e||null===(o=e.id)||void 0===o||null===(l=o.split(" "))||void 0===l?void 0:l[0])||(x().fire("\uc800\uc7a5 \uc2e4\ud328","\ucd9c\uacb0\uc790\ub8cc\ub294 \ud559\uc0dd\ub2f9 \ud558\ub8e8\uc5d0 3\uac1c \uae4c\uc9c0\ub9cc \uc800\uc7a5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","error"),!1)}return t(),!1}var r=document.getElementById("option-select".concat(e.id)),s=document.getElementById("option-note".concat(e.id));return r.value!==e.option||s!==e.note||(t(),!1)},Z=function(e){for(var t={},n=0;n<e.length;n++){var i=e[n];if(t[i]?t[i]++:t[i]=1,t[i]>=3)return i}return null},E=function(t){var n,i,a,o,l,c;document.getElementById("option-select".concat(t.num))?(n=document.getElementById("option-select".concat(t.num)).value,i=document.getElementById("option-note".concat(t.num)).value):(n=(null===(a=document.getElementById("option-select".concat(t.id)))||void 0===a?void 0:a.value)||(null===(o=document.getElementById("option-select".concat(t.beforeId)))||void 0===o?void 0:o.value),i=(null===(l=document.getElementById("option-note".concat(t.id)))||void 0===l?void 0:l.value)||(null===(c=document.getElementById("option-note".concat(t.beforeId)))||void 0===c?void 0:c.value)||"");var s={num:+t.num,name:t.name,id:t.id,option:n,note:i};return void 0!==(null===t||void 0===t?void 0:t.paper)&&(s.paper=t.paper),void 0!==(null===t||void 0===t?void 0:t.request)&&(s.request=t.request),void 0!==(null===t||void 0===t?void 0:t.report)&&(s.report=t.report),e.fixedEventHandler(s,t.eventDate),x().fire({icon:"success",title:"\uc790\ub8cc\uac00 \uc800\uc7a5\ub418\uc5c8\uc5b4\uc694.",text:"5\ucd08 \ud6c4\uc5d0 \ucc3d\uc774 \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}),(0,r.Z)((0,r.Z)({},s),{},{eventDate:t.eventDate})};return(0,o.useEffect)((function(){null!==e&&void 0!==e&&e.addClicked&&(v(!0),null===e||void 0===e||e.setFixIsShown("0"))}),[null===e||void 0===e?void 0:e.addClicked]),(0,g.jsxs)("div",{className:"eventOnDayList",children:[(0,g.jsx)("p",{className:y,onClick:function(){e.dayEventHideHandler()},children:(0,g.jsx)("i",{className:"fa-regular fa-circle-xmark"})}),(0,g.jsx)("h1",{className:i[0].eventDate,children:"".concat(i[0].eventDate.slice(6,-4)," (").concat(i[0].eventDate.slice(-3,-2),")")}),!u&&(0,g.jsx)("div",{className:_,children:(0,g.jsx)(S.Z,{name:"\ucd94\uac00",id:"add-checkItemBtn",className:"add-event-button",onclick:function(){v(!0),e.setFixIsShown("0")}})}),(0,g.jsx)("div",{className:k,children:u&&(0,g.jsx)(b.Z,{events:"attendance"===e.about&&e.events,closeHandler:function(){v(!1)},selectOption:e.selectOption,placeholder:"\ube44\uace0\ub97c \uc785\ub825\ud558\uc138\uc694.",about:e.about,saveNewData:function(e){h(e)&&(!function(e){var t=JSON.parse(JSON.stringify(i));void 0===t[0].id?t[0]=e:t.push(e),l((0,d.Z)(t))}(E(e)),v(!1))},students:e.students})}),void 0===i[0].id?(0,g.jsx)("div",{className:j,children:"\ud83d\ude15 \ub4f1\ub85d\ub41c \uc774\ubca4\ud2b8\uac00 \uc5c6\uc5b4\uc694"}):null===i||void 0===i?void 0:i.map((function(t){return(0,g.jsx)(p.Z,{item:t,keyId:t.id,shownId:t.id,text:t.name,note:t.note,option:t.option,selectOption:e.selectOption,fixIsShown:f,saveFixedData:function(e){t.id!==e.id?E(e):h(e)&&function(e){document.getElementById("option-area".concat(e.id)).innerText="".concat(e.option.slice(1)," | ").concat(e.note)}(E(e))},about:e.about,removeCheckSwal:m,setFixIsShown:function(t){e.setFixIsShown(t),v(!1)}},t.id)}))]})},E=n(62652),Y=n(10658),C=n.n(Y),M=n(80650),w=n(90573),O=n(36797),D=function(){var e=new Date,t=e.getFullYear(),n=("0"+(1+e.getMonth())).slice(-2);return"".concat(t,"-").concat(n)},N=function(e){var t,n,i=(0,o.useState)(D),l=(0,a.Z)(i,2),p=l[0],h=l[1],x=(0,o.useState)(!1),b=(0,a.Z)(x,2),j=b[0],_=b[1],y=(0,o.useState)(!1),k=(0,a.Z)(y,2),S=k[0],Y=k[1],N=(0,o.useState)("0"),B=(0,a.Z)(N,2),I=B[0],L=B[1],A=(0,o.useState)([]),F=(0,a.Z)(A,2),T=F[0],q=F[1],H=(0,o.useState)(""),U=(0,a.Z)(H,2),J=U[0],z=U[1],R=(0,o.useState)([]),V=(0,a.Z)(R,2),W=V[0],P=V[1],G=(0,o.useState)([]),K=(0,a.Z)(G,2),Q=K[0],X=K[1],$=(0,o.useState)([]),ee=(0,a.Z)($,2),te=ee[0],ne=ee[1],ie=(0,o.useRef)(),ae=function(){var t=(0,u.Z)((0,s.Z)().mark((function t(){var n;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=(0,w.JU)(M.wO,"attend",e.userUid),(0,w.cf)(n,(function(t){if(P([]),q([]),e.isSubject){if(t.exists()){var n,i=null===t||void 0===t||null===(n=t.data())||void 0===n?void 0:n.attend_data;q((0,d.Z)(i))}}else{var a,o,l=[];null===t||void 0===t||null===(a=t.data())||void 0===a||null===(o=a.attend_data)||void 0===o||o.forEach((function(e){l.push(e)})),P([].concat(l)),_(!0)}}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),oe=function(){var e=ie.current.value;z(e)};(0,o.useEffect)((function(){!function(){var t,n;(0,d.Z)(T).forEach((function(e){Object.keys(e)[0]===J&&P(Object.values(e)[0])})),0===(null===(t=(0,d.Z)(T))||void 0===t?void 0:t.filter((function(e){return Object.keys(e)[0]===J}))).length&&P([]),null===(n=e.students)||void 0===n||n.forEach((function(e){Object.keys(e)[0]===J&&ne(Object.values(e)[0])})),""===J&&ne([])}()}),[J]),(0,o.useEffect)((function(){ae()}),[e.isSubject]);var le=function(){return document.querySelector(".react-datepicker__month").getAttribute("aria-label").slice(7)},ce=function(e){var t=e.getAttribute("aria-label"),n=1;return t.includes("Not available")&&(n=2),t.split(" ")[n].slice(0,4)+"-"+t.split(" ")[n+1].slice(0,-1).padStart(2,"0")+"-"+t.split(" ")[n+2].slice(0,-1).padStart(2,"0")};(0,o.useEffect)((function(){var e=le();function t(e){var t=le(),n=1;e.getAttribute("aria-label").split(" ")[3].slice(0,-1)>20&&(n=-1);var i=function(e,t){var n,i,a=String(Number(e.slice(-2))+t).padStart(2,"0");return"00"===a?(n=+e.slice(0,4)-1,i="12"):"13"===a?(n=+e.slice(0,4)+1,i="01"):(n=e.slice(0,4),i=a),n+"-"+i}(t,n);h(i)}function n(e){var t=e.getAttribute("aria-label"),n=ce(e);if(0!==W.length){var i=null===W||void 0===W?void 0:W.filter((function(e){var t;return(null===e||void 0===e||null===(t=e.id)||void 0===t?void 0:t.slice(5,10))===(null===n||void 0===n?void 0:n.slice(5,10))}));if(i.length>0){var a,o=null===i||void 0===i?void 0:i.map((function(e){return e=(0,r.Z)((0,r.Z)({},e),{},{eventDate:t}),JSON.stringify(e)})),l=null===(a=(0,d.Z)(new Set(o)))||void 0===a?void 0:a.map((function(e){return JSON.parse(e)}));X((function(){return l}))}else X((function(){return[{eventDate:t}]}))}else X((function(){return[{eventDate:t}]}));Y(!0)}h(e);return document.querySelectorAll('.react-datepicker__day[aria-disabled="false"]').forEach((function(e){e.getAttribute("class").includes("--outside-month")?e.onclick=function(){return t(e)}:e.onclick=function(){return n(e)},X([])})),function(){var e=document.querySelectorAll(".react-datepicker__day");null===e||void 0===e||e.forEach((function(e){for(e.getAttribute("aria-selected")||(e.style.backgroundColor="inherit");(null===e||void 0===e||null===(t=e.children)||void 0===t?void 0:t.length)>0;){var t,n;null===e||void 0===e||null===(n=e.firstElementChild)||void 0===n||n.remove()}})),null===m.Z||void 0===m.Z||m.Z.forEach((function(e){if(e[0]===p){var t=e[1].split("*"),n=document.querySelectorAll(t[0])[0];if(!n)return;var i=document.createElement("button");i.className="".concat(E.Z.holidayData," eventBtn"),i.innerText=t[1],n.appendChild(i),n.style.borderRadius="10px"}})),null===W||void 0===W||W.forEach((function(e){var t,n,i="0"+(null===e||void 0===e||null===(t=e.id)||void 0===t?void 0:t.slice(8,10)),a=null===e||void 0===e||null===(n=e.id)||void 0===n?void 0:n.slice(0,10);document.querySelectorAll(".react-datepicker__day--".concat(i)).forEach((function(t){var n=ce(t);if(n===a){var i=document.createElement("button");i.className="".concat(E.Z.eventData," eventBtn"),i.innerText=e.name,i.id=e.id;var o=document.createElement("span");if(o.className="".concat(E.Z.showOptionCal),o.innerText=" | ".concat(e.option.slice(1)),i.appendChild(o),null!==e&&void 0!==e&&e.paper){var l=document.createElement("i");l.className="fa-solid fa-circle-check",i.appendChild(l)}if(null!==e&&void 0!==e&&e.request){var c=document.createElement("button");c.className="".concat(E.Z.paperOn),c.innerText="\uc2e0",i.appendChild(c)}if(null!==e&&void 0!==e&&e.report){var r=document.createElement("button");r.className="".concat(E.Z.paperOn),r.innerText="\ubcf4",i.appendChild(r)}n.slice(0,7)===p?t.style.backgroundColor="#d38c85":(t.style.backgroundColor="#d38c852e",i.style.backgroundColor="#56423c91"),t.appendChild(i),t.style.borderRadius="5px"}}))}))}(),function(){document.removeEventListener("click",t),document.removeEventListener("click",n)}}),[p,W]);var re=function(){Y(!1),L("0")},se=function(){var t=(0,u.Z)((0,s.Z)().mark((function t(n,i,a){var o,l,v,f,m,p,h,x,b,j,_,y,k,S,g,Z,E,Y,C,D,N,B,I;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=(0,w.JU)(M.wO,"attend",e.userUid),l=JSON.parse(JSON.stringify(W)),0===(v=null===l||void 0===l?void 0:l.map((function(e){return delete e.eventDate,(0,r.Z)({},e)}))).length){t.next=47;break}if(!((null===(f=v)||void 0===f?void 0:f.filter((function(e,t){return e.id===n.id&&(m=t),e.id===n.id}))).length>0)){t.next=40;break}if("fix"!==a){t.next=22;break}if(v.splice(m,1,n),p=(0,d.Z)(v),e.isSubject){t.next=15;break}return h={attend_data:p},t.next=13,(0,w.pl)(o,h);case 13:t.next=20;break;case 15:return[],x=(0,d.Z)(null===T||void 0===T?void 0:T.map((function(e){return Object.keys(e)[0]===J?(0,c.Z)({},J,p):e}))),q(x),t.next=20,(0,w.r7)(o,{attend_data:x});case 20:t.next=38;break;case 22:if("del"!==a){t.next=38;break}if(5===(null===(b=document)||void 0===b||null===(j=b.getElementById(n.id))||void 0===j||null===(_=j.parentElement)||void 0===_||null===(y=_.childNodes)||void 0===y?void 0:y.length)&&(document.querySelector(".react-datepicker__day--selected").style.backgroundColor=""),v.splice(m,1),k={attend_data:v},e.isSubject){t.next=32;break}return t.next=30,(0,w.pl)(o,k);case 30:t.next=37;break;case 32:return g=null===(S=(0,d.Z)(T))||void 0===S?void 0:S.filter((function(e){return Object.keys(e)[0]!==J})),0!==v.length&&g.push((0,c.Z)({},J,v)),q(g),t.next=37,(0,w.pl)(o,{attend_data:g});case 37:try{Z="".concat(e.userUid,"/attend/").concat(n.id),E=(0,O.iH)(M.Hw,Z),(0,O.aF)(E).then((function(e){e.items.forEach(function(){var e=(0,u.Z)((0,s.Z)().mark((function e(t){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,O.oq)((0,O.iH)(M.Hw,t._location.path));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))}catch(i){console.log(i)}case 38:t.next=45;break;case 40:return v.push(n),Y=JSON.parse(JSON.stringify(v)),e.isSubject?((N=null===(D=(0,d.Z)(T))||void 0===D?void 0:D.filter((function(e){return Object.keys(e)[0]!==J}))).push((0,c.Z)({},J,Y)),C={attend_data:N},q(N)):C={attend_data:Y},t.next=45,(0,w.pl)(o,C);case 45:t.next=52;break;case 47:return(v=[]).push(n),e.isSubject?(null===T||void 0===T?void 0:T.length)>0?((I=(0,d.Z)(T)).push((0,c.Z)({},J,(0,d.Z)(v))),B={attend_data:I},q(I)):(B={attend_data:[(0,c.Z)({},J,(0,d.Z)(v))]},q([(0,c.Z)({},J,(0,d.Z)(v))])):B={attend_data:(0,d.Z)(v)},t.next=52,(0,w.pl)(o,B);case 52:P((0,d.Z)(v)),e.isSubject&&oe();case 54:case"end":return t.stop()}}),t)})));return function(e,n,i){return t.apply(this,arguments)}}();return(0,o.useEffect)((function(){var t;e.addClicked&&(j&&(null===(t=document.getElementsByClassName("react-datepicker__day--today"))||void 0===t?void 0:t[0]).click())}),[j]),(0,g.jsxs)(g.Fragment,{children:[S&&(0,g.jsx)(f.Z,{onClose:re,addStyle:"0"!==I?"showCopyCal":null,children:(0,g.jsx)(Z,{events:W,eventOnDay:Q,fixIsShown:I,fixedEventHandler:function(e,t){L("0"),se(e,t,"fix")},setFixIsShown:L,removeData:function(e){se(e,e.eventDate,"del")},selectOption:e.selectOption,about:e.about,dayEventHideHandler:re,students:e.isSubject?te:e.students,userUid:e.userUid,isSubject:e.isSubject,addClicked:e.addClicked||!1})}),e.isSubject&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{className:E.Z["classSelect-div"],children:[(0,g.jsx)("h2",{className:E.Z["classSelect-title"],children:"\ucd9c\uacb0 \ub2ec\ub825"}),(0,g.jsxs)("select",{ref:ie,onChange:oe,className:E.Z["class-select"],value:J,children:[(0,g.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===(t=e.students)||void 0===t?void 0:t.map((function(e){return(0,g.jsx)("option",{value:Object.keys(e),children:Object.keys(e)},Object.keys(e))}))]})]}),""===(null===ie||void 0===ie||null===(n=ie.current)||void 0===n?void 0:n.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]}),(0,g.jsx)(v.Z,{inline:"true",getDateValue:function(e){return e.getFullYear()+"-"+("0"+(1+e.getMonth())).slice(-2)+"-"+("0"+e.getDate()).slice(-2)},isSubject:!0,getMonthValue:function(e){h(e)},getYearValue:function(e){h(C()(e).format("YYYY-MM"))}})]})},B=n(59720),I=n(53776),L=function(e){var t=(0,o.useState)(!1),n=(0,a.Z)(t,2),i=n[0],c=n[1],r=(0,o.useState)(""),s=(0,a.Z)(r,2),d=s[0],u=s[1],v=(0,o.useState)(!0),f=(0,a.Z)(v,2),m=(f[0],f[1]),p=(0,o.useState)(!1),h=(0,a.Z)(p,2),x=(h[0],h[1]),b=(0,o.useState)([]),j=(0,a.Z)(b,2),_=j[0],y=j[1],k=(0,o.useState)(!1),S=(0,a.Z)(k,2),Z=S[0],E=S[1],Y=(0,l.s0)(),M=(0,l.TH)().state;(0,o.useEffect)((function(){"addAttend"===(null===M||void 0===M?void 0:M.doWhat)||null===M||void 0===M||M.todo}),[M]);var w=function(){return C()().format("MM-DD")<="02-15"?String(+C()().format("YYYY")-1):C()().format("YYYY")};(0,o.useEffect)((function(){var t,n,i,a=w(),o=null===(t=e.isSubject)||void 0===t||null===(n=t.filter((function(e){var t;return(null===(t=Object.keys(e))||void 0===t?void 0:t[0])===a})))||void 0===n||null===(i=n[0])||void 0===i?void 0:i[a];E(o)}),[e.isSubject]),(0,o.useEffect)((function(){var t,n,i,a=w(),o=null===e||void 0===e||null===(t=e.students)||void 0===t||null===(n=t.filter((function(e){return String(Object.keys(e)[0])===a})))||void 0===n||null===(i=n[0])||void 0===i?void 0:i[a];y(o)}),[e.students]);var O=(0,g.jsxs)("div",{id:"title-div",children:[(0,g.jsxs)("button",{id:"title-btn",onClick:function(){return x(!0)},children:[(0,g.jsx)("i",{className:"fa-regular fa-calendar-days",style:{fontSize:"1em"}})," ","\ucd9c\uacb0\uae30\ub85d"]}),(0,g.jsxs)("div",{style:{height:"70px",display:"flex",alignItems:"center",width:"auto",justifyContent:"flex-end",lineHeight:"20px",fontSize:"0.9rem"},children:[(0,g.jsxs)("span",{id:"switch-btn",onClick:function(){m(!0)},children:[(0,g.jsx)("i",{className:"fa-regular fa-calendar-days"})," \ucd9c\uacb0",(0,g.jsx)("br",{}),"\uae30\ub85d"]}),(0,g.jsxs)("span",{id:"switch-btn",onClick:function(){Y("/consulting",{state:{doWhat:"addConsult"}})},children:[(0,g.jsx)("i",{className:"fa-regular fa-comments"})," \uc0c1\ub2f4",(0,g.jsx)("br",{}),"\uad00\ub9ac"]}),(0,g.jsxs)("span",{id:"switch-btn",onClick:function(){Y("/checkListMemo",{state:{about:"checkLists"}})},children:[(0,g.jsx)("i",{className:"fa-regular fa-square-check"})," \uc81c\ucd9c",(0,g.jsx)("br",{}),"ox"]}),(0,g.jsxs)("span",{id:"switch-btn",onClick:function(){Y("/checkListMemo",{state:{about:"listMemo"}})},children:[(0,g.jsx)("i",{className:"fa-solid fa-clipboard-check"})," \uac1c\ubcc4",(0,g.jsx)("br",{}),"\uae30\ub85d"]})]})]});return(0,g.jsxs)(g.Fragment,{children:[O,(0,g.jsxs)(g.Fragment,{children:[0===e.students.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{children:"\ud559\uc0dd \uba85\ub2e8\uc774 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub124\uc694!"}),(0,g.jsx)("div",{children:"\uba54\ub274\uc758 \uacf0\ub3cc\uc774\ub97c \ub20c\ub7ec\uc11c"}),(0,g.jsx)("div",{children:"\ud559\uc0dd \uba85\ub2e8\uc744 \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694!"})]}),(0,g.jsx)(N,{selectOption:e.selectOption,about:"attendance",isSubject:Z,students:_,userUid:e.userUid,addClicked:"add"===(null===M||void 0===M?void 0:M.todo)}),!Z&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("br",{}),(0,g.jsx)(I.Z,{students:_,showOption:function(e){u(e.target.innerText),c(!0)}}),(0,g.jsx)("p",{children:"* \uc77c\uc815 \uae30\uac04 \ubc18\ubcf5\ub418\ub294 \ucd9c\uacb0\uc740 \ud559\uc0dd \uc774\ub984\uc744 \ud074\ub9ad\ud558\uc138\uc694!"}),(0,g.jsx)("p",{children:"* \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uc2dc\uba74 kerbong@gmail.com\uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694. \ucd5c\ub300\ud55c \ube60\ub974\uac8c \ud574\uacb0\ud574 \ub4dc\ub9b4\uac8c\uc694!"})]})]}),i&&!Z&&(0,g.jsx)(B.Z,{onClose:function(){c(!1)},who:d,date:new Date,selectOption:e.selectOption,userUid:e.userUid,about:"attendance"})]})},A=function(e){return(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(L,{isSubject:e.isSubject,selectOption:i.Z,students:e.students,userUid:e.userUid})})}},23889:function(e,t,n){e.exports=function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=t(e),i={name:"ko",weekdays:"\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"),weekdaysShort:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),weekdaysMin:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),months:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),monthsShort:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),ordinal:function(e){return e},formats:{LT:"A h:mm",LTS:"A h:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY\ub144 MMMM D\uc77c",LLL:"YYYY\ub144 MMMM D\uc77c A h:mm",LLLL:"YYYY\ub144 MMMM D\uc77c dddd A h:mm",l:"YYYY.MM.DD.",ll:"YYYY\ub144 MMMM D\uc77c",lll:"YYYY\ub144 MMMM D\uc77c A h:mm",llll:"YYYY\ub144 MMMM D\uc77c dddd A h:mm"},meridiem:function(e){return e<12?"\uc624\uc804":"\uc624\ud6c4"},relativeTime:{future:"%s \ud6c4",past:"%s \uc804",s:"\uba87 \ucd08",m:"1\ubd84",mm:"%d\ubd84",h:"\ud55c \uc2dc\uac04",hh:"%d\uc2dc\uac04",d:"\ud558\ub8e8",dd:"%d\uc77c",M:"\ud55c \ub2ec",MM:"%d\ub2ec",y:"\uc77c \ub144",yy:"%d\ub144"}};return n.default.locale(i,null,!0),i}(n(10658))}}]);