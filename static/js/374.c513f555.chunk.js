(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[374],{4469:function(e,t){"use strict";t.Z=[{class:"\uad50\uc678\uccb4\ud5d8",id:"1",value:"1\uad50\uc678\uccb4\ud5d8"},{class:"\uc9c8\ubcd1\uacb0\uc11d",id:"2",value:"2\uc9c8\ubcd1\uacb0\uc11d"},{class:"\uac00\uc815\ud559\uc2b5",id:"3",value:"3\uac00\uc815\ud559\uc2b5"},{class:"\uacbd\uc870\uc0ac",id:"4",value:"4\uacbd\uc870\uc0ac"},{class:"\uc778\uc815\uacb0\uc11d",id:"5",value:"5\uc778\uc815\uacb0\uc11d"},{class:"\uae30\ud0c0\uacb0\uc11d",id:"6",value:"6\uae30\ud0c0\uacb0\uc11d"},{class:"\uc870\ud1f4",id:"7",value:"7\uc870\ud1f4"},{class:"\uc9c0\uac01",id:"8",value:"8\uc9c0\uac01"},{class:"\ubbf8\uc778\uc815",id:"9",value:"9\ubbf8\uc778\uc815"},{class:"\uc778\uc815\uc870\ud1f4",id:"10",value:"10\uc778\uc815\uc870\ud1f4"},{class:"\uc778\uc815\uc9c0\uac01",id:"11",value:"11\uc778\uc815\uc9c0\uac01"},{class:"\uacb0\uacfc",id:"12",value:"12\uacb0\uacfc"}]},9999:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return L}});var i=n(4469),a=n(885),o=n(7313),l=n(7890),c=n(2982),s=n(4165),r=n(1413),d=n(5861),u=n(5186),v=n(3451),f=n(7984),m=n(8202),p=n(7114),h=n.n(p),x=n(1261),b="EventLists_no-events-div__4bwNC",j="EventLists_add-event-div__YHkWc",_="EventLists_closeBtn__wzf8P",S="EventLists_event-input-div__c5NcU",y=n(7692),g=n(658),k=n.n(g),Z=n(6417),Y=function(e){var t=(0,o.useState)(e.eventOnDay),n=(0,a.Z)(t,2),i=n[0],l=n[1],s=(0,o.useState)(!1),d=(0,a.Z)(s,2),u=d[0],v=d[1],f=e.fixIsShown,p=function(e){var t=(null===e||void 0===e?void 0:e.length)>0?e:new Date;return k()(t).format("MM-DD")<="02-15"?String(+k()(t).format("YYYY")-1):k()(t).format("YYYY")},g=function(t){var n,a=null===(n=document.getElementById("option-area".concat(t.id)))||void 0===n?void 0:n.innerText;h().fire({title:"\uc790\ub8cc\ub97c \uc9c0\uc6b8\uae4c\uc694?",text:"".concat(t.id.slice(0,10)," | ").concat(t.name," | ").concat(a),showDenyButton:!0,confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#db100cf2",denyButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c"}).then((function(n){if(n.isConfirmed){e.removeData(t),document.querySelectorAll("button[id='".concat(t.id,"']"))[0].remove();var a=null===i||void 0===i?void 0:i.filter((function(e){return e.id!==t.id}));0===a.length&&a.push({eventDate:t.eventDate}),l((0,c.Z)(a))}}))},Y=function(e){var t=function(){h().fire({icon:"error",title:"\uc815\ubcf4\uac00 \ubd80\uc871\ud574\uc694!",text:"\uc774\ub984\uacfc \uc635\uc158\uc120\ud0dd\uc740 \ud544\uc218 \uc694\uc18c\uc785\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})},n=document.getElementById("option-select".concat(e.num));if(n){if(""===n.value)return t(),!1;if(e.id&&e.name){var i,a,o,l,c=[];return null===(i=document.querySelectorAll("h2"))||void 0===i||i.forEach((function(e){var t,n;null!==e&&void 0!==e&&null!==(t=e.id)&&void 0!==t&&t.includes("eventName")&&c.push(null===e||void 0===e||null===(n=e.id)||void 0===n?void 0:n.split(" ")[0])})),!E(c)||(null===(a=E(c))||void 0===a?void 0:a.slice(9))!==(null===e||void 0===e||null===(o=e.id)||void 0===o||null===(l=o.split(" "))||void 0===l?void 0:l[0])||(h().fire("\uc800\uc7a5 \uc2e4\ud328","\ucd9c\uacb0\uc790\ub8cc\ub294 \ud559\uc0dd\ub2f9 \ud558\ub8e8\uc5d0 3\uac1c \uae4c\uc9c0\ub9cc \uc800\uc7a5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","error"),!1)}return t(),!1}var s=document.getElementById("option-select".concat(e.id)),r=document.getElementById("option-note".concat(e.id));return s.value!==e.option||r!==e.note||(t(),!1)},E=function(e){for(var t={},n=0;n<e.length;n++){var i=e[n];if(t[i]?t[i]++:t[i]=1,t[i]>=3)return i}return null},N=function(t){var n,i,a,o,l,c;document.getElementById("option-select".concat(t.num))?(n=document.getElementById("option-select".concat(t.num)).value,i=document.getElementById("option-note".concat(t.num)).value):(n=(null===(a=document.getElementById("option-select".concat(t.id)))||void 0===a?void 0:a.value)||(null===(o=document.getElementById("option-select".concat(t.beforeId)))||void 0===o?void 0:o.value),i=(null===(l=document.getElementById("option-note".concat(t.id)))||void 0===l?void 0:l.value)||(null===(c=document.getElementById("option-note".concat(t.beforeId)))||void 0===c?void 0:c.value)||"");var s={num:+t.num,name:t.name,id:t.id,option:n,note:i};return t.clName&&(s.clName=t.clName),void 0!==(null===t||void 0===t?void 0:t.paper)&&(s.paper=t.paper),void 0!==(null===t||void 0===t?void 0:t.request)&&(s.request=t.request),void 0!==(null===t||void 0===t?void 0:t.report)&&(s.report=t.report),e.fixedEventHandler(s,t.eventDate),h().fire({icon:"success",title:"\uc790\ub8cc\uac00 \uc800\uc7a5\ub418\uc5c8\uc5b4\uc694.",text:"5\ucd08 \ud6c4\uc5d0 \ucc3d\uc774 \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}),(0,r.Z)((0,r.Z)({},s),{},{eventDate:t.eventDate})};(0,o.useEffect)((function(){null!==e&&void 0!==e&&e.addClicked&&(v(!0),null===e||void 0===e||e.setFixIsShown("0"))}),[null===e||void 0===e?void 0:e.addClicked]);return(0,Z.jsxs)("div",{className:"eventOnDayList",children:[(0,Z.jsx)("p",{className:_,onClick:function(){e.dayEventHideHandler()},children:(0,Z.jsx)("i",{className:"fa-regular fa-circle-xmark"})}),(0,Z.jsx)("h1",{className:i[0].eventDate,children:"".concat(i[0].eventDate.slice(6,-4)," (").concat(i[0].eventDate.slice(-3,-2),")")}),!u&&(0,Z.jsx)("div",{className:j,children:(0,Z.jsx)(y.Z,{name:"\ucd94\uac00",id:"add-checkItemBtn",className:"add-event-button",onclick:function(){var t;"attendance"!==e.about||p((t=i[0].eventDate).split(" ")[1].slice(0,4)+"-"+t.split(" ")[2].slice(0,-1).padStart(2,"0")+"-"+t.split(" ")[3].slice(0,-1).padStart(2,"0"))===p()?(v(!0),e.setFixIsShown("0")):h().fire("\uc790\ub8cc \ucd94\uac00 \ubd88\uac00","\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \ucd9c\uacb0 \uc0ac\ud56d\ub9cc \uc785\ub825\uc774 \uac00\ub2a5\ud574\uc694! \ub2e4\ub978 \ud559\ub144\ub3c4\uc758 \ucd9c\uacb0 \uc0ac\ud56d\uc740 \uc218\uc815/\uc0ad\uc81c\ub9cc \uac00\ub2a5\ud569\ub2c8\ub2e4.","warning")}})}),(0,Z.jsx)("div",{className:S,children:u&&(0,Z.jsx)(x.Z,{events:"attendance"===e.about&&e.events,closeHandler:function(){v(!1)},selectOption:e.selectOption,placeholder:"\ube44\uace0\ub97c \uc785\ub825\ud558\uc138\uc694.",about:e.about,saveNewData:function(e){Y(e)&&(!function(e){var t=JSON.parse(JSON.stringify(i));void 0===t[0].id?t[0]=e:t.push(e),l((0,c.Z)(t))}(N(e)),v(!1))},students:e.students})}),void 0===i[0].id?(0,Z.jsx)("div",{className:b,children:"\ud83d\ude15 \ub4f1\ub85d\ub41c \uc774\ubca4\ud2b8\uac00 \uc5c6\uc5b4\uc694"}):null===i||void 0===i?void 0:i.map((function(t){return(0,Z.jsx)(m.Z,{item:t,keyId:t.id,shownId:t.id,text:t.name,note:t.note,option:t.option,selectOption:e.selectOption,fixIsShown:f,saveFixedData:function(e){t.id!==e.id?N(e):Y(e)&&function(e){document.getElementById("option-area".concat(e.id)).innerText="".concat(e.option.slice(1)," | ").concat(e.note)}(N(e))},about:e.about,removeCheckSwal:g,setFixIsShown:function(t){e.setFixIsShown(t),v(!1)}},t.id)}))]})},E=n(2652),N=n(650),M=n(573),w=n(6797),D=function(){var e=new Date,t=e.getFullYear(),n=("0"+(1+e.getMonth())).slice(-2);return"".concat(t,"-").concat(n)},C=function(e){var t,n,i=(0,o.useState)(D),l=(0,a.Z)(i,2),m=l[0],p=l[1],h=(0,o.useState)(!1),x=(0,a.Z)(h,2),b=x[0],j=x[1],_=(0,o.useState)(!1),S=(0,a.Z)(_,2),y=S[0],g=S[1],C=(0,o.useState)("0"),O=(0,a.Z)(C,2),B=O[0],I=O[1],L=(0,o.useState)([]),A=(0,a.Z)(L,2),T=A[0],F=A[1],U=(0,o.useState)(""),q=(0,a.Z)(U,2),H=q[0],J=q[1],z=(0,o.useState)([]),R=(0,a.Z)(z,2),V=R[0],W=R[1],P=(0,o.useState)([]),G=(0,a.Z)(P,2),K=G[0],Q=G[1],X=(0,o.useState)([]),$=(0,a.Z)(X,2),ee=$[0],te=$[1],ne=(0,o.useState)(!1),ie=(0,a.Z)(ne,2),ae=(ie[0],ie[1],(0,o.useRef)()),oe=function(){var t=(0,d.Z)((0,s.Z)().mark((function t(){var n;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=(0,M.JU)(N.wO,"attend",e.userUid),(0,M.cf)(n,(function(t){if(t.exists()){var n,i=null===t||void 0===t||null===(n=t.data())||void 0===n?void 0:n.attend_data,a=[];null===i||void 0===i||i.forEach((function(e){var t,n;e.id?a.push(e):null===(t=Object.values(e))||void 0===t||null===(n=t[0])||void 0===n||n.forEach((function(t){var n;a.push((0,r.Z)((0,r.Z)({},t),{},{clName:null===(n=Object.keys(e))||void 0===n?void 0:n[0]}))}))})),F(a),W(a)}else W([]),F([]);e.isSubject||j(!0)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),le=function(){var e=ae.current.value;J(e)};(0,o.useEffect)((function(){!function(){var t,n,i=null===(t=(0,c.Z)(T))||void 0===t?void 0:t.filter((function(e){return e.clName===H}));""===H?(te([]),i=(0,c.Z)(T)):null===(n=e.students)||void 0===n||n.forEach((function(e){Object.keys(e)[0]===H&&te(Object.values(e)[0])})),W(i)}()}),[H]),(0,o.useEffect)((function(){oe()}),[e.isSubject,e.userUid]);var ce=function(){return document.querySelector(".react-datepicker__month").getAttribute("aria-label").slice(7)},se=function(e){var t=e.getAttribute("aria-label"),n=1;return t.includes("Not available")&&(n=2),t.split(" ")[n].slice(0,4)+"-"+t.split(" ")[n+1].slice(0,-1).padStart(2,"0")+"-"+t.split(" ")[n+2].slice(0,-1).padStart(2,"0")};(0,o.useEffect)((function(){var e=ce();function t(e){var t=ce(),n=1;e.getAttribute("aria-label").split(" ")[3].slice(0,-1)>20&&(n=-1);var i=function(e,t){var n,i,a=String(Number(e.slice(-2))+t).padStart(2,"0");return"00"===a?(n=+e.slice(0,4)-1,i="12"):"13"===a?(n=+e.slice(0,4)+1,i="01"):(n=e.slice(0,4),i=a),n+"-"+i}(t,n);p(i)}function n(e){var t=e.getAttribute("aria-label"),n=se(e);if(0!==V.length){var i=null===V||void 0===V?void 0:V.filter((function(e){var t;return(null===e||void 0===e||null===(t=e.id)||void 0===t?void 0:t.slice(0,10))===(null===n||void 0===n?void 0:n.slice(0,10))}));if(i.length>0){var a,o=null===i||void 0===i?void 0:i.map((function(e){return e=(0,r.Z)((0,r.Z)({},e),{},{eventDate:t}),JSON.stringify(e)})),l=null===(a=(0,c.Z)(new Set(o)))||void 0===a?void 0:a.map((function(e){return JSON.parse(e)}));Q(l)}else Q([{eventDate:t}])}else Q([{eventDate:t}]);g(!0)}p(e);return document.querySelectorAll('.react-datepicker__day[aria-disabled="false"]').forEach((function(e){e.getAttribute("class").includes("--outside-month")?e.onclick=function(){return t(e)}:e.onclick=function(){return n(e)},Q([])})),function(){var e=document.querySelectorAll(".react-datepicker__day");null===e||void 0===e||e.forEach((function(e){for(e.getAttribute("aria-selected")||(e.style.backgroundColor="inherit");(null===e||void 0===e||null===(t=e.children)||void 0===t?void 0:t.length)>0;){var t,n;null===e||void 0===e||null===(n=e.firstElementChild)||void 0===n||n.remove()}})),null===f.Z||void 0===f.Z||f.Z.forEach((function(e){if(e[0]===m){var t=e[1].split("*"),n=document.querySelectorAll(t[0])[0];if(!n)return;var i=document.createElement("button");i.className="".concat(E.Z.holidayData," eventBtn"),i.innerText=t[1],n.appendChild(i),n.style.borderRadius="10px"}})),null===V||void 0===V||V.forEach((function(e){var t,n,i="0"+(null===e||void 0===e||null===(t=e.id)||void 0===t?void 0:t.slice(8,10)),a=null===e||void 0===e||null===(n=e.id)||void 0===n?void 0:n.slice(0,10);document.querySelectorAll(".react-datepicker__day--".concat(i)).forEach((function(t){var n=se(t);if(n===a){var i=document.createElement("button");i.className="".concat(E.Z.eventData," eventBtn"),i.innerText=e.name,i.id=e.id,""===H&&null!==e&&void 0!==e&&e.clName&&(i.innerText=e.clName+" "+i.innerText);var o=document.createElement("span");if(o.className="".concat(E.Z.showOptionCal),o.innerText=" | ".concat(e.option.slice(1)),i.appendChild(o),null!==e&&void 0!==e&&e.paper){var l=document.createElement("i");l.className="fa-solid fa-circle-check",i.appendChild(l)}if(null!==e&&void 0!==e&&e.request){var c=document.createElement("button");c.className="".concat(E.Z.paperOn),c.innerText="\uc2e0",i.appendChild(c)}if(null!==e&&void 0!==e&&e.report){var s=document.createElement("button");s.className="".concat(E.Z.paperOn),s.innerText="\ubcf4",i.appendChild(s)}n.slice(0,7)===m?t.style.backgroundColor="#d38c85":(t.style.backgroundColor="#d38c852e",i.style.backgroundColor="#56423c91"),t.appendChild(i),t.style.borderRadius="5px"}}))}))}(),function(){document.removeEventListener("click",t),document.removeEventListener("click",n)}}),[m,V]);var re=function(){g(!1),I("0")},de=function(){var t=(0,d.Z)((0,s.Z)().mark((function t(n,i,a){var o,l,u,v,f,m,p,h,x,b,j,_,S,y,g,k,Z;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=(0,M.JU)(N.wO,"attend",e.userUid),l=JSON.parse(JSON.stringify(e.isSubject?T:V)),0===(u=null===l||void 0===l?void 0:l.map((function(e){return delete e.eventDate,(0,r.Z)({},e)}))).length){t.next=34;break}if(!((null===(v=u)||void 0===v?void 0:v.filter((function(e,t){return e.id===n.id&&(f=t),e.id===n.id}))).length>0)){t.next=26;break}if("fix"!==a){t.next=15;break}return u.splice(f,1,n),m=(0,c.Z)(u),p={attend_data:m},t.next=12,(0,M.pl)(o,p);case 12:F(u),t.next=24;break;case 15:if("del"!==a){t.next=24;break}return 5===(null===(h=document)||void 0===h||null===(x=h.getElementById(n.id))||void 0===x||null===(b=x.parentElement)||void 0===b||null===(j=b.childNodes)||void 0===j?void 0:j.length)&&(document.querySelector(".react-datepicker__day--selected").style.backgroundColor=""),u.splice(f,1),_={attend_data:u},t.next=22,(0,M.pl)(o,_);case 22:F(u);try{S="".concat(e.userUid,"/attend/").concat(n.id),y=(0,w.iH)(N.Hw,S),(0,w.aF)(y).then((function(e){e.items.forEach(function(){var e=(0,d.Z)((0,s.Z)().mark((function e(t){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,w.oq)((0,w.iH)(N.Hw,t._location.path));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))}catch(i){console.log(i)}case 24:t.next=32;break;case 26:return e.isSubject?u.push((0,r.Z)((0,r.Z)({},n),{},{clName:H})):u.push(n),g=JSON.parse(JSON.stringify(u)),k={attend_data:g},t.next=31,(0,M.pl)(o,k);case 31:F(g);case 32:t.next=40;break;case 34:return u=[],e.isSubject?u.push((0,r.Z)((0,r.Z)({},n),{},{clName:H})):u.push(n),Z={attend_data:(0,c.Z)(u)},t.next=39,(0,M.pl)(o,Z);case 39:F(u);case 40:e.isSubject?le():W((0,c.Z)(u));case 41:case"end":return t.stop()}}),t)})));return function(e,n,i){return t.apply(this,arguments)}}();(0,o.useEffect)((function(){var t;e.addClicked&&(b&&(null===(t=document.getElementsByClassName("react-datepicker__day--today"))||void 0===t?void 0:t[0]).click())}),[b]);return(0,Z.jsxs)(Z.Fragment,{children:[y&&(0,Z.jsx)(v.Z,{onClose:re,addStyle:"0"!==B?"showCopyCal":null,children:(0,Z.jsx)(Y,{events:V,eventOnDay:K,fixIsShown:B,fixedEventHandler:function(e,t){I("0"),de(e,t,"fix")},setFixIsShown:I,removeData:function(e){de(e,e.eventDate,"del")},selectOption:e.selectOption,about:e.about,dayEventHideHandler:re,students:e.isSubject?ee:e.students,userUid:e.userUid,isSubject:e.isSubject,addClicked:e.addClicked||!1})}),e.isSubject&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("div",{className:E.Z["classSelect-div"],children:(0,Z.jsxs)("select",{ref:ae,onChange:le,className:E.Z["class-select"],value:H,children:[(0,Z.jsx)("option",{value:"",children:"--\uc804\uccb4--"}),null===(t=e.students)||void 0===t?void 0:t.map((function(e){return(0,Z.jsx)("option",{value:Object.keys(e),children:Object.keys(e)},Object.keys(e))}))]})}),""===(null===ae||void 0===ae||null===(n=ae.current)||void 0===n?void 0:n.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]}),(0,Z.jsx)(u.Z,{inline:"true",getDateValue:function(e){return e.getFullYear()+"-"+("0"+(1+e.getMonth())).slice(-2)+"-"+("0"+e.getDate()).slice(-2)},isSubject:!0,getMonthValue:function(e){p(e)},getYearValue:function(e){p(k()(e).format("YYYY-MM"))}})]})},O=n(9720),B=n(3776),I=function(e){var t=(0,o.useState)(!1),n=(0,a.Z)(t,2),i=n[0],c=n[1],s=(0,o.useState)(""),r=(0,a.Z)(s,2),d=r[0],u=r[1],v=(0,o.useState)(!0),f=(0,a.Z)(v,2),m=(f[0],f[1]),p=(0,o.useState)(!1),h=(0,a.Z)(p,2),x=(h[0],h[1]),b=(0,o.useState)([]),j=(0,a.Z)(b,2),_=j[0],S=j[1],y=(0,o.useState)(!1),g=(0,a.Z)(y,2),Y=g[0],E=g[1],N=(0,l.s0)(),M=(0,l.TH)().state;(0,o.useEffect)((function(){"addAttend"===(null===M||void 0===M?void 0:M.doWhat)||null===M||void 0===M||M.todo}),[M]);var w=function(){return k()().format("MM-DD")<="02-15"?String(+k()().format("YYYY")-1):k()().format("YYYY")};(0,o.useEffect)((function(){var t,n,i,a=w(),o=null===(t=e.isSubject)||void 0===t||null===(n=t.filter((function(e){var t;return(null===(t=Object.keys(e))||void 0===t?void 0:t[0])===a})))||void 0===n||null===(i=n[0])||void 0===i?void 0:i[a];E(o)}),[e.isSubject]),(0,o.useEffect)((function(){var t,n,i,a=w(),o=(null===e||void 0===e||null===(t=e.students)||void 0===t||null===(n=t.filter((function(e){return String(Object.keys(e)[0])===a})))||void 0===n||null===(i=n[0])||void 0===i?void 0:i[a])||[];S(o)}),[e.students]);var D=(0,Z.jsxs)("div",{id:"title-div",children:[(0,Z.jsxs)("button",{id:"title-btn",onClick:function(){return x(!0)},children:[(0,Z.jsx)("i",{className:"fa-regular fa-calendar-days",style:{fontSize:"1em"}})," ","\ucd9c\uacb0\uae30\ub85d"]}),(0,Z.jsxs)("div",{style:{height:"70px",display:"flex",alignItems:"center",width:"auto",justifyContent:"flex-end",lineHeight:"20px",fontSize:"0.9rem"},children:[(0,Z.jsxs)("span",{id:"switch-btn",onClick:function(){m(!0)},children:[(0,Z.jsx)("i",{className:"fa-regular fa-calendar-days"})," \ucd9c\uacb0",(0,Z.jsx)("br",{}),"\uae30\ub85d"]}),(0,Z.jsxs)("span",{id:"switch-btn",onClick:function(){N("/consulting",{state:{doWhat:"addConsult"}})},children:[(0,Z.jsx)("i",{className:"fa-regular fa-comments"})," \uc0c1\ub2f4",(0,Z.jsx)("br",{}),"\uad00\ub9ac"]}),(0,Z.jsxs)("span",{id:"switch-btn",onClick:function(){N("/checkListMemo",{state:{about:"checkLists"}})},children:[(0,Z.jsx)("i",{className:"fa-regular fa-square-check"})," \uc81c\ucd9c",(0,Z.jsx)("br",{}),"ox"]}),(0,Z.jsxs)("span",{id:"switch-btn",onClick:function(){N("/checkListMemo",{state:{about:"listMemo"}})},children:[(0,Z.jsx)("i",{className:"fa-solid fa-clipboard-check"})," \uac1c\ubcc4",(0,Z.jsx)("br",{}),"\uae30\ub85d"]})]})]});return(0,Z.jsxs)(Z.Fragment,{children:[D,(0,Z.jsxs)(Z.Fragment,{children:[0===e.students.length&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("div",{children:"\ud559\uc0dd \uba85\ub2e8\uc774 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub124\uc694!"}),(0,Z.jsx)("div",{children:"\uba54\ub274\uc758 \uacf0\ub3cc\uc774\ub97c \ub20c\ub7ec\uc11c"}),(0,Z.jsx)("div",{children:"\ud559\uc0dd \uba85\ub2e8\uc744 \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694!"})]}),(0,Z.jsx)(C,{selectOption:e.selectOption,about:"attendance",isSubject:Y,students:_,userUid:e.userUid,addClicked:"add"===(null===M||void 0===M?void 0:M.todo)}),!Y&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("br",{}),(0,Z.jsx)(B.Z,{students:_,showOption:function(e){u(e.target.innerText),c(!0)}}),(0,Z.jsx)("p",{children:"* \uc77c\uc815 \uae30\uac04 \ubc18\ubcf5\ub418\ub294 \ucd9c\uacb0\uc740 \ud559\uc0dd \uc774\ub984\uc744 \ud074\ub9ad\ud558\uc138\uc694!"}),(0,Z.jsx)("p",{children:"* \ubb38\uc81c\uac00 \uc9c0\uc18d\ub418\uc2dc\uba74 kerbong@gmail.com\uc73c\ub85c \uc54c\ub824\uc8fc\uc138\uc694. \ucd5c\ub300\ud55c \ube60\ub974\uac8c \ud574\uacb0\ud574 \ub4dc\ub9b4\uac8c\uc694!"})]})]}),i&&!Y&&(0,Z.jsx)(O.Z,{onClose:function(){c(!1)},who:d,date:new Date,selectOption:e.selectOption,userUid:e.userUid,about:"attendance"})]})},L=function(e){return(0,Z.jsx)(Z.Fragment,{children:(0,Z.jsx)(I,{isSubject:e.isSubject,selectOption:i.Z,students:e.students,userUid:e.userUid})})}},3889:function(e,t,n){e.exports=function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=t(e),i={name:"ko",weekdays:"\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"),weekdaysShort:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),weekdaysMin:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),months:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),monthsShort:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),ordinal:function(e){return e},formats:{LT:"A h:mm",LTS:"A h:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY\ub144 MMMM D\uc77c",LLL:"YYYY\ub144 MMMM D\uc77c A h:mm",LLLL:"YYYY\ub144 MMMM D\uc77c dddd A h:mm",l:"YYYY.MM.DD.",ll:"YYYY\ub144 MMMM D\uc77c",lll:"YYYY\ub144 MMMM D\uc77c A h:mm",llll:"YYYY\ub144 MMMM D\uc77c dddd A h:mm"},meridiem:function(e){return e<12?"\uc624\uc804":"\uc624\ud6c4"},relativeTime:{future:"%s \ud6c4",past:"%s \uc804",s:"\uba87 \ucd08",m:"1\ubd84",mm:"%d\ubd84",h:"\ud55c \uc2dc\uac04",hh:"%d\uc2dc\uac04",d:"\ud558\ub8e8",dd:"%d\uc77c",M:"\ud55c \ub2ec",MM:"%d\ub2ec",y:"\uc77c \ub144",yy:"%d\ub144"}};return n.default.locale(i,null,!0),i}(n(658))}}]);