"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[771],{5771:function(e,t,n){n.r(t),n.d(t,{default:function(){return M}});var r=n(4942),i=n(4165),s=n(1413),a=n(5861),c=n(885),u=n(7313),l=n(9532),o=n(573),d=n(7692),f="Profile_loginEmail-div__c4dVk",h="Profile_explain-h3__o1J3z",m="Profile_loginEmail-p__9fIuM",v="Profile_userProfile-form__V3DYF",x="Profile_nickName-input__BxOgC",b="Profile_stateMessage-textarea__2jrPU",j="Profile_explain-p__VDdJx",k="Profile_checkLabel__97iXn",p="Profile_check-h3__6KrVp",_="Profile_checkLabel-checked__FRTOC",g="Profile_check-input__3m7Kx",N=n(7114),Z=n.n(N),S=n(658),P=n.n(S),Y=n(6417),M=function(e){var t,n,N,S,M,O,y=(0,u.useState)({}),w=(0,c.Z)(y,2),C=w[0],D=w[1],V=(0,u.useState)({}),J=(0,c.Z)(V,2),T=J[0],B=J[1],E=function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){var n,r,a,c,u;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=(0,o.JU)(l.wO,"user",e.user.uid),t.next=3,(0,o.QT)(n);case 3:(r=t.sent).exists()&&(B((0,s.Z)({},r.data())),D((0,s.Z)((0,s.Z)({},r.data()),{},{isSubject:null===(a=r.data())||void 0===a||null===(c=a.isSubject)||void 0===c||null===(u=c.filter((function(e){return Object.keys(e)[0]===I()})))||void 0===u?void 0:u[0]})));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();(0,u.useEffect)((function(){E()}),[]);var I=function(){return+P()().format("MM")<=1?String(+P()().format("YYYY")-1):P()().format("YYYY")},L=function(e,t,n){Z().fire({icon:e,title:t,html:n,confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82"})},U=function(){var t=(0,a.Z)((0,i.Z)().mark((function t(n){var a,c,u,d,f,h,m,v,x,b,j,k,p,_,g,N,Z,S,Y,M,O;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!((v=localStorage.getItem("profile"+P()().format("YY-MM-DD")+e.user.email))>=2)){t.next=5;break}return L("error","\uc800\uc7a5\ud69f\uc218 \ucd08\uacfc","\ud558\ub8e8\uc5d0 \ub450 \ubc88\ub9cc \ud504\ub85c\ud544 \uc218\uc815\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4. \ub0b4\uc77c \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694!"),t.abrupt("return",!1);case 5:return b=!1,j=(0,o.JU)(l.wO,"user",e.user.uid),t.next=9,(0,o.QT)(j);case 9:if((k=t.sent).exists()?x=k.data():(x={},b=!0),0!==Object.values(C).length){t.next=14;break}return L("error","\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694!","\uc785\ub825\ub41c \ub0b4\uc6a9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \ud655\uc778\ud574\uc8fc\uc138\uc694!"),t.abrupt("return",!1);case 14:if(0!==(null===(a=C.nickName)||void 0===a?void 0:a.trim().length)){t.next=17;break}return L("error","\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694!","\ub2c9\ub124\uc784\uc740 \ud544\uc218 \uc785\ub825 \uc0ac\ud56d\uc785\ub2c8\ub2e4! \ud655\uc778\ud574\uc8fc\uc138\uc694."),t.abrupt("return",!1);case 17:return p=(0,o.JU)(l.wO,"user","nickNames"),t.next=20,(0,o.QT)(p);case 20:if(_=t.sent,g=_.data().nickNames_data,N=null===(c=x)||void 0===c?void 0:c.nickName,b||(g=null===(Z=g)||void 0===Z?void 0:Z.filter((function(e){return e!==N}))),!((null===(u=g)||void 0===u?void 0:u.filter((function(e){var t;return e===(null===(t=C.nickName)||void 0===t?void 0:t.trim())}))).length>0)){t.next=28;break}return L("error","\ub2c9\ub124\uc784 \uc911\ubcf5","\uc774\ubbf8 \uc874\uc7ac\ud558\ub294 \ub2c9\ub124\uc784\uc785\ub2c8\ub2e4! \ub2e4\ub978 \uc774\ub984\uc73c\ub85c \ubcc0\uacbd\ud574\uc8fc\uc138\uc694!"),t.abrupt("return",!1);case 28:if(L("success","\uc800\uc7a5\ub418\uc5c8\uc5b4\uc694!","\uc790\ub8cc\uac00 \uc218\uc815/\uc800\uc7a5\ub418\uc5c8\uc2b5\ub2c8\ub2e4!"),C.isSubject||(C.isSubject=(0,r.Z)({},I(),!1)),S=[],null===(d=x)||void 0===d||null===(f=d.isSubject)||void 0===f||f.forEach((function(e){Object.keys(e)[0]!==Object.keys(C.isSubject)[0]&&S.push(e)})),void 0===S||0===(null===(h=S)||void 0===h?void 0:h.length)?S=[C.isSubject]:S.push(C.isSubject),Y=S,M=(0,s.Z)((0,s.Z)({},C),{},{isSubject:Y}),!b){t.next=40;break}return t.next=38,(0,o.pl)(j,M);case 38:t.next=42;break;case 40:return t.next=42,(0,o.r7)(j,M);case 42:return g.push(null===(m=C.nickName)||void 0===m?void 0:m.trim()),O=g,t.next=46,(0,o.r7)(p,{nickNames_data:O});case 46:e.profileHandler(),localStorage.setItem("profile"+P()().format("YY-MM-DD")+e.user.email,v+1);case 48:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Q=function(e,t){"nickName"===t?D((function(t){return(0,s.Z)((0,s.Z)({},t),{},{nickName:e.target.value})})):"stateMessage"===t?D((function(t){return(0,s.Z)((0,s.Z)({},t),{},{stateMessage:e.target.value})})):e.target.checked?D((function(e){return(0,s.Z)((0,s.Z)({},e),{},{isSubject:(0,r.Z)({},I(),!0)})})):D((function(e){return(0,s.Z)((0,s.Z)({},e),{},{isSubject:(0,r.Z)({},I(),!1)})}))};return(0,Y.jsxs)("div",{children:[(0,Y.jsxs)("div",{className:f,children:[(0,Y.jsx)("p",{className:m,children:"\ud604\uc7ac \ub85c\uadf8\uc778 \uc544\uc774\ub514"}),(0,Y.jsx)("p",{className:m,children:e.user.email})]}),(0,Y.jsxs)("form",{className:v,onSubmit:U,children:[(0,Y.jsx)("h3",{children:"\ub2c9\ub124\uc784"}),(0,Y.jsx)("input",{onChange:function(e){return Q(e,"nickName")},className:x,placeholder:"",type:"text",defaultValue:C.nickName||"",maxLength:12},"nickName"),(0,Y.jsx)("h3",{children:"\uc0c1\ud0dc\uba54\uc138\uc9c0"}),(0,Y.jsx)("textarea",{onChange:function(e){return Q(e,"stateMessage")},className:b,defaultValue:C.stateMessage||"",maxLength:50}),(0,Y.jsxs)("div",{children:[(0,Y.jsxs)("h3",{className:p,children:[(0,Y.jsxs)("label",{className:"".concat(k," ").concat((null===C||void 0===C||null===(t=C.isSubject)||void 0===t?void 0:t[I()])&&_),children:[(0,Y.jsx)("input",{className:g,onChange:function(e){return Q(e,"isSubject")},value:(null===C||void 0===C||null===(n=C.isSubject)||void 0===n?void 0:n[I()])||"",checked:!(null===C||void 0===C||null===(N=C.isSubject)||void 0===N||!N[I()]),type:"checkbox"},"isSub")," "]}),"\uc774\ubc88\ud559\ub144\ub3c4 \uc804\ub2f4\uad50\uc0ac"]}),0===Object.keys(T).length&&(0,Y.jsxs)("h3",{className:h,children:[" ","* \ud504\ub85c\ud544\uc744 \uc785\ub825\ud558\uc2e0 \ud6c4\uc5d0 ",(0,Y.jsx)("br",{})," \uc11c\ube44\uc2a4 \uc774\uc6a9\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4. ",(0,Y.jsx)("br",{}),(0,Y.jsx)("br",{}),"\ub0b4\uc6a9\uc744 \uc785\ub825\ud558\uc2dc\uace0 [\uc800\uc7a5]\ud574\uc8fc\uc138\uc694!"]}),0!==Object.keys(T).length&&0===(null===(S=T)||void 0===S||null===(M=S.isSubject)||void 0===M||null===(O=M.filter((function(e){return Object.keys(e)[0]===I()})))||void 0===O?void 0:O.length)&&(0,Y.jsxs)("h3",{className:h,children:[" ","* 2\uc6d4\ubd80\ud130 \uc0c8\ub85c\uc6b4 \ud559\ub144\ub3c4\ub85c \uc778\uc2dd\ub429\ub2c8\ub2e4. ",(0,Y.jsx)("br",{}),"\uc774\ubc88\ud559\ub144\ub3c4 \uc804\ub2f4\uad50\uc0ac \uc5ec\ubd80\ub97c \ud655\uc778\ud558\uc2dc\uace0 ",(0,Y.jsx)("br",{}),"[\uc800\uc7a5] \ud574\uc8fc\uc138\uc694!",(0,Y.jsx)("br",{}),(0,Y.jsx)("br",{}),"* \uc804\ub2f4\uc774 \uc544\ub2c8\uc2e0 \uacbd\uc6b0 \uadf8\ub0e5 [\uc800\uc7a5] \ud574\uc8fc\uc138\uc694!"]})]}),(0,Y.jsx)(d.Z,{name:"\uc800\uc7a5",id:"userInfo-saveBtn",className:"add-event-button",style:{width:"73%"},onclick:U})]}),(0,Y.jsxs)("p",{className:j,children:["* \uba54\ub274\uc758 ",(0,Y.jsx)("i",{className:"fa-solid fa-user"}),' - "\ud504\ub85c\ud544 \uc218\uc815" \uc744 \ud1b5\ud574 \ud604\uc7ac \ud398\uc774\uc9c0\ub85c \uc774\ub3d9\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.'," "]})]})}}}]);