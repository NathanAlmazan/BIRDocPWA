(self.webpackChunkbiranila=self.webpackChunkbiranila||[]).push([[451],{1762:function(e,t,n){"use strict";n.d(t,{Z:function(){return A}});var r=n(4165),a=n(5861),s=n(1413),i=n(9439),l=n(2791),c=n(6314),o=n(6151),d=n(3400),u=n(4721),h=n(8584),x=n(1918),f=n(5523),p=n(9174),b=n(68),j=n(5286),m=n(3543),Z=n(4070),v=n(5527),g=n(7892),y=n.n(g),C=n(4750),I=n(1652),k=n(7079),w=n(1686),S=n(503),T=n(6578),D=n(4376),N=n(1243),R=n(3081),L=n(2522),E=n(6569),B=n(184);function A(e){var t=(0,T.a)(R.u3).data,n=(0,T.a)(R.Eg).data,g=(0,D.D)(R.DD),A=(0,i.Z)(g,1)[0],G=(0,D.D)(R.dI),O=(0,i.Z)(G,1)[0],F=l.useState(),W=(0,i.Z)(F,2),U=W[0],M=W[1],Y=l.useState(),q=(0,i.Z)(Y,2),z=q[0],H=q[1],_=l.useState({subject:"",authorId:e.userId,statusId:2,attachments:!0,completed:!1,dateDue:(new Date).toISOString()}),K=(0,i.Z)(_,2),P=K[0],J=K[1],V=l.useState({message:"",files:[],links:[]}),X=(0,i.Z)(V,2),Q=X[0],$=X[1],ee=l.useState(),te=(0,i.Z)(ee,2),ne=te[0],re=te[1];if(l.useEffect((function(){if(t&&n){var e={};t.getAllOfficeSections.forEach((function(t){e["default"===t.sectionName?t.sectionOffice.officeName:t.sectionOffice.officeName+" \u2014 "+t.sectionName]=t.sectionId})),M(e);var r={};n.getAllThreadTypes.forEach((function(e){r[e.docType]=e.docId})),H(r)}}),[t,n]),!U||!z)return(0,B.jsx)(E.y,{open:!0});var ae=function(){return re((0,s.Z)((0,s.Z)({},ne),{},{general:void 0}))},se=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(){var n,a,i,l,c,o;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(P.recipientId){t.next=3;break}return re((0,s.Z)((0,s.Z)({},ne),{},{recipient:"Recipient is required."})),t.abrupt("return");case 3:if(P.docTypeId){t.next=6;break}return re((0,s.Z)((0,s.Z)({},ne),{},{type:"Type is required."})),t.abrupt("return");case 6:if(0!==P.subject.length){t.next=9;break}return re((0,s.Z)((0,s.Z)({},ne),{},{recipient:"Subject is required."})),t.abrupt("return");case 9:return t.prev=9,t.next=12,A({variables:{data:P}});case 12:if((n=t.sent).data){t.next=16;break}return re((0,s.Z)((0,s.Z)({},ne),{},{general:"Failed to create thread."})),t.abrupt("return");case 16:if(a=[],i=[],!(Q.files.length>0)){t.next=32;break}return l=new FormData,Q.files.forEach((function(e){l.append("files",e)})),t.prev=21,t.next=24,N.Z.post("http://birtracker.nat911.com/api/upload",l);case 24:c=t.sent,a=c.data.files,t.next=32;break;case 28:return t.prev=28,t.t0=t.catch(21),re((0,s.Z)((0,s.Z)({},ne),{},{general:t.t0.message})),t.abrupt("return");case 32:return Q.links.length>0&&(i=Q.links.map((function(e){return{fileName:e.split("/").pop(),fileType:"",fileUrl:e}}))),o=a.concat(i),t.prev=34,t.next=37,O({variables:{data:{message:Q.message,files:o,senderId:e.userId,threadId:n.data.createThread.refId}}});case 37:e.onCreateThread(n.data.createThread.refId),t.next=44;break;case 40:return t.prev=40,t.t1=t.catch(34),re((0,s.Z)((0,s.Z)({},ne),{},{general:t.t1.message})),t.abrupt("return");case 44:t.next=50;break;case 46:return t.prev=46,t.t2=t.catch(9),re((0,s.Z)((0,s.Z)({},ne),{},{general:t.t2.message})),t.abrupt("return");case 50:case"end":return t.stop()}}),t,null,[[9,46],[21,28],[34,40]])})));return function(){return t.apply(this,arguments)}}();return(0,B.jsx)(v.Z,{children:(0,B.jsxs)(c.Z,{spacing:3,sx:{p:2},children:[(0,B.jsxs)("div",{children:[(0,B.jsxs)(c.Z,{direction:"row",spacing:1,alignItems:"center",sx:{py:1},children:[(0,B.jsx)(o.Z,{variant:"contained",endIcon:(0,B.jsx)(w.Z,{}),onClick:se,children:"Send"}),(0,B.jsx)(b.Z,{title:"Discard",children:(0,B.jsx)(d.Z,{onClick:e.onDiscardThread,children:(0,B.jsx)(S.Z,{})})})]}),(0,B.jsx)(u.Z,{})]}),(0,B.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,B.jsx)(x.Z,{label:"To",variant:"outlined",sx:{width:80}}),(0,B.jsx)(j.Z,{freeSolo:!0,fullWidth:!0,options:Object.keys(U),onChange:function(e,t){return J((0,s.Z)((0,s.Z)({},P),{},{recipientId:U[t]}))},renderInput:function(e){return(0,B.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard",error:void 0!==(null===ne||void 0===ne?void 0:ne.recipient),helperText:ne&&ne.recipient}))}})]}),(0,B.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,B.jsx)(x.Z,{label:"Subject",variant:"outlined",sx:{width:80}}),(0,B.jsx)(h.Z,{name:"subject",variant:"standard",value:P.subject,onChange:function(e){return J((0,s.Z)((0,s.Z)({},P),{},{subject:e.target.value}))},fullWidth:!0,error:void 0!==(null===ne||void 0===ne?void 0:ne.subject),helperText:ne&&ne.subject})]}),(0,B.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,B.jsx)(x.Z,{label:"Type",variant:"outlined",sx:{width:80}}),(0,B.jsx)(j.Z,{freeSolo:!0,fullWidth:!0,onChange:function(e,t){return J((0,s.Z)((0,s.Z)({},P),{},{docTypeId:z[t]}))},options:Object.keys(z),renderInput:function(e){return(0,B.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard",error:void 0!==(null===ne||void 0===ne?void 0:ne.type),helperText:ne&&ne.type}))}})]}),(0,B.jsx)(I._,{dateAdapter:C.y,children:(0,B.jsx)(k.M,{label:"Date Due",views:["year","month","day"],value:y()(P.dateDue),onChange:function(e){e&&J((0,s.Z)((0,s.Z)({},P),{},{dateDue:e.toISOString()}))},format:"MMMM DD, YYYY"})}),(0,B.jsx)(f.Z,{control:(0,B.jsx)(p.Z,{checked:P.attachments,onChange:function(e){return J((0,s.Z)((0,s.Z)({},P),{},{attachments:e.target.checked}))}}),label:"Attachments Required"}),(0,B.jsx)(L.Z,{userId:e.userId,onChange:function(e){return $(e)}}),(0,B.jsx)(m.Z,{open:void 0!==(null===ne||void 0===ne?void 0:ne.general),autoHideDuration:6e3,onClose:ae,children:(0,B.jsx)(Z.Z,{onClose:ae,severity:"error",sx:{width:"100%"},children:ne&&ne.general})})]})})}},8284:function(e,t,n){"use strict";n.d(t,{Z:function(){return S}});var r=n(9439),a=n(2791),s=n(493),i=n(6314),l=n(6278),c=n(4721),o=n(9900),d=n(653),u=n(3044),h=n(890),x=n(6151),f=n(3400),p=n(5527),b=n(4554),j=n(3967),m=n(6578),Z=n(3081),v=n(3950),g=n(2419),y=n(975),C=n(6569),I=n(184),k={inbox:{title:"Job Well Done!",sub:"You have no active threads"},sent:{title:"Compose a thread",sub:"You have no created threads"},completed:{title:"It's time to work!",sub:"You have no finished threads"}},w=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function S(e){var t=(0,j.Z)(),n=(0,m.a)(Z.PK,{variables:{userId:e.userId}}),S=n.data,T=n.loading,D=n.refetch,N=(0,m.a)(Z.PK,{variables:{userId:e.userId,completed:!0}}),R=N.data,L=N.loading,E=N.refetch,B=(0,m.a)(Z.xe,{variables:{userId:e.userId}}),A=B.data,G=B.loading,O=B.refetch,F=a.useState([]),W=(0,r.Z)(F,2),U=W[0],M=W[1];a.useEffect((function(){S&&A&&R&&("inbox"===e.mode?M(S.getThreadInbox):"sent"===e.mode?M(A.getSentThread):"completed"===e.mode&&M(R.getThreadInbox))}),[S,A,R,e.mode]);return(0,I.jsxs)(a.Fragment,{children:[(0,I.jsx)(C.y,{open:T||G||L}),"completed"!==e.mode&&(0,I.jsxs)(i.Z,{direction:"row",spacing:2,alignItems:"center",sx:{mb:3},children:[(0,I.jsx)(x.Z,{variant:"contained",endIcon:(0,I.jsx)(g.Z,{}),disabled:e.compose,onClick:e.onComposeThread,children:"Compose"}),(0,I.jsx)("div",{children:(0,I.jsx)(f.Z,{onClick:function(){"inbox"===e.mode?D({userId:e.userId}):"sent"===e.mode?O({userId:e.userId}):"completed"===e.mode&&E({userId:e.userId,completed:!0})},children:(0,I.jsx)(v.Z,{})})})]}),(0,I.jsx)(p.Z,{sx:{width:"100%"},children:(0,I.jsxs)(s.Z,{sx:{width:"100%",maxHeight:"calc(100vh - 170px)",overflowY:"auto","::-webkit-scrollbar":{height:"8px",width:"8px"},"::-webkit-scrollbar-track":{background:t.palette.grey[300]},"::-webkit-scrollbar-thumb":{background:t.palette.secondary.main},"::-webkit-scrollbar-thumb:hover":{background:t.palette.primary.dark}},children:[0===U.length&&(0,I.jsxs)(b.Z,{sx:{display:"flex",height:300,justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,I.jsx)(y.Z,{color:"secondary",sx:{fontSize:64,mb:1}}),(0,I.jsx)(h.Z,{variant:"subtitle1",children:k[e.mode].title}),(0,I.jsx)(h.Z,{variant:"body1",children:k[e.mode].sub})]}),U.map((function(t){return(0,I.jsxs)(a.Fragment,{children:[(0,I.jsxs)(l.Z,{alignItems:"flex-start",onClick:function(){return e.onThreadClick(t.refId)},children:[(0,I.jsx)(d.Z,{children:(0,I.jsx)(u.Z,{children:"".concat(t.author.firstName.charAt(0)).concat(t.author.lastName.charAt(0))})}),(0,I.jsx)(o.Z,{primary:(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(h.Z,{variant:"body1",children:t.subject}),(0,I.jsx)(h.Z,{variant:"caption",gutterBottom:!0,children:"Due at ".concat(w(t.dateDue),"  (").concat(t.status.statusLabel,")")})]}),secondary:(0,I.jsxs)(a.Fragment,{children:[(0,I.jsx)(h.Z,{sx:{display:"inline"},component:"span",variant:"subtitle2",color:"text.primary",children:"".concat(t.author.firstName," ").concat(t.author.lastName)})," \u2014 "+t.docType.docType]})})]}),(0,I.jsx)(c.Z,{variant:"inset",component:"li"})]},t.refId)}))]})})]})}},2522:function(e,t,n){"use strict";n.d(t,{Z:function(){return N}});var r=n(4165),a=n(5861),s=n(3433),i=n(1413),l=n(9439),c=n(2791),o=n(4554),d=n(6314),u=n(8584),h=n(6151),x=n(3400),f=n(68),p=n(1918),b=n(3543),j=n(4070),m=n(5423),Z=n(103),v=n(2637),g=n(5574),y=n(7123),C=n(9157),I=n(5661),k=n(184);function w(e){var t=c.useState(""),n=(0,l.Z)(t,2),r=n[0],a=n[1];return(0,k.jsx)(g.Z,{open:e.open,onClose:e.onClose,maxWidth:"md",children:(0,k.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.onSubmit(r),a("")},children:[(0,k.jsx)(I.Z,{children:"Add Link"}),(0,k.jsx)(C.Z,{children:(0,k.jsx)(u.Z,{autoFocus:!0,margin:"dense",name:"link",label:"File Link",type:"url",fullWidth:!0,value:r,onChange:function(e){return a(e.target.value)},variant:"standard",sx:{minWidth:500},required:!0})}),(0,k.jsxs)(y.Z,{children:[(0,k.jsx)(h.Z,{onClick:e.onClose,children:"Cancel"}),(0,k.jsx)(h.Z,{type:"submit",children:"Add Link"})]})]})})}var S=n(4376),T=n(1243),D=n(3081);function N(e){var t=e.userId,n=e.threadId,g=e.attached,y=e.onChange,C=e.onSubmit,I=(0,S.D)(D.dI),N=(0,l.Z)(I,1)[0],R=c.useState(!1),L=(0,l.Z)(R,2),E=L[0],B=L[1],A=c.useState([]),G=(0,l.Z)(A,2),O=G[0],F=G[1],W=c.useState({message:"",files:[],links:[]}),U=(0,l.Z)(W,2),M=U[0],Y=U[1],q=c.useState(),z=(0,l.Z)(q,2),H=z[0],_=z[1];c.useEffect((function(){var e=M.files.map((function(e){return e.name}));F(e.concat(M.links))}),[M,y]),c.useEffect((function(){y&&y(M)}),[M,y]);var K=function(){return _(void 0)},P=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var a,s,i,l,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:if(!g||0!==M.files.length||0!==M.links.length){e.next=5;break}return _("Attached file is required."),e.abrupt("return");case 5:if(a=[],s=[],!(M.files.length>0)){e.next=21;break}return i=new FormData,M.files.forEach((function(e){i.append("files",e)})),e.prev=10,e.next=13,T.Z.post("http://birtracker.nat911.com/api/upload",i);case 13:l=e.sent,a=l.data.files,e.next=21;break;case 17:return e.prev=17,e.t0=e.catch(10),_(e.t0.message),e.abrupt("return");case 21:return M.links.length>0&&(s=M.links.map((function(e){return{fileName:e.split("/").pop(),fileType:"",fileUrl:e}}))),c=a.concat(s),e.prev=23,e.next=26,N({variables:{data:{message:M.message,files:c,senderId:t,threadId:n}}});case 26:Y({message:"",files:[],links:[]}),C&&C(),e.next=34;break;case 30:return e.prev=30,e.t1=e.catch(23),_(e.t1.message),e.abrupt("return");case 34:case"end":return e.stop()}}),e,null,[[10,17],[23,30]])})));return function(){return e.apply(this,arguments)}}();return(0,k.jsxs)(o.Z,{sx:{width:"100%",backgroundColor:"#F2F3F4",position:"relative"},children:[(0,k.jsx)(u.Z,{name:"message",value:M.message,onChange:function(e){return Y((0,i.Z)((0,i.Z)({},M),{},{message:e.target.value}))},multiline:!0,rows:6,fullWidth:!0}),(0,k.jsxs)(d.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",sx:{position:"absolute",bottom:0,left:0,right:0,p:1},children:[(0,k.jsxs)(o.Z,{sx:{display:"flex",flexDirection:"row"},children:[(0,k.jsx)(f.Z,{title:"Upload File",children:(0,k.jsxs)(x.Z,{component:"label",children:[(0,k.jsx)(m.Z,{}),(0,k.jsx)("input",{type:"file",onChange:function(e){e.target.files&&Y((0,i.Z)((0,i.Z)({},M),{},{files:[].concat((0,s.Z)(M.files),[e.target.files[0]])}))},hidden:!0})]})}),(0,k.jsx)(f.Z,{title:"Insert Link",children:(0,k.jsx)(x.Z,{onClick:function(){return B(!0)},children:(0,k.jsx)(Z.Z,{})})}),(0,k.jsx)(o.Z,{sx:{display:"flex",flexDirection:"row",maxWidth:500,overflowX:"auto"},children:O.map((function(e){return(0,k.jsx)(p.Z,{label:e,sx:{mx:1},onDelete:function(){return function(e){var t=M.links.find((function(t){return t===e})),n=M.files.find((function(t){return t.name===e}));t&&Y((0,i.Z)((0,i.Z)({},M),{},{links:M.links.filter((function(t){return t!==e}))})),n&&Y((0,i.Z)((0,i.Z)({},M),{},{files:M.files.filter((function(t){return t.name!==e}))}))}(e)}},e)}))})]}),n&&(0,k.jsx)(h.Z,{variant:"contained",size:"large",endIcon:(0,k.jsx)(v.Z,{}),onClick:P,disabled:0===M.files.length&&0===M.links.length&&0===M.message.length,children:"Reply"})]}),(0,k.jsx)(w,{open:E,onClose:function(){return B(!1)},onSubmit:function(e){Y((0,i.Z)((0,i.Z)({},M),{},{links:[].concat((0,s.Z)(M.links),[e])})),B(!1)}}),(0,k.jsx)(b.Z,{open:void 0!==H,autoHideDuration:6e3,onClose:K,children:(0,k.jsx)(j.Z,{onClose:K,severity:"error",sx:{width:"100%"},children:H&&H})})]})}},1246:function(e,t,n){"use strict";n.d(t,{Z:function(){return U}});var r=n(4165),a=n(5861),s=n(9439),i=n(2791),l=n(6314),c=n(4554),o=n(890),d=n(8584),u=n(3786),h=n(4721),x=n(6125),f=n(3400),p=n(5527),b=n(533),j=n(4070),m=n(3967),Z=n(6557),v=n(9823),g=n(3950),y=n(6569),C=n(7621),I=n(9585),k=n(9504),w=n(3044),S=n(1918),T=n(184),D=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function N(e){var t=e.content;return e.sender?(0,T.jsxs)(C.Z,{children:[(0,T.jsx)(I.Z,{avatar:(0,T.jsx)(w.Z,{sx:{backgroundColor:"red"},children:"".concat(t.sender.firstName.charAt(0)).concat(t.sender.lastName.charAt(0))}),title:t.sender.firstName+" "+t.sender.lastName,subheader:t.sender.position,action:(0,T.jsx)(o.Z,{variant:"body2",children:D(t.dateSent)})}),(0,T.jsxs)(k.Z,{children:[(0,T.jsx)(o.Z,{variant:"body1",color:"text.secondary",sx:{mb:3},children:t.message}),(0,T.jsx)(l.Z,{direction:"row",spacing:1,sx:{mt:2},children:t.files.map((function(e){return(0,T.jsx)(S.Z,{label:e.fileName,variant:"outlined",component:"a",href:e.fileUrl,target:"_blank",clickable:!0},e.fileId)}))})]})]}):(0,T.jsxs)(c.Z,{sx:{border:"1px solid #989898",borderRadius:3},children:[(0,T.jsx)(I.Z,{avatar:(0,T.jsx)(w.Z,{children:"".concat(t.sender.firstName.charAt(0)).concat(t.sender.lastName.charAt(0))}),title:t.sender.firstName+" "+t.sender.lastName,subheader:t.sender.position,action:(0,T.jsx)(o.Z,{variant:"body2",children:D(t.dateSent)})}),(0,T.jsxs)(k.Z,{children:[(0,T.jsx)(o.Z,{variant:"body1",color:"text.secondary",sx:{mb:3},children:t.message}),(0,T.jsx)(l.Z,{direction:"row",spacing:1,sx:{mt:2},children:t.files.map((function(e){return(0,T.jsx)(S.Z,{label:e.fileName,variant:"outlined",component:"a",href:e.fileUrl,target:"_blank",clickable:!0},e.fileId)}))})]})]})}var R=n(2522),L=n(6578),E=n(4376),B=n(3081),A=n(4815),G=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"})};function O(e){var t=e.thread;return(0,T.jsx)(A.BB,{children:(0,T.jsxs)(A.T3,{style:F.body,children:[(0,T.jsx)(A.G7,{style:F.table,children:(0,T.jsxs)(A.G7,{style:F.tableRow,children:[(0,T.jsxs)(A.G7,{style:F.tableCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:"BIR"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:"FORM 2309"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:"(REVISED OCTOBER, 1971)"})]}),(0,T.jsxs)(A.G7,{style:F.tableCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellRight,children:"BUREAU OF INTERNAL REVENUE"}),(0,T.jsx)(A.xv,{style:F.tableCellRight,children:"Revenue Region No. 6 - Manila"}),(0,T.jsx)(A.xv,{style:F.tableCellRight,children:"REFERENCE SLIP # 03-2020"})]})]})}),(0,T.jsx)(A.G7,{style:F.table,children:(0,T.jsxs)(A.G7,{style:F.tableRow,children:[(0,T.jsxs)(A.G7,{style:F.recipientCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"TO:"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:t.recipient.sectionOffice.officeName})]}),(0,T.jsxs)(A.G7,{style:F.dateCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"DATE:"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:G(t.dateCreated)})]})]})}),(0,T.jsx)(A.G7,{style:F.table,children:(0,T.jsx)(A.G7,{style:F.tableRow,children:(0,T.jsxs)(A.G7,{style:F.purposeCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"SUBJECT:"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:t.subject})]})})}),(0,T.jsxs)(A.G7,{style:F.table,children:[(0,T.jsxs)(A.G7,{style:F.tableRow,children:[(0,T.jsxs)(A.G7,{style:F.recipientCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"FOR:"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:t.docType.docType})]}),(0,T.jsxs)(A.G7,{style:F.dateCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"DEADLINE:"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:G(t.dateDue)})]})]}),(0,T.jsx)(A.G7,{style:F.tableRow,children:(0,T.jsxs)(A.G7,{style:F.purposeCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"OTHERS:"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:"---"})]})})]}),(0,T.jsx)(A.G7,{style:F.table,children:(0,T.jsx)(A.G7,{style:F.tableRow,children:(0,T.jsxs)(A.G7,{style:F.purposeCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"REMARKS (or additional instructions):"}),(0,T.jsx)(A.xv,{style:F.tableCellLeft,children:t.messages[0].message})]})})}),(0,T.jsx)(A.G7,{style:F.table,children:(0,T.jsxs)(A.G7,{style:F.tableRow,children:[(0,T.jsxs)(A.G7,{style:F.recipientCol,children:[(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"FROM:"}),(0,T.jsx)(A.xv,{style:F.emptyCell}),(0,T.jsx)(A.xv,{style:F.tableCellCenter,children:t.author.firstName+" "+t.author.lastName}),(0,T.jsx)(A.xv,{style:F.tableCellCenterSmall,children:t.author.position}),(0,T.jsx)(A.xv,{style:F.tableCellCenterSmall,children:t.author.officeSection.sectionOffice.officeName})]}),(0,T.jsx)(A.G7,{style:F.dateCol,children:(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"Office Code: RR-6"})})]})}),(0,T.jsx)(A.G7,{style:F.table,children:(0,T.jsx)(A.G7,{style:F.tableRow,children:(0,T.jsx)(A.G7,{style:F.purposeCol,children:(0,T.jsx)(A.xv,{style:F.tableCellLeftBold,children:"NOTE: This slip must be filled with the papers to which it is attached."})})})})]})})}A.Zx.register({family:"Oswald",src:"https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"});var F=A.mM.create({body:{paddingTop:35,paddingBottom:65,paddingHorizontal:35},table:{width:"auto",borderStyle:"solid",borderWidth:1,padding:8},tableRow:{margin:"auto",marginTop:2,flexDirection:"row"},tableCol:{width:"50%"},recipientCol:{width:"70%"},dateCol:{width:"30%"},purposeCol:{width:"100%"},tableCellLeft:{margin:2,fontSize:14,textAlign:"left"},emptyCell:{height:30},tableCellLeftBold:{margin:2,fontSize:14,textAlign:"left",fontWeight:"bold"},tableCellRight:{margin:2,fontSize:14,textAlign:"right"},tableCellCenter:{margin:2,fontSize:14,textAlign:"center"},tableCellCenterSmall:{margin:2,fontSize:12,textAlign:"center"}}),W=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function U(e){var t=e.userId,n=e.threadId,C=(0,m.Z)(),I=(0,L.a)(B.l5,{variables:{uid:n}}),k=I.data,w=I.loading,S=I.refetch,D=(0,L.a)(B.Ph).data,G=(0,E.D)(B.IJ),F=(0,s.Z)(G,1)[0],U=(0,E.D)(B.By),M=(0,s.Z)(U,1)[0],Y=i.useState(!1),q=(0,s.Z)(Y,2),z=q[0],H=q[1],_=i.useState(2),K=(0,s.Z)(_,2),P=K[0],J=K[1],V=i.useState("true"),X=(0,s.Z)(V,2),Q=X[0],$=X[1],ee=i.useState(!1),te=(0,s.Z)(ee,2),ne=te[0],re=te[1];i.useEffect((function(){k&&(J(k.getThreadById.status.statusId),$(k.getThreadById.attachments?"true":"false"),re(k.getThreadById.completed))}),[k]),i.useEffect((function(){k&&k.getThreadById.messages.filter((function(e){return e.sender.accountId!==t})).forEach((function(e){M({variables:{threadId:k.getThreadById.refId,userId:e.sender.accountId}})}))}),[k,t,M]),i.useEffect((function(){S({uid:n})}),[n,S]);var ae=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F({variables:{uid:n,attachments:"true"===Q,statusId:parseInt(t.target.value)}});case 2:re([1,3].includes(parseInt(t.target.value))),J(parseInt(t.target.value)),S({uid:n});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),se=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F({variables:{uid:n,attachments:"true"===t.target.value,statusId:P}});case 2:$(t.target.value);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(){return S({uid:n})};if(w||!k||!D)return(0,T.jsx)(y.y,{open:!0});var le=k.getThreadById,ce=le.subject,oe=le.author,de=le.docType,ue=le.dateDue,he=le.messages,xe=le.recipient,fe=le.dateUpdated,pe=le.dateCreated,be=le.status,je=le.attachments;return(0,T.jsx)(p.Z,{sx:{width:"100%"},children:(0,T.jsxs)(c.Z,{sx:{width:"100%",maxHeight:"calc(100vh - 105px)",overflowY:"auto",overflowX:"hidden","::-webkit-scrollbar":{height:"8px",width:"8px"},"::-webkit-scrollbar-track":{background:C.palette.grey[300]},"::-webkit-scrollbar-thumb":{background:C.palette.secondary.main},"::-webkit-scrollbar-thumb:hover":{background:C.palette.primary.dark}},children:[(0,T.jsxs)(c.Z,{sx:{width:"100%",p:2},children:[(0,T.jsxs)(l.Z,{direction:"row",spacing:1,justifyContent:"space-between",alignItems:"center",children:[(0,T.jsx)(A.WD,{document:(0,T.jsx)(O,{thread:k.getThreadById}),fileName:"".concat(k.getThreadById.subject,".pdf"),children:function(e){e.blob;var t=e.url,n=e.loading;e.error;return(0,T.jsx)(b.Z,{variant:"subtitle2",href:t,target:"_blank",sx:{textDecoration:"none",color:"black"},children:"".concat(de.docType," ").concat(!n&&"(Download Form 2309)")})}}),(0,T.jsxs)(c.Z,{sx:{display:"flex",flexDirection:"row",alignItems:"center"},children:[(0,T.jsx)(o.Z,{variant:"body2",children:"From ".concat(W(pe)," to ").concat(W(ue))}),t===k.getThreadById.author.accountId&&(0,T.jsx)(f.Z,{onClick:function(){return H(!z)},children:z?(0,T.jsx)(v.Z,{}):(0,T.jsx)(Z.Z,{})}),(0,T.jsx)(f.Z,{onClick:ie,children:(0,T.jsx)(g.Z,{})})]})]}),(0,T.jsx)(x.Z,{in:z,timeout:"auto",unmountOnExit:!0,children:(0,T.jsxs)(l.Z,{direction:"row",spacing:2,justifyContent:"flex-end",sx:{my:2},children:[(0,T.jsx)(d.Z,{name:"status",label:"Status",select:!0,sx:{width:200},value:P,onChange:ae,children:D.getAllThreadStatus.map((function(e){return(0,T.jsx)(u.Z,{value:e.statusId,children:e.statusLabel},e.statusId)}))}),(0,T.jsxs)(d.Z,{name:"attachments",label:"Attachments",select:!0,sx:{width:200},value:Q,onChange:se,children:[(0,T.jsx)(u.Z,{value:"true",children:"Required"}),(0,T.jsx)(u.Z,{value:"false",children:"Not Required"})]})]})}),(0,T.jsx)(h.Z,{sx:{mb:1}}),(0,T.jsx)(j.Z,{severity:ne?"success":"info",children:ne?"This thread is complied and closed at ".concat(W(fe),"."):be.statusLabel})]}),(0,T.jsxs)(c.Z,{sx:{px:2},children:[(0,T.jsxs)(o.Z,{variant:"body1",color:"secondary",children:[oe.firstName+" "+oe.lastName,(0,T.jsx)("span",{style:{color:"black"},children:" to "}),"".concat(xe.sectionOffice.officeName," ").concat("default"===xe.sectionName?"":" \u2014 ".concat(xe.sectionName))]}),(0,T.jsx)(o.Z,{variant:"h4",children:ce})]}),(0,T.jsx)(c.Z,{sx:{p:2},children:he.map((function(e){return(0,T.jsx)(c.Z,{sx:{my:2,pl:e.sender.accountId===t?8:0,pr:e.sender.accountId!==t?8:0},children:(0,T.jsx)(N,{content:e,sender:e.sender.accountId===t})},e.msgId)}))}),(0,T.jsx)(c.Z,{sx:{p:2},children:!ne&&(0,T.jsx)(R.Z,{userId:t,threadId:n,attached:je,onSubmit:ie})})]})})}},2480:function(){}}]);
//# sourceMappingURL=451.ae45f108.chunk.js.map