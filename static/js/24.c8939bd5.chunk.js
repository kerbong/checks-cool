(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[24],{95186:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(70885),i=n(47313),a=n(61378),o=n.n(a),u=(n(72632),n(21560)),s=n(46417),l=function(e){var t=(0,i.useState)(e.setStart||new Date),n=(0,r.Z)(t,2),a=n[0],l=n[1],c=(0,i.useState)(e.setEnd||a),d=(0,r.Z)(c,2),f=d[0],p=d[1],v=i.forwardRef((function(e,t){var n=e.value,r=e.onClick;return(0,s.jsx)("button",{className:"custom-input",onClick:r,ref:t,title:"\ub0a0\uc9dc \uc120\ud0dd\ud558\uae30",children:n})}));(0,i.useEffect)((function(){if("main"===e.about)l(e.setStart);else if("tableInput"===e.about){if(!e.setStart||"object"!==typeof e.setStart)return;l(e.setStart)}}),[e.setStart]);return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(o(),{selected:a,onChange:function(t){if("attendance"===e.about||"todo"===e.about){var n=(0,r.Z)(t,2),i=n[0],a=n[1];l(i),p(a)}else l(t);e.getDateValue(t),"tableInput"===e.about&&e.tableDateChangeHandler(t)},filterDate:function(t){if(e.filterNone)return t;var n=t.getDay(t);return 0!==n&&6!==n},startDate:a,showMonthDropdown:!0,showYearDropdown:!0,scrollableYearDropdown:!0,onMonthChange:function(t){e.getMonthValue(t)},dateFormatCalendar:"yyyy\ub144 ",endDate:("attendance"===e.about||"todo"===e.about)&&f,selectsRange:("attendance"===e.about||"todo"===e.about)&&!0,disabledKeyboardNavigation:!0,highlightDates:e.highlight,customInput:(0,s.jsx)(v,{onClick:function(){if(e.filterNone){var t=document.querySelector(".react-datepicker__day-names"),n=document.querySelectorAll(".react-datepicker__day-name");t&&n&&(t.style.width="95%",n[0].style.width="14%",n[6].style.width="14%")}}}),fixedHeight:e.fixedHeight,inline:e.inline,locale:u.Z,dateFormat:e.showJustTime?"aa h:mm":e.showTime?"yy\ub144 MMMM d\uc77c(eee) aa h:mm":"yy\ub144 MMMM d\uc77c(eee)",showTimeSelectOnly:e.showJustTime,timeFormat:"aa h:mm",timeInputLabel:"\uc785\ub825/\uc120\ud0dd",showTimeInput:e.showTime,timeIntervals:10})})}},44484:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(1413),i=n(70885),a=n(47313),o={"class-subject":"Input_class-subject__E+qGy","rowcolumn-input":"Input_rowcolumn-input__MzKWZ","simsim-Text":"Input_simsim-Text__7+u+1","meetSum-Text":"Input_meetSum-Text__0ijY3","class-memo":"Input_class-memo__eXBTy","attendForm-input":"Input_attendForm-input__KLvku","memo-section":"Input_memo-section__CGRYR","simsimMain-input":"Input_simsimMain-input__TVHos","board-input":"Input_board-input__2xPzk","board-input-half":"Input_board-input-half__Lu9st","fs-80px":"Input_fs-80px__t0quj","fs-70px":"Input_fs-70px__ZcOO7","fs-60px":"Input_fs-60px__QNEgw","fs-50px":"Input_fs-50px__GEaU0","fs-40px":"Input_fs-40px__OICBO","memoAdd-textarea":"Input_memoAdd-textarea__dssNI","gptResult-input":"Input_gptResult-input__6i8It"},u=n(46417),s=void 0,l=a.forwardRef((function(e,t){var n=(0,a.useRef)(null),l=(0,a.useState)(""),c=(0,i.Z)(l,2),d=c[0],f=c[1],p=(0,a.useState)(""),v=(0,i.Z)(p,2),m=v[0],h=v[1];(0,a.useEffect)((function(){f("")}),[]),(0,a.useEffect)((function(){f(e.defaultValue)}),[e.defaultValue]);var x=function(){var t;return"40px"===e.fontSize?t="10-900":"50px"===e.fontSize?t="9-310":"60px"===e.fontSize?t="8-190":"70px"===e.fontSize?t="7-150":"80px"===e.fontSize&&(t="6-120"),/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)&&(t="25-400"),t},g=function(t){f(n.current.value),e.getValue&&e.getValueHandler(t)};(0,a.useEffect)((function(){!0===e.showOn?h("1"):!1===e.showOn?h("0"):h(e.showOn)}),[e.showOn]),(0,a.useEffect)((function(){"textarea"===e.input.type&&y()}),[m]),(0,a.useEffect)((function(){n.current.style.height=e.startheight}),[e.startheight]);var b=function(){var t,r,i,a,o=null===(t=x())||void 0===t||null===(r=t.split("-"))||void 0===r?void 0:r[0],u=null===(i=x())||void 0===i||null===(a=i.split("-"))||void 0===a?void 0:a[1],s=n.current.value.split("\n"),l=Math.ceil((n.current.clientWidth-50)/(+e.fontSize.slice(0,2)+2)),c=s.length;s.forEach((function(e){var t=Math.floor(e.length/l);t>1&&(c+=t)})),+c>+o?e.maxRowAlert("enter"):n.current.value.length>+u&&e.maxRowAlert("length")};(0,a.useEffect)((function(){""!==e.fontSize&&void 0!==e.fontSize&&b()}),[e.fontSize]);var y=function(t){if(null!==n&&null!==n.current){if(e.alarm)return window.scrollTo(0,n.current.scrollHeight/2),void b();n.current.style.height="10px",n.current.style.height=n.current.scrollHeight-13+"px"}};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("label",{htmlFor:e.input.id}),"textarea"===e.input.type?(0,u.jsx)("textarea",(0,r.Z)((0,r.Z)({id:e.id,ref:n},e.input),{},{className:o[e.className],onKeyDown:function(){return y(s)},onKeyUp:function(){return y(s)},onClick:function(){return y(s)},value:d||"",onInput:e.onInput,required:!!e.required,onChange:g,placeholder:e.placeholder||""}),"textArea"+e.myKey):(0,u.jsx)("input",(0,r.Z)((0,r.Z)({id:e.input.id,type:e.input.type,required:!!e.required,className:o[e.className],onInput:e.onInput,ref:n},e.input),{},{value:d||"",onChange:g,placeholder:e.placeholder||""}),e.myKey)]})}))},80571:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});n(47313);var r=n(33451),i="ExampleModal_xmark__aUZiP",a="ExampleModal_img-div__6WVX9",o="ExampleModal_img__oJEG0",u=n(46417),s=function(e){return(0,u.jsxs)(r.Z,{onClose:e.onClose,addStyle:e.addStyle,children:[(0,u.jsx)("span",{onClick:e.onClose,className:i,children:(0,u.jsx)("i",{className:"fa-regular fa-circle-xmark"})}),(0,u.jsx)("div",{children:e.title}),(0,u.jsx)("hr",{style:{margin:"20px 15px"}}),(0,u.jsx)("div",{className:a,children:e.imgSrc&&(0,u.jsx)("img",{src:e.imgSrc,className:o,alt:"exampleGif"})}),(0,u.jsx)("div",{children:e.text}),(0,u.jsx)("div",{children:e.bottomText})]})}},92024:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return E}});var r=n(42982),i=n(1413),a=n(74165),o=n(15861),u=n(70885),s=n(47313),l="MobileMain_main__t+rXW",c="MobileMain_img-div__Ab97P",d="MobileMain_wating-div__l4qwJ",f="MobileMain_wating-span__sygsg",p="MobileMain_wating-span-now__HkJJY",v="MobileMain_dates-div__kPpy0",m=n(37692),h=n(97890),x=n(90573),g=n(80650),b=n(10658),y=n.n(b),w=n(77981),Z=n(67114),j=n.n(Z),_=n(42964),k=n(63038),S=n.n(k),M=n(46146),D=n.n(M),Y=n(80571),O=n(95186),N=n(36797),T=n(95162),I=n(44484),C=n(46417);y().extend(S()),y().extend(D()),y().locale("ko");var E=function(e){var t=(0,s.useState)(!1),n=(0,u.Z)(t,2),b=n[0],Z=n[1],k=(0,s.useState)(null),S=(0,u.Z)(k,2),M=S[0],D=S[1],E=(0,s.useState)(!1),R=(0,u.Z)(E,2),H=R[0],U=R[1],V=(0,s.useState)(""),B=(0,u.Z)(V,2),q=B[0],J=B[1],z=(0,s.useState)(""),A=(0,u.Z)(z,2),F=A[0],P=A[1],W=(0,s.useState)(""),L=(0,u.Z)(W,2),K=L[0],Q=L[1],G=(0,s.useState)(""),$=(0,u.Z)(G,2),X=$[0],ee=$[1],te=(0,s.useState)(!1),ne=(0,u.Z)(te,2),re=ne[0],ie=ne[1],ae=(0,s.useState)(null),oe=(0,u.Z)(ae,2),ue=oe[0],se=oe[1],le=(0,s.useState)(""),ce=(0,u.Z)(le,2),de=(ce[0],ce[1],(0,s.useState)([])),fe=(0,u.Z)(de,2),pe=fe[0],ve=fe[1],me=(0,s.useState)(null),he=(0,u.Z)(me,2),xe=he[0],ge=he[1],be=(0,s.useState)(null),ye=(0,u.Z)(be,2),we=ye[0],Ze=ye[1],je=(0,s.useState)(null),_e=(0,u.Z)(je,2),ke=_e[0],Se=_e[1],Me=(0,s.useState)(null),De=(0,u.Z)(Me,2),Ye=De[0],Oe=De[1],Ne=(0,s.useState)(!1),Te=(0,u.Z)(Ne,2),Ie=Te[0],Ce=Te[1],Ee=(0,s.useRef)(),Re=(0,h.s0)(),He=function(){return+y()().format("MM")<=2?String(+y()().format("YYYY")-1):y()().format("YYYY")};(0,s.useEffect)((function(){Fe()}),[e.isSubject]),(0,s.useEffect)((function(){var t,n,r;if(e.students){var i=null===(t=e.students)||void 0===t||null===(n=t.filter((function(e){return Object.keys(e)[0]===He()})))||void 0===n||null===(r=n[0])||void 0===r?void 0:r[He()];ve(i)}}),[e.students]);var Ue=function(e){Ee.current&&Ee.current.click();var t=e.target.title;J(t)},Ve=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(){var t,n,r,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!re&&!ue){e.next=2;break}return e.abrupt("return");case 2:return t=(0,x.JU)(g.wO,"apis","apifromkerbonggmail"),e.next=5,(0,x.QT)(t);case 5:(n=e.sent).exists()&&(r=n.data().open_ai_api,i=new w.ZP({apiKey:r,dangerouslyAllowBrowser:!0}),se(i));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Be=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var n,r,i,o,u;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=function(e){return e.split("\n").filter((function(e){return!e.includes("\ud569\ub2c8\ub2e4")&&!e.includes("\uc8fc\uc138\uc694")&&!e.includes("\uc608)")&&!e.includes("\uc608\uc2dc")&&!e.includes("\ud559\uad50\uc7a5")&&!e.includes("\uacb0\uc7ac")&&!e.includes("\uad50\ubb34")&&!e.includes("\uc804\uacb0")&&!e.includes("\u203b")&&!e.includes("\uadc0\ud558")&&!e.includes("\uad6c\uccb4\uc801")&&!e.includes("\ubc14\ub78d\ub2c8\ub2e4")&&!e.includes("\ub429\ub2c8\ub2e4")})).join("").replace(/\n/g,"")},n=function(){var e={value:1,dataWhen:(new Date).getDate()};localStorage.setItem("todayOcrTry",JSON.stringify(e))},!((r=localStorage.getItem("todayOcrTry")||"").length>0)){e.next=18;break}if(i=JSON.parse(r),(new Date).getDate()===i.dataWhen){e.next=9;break}n(),e.next=16;break;case 9:if(!(i.value>100)){e.next=14;break}return j().fire({icon:"error",title:"\uc778\uc2dd\ubd88\uac00",text:"\ubd88\ud3b8\ub4dc\ub824 \uc8c4\uc1a1\ud569\ub2c8\ub2e4. \ub2e4\ub978 \uc120\uc0dd\ub2d8\ub4e4\uc744 \uc704\ud574\uc11c \ud558\ub8e8\uc5d0 100\ubc88\uae4c\uc9c0\ub9cc OCR\uae30\ub2a5 \ud65c\uc6a9\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4. \ubc30\ub824 \uac10\uc0ac\ud569\ub2c8\ub2e4! "}),e.abrupt("return",!1);case 14:i.value+=1,localStorage.setItem("todayOcrTry",JSON.stringify(i));case 16:e.next=19;break;case 18:n();case 19:return"\uc0c1\ub2f4"!==q&&"\ucd9c\uacb0"!==q||0===(null===pe||void 0===pe?void 0:pe.length)&&j().fire({icon:"error",title:"\uc124\uc815\ud544\uc694",text:"\uc774\ubc88\ud559\ub144\ub3c4 \ud559\uc0dd \uc815\ubcf4\uac00 \uc5c6\uc5b4\uc694! [\ud655\uc778] \ubc84\ud2bc\uc744 \ub20c\ub7ec\uc11c \ud559\uc0dd\uba85\ubd80 \uc785\ub825 \ud654\uba74\uc73c\ub85c \uc774\ub3d9\ud574\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",showDenyButton:!1}).then((function(e){e.isConfirmed&&Re("/student-manage")})),"AIzaSyBZOH8k3MvnN5QuOLz5SDIbp-RLNn-Lhec",u="https://vision.googleapis.com/v1/images:annotate?key=".concat("AIzaSyBZOH8k3MvnN5QuOLz5SDIbp-RLNn-Lhec"),e.next=24,fetch(u,{method:"POST",body:JSON.stringify({requests:[{image:{content:t},features:[{type:"TEXT_DETECTION"}]}]}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=o(e.responses[0].fullTextAnnotation.text);console.log(t),ee(t)})).catch((function(e){return j().fire({icon:"error",title:"\uc778\uc2dd\uc774 \ubd88\uac00\ub2a5\ud574\uc694",text:"\uc624\ub958\uac00 \uc0dd\uaca8\uc11c \uc778\uc2dd\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694! \ub2e4\ub978 \ubc29\ubc95\uc744 \ud65c\uc6a9\ud558\uc2dc\uac70\ub098 \uba54\uc77c\ub85c \uc5f0\ub77d\uc8fc\uc138\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}));case 24:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),qe=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t,n){var r,i,o,u,s,l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ue.chat.completions.create({messages:[{role:"system",content:n},{role:"user",content:t}],model:"gpt-3.5-turbo-1106",temperature:.2});case 2:s=e.sent,console.log(null===s||void 0===s||null===(r=s.choices[0])||void 0===r||null===(i=r.message)||void 0===i?void 0:i.content),l=Je(null===s||void 0===s||null===(o=s.choices[0])||void 0===o||null===(u=o.message)||void 0===u?void 0:u.content),Se(rt(null===l||void 0===l?void 0:l[1])),ge(l),ie(!1);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();function Je(e){var t,n=e.split("\n"),r=[];n.forEach((function(e,n){if(null!==e&&void 0!==e&&e.includes(":")){var i=null===e||void 0===e?void 0:e.split(":"),a=(0,u.Z)(i,2),o=a[0],s=a[1];if(null!==o&&void 0!==o&&o.includes("1")){var l=ze(null===s||void 0===s?void 0:s.trim(),pe);t=[l.num,l.name],null===r||void 0===r||r.push(l.name)}else null===r||void 0===r||r.push(null===s||void 0===s?void 0:s.trim())}else{var c=String(n+1)+".",d=null===e||void 0===e?void 0:e.split(c),f=(0,u.Z)(d,2),p=(f[0],f[1]);if(0===n){var v=ze(null===p||void 0===p?void 0:p.trim(),pe);t=[v.num,v.name],null===r||void 0===r||r.push(v.name)}else null===r||void 0===r||r.push(p.trim())}}));var i={num:t[0],name:t[1],option:"1\ud604\uc7a5\uccb4\ud5d8"};return 4===(null===r||void 0===r?void 0:r.length)?(i.request=!0,i.report=!1):2===(null===r||void 0===r?void 0:r.length)?(i.request=!1,i.report=!0):3===(null===r||void 0===r?void 0:r.length)&&(i.paper=!0),Ze(i),r}function ze(e,t){var n=null,r=1/0;return t.forEach((function(t){var i=function(e,t){for(var n=e.length,r=t.length,i=[],a=0;a<=n;a++)i[a]=[],i[a][0]=a;for(var o=0;o<=r;o++)i[0][o]=o;for(var u=1;u<=n;u++)for(var s=1;s<=r;s++)e[u-1]===t[s-1]?i[u][s]=i[u-1][s-1]:i[u][s]=Math.min(i[u-1][s]+1,i[u][s-1]+1,i[u-1][s-1]+1);return i[n][r]}(e,t.name);i<r&&(r=i,n=t)})),n}var Ae=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={maxSizeMb:1.2,maxWidthOrHeight:1e3},e.next=4,(0,_.Z)(t,n);case 4:return e.abrupt("return",e.sent);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),Fe=function(){var t,n,r,i;e.isSubject&&(t=null===(n=e.isSubject)||void 0===n||null===(r=n.filter((function(e){return Object.keys(e)[0]===He()})))||void 0===r||null===(i=r[0])||void 0===i?void 0:i[He()]);Ce(t)},Pe=function(){var t=(0,o.Z)((0,a.Z)().mark((function t(n){var o,u,s,l,c,d,f;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,N.sf)((0,N.iH)(g.Hw,"".concat(e.userUid,"/").concat((0,T.Z)())),n.attachedFileUrl,"data_url");case 2:return o=t.sent,t.next=5,(0,N.Jt)(o.ref);case 5:return u=t.sent,s=(0,i.Z)((0,i.Z)({},n),{},{attachedFileUrl:u}),l=(0,x.JU)(g.wO,"consult",e.userUid),t.next=10,(0,x.QT)(l);case 10:if(!(c=t.sent).exists()){t.next=18;break}return(f=(0,r.Z)(null===(d=c.data().consult_data)||void 0===d?void 0:d.filter((function(e){return e.id!==s.id})))).push(s),t.next=16,(0,x.pl)(l,{consult_data:f});case 16:t.next=20;break;case 18:return t.next=20,(0,x.pl)(l,{consult_data:[s]});case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),We=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var n,o,u,s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=(0,r.Z)(pe),Ie&&(u={},null===pe||void 0===pe||pe.forEach((function(e){u[Object.keys(e)]=Object.keys(e)})),j().fire({title:"\ud559\uae09 \uc120\ud0dd",input:"select",inputOptions:(0,i.Z)({},u),inputPlaceholder:"== \uc120\ud0dd ==",showCancelButton:!0,confirmButtonText:"\uc120\ud0dd",cancelButtonText:"\ucde8\uc18c"}).then((function(e){var t=null===e||void 0===e?void 0:e.value;o=t,console.log(o),null===pe||void 0===pe||pe.forEach((function(e){Object.keys(e)[0]===t&&(n=Object.values(e)[0])}))}))),s={},n.forEach((function(e){s[e.name]=e.name})),j().fire({title:"\ud559\uc0dd \uc774\ub984 \uc120\ud0dd",input:"select",inputOptions:(0,i.Z)({},s),inputPlaceholder:"== \uc120\ud0dd ==",showCancelButton:!0,confirmButtonText:"\uc120\ud0dd",cancelButtonText:"\ucde8\uc18c"}).then((function(e){var a=null===e||void 0===e?void 0:e.value;if(console.log(a),t){if(a){var u=n.filter((function(e){return e.name===a}))[0],s=(0,i.Z)((0,i.Z)({},we),{},{num:u.num,name:u.name}),l=(0,r.Z)(xe);l[0]=u.name,ge(l),Ze(s)}}else if(a){var c=n.filter((function(e){return e.name===a}))[0],d={num:c.num,name:c.name,id:y()().format("YYYY-MM-DDHH:mm")+c.num,option:"2\uad50\uc6b0\uad00\uacc4",note:X,attachedFileUrl:Ye,related:[]};Ie&&(d.clName=o),Pe(d)}}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){""!==X&&("\ucd9c\uacb0"===q?X.includes("\uccb4\ud5d8")&&X.includes("\ud559\uc2b5")&&X.includes("\uc2e0\uccad\uc11c")?qe(X,"\uc774\ub807\uac8c ocr\ub85c \uc778\uc2dd\ud55c text\uac00 \uc788\ub294\ub370 \uc774 \ub0b4\uc6a9\uc744 \uc790\uc138\ud788 \ubd84\uc11d\ud574\ubd10. \uadf8\ub9ac\uace0 \uc2e0\uccad\ub0a0\uc9dc\uc5d0 \uc788\ub294 \ub0a0\uc9dc\uc640 \uae30\uac04\uc744 \uace0\ub824\ud574\uc11c \uc544\ub798\uc758 \uc9c8\ubb38\uc5d0 \ub300\ud55c \ub2f5\ubcc0\ub9cc \ud574\uc918. \ucd94\uac00\uc801\uc778 \uc124\uba85 \ud544\uc694\uc5c6\uc5b4.\n        1.\ud559\uc0dd\uc774\ub984\n        2.\uc2e0\uccad\ub0a0\uc9dc(\uae30\uac04)\n        3.\ubaa9\uc801\uc9c0\n        4.\ubcf4\ud638\uc790 \ud639\uc740 \uc778\uc194\uc790 \uc804\ud654\ubc88\ud638"):X.includes("\uccb4\ud5d8")&&X.includes("\ud559\uc2b5")&&X.includes("\ubcf4\uace0\uc11c")?(console.log(X),qe(X,"\uc774\ub807\uac8c ocr\ub85c \uc778\uc2dd\ud55c text\uac00 \uc788\ub294\ub370 \uc774 \ub0b4\uc6a9\uc744 \uc790\uc138\ud788 \ubd84\uc11d\ud574\ubd10. \uadf8\ub9ac\uace0 \uccb4\ud5d8\ud559\uc2b5 \ub0a0\uc9dc(\ud639\uc740 \uae30\uac04)\uc744 \uace0\ub824\ud574\uc11c \uc544\ub798\uc758 \uc9c8\ubb38\uc5d0 \ub300\ud55c \ub2f5\ubcc0\ub9cc \ud574\uc918. \ucd94\uac00\uc801\uc778 \uc124\uba85 \ud544\uc694\uc5c6\uc5b4.\n          1.\ud559\uc0dd\uc774\ub984\n          2.\uc2e0\uccad\ub0a0\uc9dc(\uae30\uac04)\n          ")):(console.log(X),qe(X,'\uc774\ub807\uac8c ocr\ub85c \uc778\uc2dd\ud55c text\uac00 \uc788\ub294\ub370 \uc774 \ub0b4\uc6a9\uc744 \uc790\uc138\ud788 \ubd84\uc11d\ud574\ubd10. \uadf8\ub9ac\uace0 \uc2e0\uccad\ub0a0\uc9dc\uc5d0 \uc788\ub294 \ub0a0\uc9dc\uc640 \uae30\uac04\uc744 \uace0\ub824\ud574\uc11c \uc544\ub798\uc758 \uc9c8\ubb38\uc5d0 \ub300\ud55c \ub2f5\ubcc0\ub9cc \ud574\uc918. \uc544\ub798\uc758 3\ubc88 \uc11c\ub958 \uc81c\ubaa9\uc740 "OO\uc73c\ub85c \uc778\ud55c (\uc9c8\ubcd1\uacb0\uc11d/\uacbd\uc870\uc0ac/\uc778\uc815\uacb0\uc11d/\uc870\ud1f4/\uc9c0\uac01/\uae30\ud0c0\uacb0\uc11d)"\uc73c\ub85c \ub9cc\ub4e4\uc5b4\uc918. \ucd94\uac00\uc801\uc778 \uc124\uba85 \ud544\uc694\uc5c6\uc5b4.\n          1.\ud559\uc0dd\uc774\ub984\n          2.\uc2e0\uccad\ub0a0\uc9dc(\uae30\uac04)\n          3.\uc11c\ub958\uc81c\ubaa9(\uc608\uc2dc "\uac10\uae30\ub85c \uc778\ud55c \uc9c8\ubcd1\uacb0\uc11d")\n          ')):"\uc0c1\ub2f4"===q&&We(X))}),[X]);var Le=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var n,r,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target.files[0]){e.next=3;break}return e.abrupt("return");case 3:return Ve(),ie(!0),r=new FileReader,e.next=8,Ae(n);case 8:i=e.sent,r.readAsDataURL(i),r.onloadend=function(e){var t=r.result;Oe(e.currentTarget.result),Be(t.split(",")[1])};case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ke=function(e){return(0,C.jsx)(m.Z,{name:e,className:"mobileMain-x",onclick:Ue,title:e})},Qe=function(e){return(0,C.jsx)(m.Z,{name:H&&F===e?"\uc911\uc9c0":e,icon:H&&F===e?(0,C.jsx)("i",{className:"fa-solid fa-microphone-slash"}):(0,C.jsx)("i",{className:"fa-solid fa-microphone"}),title:e,className:"mobileMain-x",onclick:function(t){P(e),function(e){if("webkitSpeechRecognition"in window){var t=M||new window.webkitSpeechRecognition;M||(t.lang="ko-KR",t.onresult=function(e){var n=e.results[0][0].transcript;t.stop(),U(!1),Q(n)},D(t)),H?(t.stop(),U(!1)):(null===t||void 0===t||t.start(),U(!0))}else alert("\uc74c\uc131 \uc778\uc2dd API\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294 \ube0c\ub77c\uc6b0\uc800\uc785\ub2c8\ub2e4.")}()},style:H&&F===e?{color:"red"}:{}})},Ge=function(e){return j().fire({title:"\uc800\uc7a5\uc644\ub8cc!",html:"".concat(e,"\uc5d0<br/> \ub0b4\uc6a9\uc774 \uc800\uc7a5\ub418\uc5c8\uc2b5\ub2c8\ub2e4!<br/>(3\ucd08\ud6c4 \uc790\ub3d9 \ub2eb\ud798)"),timer:3e3,icon:"success",confirmButtonText:"\ud655\uc778"})},$e=function(){return j().fire("\uc800\uc7a5\uc2e4\ud328!","\ubc18\ubcf5\uc801\uc73c\ub85c \uc800\uc7a5\uc774 \uc2e4\ud328\ud560 \uacbd\uc6b0 kerbong@gmail.com\uc73c\ub85c \uc99d\uc0c1\uc744 \uc124\uba85\ud574\uc8fc\uc138\uc694!","warning")},Xe=function(){var t=(0,o.Z)((0,a.Z)().mark((function t(n){var i,o,u,s,l,c,d;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u=(0,x.JU)(g.wO,"memo",e.userUid),t.next=3,(0,x.QT)(u);case 3:return s=t.sent,l=(0,r.Z)(null===s||void 0===s||null===(i=s.data())||void 0===i?void 0:i.memoTodo),c=null===n||void 0===n||null===(o=n.split(" "))||void 0===o?void 0:o.filter((function(e){return e.includes("\uc911\uc694")||e.includes("\uae34\uae09")})),l.unshift({id:+(l.length+1),text:n,checked:!1,emg:(null===c||void 0===c?void 0:c.length)>0}),t.prev=7,d={memoTodo:l},t.next=11,(0,x.pl)(u,d);case 11:Ge("\ud560\uc77c \ubaa9\ub85d"),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(7),$e();case 17:Q(""),P("");case 19:case"end":return t.stop()}}),t,null,[[7,14]])})));return function(e){return t.apply(this,arguments)}}();var et=function(e){var t,n,r,i,a,o,u=/(\d{1,2})\uad50\uc2dc\uc5d0?/g,s=/\ub2e4\uc74c \ub2ec|\ub2e4\uc74c\ub2ec/g;if(r=/(\d{1,2})\uc6d4 (\d{1,2})\uc77c/g.exec(e))n=y()("".concat(y()().year(),"-").concat(r[1],"-").concat(r[2])),e=e.replace(r[0],"").trim();else if(i=/(\d{1,2})\uc77c/g.exec(e))n=y()().date(i[1]),e=e.replace(i[0],"").trim();else if(o=/(\ub2e4\uc74c \uc8fc|\ub2e4\uc74c\uc8fc|\uc774\ubc88\uc8fc|\uc774\ubc88 \uc8fc|\ub2e4\uc74c \ub2ec|\ub2e4\uc74c\ub2ec|\uc774\ubc88 \ub2ec|\uc774\ubc88\ub2ec) (\S\uc694\uc77c)/g.exec(e)){var l="\ub2e4\uc74c\uc8fc"===o[1]?1:0,c=function(e){return["\uc77c\uc694\uc77c","\uc6d4\uc694\uc77c","\ud654\uc694\uc77c","\uc218\uc694\uc77c","\ubaa9\uc694\uc77c","\uae08\uc694\uc77c","\ud1a0\uc694\uc77c"].indexOf(e)}(o[2]);n=y()().startOf("week").add(l,"week").add(c,"day"),e=e.replace(o[0],"").trim()}else n=y()();s.test(e)&&(n=n.add(1,"month"),e=e.replace(s,"").trim());for(var d="";a=u.exec(e);)d+="".concat(a[1],"\uad50\uc2dc "),e=e.replace(a[0],"").trim();return{new_date:n=n.format("YYYY-MM-DD"),new_text:e.trim(),new_note:(null===(t=d.trim())||void 0===t?void 0:t.length)>0?d.trim()+"@":""}},tt=function(){var t=(0,o.Z)((0,a.Z)().mark((function t(n){var r,i,o,u,s,l,c,d,f,p,v,m,h;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=(0,x.JU)(g.wO,"todo",e.userUid),t.next=3,(0,x.QT)(i);case 3:return o=t.sent,u=(null===o||void 0===o||null===(r=o.data())||void 0===r?void 0:r.todo_data)||[],s=null===n||void 0===n?void 0:n.split(" "),c=y()().format("YYYY-MM-DD"),"","2\uc790\uccb4\ud589\uc0ac",f=et(n),p=f.new_date,v=f.new_text,m=f.new_note,c=p,l=v,d=m,null===s||void 0===s||s.forEach((function(e){e.includes("\uc624\ub298")?c=y()().format("YYYY-MM-DD"):e.includes("\ub0b4\uc77c")?c=y()().add(1,"d").format("YYYY-MM-DD"):e.includes("\ubaa8\ub808")&&(c=y()().add(2,"d").format("YYYY-MM-DD"))})),h={id:c+l,eventName:l,note:d,option:"2\uc790\uccb4\ud589\uc0ac"},t.prev=15,u.push(h),t.next=19,(0,x.pl)(i,{todo_data:u});case 19:Ge("\uba54\ubaa8 \uc77c\uc815"),t.next=25;break;case 22:t.prev=22,t.t0=t.catch(15),$e();case 25:Q(""),P("");case 27:case"end":return t.stop()}}),t,null,[[15,22]])})));return function(e){return t.apply(this,arguments)}}();(0,s.useEffect)((function(){if(""!==K){var e=F,t=K;"\ud560\uc77c"===e?Xe(t):"\uc77c\uc815"===e&&tt(t)}}),[K]);var nt=function(){var t=(0,o.Z)((0,a.Z)().mark((function t(n){var o,s,l,c,d,f,p,v,m,h,b,w,Z,_,k,S;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!==(null===ke||void 0===ke?void 0:ke[1])?(d=(0,u.Z)(ke,2),l=d[0],c=d[1]):(l=null===ke||void 0===ke?void 0:ke[0],c=null===ke||void 0===ke?void 0:ke[0]),0!==l.getDay()&&6!==l.getDay()){t.next=4;break}return j().fire({icon:"error",title:"\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694!",html:"\ud1a0 / \uc77c\uc694\uc77c\uc740 \uc800\uc7a5\uc774 \ubd88\uac00\ub2a5\ud569\ub2c8\ub2e4. <br>\ub0a0\uc9dc\ub97c \ud655\uc778, \ubcc0\uacbd\ud574\uc8fc\uc138\uc694",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"}),t.abrupt("return");case 4:if(f=[],p=l,m=y()(l).format("YYYY-MM-DD")+we.num+" "+y()().format("HH:mm"),h="2\uc9c8\ubcd1\uacb0\uc11d",l===c)b=y()(l).format("YYYY-MM-DD"),v=b+we.num+" "+y()().format("HH:mm"),f.push(v);else for(;p<=c;)0===p.getDay()||6===p.getDay()||(w=y()(p).format("YYYY-MM-DD"),v=w+we.num+" "+y()().format("HH:mm"),f.push(v)),p.setDate(p.getDate()+1);return Z=(0,x.JU)(g.wO,"attend",e.userUid),t.next=12,(0,x.QT)(Z);case 12:return _=t.sent,k=(0,r.Z)(null===_||void 0===_||null===(o=_.data())||void 0===o?void 0:o.attend_data),"request"===n?f.forEach((function(e){var t,n;0===(null===(t=k)||void 0===t?void 0:t.filter((function(t){return t.id.slice(0,11)===e.slice(0,11)&&"1\ud604\uc7a5\uccb4\ud5d8"===t.option}))).length?k.push((0,i.Z)((0,i.Z)({},we),{},{note:xe[2]+xe[3],id:e})):k=null===(n=k)||void 0===n?void 0:n.map((function(t){var n=t;return t.id.slice(0,11)===e.slice(0,11)&&"1\ud604\uc7a5\uccb4\ud5d8"===t.option&&(n.request=!0),n}))})):"report"===n?f.forEach((function(e){var t,n;0===(null===(t=k)||void 0===t?void 0:t.filter((function(t){return t.id.slice(0,11)===e.slice(0,11)&&"1\ud604\uc7a5\uccb4\ud5d8"===t.option}))).length?k.push((0,i.Z)((0,i.Z)({},we),{},{note:"",id:e})):k=null===(n=k)||void 0===n?void 0:n.map((function(t){var n=t;return t.id.slice(0,11)===e.slice(0,11)&&"1\ud604\uc7a5\uccb4\ud5d8"===t.option&&(n.report=!0),n}))})):(n.includes("\uacb0\uc11d")?n.includes("\uc9c8\ubcd1")?h="2\uc9c8\ubcd1\uacb0\uc11d":n.includes("\uc778\uc815")?h="5\uc778\uc815\uacb0\uc11d":n.includes("\uae30\ud0c0")&&(h="6\uae30\ud0c0\uacb0\uc11d"):n.includes("\uc870\ud1f4")?h="7\uc870\ud1f4":n.includes("\uc9c0\uac01")?h="8\uc9c0\uac01":n.includes("\uacbd\uc870\uc0ac")&&(h="4\uacbd\uc870\uc0ac"),f.forEach((function(e){var t,r;0===(null===(t=k)||void 0===t?void 0:t.filter((function(t){return t.id.slice(0,11)===e.slice(0,11)&&t.option===h}))).length?k.push((0,i.Z)((0,i.Z)({},we),{},{note:n||"",id:e,option:h})):k=null===(r=k)||void 0===r?void 0:r.map((function(t){var n=t;return t.id.slice(0,11)===e.slice(0,11)&&t.option===h&&(n.paper=!0),n}))}))),t.next=17,(0,x.pl)((0,x.JU)(g.wO,"attend",e.userUid),{attend_data:k});case 17:return Ge("\ucd9c\uacb0"),S="request"===n?"".concat(e.userUid,"/attend/").concat(m,"/request"):"report"===n?"".concat(e.userUid,"/attend/").concat(m,"/report"):"".concat(e.userUid,"/attend/").concat(m,"/").concat(null===(s=h)||void 0===s?void 0:s.slice(1)),t.next=21,(0,N.sf)((0,N.iH)(g.Hw,S),Ye,"data_url");case 21:ge(null),Se(null),ee("");case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function rt(e){return e.match(/\d{4}\ub144 \d{1,2}\uc6d4 \d{1,2}\uc77c/g).map((function(e){var t=e.match(/\d+/g),n=(0,u.Z)(t,3),r=n[0],i=n[1],a=n[2];return new Date("".concat(r,"-").concat(i.padStart(2,"0"),"-").concat(a.padStart(2,"0")))}))}return(0,s.useEffect)((function(){null===xe&&(Ze(null),ee(""))}),[xe]),(0,s.useEffect)((function(){var e=document.getElementById("custom-input");e&&(e.style.fontWeight="bold")}),[]),(0,C.jsxs)("div",{className:l,children:[null!==xe&&(0,C.jsx)(Y.Z,{onClose:function(){ge(null)},title:4===(null===xe||void 0===xe?void 0:xe.length)?"\uccb4\ud5d8\ud559\uc2b5 \uc2e0\uccad\uc11c \ub0b4\uc6a9\ud655\uc778":2===(null===xe||void 0===xe?void 0:xe.length)?"\uccb4\ud5d8\ud559\uc2b5 \ubcf4\uace0\uc11c \ub0b4\uc6a9 \ud655\uc778":3===(null===xe||void 0===xe?void 0:xe.length)?xe[2]:"",addStyle:"",text:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)("div",{children:[(0,C.jsx)("span",{children:"\ud559\uc0dd\uc774\ub984(\ud074\ub9ad\ud574\uc11c \uc218\uc815)"}),(0,C.jsx)("br",{}),(0,C.jsx)("span",{style:{fontWeight:"bold",margin:"10px"},onClick:function(){return We(!0)},children:xe[0]})]}),(0,C.jsx)("br",{}),(0,C.jsxs)("div",{className:v,children:[(0,C.jsx)("span",{children:"\ub0a0\uc9dc(\ud074\ub9ad\ud574\uc11c \uc218\uc815)"}),(0,C.jsx)("span",{style:{margin:"10px"},children:(0,C.jsx)(O.Z,{setStart:(null===ke||void 0===ke?void 0:ke[0])||new Date,setEnd:(null===ke||void 0===ke?void 0:ke[1])||(null===ke||void 0===ke?void 0:ke[0])||new Date,getDateValue:function(e){Se(e)},about:"attendance",getMonthValue:function(){}})})]}),3===(null===xe||void 0===xe?void 0:xe.length)&&(0,C.jsxs)("div",{children:[(0,C.jsx)("span",{children:"\uc0ac\uc720"}),(0,C.jsx)("br",{}),(0,C.jsx)("span",{style:{fontWeight:"bold",margin:"10px"},children:(0,C.jsx)(I.Z,{className:"gptResult-input",getValue:!0,getValueHandler:function(e){var t=e.target.value,n=(0,r.Z)(xe);n[2]=t,ge(n)},defaultValue:xe[2],input:{type:"text"}})})]}),4===(null===xe||void 0===xe?void 0:xe.length)&&(0,C.jsxs)("div",{children:[(0,C.jsx)("span",{children:"\ubaa9\uc801\uc9c0"}),(0,C.jsx)("br",{}),(0,C.jsx)("span",{style:{fontWeight:"bold",margin:"10px"},children:(0,C.jsx)(I.Z,{className:"gptResult-input",getValue:!0,getValueHandler:function(e){var t=e.target.value,n=(0,r.Z)(xe);n[2]=t,ge(n)},defaultValue:xe[2],input:{type:"text"}})})]}),(0,C.jsx)("br",{}),4===(null===xe||void 0===xe?void 0:xe.length)&&(0,C.jsxs)("div",{children:[(0,C.jsx)("span",{children:"\ubcf4\ud638\uc790 \uc5f0\ub77d\ucc98"}),(0,C.jsx)("br",{}),(0,C.jsx)("span",{style:{fontWeight:"bold",margin:"10px"},children:(0,C.jsx)(I.Z,{className:"gptResult-input",getValue:!0,getValueHandler:function(e){var t=e.target.value,n=(0,r.Z)(xe);n[3]=t,ge(n)},defaultValue:xe[3],input:{type:"text"}})})]}),(0,C.jsx)("br",{}),(0,C.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,C.jsx)(m.Z,{name:"\ucde8\uc18c",className:"mobileMain-x",onclick:function(){ge(null)}}),(0,C.jsx)(m.Z,{name:"\uc800\uc7a5",className:"mobileMain-x",onclick:function(){var e=4===(null===xe||void 0===xe?void 0:xe.length)?"request":2===(null===xe||void 0===xe?void 0:xe.length)?"report":3===(null===xe||void 0===xe?void 0:xe.length)?xe[2]:"";nt(e)}})]})]})}),(0,C.jsxs)("div",{className:c,children:[!H&&"\ud14c\uc2a4\ud2b8 \uc911\uc785\ub2c8\ub2e4.",H&&"\uc77c\uc815"===F&&(0,C.jsxs)("div",{children:[(0,C.jsx)("br",{}),(0,C.jsx)("b",{children:"[\uba54\ubaa8] - [\uc77c\uc815] \uc74c\uc131\ub4f1\ub85d"}),(0,C.jsx)("br",{}),(0,C.jsx)("br",{}),(0,C.jsx)("b",{children:"\uc608)"})," '3\uc6d4 8\uc77c 4\uad50\uc2dc 1\ud559\uae30 \ud68c\uc7a5\ubd80\ud68c\uc7a5 \uc120\uac70'",(0,C.jsx)("br",{}),(0,C.jsx)("br",{}),(0,C.jsx)("b",{children:"\uc608)"})," '\uc774\ubc88\uc8fc \uae08\uc694\uc77c \uc624\ud6c4 3\uc2dc ",(0,C.jsx)("br",{}),"\uacfc\ud559\uc2e4\uc5d0\uc11c \uad50\uc9c1\uc6d0\ud68c\uc758'"]}),H&&"\ud560\uc77c"===F&&(0,C.jsxs)("div",{children:[(0,C.jsx)("br",{}),(0,C.jsx)("b",{children:"[\uba54\ubaa8] - [\ud560\uc77c] \uc74c\uc131\ub4f1\ub85d"}),(0,C.jsx)("br",{}),(0,C.jsx)("br",{}),(0,C.jsx)("b",{children:"\uc608)"})," '3\uc2dc\uae4c\uc9c0 \ud559\uc0dd\uba85\ubd80\ud30c\uc77c \uc81c\ucd9c'",(0,C.jsx)("br",{}),(0,C.jsx)("br",{}),(0,C.jsx)("b",{children:"\uc608)"})," '\ub3c5\uc11c\ub85d \uc81c\ucd9c \uc548\ub0b4'"]}),re&&(0,C.jsxs)("div",{className:d,children:[(0,C.jsxs)("span",{className:""===X?p:f,children:["\ud14d\uc2a4\ud2b8 \uc778\uc2dd\uc911",(0,C.jsx)("br",{}),"*\ucd5c\ub300 5\ucd08 \uc18c\uc694"]}),(0,C.jsx)("span",{children:"\xa0\xa0 \ud83d\udc49\ud83c\udffc \xa0\xa0"}),(0,C.jsxs)("span",{className:""!==X?p:f,children:["GPT \ud30c\uc77c \ubd84\uc11d\uc911",(0,C.jsx)("br",{}),"*\ucd5c\ub300 10\ucd08 \uc18c\uc694"]})]})]}),(0,C.jsx)("input",{type:"file",accept:"image/*;capture=camera",style:{display:"none"},ref:Ee,onChange:Le}),(0,C.jsx)(m.Z,{name:"PC \uba54\uc778\ud654\uba74",className:"mobileMain-2x",onclick:function(){return Re("/main")}}),!b&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(m.Z,{name:"\uc67c\ucabd\uc73c\ub85c \uc62e\uae30\uae30 \ud83d\udc48\ud83c\udffc",className:"mobileMain-move",onclick:function(){return Z(!0)}}),Qe("\uc77c\uc815"),Qe("\ud560\uc77c"),(0,C.jsx)(m.Z,{name:"",className:"mobileMain-x",style:{backgroundColor:"inherit"}}),Ke("\uc0c1\ub2f4"),!Ie&&Ke("\ucd9c\uacb0")]}),b&&(0,C.jsxs)(C.Fragment,{children:[Qe("\ud560\uc77c"),Qe("\uc77c\uc815"),(0,C.jsx)(m.Z,{name:"\uc624\ub978\ucabd\uc73c\ub85c \uc62e\uae30\uae30 \ud83d\udc49\ud83c\udffc",className:"mobileMain-move",onclick:function(){return Z(!1)}}),!Ie&&Ke("\ucd9c\uacb0"),Ke("\uc0c1\ub2f4"),(0,C.jsx)(m.Z,{name:"",className:"mobileMain-x",style:{backgroundColor:"inherit"}})]})]})}},63038:function(e){e.exports=function(){"use strict";var e="week",t="year";return function(n,r,i){var a=r.prototype;a.week=function(n){if(void 0===n&&(n=null),null!==n)return this.add(7*(n-this.week()),"day");var r=this.$locale().yearStart||1;if(11===this.month()&&this.date()>25){var a=i(this).startOf(t).add(1,t).date(r),o=i(this).endOf(e);if(a.isBefore(o))return 1}var u=i(this).startOf(t).date(r).startOf(e).subtract(1,"millisecond"),s=this.diff(u,e,!0);return s<0?i(this).startOf("week").week():Math.ceil(s)},a.weeks=function(e){return void 0===e&&(e=null),this.week(e)}}}()},46146:function(e){e.exports=function(){"use strict";return function(e,t){t.prototype.weekday=function(e){var t=this.$locale().weekStart||0,n=this.$W,r=(n<t?n+7:n)-t;return this.$utils().u(e)?r:this.subtract(r,"day").add(e,"day")}}}()},95162:function(e,t,n){"use strict";var r;n.d(t,{Z:function(){return d}});var i=new Uint8Array(16);function a(){if(!r&&!(r="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(i)}var o=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var u=function(e){return"string"===typeof e&&o.test(e)},s=[],l=0;l<256;++l)s.push((l+256).toString(16).substr(1));var c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase();if(!u(n))throw TypeError("Stringified UUID is invalid");return n};var d=function(e,t,n){var r=(e=e||{}).random||(e.rng||a)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(var i=0;i<16;++i)t[n+i]=r[i];return t}return c(r)}}}]);