"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[771],{75771:function(e,t,n){n.r(t),n.d(t,{default:function(){return O}});var r=n(4942),i=n(74165),s=n(1413),a=n(15861),c=n(70885),o=n(47313),u=n(80650),l=n(90573),d=n(37692),f="Profile_explain-h3__o1J3z",m="Profile_loginEmail-p__9fIuM",h="Profile_userProfile-form__V3DYF",v="Profile_nickName-input__BxOgC",x="Profile_stateMessage-textarea__2jrPU",j="Profile_explain-p__VDdJx",b="Profile_checkLabel__97iXn",p="Profile_check-h3__6KrVp",k="Profile_checkLabel-checked__FRTOC",g="Profile_check-input__3m7Kx",_=n(67114),N=n.n(_),Z=n(10658),S=n.n(Z),y=n(68570),w=n(46417),O=function(e){var t,n,_,Z,O,Y,M=(0,o.useState)({}),P=(0,c.Z)(M,2),D=P[0],B=P[1],C=(0,o.useState)({}),I=(0,c.Z)(C,2),T=I[0],E=I[1],J=(0,o.useState)(""),L=(0,c.Z)(J,2),V=L[0],U=L[1],z=function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){var n,r,a,c,o;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=(0,l.JU)(u.wO,"user",e.user.uid),t.next=3,(0,l.QT)(n);case 3:(r=t.sent).exists()&&(E((0,s.Z)({},r.data())),B((0,s.Z)((0,s.Z)({},r.data()),{},{isSubject:null===(a=r.data())||void 0===a||null===(c=a.isSubject)||void 0===c||null===(o=c.filter((function(e){return Object.keys(e)[0]===Q()})))||void 0===o?void 0:o[0]})));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();(0,o.useEffect)((function(){z()}),[]);var Q=function(){return S()().format("MM-DD")<="02-15"?String(+S()().format("YYYY")-1):S()().format("YYYY")},F=function(e,t,n){N().fire({icon:e,title:t,html:n,confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"})},G=function(){var t=(0,a.Z)((0,i.Z)().mark((function t(n){var a,c,o,d,f,m,h,v,x,j,b,p,k,g,_,N,Z,y,w,O,Y;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!((v=localStorage.getItem("profile"+S()().format("YY-MM-DD")+e.user.email))>=2)){t.next=5;break}return F("error","\uc800\uc7a5\ud69f\uc218 \ucd08\uacfc","\ud558\ub8e8\uc5d0 \ub450 \ubc88\ub9cc \ud504\ub85c\ud544 \uc218\uc815\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4. \ub0b4\uc77c \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694!"),t.abrupt("return",!1);case 5:return j=!1,b=(0,l.JU)(u.wO,"user",e.user.uid),t.next=9,(0,l.QT)(b);case 9:if((p=t.sent).exists()?x=p.data():(x={},j=!0),0!==Object.values(D).length){t.next=14;break}return F("error","\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694!","\uc785\ub825\ub41c \ub0b4\uc6a9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \ud655\uc778\ud574\uc8fc\uc138\uc694!"),t.abrupt("return",!1);case 14:if(0!==(null===(a=D.nickName)||void 0===a?void 0:a.trim().length)){t.next=17;break}return F("error","\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694!","\ub2c9\ub124\uc784\uc740 \ud544\uc218 \uc785\ub825 \uc0ac\ud56d\uc785\ub2c8\ub2e4! \ud655\uc778\ud574\uc8fc\uc138\uc694."),t.abrupt("return",!1);case 17:return k=(0,l.JU)(u.wO,"user","nickNames"),t.next=20,(0,l.QT)(k);case 20:if(g=t.sent,_=g.data().nickNames_data,N=null===(c=x)||void 0===c?void 0:c.nickName,j||(_=null===(Z=_)||void 0===Z?void 0:Z.filter((function(e){return e!==N}))),!((null===(o=_)||void 0===o?void 0:o.filter((function(e){var t;return e===(null===(t=D.nickName)||void 0===t?void 0:t.trim())}))).length>0)){t.next=28;break}return F("error","\ub2c9\ub124\uc784 \uc911\ubcf5","\uc774\ubbf8 \uc874\uc7ac\ud558\ub294 \ub2c9\ub124\uc784\uc785\ub2c8\ub2e4! \ub2e4\ub978 \uc774\ub984\uc73c\ub85c \ubcc0\uacbd\ud574\uc8fc\uc138\uc694!"),t.abrupt("return",!1);case 28:if(F("success","\uc800\uc7a5\ub418\uc5c8\uc5b4\uc694!","\uc790\ub8cc\uac00 \uc218\uc815/\uc800\uc7a5\ub418\uc5c8\uc2b5\ub2c8\ub2e4!"),D.isSubject||(D.isSubject=(0,r.Z)({},Q(),!1)),y=[],null===(d=x)||void 0===d||null===(f=d.isSubject)||void 0===f||f.forEach((function(e){Object.keys(e)[0]!==Object.keys(D.isSubject)[0]&&y.push(e)})),void 0===y||0===(null===(m=y)||void 0===m?void 0:m.length)?y=[D.isSubject]:y.push(D.isSubject),w=y,O=(0,s.Z)((0,s.Z)({},D),{},{isSubject:w}),!j){t.next=40;break}return t.next=38,(0,l.pl)(b,O);case 38:t.next=42;break;case 40:return t.next=42,(0,l.r7)(b,O);case 42:return _.push(null===(h=D.nickName)||void 0===h?void 0:h.trim()),Y=_,t.next=46,(0,l.r7)(k,{nickNames_data:Y});case 46:e.profileHandler(),localStorage.setItem("profile"+S()().format("YY-MM-DD")+e.user.email,v+1);case 48:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),K=function(e,t){"nickName"===t?B((function(t){return(0,s.Z)((0,s.Z)({},t),{},{nickName:e.target.value})})):"stateMessage"===t?B((function(t){return(0,s.Z)((0,s.Z)({},t),{},{stateMessage:e.target.value})})):e.target.checked?B((function(e){return(0,s.Z)((0,s.Z)({},e),{},{isSubject:(0,r.Z)({},Q(),!0)})})):B((function(e){return(0,s.Z)((0,s.Z)({},e),{},{isSubject:(0,r.Z)({},Q(),!1)})}))};return(0,o.useEffect)((function(){e.user.providerData.forEach((function(e){"password"===e.providerId&&"google.com"===e.providerId?U("email & Google\uc5f0\ub3d9"):"google.com"===e.providerId?U("Google\uc5f0\ub3d9"):"password"===e.providerId&&U("email")}))}),[]),(0,w.jsxs)("div",{children:[(0,w.jsxs)("form",{className:h,onSubmit:G,style:{marginTop:"30px"},children:[(0,w.jsx)("h3",{children:"\ub2c9\ub124\uc784"}),(0,w.jsx)("input",{onChange:function(e){return K(e,"nickName")},className:v,placeholder:"",type:"text",defaultValue:D.nickName||"",maxLength:12},"nickName"),(0,w.jsx)("h3",{children:"\uc0c1\ud0dc\uba54\uc138\uc9c0"}),(0,w.jsx)("textarea",{onChange:function(e){return K(e,"stateMessage")},className:x,defaultValue:D.stateMessage||"",maxLength:50}),(0,w.jsxs)("div",{children:[(0,w.jsxs)("h3",{className:p,children:[(0,w.jsxs)("label",{className:"".concat(b," ").concat((null===D||void 0===D||null===(t=D.isSubject)||void 0===t?void 0:t[Q()])&&k),children:[(0,w.jsx)("input",{className:g,onChange:function(e){return K(e,"isSubject")},value:(null===D||void 0===D||null===(n=D.isSubject)||void 0===n?void 0:n[Q()])||"",checked:!(null===D||void 0===D||null===(_=D.isSubject)||void 0===_||!_[Q()]),type:"checkbox"},"isSub")," "]}),"\uc774\ubc88\ud559\ub144\ub3c4 \uc804\ub2f4\uad50\uc0ac"]}),0===Object.keys(T).length&&(0,w.jsxs)("h3",{className:f,children:[" ","* \ud504\ub85c\ud544\uc744 \uc785\ub825\ud558\uc2e0 \ud6c4\uc5d0 ",(0,w.jsx)("br",{})," \uc11c\ube44\uc2a4 \uc774\uc6a9\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4. ",(0,w.jsx)("br",{}),(0,w.jsx)("br",{}),"\ub0b4\uc6a9\uc744 \uc785\ub825\ud558\uc2dc\uace0 [\uc800\uc7a5]\ud574\uc8fc\uc138\uc694!"]}),0!==Object.keys(T).length&&0===(null===(Z=T)||void 0===Z||null===(O=Z.isSubject)||void 0===O||null===(Y=O.filter((function(e){return Object.keys(e)[0]===Q()})))||void 0===Y?void 0:Y.length)&&(0,w.jsxs)("h3",{className:f,children:[" ","* 2\uc6d4\ubd80\ud130 \uc0c8\ub85c\uc6b4 \ud559\ub144\ub3c4\ub85c \uc778\uc2dd\ub429\ub2c8\ub2e4. ",(0,w.jsx)("br",{}),"\uc774\ubc88\ud559\ub144\ub3c4 \uc804\ub2f4\uad50\uc0ac \uc5ec\ubd80\ub97c \ud655\uc778\ud558\uc2dc\uace0 ",(0,w.jsx)("br",{}),"[\uc800\uc7a5] \ud574\uc8fc\uc138\uc694!",(0,w.jsx)("br",{}),(0,w.jsx)("br",{}),"* \uc804\ub2f4\uc774 \uc544\ub2c8\uc2e0 \uacbd\uc6b0 \uadf8\ub0e5 [\uc800\uc7a5] \ud574\uc8fc\uc138\uc694!"]})]}),(0,w.jsx)(d.Z,{name:"\uc800\uc7a5",id:"userInfo-saveBtn",className:"add-event-button",style:{width:"73%"},onclick:G}),(0,w.jsx)("hr",{style:{width:"73%"}})]}),(0,w.jsxs)("div",{className:h,children:[(0,w.jsxs)("div",{className:p,children:[(0,w.jsxs)("div",{children:[(0,w.jsx)("p",{className:m,children:"\ud604\uc7ac \ub85c\uadf8\uc778 \uc544\uc774\ub514"}),(0,w.jsx)("p",{className:m,children:e.user.email})]}),(0,w.jsx)("div",{children:(0,w.jsx)(d.Z,{name:V,className:"add-event-button",style:{fontSize:"1rem"},onclick:function(){return N().fire("\uac00\uc785 & \ub85c\uadf8\uc778 \ubc29\uc2dd","".concat(V," \ubc29\uc2dd\uc744 \uc0ac\uc6a9\ud574\uc11c \uac00\uc785, \ub85c\uadf8\uc778 \ud558\uc2e0 \uc0c1\ud0dc\uc785\ub2c8\ub2e4."),"info")}})}),(0,w.jsx)("div",{children:(0,w.jsx)(d.Z,{name:"\ube44\ubc00\ubc88\ud638 \ubcc0\uacbd",id:"userInfo-saveBtn",className:"add-event-button",style:{fontSize:"1rem"},onclick:function(){N().fire({icon:"question",title:"\uba54\uc77c \uc804\uc1a1",html:"\ube44\ubc00\ubc88\ud638 \ubcc0\uacbd(\uc7ac\uc124\uc815) \uba54\uc77c\uc744 \uc804\uc1a1\ud560\uae4c\uc694?",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c",showDenyButton:!0}).then((function(t){t.isConfirmed&&(0,y.LS)(u.ON,e.user.email).then((function(){console.log("email sent"),N().fire("\uba54\uc77c\uc804\uc1a1 \uc644\ub8cc","\uc774\uba54\uc77c \uc8fc\uc18c ( ".concat(e.user.email," ) \ub85c \ube44\ubc00\ubc88\ud638 \uc7ac\uc124\uc815 \uba54\uc77c\uc774 \uc804\uc1a1\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),"success")}))}))}})})]}),(0,w.jsx)("hr",{style:{width:"73%"}})]}),(0,w.jsxs)("p",{className:j,style:{marginBottom:"50px"},children:["* \uba54\ub274\uc758 ",(0,w.jsx)("i",{className:"fa-solid fa-user"}),' - "\ud504\ub85c\ud544 \uc218\uc815" \uc744 \ud1b5\ud574 \ud604\uc7ac \ud398\uc774\uc9c0\ub85c \uc774\ub3d9\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.'," "]})]})}}}]);