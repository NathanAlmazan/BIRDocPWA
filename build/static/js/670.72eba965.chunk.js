(self.webpackChunkbiranila=self.webpackChunkbiranila||[]).push([[670],{1762:function(e,t,n){"use strict";n.d(t,{Z:function(){return q}});var r=n(4165),a=n(5861),s=n(1413),i=n(9439),l=n(2791),c=n(6314),o=n(6151),d=n(3400),u=n(4721),h=n(9218),f=n(3786),x=n(1918),p=n(5523),m=n(9174),Z=n(890),j=n(68),g=n(5286),b=n(3543),v=n(4070),y=n(5527),I=n(4554),k=n(3967),C=n(7892),w=n.n(C),S=n(4750),N=n(1652),T=n(7079),D=n(1686),R=n(503),E=n(6578),F=n(4376),A=n(1243),B=n(3081),L=n(2522),O=n(6569),G=n(9416),U=n(184);function W(e,t){return e&&t?" (".concat(e,"-").concat(t,")"):e?" (".concat(e,")"):""}function q(e){var t=(0,k.Z)(),n=(0,E.a)(B.yC,{variables:{authorId:e.userId}}).data,C=(0,E.a)(B.u3).data,q=(0,E.a)(B.Eg).data,z=(0,E.a)(B.Do).data,P=(0,E.a)(B.OG).data,M=(0,E.a)(G.Yp,{variables:{officeIds:[]}}),Y=M.data,H=M.refetch,_=(0,F.D)(B.DD),X=(0,i.Z)(_,1)[0],J=(0,F.D)(B.dI),V=(0,i.Z)(J,1)[0],K=l.useState(),Q=(0,i.Z)(K,2),$=Q[0],ee=Q[1],te=l.useState(),ne=(0,i.Z)(te,2),re=ne[0],ae=ne[1],se=l.useState(),ie=(0,i.Z)(se,2),le=ie[0],ce=ie[1],oe=l.useState(),de=(0,i.Z)(oe,2),ue=de[0],he=de[1],fe=l.useState({subject:"",authorId:e.userId,statusId:2,attachments:!0,completed:!1,dateDue:(new Date).toISOString(),tagId:null,recipientId:[],recipientUserId:[],purposeNotes:""}),xe=(0,i.Z)(fe,2),pe=xe[0],me=xe[1],Ze=l.useState({message:"",files:[],links:[]}),je=(0,i.Z)(Ze,2),ge=je[0],be=je[1],ve=l.useState(),ye=(0,i.Z)(ve,2),Ie=ye[0],ke=ye[1];if(l.useEffect((function(){if(C&&q&&z){var e={};C.getAllOfficeSections.forEach((function(t){"default"===t.sectionName?(e[t.sectionOffice.officeName+" \u2014 All"+W(t.sectionOffice.refNum,t.refNum)]=-t.sectionOffice.officeId,e[t.sectionOffice.officeName+" \u2014 Admin"+W(t.sectionOffice.refNum,t.refNum)]=t.sectionId):e[t.sectionOffice.officeName+" \u2014 "+t.sectionName+W(t.sectionOffice.refNum,t.refNum)]=t.sectionId})),ee(e);var t={};q.getAllThreadTypes.forEach((function(e){t[e.docType]=e.docId})),ae(t);var n={};z.getAllThreadPurpose.forEach((function(e){n[e.purposeName]=e.purposeId})),ce(n)}}),[C,q,z]),l.useEffect((function(){if(Y){var e={};Y.getAccountsByOffice.forEach((function(t){e[t.firstName+" "+t.lastName]=t.accountId})),he(e)}}),[Y]),!$||!re||!le||!ue)return(0,U.jsx)(O.y,{open:!0});var Ce=function(){return ke((0,s.Z)((0,s.Z)({},Ie),{},{general:void 0}))},we=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(){var n,a,i,l,c,o,d,u;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(pe.recipientId){t.next=3;break}return ke((0,s.Z)((0,s.Z)({},Ie),{},{recipient:"Recipient is required."})),t.abrupt("return");case 3:if(pe.purposeId){t.next=6;break}return ke((0,s.Z)((0,s.Z)({},Ie),{},{purpose:"Purpose is required."})),t.abrupt("return");case 6:if(pe.docTypeId){t.next=9;break}return ke((0,s.Z)((0,s.Z)({},Ie),{},{type:"Type is required."})),t.abrupt("return");case 9:if(0!==pe.subject.length){t.next=12;break}return ke((0,s.Z)((0,s.Z)({},Ie),{},{recipient:"Subject is required."})),t.abrupt("return");case 12:return t.prev=12,t.next=15,X({variables:{data:pe}});case 15:if((n=t.sent).data){t.next=19;break}return ke((0,s.Z)((0,s.Z)({},Ie),{},{general:"Failed to create thread."})),t.abrupt("return");case 19:if(a=[],i=[],!(ge.files.length>0)){t.next=35;break}return l=new FormData,ge.files.forEach((function(e){l.append("files",e)})),t.prev=24,t.next=27,A.Z.post("https://birtrackertest.nat911.com/api/upload",l);case 27:c=t.sent,a=c.data.files,t.next=35;break;case 31:return t.prev=31,t.t0=t.catch(24),ke((0,s.Z)((0,s.Z)({},Ie),{},{general:t.t0.message})),t.abrupt("return");case 35:ge.links.length>0&&(i=ge.links.map((function(e){return{fileName:e.name,fileType:"url",fileUrl:e.link}}))),o=a.concat(i),t.prev=37,d=0;case 39:if(!(d<n.data.createThread.length)){t.next=46;break}return u=n.data.createThread[d],t.next=43,V({variables:{data:{message:ge.message,files:o,senderId:e.userId,threadId:u.refId}}});case 43:d++,t.next=39;break;case 46:e.onCreateThread(n.data.createThread[0].refId),t.next=53;break;case 49:return t.prev=49,t.t1=t.catch(37),ke((0,s.Z)((0,s.Z)({},Ie),{},{general:t.t1.message})),t.abrupt("return");case 53:t.next=59;break;case 55:return t.prev=55,t.t2=t.catch(12),ke((0,s.Z)((0,s.Z)({},Ie),{},{general:t.t2.message})),t.abrupt("return");case 59:case"end":return t.stop()}}),t,null,[[12,55],[24,31],[37,49]])})));return function(){return t.apply(this,arguments)}}();return(0,U.jsx)(y.Z,{sx:{width:"100%"},children:(0,U.jsx)(I.Z,{sx:{width:"100%",maxHeight:"calc(100vh - 105px)",overflowY:"auto",overflowX:"hidden","::-webkit-scrollbar":{height:"8px",width:"8px"},"::-webkit-scrollbar-track":{background:t.palette.grey[300]},"::-webkit-scrollbar-thumb":{background:t.palette.secondary.main},"::-webkit-scrollbar-thumb:hover":{background:t.palette.primary.dark}},children:(0,U.jsxs)(c.Z,{spacing:3,sx:{p:2},children:[(0,U.jsxs)("div",{children:[(0,U.jsxs)(c.Z,{direction:"row",justifyContent:"space-between",alignItems:"end",children:[(0,U.jsxs)(c.Z,{direction:"row",spacing:1,alignItems:"center",sx:{py:1},children:[(0,U.jsx)(o.Z,{variant:"contained",endIcon:(0,U.jsx)(D.Z,{}),onClick:we,children:"Send"}),(0,U.jsx)(j.Z,{title:"Discard",children:(0,U.jsx)(d.Z,{onClick:e.onDiscardThread,children:(0,U.jsx)(R.Z,{})})})]}),n&&(0,U.jsx)(Z.Z,{variant:"body2",sx:{fontWeight:800},children:"".concat(n.getThreadRefNum)})]}),(0,U.jsx)(u.Z,{})]}),(0,U.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,U.jsx)(x.Z,{label:"To",variant:"outlined",sx:{width:80}}),(0,U.jsx)(g.Z,{multiple:!0,freeSolo:!0,fullWidth:!0,options:Object.keys($),onChange:function(e,t){me((0,s.Z)((0,s.Z)({},pe),{},{recipientId:t.map((function(e){return $[e]}))})),H({officeIds:t.map((function(e){return $[e]})).filter((function(e){return e>0}))})},renderInput:function(e){return(0,U.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard",error:void 0!==(null===Ie||void 0===Ie?void 0:Ie.recipient),helperText:Ie&&Ie.recipient}))}})]}),(0,U.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,U.jsx)(x.Z,{label:"Officers",variant:"outlined",sx:{width:80}}),(0,U.jsx)(g.Z,{multiple:!0,freeSolo:!0,fullWidth:!0,options:Object.keys(ue),onChange:function(e,t){me((0,s.Z)((0,s.Z)({},pe),{},{recipientUserId:t.map((function(e){return ue[e]}))}))},renderInput:function(e){return(0,U.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard"}))}})]}),(0,U.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,U.jsx)(x.Z,{label:"Subject",variant:"outlined",sx:{width:80}}),(0,U.jsx)(h.Z,{name:"subject",variant:"standard",value:pe.subject,onChange:function(e){return me((0,s.Z)((0,s.Z)({},pe),{},{subject:e.target.value}))},fullWidth:!0,error:void 0!==(null===Ie||void 0===Ie?void 0:Ie.subject),helperText:Ie&&Ie.subject})]}),(0,U.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,U.jsx)(x.Z,{label:"Purpose",variant:"outlined",sx:{width:80}}),(0,U.jsx)(g.Z,{freeSolo:!0,fullWidth:!0,onInputChange:function(e,t){return me((0,s.Z)((0,s.Z)({},pe),{},{purposeNotes:t}))},onChange:function(e,t){return me((0,s.Z)((0,s.Z)({},pe),{},{purposeId:le[t]}))},options:Object.keys(le),renderInput:function(e){return(0,U.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard",error:void 0!==(null===Ie||void 0===Ie?void 0:Ie.purpose),helperText:Ie&&Ie.purpose}))}})]}),(0,U.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,U.jsx)(x.Z,{label:"Type",variant:"outlined",sx:{width:80}}),(0,U.jsx)(g.Z,{freeSolo:!0,fullWidth:!0,onChange:function(e,t){return me((0,s.Z)((0,s.Z)({},pe),{},{docTypeId:re[t]}))},options:Object.keys(re),renderInput:function(e){return(0,U.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{variant:"standard",error:void 0!==(null===Ie||void 0===Ie?void 0:Ie.type),helperText:Ie&&Ie.type}))}})]}),(0,U.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,U.jsx)(x.Z,{label:"Tag",variant:"outlined",sx:{width:80}}),(0,U.jsxs)(h.Z,{fullWidth:!0,name:"tagId",variant:"standard",select:!0,value:pe.tagId?pe.tagId:0,onChange:function(e){var t=parseInt(e.target.value,10);me(0===t?(0,s.Z)((0,s.Z)({},pe),{},{tagId:null}):(0,s.Z)((0,s.Z)({},pe),{},{tagId:t}))},children:[(0,U.jsx)(f.Z,{value:0,children:"None"}),P&&P.getAllThreadTags.map((function(e){return(0,U.jsx)(f.Z,{value:e.tagId,children:e.tagName},e.tagId)}))]})]}),(0,U.jsx)(N._,{dateAdapter:S.y,children:(0,U.jsx)(T.M,{label:"Date Due",views:["year","month","day"],value:w()(pe.dateDue),onChange:function(e){e&&me((0,s.Z)((0,s.Z)({},pe),{},{dateDue:e.toISOString()}))},format:"MMMM DD, YYYY"})}),(0,U.jsx)(p.Z,{control:(0,U.jsx)(m.Z,{checked:pe.attachments,onChange:function(e){return me((0,s.Z)((0,s.Z)({},pe),{},{attachments:e.target.checked}))}}),label:"Attachments Required"}),(0,U.jsx)(L.Z,{userId:e.userId,onChange:function(e){return be(e)}}),(0,U.jsx)(b.Z,{open:void 0!==(null===Ie||void 0===Ie?void 0:Ie.general),autoHideDuration:6e3,onClose:Ce,children:(0,U.jsx)(v.Z,{onClose:Ce,severity:"error",sx:{width:"100%"},children:Ie&&Ie.general})})]})})})}},6908:function(e,t,n){"use strict";n.d(t,{Z:function(){return B}});var r=n(9439),a=n(2791),s=n(493),i=n(6314),l=n(1918),c=n(6278),o=n(4721),d=n(9900),u=n(653),h=n(3044),f=n(890),x=n(6151),p=n(3400),m=n(5527),Z=n(4554),j=n(3967),g=n(3950),b=n(2419),v=n(975),y=n(1413),I=n(2065),k=n(9834),C=n(5473),w=n(1903),S=n(6578),N=n(3081),T=n(184);function D(e){var t=e.selected,n=e.onClick,i=(0,S.a)(N.Eg).data,l=(0,a.useState)(null),d=(0,r.Z)(l,2),u=d[0],h=d[1];return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(p.Z,{onClick:function(e){h(e.currentTarget)},sx:(0,y.Z)({p:0,mx:2},u&&{"&:before":{zIndex:1,content:"''",width:"100%",height:"100%",borderRadius:"50%",position:"absolute",bgcolor:function(e){return(0,I.Fq)(e.palette.grey[900],.8)}}}),children:(0,T.jsx)(w.Z,{})}),(0,T.jsx)(C.ZP,{open:Boolean(u),anchorEl:u,onClose:function(){h(null)},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{p:0,mt:1.5,ml:.75,width:360,"& .MuiMenuItem-root":{typography:"body2",borderRadius:.75}}},children:(0,T.jsx)(Z.Z,{sx:{maxHeight:500,overflowY:"auto"},children:(0,T.jsxs)(s.Z,{disablePadding:!0,subheader:(0,T.jsx)(k.Z,{disableSticky:!0,sx:{py:1,px:2.5,typography:"overline"},children:"Thread Types"}),children:[(0,T.jsx)(c.Z,{onClick:function(){return n(-1)},selected:-1===t,children:"All"}),(0,T.jsx)(o.Z,{sx:{borderStyle:"dashed"}}),i&&i.getAllThreadTypes.map((function(e){return(0,T.jsxs)(a.Fragment,{children:[(0,T.jsx)(c.Z,{onClick:function(){return n(e.docId)},selected:t===e.docId,children:e.docType}),(0,T.jsx)(o.Z,{sx:{borderStyle:"dashed"}})]},e.docId)}))]})})})]})}var R=n(6569),E={inbox:{title:"Job Well Done!",sub:"You have no active threads"},sent:{title:"Compose a thread",sub:"You have no created threads"}},F=function(e){return"Top Priority"===e?"error":"Confidential"===e?"warning":"primary"},A=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function B(e){var t=(0,j.Z)(),n=a.useState(-1),y=(0,r.Z)(n,2),I=y[0],k=y[1];return(0,T.jsxs)(a.Fragment,{children:[(0,T.jsx)(R.y,{open:void 0===e.mails}),(0,T.jsxs)(i.Z,{direction:"row",spacing:2,alignItems:"center",sx:{mb:3},children:["completed"!==e.mode&&(0,T.jsx)(x.Z,{variant:"contained",endIcon:(0,T.jsx)(b.Z,{}),disabled:e.compose,onClick:e.onComposeThread,children:"Compose"}),(0,T.jsx)(p.Z,{onClick:e.onRefresh,children:(0,T.jsx)(g.Z,{})}),(0,T.jsx)(D,{selected:I,onClick:function(e){return k(e)}})]}),(0,T.jsx)(m.Z,{sx:{width:"100%"},children:(0,T.jsxs)(s.Z,{sx:{width:"100%",maxHeight:"calc(100vh - 170px)",overflowY:"auto","::-webkit-scrollbar":{height:"8px",width:"8px"},"::-webkit-scrollbar-track":{background:t.palette.grey[300]},"::-webkit-scrollbar-thumb":{background:t.palette.secondary.main},"::-webkit-scrollbar-thumb:hover":{background:t.palette.primary.dark}},children:[e.mails&&0===e.mails.length&&(0,T.jsxs)(Z.Z,{sx:{display:"flex",height:300,justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,T.jsx)(v.Z,{color:"secondary",sx:{fontSize:64,mb:1}}),(0,T.jsx)(f.Z,{variant:"subtitle1",children:E[e.mode].title}),(0,T.jsx)(f.Z,{variant:"body1",children:E[e.mode].sub})]}),e.mails&&e.mails.filter((function(e){return e.docType.docId===I||-1===I})).map((function(t){return(0,T.jsxs)(a.Fragment,{children:[(0,T.jsxs)(c.Z,{alignItems:"flex-start",onClick:function(){return e.onThreadClick(t.refId)},children:[(0,T.jsx)(u.Z,{children:(0,T.jsx)(h.Z,{children:"".concat(t.author.firstName.charAt(0)).concat(t.author.lastName.charAt(0))})}),(0,T.jsx)(d.Z,{primary:(0,T.jsxs)(Z.Z,{sx:{mb:2},children:[(0,T.jsx)(f.Z,{variant:"body1",gutterBottom:!0,children:t.subject}),(0,T.jsxs)("div",{children:[(0,T.jsx)(f.Z,{sx:{display:"inline"},component:"span",variant:"subtitle2",color:"text.primary",children:"regionInbox"===e.mode?t.recipient.sectionOffice.officeName:"".concat(t.author.firstName," ").concat(t.author.lastName)})," \u2014 ".concat(t.docType.docType," request For ").concat(t.purpose.purposeName,".")]})]}),secondary:(0,T.jsxs)(Z.Z,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[(0,T.jsxs)("div",{children:[(0,T.jsx)(l.Z,{color:t.completed?"success":"info",label:t.status.statusLabel,size:"small",sx:{fontSize:10}}),t.threadTag&&(0,T.jsx)(l.Z,{color:F(t.threadTag.tagName),label:t.threadTag.tagName,size:"small",sx:{fontSize:10}})]}),(0,T.jsx)(f.Z,{variant:"caption",children:"Due at ".concat(A(t.dateDue))})]})})]}),(0,T.jsx)(o.Z,{variant:"inset",component:"li"})]},t.refId)}))]})})]})}},2522:function(e,t,n){"use strict";n.d(t,{Z:function(){return D}});var r=n(4165),a=n(5861),s=n(3433),i=n(1413),l=n(9439),c=n(2791),o=n(4554),d=n(6314),u=n(9218),h=n(6151),f=n(3400),x=n(68),p=n(1918),m=n(3543),Z=n(4070),j=n(5423),g=n(103),b=n(2637),v=n(5574),y=n(7123),I=n(9157),k=n(5661),C=n(184);function w(e){var t=c.useState(""),n=(0,l.Z)(t,2),r=n[0],a=n[1],s=c.useState(""),i=(0,l.Z)(s,2),o=i[0],d=i[1];return(0,C.jsx)(v.Z,{open:e.open,onClose:e.onClose,maxWidth:"md",children:(0,C.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.onSubmit(r,o),d("")},children:[(0,C.jsx)(k.Z,{children:"Add Link"}),(0,C.jsxs)(I.Z,{children:[(0,C.jsx)(u.Z,{autoFocus:!0,margin:"dense",name:"name",label:"File Name",fullWidth:!0,value:r,onChange:function(e){return a(e.target.value)},variant:"standard",sx:{minWidth:300},required:!0}),(0,C.jsx)(u.Z,{autoFocus:!0,margin:"dense",name:"link",label:"File Link",type:"url",fullWidth:!0,value:o,onChange:function(e){return d(e.target.value)},variant:"standard",sx:{minWidth:300},required:!0})]}),(0,C.jsxs)(y.Z,{children:[(0,C.jsx)(h.Z,{onClick:e.onClose,children:"Cancel"}),(0,C.jsx)(h.Z,{type:"submit",children:"Add Link"})]})]})})}var S=n(4376),N=n(1243),T=n(3081);function D(e){var t=e.userId,n=e.threadId,v=e.attached,y=e.onChange,I=e.onSubmit,k=(0,S.D)(T.dI),D=(0,l.Z)(k,1)[0],R=c.useState(!1),E=(0,l.Z)(R,2),F=E[0],A=E[1],B=c.useState([]),L=(0,l.Z)(B,2),O=L[0],G=L[1],U=c.useState({message:"",files:[],links:[]}),W=(0,l.Z)(U,2),q=W[0],z=W[1],P=c.useState(),M=(0,l.Z)(P,2),Y=M[0],H=M[1];c.useEffect((function(){var e=q.files.map((function(e){return e.name}));G(e.concat(q.links.map((function(e){return e.name}))))}),[q,y]),c.useEffect((function(){y&&y(q)}),[q,y]);var _=function(){return H(void 0)},X=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var a,s,i,l,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:if(!v||0!==q.files.length||0!==q.links.length){e.next=5;break}return H("Attached file is required."),e.abrupt("return");case 5:if(a=[],s=[],!(q.files.length>0)){e.next=21;break}return i=new FormData,q.files.forEach((function(e){i.append("files",e)})),e.prev=10,e.next=13,N.Z.post("https://birtrackertest.nat911.com/api/upload",i);case 13:l=e.sent,a=l.data.files,e.next=21;break;case 17:return e.prev=17,e.t0=e.catch(10),H(e.t0.message),e.abrupt("return");case 21:return q.links.length>0&&(s=q.links.map((function(e){return{fileName:e.name,fileType:"url",fileUrl:e.link}}))),c=a.concat(s),e.prev=23,e.next=26,D({variables:{data:{message:q.message,files:c,senderId:t,threadId:n}}});case 26:z({message:"",files:[],links:[]}),I&&I(),e.next=34;break;case 30:return e.prev=30,e.t1=e.catch(23),H(e.t1.message),e.abrupt("return");case 34:case"end":return e.stop()}}),e,null,[[10,17],[23,30]])})));return function(){return e.apply(this,arguments)}}();return(0,C.jsxs)(o.Z,{sx:{width:"100%",backgroundColor:"#F2F3F4",position:"relative"},children:[(0,C.jsx)(u.Z,{name:"message",value:q.message,onChange:function(e){return z((0,i.Z)((0,i.Z)({},q),{},{message:e.target.value}))},multiline:!0,rows:4,fullWidth:!0}),(0,C.jsxs)(d.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",sx:{position:"absolute",bottom:0,left:0,right:0,p:1},children:[(0,C.jsxs)(o.Z,{sx:{display:"flex",flexDirection:"row"},children:[(0,C.jsx)(x.Z,{title:"Upload File",children:(0,C.jsxs)(f.Z,{component:"label",children:[(0,C.jsx)(j.Z,{}),(0,C.jsx)("input",{type:"file",onChange:function(e){e.target.files&&z((0,i.Z)((0,i.Z)({},q),{},{files:[].concat((0,s.Z)(q.files),[e.target.files[0]])}))},hidden:!0})]})}),(0,C.jsx)(x.Z,{title:"Insert Link",children:(0,C.jsx)(f.Z,{onClick:function(){return A(!0)},children:(0,C.jsx)(g.Z,{})})}),(0,C.jsx)(o.Z,{sx:{display:"flex",flexDirection:"row",maxWidth:500,overflowX:"auto"},children:O.map((function(e){return(0,C.jsx)(p.Z,{label:e,sx:{mx:1},onDelete:function(){return function(e){var t=q.links.find((function(t){return t.name===e})),n=q.files.find((function(t){return t.name===e}));t&&z((0,i.Z)((0,i.Z)({},q),{},{links:q.links.filter((function(t){return t.name!==e}))})),n&&z((0,i.Z)((0,i.Z)({},q),{},{files:q.files.filter((function(t){return t.name!==e}))}))}(e)}},e)}))})]}),n&&(0,C.jsx)(h.Z,{variant:"contained",size:"large",endIcon:(0,C.jsx)(b.Z,{}),onClick:X,disabled:0===q.files.length&&0===q.links.length&&0===q.message.length,children:"Reply"})]}),(0,C.jsx)(w,{open:F,onClose:function(){return A(!1)},onSubmit:function(e,t){z((0,i.Z)((0,i.Z)({},q),{},{links:[].concat((0,s.Z)(q.links),[{name:e,link:t}])})),A(!1)}}),(0,C.jsx)(m.Z,{open:void 0!==Y,autoHideDuration:6e3,onClose:_,children:(0,C.jsx)(Z.Z,{onClose:_,severity:"error",sx:{width:"100%"},children:Y&&Y})})]})}},5624:function(e,t,n){"use strict";n.d(t,{Z:function(){return de}});var r=n(4165),a=n(5861),s=n(9439),i=n(2791),l=n(6314),c=n(4554),o=n(890),d=n(9218),u=n(3786),h=n(4721),f=n(6125),x=n(3400),p=n(5527),m=n(6151),Z=n(4070),j=n(9124),g=n(3896),b=n(3967),v=n(6557),y=n(9823),I=n(3950),k=n(6569),C=n(7621),w=n(9585),S=n(9504),N=n(3044),T=n(1918),D=n(184),R=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function E(e){var t=e.content;return e.sender?(0,D.jsxs)(C.Z,{children:[(0,D.jsx)(w.Z,{avatar:(0,D.jsx)(N.Z,{sx:{backgroundColor:"red"},children:"".concat(t.sender.firstName.charAt(0)).concat(t.sender.lastName.charAt(0))}),title:t.sender.firstName+" "+t.sender.lastName,subheader:t.sender.role.roleName,action:(0,D.jsx)(o.Z,{variant:"body2",children:R(t.dateSent)})}),(0,D.jsxs)(S.Z,{children:[(0,D.jsx)(o.Z,{variant:"body1",color:"text.secondary",sx:{mb:3},children:t.message}),(0,D.jsx)(l.Z,{direction:"row",spacing:1,sx:{mt:2},children:t.files.map((function(e){return(0,D.jsx)(T.Z,{label:e.fileName,variant:"outlined",component:"a",href:e.fileUrl,target:"_blank",clickable:!0},e.fileId)}))})]})]}):(0,D.jsxs)(c.Z,{sx:{border:"1px solid #989898",borderRadius:3},children:[(0,D.jsx)(w.Z,{avatar:(0,D.jsx)(N.Z,{children:"".concat(t.sender.firstName.charAt(0)).concat(t.sender.lastName.charAt(0))}),title:t.sender.firstName+" "+t.sender.lastName,subheader:t.sender.role.roleName,action:(0,D.jsx)(o.Z,{variant:"body2",children:R(t.dateSent)})}),(0,D.jsxs)(S.Z,{children:[(0,D.jsx)(o.Z,{variant:"body1",color:"text.secondary",sx:{mb:3},children:t.message}),(0,D.jsx)(l.Z,{direction:"row",spacing:1,sx:{mt:2},children:t.files.map((function(e){return(0,D.jsx)(T.Z,{label:e.fileName,variant:"outlined",component:"a",href:e.fileUrl,target:"_blank",clickable:!0},e.fileId)}))})]})]})}var F=n(4942),A=n(1413),B=n(5574),L=n(5661),O=n(9157),G=n(7123),U=n(1276),W=n.n(U),q=n(1243);function z(e){var t=e.open,n=(e.imageUrl,e.onSubmit),l=e.onClose,c=i.useRef(null),o=i.useState(null),d=(0,s.Z)(o,2),u=d[0],h=d[1],f=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var a,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.target.files){e.next=15;break}return(a=new FormData).append("files",t.target.files[0]),e.prev=3,e.next=6,q.Z.post("https://birtrackertest.nat911.com/api/upload",a);case 6:s=e.sent,n(s.data.files[0].fileUrl),l(),e.next=15;break;case 11:return e.prev=11,e.t0=e.catch(3),h(e.t0.message),e.abrupt("return");case 15:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(t){return e.apply(this,arguments)}}();return(0,D.jsxs)(B.Z,{open:t,onClose:l,maxWidth:"md",children:[(0,D.jsx)(L.Z,{children:"Add Signature"}),(0,D.jsxs)(O.Z,{children:[u&&(0,D.jsx)(Z.Z,{severity:"error",children:u}),(0,D.jsx)(W(),{penColor:"black",ref:c,canvasProps:{width:500,height:200}})]}),(0,D.jsxs)(G.Z,{children:[(0,D.jsxs)(m.Z,{component:"label",children:["Upload Signature",(0,D.jsx)("input",{type:"file",onChange:f,hidden:!0})]}),(0,D.jsx)(m.Z,{onClick:function(){c.current&&(n(c.current.getTrimmedCanvas().toDataURL("image/png")),l())},children:"Submit Signature"}),(0,D.jsx)(m.Z,{color:"error",onClick:function(){c.current&&(c.current.clear(),l())},children:"Cancel"})]})]})}var P=n(4815),M=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function Y(e){var t=e.thread,n=e.details;return(0,D.jsx)(P.BB,{children:(0,D.jsxs)(P.T3,{size:[330.6,525.6],style:H.body,children:[(0,D.jsx)(P.G7,{style:H.table,children:(0,D.jsxs)(P.G7,{style:H.tableRow,children:[(0,D.jsxs)(P.G7,{style:H.tableCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:"BIR"}),(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:"FORM 2309"}),(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:"(REVISED OCTOBER, 1971)"})]}),(0,D.jsxs)(P.G7,{style:H.tableCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellRight,children:"BUREAU OF INTERNAL REVENUE"}),(0,D.jsx)(P.xv,{style:H.tableCellRight,children:"Revenue Region No. 6 - Manila"}),(0,D.jsx)(P.xv,{style:H.tableCellRight,children:"REFERENCE SLIP # ".concat(t.refSlipNum)})]})]})}),(0,D.jsx)(P.G7,{style:H.table,children:(0,D.jsxs)(P.G7,{style:H.tableRow,children:[(0,D.jsxs)(P.G7,{style:H.recipientCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellLeftBold,children:"TO:"}),(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:t.recipient.sectionOffice.officeName})]}),(0,D.jsxs)(P.G7,{style:H.dateCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellLeftBold,children:"DATE:"}),(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:M(t.dateCreated)})]})]})}),(0,D.jsx)(P.G7,{style:H.table,children:(0,D.jsx)(P.G7,{style:H.tableRow,children:(0,D.jsxs)(P.G7,{style:H.purposeCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellLeftBold,children:"SUBJECT:"}),(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:n.subject})]})})}),(0,D.jsx)(P.G7,{style:H.table,children:(0,D.jsxs)(P.G7,{style:H.tableRow,children:[(0,D.jsxs)(P.G7,{style:H.recipientCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellLeftBold,children:"FOR:"}),(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:t.purposeNotes?t.purposeNotes:t.purpose.purposeName})]}),(0,D.jsxs)(P.G7,{style:H.dateCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellLeftBold,children:"DEADLINE:"}),(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:M(t.dateDue)})]})]})}),(0,D.jsx)(P.G7,{style:H.table,children:(0,D.jsx)(P.G7,{style:H.tableRow,children:(0,D.jsxs)(P.G7,{style:H.purposeCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellLeftBold,children:"REMARKS (or additional instructions):"}),(0,D.jsx)(P.xv,{style:H.tableCellLeft,children:n.remarks})]})})}),(0,D.jsx)(P.G7,{style:H.table,children:(0,D.jsxs)(P.G7,{style:H.tableRow,children:[(0,D.jsxs)(P.G7,{style:H.recipientCol,children:[(0,D.jsx)(P.xv,{style:H.tableCellLeftBold,children:"FROM:"}),n.signatureUrl?(0,D.jsx)(P.G7,{style:H.signatureContainer,children:(0,D.jsx)(P.Ee,{style:H.signatureImage,src:n.signatureUrl})}):t.author.signImage?(0,D.jsx)(P.G7,{style:H.signatureContainer,children:(0,D.jsx)(P.Ee,{style:H.signatureImage,src:t.author.signImage})}):(0,D.jsx)(P.xv,{style:H.emptyCell}),(0,D.jsx)(P.xv,{style:H.tableCellCenter,children:t.author.firstName+" "+t.author.lastName}),(0,D.jsx)(P.xv,{style:H.tableCellCenterSmall,children:t.author.role.roleName}),(0,D.jsx)(P.xv,{style:H.tableCellCenterSmall,children:t.author.officeSection.sectionOffice.officeName})]}),(0,D.jsx)(P.G7,{style:H.dateCol,children:(0,D.jsx)(P.xv,{style:H.tableCellLeftBold,children:t.author.officeSection.sectionOffice.refNum})})]})}),(0,D.jsx)(P.G7,{style:H.table,children:(0,D.jsx)(P.G7,{style:H.tableRow,children:(0,D.jsx)(P.G7,{style:H.purposeCol,children:(0,D.jsx)(P.xv,{style:H.tableCellLeftBoldSmall,children:"NOTE: This slip must be filled with the papers to which it is attached."})})})})]})})}P.Zx.register({family:"Oswald",src:"https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"});var H=P.mM.create({body:{paddingTop:15,paddingBottom:15,paddingHorizontal:15},table:{width:"auto",borderStyle:"solid",borderWidth:1,padding:2},tableRow:{margin:"auto",marginTop:2,flexDirection:"row"},tableCol:{width:"50%"},recipientCol:{width:"70%"},dateCol:{width:"30%"},purposeCol:{width:"100%"},tableCellLeft:{margin:2,fontSize:9,textAlign:"left"},emptyCell:{height:30},tableCellLeftBold:{margin:2,fontSize:9,textAlign:"left",fontWeight:"bold"},tableCellLeftBoldSmall:{margin:2,fontSize:6,textAlign:"left",fontWeight:"bold"},tableCellRight:{margin:2,fontSize:9,textAlign:"right"},tableCellCenter:{margin:2,fontSize:8,textAlign:"center"},tableCellCenterSmall:{margin:2,fontSize:8,textAlign:"center"},signatureContainer:{display:"flex",flexDirection:"row",justifyContent:"center"},signatureImage:{width:60,height:30}}),_=n(4376),X=n(9416);function J(e){var t=e.userId,n=e.thread,c=e.onGenerate,o=(0,_.D)(X.sz),u=(0,s.Z)(o,2),h=u[0],f=u[1].error,x=i.useState({subject:"",remarks:"",signatureUrl:null}),p=(0,s.Z)(x,2),j=p[0],g=p[1],b=i.useState(null),v=(0,s.Z)(b,2),y=v[0],I=v[1],k=i.useState(!1),C=(0,s.Z)(k,2),w=C[0],S=C[1];i.useEffect((function(){g((function(e){return(0,A.Z)((0,A.Z)({},e),{},{subject:n.subject,remarks:n.messages[0].message})}))}),[n]),i.useEffect((function(){var e=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!y){e.next=17;break}return(t=new FormData).append("form",y),t.append("requestId",n.refId),e.prev=4,e.next=7,q.Z.post("https://birtrackertest.nat911.com/api/requestForm",t);case 7:a=e.sent,window.open(a.data.fileUrl,"_blank"),c(),e.next=16;break;case 12:return e.prev=12,e.t0=e.catch(4),console.log(e.t0),e.abrupt("return");case 16:I(null);case 17:case"end":return e.stop()}}),e,null,[[4,12]])})));return function(){return e.apply(this,arguments)}}();e()}),[y,c,n.refId]);var N=function(e){g((0,A.Z)((0,A.Z)({},j),{},(0,F.Z)({},e.target.name,e.target.value)))},T=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,a){var s,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a||!t){e.next=16;break}return window.open(a,"_blank"),s=new File([t],"".concat(n.refSlipNum,".pdf"),{type:"application/pdf"}),(i=new FormData).append("form",s),i.append("requestId",n.refId),e.prev=6,e.next=9,q.Z.post("https://birtrackertest.nat911.com/api/requestForm",i);case 9:c(),e.next=16;break;case 12:return e.prev=12,e.t0=e.catch(6),console.log(e.t0),e.abrupt("return");case 16:case"end":return e.stop()}}),e,null,[[6,12]])})));return function(t,n){return e.apply(this,arguments)}}(),R=function(){return S(!w)},E=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g((0,A.Z)((0,A.Z)({},j),{},{signatureUrl:n})),e.next=3,h({variables:{userId:t,signImage:n}});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g((0,A.Z)((0,A.Z)({},j),{},{signatureUrl:null})),e.next=3,h({variables:{userId:t,signImage:null}});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,D.jsxs)(l.Z,{spacing:3,sx:{p:2},children:[f&&(0,D.jsx)(Z.Z,{severity:"error",children:f.message}),(0,D.jsxs)(l.Z,{direction:"row",spacing:1,justifyContent:"flex-end",alignItems:"center",children:[(0,D.jsx)(m.Z,{variant:"outlined",onClick:R,children:"Add Signature"}),n.author.signImage&&(0,D.jsx)(m.Z,{variant:"outlined",color:"error",onClick:B,children:"Remove Signature"})]}),(0,D.jsx)(d.Z,{multiline:!0,rows:2,name:"subject",label:"Subject",value:j.subject,onChange:N}),(0,D.jsx)(d.Z,{multiline:!0,rows:3,name:"remarks",label:"Remarks",value:j.remarks,onChange:N}),(0,D.jsx)(P.WD,{document:(0,D.jsx)(Y,{thread:n,details:j}),fileName:"".concat(n.subject,".pdf"),children:function(e){var t=e.blob,n=e.url;e.loading,e.error;return(0,D.jsx)(m.Z,{fullWidth:!0,onClick:function(){return T(t,n)},variant:"contained",children:"Generate Form 2309"})}}),(0,D.jsxs)(m.Z,{fullWidth:!0,disabled:null!==y,component:"label",variant:"outlined",children:["Upload Form 2309",(0,D.jsx)("input",{type:"file",hidden:!0,onChange:function(e){e.target.files&&I(e.target.files[0])}})]}),(0,D.jsx)(z,{open:w,imageUrl:j.signatureUrl,onSubmit:E,onClose:R})]})}var V=n(2522),K=n(493),Q=n(5021),$=n(9900),ee=n(7064),te=n(3717),ne=n(533);function re(e){var t=i.useState([]),n=(0,s.Z)(t,2),r=n[0],a=n[1];return i.useEffect((function(){var t=[];e.messages.forEach((function(e){t=t.concat(e.files)})),a(t)}),[e.messages]),(0,D.jsxs)(c.Z,{sx:{width:"100%",p:2},children:[(0,D.jsx)(o.Z,{sx:{mt:4,mb:2},variant:"h6",component:"div",children:"Shared Files"}),(0,D.jsxs)(K.Z,{children:[e.reqForm&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(Q.ZP,{children:[(0,D.jsx)(ee.Z,{children:(0,D.jsx)(te.Z,{})}),(0,D.jsx)($.Z,{primary:(0,D.jsx)(o.Z,{component:ne.Z,variant:"body1",href:e.reqForm,target:"_blank",children:"Form 2309"}),secondary:"application/PDF"})]}),(0,D.jsx)(h.Z,{})]}),r.map((function(e){return(0,D.jsxs)(i.Fragment,{children:[(0,D.jsxs)(Q.ZP,{children:[(0,D.jsx)(ee.Z,{children:(0,D.jsx)(te.Z,{})}),(0,D.jsx)($.Z,{primary:(0,D.jsx)(o.Z,{component:ne.Z,variant:"body1",href:e.fileUrl,target:"_blank",children:e.fileName}),secondary:e.fileType})]}),(0,D.jsx)(h.Z,{})]},e.fileId)}))]})]})}var ae=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function se(e){return(0,D.jsxs)(c.Z,{sx:{width:"100%",p:2},children:[(0,D.jsx)(o.Z,{sx:{mt:4,mb:2},variant:"h6",component:"div",children:"Request History"}),(0,D.jsx)(l.Z,{spacing:2,children:e.history.map((function(e,t){return(0,D.jsx)(Z.Z,{severity:(n=e.status?e.status.statusLabel:null,n&&n.includes("Closed")?"success":n&&n.includes("Progress")?"info":n&&n.includes("Approval")?"warning":"info"),children:"".concat(e.historyLabel," ").concat(e.status?"to ".concat(e.status.statusLabel):""," at ").concat(ae(e.dateCreated))},t);var n}))})]})}var ie=n(6578),le=n(3081);function ce(e){return(0,D.jsx)("div",{children:e.value===e.index&&e.children})}var oe=function(e){return new Date(e).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric"})};function de(e){var t=e.userId,n=e.threadId,C=(0,b.Z)(),w=(0,ie.a)(le.l5,{variables:{uid:n}}),S=w.data,N=w.loading,T=w.refetch,R=(0,ie.a)(le.Ph).data,F=(0,_.D)(le.IJ),A=(0,s.Z)(F,1)[0],B=(0,_.D)(le.By),L=(0,s.Z)(B,1)[0],O=(0,_.D)(le.p5),G=(0,s.Z)(O,1)[0],U=(0,_.D)(le.l8),W=(0,s.Z)(U,1)[0],q=i.useState(0),z=(0,s.Z)(q,2),P=z[0],M=z[1],Y=i.useState(!1),H=(0,s.Z)(Y,2),X=H[0],K=H[1],Q=i.useState(2),$=(0,s.Z)(Q,2),ee=$[0],te=$[1],ne=i.useState("true"),ae=(0,s.Z)(ne,2),de=ae[0],ue=ae[1],he=i.useState(!1),fe=(0,s.Z)(he,2),xe=fe[0],pe=fe[1];i.useEffect((function(){S&&(te(S.getThreadById.status.statusId),ue(S.getThreadById.attachments?"true":"false"),pe(S.getThreadById.completed))}),[S]),i.useEffect((function(){S&&S.getThreadById.messages.filter((function(e){return e.sender.accountId!==t})).forEach((function(e){L({variables:{threadId:S.getThreadById.refId,userId:e.sender.accountId}})}))}),[S,t,L]),i.useEffect((function(){T({uid:n})}),[n,T]);var me=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A({variables:{uid:n,attachments:"true"===de,statusId:parseInt(t.target.value)}});case 2:pe([1,3].includes(parseInt(t.target.value))),te(parseInt(t.target.value)),T({uid:n});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ze=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A({variables:{uid:n,attachments:"true"===t.target.value,statusId:ee}});case 2:ue(t.target.value);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),je=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G({variables:{threadId:n}});case 2:T({uid:n});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ge=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W({variables:{threadId:n}});case 2:T({uid:n});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),be=function(){return T({uid:n})};if(N||!S||!R)return(0,D.jsx)(k.y,{open:!0});var ve=S.getThreadById,ye=ve.subject,Ie=ve.author,ke=ve.refSlipNum,Ce=ve.dateDue,we=ve.messages,Se=ve.recipient,Ne=ve.dateUpdated,Te=ve.dateCreated,De=ve.status,Re=ve.attachments,Ee=ve.active,Fe=ve.recipientUser;return(0,D.jsx)(p.Z,{sx:{width:"100%"},children:(0,D.jsxs)(c.Z,{sx:{width:"100%",maxHeight:"calc(100vh - 105px)",overflowY:"auto",overflowX:"hidden","::-webkit-scrollbar":{height:"8px",width:"8px"},"::-webkit-scrollbar-track":{background:C.palette.grey[300]},"::-webkit-scrollbar-thumb":{background:C.palette.secondary.main},"::-webkit-scrollbar-thumb:hover":{background:C.palette.primary.dark}},children:[(0,D.jsxs)(c.Z,{sx:{width:"100%",p:2},children:[(0,D.jsxs)(l.Z,{direction:"row",spacing:1,justifyContent:"space-between",alignItems:"center",children:[(0,D.jsx)(o.Z,{variant:"body2",sx:{fontWeight:800},children:"Ref # ".concat(ke)}),(0,D.jsxs)(c.Z,{sx:{display:"flex",flexDirection:"row",alignItems:"center"},children:[(0,D.jsx)(o.Z,{variant:"body2",children:"From ".concat(oe(Te)," to ").concat(oe(Ce))}),(t===S.getThreadById.author.accountId&&!S.getThreadById.purpose.purposeName.includes("Approval")||t!==S.getThreadById.author.accountId&&S.getThreadById.purpose.purposeName.includes("Approval"))&&(0,D.jsx)(x.Z,{onClick:function(){return K(!X)},children:X?(0,D.jsx)(y.Z,{}):(0,D.jsx)(v.Z,{})}),(0,D.jsx)(x.Z,{onClick:be,children:(0,D.jsx)(I.Z,{})})]})]}),(0,D.jsx)(f.Z,{in:X,timeout:"auto",unmountOnExit:!0,children:(0,D.jsxs)(l.Z,{direction:"row",spacing:2,justifyContent:"flex-end",sx:{my:2},children:[(0,D.jsx)(d.Z,{name:"status",label:"Status",select:!0,sx:{width:200},value:ee,onChange:me,children:R.getAllThreadStatus.map((function(e){return(0,D.jsx)(u.Z,{value:e.statusId,children:e.statusLabel},e.statusId)}))}),(0,D.jsxs)(d.Z,{name:"attachments",label:"Attachments",select:!0,sx:{width:200},value:de,onChange:Ze,children:[(0,D.jsx)(u.Z,{value:"true",children:"Required"}),(0,D.jsx)(u.Z,{value:"false",children:"Not Required"})]})]})}),(0,D.jsx)(h.Z,{sx:{mb:1}}),Ee?(0,D.jsx)(Z.Z,{severity:xe?"success":"info",action:t===S.getThreadById.author.accountId&&(0,D.jsx)(m.Z,{color:"error",onClick:je,children:"Cancel"}),children:xe?"This thread is complied and closed at ".concat(oe(Ne),"."):De.statusLabel}):(0,D.jsx)(Z.Z,{severity:"error",action:t===S.getThreadById.author.accountId&&(0,D.jsx)(m.Z,{onClick:ge,children:"Restore"}),children:"Archived Request"})]}),(0,D.jsxs)(c.Z,{sx:{px:2},children:[(0,D.jsxs)(o.Z,{variant:"body1",color:"secondary",children:[Ie.firstName+" "+Ie.lastName,(0,D.jsx)("span",{style:{color:"black"},children:" to "}),Fe?"".concat(Fe.firstName," ").concat(Fe.lastName," (").concat(Se.sectionOffice.refNum,")"):"".concat(Se.sectionOffice.officeName," ").concat("default"===Se.sectionName?"":" \u2014 ".concat(Se.sectionName))]}),(0,D.jsx)(o.Z,{variant:"h4",children:ye})]}),(0,D.jsxs)(j.Z,{value:P,onChange:function(e,t){return M(t)},sx:{mt:2},children:[(0,D.jsx)(g.Z,{label:"Conversation"}),(0,D.jsx)(g.Z,{label:"Files"}),(0,D.jsx)(g.Z,{label:"History"}),S.getThreadById.author.accountId===t&&(0,D.jsx)(g.Z,{label:"Form 2309"})]}),(0,D.jsxs)(ce,{index:0,value:P,children:[(0,D.jsx)(c.Z,{sx:{p:2},children:we.map((function(e){return(0,D.jsx)(c.Z,{sx:{my:2,pl:e.sender.accountId===t?8:0,pr:e.sender.accountId!==t?8:0},children:(0,D.jsx)(E,{content:e,sender:e.sender.accountId===t})},e.msgId)}))}),(0,D.jsx)(c.Z,{sx:{p:2},children:!xe&&(0,D.jsx)(V.Z,{userId:t,threadId:n,attached:Re,onSubmit:be})})]}),(0,D.jsx)(ce,{index:1,value:P,children:(0,D.jsx)(re,{messages:S.getThreadById.messages,reqForm:S.getThreadById.reqForm})}),(0,D.jsx)(ce,{index:2,value:P,children:(0,D.jsx)(se,{history:S.getThreadById.history})}),S.getThreadById.author.accountId===t&&(0,D.jsx)(ce,{index:3,value:P,children:(0,D.jsx)(J,{userId:t,thread:S.getThreadById,onGenerate:be})})]})})}},2480:function(){}}]);
//# sourceMappingURL=670.72eba965.chunk.js.map