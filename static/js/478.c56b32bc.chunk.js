"use strict";(self.webpackChunkchecks_cool=self.webpackChunkchecks_cool||[]).push([[478],{3776:function(n,t,e){e.d(t,{Z:function(){return o}});e(7313);var l="Student_div__ROh5A",i=e(7405),a=e(6417),o=function(n){var t;return(0,a.jsx)("div",{className:l,children:n.students&&(null===(t=n.students)||void 0===t?void 0:t.map((function(t){var e;return(0,a.jsx)(i.Z,{className:n.manageEach?"button-student-manageEach":"button-student",classAdd:(null===(e=n.passStudent)||void 0===e?void 0:e.split(" ")[1])===t.name,manageEach:n.manageEach,name:t.name,num:t.num,woman:t.woman,onShowOption:function(t){n.showOption(t),t.target+="add"}},t.num)})))})}},7405:function(n,t,e){e.d(t,{Z:function(){return a}});e(7313);var l={"button-student":"StudentBtn_button-student__Ck98o","button-student-manageEach":"StudentBtn_button-student-manageEach__Wrput","checklist-student":"StudentBtn_checklist-student__cWFAm",woman:"StudentBtn_woman__y6FbR"},i=e(6417),a=function(n){return(0,i.jsxs)("button",{className:"".concat(l[n.className]," ").concat(n.classAdd&&"clicked"," ").concat(!n.woman&&l.woman),id:"std-".concat(n.num," ").concat(n.name),onClick:function(t){n.onShowOption(t)},title:null===n||void 0===n?void 0:n.title,children:[n.num," ",n.name]},"stdBtn-".concat(n.num," ").concat(n.name))}},4478:function(n,t,e){e.r(t),e.d(t,{default:function(){return w}});var l=e(4165),i=e(1413),a=e(2982),o=e(5861),s=e(885),d=e(7313),c=e(2118),u=e(7692),r=e(658),v=e.n(r),m=e(650),h=e(573),f=e(7890),x=e(2184),b=e(8737),g=e(5538),j=e(5743),p=e(6417);g.kL.register(g.qi,g.u,g.De);var _=function(n){return(0,p.jsx)(j.$I,{data:n.data})},M=e(7114),N=e.n(M),S={thd:"CompareListMemoTable_thd__fhlXw","name-td":"CompareListMemoTable_name-td__vWFha",table:"CompareListMemoTable_table__52E7R","bg-white":"CompareListMemoTable_bg-white__o7Or-","bg-gray":"CompareListMemoTable_bg-gray__SfWec","bg-title":"CompareListMemoTable_bg-title__aEcVP","flex-center":"CompareListMemoTable_flex-center__+zH4h"},Z=e(3551);Z.kL.register(Z.uw,Z.f$,Z.od,Z.jn,Z.Dx,Z.u,Z.De);var k=function(n){var t,e,l,i=(0,d.useState)([]),o=(0,s.Z)(i,2),c=o[0],u=o[1],r=(0,d.useState)([]),v=(0,s.Z)(r,2),m=v[0],h=v[1],f=(0,d.useState)({}),x=(0,s.Z)(f,2),b=x[0],g=x[1],_=(0,d.useState)(!1),M=(0,s.Z)(_,2),N=M[0],k=M[1],E=(0,d.useState)(!1),w=(0,s.Z)(E,2),y=w[0],C=w[1],F=(0,d.useState)([]),L=(0,s.Z)(F,2),Y=L[0],B=L[1],O=(0,d.useState)(!1),D=(0,s.Z)(O,2),T=D[0],I=D[1],A=Z.kL.defaults.plugins.legend.onClick,H={responsive:!0,plugins:{legend:{position:"top",labels:{fontSize:30,usePointStyle:!0,padding:20},onClick:function(t,e,l){if(e.datasetIndex>0)A(t,e,l);else{var i,a=this.chart,o=null===(i=n.students)||void 0===i?void 0:i.map((function(n,t){return a.getDatasetMeta(t+2)}));o.forEach((function(n){n.hidden=!a.getDatasetMeta(0).hidden})),a.getDatasetMeta(0).hidden=!a.getDatasetMeta(0).hidden,a.update()}}}},layout:{padding:{left:40,right:40,top:20,bottom:20},fontSize:25},scales:{y:{axis:"y",afterDataLimits:function(n){n.max=1.1*n.max},ticks:{beginAtZero:!0,stepSize:1}}}};return(0,d.useEffect)((function(){var t,e;if(n.isSubject){var l,i=[],o=[];console.log(n.students);var s=0;null===(t=n.listMemo)||void 0===t||t.forEach((function(t){var e,l,a;null===o||void 0===o||o.push(null===t||void 0===t?void 0:t.clName);var s=null===(e=n.students)||void 0===e||null===(l=e.filter((function(n){var e;return(null===(e=Object.keys(n))||void 0===e?void 0:e[0])===(null===t||void 0===t?void 0:t.clName)})))||void 0===l?void 0:l[0];0!==(null===s||void 0===s?void 0:s.length)&&(null===i||void 0===i||i.push(null===(a=Object.values(s))||void 0===a?void 0:a[0]))})),u([].concat(i)),B((0,a.Z)(new Set(o))),null===i||void 0===i||i.forEach((function(n){s<n.length&&(s=n.length)})),l=null===(e=(0,a.Z)(Array(+s)))||void 0===e?void 0:e.map((function(n,t){return t})),h((0,a.Z)(l))}}),[n.isSubject]),(0,d.useEffect)((function(){var t,e;if("listMemo"===n.about&&n.listMemo){var l=!0;if(null===(t=n.listMemo)||void 0===t||t.forEach((function(n){var t;null===n||void 0===n||null===(t=n.data)||void 0===t||t.forEach((function(n){var t;if(isNaN(+(null===n||void 0===n||null===(t=n.memo)||void 0===t?void 0:t.trim())))return l=!1,!1})),console.log(n),console.log(l)})),l&&(null===(e=n.listMemo)||void 0===e?void 0:e.length)>1){var i,a,o=[];if(n.isSubject){var s;if(1!==(null===Y||void 0===Y?void 0:Y.length))return;o=null===c||void 0===c||null===(s=c[0])||void 0===s?void 0:s.map((function(t,e){var l,i,a,o,s=Math.floor(256*Math.random()),d=Math.floor(256*Math.random()),c=Math.floor(256*Math.random()),u=null===(l=n.listMemo)||void 0===l?void 0:l.map((function(n){var e,l=0;return null===(e=n.data)||void 0===e||e.forEach((function(n){n.name===t.name&&(l=+n.memo)})),l})),r=null===(i=n.listMemo)||void 0===i||null===(a=i.map((function(n){var e,l,i;return(null===n||void 0===n||null===(e=n.data)||void 0===e||null===(l=e.filter((function(n){return n.name===t.name})))||void 0===l||null===(i=l[0])||void 0===i?void 0:i.memo)||0})))||void 0===a?void 0:a.reduce((function(n,t){return+n+ +t}));return u.push(r),u.push((r/(null===(o=n.listMemo)||void 0===o?void 0:o.length)).toFixed(1)),{label:t.name,data:u,borderColor:"rgba("+s+","+d+","+c+")",backgroundColor:"white"}}))}else{var d;o=null===(d=n.students)||void 0===d?void 0:d.map((function(t,e){var l,i,a,o=Math.floor(256*Math.random()),s=Math.floor(256*Math.random()),d=Math.floor(256*Math.random()),c=null===(l=n.listMemo)||void 0===l?void 0:l.map((function(n){var e,l=0;return null===(e=n.data)||void 0===e||e.forEach((function(n){n.name===t.name&&(l=+n.memo)})),l})),u=null===(i=n.listMemo)||void 0===i?void 0:i.map((function(n){var e,l,i=0,a=null===n||void 0===n||null===(e=n.data)||void 0===e?void 0:e.filter((function(n){return n.name===t.name}));(null===a||void 0===a?void 0:a.length)>0&&(i=null===a||void 0===a||null===(l=a[0])||void 0===l?void 0:l.memo);return i})).reduce((function(n,t){return+n+ +t}));return c.push(u),c.push((u/(null===(a=n.listMemo)||void 0===a?void 0:a.length)).toFixed(1)),{label:t.name,data:c,borderColor:"rgba("+o+","+s+","+d+")",backgroundColor:"white"}}))}o.unshift({label:"\uc804\uccb4\ud3c9\uade0",data:null===(i=n.listMemo)||void 0===i?void 0:i.map((function(n){var t,e=0;return null===(t=n.data)||void 0===t||t.forEach((function(n){isNaN(+n.memo)||(e+=+n.memo)})),Math.floor(e/n.data.length)})),fill:!0,borderColor:"blue",backgroundColor:"rgba(54, 162, 235, 0.5)"}),o.unshift({label:"\uc804\uccb4\uc120\ud0dd",borderColor:"black",backgroundColor:"#000000e0"});var u=null===(a=n.listMemo)||void 0===a?void 0:a.map((function(n){return n.id.slice(5,10)+" "+n.title}));u.push("\ucd1d\uacc4","\uac1c\ubcc4\ud3c9\uade0"),g({labels:u,datasets:o}),k(!0)}}}),[n.listMemo,Y]),(0,d.useEffect)((function(){var t,e;if("listMemo"!==n.about&&(n.listMemo&&(null===(t=n.listMemo)||void 0===t?void 0:t.length)>1))if(n.isSubject){var l,i;if(1!==Y.length)return;e={type:"bar",label:"\uc81c\ucd9c/\ubbf8\uc81c\ucd9c \ud569\uacc4",data:null===(l=c[0])||void 0===l?void 0:l.map((function(t){var e,l;return null===(e=n.listMemo)||void 0===e||null===(l=e.filter((function(n){var e,l;return 0===(null===n||void 0===n||null===(e=n.unSubmitStudents)||void 0===e||null===(l=e.filter((function(n){return n.name===t.name})))||void 0===l?void 0:l.length)})))||void 0===l?void 0:l.length})),barThickness:25,borderColor:"red",backgroundColor:"rgb(255, 99, 132)",borderWidth:2};var a={labels:null===(i=c[0])||void 0===i?void 0:i.map((function(n){return n.name})),datasets:[e]};g(a),C(!0)}else{var o,s;e={type:"bar",label:"\uc81c\ucd9c/\ubbf8\uc81c\ucd9c \ud569\uacc4",data:null===(o=n.students)||void 0===o?void 0:o.map((function(t){var e,l;return null===(e=n.listMemo)||void 0===e||null===(l=e.filter((function(n){var e,l;return 0===(null===n||void 0===n||null===(e=n.unSubmitStudents)||void 0===e||null===(l=e.filter((function(n){return n.name===t.name})))||void 0===l?void 0:l.length)})))||void 0===l?void 0:l.length})),barThickness:25,borderColor:"red",backgroundColor:"rgb(255, 99, 132)",borderWidth:2};var d={labels:null===(s=n.students)||void 0===s?void 0:s.map((function(n){return n.name})),datasets:[e]};g(d),C(!0)}}),[n.listMemo,Y]),(0,p.jsxs)("div",{className:S["flex-center"],children:[(0,p.jsxs)("div",{children:[(0,p.jsxs)("h2",{onClick:function(){return I((function(n){return!n}))},children:[" ","\ud83d\ude2e \uc0ac\uc6a9 \ubc29\ubc95 \ubc0f \uc8fc\uc758\uc0ac\ud56d"," ",(0,p.jsxs)("span",{children:[T?(0,p.jsx)("i",{className:"fa-solid fa-chevron-up"}):(0,p.jsx)("i",{className:"fa-solid fa-chevron-down"})," "]})]}),T&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("p",{style:{color:"white"},children:"* \uc790\ub8cc\uac00 \ubcf4\uae30 \uc5b4\ub824\uc6b4 \uacbd\uc6b0 \ud654\uba74 \ud655\ub300/\ucd95\uc18c\ub97c \ud65c\uc6a9\ud574\uc8fc\uc138\uc694."}),(0,p.jsx)("p",{style:{color:"white"},children:"* \uc81c\ucd9c/\ubbf8\uc81c\ucd9c \ud83d\udc49 \uac19\uc740 \ubc18\uc758 \uc81c\ucd9c\uae30\ub85d\uc744 2\uac1c \uc774\uc0c1 \uc120\ud0dd\ud558\uba74 \ucc28\ud2b8\uac00 \uc790\ub3d9\uc73c\ub85c \uc0dd\uc131\ub429\ub2c8\ub2e4."}),(0,p.jsx)("p",{style:{color:"white"},children:"* \uac1c\ubcc4\uae30\ub85d \ud83d\udc49 \uc22b\uc790(\uc810\uc218)\ub85c\ub9cc \uc800\uc7a5\ub41c \uac1c\ubcc4\uae30\ub85d\uc744 \ub450 \uac1c \uc774\uc0c1 \uc120\ud0dd\ud558\uba74, \ucc28\ud2b8\uac00 \uc790\ub3d9\uc73c\ub85c \uc0dd\uc131\ub429\ub2c8\ub2e4."})]})]}),N&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{backgroundColor:"white"},children:(0,p.jsx)(j.x1,{options:H,data:b})}),(0,p.jsx)("br",{})]}),y&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{backgroundColor:"white"},children:(0,p.jsx)(j.x1,{options:{responsive:!0,layout:{padding:{left:40,right:40,top:20,bottom:20},fontSize:15},scales:{y:{axis:"y",afterDataLimits:function(n){n.max=1.1*n.max},title:{display:!0,align:"end",color:"#808080",text:"(\uac1c)"},ticks:{beginAtZero:!0,stepSize:1}}}},data:b})}),(0,p.jsx)("br",{})]}),(0,p.jsxs)("table",{className:S.table,id:"listTable",children:[(0,p.jsx)("thead",{className:S["bg-title"],children:(0,p.jsxs)("tr",{children:[!n.isSubject&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("th",{children:"\uc774\ub984"}),null===(t=n.listMemo)||void 0===t?void 0:t.map((function(n){return(0,p.jsxs)("th",{className:"".concat(S.thd),children:[n.id.slice(0,10),(0,p.jsx)("br",{}),n.title]},"titleth"+n.id)})),"listMemo"!==n.about&&(0,p.jsx)(p.Fragment,{children:(0,p.jsx)("th",{className:"".concat(S.thd),children:"\uc81c\ucd9c \uac1c\uc218"})}),"listMemo"===n.about&&N&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("th",{className:"".concat(S.thd),children:"\ucd1d\uacc4"}),(0,p.jsx)("th",{className:"".concat(S.thd),children:"\uac1c\ubcc4\ud3c9\uade0"})]})]}),n.isSubject&&(0,p.jsxs)(p.Fragment,{children:[null===(e=n.listMemo)||void 0===e?void 0:e.map((function(t,e){var l;return(0,p.jsxs)(p.Fragment,{children:[0===e&&(0,p.jsx)("th",{children:"\uc774\ub984"}),e>0&&(null===(l=n.listMemo)||void 0===l?void 0:l[e-1].clName)!==t.clName&&(0,p.jsx)("th",{children:"\uc774\ub984"})," ",(0,p.jsxs)("th",{className:"".concat(S.thd),children:[t.id.slice(0,10),(0,p.jsx)("br",{}),"".concat(t.clName,") ").concat(t.title)]},"titleth"+t.id)]})})),"listMemo"!==n.about&&1===Y.length&&(0,p.jsx)(p.Fragment,{children:(0,p.jsx)("th",{className:"".concat(S.thd),children:"\uc81c\ucd9c \uac1c\uc218"})}),"listMemo"===n.about&&1===Y.length&&N&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("th",{className:"".concat(S.thd),children:"\ucd1d\uacc4"}),(0,p.jsx)("th",{className:"".concat(S.thd),children:"\uac1c\ubcc4\ud3c9\uade0"})]})]})]})}),(0,p.jsxs)("tbody",{children:[!n.isSubject&&(0,p.jsx)(p.Fragment,{children:null===(l=n.students)||void 0===l?void 0:l.map((function(t,e){var l,i,a,o,s;return(0,p.jsxs)("tr",{className:"".concat(S.thd," ").concat(S[e%2===0?"bg-white":"bg-gray"]),children:[(0,p.jsx)("td",{className:S["name-td"],children:t.name},"std"+t.name),null===(l=n.listMemo)||void 0===l?void 0:l.map((function(e){var l,i,a,o,s;return(0,p.jsx)("td",{className:"".concat(S.thd),children:"listMemo"===n.about?(0,p.jsx)(p.Fragment,{children:(null===e||void 0===e||null===(l=e.data)||void 0===l||null===(i=l.filter((function(n){return n.name===t.name})))||void 0===i||null===(a=i[0])||void 0===a?void 0:a.memo)||"-"}):(0,p.jsx)(p.Fragment,{children:0===(null===e||void 0===e||null===(o=e.unSubmitStudents)||void 0===o||null===(s=o.filter((function(n){return n.name===t.name})))||void 0===s?void 0:s.length)?"O":"X"})},"memo"+e.id)})),"listMemo"!==n.about&&(0,p.jsx)("td",{className:"".concat(S.thd),children:null===(i=n.listMemo)||void 0===i?void 0:i.map((function(n){var e;return 0===(null===n||void 0===n||null===(e=n.unSubmitStudents)||void 0===e?void 0:e.filter((function(n){return n.name===t.name})).length)?1:0})).reduce((function(n,t){return+n+ +t}))},"eachSumCheck"),"listMemo"===n.about&&N&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("td",{className:"".concat(S.thd),children:null===(a=n.listMemo)||void 0===a?void 0:a.map((function(n){var e,l,i;return(null===n||void 0===n||null===(e=n.data)||void 0===e||null===(l=e.filter((function(n){return n.name===t.name})))||void 0===l||null===(i=l[0])||void 0===i?void 0:i.memo)||0})).reduce((function(n,t){return+n+ +t}))},"eachSumList"),(0,p.jsx)("td",{className:"".concat(S.thd),children:((null===(o=n.listMemo)||void 0===o?void 0:o.map((function(n){var e,l,i;return(null===n||void 0===n||null===(e=n.data)||void 0===e||null===(l=e.filter((function(n){return n.name===t.name})))||void 0===l||null===(i=l[0])||void 0===i?void 0:i.memo)||0})).reduce((function(n,t){return+n+ +t})))/(null===(s=n.listMemo)||void 0===s?void 0:s.length)).toFixed(1)},"eachAverList")]})]},"data"+t.name+e)}))}),n.isSubject&&(0,p.jsx)(p.Fragment,{children:null===m||void 0===m?void 0:m.map((function(t){var e,l,i,a,o,s;return(0,p.jsxs)("tr",{className:"".concat(S.thd," ").concat(S[t%2===0?"bg-white":"bg-gray"]),children:[null===(e=n.listMemo)||void 0===e?void 0:e.map((function(e,l){var i,a,o,s,d,u,r,v,m,h,f;return(0,p.jsxs)(p.Fragment,{children:[0===l&&(0,p.jsx)(p.Fragment,{children:(0,p.jsx)("td",{className:S["name-td"],children:null===c||void 0===c||null===(i=c[l])||void 0===i||null===(a=i[t])||void 0===a?void 0:a.name},"clStdName"+l)}),l>0&&(null===(o=n.listMemo)||void 0===o?void 0:o[l-1].clName)!==e.clName&&(0,p.jsx)("td",{className:S["name-td"],children:null===c||void 0===c||null===(s=c[l])||void 0===s||null===(d=s[t])||void 0===d?void 0:d.name},"clStdName"+l)," ",(0,p.jsx)("td",{className:"".concat(S.thd),children:(null===c||void 0===c||null===(u=c[l])||void 0===u?void 0:u[t])&&(0,p.jsx)(p.Fragment,{children:"listMemo"===n.about?(0,p.jsx)(p.Fragment,{children:(null===e||void 0===e||null===(r=e.data)||void 0===r||null===(v=r.filter((function(n){var e,i;return n.name===(null===c||void 0===c||null===(e=c[l])||void 0===e||null===(i=e[t])||void 0===i?void 0:i.name)})))||void 0===v||null===(m=v[0])||void 0===m?void 0:m.memo)||"-"}):(0,p.jsx)(p.Fragment,{children:0===(null===e||void 0===e||null===(h=e.unSubmitStudents)||void 0===h||null===(f=h.filter((function(n){var e,i;return n.name===(null===c||void 0===c||null===(e=c[l])||void 0===e||null===(i=e[t])||void 0===i?void 0:i.name)})))||void 0===f?void 0:f.length)?"O":"X"})})},"clStdMemo"+l)]})})),1===Y.length&&"listMemo"!==n.about&&(0,p.jsx)("td",{className:"".concat(S.thd),children:null===(l=n.listMemo)||void 0===l||null===(i=l.filter((function(n){var e,l;return 0===(null===n||void 0===n||null===(e=n.unSubmitStudents)||void 0===e||null===(l=e.filter((function(n){var e,l;return n.name===(null===(e=c[0])||void 0===e||null===(l=e[t])||void 0===l?void 0:l.name)})))||void 0===l?void 0:l.length)})))||void 0===i?void 0:i.length},"whole"+t),"listMemo"===n.about&&1===Y.length&&N&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("td",{className:"".concat(S.thd),children:null===(a=n.listMemo)||void 0===a?void 0:a.map((function(n){var e,l,i;return(null===n||void 0===n||null===(e=n.data)||void 0===e||null===(l=e.filter((function(n){var e,l;return n.name===(null===(e=c[0])||void 0===e||null===(l=e[t])||void 0===l?void 0:l.name)})))||void 0===l||null===(i=l[0])||void 0===i?void 0:i.memo)||0})).reduce((function(n,t){return+n+ +t}))},"eachSumList"),(0,p.jsx)("td",{className:"".concat(S.thd),children:((null===(o=n.listMemo)||void 0===o?void 0:o.map((function(n){var e,l,i;return(null===n||void 0===n||null===(e=n.data)||void 0===e||null===(l=e.filter((function(n){var e,l;return n.name===(null===(e=c[0])||void 0===e||null===(l=e[t])||void 0===l?void 0:l.name)})))||void 0===l||null===(i=l[0])||void 0===i?void 0:i.memo)||0})).reduce((function(n,t){return+n+ +t})))/(null===(s=n.listMemo)||void 0===s?void 0:s.length)).toFixed(1)},"eachAverList")]})]},"data"+t)}))})]})]})]})},E=function(n){var t=(0,d.useState)([]),e=(0,s.Z)(t,2),l=e[0],i=e[1],o=(0,d.useState)([]),c=(0,s.Z)(o,2),u=c[0],r=c[1],m=(0,d.useState)([]),h=(0,s.Z)(m,2),f=h[0],g=h[1],j=(0,d.useState)(!1),_=(0,s.Z)(j,2),M=_[0],S=_[1],Z=(0,d.useState)(""),E=(0,s.Z)(Z,2),w=E[0],y=E[1],C=(0,d.useRef)(),F=n.nowIsSubject;(0,d.useEffect)((function(){if(""===w)r((0,a.Z)(l));else{var n=null===l||void 0===l?void 0:l.filter((function(n){return n.title.includes(w)}));r((0,a.Z)(n))}}),[w]),(0,d.useEffect)((function(){var t;0!==(null===(t=n.allCheckListMemo)||void 0===t?void 0:t.length)&&(i(n.allCheckListMemo),r(n.allCheckListMemo))}),[n.allCheckListMemo]);(0,d.useEffect)((function(){}),[M]);return(0,p.jsx)(p.Fragment,{children:M?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("button",{onClick:function(){g([]),S(!1),y("")},className:x.Z["search-btns"],children:"\ube44\uad50\ub2eb\uae30"}),(0,p.jsxs)("button",{onClick:function(){var t="".concat("listMemo"===n.about?"\uac1c\ubcc4\uae30\ub85d":"\uc81c\ucd9c/\ubbf8\uc81c\ucd9c"," \ube44\uad50(").concat(v()().format("YYYY-MM-DD"),").xlsx"),e=b.P6.table_to_book(document.getElementById("listTable"),{sheet:"".concat("listMemo"===n.about?"\uac1c\ubcc4\uae30\ub85d":"\uc81c\ucd9c/\ubbf8\uc81c\ucd9c"," \ube44\uad50")});(0,b.NC)(e,t)},className:x.Z["search-btns"],children:[(0,p.jsx)("i",{className:"fa-solid fa-download"})," \ud604\uc7ac\uc790\ub8cc \uc5d1\uc140\uc800\uc7a5"]}),(0,p.jsx)(k,{about:n.about,listMemo:f,students:n.students,isSubject:F})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("h2",{className:x.Z["fs-15"],children:["\uc804\uccb4\ud559\uc0dd ","listMemo"===n.about?"\uac1c\ubcc4\uae30\ub85d":"\uc81c\ucd9c/\ubbf8\uc81c\ucd9c"," ","\ubaa8\uc544\ubcf4\uae30\ud83e\ude84"]}),(0,p.jsxs)("h4",{style:{color:"white"},children:["* \uac80\uc0c9 \ud6c4 \uc5ec\ub7ec \uc790\ub8cc\ub97c \uc120\ud0dd(\ud074\ub9ad)\ud558\uc2dc\uace0",(0,p.jsx)("br",{}),"\uc644\ub8cc\ub97c \ub20c\ub7ec\uc8fc\uc138\uc694.(pc\ucd94\ucc9c) ",(0,p.jsx)("br",{})]}),(0,p.jsx)("input",{type:"text",ref:C,placeholder:"\uc81c\ubaa9 \uac80\uc0c9",onChange:function(){var n=C.current.value;y(n)},className:x.Z["search-title"]}),(0,p.jsx)("button",{onClick:function(){0!==(null===f||void 0===f?void 0:f.length)&&S(!0)},className:x.Z["search-btns"],children:"\uc644\ub8cc"}),(0,p.jsx)("button",{onClick:function(){0!==(null===f||void 0===f?void 0:f.length)&&N().fire({icon:"warning",title:"\ubaa8\ub4e0 \uc790\ub8cc \uc120\ud0dd\ud574\uc81c",text:"\uc120\ud0dd\ud588\ub358 \ud56d\ubaa9\ub4e4\uc744 \ubaa8\ub450 \uc120\ud0dd \ucde8\uc18c\ud560\uae4c\uc694?",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#85bd82",showDenyButton:!0,denyButtonText:"\ucde8\uc18c"}).then((function(n){n.isConfirmed&&g([])}))},className:x.Z["search-btns"],children:"\uc804\uccb4 \uc120\ud0dd\ud574\uc81c"}),(0,p.jsxs)("div",{className:x.Z["bottom-content-li"],children:[(0,p.jsxs)("h3",{className:x.Z["margin-15"],children:["\uc120\ud0dd\ub41c \uc790\ub8cc \ubaa9\ub85d"," ",(null===f||void 0===f?void 0:f.length)>0&&"(".concat(null===f||void 0===f?void 0:f.length,")")]}),(0,p.jsx)("div",{className:x.Z["flex-center"],style:{flexWrap:"wrap"},children:null===f||void 0===f?void 0:f.map((function(n){return(0,p.jsxs)("div",{className:x.Z["clicked-title"],children:[(0,p.jsx)("b",{children:(null===n||void 0===n?void 0:n.clName)&&n.clName+")"})," ",n.title]},"compare"+n.id)}))})]}),(0,p.jsx)("div",{className:"".concat(x.Z["flex-wrap"]),style:{width:"100%"},children:null===u||void 0===u?void 0:u.map((function(n){var t;return(0,p.jsxs)("li",{id:n.id,className:"".concat(x.Z["bottom-content-li"]," ").concat((null===f||void 0===f||null===(t=f.filter((function(t){return t.id===n.id})))||void 0===t?void 0:t.length)>0?x.Z["list-clicked"]:""),style:{width:"200px",cursor:"pointer"},onClick:function(){!function(n){var t,e,l,i=(null===f||void 0===f||null===(t=f.filter((function(t){return t.id===n.id})))||void 0===t?void 0:t.length)>0,o=(0,a.Z)(f);if(i?o=null===(e=o)||void 0===e?void 0:e.filter((function(t){return t.id!==n.id})):null===(l=o)||void 0===l||l.push(n),F){var s=o.sort((function(n,t){return n.id>t.id?1:-1}));g(null===s||void 0===s?void 0:s.sort((function(n,t){return n.clName>t.clName?1:-1})))}else g(o.sort((function(n,t){return n.id>t.id?1:-1})))}(n)},children:[n.id,(0,p.jsx)("br",{}),(0,p.jsx)("b",{children:n.clName||""}),(0,p.jsx)("h3",{children:n.title})]},n.id)}))})]})})},w=function(n){var t=(0,d.useState)([]),e=(0,s.Z)(t,2),r=e[0],g=e[1],j=(0,d.useState)(!0),M=(0,s.Z)(j,2),N=M[0],S=M[1],Z=(0,d.useState)([]),k=(0,s.Z)(Z,2),w=k[0],y=k[1],C=(0,d.useState)([]),F=(0,s.Z)(C,2),L=F[0],Y=F[1],B=(0,d.useState)([]),O=(0,s.Z)(B,2),D=O[0],T=O[1],I=(0,d.useState)([]),A=(0,s.Z)(I,2),H=A[0],W=A[1],U=(0,d.useState)([]),R=(0,s.Z)(U,2),X=R[0],P=R[1],z=(0,d.useState)([]),G=(0,s.Z)(z,2),Q=G[0],q=G[1],J=(0,d.useState)(""),V=(0,s.Z)(J,2),$=V[0],K=V[1],nn=(0,d.useState)(""),tn=(0,s.Z)(nn,2),en=tn[0],ln=tn[1],an=(0,f.TH)().state,on=function(){return v()().format("MM-DD")<="02-15"?String(+v()().format("YYYY")-1):v()().format("YYYY")},sn=function(t){var e,l,i,a;n.isSubject&&(e=null===(l=n.isSubject)||void 0===l||null===(i=l.filter((function(n){return Object.keys(n)[0]===t})))||void 0===i||null===(a=i[0])||void 0===a?void 0:a[t]);return e}(on()),dn=function(){var t=(0,o.Z)((0,l.Z)().mark((function t(){var e,o,s,d;return(0,l.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return y([]),e=(0,h.JU)(m.wO,"checkLists",n.userUid),t.next=4,(0,h.QT)(e);case 4:return o=t.sent,(0,h.cf)(e,(function(n){if(o.exists()){var t,e,l=[],s=null===(t=n.data())||void 0===t||null===(e=t.checkLists_data)||void 0===e?void 0:e.filter((function(n){return n.yearGroup===on()}));null===s||void 0===s||s.forEach((function(n){var t,e,o,s=(0,a.Z)(r),d=null===n||void 0===n?void 0:n.clName;if(0!==(null===(t=s)||void 0===t||null===(e=t.filter((function(n){return Object.keys(n)[0]===d})))||void 0===e?void 0:e.length)){var c;if((null===d||void 0===d?void 0:d.length)>0)null===(c=s)||void 0===c||c.forEach((function(n,t){Object.keys(n)[0]===d&&(s=s[t][d])}));null===(o=s)||void 0===o||o.forEach((function(t){var e,a=(0,i.Z)((0,i.Z)({},t),{},{id:n.id,title:n.title,submit:!0});null!==(e=n.unSubmitStudents)&&void 0!==e&&e.some((function(n){return+t.num===+n.num}))&&(a.submit=!1),null!==n&&void 0!==n&&n.clName&&(a.clName=n.clName),l.push(a)}))}})),y([].concat(l)),Y((0,a.Z)(s))}})),T([]),W([]),s=(0,h.JU)(m.wO,"listMemo",n.userUid),t.next=11,(0,h.QT)(s);case 11:d=t.sent,(0,h.cf)(s,(function(n){if(d.exists()){var t,e,l=[],o=null===(t=n.data())||void 0===t||null===(e=t.listMemo_data)||void 0===e?void 0:e.filter((function(n){return n.yearGroup===on()}));null===o||void 0===o||o.forEach((function(n){var t;return null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.forEach((function(t){var e=(0,i.Z)((0,i.Z)({},t),{},{id:n.id,title:n.title});sn&&(e.clName=n.clName),l.push(e)}))})),T([].concat(l)),W((0,a.Z)(o))}}));case 13:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();(0,d.useEffect)((function(){0!==(null===r||void 0===r?void 0:r.length)&&dn()}),[r,n.userUid]),(0,d.useEffect)((function(){if(""!==$)if(sn){var n=D.filter((function(n){return n.name===$.split(" ")[1]&&n.clName===en}));P(n);var t=w.filter((function(n){return n.name===$.split(" ")[1]&&n.clName===en}));q(t.sort((function(n,t){return n.submit>t.submit?1:-1})))}else{var e=D.filter((function(n){return n.name===$.split(" ")[1]}));P(e);var l=w.filter((function(n){return n.name===$.split(" ")[1]}));q(l.sort((function(n,t){return n.submit>t.submit?1:-1})))}N||cn()}),[$,D]),(0,d.useEffect)((function(){var n=null===an||void 0===an?void 0:an.student,t=null===an||void 0===an?void 0:an.clName;""!==t&&ln(t),""!==n&&n&&K(n)}),[an]);(0,d.useEffect)((function(){var t,e,l,i=on(),a=null===n||void 0===n||null===(t=n.students)||void 0===t||null===(e=t.filter((function(n){return Object.keys(n)[0]===i})))||void 0===e||null===(l=e[0])||void 0===l?void 0:l[i];g(a)}),[n.students]);var cn=function(){var n=0,t=0;return null===L||void 0===L||L.forEach((function(e){var l,i;sn&&(null===e||void 0===e?void 0:e.clName)!==en||((null===e||void 0===e||null===(l=e.unSubmitStudents)||void 0===l||null===(i=l.filter((function(n){return(null===n||void 0===n?void 0:n.name)===(null===$||void 0===$?void 0:$.split(" ")[1])})))||void 0===i?void 0:i.length)>0?t+=1:n+=1)})),{labels:["\uc81c\ucd9c","\ubbf8\uc81c\ucd9c"],datasets:[{label:"\uac1c\uc218",data:[n,t],backgroundColor:["#ffcd56","#4bc0c0"],borderWidth:0}]}};return(0,p.jsxs)("div",{children:[(0,p.jsx)(c.Z,{students:n.students,userUid:n.userUid,isSubject:n.isSubject,selectStudentHandler:function(n){K(n)},clName:en,passStudent:$,nowClassNameHandler:function(n){ln(n)}}),(0,p.jsxs)("ul",{className:x.Z["bottom-content-ul"],children:[(0,p.jsxs)("div",{className:x.Z["flex-center"],style:{margin:"-10px 0 15px 0",height:"60px"},children:[(0,p.jsx)(u.Z,{name:(0,p.jsx)("span",{children:" \uc81c\ucd9c "}),onclick:function(){return S(!1)},className:N?"change-checkList-button":"change-checkList-button-clicked"}),(0,p.jsx)(u.Z,{name:(0,p.jsx)("span",{children:" \uac1c\ubcc4\uae30\ub85d "}),onclick:function(){return S(!0)},className:N?"change-listMemo-button-clicked":"change-listMemo-button"}),(0,p.jsx)(u.Z,{name:(0,p.jsx)("span",{children:" \uc800\uc7a5"}),icon:(0,p.jsx)("i",{className:"fa-solid fa-download"}),title:"\ubcf4\uc774\ub294 \ub370\uc774\ud130\ub97c \ubaa8\ub450 \uc800\uc7a5\ud558\uae30",onclick:function(){if(0!==(null===H||void 0===H?void 0:H.length)){var n=[];null===H||void 0===H||H.forEach((function(t){t.data.forEach((function(e){var l=[+e.num,e.name,t.title,e.memo];sn&&l.unshift(t.clName),n.push(l)}))})),sn?n.unshift(["\ubc18","\ubc88\ud638","\uc774\ub984","\uac1c\ubcc4\uae30\ub85d \uc81c\ubaa9","\uae30\ub85d\ub0b4\uc6a9"]):n.unshift(["\ubc88\ud638","\uc774\ub984","\uac1c\ubcc4\uae30\ub85d \uc81c\ubaa9","\uae30\ub85d\ub0b4\uc6a9"]);var t=b.P6.book_new(),e=b.P6.aoa_to_sheet(n);e["!cols"]=[{wpx:40},{wpx:50},{wpx:100},{wpx:300}],sn&&e["!cols"].unshift({wpx:40}),b.P6.book_append_sheet(t,e,"\uac1c\ubcc4\uae30\ub85d"),(0,b.NC)(t,"".concat(on(),"\ud559\ub144\ub3c4 \uac1c\ubcc4\uae30\ub85d(").concat(v()().format("YYYY-MM-DD"),").xlsx"))}},className:"excelSave-button"})]}),N?(0,p.jsxs)(p.Fragment,{children:[""!==$&&(0,p.jsxs)("div",{className:"".concat(x.Z["flex-wrap"]),style:{width:"100%"},children:[null===X||void 0===X?void 0:X.map((function(n){return(0,p.jsxs)("li",{id:n.id+n.num,className:x.Z["bottom-content-li"],style:{minWidth:"170px",maxWidth:"400px"},children:[(0,p.jsx)("div",{className:x.Z["flex-ml-10"],children:n.id.slice(0,10)}),(0,p.jsx)("div",{className:x.Z["fs-13"],children:n.title}),(0,p.jsx)("hr",{className:x.Z["margin-15"]}),(0,p.jsx)("div",{className:x.Z["fs-13"],children:n.memo})]},n.id+n.num)})),0===(null===X||void 0===X?void 0:X.length)&&(0,p.jsx)("li",{className:x.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \uac1c\ubcc4\uae30\ub85d \uc815\ubcf4\uac00 \uc5c6\uc5b4\uc694!"})]}),""===$&&(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(E,{about:"listMemo",allCheckListMemo:H,students:r,nowIsSubject:sn})})]}):(0,p.jsxs)(p.Fragment,{children:[""!==$&&(0,p.jsxs)("div",{className:"".concat(x.Z["flex-wrap"]),style:{width:"100%"},children:[(0,p.jsx)("div",{className:x.Z["flex-center"],style:{width:"100%"},children:(0,p.jsx)("li",{id:"notChecked",className:x.Z["bottom-content-li"],style:{width:"200px"},children:(0,p.jsx)(_,{data:cn()})})}),null===Q||void 0===Q?void 0:Q.map((function(n,t){return(0,p.jsx)("div",{children:(0,p.jsxs)("li",{id:n.id+n.num,className:x.Z["bottom-content-li"],style:n.submit?{width:"300px",backgroundColor:"#ffde90"}:{width:"300px"},children:[(0,p.jsxs)("div",{className:x.Z["flex-ml-10"],children:[n.id.slice(0,10),"\xa0"," ",n.submit?"(\uc81c\ucd9c)":"(\ubbf8\uc81c\ucd9c)"]}),(0,p.jsxs)("div",{className:x.Z["fs-13"],children:[n.title," "]})]})},n.id+n.num)})),0===(null===Q||void 0===Q?void 0:Q.length)&&(0,p.jsx)("li",{className:x.Z["bottom-content-li"],children:"* \ud559\uc0dd\uc758 \uc81c\ucd9c \uad00\ub828 \uc815\ubcf4\uac00 \uc5c6\uc5b4\uc694!"})]}),""===$&&(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(E,{about:"checkLists",allCheckListMemo:L,students:r,nowIsSubject:sn})})]})]})]})}},2118:function(n,t,e){e.d(t,{Z:function(){return m}});var l=e(885),i=e(7313),a=e(3776),o=e(658),s=e.n(o),d=e(2184),c=e(7692),u=e(7890),r=e(6417),v=function(n){var t=(0,i.useState)(""),e=(0,l.Z)(t,2),a=e[0],o=e[1],s=(0,i.useState)(""),v=(0,l.Z)(s,2),m=v[0],h=v[1],f=(0,i.useState)(""),x=(0,l.Z)(f,2),b=x[0],g=x[1],j=(0,u.s0)();return(0,i.useEffect)((function(){var n=window.location.href.split("/");o(n[n.length-1])}),[window.location.href]),(0,i.useEffect)((function(){""!==n.onStudent&&h(n.onStudent)}),[n.onStudent]),(0,i.useEffect)((function(){""!==n.clName&&g(n.clName)}),[n.clName]),(0,r.jsxs)("div",{className:d.Z["btns-div"],children:[(0,r.jsx)(c.Z,{name:"\ucd9c\uacb0",className:"manageAttendance"!==a?"manageBtn":"manageBtn-clicked",onclick:function(){return j("/manageAttendance",{state:{student:m,clName:b||""}})}}),(0,r.jsx)(c.Z,{name:"\uc0c1\ub2f4",className:"manageConsult"!==a?"manageBtn":"manageBtn-clicked",onclick:function(){return j("/manageConsult",{state:{student:m,clName:b||""}})}}),(0,r.jsx)(c.Z,{icon:"\uc81c\ucd9c/\uac1c\ubcc4",className:"manageCheckListMemo"!==a?"manageBtn":"manageBtn-clicked",onclick:function(){return j("/manageCheckListMemo",{state:{student:m,clName:b||""}})}}),(0,r.jsx)(c.Z,{name:"\uc815\ubcf4",className:"manageStudent"!==a?"manageBtn":"manageBtn-clicked",onclick:function(){return j("/manageStudent",{state:{student:m,clName:b||""}})}})]})},m=function(n){var t,e=(0,i.useState)(""),o=(0,l.Z)(e,2),c=o[0],u=o[1],m=(0,i.useState)(""),h=(0,l.Z)(m,2),f=h[0],x=h[1],b=(0,i.useState)([]),g=(0,l.Z)(b,2),j=g[0],p=g[1],_=(0,i.useState)([]),M=(0,l.Z)(_,2),N=M[0],S=M[1],Z=(0,i.useState)(!1),k=(0,l.Z)(Z,2),E=k[0],w=k[1],y=(0,i.useRef)();(0,i.useEffect)((function(){if(""!==c){var n=document.getElementById("std-".concat(c));null===n||void 0===n||n.classList.remove("none"),null===n||void 0===n||n.classList.add("clicked")}}),[c]);var C=function(n){var t=(null===n||void 0===n?void 0:n.length)>0?n:new Date;return s()(t).format("MM-DD")<="02-15"?String(+s()(t).format("YYYY")-1):s()(t).format("YYYY")};(0,i.useEffect)((function(){var t=function(t){var e,l,i,a;return n.isSubject&&(e=null===(l=n.isSubject)||void 0===l||null===(i=l.filter((function(n){return Object.keys(n)[0]===t})))||void 0===i||null===(a=i[0])||void 0===a?void 0:a[t]),e}(C());w(t)}),[n.isSubject]),(0,i.useEffect)((function(){var t,e,l,i=C(),a=null===n||void 0===n||null===(t=n.students)||void 0===t||null===(e=t.filter((function(n){return Object.keys(n)[0]===i})))||void 0===e||null===(l=e[0])||void 0===l?void 0:l[i];(null===a||void 0===a?void 0:a.length)>0?S(a):S([])}),[n.students]);return(0,i.useEffect)((function(){null===N||void 0===N||N.forEach((function(n){Object.keys(n)[0]===f&&p(Object.values(n)[0])})),""===f&&p([]),n.nowClassNameHandler(f)}),[f]),(0,i.useEffect)((function(){n.selectStudentHandler(c)}),[c]),(0,i.useEffect)((function(){x(n.clName),u("")}),[n.clName]),(0,i.useEffect)((function(){""!==n.passStudent&&u(n.passStudent)}),[n.passStudent]),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{children:E&&(0,r.jsxs)("div",{children:[(0,r.jsxs)("select",{ref:y,onChange:function(){var n=y.current.value;x(n)},className:d.Z["class-select"],value:f,children:[(0,r.jsx)("option",{value:"",children:"--\ud559\uae09--"}),null===N||void 0===N?void 0:N.map((function(n){return(0,r.jsx)("option",{value:Object.keys(n),children:Object.keys(n)},Object.keys(n))}))]}),""===(null===y||void 0===y||null===(t=y.current)||void 0===t?void 0:t.value)&&"* \ud559\uae09\uc744 \uba3c\uc800 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."]})}),(0,r.jsxs)("div",{children:[(0,r.jsx)(a.Z,{students:E?j:N,showOption:function(n){var t=n.target.innerText;if(u(c===t?"":t),""!==c){var e=document.getElementById("std-".concat(c));null===e||void 0===e||e.classList.remove("clicked"),null===e||void 0===e||e.classList.add("none")}},isSubject:n.isSubject,manageEach:!0,passStudent:n.passStudent}),!E&&(!N||0===(null===N||void 0===N?void 0:N.length))&&(0,r.jsxs)(r.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,r.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,r.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,r.jsx)("br",{})," ",(0,r.jsx)("br",{})]}),E&&(!j||0===(null===j||void 0===j?void 0:j.length))&&(0,r.jsxs)(r.Fragment,{children:["\ud604\uc7ac \ud559\ub144\ub3c4\uc758 \uae30\ucd08\uc790\ub8cc\ub97c \uba3c\uc800 \uc785\ub825\ud574\uc8fc\uc138\uc694. ",(0,r.jsx)("br",{}),"(\ud559\ub144\ub3c4 \uae30\uc900 \uc608: 2023.02.16. ~ 2024.02.15.)",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),"1. \ud504\ub85c\ud544 ( [\ud83d\udc64] - '\ud504\ub85c\ud544 \uc218\uc815' - '\uc800\uc7a5')",(0,r.jsx)("br",{})," 2. \ud559\uc0dd ( [\uba54\uc778\ud654\uba74] - '\ud559\uc0dd\ub4f1\ub85d' )",(0,r.jsx)("br",{})," ",(0,r.jsx)("br",{})]})]}),(0,r.jsx)(v,{onStudent:c,clName:f}),(0,r.jsx)("div",{})]})}},2184:function(n,t){t.Z={"class-select":"ManageEach_class-select__IlQlu","flex-d-column":"ManageEach_flex-d-column__Dh-Iq","btns-div":"ManageEach_btns-div__Zivma","padd-5":"ManageEach_padd-5__-MakG","bottom-content-ul":"ManageEach_bottom-content-ul__xXaZv","bottom-content-li":"ManageEach_bottom-content-li__S8Tge","flex-ml-10":"ManageEach_flex-ml-10__whmHW","attendEdit-div":"ManageEach_attendEdit-div__7u3SK",show:"ManageEach_show__HHbXY","fs-13":"ManageEach_fs-13__7gMai","fs-15":"ManageEach_fs-15__stlkn","fs-11":"ManageEach_fs-11__dIRN5","fs-9":"ManageEach_fs-9__jSAIp","fs-13-bold":"ManageEach_fs-13-bold__HBo6n","clicked-title":"ManageEach_clicked-title__-ZVjL","search-title":"ManageEach_search-title__wX5x6","search-btns":"ManageEach_search-btns__aYFXS","flex-wrap":"ManageEach_flex-wrap__NnIS9","margin-15":"ManageEach_margin-15__R8DcB","margin-5":"ManageEach_margin-5__IctPu","flex-center-ml-10":"ManageEach_flex-center-ml-10__fmq5p","flex-center":"ManageEach_flex-center__Ent-o","width-max400":"ManageEach_width-max400__8b-OH","attend-edit-p":"ManageEach_attend-edit-p__SvrxQ","attend-edit-d":"ManageEach_attend-edit-d__-GFUJ","attend-edit-c":"ManageEach_attend-edit-c__XExyE","a-link":"ManageEach_a-link__oahRi",excelfileUploadBtn:"ManageEach_excelfileUploadBtn__vkRXS","list-clicked":"ManageEach_list-clicked__4v6iy","span-left":"ManageEach_span-left__PWcvA","onStudent-name":"ManageEach_onStudent-name__5dz+H","fs-22-bold":"ManageEach_fs-22-bold__Irb6D"}}}]);