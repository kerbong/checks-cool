(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[71],{129:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return D}});var i=n(2982),s=n(1413),a=n(4165),r=n(5861),l=n(885),c=n(7313),o=[{class:"\ud559\uc5c5\ud559\uc2b5",id:"1",value:"1\ud559\uc5c5\ud559\uc2b5"},{class:"\uad50\uc6b0\uad00\uacc4",id:"2",value:"2\uad50\uc6b0\uad00\uacc4"},{class:"\uc0dd\ud65c\ud0dc\ub3c4",id:"3",value:"3\uc0dd\ud65c\ud0dc\ub3c4"},{class:"\ud559\ubd80\ubaa8",id:"4",value:"4\ud559\ubd80\ubaa8"}],u=n(9720),d=n(3776),f=n(658),v=n.n(f),h=n(7114),m=n.n(h),x={listArea:"ConsultLists_listArea__cdc1k",nameArea:"ConsultLists_nameArea__-zF7h",fileArea:"ConsultLists_fileArea__GwBM9",noteArea:"ConsultLists_noteArea__JyczP",nameSpan:"ConsultLists_nameSpan__4PEYx",nameIcon:"ConsultLists_nameIcon__3NmaI",editDeleteArea:"ConsultLists_editDeleteArea__x0JBh",input:"ConsultLists_input__3GPGK",selectArea:"ConsultLists_selectArea__45m6A",editFileArea:"ConsultLists_editFileArea__2w4yw",consultDate:"ConsultLists_consultDate__sP2hx",noteTextArea:"ConsultLists_noteTextArea__gQ7Si",sortBtnArea:"ConsultLists_sortBtnArea__r60o9","select-area":"ConsultLists_select-area__peb+p","student-select":"ConsultLists_student-select__ZY9aE","select-year":"ConsultLists_select-year__OxSF+"},p=n(7692),j=n(7785),_=n(4484),g=n(5186),b=n(7121),y=n(6417),Z=function(e){var t,n,a,r=e.consult,o=(0,c.useState)(""),u=(0,l.Z)(o,2),d=u[0],f=u[1],h=(0,c.useState)(e.consult.id),Z=(0,l.Z)(h,2),S=Z[0],w=Z[1],N=(0,c.useState)(!1),k=(0,l.Z)(N,2),C=k[0],Y=k[1],A=(0,c.useState)(null===(t=e.consult)||void 0===t?void 0:t.related),M=(0,l.Z)(A,2),F=M[0],D=M[1],E=function(){e.cancelEditor()},L=function(e){e.currentTarget.style.display="none"};(0,c.useEffect)((function(){var e=document.getElementById("newFile");e&&(e.style.maxHeight="250px")}),[d]);return(0,y.jsxs)(y.Fragment,{children:[C&&(0,y.jsx)(b.Z,{who:r.num+" "+r.name,cancleBtnHandler:function(){Y(!1),D(r.related)},confirmBtnHandler:function(){return Y(!1)},studentClickHandler:function(t){return function(t){var n,s=t.target.innerText,a=(0,i.Z)(F);if(s!==e.who){var r;null!==(n=a)&&void 0!==n&&n.includes(s)?a=null===(r=a)||void 0===r?void 0:r.filter((function(e){return e!==s})):a.push(s),D(a)}}(t)},students:e.students,isSubject:e.isSubject,relatedStudent:F,closeModalHandler:function(){Y(!1),D(r.related)}}),(0,y.jsxs)("div",{className:x.nameArea,children:[(0,y.jsx)("span",{className:x.nameIcon,children:(0,y.jsx)("i",{className:"fa-regular fa-id-badge"})}),(0,y.jsx)("span",{className:x["hide-cal"],children:(0,y.jsx)(g.Z,{getDateValue:function(e){var t=v()(e).format("YYYY-MM-DD")+S.slice(10,15)+r.num;console.log(t),w(t)},about:"main",setStart:new Date(S.slice(0,10)),getMonthValue:function(){}})}),(0,y.jsxs)("span",{className:x.nameSpan,children:[r.name," "," | ",e.selectOption&&(0,y.jsxs)("select",{name:"consult-option",id:"option-select",className:x.selectArea,defaultValue:r.option,children:[(0,y.jsx)("option",{value:"",children:"-- \ubd84\ub958 --"}),null===(n=e.selectOption)||void 0===n?void 0:n.map((function(e){return(0,y.jsx)("option",{value:e.value,children:e.class},e.id)}))]})]})]}),(0,y.jsxs)("div",{className:x.noteArea,children:[(0,y.jsx)(p.Z,{className:"consult-relatedStdBtn",name:"\uad00\ub828\ud559\uc0dd",onclick:function(){Y(!C)}}),(null===r||void 0===r||null===(a=r.related)||void 0===a?void 0:a.length)>0&&(0,y.jsx)("div",{className:x.noteArea,style:{flexWrap:"wrap"},children:null===F||void 0===F?void 0:F.map((function(e){return(0,y.jsx)("span",{className:x.nameSpan,children:e},e)}))})]}),r.attachedFileUrl&&(0,y.jsx)("div",{className:x.fileArea,children:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("img",{src:r.attachedFileUrl,width:"100%","max-height":"20vh",alt:"filePreview",onError:L}),(0,y.jsx)("audio",{controls:!0,src:r.attachedFileUrl,onError:L})]})}),(0,y.jsx)(_.Z,{myKey:r.id,className:x.input,id:"consult_note",label:"inputData",defaultValue:r.note&&r.note,input:{type:"textarea",style:{height:e.initTextareaHeight+"px"},autoFocus:!0}}),(0,y.jsxs)("div",{className:x.editDeleteArea,children:[(0,y.jsx)(p.Z,{id:"save"+r.id,className:"consultEditBtn",onclick:function(){!function(t){var n,i=document.querySelector("#consult_note").value,a=document.querySelector("#option-select").value;n=""===d?t.attachedFileUrl:d;var r=(0,s.Z)((0,s.Z)({},t),{},{id:S,option:a,attachedFileUrl:n,note:i,related:F});JSON.stringify(t)!==JSON.stringify(r)||r.id!==t.id?(r.beforeId=t.id,e.addData(r),m().fire({icon:"success",title:"\uc790\ub8cc\uac00 \uc800\uc7a5\ub418\uc5c8\uc5b4\uc694.",text:"5\ucd08 \ud6c4\uc5d0 \ucc3d\uc774 \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}),E()):m().fire({icon:"error",title:"\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694.",text:"\ubcc0\uacbd\ub41c \ub0b4\uc6a9\uc774 \uc5c6\uc5b4\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})}(r)},icon:(0,y.jsx)("i",{className:"fa-solid fa-floppy-disk"})}),(0,y.jsx)(p.Z,{id:"cancel"+r.id,className:"consultEditBtn",onclick:E,icon:(0,y.jsx)("i",{className:"fa-solid fa-rectangle-xmark"})})]}),(0,y.jsxs)("div",{className:x.editFileArea,children:[(0,y.jsx)(j.Z,{attachedFileHandler:function(e){f(e)}}),d&&(0,y.jsx)(y.Fragment,{children:(0,y.jsx)("img",{src:d,width:"60%","max-height":"250px",alt:"filePreview",id:"newFile"})})]})]})},S=n(650),w=n(573),N=n(8737);n(3889);v().locale("ko");var k=function(e){var t,n=(0,c.useState)([]),a=(0,l.Z)(n,2),r=a[0],o=a[1],u=(0,c.useState)([]),d=(0,l.Z)(u,2),f=d[0],h=d[1],j=(0,c.useState)([]),_=(0,l.Z)(j,2),g=_[0],b=_[1],k=(0,c.useState)(""),C=(0,l.Z)(k,2),Y=C[0],A=C[1],M=(0,c.useState)(""),F=(0,l.Z)(M,2),D=F[0],E=F[1],L=(0,c.useState)([]),U=(0,l.Z)(L,2),O=U[0],B=U[1],T=(0,c.useState)([]),H=(0,l.Z)(T,2),I=H[0],V=H[1],P=(0,c.useState)([]),J=(0,l.Z)(P,2),R=J[0],G=J[1],z=(0,c.useState)(""),q=(0,l.Z)(z,2),W=q[0],K=q[1],Q=(0,c.useState)(!1),$=(0,l.Z)(Q,2),X=$[0],ee=$[1],te=(0,c.useRef)(),ne=(0,c.useRef)(),ie=(0,c.useRef)();function se(e,t){var n=null===e||void 0===e?void 0:e.sort((function(e,t){var n="".concat(e.id.slice(0,10)," ").concat(e.id.slice(10,15)),i="".concat(t.id.slice(0,10)," ").concat(t.id.slice(10,15));return new Date(n)-new Date(i)}));return"up"===t&&(null===n||void 0===n||n.reverse()),n}(0,c.useEffect)((function(){!function(){var t=(0,w.JU)(S.wO,"consult",e.userUid);(0,w.cf)(t,(function(e){var t,n;o([]);var a=[],r=[];null===(t=e.data())||void 0===t||null===(n=t.consult_data)||void 0===n||n.forEach((function(e){var t={},n=e.id.slice(5,7),i=e.id.slice(0,4);if(+n>=3)r.push(i),t=(0,s.Z)((0,s.Z)({},e),{},{yearGroup:i});else if(+n<=2){var l=String(+i-1);r.push(l),t=(0,s.Z)((0,s.Z)({},e),{},{yearGroup:l})}a.push(t)})),B((0,i.Z)(new Set(r))),o([].concat(a))}))}()}),[]),(0,c.useEffect)((function(){te.current.value}),[r]);var ae=function(e){var t=v()(e).format("ddd"),n=e.split("-")[0].slice(2),i=e.split("-")[1].replace(/(^0+)/,""),s=e.split("-")[2].replace(/(^0+)/,"");return"".concat(n,"\ub144 ").concat(i,"\uc6d4 ").concat(s,"\uc77c(").concat(t,")")};(0,c.useEffect)((function(){if(r.length>0){var e=null===r||void 0===r?void 0:r.filter((function(e){return e.clName===W}));h(e);var t=null===e||void 0===e?void 0:e.map((function(e){return e.name}));V((0,i.Z)(new Set(t))),ne.current.value=""}}),[W]);var re=function(t){var n,i,s;return null===(n=e.isSubject)||void 0===n||null===(i=n.filter((function(e){return Object.keys(e)[0]===t})))||void 0===i||null===(s=i[0])||void 0===s?void 0:s[t]};(0,c.useEffect)((function(){var e=function(){var e=v()(),t="",n=e.format("MM"),i=e.format("YYYY");return+n>=2?t=i:+n<=1&&(t=String(+i-1)),t}(),t=re(e);ee(t)}),[e.isSubject]);var le,ce=function(e){e.currentTarget.style.display="none"};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("hr",{}),(0,y.jsx)("h1",{children:"\uc0c1\ub2f4 \uc870\ud68c \ubc0f \uc218\uc815"}),(0,y.jsx)("br",{}),(0,y.jsxs)("div",{className:x.sortBtnArea,children:[(0,y.jsxs)("div",{className:x["select-area"],children:[(0,y.jsxs)("select",{name:"searchYear-selcet",ref:te,defaultValue:"",className:x["student-select"],onChange:function(t){var n,s,a,l=t.target.value,c=null===r||void 0===r?void 0:r.filter((function(e){return e.yearGroup===l}));h(c),re(l)?(ee(!0),K("")):(ee(!1),V((0,i.Z)(new Set(null===c||void 0===c?void 0:c.map((function(e){return e.name}))))));var o=null===(n=e.students)||void 0===n||null===(s=n.filter((function(e){return Object.keys(e)[0]===l})))||void 0===s||null===(a=s[0])||void 0===a?void 0:a[l];G(o),ne.current.value=""},children:[(0,y.jsx)("option",{value:"",defaultChecked:!0,children:"--\ud559\ub144\ub3c4--"}),null===O||void 0===O?void 0:O.map((function(e){return(0,y.jsxs)("option",{value:e,children:[e,"\ud559\ub144\ub3c4"]},e)}))]}),X&&(0,y.jsxs)("select",{ref:ie,onChange:function(){var e=ie.current.value;K(e)},className:x["student-select"],value:W,children:[(0,y.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===R||void 0===R?void 0:R.map((function(e){return(0,y.jsx)("option",{value:Object.keys(e),children:Object.keys(e)},Object.keys(e))}))]}),(0,y.jsxs)("select",{name:"student-selcet",ref:ne,className:x["student-select"],defaultValue:"",onChange:function(e){var t,n=e.target.value,i=X?null===f||void 0===f?void 0:f.filter((function(e){return e.clName===W})):f;t=se("\uc804\uccb4\ud559\uc0dd"===n?i:null===i||void 0===i?void 0:i.filter((function(e){return e.name===n})),"up"),b(t)},children:[(0,y.jsx)("option",{value:"",defaultChecked:!0,children:"--\ud559\uc0dd--"}),(null===f||void 0===f?void 0:f.length)>0&&(0,y.jsx)("option",{value:"\uc804\uccb4\ud559\uc0dd",children:"\uc804\uccb4\ubcf4\uae30"}),null===(le=I,t=le.sort((function(e,t){return e>t?1:-1})))||void 0===t?void 0:t.map((function(e){return(0,y.jsx)("option",{value:e,children:e},e)}))]})]}),(0,y.jsx)(p.Z,{id:"saveExcel",className:"sortBtn-consult",name:"\uc5d1\uc140\uc800\uc7a5",onclick:function(){var e=[];r.forEach((function(t){var n=[t.num,t.name,t.option.slice(1),"".concat(t.id.slice(0,10)," ").concat(t.id.slice(10,15)),t.note];X&&n.unshift(t.clName),e.push(n)}));var t=["\ubc88\ud638","\uc774\ub984","\uad00\ub828","\ub0a0\uc9dc(\ub144\uc6d4\uc77c \uc2dc\uac01)","\uae30\ub85d\ub0b4\uc6a9"];X&&t.unshift("\ubc18"),e.unshift(t);var n=N.P6.book_new(),i=N.P6.aoa_to_sheet(e);i["!cols"]=[{wpx:40},{wpx:60},{wpx:60},{wpx:100},{wpx:150}],X&&i["!cols"].unshift({wpx:30}),N.P6.book_append_sheet(n,i,"\uc0c1\ub2f4\uae30\ub85d"),(0,N.NC)(n,"\uc0c1\ub2f4\uae30\ub85d(".concat(te.current.value,").xlsx"))}})]}),f?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("br",{}),(0,y.jsx)("p",{children:"* \uc815\ubcf4\ubcf4\ud638\ub97c \uc704\ud574 \uba3c\uc800 \ud56d\ubaa9\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."}),(0,y.jsx)("br",{})]}):(0,y.jsx)("p",{children:"* \uc790\ub8cc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. "}),f&&(null===g||void 0===g?void 0:g.map((function(t){var n,a;return(0,y.jsx)("div",{children:(0,y.jsx)("li",{className:x.listArea,id:t.id,children:Y===t.id?(0,y.jsx)(Z,{isSubject:e.isSubject,students:R,selectOption:e.selectOption,consult:t,cancelEditor:function(){return A("")},initTextareaHeight:D,addData:function(t){return function(t){var n=t.beforeId;o((function(e){var a,r=(0,i.Z)(e);return e.forEach((function(e,t){e.id===n&&(a=t)})),r[a]=X?(0,s.Z)((0,s.Z)({},t),{},{clName:W}):t,r})),h((function(e){var a,r=(0,i.Z)(e);return e.forEach((function(e,t){e.id===n&&(a=t)})),r[a]=X?(0,s.Z)((0,s.Z)({},t),{},{clName:W}):t,r})),b((function(e){var a,r=(0,i.Z)(e);return e.forEach((function(e,t){e.id===n&&(a=t)})),r[a]=X?(0,s.Z)((0,s.Z)({},t),{},{clName:W}):t,se(r,"up")})),e.addData(t)}(t)}}):(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{className:x.nameArea,children:[(0,y.jsx)("span",{className:x.nameIcon,children:(0,y.jsx)("i",{className:"fa-regular fa-id-badge"})}),(0,y.jsx)("p",{className:x.consultDate,children:ae(t.id.slice(0,10))}),(0,y.jsx)("span",{className:x.nameSpan,id:"1"+t.id,children:"".concat(t.name," | ").concat(t.option.slice(1))})]}),(null===t||void 0===t||null===(n=t.related)||void 0===n?void 0:n.length)>0&&(0,y.jsx)("div",{className:x.noteArea,children:null===t||void 0===t||null===(a=t.related)||void 0===a?void 0:a.map((function(e){return(0,y.jsx)("span",{className:x.nameSpan,children:e},e)}))}),t.attachedFileUrl&&(0,y.jsxs)("div",{className:x.fileArea,children:[(0,y.jsx)("img",{src:t.attachedFileUrl,height:"400px",alt:"filePreview",onError:ce}),(0,y.jsx)("audio",{controls:!0,src:t.attachedFileUrl,onError:ce})]}),(0,y.jsx)("div",{className:x.noteArea,children:(0,y.jsx)("span",{className:x.noteTextArea,id:"note"+t.id,children:t.note?t.note:"'\uae30\ub85d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.'"})}),(0,y.jsxs)("div",{className:x.editDeleteArea,children:[(0,y.jsx)(p.Z,{id:"edit"+t.id,className:"consultEditBtn",onclick:function(){var e;e=t.id,A(e);var n=document.getElementById("note".concat(t.id)).scrollHeight;E(n)},icon:(0,y.jsx)("i",{className:"fa-solid fa-pencil"})}),(0,y.jsx)(p.Z,{id:"delete"+t.id,className:"consultEditBtn",onclick:function(){!function(t){m().fire({title:"\uc790\ub8cc\ub97c \uc9c0\uc6b8\uae4c\uc694?",text:"".concat(t.id.slice(0,10)," | ").concat(t.name," | ").concat(t.option.slice(1)),showDenyButton:!0,confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#db100cf2",denyButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c"}).then((function(n){var s;n.isConfirmed&&(e.deleteConsult(t.id,t.attachedFileUrl),o((function(e){return null===e||void 0===e?void 0:e.filter((function(e){return e.id!==t.id}))})),h((function(e){return null===e||void 0===e?void 0:e.filter((function(e){return e.id!==t.id}))})),b((function(e){return null===e||void 0===e?void 0:e.filter((function(e){return e.id!==t.id}))})),X||V((0,i.Z)(new Set(null===r||void 0===r||null===(s=r.filter((function(e){return e.yearGroup===te.current.value&&e.id!==t.id})))||void 0===s?void 0:s.map((function(e){return e.name}))))))}))}(t)},icon:(0,y.jsx)("i",{className:"fa-solid fa-trash-can"})})]})]},t.id+"item")},t.id)},t.id)})))]})},C=n(571),Y=n.p+"static/media/consultAdd.88e54d44455fc22d2a09.gif",A=n(7890),M=n(6797),F=n(5162),D=function(e){var t,n=(0,c.useState)(!1),f=(0,l.Z)(n,2),h=f[0],m=f[1],x=(0,c.useState)(""),p=(0,l.Z)(x,2),j=p[0],_=p[1],g=(0,c.useState)(!1),b=(0,l.Z)(g,2),Z=b[0],N=b[1],D=(0,c.useState)(!1),E=(0,l.Z)(D,2),L=E[0],U=E[1],O=(0,c.useState)(""),B=(0,l.Z)(O,2),T=B[0],H=B[1],I=(0,c.useState)([]),V=(0,l.Z)(I,2),P=V[0],J=V[1],R=(0,c.useState)([]),G=(0,l.Z)(R,2),z=G[0],q=G[1],W=(0,c.useState)(!1),K=(0,l.Z)(W,2),Q=K[0],$=K[1],X=(0,c.useState)(!1),ee=(0,l.Z)(X,2),te=ee[0],ne=ee[1],ie=(0,A.TH)().state,se=(0,A.s0)(),ae=(0,c.useRef)();(0,c.useEffect)((function(){"addConsult"===(null===ie||void 0===ie?void 0:ie.doWhat)?N(!1):"showConsult"===(null===ie||void 0===ie?void 0:ie.doWhat)&&N(!0)}),[ie]);var re=function(){var t=(0,r.Z)((0,a.Z)().mark((function t(n){var l,c,o,u,d,f,v,h,m,x;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(l="",""===n.attachedFileUrl){t.next=15;break}if(!(n.attachedFileUrl instanceof Object)){t.next=9;break}return c=function(){var t=(0,r.Z)((0,a.Z)().mark((function t(n){var i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,M.KV)((0,M.iH)(S.Hw,"".concat(e.userUid,"/").concat((0,F.Z)())),n,{contentType:"audio/mp4"});case 2:return i=t.sent,t.next=5,(0,M.Jt)(i.ref);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),t.next=6,c(n.attachedFileUrl);case 6:l=t.sent,t.next=15;break;case 9:return t.next=11,(0,M.sf)((0,M.iH)(S.Hw,"".concat(e.userUid,"/").concat((0,F.Z)())),n.attachedFileUrl,"data_url");case 11:return o=t.sent,t.next=14,(0,M.Jt)(o.ref);case 14:l=t.sent;case 15:return u=(0,s.Z)((0,s.Z)({},n),{},{attachedFileUrl:l}),d=oe(n.id.slice(0,10)),ue(d)&&(u=(0,s.Z)((0,s.Z)({},u),{},{clName:""===T?u.clName:T})),delete u.yearGroup,f=(0,w.JU)(S.wO,"consult",e.userUid),t.next=22,(0,w.QT)(f);case 22:if(!(v=t.sent).exists()){t.next=32;break}return m=u.beforeId?u.beforeId:u.id,x=(0,i.Z)(null===(h=v.data().consult_data)||void 0===h?void 0:h.filter((function(e){return e.id!==m}))),u.beforeId&&delete u.beforeId,x.push(u),t.next=30,(0,w.pl)(f,{consult_data:x});case 30:t.next=34;break;case 32:return t.next=34,(0,w.pl)(f,{consult_data:[u]});case 34:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),le=function(){var t=(0,r.Z)((0,a.Z)().mark((function t(n,s){var r,l,c,o,u;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===s){t.next=3;break}return t.next=3,(0,M.oq)((0,M.iH)(S.Hw,s));case 3:return c=(0,w.JU)(S.wO,"consult",e.userUid),t.next=6,(0,w.QT)(c);case 6:return o=t.sent,u=(0,i.Z)(null===o||void 0===o||null===(r=o.data())||void 0===r||null===(l=r.consult_data)||void 0===l?void 0:l.filter((function(e){return e.id!==n}))),t.next=10,(0,w.pl)(c,{consult_data:u});case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();(0,c.useEffect)((function(){ce()}),[T]);var ce=function(){null===z||void 0===z||z.forEach((function(e){Object.keys(e)[0]===T&&J(Object.values(e)[0])})),""===T&&J([])},oe=function(e){var t=v()(e),n="",i=t.format("MM"),s=t.format("YYYY");return+i>=2?n=s:+i<=1&&(n=String(+s-1)),n};(0,c.useEffect)((function(){var t,n,i,s=oe(),a=null===e||void 0===e||null===(t=e.students)||void 0===t||null===(n=t.filter((function(e){return Object.keys(e)[0]===s})))||void 0===n||null===(i=n[0])||void 0===i?void 0:i[s];q(a)}),[e.students]);var ue=function(t){var n,i,s,a;e.isSubject&&(n=null===(i=e.isSubject)||void 0===i||null===(s=i.filter((function(e){return Object.keys(e)[0]===t})))||void 0===s||null===(a=s[0])||void 0===a?void 0:a[t]);return n};return(0,c.useEffect)((function(){var e=oe(),t=ue(e);$(t)}),[e.isSubject]),(0,y.jsxs)(y.Fragment,{children:[L&&(0,y.jsx)(C.Z,{onClose:function(){return U(!1)},imgSrc:Y,text:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("p",{style:{fontSize:"1.3em",textAlign:"center",margin:"5px"},children:"=== \uc0c1\ub2f4\uae30\ub85d \uc608\uc2dc ==="}),(0,y.jsx)("p",{style:{margin:"15px"},children:"* \ud654\uba74 \uc67c\ucabd \uc0c1\ub2e8\uc758 \ud604\uc7ac \ud398\uc774\uc9c0 \ud0c0\uc774\ud2c0\uc744 \ud074\ub9ad\ud558\uc2dc\uba74 \ub2e4\uc2dc \ubcf4\uc2e4 \uc218 \uc788\uc5b4\uc694!"})]})}),(0,y.jsxs)("div",{id:"title-div",children:[(0,y.jsxs)("button",{id:"title-btn",onClick:function(){return U(!0)},children:[(0,y.jsx)("i",{className:"fa-regular fa-address-book"})," \uc0dd\uae30\ubd80"]}),(0,y.jsxs)("div",{style:{height:"70px",display:"flex",alignItems:"center",width:"auto",justifyContent:"flex-end",lineHeight:"20px",fontSize:"0.9rem"},children:[(0,y.jsxs)("span",{id:"switch-btn",onClick:function(){se("/attendance",{state:{doWhat:"addAttend"}})},children:[(0,y.jsx)("i",{className:"fa-regular fa-calendar-days"})," \ucd9c\uacb0",(0,y.jsx)("br",{}),"\uae30\ub85d"]}),(0,y.jsx)("span",{id:"switch-btn",onClick:function(){N(!1)},children:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("i",{className:"fa-regular fa-comments"})," \uc0c1\ub2f4",(0,y.jsx)("br",{}),"\uad00\ub9ac"]})}),(0,y.jsxs)("span",{id:"switch-btn",onClick:function(){se("/checkListMemo",{state:{about:"checkLists"}})},children:[(0,y.jsx)("i",{className:"fa-regular fa-square-check"})," \uc81c\ucd9c",(0,y.jsx)("br",{}),"ox"]}),(0,y.jsxs)("span",{id:"switch-btn",onClick:function(){se("/checkListMemo",{state:{about:"listMemo"}})},children:[(0,y.jsx)("i",{className:"fa-solid fa-clipboard-check"})," \uac1c\ubcc4",(0,y.jsx)("br",{}),"\uae30\ub85d"]})]})]}),h&&(0,y.jsx)(u.Z,{onClose:function(){m(!1)},students:Q?P:z,who:j,date:new Date,selectOption:o,addData:re,about:"consulting",userUid:e.userUid,isSubject:!0}),0===(null===z||void 0===z?void 0:z.length)&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{children:"\uc62c\ud574 \ud559\uc0dd \uba85\ub2e8\uc774 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub124\uc694!"}),(0,y.jsx)("div",{children:"\uba54\ub274\uc758 \uacf0\ub3cc\uc774\ub97c \ub20c\ub7ec\uc11c"}),(0,y.jsx)("div",{children:"\ud559\uc0dd \uba85\ub2e8\uc744 \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694!"})]}),Z?(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(k,{userUid:e.userUid,selectOption:o,addData:function(e){return re(e)},deleteConsult:function(e,t){return le(e,t)},isSubject:e.isSubject,students:e.students})}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("h1",{onClick:function(){return ne((function(e){return!e}))},children:["\uc0c1\ub2f4 \uae30\ub85d ",(0,y.jsx)("span",{style:{fontSize:"1.3rem",color:"gray"},children:(0,y.jsx)("i",{className:te?"fa-solid fa-chevron-up":"fa-solid fa-chevron-down"})})]}),(0,y.jsx)("span",{children:"* \ud559\uc0dd\uba85\ub2e8 \ud3bc\uccd0\ubcf4\uae30"}),Q&&(0,y.jsxs)("div",{children:[(0,y.jsxs)("select",{ref:ae,onChange:function(){var e=ae.current.value;H(e)},style:{fontSize:"1.2rem",width:"auto",margin:"10px 0 20px 0"},value:T,children:[(0,y.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===z||void 0===z?void 0:z.map((function(e){return(0,y.jsx)("option",{value:Object.keys(e),children:Object.keys(e)},Object.keys(e))}))]}),""===(null===ae||void 0===ae||null===(t=ae.current)||void 0===t?void 0:t.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]}),te&&(0,y.jsx)(d.Z,{students:Q?P:z,showOption:function(e){_(e.target.innerText),m(!0)},isSubject:e.isSubject}),(0,y.jsx)(k,{userUid:e.userUid,selectOption:o,addData:function(e){return re(e)},deleteConsult:function(e,t){return le(e,t)},isSubject:e.isSubject,students:e.students})]})]})}},3889:function(e,t,n){e.exports=function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=t(e),i={name:"ko",weekdays:"\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"),weekdaysShort:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),weekdaysMin:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),months:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),monthsShort:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),ordinal:function(e){return e},formats:{LT:"A h:mm",LTS:"A h:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY\ub144 MMMM D\uc77c",LLL:"YYYY\ub144 MMMM D\uc77c A h:mm",LLLL:"YYYY\ub144 MMMM D\uc77c dddd A h:mm",l:"YYYY.MM.DD.",ll:"YYYY\ub144 MMMM D\uc77c",lll:"YYYY\ub144 MMMM D\uc77c A h:mm",llll:"YYYY\ub144 MMMM D\uc77c dddd A h:mm"},meridiem:function(e){return e<12?"\uc624\uc804":"\uc624\ud6c4"},relativeTime:{future:"%s \ud6c4",past:"%s \uc804",s:"\uba87 \ucd08",m:"1\ubd84",mm:"%d\ubd84",h:"\ud55c \uc2dc\uac04",hh:"%d\uc2dc\uac04",d:"\ud558\ub8e8",dd:"%d\uc77c",M:"\ud55c \ub2ec",MM:"%d\ub2ec",y:"\uc77c \ub144",yy:"%d\ub144"}};return n.default.locale(i,null,!0),i}(n(658))},5162:function(e,t,n){"use strict";var i;n.d(t,{Z:function(){return d}});var s=new Uint8Array(16);function a(){if(!i&&!(i="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return i(s)}var r=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var l=function(e){return"string"===typeof e&&r.test(e)},c=[],o=0;o<256;++o)c.push((o+256).toString(16).substr(1));var u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(c[e[t+0]]+c[e[t+1]]+c[e[t+2]]+c[e[t+3]]+"-"+c[e[t+4]]+c[e[t+5]]+"-"+c[e[t+6]]+c[e[t+7]]+"-"+c[e[t+8]]+c[e[t+9]]+"-"+c[e[t+10]]+c[e[t+11]]+c[e[t+12]]+c[e[t+13]]+c[e[t+14]]+c[e[t+15]]).toLowerCase();if(!l(n))throw TypeError("Stringified UUID is invalid");return n};var d=function(e,t,n){var i=(e=e||{}).random||(e.rng||a)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){n=n||0;for(var s=0;s<16;++s)t[n+s]=i[s];return t}return u(i)}}}]);