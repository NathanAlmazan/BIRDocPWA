"use strict";(self.webpackChunkbiranila=self.webpackChunkbiranila||[]).push([[518],{9518:function(e,t,n){n.r(t),n.d(t,{default:function(){return L}});var i=n(4165),r=n(5861),a=n(4942),o=n(1413),s=n(9439),c=n(2791),d=n(7689),u=n(6934),f=n(6314),l=n(533),m=n(890),h=n(9164),x=n(8584),p=n(3466),v=n(3400),Z=n(3786),g=n(6151),b=n(4070),I=n(3746),j=n(165),S=n(6578),W=n(4376),N=n(9416),C=n(2872),k=n(647),w=n(184),y=(0,u.ZP)("div")((function(e){return{maxWidth:480,margin:"auto",display:"flex",minHeight:"100vh",flexDirection:"column",justifyContent:"center",padding:e.theme.spacing(12,0)}}));function L(){var e=(0,d.s0)(),t=(0,C.T)(),n=(0,S.a)(N.Zc).data,u=(0,S.a)(N.Qd).data,L=(0,W.D)(N.bc),M=(0,s.Z)(L,2),G=M[0],R=M[1],z=R.data,O=R.error,P=c.useState(),q=(0,s.Z)(P,2),A=q[0],T=q[1],B=c.useState(!1),D=(0,s.Z)(B,2),E=D[0],V=D[1],F=c.useState({firstName:"",lastName:"",officeId:1,sectionId:1,roleId:9,password:""}),H=(0,s.Z)(F,2),Q=H[0],J=H[1],K=Q.firstName,U=Q.lastName,X=Q.officeId,Y=Q.sectionId,$=Q.roleId,_=Q.password;c.useEffect((function(){if(n){var e=n.getAllBirOffices.find((function(e){return e.officeId===X}));T(e),e&&e.officeSections.length>1?J((function(t){return(0,o.Z)((0,o.Z)({},t),{},{sectionId:e.officeSections[1].sectionId})})):e&&J((function(t){return(0,o.Z)((0,o.Z)({},t),{},{sectionId:e.officeSections[0].sectionId})}))}}),[X,n]),c.useEffect((function(){z&&(t((0,k.x4)({uid:z.userLogin.accountId,username:z.userLogin.firstName+" "+z.userLogin.lastName,role:z.userLogin.role,office:{sectionId:z.userLogin.officeSection.sectionId,sectionName:z.userLogin.officeSection.sectionName,officers:[],sectionOffice:{officeId:z.userLogin.officeSection.sectionOffice.officeId,officeName:z.userLogin.officeSection.sectionOffice.officeName,officeSections:[]}}})),e("/app/dashboard"))}),[z,e,t]);var ee=function(e){J((0,o.Z)((0,o.Z)({},Q),{},(0,a.Z)({},e.target.name,e.target.value)))},te=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,G({variables:{data:{firstName:K,lastName:U,officeId:Y,password:_,roleId:$}}});case 4:e.next=8;break;case 6:e.prev=6,e.t0=e.catch(1);case 8:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}();return(0,w.jsx)(h.Z,{maxWidth:"sm",children:(0,w.jsxs)(y,{children:[(0,w.jsxs)(f.Z,{sx:{mb:5},children:[(0,w.jsx)(m.Z,{variant:"h4",gutterBottom:!0,children:"Sign In"}),(0,w.jsx)(m.Z,{sx:{color:"text.secondary"},children:"Enter your credentials below."})]}),O&&(0,w.jsx)(b.Z,{severity:"error",sx:{my:2},children:O.message}),(0,w.jsxs)(f.Z,{spacing:2,component:"form",onSubmit:te,children:[(0,w.jsx)(x.Z,{name:"firstName",label:"First Name",value:K,onChange:ee,fullWidth:!0,required:!0}),(0,w.jsx)(x.Z,{name:"lastName",label:"Last Name",value:U,onChange:ee,fullWidth:!0,required:!0}),n&&(0,w.jsx)(x.Z,{name:"officeId",label:"Office",value:X,onChange:ee,fullWidth:!0,required:!0,select:!0,children:n.getAllBirOffices.map((function(e){return(0,w.jsx)(Z.Z,{value:e.officeId,children:e.officeName},e.officeId)}))}),A&&A.officeSections.length>1&&(0,w.jsx)(x.Z,{name:"sectionId",label:"Section",value:Y,onChange:ee,fullWidth:!0,required:!0,select:!0,children:A.officeSections.filter((function(e){return"default"!==e.sectionName})).map((function(e){return(0,w.jsx)(Z.Z,{value:e.sectionId,children:"default"===e.sectionName?"Main":e.sectionName},e.sectionId)}))}),u&&(0,w.jsx)(x.Z,{name:"roleId",label:"Position",value:$,onChange:ee,fullWidth:!0,required:!0,select:!0,children:u.getAllRoles.map((function(e){return(0,w.jsx)(Z.Z,{value:e.roleId,children:e.roleName},e.roleId)}))}),(0,w.jsx)(x.Z,{fullWidth:!0,type:E?"text":"password",label:"Password",name:"password",required:!0,value:_,onChange:ee,InputProps:{endAdornment:(0,w.jsx)(p.Z,{position:"end",children:(0,w.jsx)(v.Z,{onClick:function(){return V(!E)},edge:"end",children:E?(0,w.jsx)(j.Z,{}):(0,w.jsx)(I.Z,{})})})}}),(0,w.jsx)(g.Z,{type:"submit",variant:"contained",color:"secondary",fullWidth:!0,children:"Login"})]}),(0,w.jsx)(m.Z,{variant:"body2",align:"center",sx:{mt:3},children:(0,w.jsx)(l.Z,{variant:"subtitle2",onClick:function(){return e("/auth/register")},sx:{cursor:"pointer"},children:"Register Account"})})]})})}},3746:function(e,t,n){var i=n(4836);t.Z=void 0;var r=i(n(5649)),a=n(184),o=(0,r.default)((0,a.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.Z=o},165:function(e,t,n){var i=n(4836);t.Z=void 0;var r=i(n(5649)),a=n(184),o=(0,r.default)((0,a.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.Z=o},9164:function(e,t,n){n.d(t,{Z:function(){return S}});var i=n(4942),r=n(3366),a=n(7462),o=n(2791),s=n(3733),c=n(1122),d=n(1217),u=n(4419),f=n(6083),l=n(3457),m=n(5080),h=n(184),x=["className","component","disableGutters","fixed","maxWidth","classes"],p=(0,m.Z)(),v=(0,l.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,c.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),Z=function(e){return(0,f.Z)({props:e,name:"MuiContainer",defaultTheme:p})};var g=n(4036),b=n(6934),I=n(1402),j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?v:t,f=e.useThemeProps,l=void 0===f?Z:f,m=e.componentName,p=void 0===m?"MuiContainer":m,g=n((function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&(0,i.Z)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,n){var i=n,r=t.breakpoints.values[i];return 0!==r&&(e[t.breakpoints.up(i)]={maxWidth:"".concat(r).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({},"xs"===n.maxWidth&&(0,i.Z)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),n.maxWidth&&"xs"!==n.maxWidth&&(0,i.Z)({},t.breakpoints.up(n.maxWidth),{maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)}))})),b=o.forwardRef((function(e,t){var n=l(e),i=n.className,o=n.component,f=void 0===o?"div":o,m=n.disableGutters,v=void 0!==m&&m,Z=n.fixed,b=void 0!==Z&&Z,I=n.maxWidth,j=void 0===I?"lg":I,S=(0,r.Z)(n,x),W=(0,a.Z)({},n,{component:f,disableGutters:v,fixed:b,maxWidth:j}),N=function(e,t){var n=e.classes,i=e.fixed,r=e.disableGutters,a=e.maxWidth,o={root:["root",a&&"maxWidth".concat((0,c.Z)(String(a))),i&&"fixed",r&&"disableGutters"]};return(0,u.Z)(o,(function(e){return(0,d.Z)(t,e)}),n)}(W,p);return(0,h.jsx)(g,(0,a.Z)({as:f,ownerState:W,className:(0,s.Z)(N.root,i),ref:t},S))}));return b}({createStyledComponent:(0,b.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,g.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:function(e){return(0,I.Z)({props:e,name:"MuiContainer"})}}),S=j}}]);
//# sourceMappingURL=518.89c0383d.chunk.js.map