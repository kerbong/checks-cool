(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[756,248],{4858:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>Y});var l=s(7313),i=s(2225),a=s(9720),n=s(3776),o=s(658),d=s.n(o),c=s(7114),r=s.n(c);const u={listArea:"ConsultLists_listArea__cdc1k","bg-gray":"ConsultLists_bg-gray__pesUI","listArea-div":"ConsultLists_listArea-div__Cnu9c",nameArea:"ConsultLists_nameArea__-zF7h","consults-lists-div":"ConsultLists_consults-lists-div__abIhj",fileArea:"ConsultLists_fileArea__GwBM9",noteArea:"ConsultLists_noteArea__JyczP",nameSpan:"ConsultLists_nameSpan__4PEYx",nameIcon:"ConsultLists_nameIcon__3NmaI",editDeleteArea:"ConsultLists_editDeleteArea__x0JBh",input:"ConsultLists_input__3GPGK",selectArea:"ConsultLists_selectArea__45m6A",editFileArea:"ConsultLists_editFileArea__2w4yw","editImg-prev":"ConsultLists_editImg-prev__khqzn",consultDate:"ConsultLists_consultDate__sP2hx",noteTextArea:"ConsultLists_noteTextArea__gQ7Si",sortBtnArea:"ConsultLists_sortBtnArea__r60o9","select-area":"ConsultLists_select-area__peb+p","student-select":"ConsultLists_student-select__ZY9aE","select-year":"ConsultLists_select-year__OxSF+"};var v=s(7692),m=s(7785),h=s(4484),f=s(5186),x=s(7121),p=s(6417);const j=e=>{var t,s;const i=e.consult,[a,n]=(0,l.useState)(""),[o,c]=(0,l.useState)(e.consult.id),[j,_]=(0,l.useState)(!1),[g,b]=(0,l.useState)(null===(t=e.consult)||void 0===t?void 0:t.related),y=()=>{e.cancelEditor()},w=e=>{e.currentTarget.style.display="none"};(0,l.useEffect)((()=>{let e=document.getElementById("newFile");e&&(e.style.maxHeight="250px")}),[a]);return(0,p.jsxs)(p.Fragment,{children:[j&&(0,p.jsx)(x.Z,{who:i.num+" "+i.name,cancleBtnHandler:()=>{_(!1),b(i.related)},confirmBtnHandler:()=>_(!1),studentClickHandler:t=>(t=>{var s;let l=t.target.innerText,i=[...g];if(l!==e.who){var a;null!==(s=i)&&void 0!==s&&s.includes(l)?i=null===(a=i)||void 0===a?void 0:a.filter((e=>e!==l)):i.push(l),b(i)}})(t),students:e.students,isSubject:e.isSubject,relatedStudent:g,closeModalHandler:()=>{_(!1),b(i.related)}}),(0,p.jsxs)("div",{className:u.nameArea,children:[(0,p.jsx)("span",{className:u.nameIcon,children:(0,p.jsx)("i",{className:"fa-regular fa-id-badge"})}),(0,p.jsx)("span",{className:u["hide-cal"],children:(0,p.jsx)(f.Z,{getDateValue:e=>{let t=d()(e).format("YYYY-MM-DD")+o.slice(10,15)+i.num;console.log(t),c(t)},about:"main",setStart:new Date(o.slice(0,10)),getMonthValue:()=>{},getYearValue:()=>{}})}),(0,p.jsxs)("span",{className:u.nameSpan,children:[i.name," "," | ",e.selectOption&&(0,p.jsxs)("select",{name:"consult-option",id:"option-select",className:u.selectArea,defaultValue:i.option,children:[(0,p.jsx)("option",{value:"",children:"-- \ubd84\ub958 --"}),null===(s=e.selectOption)||void 0===s?void 0:s.map((e=>(0,p.jsx)("option",{value:e.value,children:e.class},e.id)))]})]})]}),(0,p.jsxs)("div",{className:u.noteArea,children:[(0,p.jsx)(v.Z,{className:"consult-relatedStdBtn",name:"\uad00\ub828\ud559\uc0dd",onclick:function(){_(!j)}}),(null===g||void 0===g?void 0:g.length)>0&&(0,p.jsx)("div",{className:u.noteArea,style:{flexWrap:"wrap"},children:null===g||void 0===g?void 0:g.map((e=>(0,p.jsx)("span",{className:u.nameSpan,children:e},e)))}),0===(null===g||void 0===g?void 0:g.length)&&(0,p.jsx)("div",{className:u.noteArea,style:{flexWrap:"wrap",width:"50%",justifyContent:"center"},children:(0,p.jsx)("span",{className:u.nameSpan,children:"* \uad00\ub828 \ud559\uc0dd \uc5c6\uc74c"})})]}),i.attachedFileUrl&&(0,p.jsx)("div",{className:u.fileArea,children:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("img",{src:i.attachedFileUrl,width:"60%","max-height":"250px",alt:"filePreview",onError:w}),(0,p.jsx)("audio",{controls:!0,src:i.attachedFileUrl,onError:w})]})}),(0,p.jsx)(h.Z,{myKey:i.id,className:u.input,id:"consult_note",label:"inputData",defaultValue:i.note&&i.note,input:{type:"textarea",style:{height:e.initTextareaHeight+"px"},autoFocus:!0}}),(0,p.jsxs)("div",{className:u.editDeleteArea,children:[(0,p.jsx)(v.Z,{id:"save"+i.id,className:"consultEditBtn",onclick:()=>{(t=>{let s=document.querySelector("#consult_note").value;const l=document.querySelector("#option-select").value;let i;s.length>4e3&&(s=s.substr(0,4e3),r().fire({icon:"error",title:"\uc785\ub825\uae00\uc790 \ucd08\uacfc",text:"\uc785\ub825\ud55c \ub0b4\uc6a9\uc744 4000\uc790 \uc774\ub0b4\ub85c \uc904\uc5ec\uc8fc\uc138\uc694.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})),i=""===a?t.attachedFileUrl:a;const n={...t,id:o,option:l,attachedFileUrl:i,note:s,related:g};JSON.stringify(t)!==JSON.stringify(n)||n.id!==t.id?(n.beforeId=t.id,e.addData(n),r().fire({icon:"success",title:"\uc790\ub8cc\uac00 \uc800\uc7a5\ub418\uc5c8\uc5b4\uc694.",text:"5\ucd08 \ud6c4\uc5d0 \ucc3d\uc774 \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3}),y()):r().fire({icon:"error",title:"\uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694.",text:"\ubcc0\uacbd\ub41c \ub0b4\uc6a9\uc774 \uc5c6\uc5b4\uc694!",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",timer:5e3})})(i)},icon:(0,p.jsx)("i",{className:"fa-solid fa-floppy-disk"})}),(0,p.jsx)(v.Z,{id:"cancel"+i.id,className:"consultEditBtn",onclick:y,icon:(0,p.jsx)("i",{className:"fa-solid fa-rectangle-xmark"})})]}),(0,p.jsxs)("div",{className:u.editFileArea,children:[(0,p.jsx)(m.Z,{src:i.attachedFileUrl||"",attachedFileHandler:e=>{n(e)}}),a&&(0,p.jsx)("div",{className:u["editImg-prev"],children:(0,p.jsx)("img",{src:a,style:{maxHeight:"250px",maxwidth:"300px"},alt:"filePreview",id:"newFile"})})]})]})};var _=s(650),g=s(573),b=s(8737);s(3889);d().locale("ko");const y=e=>{var t;const[s,i]=(0,l.useState)([]),[a,n]=(0,l.useState)([]),[o,c]=(0,l.useState)([]),[m,h]=(0,l.useState)(""),[f,x]=(0,l.useState)(""),[y,w]=(0,l.useState)([]),[S,N]=(0,l.useState)([]),[Y,C]=(0,l.useState)([]),[k,A]=(0,l.useState)(""),[M,D]=(0,l.useState)(!1),L=(0,l.useRef)(),F=(0,l.useRef)(),U=(0,l.useRef)();function E(e,t){const s=null===e||void 0===e?void 0:e.sort((function(e,t){let s="".concat(e.id.slice(0,10)," ").concat(e.id.slice(10,15)),l="".concat(t.id.slice(0,10)," ").concat(t.id.slice(10,15));return new Date(s)-new Date(l)}));return"up"===t&&(null===s||void 0===s||s.reverse()),s}(0,l.useEffect)((()=>{(()=>{let t=(0,g.JU)(_.wO,"consult",e.userUid);(0,g.cf)(t,(e=>{if(e.exists()){var t,s;const l=[],a=[];null===(t=e.data())||void 0===t||null===(s=t.consult_data)||void 0===s||s.forEach((e=>{let t={},s=I(e.id.slice(0,10));a.push(s),t={...e,yearGroup:s},l.push(t)})),w([...new Set(a)]),i([...l])}else i([]),w([])}))})()}),[e.userUid]),(0,l.useEffect)((()=>{var e,t;""!==(null===L||void 0===L||null===(e=L.current)||void 0===e?void 0:e.value)&&T(null===L||void 0===L||null===(t=L.current)||void 0===t?void 0:t.value)}),[s]),(0,l.useEffect)((()=>{var e;""!==(null===L||void 0===L||null===(e=L.current)||void 0===e?void 0:e.value)&&B("\uc804\uccb4\ud559\uc0dd")}),[S]);const O=e=>{const t=d()(e).format("ddd"),s=e.split("-")[0].slice(2),l=e.split("-")[1].replace(/(^0+)/,""),i=e.split("-")[2].replace(/(^0+)/,"");return"".concat(s,"\ub144 ").concat(l,"\uc6d4 ").concat(i,"\uc77c(").concat(t,")")},B=e=>{let t,s=M?null===a||void 0===a?void 0:a.filter((e=>e.clName===k)):a;t=E("\uc804\uccb4\ud559\uc0dd"===e?s:null===s||void 0===s?void 0:s.filter((t=>t.name===e)),"up"),c(t)},T=t=>{var l,i,a;const o=null===s||void 0===s?void 0:s.filter((e=>e.yearGroup===t));n(o),Z(t)?(D(!0),A("")):(D(!1),N([...new Set(null===o||void 0===o?void 0:o.map((e=>e.name)))]));let d=null===(l=e.students)||void 0===l||null===(i=l.filter((e=>Object.keys(e)[0]===t)))||void 0===i||null===(a=i[0])||void 0===a?void 0:a[t];C(d),F.current.value=""};(0,l.useEffect)((()=>{if(s.length>0){let e=null===s||void 0===s?void 0:s.filter((e=>e.clName===k));n(e);let t=null===e||void 0===e?void 0:e.map((e=>e.name));N([...new Set(t)]),F.current.value=""}}),[k]);const I=e=>{let t=(null===e||void 0===e?void 0:e.length)>0?e:new Date;return d()(t).format("MM-DD")<="02-15"?String(+d()(t).format("YYYY")-1):d()(t).format("YYYY")},Z=t=>{var s,l,i;return null===(s=e.isSubject)||void 0===s||null===(l=s.filter((e=>Object.keys(e)[0]===t)))||void 0===l||null===(i=l[0])||void 0===i?void 0:i[t]};(0,l.useEffect)((()=>{let e=I(),t=Z(e);D(t)}),[e.isSubject]);const H=e=>{e.currentTarget.style.display="none"};return(0,p.jsxs)("div",{className:u["bg-gray"],children:[(0,p.jsx)("h1",{children:"\uc0c1\ub2f4\uae30\ub85d"}),(0,p.jsx)("br",{}),(0,p.jsxs)("div",{className:u.sortBtnArea,children:[(0,p.jsxs)("div",{className:u["select-area"],children:[(0,p.jsxs)("select",{name:"searchYear-selcet",ref:L,defaultValue:"",className:u["student-select"],onChange:e=>T(e.target.value),children:[(0,p.jsx)("option",{value:"",defaultChecked:!0,children:"--\ud559\ub144\ub3c4--"}),null===y||void 0===y?void 0:y.map((e=>(0,p.jsxs)("option",{value:e,children:[e,"\ud559\ub144\ub3c4"]},e)))]}),M&&(0,p.jsxs)("select",{ref:U,onChange:()=>{let e=U.current.value;A(e)},className:u["student-select"],value:k,children:[(0,p.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===Y||void 0===Y?void 0:Y.map((e=>(0,p.jsx)("option",{value:Object.keys(e),children:Object.keys(e)},Object.keys(e))))]}),(0,p.jsxs)("select",{name:"student-selcet",ref:F,className:u["student-select"],defaultValue:"",onChange:e=>B(e.target.value),children:[(0,p.jsx)("option",{value:"",defaultChecked:!0,children:"--\ud559\uc0dd--"}),(null===a||void 0===a?void 0:a.length)>0&&(0,p.jsx)("option",{value:"\uc804\uccb4\ud559\uc0dd",children:"\uc804\uccb4\ubcf4\uae30"}),null===(V=S,t=V.sort(((e,t)=>e>t?1:-1)))||void 0===t?void 0:t.map((e=>(0,p.jsx)("option",{value:e,children:e},e)))]})]}),(0,p.jsx)(v.Z,{id:"saveExcel",className:"sortBtn-consult",name:"\uc5d1\uc140\uc800\uc7a5",onclick:()=>{const e=[];s.forEach((t=>{let s=[+t.num,t.name,+t.id.slice(0,4),+t.id.slice(5,7),+t.id.slice(8,10),t.id.slice(10,15),t.option.slice(1),null===t||void 0===t?void 0:t.note,null===t||void 0===t?void 0:t.attachedFileUrl];M&&s.unshift(t.clName),e.push(s)}));let t=["\ubc88\ud638","\uc774\ub984","\ub144","\uc6d4","\uc77c","\uc2dc\uac01","\uc0c1\ub2f4\uc635\uc158","\uba54\ubaa8\ub0b4\uc6a9","\ucca8\ubd80\ud30c\uc77c"];M&&t.unshift("\ubc18"),e.unshift(t);const l=b.P6.book_new(),i=b.P6.aoa_to_sheet(e);i["!cols"]=[{wpx:30},{wpx:50},{wpx:40},{wpx:25},{wpx:25},{wpx:50},{wpx:60},{wpx:500},{wpx:120}],M&&i["!cols"].unshift({wpx:50}),b.P6.book_append_sheet(l,i,"\uc0c1\ub2f4\uae30\ub85d"),(0,b.NC)(l,"\uc0c1\ub2f4\uae30\ub85d(".concat(L.current.value,").xlsx"))}})]}),a?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("br",{}),(0,p.jsx)("p",{children:"* \uc815\ubcf4\ubcf4\ud638\ub97c \uc704\ud574 \uba3c\uc800 \ud56d\ubaa9\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."}),(0,p.jsx)("br",{})]}):(0,p.jsx)("p",{children:"* \uc790\ub8cc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. "}),(0,p.jsx)("div",{className:u["consults-lists-div"],children:a&&(null===o||void 0===o?void 0:o.map((t=>{var l,a;return(0,p.jsx)("div",{className:u["listArea-div"],children:(0,p.jsx)("li",{className:u.listArea,id:t.id,children:m===t.id?(0,p.jsx)(j,{isSubject:e.isSubject,students:Y,selectOption:e.selectOption,consult:t,cancelEditor:()=>h(""),initTextareaHeight:f,addData:t=>(t=>{let s=t.beforeId;i((e=>{let l,i=[...e];return e.forEach(((e,t)=>{e.id===s&&(l=t)})),i[l]=M?{...t,clName:k}:t,i})),n((e=>{let l,i=[...e];return e.forEach(((e,t)=>{e.id===s&&(l=t)})),i[l]=M?{...t,clName:k}:t,i})),c((e=>{let l,i=[...e];return e.forEach(((e,t)=>{e.id===s&&(l=t)})),i[l]=M?{...t,clName:k}:t,E(i,"up")})),e.addData(t)})(t)}):(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{className:u.nameArea,children:[(0,p.jsx)("span",{className:u.nameIcon,children:(0,p.jsx)("i",{className:"fa-regular fa-id-badge"})}),(0,p.jsxs)("p",{className:u.consultDate,children:[O(t.id.slice(0,10))," ",t.id.slice(10,15)]}),(0,p.jsx)("span",{className:u.nameSpan,id:"1"+t.id,children:"".concat(t.name," | ").concat(t.option.slice(1))})]}),(null===t||void 0===t||null===(l=t.related)||void 0===l?void 0:l.length)>0&&(0,p.jsx)(p.Fragment,{children:(0,p.jsx)("div",{className:u.noteArea,children:null===t||void 0===t||null===(a=t.related)||void 0===a?void 0:a.map((e=>(0,p.jsx)("span",{className:u.nameSpan,children:e},e)))})}),t.attachedFileUrl&&(0,p.jsxs)("div",{className:u.fileArea,children:[(0,p.jsx)("img",{src:t.attachedFileUrl,style:{maxHeight:"470px",maxWidth:"95%"},alt:"filePreview",onError:H}),(0,p.jsx)("audio",{controls:!0,src:t.attachedFileUrl,onError:H})]}),(0,p.jsx)("div",{className:u.noteArea,children:(0,p.jsx)("span",{className:u.noteTextArea,id:"note"+t.id,children:t.note?t.note:"'\uae30\ub85d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.'"})}),(0,p.jsxs)("div",{className:u.editDeleteArea,children:[(0,p.jsx)(v.Z,{id:"edit"+t.id,className:"consultEditBtn",onclick:()=>{var e;e=t.id,h(e);const s=document.getElementById("note".concat(t.id)).scrollHeight;x(s)},icon:(0,p.jsx)("i",{className:"fa-solid fa-pencil"})}),(0,p.jsx)(v.Z,{id:"delete"+t.id,className:"consultEditBtn",onclick:()=>{(t=>{r().fire({title:"\uc790\ub8cc\ub97c \uc9c0\uc6b8\uae4c\uc694?",text:"".concat(t.id.slice(0,10)," | ").concat(t.name," | ").concat(t.option.slice(1)),showDenyButton:!0,confirmButtonText:"\uc0ad\uc81c",confirmButtonColor:"#db100cf2",denyButtonColor:"#85bd82",denyButtonText:"\ucde8\uc18c"}).then((l=>{var a;l.isConfirmed&&(e.deleteConsult(t.id,t.attachedFileUrl),i((e=>null===e||void 0===e?void 0:e.filter((e=>e.id!==t.id)))),n((e=>null===e||void 0===e?void 0:e.filter((e=>e.id!==t.id)))),c((e=>null===e||void 0===e?void 0:e.filter((e=>e.id!==t.id)))),M||N([...new Set(null===s||void 0===s||null===(a=s.filter((e=>e.yearGroup===L.current.value&&e.id!==t.id)))||void 0===a?void 0:a.map((e=>e.name)))]))}))})(t)},icon:(0,p.jsx)("i",{className:"fa-solid fa-trash-can"})})]})]},t.id+"item")},t.id)},t.id)})))})]});var V};var w=s(7890),S=s(6797),N=s(5162);const Y=e=>{var t;const[s,o]=(0,l.useState)(!1),[c,r]=(0,l.useState)(""),[u,v]=(0,l.useState)(!1),[m,h]=(0,l.useState)(""),[f,x]=(0,l.useState)([]),[j,b]=(0,l.useState)([]),[Y,C]=(0,l.useState)(!1),{state:k}=(0,w.TH)();let A=(0,w.s0)();const M=(0,l.useRef)();(0,l.useEffect)((()=>{"addConsult"===(null===k||void 0===k?void 0:k.doWhat)?v(!1):"showConsult"===(null===k||void 0===k?void 0:k.doWhat)&&v(!0)}),[k]);const D=async t=>{let s="";if(""!==t.attachedFileUrl)if(t.attachedFileUrl instanceof Object){const l=async t=>{const s=await(0,S.KV)((0,S.iH)(_.Hw,"".concat(e.userUid,"/").concat((0,N.Z)())),t,{contentType:"audio/mp4"});return await(0,S.Jt)(s.ref)};s=await l(t.attachedFileUrl)}else{const l=await(0,S.sf)((0,S.iH)(_.Hw,"".concat(e.userUid,"/").concat((0,N.Z)())),t.attachedFileUrl,"data_url");s=await(0,S.Jt)(l.ref)}let l={...t,attachedFileUrl:s},i=U(t.id.slice(0,10));E(i)&&(l={...l,clName:""===m?l.clName:m}),delete l.yearGroup;const a=(0,g.JU)(_.wO,"consult",e.userUid),n=await(0,g.QT)(a);if(n.exists()){var o;let e;e=l.beforeId?l.beforeId:l.id;let t=[...null===(o=n.data().consult_data)||void 0===o?void 0:o.filter((t=>t.id!==e))];l.beforeId&&delete l.beforeId,t.push(l),await(0,g.pl)(a,{consult_data:t})}else await(0,g.pl)(a,{consult_data:[l]})},L=async(t,s)=>{var l,i;""!==s&&await(0,S.oq)((0,S.iH)(_.Hw,s));const a=(0,g.JU)(_.wO,"consult",e.userUid),n=await(0,g.QT)(a);let o=[...null===n||void 0===n||null===(l=n.data())||void 0===l||null===(i=l.consult_data)||void 0===i?void 0:i.filter((e=>e.id!==t))];await(0,g.pl)(a,{consult_data:o})};(0,l.useEffect)((()=>{F()}),[m]);const F=()=>{null===j||void 0===j||j.forEach((e=>{Object.keys(e)[0]===m&&x(Object.values(e)[0])})),""===m&&x([])},U=e=>{let t=(null===e||void 0===e?void 0:e.length)>0?e:new Date;return d()(t).format("MM-DD")<="02-15"?String(+d()(t).format("YYYY")-1):d()(t).format("YYYY")};(0,l.useEffect)((()=>{var t,s,l;let i=U(),a=null===e||void 0===e||null===(t=e.students)||void 0===t||null===(s=t.filter((e=>Object.keys(e)[0]===i)))||void 0===s||null===(l=s[0])||void 0===l?void 0:l[i];b(a)}),[e.students]);const E=t=>{let s;var l,i,a;e.isSubject&&(s=null===(l=e.isSubject)||void 0===l||null===(i=l.filter((e=>Object.keys(e)[0]===t)))||void 0===i||null===(a=i[0])||void 0===a?void 0:a[t]);return s};return(0,l.useEffect)((()=>{let e=U(),t=E(e);C(t)}),[e.isSubject]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{id:"title-div",children:[(0,p.jsxs)("button",{id:"title-btn",children:[(0,p.jsx)("i",{className:"fa-regular fa-comments",style:{fontSize:"1em"}})," ","\uc0c1\ub2f4\uad00\ub9ac"]}),(0,p.jsxs)("div",{style:{height:"70px",display:"flex",alignItems:"center",width:"auto",justifyContent:"flex-end",lineHeight:"20px",fontSize:"0.9rem"},children:[(0,p.jsxs)("span",{id:"switch-btn",onClick:()=>{A("/attendance",{state:{doWhat:"addAttend"}})},children:[(0,p.jsx)("i",{className:"fa-regular fa-calendar-days"})," \ucd9c\uacb0",(0,p.jsx)("br",{}),"\uae30\ub85d"]}),(0,p.jsx)("span",{id:"switch-btn",onClick:()=>{v(!1)},children:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("i",{className:"fa-regular fa-comments"})," \uc0c1\ub2f4",(0,p.jsx)("br",{}),"\uad00\ub9ac"]})}),(0,p.jsxs)("span",{id:"switch-btn",onClick:()=>{A("/checkListMemo",{state:{about:"checkLists"}})},children:[(0,p.jsx)("i",{className:"fa-regular fa-square-check"})," \uc81c\ucd9c",(0,p.jsx)("br",{}),"ox"]}),(0,p.jsxs)("span",{id:"switch-btn",onClick:()=>{A("/checkListMemo",{state:{about:"listMemo"}})},children:[(0,p.jsx)("i",{className:"fa-solid fa-clipboard-check"})," \uac1c\ubcc4",(0,p.jsx)("br",{}),"\uae30\ub85d"]})]})]}),s&&(0,p.jsx)(a.Z,{onClose:()=>{o(!1)},students:Y?f:j,who:c,date:new Date,selectOption:i.Z,addData:D,about:"consulting",userUid:e.userUid,isSubject:!0}),(!j||0===(null===j||void 0===j?void 0:j.length))&&(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(p.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,p.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,p.jsx)("br",{}),(0,p.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,p.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,p.jsx)("br",{})," ",(0,p.jsx)("br",{})]})}),u?(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(y,{userUid:e.userUid,selectOption:i.Z,addData:e=>D(e),deleteConsult:(e,t)=>L(e,t),isSubject:e.isSubject,students:e.students})}):(0,p.jsxs)(p.Fragment,{children:[Y&&(0,p.jsxs)("div",{children:[(0,p.jsxs)("select",{ref:M,onChange:()=>{let e=M.current.value;h(e)},style:{fontSize:"1.2rem",width:"auto",margin:"10px 0 20px 0"},value:m,children:[(0,p.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===j||void 0===j?void 0:j.map((e=>(0,p.jsx)("option",{value:Object.keys(e),children:Object.keys(e)},Object.keys(e))))]}),""===(null===M||void 0===M||null===(t=M.current)||void 0===t?void 0:t.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]}),(0,p.jsx)(n.Z,{students:Y?f:j,showOption:e=>{r(e.target.innerText),o(!0)},isSubject:e.isSubject}),(0,p.jsx)("br",{}),(0,p.jsx)(y,{userUid:e.userUid,selectOption:i.Z,addData:e=>D(e),deleteConsult:(e,t)=>L(e,t),isSubject:e.isSubject,students:e.students})]})]})}},2225:(e,t,s)=>{"use strict";s.d(t,{Z:()=>l});const l=[{class:"\ud559\uc5c5\ud559\uc2b5",id:"1",value:"1\ud559\uc5c5\ud559\uc2b5"},{class:"\uad50\uc6b0\uad00\uacc4",id:"2",value:"2\uad50\uc6b0\uad00\uacc4"},{class:"\uc0dd\ud65c\ud0dc\ub3c4",id:"3",value:"3\uc0dd\ud65c\ud0dc\ub3c4"},{class:"\ud559\ubd80\ubaa8",id:"4",value:"4\ud559\ubd80\ubaa8"}]},3889:function(e,t,s){e.exports=function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=t(e),l={name:"ko",weekdays:"\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"),weekdaysShort:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),weekdaysMin:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),months:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),monthsShort:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),ordinal:function(e){return e},formats:{LT:"A h:mm",LTS:"A h:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY\ub144 MMMM D\uc77c",LLL:"YYYY\ub144 MMMM D\uc77c A h:mm",LLLL:"YYYY\ub144 MMMM D\uc77c dddd A h:mm",l:"YYYY.MM.DD.",ll:"YYYY\ub144 MMMM D\uc77c",lll:"YYYY\ub144 MMMM D\uc77c A h:mm",llll:"YYYY\ub144 MMMM D\uc77c dddd A h:mm"},meridiem:function(e){return e<12?"\uc624\uc804":"\uc624\ud6c4"},relativeTime:{future:"%s \ud6c4",past:"%s \uc804",s:"\uba87 \ucd08",m:"1\ubd84",mm:"%d\ubd84",h:"\ud55c \uc2dc\uac04",hh:"%d\uc2dc\uac04",d:"\ud558\ub8e8",dd:"%d\uc77c",M:"\ud55c \ub2ec",MM:"%d\ub2ec",y:"\uc77c \ub144",yy:"%d\ub144"}};return s.default.locale(l,null,!0),l}(s(658))},5162:(e,t,s)=>{"use strict";var l;s.d(t,{Z:()=>u});var i=new Uint8Array(16);function a(){if(!l&&!(l="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return l(i)}const n=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const o=function(e){return"string"===typeof e&&n.test(e)};for(var d=[],c=0;c<256;++c)d.push((c+256).toString(16).substr(1));const r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=(d[e[t+0]]+d[e[t+1]]+d[e[t+2]]+d[e[t+3]]+"-"+d[e[t+4]]+d[e[t+5]]+"-"+d[e[t+6]]+d[e[t+7]]+"-"+d[e[t+8]]+d[e[t+9]]+"-"+d[e[t+10]]+d[e[t+11]]+d[e[t+12]]+d[e[t+13]]+d[e[t+14]]+d[e[t+15]]).toLowerCase();if(!o(s))throw TypeError("Stringified UUID is invalid");return s};const u=function(e,t,s){var l=(e=e||{}).random||(e.rng||a)();if(l[6]=15&l[6]|64,l[8]=63&l[8]|128,t){s=s||0;for(var i=0;i<16;++i)t[s+i]=l[i];return t}return r(l)}}}]);