(self.webpackChunkbiranila=self.webpackChunkbiranila||[]).push([[341],{1762:function(e,t,n){"use strict";n.d(t,{Z:function(){return O}});var r=n(4165),a=n(5861),s=n(1413),i=n(9439),l=n(2791),o=n(6314),c=n(6151),d=n(3400),u=n(4721),h=n(8584),x=n(1918),f=n(5523),p=n(9174),b=n(68),j=n(5286),m=n(3543),Z=n(4070),v=n(5527),g=n(4554),y=n(3967),C=n(7892),k=n.n(C),w=n(4750),I=n(1652),S=n(7079),T=n(1686),D=n(503),N=n(6578),R=n(4376),E=n(1243),L=n(3081),A=n(2522),B=n(6569),G=n(184);function O(e){var t=(0,y.Z)(),n=(0,N.a)(L.u3).data,C=(0,N.a)(L.Eg).data,O=(0,N.a)(L.Do).data,F=(0,R.D)(L.DD),W=(0,i.Z)(F,1)[0],z=(0,R.D)(L.dI),M=(0,i.Z)(z,1)[0],Y=l.useState(),U=(0,i.Z)(Y,2),q=U[0],P=U[1],H=l.useState(),_=(0,i.Z)(H,2),X=_[0],J=_[1],V=l.useState(),K=(0,i.Z)(V,2),Q=K[0],$=K[1],ee=l.useState({subject:"",authorId:e.userId,statusId:2,attachments:!0,completed:!1,dateDue:(new Date).toISOString()}),te=(0,i.Z)(ee,2),ne=te[0],re=te[1],ae=l.useState({message:"",files:[],links:[]}),se=(0,i.Z)(ae,2),ie=se[0],le=se[1],oe=l.useState(),ce=(0,i.Z)(oe,2),de=ce[0],ue=ce[1];if(l.useEffect((function(){if(n&&C&&O){var e={};n.getAllOfficeSections.forEach((function(t){e["default"===t.sectionName?t.sectionOffice.officeName:t.sectionOffice.officeName+" \u2014 "+t.sectionName]=t.sectionId})),P(e);var t={};C.getAllThreadTypes.forEach((function(e){t[e.docType]=e.docId})),J(t);var r={};O.getAllThreadPurpose.forEach((function(e){r[e.purposeName]=e.purposeId})),$(r)}}),[n,C,O]),console.log(ne.purposeId),console.log(Q),!q||!X||!Q)return(0,G.jsx)(B.y,{open:!0});var he=function(){return ue((0,s.Z)((0,s.Z)({},de),{},{general:void 0}))},xe=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(){var n,a,i,l,o,c;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(ne.recipientId){t.next=3;break}return ue((0,s.Z)((0,s.Z)({},de),{},{recipient:"Recipient is required."})),t.abrupt("return");case 3:if(ne.purposeId){t.next=6;break}return ue((0,s.Z)((0,s.Z)({},de),{},{purpose:"Purpose is required."})),t.abrupt("return");case 6:if(ne.docTypeId){t.next=9;break}return ue((0,s.Z)((0,s.Z)({},de),{},{type:"Type is required."})),t.abrupt("return");case 9:if(0!==ne.subject.length){t.next=12;break}return ue((0,s.Z)((0,s.Z)({},de),{},{recipient:"Subject is required."})),t.abrupt("return");case 12:return t.prev=12,t.next=15,W({variables:{data:ne}});case 15:if((n=t.sent).data){t.next=19;break}return ue((0,s.Z)((0,s.Z)({},de),{},{general:"Failed to create thread."})),t.abrupt("return");case 19:if(a=[],i=[],!(ie.files.length>0)){t.next=35;break}return l=new FormData,ie.files.forEach((function(e){l.append("files",e)})),t.prev=24,t.next=27,E.Z.post("https://birtracker.nat911.com/api/upload",l);case 27:o=t.sent,a=o.data.files,t.next=35;break;case 31:return t.prev=31,t.t0=t.catch(24),ue((0,s.Z)((0,s.Z)({},de),{},{general:t.t0.message})),t.abrupt("return");case 35:return ie.links.length>0&&(i=ie.links.map((function(e){return{fileName:e.split("/").pop(),fileType:"",fileUrl:e}}))),c=a.concat(i),t.prev=37,t.next=40,M({variables:{data:{message:ie.message,files:c,senderId:e.userId,threadId:n.data.createThread.refId}}});case 40:e.onCreateThread(n.data.createThread.refId),t.next=47;break;case 43:return t.prev=43,t.t1=t.catch(37),ue((0,s.Z)((0,s.Z)({},de),{},{general:t.t1.message})),t.abrupt("return");case 47:t.next=53;break;case 49:return t.prev=49,t.t2=t.catch(12),ue((0,s.Z)((0,s.Z)({},de),{},{general:t.t2.message})),t.abrupt("return");case 53:case"end":return t.stop()}}),t,null,[[12,49],[24,31],[37,43]])})));return function(){return t.apply(this,arguments)}}();return(0,G.jsx)(v.Z,{sx:{width:"100%"},children:(0,G.jsx)(g.Z,{sx:{width:"100%",maxHeight:"calc(100vh - 105px)",overflowY:"auto",overflowX:"hidden","::-webkit-scrollbar":{height:"8px",width:"8px"},"::-webkit-scrollbar-track":{background:t.palette.grey[300]},"::-webkit-scrollbar-thumb":{background:t.palette.secondary.main},"::-webkit-scrollbar-thumb:hover":{background:t.palette.primary.dark}},children:(0,G.jsxs)(o.Z,{spacing:3,sx:{p:2},children:[(0,G.jsxs)("div",{children:[(0,G.jsxs)(o.Z,{direction:"row",spacing:1,alignItems:"center",sx:{py:1},children:[(0,G.jsx)(c.Z,{variant:"contained",endIcon:(0,G.jsx)(T.Z,{}),onClick:xe,children:"Send"}),(0,G.jsx)(b.Z,{title:"Discard",children:(0,G.jsx)(d.Z,{onClick:e.onDiscardThread,children:(0,G.jsx)(D.Z,{})})})]}),(0,G.jsx)(u.Z,{})]}),(0,G.jsxs)(o.Z,{direction:"row",spacing:2,children:[(0,G.jsx)(x.Z,{label:"To",variant:"outlined",sx:{width:80}}),(0,G.jsx)(j.Z,{freeSolo:!0,fullWidth:!0,options:Object.keys(q),onChange:function(e,t){return re((0,s.Z)((0,s.Z)({},ne),{},{recipientId:q[t]}))},renderInput:function(e){return(0,G.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard",error:void 0!==(null===de||void 0===de?void 0:de.recipient),helperText:de&&de.recipient}))}})]}),(0,G.jsxs)(o.Z,{direction:"row",spacing:2,children:[(0,G.jsx)(x.Z,{label:"Subject",variant:"outlined",sx:{width:80}}),(0,G.jsx)(h.Z,{name:"subject",variant:"standard",value:ne.subject,onChange:function(e){return re((0,s.Z)((0,s.Z)({},ne),{},{subject:e.target.value}))},fullWidth:!0,error:void 0!==(null===de||void 0===de?void 0:de.subject),helperText:de&&de.subject})]}),(0,G.jsxs)(o.Z,{direction:"row",spacing:2,children:[(0,G.jsx)(x.Z,{label:"Purpose",variant:"outlined",sx:{width:80}}),(0,G.jsx)(j.Z,{freeSolo:!0,fullWidth:!0,onChange:function(e,t){return re((0,s.Z)((0,s.Z)({},ne),{},{purposeId:Q[t]}))},options:Object.keys(Q),renderInput:function(e){return(0,G.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard",error:void 0!==(null===de||void 0===de?void 0:de.purpose),helperText:de&&de.purpose}))}})]}),(0,G.jsxs)(o.Z,{direction:"row",spacing:2,children:[(0,G.jsx)(x.Z,{label:"Type",variant:"outlined",sx:{width:80}}),(0,G.jsx)(j.Z,{freeSolo:!0,fullWidth:!0,onChange:function(e,t){return re((0,s.Z)((0,s.Z)({},ne),{},{docTypeId:X[t]}))},options:Object.keys(X),renderInput:function(e){return(0,G.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard",error:void 0!==(null===de||void 0===de?void 0:de.type),helperText:de&&de.type}))}})]}),(0,G.jsx)(I._,{dateAdapter:w.y,children:(0,G.jsx)(S.M,{label:"Date Due",views:["year","month","day"],value:k()(ne.dateDue),onChange:function(e){e&&re((0,s.Z)((0,s.Z)({},ne),{},{dateDue:e.toISOString()}))},format:"MMMM DD, YYYY"})}),(0,G.jsx)(f.Z,{control:(0,G.jsx)(p.Z,{checked:ne.attachments,onChange:function(e){return re((0,s.Z)((0,s.Z)({},ne),{},{attachments:e.target.checked}))}}),label:"Attachments Required"}),(0,G.jsx)(A.Z,{userId:e.userId,onChange:function(e){return le(e)}}),(0,G.jsx)(m.Z,{open:void 0!==(null===de||void 0===de?void 0:de.general),autoHideDuration:6e3,onClose:he,children:(0,G.jsx)(Z.Z,{onClose:he,severity:"error",sx:{width:"100%"},children:de&&de.general})})]})})})}},6908:function(e,t,n){"use strict";n.d(t,{Z:function(){return A}});var r=n(9439),a=n(2791),s=n(493),i=n(6314),l=n(1918),o=n(6278),c=n(4721),d=n(9900),u=n(653),h=n(3044),x=n(890),f=n(6151),p=n(3400),b=n(5527),j=n(4554),m=n(3967),Z=n(3950),v=n(2419),g=n(975),y=n(1413),C=n(2065),k=n(9834),w=n(5473),I=n(1903),S=n(6578),T=n(3081),D=n(184);function N(e){var t=e.selected,n=e.onClick,i=(0,S.a)(T.Eg).data,l=(0,a.useState)(null),d=(0,r.Z)(l,2),u=d[0],h=d[1];return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(p.Z,{onClick:function(e){h(e.currentTarget)},sx:(0,y.Z)({p:0,mx:2},u&&{"&:before":{zIndex:1,content:"''",width:"100%",height:"100%",borderRadius:"50%",position:"absolute",bgcolor:function(e){return(0,C.Fq)(e.palette.grey[900],.8)}}}),children:(0,D.jsx)(I.Z,{})}),(0,D.jsx)(w.ZP,{open:Boolean(u),anchorEl:u,onClose:function(){h(null)},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{p:0,mt:1.5,ml:.75,width:360,"& .MuiMenuItem-root":{typography:"body2",borderRadius:.75}}},children:(0,D.jsx)(j.Z,{sx:{maxHeight:500,overflowY:"auto"},children:(0,D.jsxs)(s.Z,{disablePadding:!0,subheader:(0,D.jsx)(k.Z,{disableSticky:!0,sx:{py:1,px:2.5,typography:"overline"},children:"Thread Types"}),children:[(0,D.jsx)(o.Z,{onClick:function(){return n(-1)},selected:-1===t,children:"All"}),(0,D.jsx)(c.Z,{sx:{borderStyle:"dashed"}}),i&&i.getAllThreadTypes.map((function(e){return(0,D.jsxs)(a.Fragment,{children:[(0,D.jsx)(o.Z,{onClick:function(){return n(e.docId)},selected:t===e.docId,children:e.docType}),(0,D.jsx)(c.Z,{sx:{borderStyle:"dashed"}})]},e.docId)}))]})})})]})}var R=n(6569),E={inbox:{title:"Job Well Done!",sub:"You have no active threads"},sent:{title:"Compose a thread",sub:"You have no created threads"},completed:{title:"It's time to work!",sub:"You have no finished threads"},regionInbox:{title:"Compose a thread",sub:"No threads are created yet"}},L=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function A(e){var t=(0,m.Z)(),n=a.useState(-1),y=(0,r.Z)(n,2),C=y[0],k=y[1];return(0,D.jsxs)(a.Fragment,{children:[(0,D.jsx)(R.y,{open:void 0===e.mails}),(0,D.jsxs)(i.Z,{direction:"row",spacing:2,alignItems:"center",sx:{mb:3},children:["completed"!==e.mode&&(0,D.jsx)(f.Z,{variant:"contained",endIcon:(0,D.jsx)(v.Z,{}),disabled:e.compose,onClick:e.onComposeThread,children:"Compose"}),(0,D.jsx)(p.Z,{onClick:e.onRefresh,children:(0,D.jsx)(Z.Z,{})}),(0,D.jsx)(N,{selected:C,onClick:function(e){return k(e)}})]}),(0,D.jsx)(b.Z,{sx:{width:"100%"},children:(0,D.jsxs)(s.Z,{sx:{width:"100%",maxHeight:"calc(100vh - 170px)",overflowY:"auto","::-webkit-scrollbar":{height:"8px",width:"8px"},"::-webkit-scrollbar-track":{background:t.palette.grey[300]},"::-webkit-scrollbar-thumb":{background:t.palette.secondary.main},"::-webkit-scrollbar-thumb:hover":{background:t.palette.primary.dark}},children:[e.mails&&0===e.mails.length&&(0,D.jsxs)(j.Z,{sx:{display:"flex",height:300,justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,D.jsx)(g.Z,{color:"secondary",sx:{fontSize:64,mb:1}}),(0,D.jsx)(x.Z,{variant:"subtitle1",children:E[e.mode].title}),(0,D.jsx)(x.Z,{variant:"body1",children:E[e.mode].sub})]}),e.mails&&e.mails.filter((function(e){return e.docType.docId===C||-1===C})).map((function(t){return(0,D.jsxs)(a.Fragment,{children:[(0,D.jsxs)(o.Z,{alignItems:"flex-start",onClick:function(){return e.onThreadClick(t.refId)},children:[(0,D.jsx)(u.Z,{children:(0,D.jsx)(h.Z,{children:"".concat(t.author.firstName.charAt(0)).concat(t.author.lastName.charAt(0))})}),(0,D.jsx)(d.Z,{primary:(0,D.jsxs)(j.Z,{children:[(0,D.jsx)(x.Z,{variant:"body1",gutterBottom:!0,children:t.subject}),(0,D.jsx)(l.Z,{color:t.completed?"success":"info",label:t.status.statusLabel,size:"small",sx:{fontSize:10}}),(0,D.jsx)(x.Z,{variant:"caption",children:" Due at ".concat(L(t.dateDue))})]}),secondary:(0,D.jsxs)(a.Fragment,{children:[(0,D.jsx)(x.Z,{sx:{display:"inline"},component:"span",variant:"subtitle2",color:"text.primary",children:"regionInbox"===e.mode?t.recipient.sectionOffice.officeName:"".concat(t.author.firstName," ").concat(t.author.lastName)})," \u2014 "+t.docType.docType]})})]}),(0,D.jsx)(c.Z,{variant:"inset",component:"li"})]},t.refId)}))]})})]})}},2522:function(e,t,n){"use strict";n.d(t,{Z:function(){return N}});var r=n(4165),a=n(5861),s=n(3433),i=n(1413),l=n(9439),o=n(2791),c=n(4554),d=n(6314),u=n(8584),h=n(6151),x=n(3400),f=n(68),p=n(1918),b=n(3543),j=n(4070),m=n(5423),Z=n(103),v=n(2637),g=n(5574),y=n(7123),C=n(9157),k=n(5661),w=n(184);function I(e){var t=o.useState(""),n=(0,l.Z)(t,2),r=n[0],a=n[1];return(0,w.jsx)(g.Z,{open:e.open,onClose:e.onClose,maxWidth:"md",children:(0,w.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.onSubmit(r),a("")},children:[(0,w.jsx)(k.Z,{children:"Add Link"}),(0,w.jsx)(C.Z,{children:(0,w.jsx)(u.Z,{autoFocus:!0,margin:"dense",name:"link",label:"File Link",type:"url",fullWidth:!0,value:r,onChange:function(e){return a(e.target.value)},variant:"standard",sx:{minWidth:500},required:!0})}),(0,w.jsxs)(y.Z,{children:[(0,w.jsx)(h.Z,{onClick:e.onClose,children:"Cancel"}),(0,w.jsx)(h.Z,{type:"submit",children:"Add Link"})]})]})})}var S=n(4376),T=n(1243),D=n(3081);function N(e){var t=e.userId,n=e.threadId,g=e.attached,y=e.onChange,C=e.onSubmit,k=(0,S.D)(D.dI),N=(0,l.Z)(k,1)[0],R=o.useState(!1),E=(0,l.Z)(R,2),L=E[0],A=E[1],B=o.useState([]),G=(0,l.Z)(B,2),O=G[0],F=G[1],W=o.useState({message:"",files:[],links:[]}),z=(0,l.Z)(W,2),M=z[0],Y=z[1],U=o.useState(),q=(0,l.Z)(U,2),P=q[0],H=q[1];o.useEffect((function(){var e=M.files.map((function(e){return e.name}));F(e.concat(M.links))}),[M,y]),o.useEffect((function(){y&&y(M)}),[M,y]);var _=function(){return H(void 0)},X=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var a,s,i,l,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:if(!g||0!==M.files.length||0!==M.links.length){e.next=5;break}return H("Attached file is required."),e.abrupt("return");case 5:if(a=[],s=[],!(M.files.length>0)){e.next=21;break}return i=new FormData,M.files.forEach((function(e){i.append("files",e)})),e.prev=10,e.next=13,T.Z.post("https://birtracker.nat911.com/api/upload",i);case 13:l=e.sent,a=l.data.files,e.next=21;break;case 17:return e.prev=17,e.t0=e.catch(10),H(e.t0.message),e.abrupt("return");case 21:return M.links.length>0&&(s=M.links.map((function(e){return{fileName:e.split("/").pop(),fileType:"",fileUrl:e}}))),o=a.concat(s),e.prev=23,e.next=26,N({variables:{data:{message:M.message,files:o,senderId:t,threadId:n}}});case 26:Y({message:"",files:[],links:[]}),C&&C(),e.next=34;break;case 30:return e.prev=30,e.t1=e.catch(23),H(e.t1.message),e.abrupt("return");case 34:case"end":return e.stop()}}),e,null,[[10,17],[23,30]])})));return function(){return e.apply(this,arguments)}}();return(0,w.jsxs)(c.Z,{sx:{width:"100%",backgroundColor:"#F2F3F4",position:"relative"},children:[(0,w.jsx)(u.Z,{name:"message",value:M.message,onChange:function(e){return Y((0,i.Z)((0,i.Z)({},M),{},{message:e.target.value}))},multiline:!0,rows:6,fullWidth:!0}),(0,w.jsxs)(d.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",sx:{position:"absolute",bottom:0,left:0,right:0,p:1},children:[(0,w.jsxs)(c.Z,{sx:{display:"flex",flexDirection:"row"},children:[(0,w.jsx)(f.Z,{title:"Upload File",children:(0,w.jsxs)(x.Z,{component:"label",children:[(0,w.jsx)(m.Z,{}),(0,w.jsx)("input",{type:"file",onChange:function(e){e.target.files&&Y((0,i.Z)((0,i.Z)({},M),{},{files:[].concat((0,s.Z)(M.files),[e.target.files[0]])}))},hidden:!0})]})}),(0,w.jsx)(f.Z,{title:"Insert Link",children:(0,w.jsx)(x.Z,{onClick:function(){return A(!0)},children:(0,w.jsx)(Z.Z,{})})}),(0,w.jsx)(c.Z,{sx:{display:"flex",flexDirection:"row",maxWidth:500,overflowX:"auto"},children:O.map((function(e){return(0,w.jsx)(p.Z,{label:e,sx:{mx:1},onDelete:function(){return function(e){var t=M.links.find((function(t){return t===e})),n=M.files.find((function(t){return t.name===e}));t&&Y((0,i.Z)((0,i.Z)({},M),{},{links:M.links.filter((function(t){return t!==e}))})),n&&Y((0,i.Z)((0,i.Z)({},M),{},{files:M.files.filter((function(t){return t.name!==e}))}))}(e)}},e)}))})]}),n&&(0,w.jsx)(h.Z,{variant:"contained",size:"large",endIcon:(0,w.jsx)(v.Z,{}),onClick:X,disabled:0===M.files.length&&0===M.links.length&&0===M.message.length,children:"Reply"})]}),(0,w.jsx)(I,{open:L,onClose:function(){return A(!1)},onSubmit:function(e){Y((0,i.Z)((0,i.Z)({},M),{},{links:[].concat((0,s.Z)(M.links),[e])})),A(!1)}}),(0,w.jsx)(b.Z,{open:void 0!==P,autoHideDuration:6e3,onClose:_,children:(0,w.jsx)(j.Z,{onClose:_,severity:"error",sx:{width:"100%"},children:P&&P})})]})}},9788:function(e,t,n){"use strict";n.d(t,{Z:function(){return H}});var r=n(4165),a=n(5861),s=n(9439),i=n(2791),l=n(6314),o=n(4554),c=n(890),d=n(8584),u=n(3786),h=n(4721),x=n(6125),f=n(3400),p=n(5527),b=n(4070),j=n(5228),m=n(3896),Z=n(3967),v=n(6557),g=n(9823),y=n(3950),C=n(6569),k=n(7621),w=n(9585),I=n(9504),S=n(3044),T=n(1918),D=n(184),N=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function R(e){var t=e.content;return e.sender?(0,D.jsxs)(k.Z,{children:[(0,D.jsx)(w.Z,{avatar:(0,D.jsx)(S.Z,{sx:{backgroundColor:"red"},children:"".concat(t.sender.firstName.charAt(0)).concat(t.sender.lastName.charAt(0))}),title:t.sender.firstName+" "+t.sender.lastName,subheader:t.sender.role.roleName,action:(0,D.jsx)(c.Z,{variant:"body2",children:N(t.dateSent)})}),(0,D.jsxs)(I.Z,{children:[(0,D.jsx)(c.Z,{variant:"body1",color:"text.secondary",sx:{mb:3},children:t.message}),(0,D.jsx)(l.Z,{direction:"row",spacing:1,sx:{mt:2},children:t.files.map((function(e){return(0,D.jsx)(T.Z,{label:e.fileName,variant:"outlined",component:"a",href:e.fileUrl,target:"_blank",clickable:!0},e.fileId)}))})]})]}):(0,D.jsxs)(o.Z,{sx:{border:"1px solid #989898",borderRadius:3},children:[(0,D.jsx)(w.Z,{avatar:(0,D.jsx)(S.Z,{children:"".concat(t.sender.firstName.charAt(0)).concat(t.sender.lastName.charAt(0))}),title:t.sender.firstName+" "+t.sender.lastName,subheader:t.sender.role.roleName,action:(0,D.jsx)(c.Z,{variant:"body2",children:N(t.dateSent)})}),(0,D.jsxs)(I.Z,{children:[(0,D.jsx)(c.Z,{variant:"body1",color:"text.secondary",sx:{mb:3},children:t.message}),(0,D.jsx)(l.Z,{direction:"row",spacing:1,sx:{mt:2},children:t.files.map((function(e){return(0,D.jsx)(T.Z,{label:e.fileName,variant:"outlined",component:"a",href:e.fileUrl,target:"_blank",clickable:!0},e.fileId)}))})]})]})}var E=n(4942),L=n(1413),A=n(6151),B=n(4815),G=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function O(e){var t=e.thread,n=e.details;return(0,D.jsx)(B.BB,{children:(0,D.jsxs)(B.T3,{style:F.body,children:[(0,D.jsx)(B.G7,{style:F.table,children:(0,D.jsxs)(B.G7,{style:F.tableRow,children:[(0,D.jsxs)(B.G7,{style:F.tableCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:"BIR"}),(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:"FORM 2309"}),(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:"(REVISED OCTOBER, 1971)"})]}),(0,D.jsxs)(B.G7,{style:F.tableCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellRight,children:"BUREAU OF INTERNAL REVENUE"}),(0,D.jsx)(B.xv,{style:F.tableCellRight,children:"Revenue Region No. 6 - Manila"}),(0,D.jsx)(B.xv,{style:F.tableCellRight,children:"REFERENCE SLIP # ".concat(t.refSlipNum)})]})]})}),(0,D.jsx)(B.G7,{style:F.table,children:(0,D.jsxs)(B.G7,{style:F.tableRow,children:[(0,D.jsxs)(B.G7,{style:F.recipientCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"TO:"}),(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:t.recipient.sectionOffice.officeName})]}),(0,D.jsxs)(B.G7,{style:F.dateCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"DATE:"}),(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:G(t.dateCreated)})]})]})}),(0,D.jsx)(B.G7,{style:F.table,children:(0,D.jsx)(B.G7,{style:F.tableRow,children:(0,D.jsxs)(B.G7,{style:F.purposeCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"SUBJECT:"}),(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:n.subject})]})})}),(0,D.jsx)(B.G7,{style:F.table,children:(0,D.jsxs)(B.G7,{style:F.tableRow,children:[(0,D.jsxs)(B.G7,{style:F.recipientCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"FOR:"}),(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:t.purpose.purposeName})]}),(0,D.jsxs)(B.G7,{style:F.dateCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"DEADLINE:"}),(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:G(t.dateDue)})]})]})}),(0,D.jsx)(B.G7,{style:F.table,children:(0,D.jsx)(B.G7,{style:F.tableRow,children:(0,D.jsxs)(B.G7,{style:F.purposeCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"REMARKS (or additional instructions):"}),(0,D.jsx)(B.xv,{style:F.tableCellLeft,children:n.remarks})]})})}),(0,D.jsx)(B.G7,{style:F.table,children:(0,D.jsxs)(B.G7,{style:F.tableRow,children:[(0,D.jsxs)(B.G7,{style:F.recipientCol,children:[(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"FROM:"}),(0,D.jsx)(B.xv,{style:F.emptyCell}),(0,D.jsx)(B.xv,{style:F.tableCellCenter,children:t.author.firstName+" "+t.author.lastName}),(0,D.jsx)(B.xv,{style:F.tableCellCenterSmall,children:t.author.role.roleName}),(0,D.jsx)(B.xv,{style:F.tableCellCenterSmall,children:t.author.officeSection.sectionOffice.officeName})]}),(0,D.jsx)(B.G7,{style:F.dateCol,children:(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"Office Code: RR-6"})})]})}),(0,D.jsx)(B.G7,{style:F.table,children:(0,D.jsx)(B.G7,{style:F.tableRow,children:(0,D.jsx)(B.G7,{style:F.purposeCol,children:(0,D.jsx)(B.xv,{style:F.tableCellLeftBold,children:"NOTE: This slip must be filled with the papers to which it is attached."})})})})]})})}B.Zx.register({family:"Oswald",src:"https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"});var F=B.mM.create({body:{paddingTop:35,paddingBottom:65,paddingHorizontal:35},table:{width:"auto",borderStyle:"solid",borderWidth:1,padding:8},tableRow:{margin:"auto",marginTop:2,flexDirection:"row"},tableCol:{width:"50%"},recipientCol:{width:"70%"},dateCol:{width:"30%"},purposeCol:{width:"100%"},tableCellLeft:{margin:3,fontSize:11,textAlign:"left"},emptyCell:{height:30},tableCellLeftBold:{margin:3,fontSize:11,textAlign:"left",fontWeight:"bold"},tableCellRight:{margin:3,fontSize:11,textAlign:"right"},tableCellCenter:{margin:3,fontSize:11,textAlign:"center"},tableCellCenterSmall:{margin:3,fontSize:10,textAlign:"center"}});function W(e){var t=e.thread,n=i.useState({subject:"",remarks:""}),r=(0,s.Z)(n,2),a=r[0],o=r[1];i.useEffect((function(){o((function(e){return(0,L.Z)((0,L.Z)({},e),{},{subject:t.subject,remarks:t.messages[0].message})}))}),[t]);var c=function(e){o((0,L.Z)((0,L.Z)({},a),{},(0,E.Z)({},e.target.name,e.target.value)))};return(0,D.jsxs)(l.Z,{spacing:3,sx:{p:2},children:[(0,D.jsx)(d.Z,{multiline:!0,rows:2,name:"subject",label:"Subject",value:a.subject,onChange:c}),(0,D.jsx)(d.Z,{multiline:!0,rows:3,name:"remarks",label:"Remarks",value:a.remarks,onChange:c}),(0,D.jsx)(B.WD,{document:(0,D.jsx)(O,{thread:t,details:a}),fileName:"".concat(t.subject,".pdf"),children:function(e){e.blob;var t=e.url;e.loading,e.error;return(0,D.jsx)(A.Z,{fullWidth:!0,component:"a",href:t,target:"_blank",variant:"contained",children:"Generate Form 2309"})}})]})}var z=n(2522),M=n(6578),Y=n(4376),U=n(3081);function q(e){return(0,D.jsx)("div",{children:e.value===e.index&&e.children})}var P=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function H(e){var t=e.userId,n=e.threadId,k=(0,Z.Z)(),w=(0,M.a)(U.l5,{variables:{uid:n}}),I=w.data,S=w.loading,T=w.refetch,N=(0,M.a)(U.Ph).data,E=(0,Y.D)(U.IJ),L=(0,s.Z)(E,1)[0],A=(0,Y.D)(U.By),B=(0,s.Z)(A,1)[0],G=i.useState(0),O=(0,s.Z)(G,2),F=O[0],H=O[1],_=i.useState(!1),X=(0,s.Z)(_,2),J=X[0],V=X[1],K=i.useState(2),Q=(0,s.Z)(K,2),$=Q[0],ee=Q[1],te=i.useState("true"),ne=(0,s.Z)(te,2),re=ne[0],ae=ne[1],se=i.useState(!1),ie=(0,s.Z)(se,2),le=ie[0],oe=ie[1];i.useEffect((function(){I&&(ee(I.getThreadById.status.statusId),ae(I.getThreadById.attachments?"true":"false"),oe(I.getThreadById.completed))}),[I]),i.useEffect((function(){I&&I.getThreadById.messages.filter((function(e){return e.sender.accountId!==t})).forEach((function(e){B({variables:{threadId:I.getThreadById.refId,userId:e.sender.accountId}})}))}),[I,t,B]),i.useEffect((function(){T({uid:n})}),[n,T]);var ce=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L({variables:{uid:n,attachments:"true"===re,statusId:parseInt(t.target.value)}});case 2:oe([1,3].includes(parseInt(t.target.value))),ee(parseInt(t.target.value)),T({uid:n});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),de=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L({variables:{uid:n,attachments:"true"===t.target.value,statusId:$}});case 2:ae(t.target.value);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ue=function(){return T({uid:n})};if(S||!I||!N)return(0,D.jsx)(C.y,{open:!0});var he=I.getThreadById,xe=he.subject,fe=he.author,pe=he.docType,be=he.dateDue,je=he.messages,me=he.recipient,Ze=he.dateUpdated,ve=he.dateCreated,ge=he.status,ye=he.attachments;return(0,D.jsx)(p.Z,{sx:{width:"100%"},children:(0,D.jsxs)(o.Z,{sx:{width:"100%",maxHeight:"calc(100vh - 105px)",overflowY:"auto",overflowX:"hidden","::-webkit-scrollbar":{height:"8px",width:"8px"},"::-webkit-scrollbar-track":{background:k.palette.grey[300]},"::-webkit-scrollbar-thumb":{background:k.palette.secondary.main},"::-webkit-scrollbar-thumb:hover":{background:k.palette.primary.dark}},children:[(0,D.jsxs)(o.Z,{sx:{width:"100%",p:2},children:[(0,D.jsxs)(l.Z,{direction:"row",spacing:1,justifyContent:"space-between",alignItems:"center",children:[(0,D.jsx)(c.Z,{variant:"body2",sx:{fontWeight:800},children:pe.docType}),(0,D.jsxs)(o.Z,{sx:{display:"flex",flexDirection:"row",alignItems:"center"},children:[(0,D.jsx)(c.Z,{variant:"body2",children:"From ".concat(P(ve)," to ").concat(P(be))}),t===I.getThreadById.author.accountId&&(0,D.jsx)(f.Z,{onClick:function(){return V(!J)},children:J?(0,D.jsx)(g.Z,{}):(0,D.jsx)(v.Z,{})}),(0,D.jsx)(f.Z,{onClick:ue,children:(0,D.jsx)(y.Z,{})})]})]}),(0,D.jsx)(x.Z,{in:J,timeout:"auto",unmountOnExit:!0,children:(0,D.jsxs)(l.Z,{direction:"row",spacing:2,justifyContent:"flex-end",sx:{my:2},children:[(0,D.jsx)(d.Z,{name:"status",label:"Status",select:!0,sx:{width:200},value:$,onChange:ce,children:N.getAllThreadStatus.map((function(e){return(0,D.jsx)(u.Z,{value:e.statusId,children:e.statusLabel},e.statusId)}))}),(0,D.jsxs)(d.Z,{name:"attachments",label:"Attachments",select:!0,sx:{width:200},value:re,onChange:de,children:[(0,D.jsx)(u.Z,{value:"true",children:"Required"}),(0,D.jsx)(u.Z,{value:"false",children:"Not Required"})]})]})}),(0,D.jsx)(h.Z,{sx:{mb:1}}),(0,D.jsx)(b.Z,{severity:le?"success":"info",children:le?"This thread is complied and closed at ".concat(P(Ze),"."):ge.statusLabel})]}),(0,D.jsxs)(o.Z,{sx:{px:2},children:[(0,D.jsxs)(c.Z,{variant:"body1",color:"secondary",children:[fe.firstName+" "+fe.lastName,(0,D.jsx)("span",{style:{color:"black"},children:" to "}),"".concat(me.sectionOffice.officeName," ").concat("default"===me.sectionName?"":" \u2014 ".concat(me.sectionName))]}),(0,D.jsx)(c.Z,{variant:"h4",children:xe})]}),(0,D.jsxs)(j.Z,{value:F,onChange:function(e,t){return H(t)},sx:{mt:2},children:[(0,D.jsx)(m.Z,{label:"Conversation"}),(0,D.jsx)(m.Z,{label:"Form 2309"})]}),(0,D.jsxs)(q,{index:0,value:F,children:[(0,D.jsx)(o.Z,{sx:{p:2},children:je.map((function(e){return(0,D.jsx)(o.Z,{sx:{my:2,pl:e.sender.accountId===t?8:0,pr:e.sender.accountId!==t?8:0},children:(0,D.jsx)(R,{content:e,sender:e.sender.accountId===t})},e.msgId)}))}),(0,D.jsx)(o.Z,{sx:{p:2},children:!le&&(0,D.jsx)(z.Z,{userId:t,threadId:n,attached:ye,onSubmit:ue})})]}),(0,D.jsx)(q,{index:1,value:F,children:(0,D.jsx)(W,{thread:I.getThreadById})})]})})}},2480:function(){}}]);
//# sourceMappingURL=341.57a4a54e.chunk.js.map