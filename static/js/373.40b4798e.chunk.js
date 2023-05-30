"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[373],{4484:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(1413),i=n(885),a=n(7313),o={"class-subject":"Input_class-subject__E+qGy","rowcolumn-input":"Input_rowcolumn-input__MzKWZ","simsim-Text":"Input_simsim-Text__7+u+1","meetSum-Text":"Input_meetSum-Text__0ijY3","class-memo":"Input_class-memo__eXBTy","attendForm-input":"Input_attendForm-input__KLvku","memo-section":"Input_memo-section__CGRYR","simsimMain-input":"Input_simsimMain-input__TVHos","board-input":"Input_board-input__2xPzk","board-input-half":"Input_board-input-half__Lu9st","fs-80px":"Input_fs-80px__t0quj","fs-70px":"Input_fs-70px__ZcOO7","fs-60px":"Input_fs-60px__QNEgw","fs-50px":"Input_fs-50px__GEaU0","fs-40px":"Input_fs-40px__OICBO","memoAdd-textarea":"Input_memoAdd-textarea__dssNI"},l=n(6417),s=void 0,d=a.forwardRef((function(e,t){var n=(0,a.useRef)(null),d=(0,a.useState)(""),c=(0,i.Z)(d,2),u=c[0],f=c[1],m=(0,a.useState)(""),p=(0,i.Z)(m,2),x=p[0],_=p[1];(0,a.useEffect)((function(){f("")}),[]),(0,a.useEffect)((function(){f(e.defaultValue)}),[e.defaultValue]);var h=function(){var t;return"40px"===e.fontSize?t="10-900":"50px"===e.fontSize?t="9-310":"60px"===e.fontSize?t="8-190":"70px"===e.fontSize?t="7-150":"80px"===e.fontSize&&(t="6-120"),/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)&&(t="25-400"),t},g=function(t){f(n.current.value),e.getValue&&e.getValueHandler(t)};(0,a.useEffect)((function(){!0===e.showOn?_("1"):!1===e.showOn?_("0"):_(e.showOn)}),[e.showOn]),(0,a.useEffect)((function(){"textarea"===e.input.type&&I()}),[x]),(0,a.useEffect)((function(){n.current.style.height=e.startheight}),[e.startheight]);var v=function(){var t,r,i,a,o=null===(t=h())||void 0===t||null===(r=t.split("-"))||void 0===r?void 0:r[0],l=null===(i=h())||void 0===i||null===(a=i.split("-"))||void 0===a?void 0:a[1],s=n.current.value.split("\n"),d=Math.ceil((n.current.clientWidth-50)/(+e.fontSize.slice(0,2)+2)),c=s.length;s.forEach((function(e){var t=Math.floor(e.length/d);t>1&&(c+=t)})),+c>+o?e.maxRowAlert("enter"):n.current.value.length>+l&&e.maxRowAlert("length")};(0,a.useEffect)((function(){""!==e.fontSize&&void 0!==e.fontSize&&v()}),[e.fontSize]);var I=function(t){if(null!==n&&null!==n.current){if(e.alarm)return window.scrollTo(0,n.current.scrollHeight),void v();n.current.style.height="10px",n.current.style.height=n.current.scrollHeight-13+"px"}};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("label",{htmlFor:e.input.id}),"textarea"===e.input.type?(0,l.jsx)("textarea",(0,r.Z)((0,r.Z)({id:e.id,ref:n},e.input),{},{className:o[e.className],onKeyDown:function(){return I(s)},onKeyUp:function(){return I(s)},onClick:function(){return I(s)},value:u||"",onInput:e.onInput,required:!!e.required,onChange:g,placeholder:e.placeholder||""}),"textArea"+e.myKey):(0,l.jsx)("input",(0,r.Z)((0,r.Z)({id:e.input.id,type:e.input.type,required:!!e.required,className:o[e.className],onInput:e.onInput,ref:n},e.input),{},{value:u||"",onChange:g,placeholder:e.placeholder||""}),e.myKey)]})}))},5373:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var r=n(1413),i=n(2982),a=n(885),o=n(7313),l=n(1874),s=n(3451),d=n(4484),c=n(7114),u=n.n(c),f=n(6417),m=["#FFACAC","#FFD9AC","#FFFFAC","#BDFFAC","#ACDEFF","#C8ACFF","#FFFFFF"],p=function(e){var t=e.onClose,n=e.delMemoHandler,r=e.addMemoHandler,i=e.nowMemo,s=e.data,c=e.isTeacher,p=(0,o.useState)("#FFACAC"),x=(0,a.Z)(p,2),_=x[0],h=x[1],g=(0,o.useState)(!1),v=(0,a.Z)(g,2),I=v[0],j=v[1];(0,o.useEffect)((function(){i&&(j(!0),h(i.bgColor))}),[i]);var Z=function(e,t){var n,r;e.target.value.length>t&&(e.target.value=e.target.value.substr(0,t),n="\uc785\ub825 \ubd88\uac00",r="\uae00\uc790\uc218\ub97c \ucd08\uacfc\ud588\uc5b4\uc694! \ub0b4\uc6a9\uc744 ".concat(t,"\uc790 \uc774\ub0b4\ub85c \uc904\uc5ec\uc8fc\uc138\uc694."),u().fire({icon:"error",title:n,text:r,confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}))};return(0,o.useEffect)((function(){s&&(j(!0),h(s.bgColor))}),[s]),(0,o.useEffect)((function(){I&&(document.querySelector(".modal").style.backgroundColor=_)}),[I]),(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)("div",{children:[(0,f.jsx)("span",{className:l.Z.closeBtn,onClick:function(){t()},children:(0,f.jsx)("i",{className:"fa-regular fa-circle-xmark"})}),(0,f.jsxs)("form",{onSubmit:function(e){e.preventDefault(),I?r(e,_,s):r(e,_)},className:l.Z["flex-col-center"],children:[(!s||c||s.userInfo===localStorage.getItem("padUserInfo"))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:l.Z["margin10-wid95"],children:(0,f.jsx)("input",{type:"text",name:"title",required:!0,placeholder:"\uc81c\ubaa9",title:"\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",className:l.Z["memoAdd-input"],autoFocus:!0,defaultValue:s?s.title:""})}),(0,f.jsx)("hr",{style:{width:"96%",margin:"13px"}}),(0,f.jsx)("div",{className:l.Z["margin10-wid95"],children:(0,f.jsx)(d.Z,{myKey:"text-input",className:"memoAdd-textarea",label:"insteadText",input:{name:"text",type:"textarea",required:!0},onInput:function(e){return Z(e,500)},required:!0,placeholder:"\ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",defaultValue:s?s.text:""})}),(0,f.jsxs)("div",{className:l.Z["margin10-wid95"],style:{justifyContent:"space-between"},children:[(0,f.jsxs)("div",{className:"".concat(l.Z["flex-center-all"]," ").concat(l.Z["bgcolor-div"]," "),children:[(0,f.jsx)("span",{className:l.Z["color-span"],children:"\ubc30\uacbd"}),m.map((function(e,t){return(0,f.jsx)("span",{onClick:function(){return h(e)},className:_!==e?l.Z["color-area"]:l.Z["color-area-clicked"],style:{backgroundColor:e}},t)}))]}),I&&(0,f.jsx)("input",{type:"button",name:"delete",value:"\uc0ad\uc81c",className:l.Z["li-btn"],onClick:function(e){n(s)}}),(0,f.jsx)("input",{type:"submit",value:I?"\uc218\uc815":"\ucd94\uac00",className:l.Z["li-btn"]})]})]}),s&&!c&&s.userInfo!==localStorage.getItem("padUserInfo")&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:l.Z["margin10-wid95"],style:{fontSize:"1.5rem",padding:"15px"},children:s.title}),(0,f.jsx)("hr",{style:{width:"96%",margin:"13px"}}),(0,f.jsx)("div",{className:l.Z["margin10-wid95"],style:{fontSize:"1.3rem",padding:"15px"},children:s.text})]})]})]})})},x=n(4636),_=n(790),h=n(5987),g=["withOpacity","isDragging","style","data","isTeacher"],v=(0,o.forwardRef)((function(e,t){var n,i,a=e.withOpacity,o=e.isDragging,s=e.style,d=e.data,c=e.isTeacher,u=(0,h.Z)(e,g),m=(0,r.Z)({opacity:a?"0.5":"1",transformOrigin:"50% 50%",height:"auto",width:"250px",borderRadius:"10px",padding:"20px 10px",cursor:o?"grabbing":"grab",backgroundColor:"#ffffff",display:"flex",justifyContent:"center",alignItems:"center",boxShadow:o?"rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px":"rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",transform:o?"scale(1.15)":"scale(1)"},s),p=(n=d.text,i=50,n.length>i?n.substring(0,i)+"...":n);return(0,f.jsx)("div",(0,r.Z)((0,r.Z)({ref:t,style:m},u),{},{children:(0,f.jsxs)("div",{className:l.Z["flex-col-center"],style:{width:"90%",height:"auto"},children:[(0,f.jsx)("span",{className:l.Z["fs-14rem"],children:d.title}),c&&(0,f.jsx)("span",{className:l.Z.date,children:d.createdAt}),(0,f.jsx)("hr",{style:{width:"100%",margin:"20px 5px"}}),(0,f.jsx)("span",{children:p})]})}))})),I=(0,o.forwardRef)((function(e,t){var n=(0,x.nB)({id:e.id}),i=n.isDragging,a=n.attributes,o=n.listeners,l=n.setNodeRef,s=n.transform,d=n.transition,c={transform:_.ux.Transform.toString(s),transition:d||void 0,backgroundColor:e.color,height:i?"100px":"auto"};return(0,f.jsx)(v,(0,r.Z)((0,r.Z)((0,r.Z)({ref:l,style:c,withOpacity:i},e),a),o))})),j=function(e){var t=e.children,n=e.columns;return(0,f.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(".concat(n,", 1fr)"),gridGap:10,width:"95%",margin:"100px auto",justifyItems:"center",alignItems:"start"},children:t})},Z=n(7753),y=(n(6303),n(658)),b=n.n(y),w=n(5162),C=function(e){var t,n,d,c=e.padDatas,m=e.padName,_=e.onClose,h=e.isTeacher,g=(e.addPadHandler,e.padDatasHandler),y=(0,o.useState)(!1),C=(0,a.Z)(y,2),S=C[0],N=C[1],F=(0,o.useState)(!0),P=(0,a.Z)(F,2),A=P[0],k=(P[1],(0,o.useState)(null)),D=(0,a.Z)(k,2),T=D[0],E=D[1],M=(0,Z.Dy)((0,Z.VT)(Z.MA),(0,Z.VT)(Z.LO)),B=(0,o.useState)(window.innerWidth),z=(0,a.Z)(B,2),H=z[0],O=z[1],R=(0,o.useState)([]),q=(0,a.Z)(R,2),K=q[0],L=q[1],U=(0,o.useState)(!1),V=(0,a.Z)(U,2),W=V[0],G=V[1],X=(0,o.useState)({}),Y=(0,a.Z)(X,2),Q=Y[0],J=Y[1],$=(0,o.useState)(!1),ee=(0,a.Z)($,2),te=ee[0],ne=ee[1];(0,o.useEffect)((function(){var e=function(){O(window.innerWidth)};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]),(0,o.useEffect)((function(){0!==c.length&&L(c)}),[c]);var re=(0,o.useRef)(0),ie=(0,o.useCallback)((function(e){re.current=Date.now(),ne(!1),E(e.active.id)}),[]),ae=(0,o.useCallback)((function(){E(null)}),[]),oe=function(e,t,n){e.preventDefault();var r=e.target.title.value,a=e.target.text.value;if(""!==(null===r||void 0===r?void 0:r.trim())&&""!==(null===a||void 0===a?void 0:a.trim())){var o,l,s,d=A?e.target.parentNode.innerText:"0";if(n){l={title:r,text:a,userInfo:n.userInfo,createdAt:b()().format("MM-DD HH:mm"),bgColor:t,grid:d,id:n.id};var c=(s=(0,i.Z)(K)).findIndex((function(e){return e.id===n.id}));s.splice(c,1,l),G(!1)}else(o=localStorage.getItem("padUserInfo"))||(o=(0,w.Z)(),localStorage.setItem("padUserInfo",o)),l={title:r,text:a,userInfo:o,createdAt:b()().format("MM-DD HH:mm"),bgColor:t,grid:d,id:String(K.length)},N(!1),(s=(0,i.Z)(K)).push(l);L(s),g(s)}};return(0,f.jsxs)("div",{children:[S&&(0,f.jsx)(s.Z,{onClose:function(){return N(!1)},children:(0,f.jsx)(p,{onClose:function(){return N(!1)},addMemoHandler:oe})}),W&&(0,f.jsx)(s.Z,{onClose:function(){return G(!1)},children:(0,f.jsx)(p,{onClose:function(){return G(!1)},data:Q,isTeacher:h,addMemoHandler:oe,delMemoHandler:function(e){u().fire({icon:"warning",title:"\uba54\ubaa8\ub97c \uc0ad\uc81c\ud560\uae4c\uc694?",text:"".concat(e.title," \uc81c\ubaa9\uc758 \uba54\ubaa8\ub97c \uc0ad\uc81c\ud560\uae4c\uc694?"),confirmButtonText:"\ud655\uc778",showDenyButton:!0,denyButtonText:"\ucde8\uc18c",confirmButtonColor:"#85bd82"}).then((function(t){if(t.isConfirmed){var n=(0,i.Z)(K);n=(n=n.filter((function(t){return t.id!==e.id}))).map((function(e,t){return(0,r.Z)((0,r.Z)({},e),{},{id:String(t)})})),L(n),g(n),G(!1)}}))}})}),(0,f.jsx)("div",{className:l.Z["flex-end"],children:(0,f.jsxs)("span",{className:l.Z.closeBtn,onClick:_,style:{fontSize:"1rem"},children:[(0,f.jsx)("i",{className:"fa-solid fa-reply"})," \ub4a4\ub85c"]})}),(0,f.jsx)("h1",{className:l.Z["fs-17rem"],children:null===m||void 0===m?void 0:m.slice(10)}),0===K.length&&(0,f.jsxs)("div",{style:{marginTop:"20vh",color:"gray"},children:[(0,f.jsx)("p",{children:"\uc790\ub8cc\uac00 \uc5c6\uc5b4\uc694!"})," ",(0,f.jsx)("br",{}),(0,f.jsx)("p",{children:' \uc624\ub978\ucabd \uc544\ub798\uc758 "+" \ubc84\ud2bc\uc744 \ub20c\ub7ec\uc11c '}),(0,f.jsx)("br",{}),(0,f.jsx)("p",{children:"\uc790\ub8cc\ub97c \ucd94\uac00\ud574\uc8fc\uc138\uc694."})]}),A&&(0,f.jsxs)(Z.LB,{sensors:M,collisionDetection:Z.pE,onDragStart:ie,onDragEnd:function(e){var t,n;Date.now()-re.current<500?(J(null===K||void 0===K||null===(t=K.filter((function(t){return t.id===e.active.id})))||void 0===t?void 0:t[0]),G(!0)):(G(!1),J({}),ne(!0),e.active.id!==(null===(n=e.over)||void 0===n?void 0:n.id)&&L((function(t){var n=t.findIndex((function(t){return t.id===e.active.id})),r=t.findIndex((function(t){var n;return t.id===(null===(n=e.over)||void 0===n?void 0:n.id)})),i=(0,x.Rp)(t,n,r);return g(i),i})));E(null)},onDragCancel:ae,children:[(0,f.jsx)(x.Fo,{items:K,strategy:x.U2,children:(0,f.jsx)(j,{columns:Math.floor(H/280),children:null===K||void 0===K?void 0:K.map((function(e){return(0,f.jsx)(I,{id:e.id,isTeacher:h,color:e.bgColor,data:e},e.id)}))})}),(0,f.jsx)(Z.y9,{adjustScale:!0,style:{transformOrigin:"0 0 "},children:te&&T&&(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(v,{id:T,color:{backgroundColor:null===K||void 0===K||null===(t=K.filter((function(e){return e.id===T})))||void 0===t||null===(n=t[0])||void 0===n?void 0:n.bgColor},data:null===K||void 0===K||null===(d=K.filter((function(e){return e.id===T})))||void 0===d?void 0:d[0],isTeacher:h,isDragging:!0})})})]}),(0,f.jsx)("div",{children:(0,f.jsxs)("button",{className:l.Z["add-btn"],onClick:function(){W&&G(!1),N(!0)},children:[" ","+"," "]})})]})}},1874:function(e,t){t.Z={"flex-center":"PadIt_flex-center__7siD7","flex-center-wrap":"PadIt_flex-center-wrap__sohPC","flex-center-all":"PadIt_flex-center-all__tf081","flex-end":"PadIt_flex-end__ges3F","grid-container":"PadIt_grid-container__yEWZm","flex-col-center":"PadIt_flex-col-center__NwjrM",margin10:"PadIt_margin10__CxXXZ","margin10-wid95":"PadIt_margin10-wid95__LA37d","minwid-250":"PadIt_minwid-250__N2eKM","memoAdd-input":"PadIt_memoAdd-input__5s-Z5","memoAdd-textarea":"PadIt_memoAdd-textarea__0xoKx","flex-around-80":"PadIt_flex-around-80__-SPun","fs-2rem":"PadIt_fs-2rem__BA7cq","fs-17rem":"PadIt_fs-17rem__Kz9qD","fs-14rem":"PadIt_fs-14rem__X5YiX","li-btn":"PadIt_li-btn__H2oTP",li:"PadIt_li__kanMp","bgcolor-div":"PadIt_bgcolor-div__Q+TKl","add-btn":"PadIt_add-btn__eIGk7",ul:"PadIt_ul__FLabr",closeBtn:"PadIt_closeBtn__3UWNS","color-area":"PadIt_color-area__TaUDy","color-area-clicked":"PadIt_color-area-clicked__atu9R","color-span":"PadIt_color-span__Jat76",date:"PadIt_date__ah4LB","memoAdd-span":"PadIt_memoAdd-span__BvrkE"}}}]);