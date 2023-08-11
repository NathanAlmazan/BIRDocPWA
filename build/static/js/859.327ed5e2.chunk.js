"use strict";(self.webpackChunkbiranila=self.webpackChunkbiranila||[]).push([[859],{1859:function(e,t,n){n.r(t),n.d(t,{default:function(){return N}});var i=n(4165),a=n(5861),r=n(4942),o=n(1413),s=n(9439),d=n(2791),c=n(7689),u=n(6934),l=n(6314),f=n(533),m=n(890),x=n(9164),h=n(8584),p=n(3466),v=n(3400),Z=n(3786),b=n(6151),g=n(4070),j=n(3746),C=n(165),W=n(6578),k=n(4376),w=n(9416),S=n(184),y=(0,u.ZP)("div")((function(e){return{maxWidth:480,margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",padding:e.theme.spacing(12,0)}}));function N(){var e,t=(0,c.s0)(),n=(0,W.a)(w.Zc).data,u=(0,k.D)(w.pS),N=(0,s.Z)(u,2),I=N[0],M=N[1],G=M.data,R=M.error,z=d.useState(!1),P=(0,s.Z)(z,2),q=P[0],L=P[1],O=d.useState({firstName:"",lastName:"",officeId:1,sectionId:1,password:"",resetCode:""}),A=(0,s.Z)(O,2),B=A[0],D=A[1],T=B.firstName,E=B.lastName,V=B.officeId,F=B.sectionId,H=B.password,J=B.resetCode;d.useEffect((function(){G&&t("/auth/login")}),[G,t]);var K=function(e){D((0,o.Z)((0,o.Z)({},B),{},(0,r.Z)({},e.target.name,e.target.value)))},Q=function(){var e=(0,a.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,I({variables:{data:{firstName:T,lastName:E,officeId:F,resetCode:J,password:H}}});case 4:e.next=8;break;case 6:e.prev=6,e.t0=e.catch(1);case 8:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}();return(0,S.jsx)(x.Z,{maxWidth:"sm",children:(0,S.jsxs)(y,{children:[(0,S.jsxs)(l.Z,{sx:{mb:2},children:[(0,S.jsx)(m.Z,{variant:"h4",gutterBottom:!0,children:"Register Account"}),(0,S.jsx)(m.Z,{sx:{color:"text.secondary"},children:"Enter your credentials below."})]}),R&&(0,S.jsx)(g.Z,{severity:"error",sx:{my:2},children:R.message}),(0,S.jsxs)(l.Z,{spacing:2,component:"form",onSubmit:Q,children:[(0,S.jsx)(h.Z,{name:"firstName",label:"First Name",value:T,onChange:K,fullWidth:!0,required:!0}),(0,S.jsx)(h.Z,{name:"lastName",label:"Last Name",value:E,onChange:K,fullWidth:!0,required:!0}),n&&(0,S.jsx)(h.Z,{name:"officeId",label:"Office",value:V,onChange:K,fullWidth:!0,required:!0,select:!0,children:n.getAllBirOffices.map((function(e){return(0,S.jsx)(Z.Z,{value:e.officeId,children:e.officeName},e.officeId)}))}),n&&(0,S.jsx)(h.Z,{name:"sectionId",label:"Section",value:F,onChange:K,fullWidth:!0,required:!0,select:!0,children:null===(e=n.getAllBirOffices.find((function(e){return e.officeId===V})))||void 0===e?void 0:e.officeSections.map((function(e){return(0,S.jsx)(Z.Z,{value:e.sectionId,children:"default"===e.sectionName?"Main":e.sectionName},e.sectionId)}))}),(0,S.jsx)(h.Z,{autoComplete:"off",name:"resetCode",label:"Register Code",value:J,onChange:K,fullWidth:!0,required:!0,inputProps:{min:6,max:6}}),(0,S.jsx)(h.Z,{fullWidth:!0,type:q?"text":"password",label:"Password",name:"password",required:!0,value:H,onChange:K,InputProps:{endAdornment:(0,S.jsx)(p.Z,{position:"end",children:(0,S.jsx)(v.Z,{onClick:function(){return L(!q)},edge:"end",children:q?(0,S.jsx)(C.Z,{}):(0,S.jsx)(j.Z,{})})})}}),(0,S.jsx)(b.Z,{type:"submit",variant:"contained",color:"secondary",fullWidth:!0,children:"Register"})]}),(0,S.jsx)(m.Z,{variant:"body2",align:"center",sx:{mt:3},children:(0,S.jsx)(f.Z,{variant:"subtitle2",onClick:function(){return t("/auth/login")},sx:{cursor:"pointer"},children:"Go Back to Login"})})]})})}},3746:function(e,t,n){var i=n(4836);t.Z=void 0;var a=i(n(5649)),r=n(184),o=(0,a.default)((0,r.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.Z=o},165:function(e,t,n){var i=n(4836);t.Z=void 0;var a=i(n(5649)),r=n(184),o=(0,a.default)((0,r.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.Z=o},9164:function(e,t,n){n.d(t,{Z:function(){return W}});var i=n(4942),a=n(3366),r=n(7462),o=n(2791),s=n(3733),d=n(1122),c=n(1217),u=n(4419),l=n(6083),f=n(3457),m=n(5080),x=n(184),h=["className","component","disableGutters","fixed","maxWidth","classes"],p=(0,m.Z)(),v=(0,f.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,d.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),Z=function(e){return(0,l.Z)({props:e,name:"MuiContainer",defaultTheme:p})};var b=n(4036),g=n(6934),j=n(1402),C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?v:t,l=e.useThemeProps,f=void 0===l?Z:l,m=e.componentName,p=void 0===m?"MuiContainer":m,b=n((function(e){var t=e.theme,n=e.ownerState;return(0,r.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&(0,i.Z)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,n){var i=n,a=t.breakpoints.values[i];return 0!==a&&(e[t.breakpoints.up(i)]={maxWidth:"".concat(a).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,n=e.ownerState;return(0,r.Z)({},"xs"===n.maxWidth&&(0,i.Z)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),n.maxWidth&&"xs"!==n.maxWidth&&(0,i.Z)({},t.breakpoints.up(n.maxWidth),{maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)}))})),g=o.forwardRef((function(e,t){var n=f(e),i=n.className,o=n.component,l=void 0===o?"div":o,m=n.disableGutters,v=void 0!==m&&m,Z=n.fixed,g=void 0!==Z&&Z,j=n.maxWidth,C=void 0===j?"lg":j,W=(0,a.Z)(n,h),k=(0,r.Z)({},n,{component:l,disableGutters:v,fixed:g,maxWidth:C}),w=function(e,t){var n=e.classes,i=e.fixed,a=e.disableGutters,r=e.maxWidth,o={root:["root",r&&"maxWidth".concat((0,d.Z)(String(r))),i&&"fixed",a&&"disableGutters"]};return(0,u.Z)(o,(function(e){return(0,c.Z)(t,e)}),n)}(k,p);return(0,x.jsx)(b,(0,r.Z)({as:l,ownerState:k,className:(0,s.Z)(w.root,i),ref:t},W))}));return g}({createStyledComponent:(0,g.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,b.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:function(e){return(0,j.Z)({props:e,name:"MuiContainer"})}}),W=C}}]);
//# sourceMappingURL=859.327ed5e2.chunk.js.map