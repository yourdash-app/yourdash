import{j as e,e as m,F as y,H as v,S as G,o as P,f as w,T as Y,i as ee,d as u,w as te,n as se,h as ne,v as g,I,U as o,x as ae,r as x,C as k,y as L,z as M,A as z,E as C,G as U,J as R,K as V,L as le}from"./index-5c94e495.js";import{S as H,a as re,b as ie,O as oe}from"./SidebarContainer-5db44d2c.js";import{u as ce,b as K,O as de,R as ue,a as i}from"./index-81be8c96.js";import{C as W}from"./ComingSoon-f5344104.js";import{R as me}from"./RightClickMenuContext-2d5ecc52.js";import{T as N}from"./TextInput-360ac7e7.js";import"./buttonWithIcon-f4fd35bd.js";const xe={id:"uk-ewsgit-settings",displayName:"Settings",description:"This is the default application description, you can edit this information in this application's 'application.json'",category:"core",license:"MIT",maintainers:[{name:"Ewsgit",avatarUrl:"https://avatars.githubusercontent.com/u/69800526?v=4",bio:"The creator of YourDash",url:"https://ewsgit.uk"}],authors:[{name:"Ewsgit",avatarUrl:"https://avatars.githubusercontent.com/u/69800526?v=4",bio:"The creator of YourDash",url:"https://ewsgit.uk"}],modules:{backend:[{dependencies:[],description:"The backend for the Settings application",id:"uk-ewsgit-settings-backend",main:"./backend/index.ts"}],frontend:[],officialFrontend:[{id:"uk-ewsgit-settings-frontend",main:"./web/index.tsx",displayName:"Settings",iconPath:"./icon.avif",description:"",dependencies:[{moduleType:"backend",id:"uk-ewsgit-settings-backend"}]}]},shouldInstanceRestartOnInstall:!0,__internal__generatedFor:"officialFrontend"},h="/app/a/uk-ewsgit-settings-frontend";var T=(t=>(t.STRING="string",t.INT="int",t.FLOAT="float",t.DIRECTORY="directory",t.FILE="file",t.FILE_OF_TYPE="fileOfType",t.COLOR="color",t.DATE="date",t.TIME="time",t.BOOLEAN="boolean",t.SELECTION="selection",t.MULTIPLE_SELECTION="multipleSelection",t))(T||{});const he="_component_13sji_6",pe="_thumb_13sji_17",J={component:he,thumb:pe},Q=({setValue:t,value:s})=>e.jsx(e.Fragment,{children:e.jsx("div",{className:`${J.component} ${s?"bg-green-400":"bg-red-400"}`,onClick:()=>{t(!s)},children:e.jsx("div",{className:J.thumb,style:{...s?{left:"calc(100% + 0.25rem)",translate:"-100%"}:{left:"-0.25rem",translate:"0%"}}})})}),je="_component_1lvf5_6",ge={component:je},X=({children:t,setting:s})=>e.jsxs(m,{className:ge.component,children:[e.jsxs(y,{direction:"column",children:[e.jsx(v,{level:5,text:s.displayName||s.id}),s.description&&e.jsx(G,{text:s.description}),e.jsx(P,{text:s.type})]}),t]}),fe=({setting:t})=>{const[s,n]=w.useState(!1);return e.jsx(X,{setting:t,children:e.jsx(Q,{setValue:a=>n(a),value:s})})},ve=({setting:t})=>{const[s,n]=w.useState("");return e.jsx(X,{setting:t,children:e.jsx(Y,{placeholder:t.value,accessibleName:t.displayName||t.id||"",onChange:a=>n(a),defaultValue:s})})},be=()=>{const{categoryName:t}=ce(),s=ee(()=>u.getJson(`/app/settings/cat/${t}`),[t]);return e.jsxs("div",{children:[e.jsx(H,{}),e.jsx(v,{text:(s==null?void 0:s.id)||t||"Invalid category name"}),s?Object.keys(s.settings).map(n=>{console.log(n);const a=s.settings[n];switch(a.type){case T.BOOLEAN:return e.jsx(fe,{setting:a},n);case T.STRING:return e.jsx(ve,{setting:a},n)}return e.jsx(e.Fragment,{children:e.jsxs("div",{children:["Setting: ",JSON.stringify(a)]},a.id)})}):e.jsx(te,{})]})},we=()=>e.jsx("div",{children:"SingleSettingsPage"}),Ce="_page_73bp4_10",ye="_column_73bp4_29",_e="_titleContainer_73bp4_37",Ne="_title_73bp4_37",ke="_cardHeader_73bp4_47",Se="_themePreviewContainer_73bp4_51",$e="_themePreview_73bp4_51",d={page:Ce,column:ye,titleContainer:_e,title:Ne,cardHeader:ke,themePreviewContainer:Se,themePreview:$e},Be=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:d.page,children:[e.jsxs(y,{direction:"row",className:d.titleContainer,children:[e.jsx(H,{}),e.jsx(v,{className:d.title,level:1,text:"Home"})]}),e.jsxs("div",{className:d.column,children:[e.jsxs(m,{children:[e.jsx(v,{level:3,className:d.cardHeader,text:"Personalise YourDash"}),e.jsxs(y,{direction:"row",className:d.themePreviewContainer,children:[e.jsx(m,{className:d.themePreview,children:"Theme Preview 1"}),e.jsx(m,{className:d.themePreview,children:"Theme Preview 2"}),e.jsx(m,{className:d.themePreview,children:"Theme Preview 3"}),e.jsx(m,{className:d.themePreview,children:"Theme Preview 4"}),e.jsx(m,{className:d.themePreview,children:"Theme Preview 5"})]})]}),e.jsxs(m,{children:[e.jsx(v,{level:3,className:d.cardHeader,text:"Instance Software Updates"}),e.jsxs(y,{direction:"row",children:[e.jsx(se,{icon:ne.CheckCircle,size:"1.5rem"}),e.jsx(P,{text:"You're all up to date!"})]}),e.jsxs(y,{direction:"row",children:[e.jsx(P,{text:"Last checked 2 days ago"}),e.jsx(g,{text:"Check for updates",onClick:()=>0})]}),e.jsx(P,{text:"currently version: 1.0.0"})]})]}),e.jsx("div",{className:d.column,children:e.jsxs(m,{children:[e.jsx(v,{level:3,className:d.cardHeader,text:"Manage Wallpaper"}),e.jsxs(y,{direction:"row",children:[e.jsx(m,{children:"Previous Image 1"}),e.jsx(m,{children:"Previous Image 2"}),e.jsx(m,{children:"+"})]})]})})]})});var f=(t=>(t[t.web=0]="web",t[t.desktop=1]="desktop",t[t.cli=2]="cli",t[t.external=3]="external",t))(f||{});const b=({children:t,title:s,noBack:n})=>e.jsxs("main",{className:"flex flex-col items-center ml-auto mr-auto w-full max-w-6xl pl-4 pr-4 min-h-full",children:[e.jsxs("section",{className:"flex items-center w-full gap-2 pt-8 pb-8 pl-4 pr-4 animate__animated animate__fadeIn animate__duration_250ms",children:[!n&&e.jsx(I,{onClick:()=>{window.history.back()},icon:o.ChevronLeft}),e.jsx(ae,{level:2,children:s})]}),e.jsx("div",{className:"grid grid-cols-1 w-full xl:grid-cols-2 gap-2 animate__animated animate__fadeIn animate__100ms h-full overflow-x-hidden overflow-y-auto auto-rows-max",children:t})]}),Pe=()=>{const[t,s]=x.useState(0),[n,a]=x.useState([]),[l,c]=x.useState([]);return x.useEffect(()=>{u.syncGetJson("/user/sessions",r=>{a(r.sessions)}),u.syncGetJson("/core/personal-server-accelerator/sessions",r=>{c(r.sessions)})},[t]),e.jsx(b,{title:"Sessions",noBack:!1,children:e.jsx("main",{className:"col-span-2 p-4",children:e.jsx("section",{className:"gap-2 flex flex-wrap",children:n.map(r=>e.jsxs(k,{className:"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]",children:[e.jsxs("div",{className:"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full",children:[r.sessionId,e.jsx(L,{className:"aspect-square h-8 m-auto ml-0",icon:r.type===f.web?o.Browser:r.type===f.cli?o.Terminal:r.type===f.desktop?o.DeviceDesktop:o.Question})]}),e.jsxs("div",{className:"w-full bg-container-secondary-bg pl-4 p-3 flex text-container-fg items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsxs("div",{children:["Type: ",r.type===f.web&&"Web",r.type===f.cli&&"Cli",r.type===f.desktop&&"Desktop",r.type===f.external&&"External"]}),e.jsxs("div",{children:["Supports PSA: ",(!!r.isNodeJS).toString()]})]}),e.jsx(I,{icon:o.X,onClick:()=>{u.deleteJson(`/core/session/${r.sessionId}`,()=>{s(t+1)})}})]})]},r.sessionId))})})})},Ie=()=>{const t=K();return e.jsxs(re,{showSidebarByDefault:!0,children:[e.jsxs(ie,{children:[e.jsx(v,{level:2,text:"Settings"}),e.jsx(M,{direction:"column"}),e.jsx(g,{text:"Home",onClick:()=>t(`${h}/`)}),e.jsx(g,{text:"Personalisation",onClick:()=>t(`${h}/personalization`)}),e.jsx(g,{text:"Login Sessions",onClick:()=>t(`${h}/session`)}),e.jsx(g,{text:"Administrator Tools",onClick:()=>t(`${h}/admin`)}),e.jsx(g,{text:"Developer Tools",onClick:()=>t(`${h}/developer`)}),e.jsx(M,{direction:"column"}),e.jsx(v,{text:"Dev",level:4}),e.jsx(g,{text:"Test Category",onClick:()=>t(`${h}/cat/test`)}),e.jsx(g,{text:"Test Solo Setting",onClick:()=>t(`${h}/cat/test/test-setting`)})]}),e.jsx(de,{})]})},Le="_component_txga8_6",De="_title_txga8_14",Fe="_textContainer_txga8_21",$={component:Le,title:De,textContainer:Fe},q=({children:t,title:s,description:n,icon:a,onClick:l})=>e.jsxs(k,{onClick:l,className:$.component,children:[e.jsx(L,{className:"aspect-square h-10",icon:a}),e.jsxs("div",{className:$.textContainer,children:[e.jsx("h2",{className:$.title,children:s}),e.jsx("span",{className:$.description,children:n})]}),t]}),A=({title:t,description:s,icon:n,href:a,external:l})=>{const c=K();return e.jsx(q,{onClick:()=>{l?window.location.href=a:c(a)},icon:n,title:t,description:s,children:e.jsx(L,{className:"aspect-square h-8",icon:l?o.Link:o.ChevronRight})})},Ue=()=>e.jsxs(b,{title:"Personalization",children:[e.jsx(A,{href:`${h}/personalization/panel`,description:"Customize your panel",title:"Panel",icon:o.Paintbrush}),e.jsx(A,{href:`${h}/personalization/theme`,description:"Customize the look of YourDash",title:"Theme",icon:o.Accessibility})]}),Re="_component_fpudh_6",B={component:Re},Ve=({username:t,avatar:s,name:n})=>e.jsxs(k,{className:B.component,children:[e.jsx("img",{className:B.avatar,src:s,alt:"user's avatar"}),e.jsxs("div",{className:B.name,children:["name: ",n.first,", ",n.last]}),e.jsxs("div",{className:B.username,children:["username: ",t]})]}),Te=()=>{const[t,s]=w.useState([]);return w.useEffect(()=>{s([{avatar:"",name:{first:"John",last:"Doe"},username:"johnd"},{avatar:"",name:{first:"Jane",last:"Doe"},username:"janed"}])}),e.jsx(e.Fragment,{children:t.map(n=>e.jsx(Ve,{username:n.username,avatar:n.avatar,name:n.name},n.username))})},ze=()=>{const[t,s]=w.useState("usersView");switch(t){case"createUser":return e.jsx(e.Fragment,{children:"WIP"});case"usersView":return e.jsx(Te,{});case"manageUser":return e.jsx(e.Fragment,{children:"WIP"})}},qe=()=>e.jsxs(b,{title:"Admin tools",children:[e.jsx(ze,{}),e.jsx("section",{className:"w-full h-full flex flex-col items-center col-span-2",children:e.jsx(W,{})})]}),Me=({value:t,setValue:s,...n})=>e.jsx(q,{...n,children:e.jsx(Q,{setValue:a=>s(a),value:t})}),Je=()=>{const[t,s]=x.useState(u.userDB.get("dash:useBrowserLayout")||!1);return e.jsx(b,{title:"Dashboard personalization",children:e.jsx(Me,{title:"Use browser layout",icon:o.Browser,description:'Use the "browser" layout instead of the "dashboard" layout',value:t,setValue:n=>{u.userDB.set("dash:useBrowserLayout",n),s(n)}})})},Ae=({children:t,items:s,className:n})=>{const a=x.useContext(me),[l,c]=x.useState(""),[r,D]=x.useState(!1);return e.jsx(z,{className:n,onClick:F=>{F.stopPropagation(),F.preventDefault();const j=F.currentTarget.getBoundingClientRect();if(r){a(0,0,j.width,j.height,!1,[]),D(!1);return}a(j.left,j.bottom,j.width,j.height,!0,s.map(_=>({label:_.label,onClick:()=>{c(_.label),_.onClick()},shortcut:""}))),D(!0);const S=_=>{_.preventDefault(),a(0,0,j.width,j.height,!1,[]),D(!1),window.removeEventListener("click",S),window.removeEventListener("contextmenu",S)};window.addEventListener("click",S),window.addEventListener("contextmenu",S)},children:l||t})},O=({value:t,setValue:s,options:n,...a})=>e.jsx(q,{...a,children:e.jsx(Ae,{items:n.map(l=>({label:l.label,onClick:()=>{s(l.value)}})),children:t})}),Oe=()=>{const[t,s]=x.useState(u.userDB.get("core:panel:size")||"medium"),[n,a]=x.useState(u.userDB.get("core:panel:side")||"left");return e.jsxs(b,{title:"Panel",children:[e.jsx(O,{title:"Panel Size",icon:o.Gear,description:"Set the size of the panel and it's widgets",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium (Default)"},{value:"large",label:"Large"}],value:t||"medium",setValue:l=>{s(l),u.userDB.set("core:panel:size",l),window.__yourdashCorePanelReload()}}),e.jsx(O,{title:"Panel Side",icon:o.Gear,description:"Set the side that the panel is on the screen",options:[{value:"top",label:"Top"},{value:"right",label:"Right"},{value:"bottom",label:"Bottom"},{value:"left",label:"Left (Default)"}],value:n||"left",setValue:l=>{a(l),u.userDB.set("core:panel:side",l),window.__yourdashCorePanelReload()}})]})},He=w.createContext(()=>{});function E(){const t=x.useContext(He);return{toast:{success:(s,n,a)=>{t({message:n,type:"success",params:a,title:s,uuid:C()})},error:(s,n,a)=>{t({message:n,type:"error",params:a,title:s,uuid:C()})},debug:(s,n,a)=>{t({message:n,type:"debug",params:a,title:s,uuid:C()})},info:(s,n,a)=>{t({message:n,type:"info",params:a,title:s,uuid:C()})},warn:(s,n,a)=>{t({message:n,type:"warn",params:a,title:s,uuid:C()})},silent:(s,n,a)=>{t({message:n,type:"silent",params:a,title:s,uuid:C()})}}}}const Ke="_component_1j5gk_6",We={component:Ke},Z=({children:t,style:s,className:n})=>e.jsx("div",{style:s,className:`${We.component} ${n}`,children:t}),Qe="_textarea_1729b_6",Xe={textarea:Qe},Ee=({children:t,defaultValue:s,className:n,...a})=>e.jsx("textarea",{...a,onKeyDown:l=>{if(l.key==="Tab"){l.preventDefault(),l.stopPropagation();const c="  ",r=l.currentTarget.selectionStart;l.currentTarget.value=l.currentTarget.value.substring(0,r)+c+l.currentTarget.value.substring(r),l.currentTarget.selectionEnd=r+c.length}},defaultValue:s||"",className:`${Xe.textarea} ${n}`,children:t}),Ze=({link:t,links:s,setLinks:n})=>e.jsxs(Z,{className:"child:flex-grow",children:[e.jsx(N,{onChange:a=>{t.label=a,n(s)},defaultValue:t.label,label:"Label",accessibleName:"Label"}),e.jsx(N,{onChange:a=>{t.url=a,n(s)},defaultValue:t.url,label:"Url",accessibleName:"Url"}),e.jsx(I,{className:"aspect-square",icon:o.Dash,onClick:()=>{n(s==null?void 0:s.filter(a=>a!==t))}})]},t.url+t.label),Ge="_component_3lh5q_6",Ye="_content_3lh5q_15",et="_name_3lh5q_22",tt="_fullName_3lh5q_28",st="_username_3lh5q_33",nt="_avatar_3lh5q_40",at="_link_3lh5q_47",lt="_icon_3lh5q_63",rt="_bio_3lh5q_67",p={component:Ge,content:Ye,name:et,fullName:tt,username:st,avatar:nt,link:at,icon:lt,bio:rt},it=({name:t,username:s,avatar:n,bio:a,links:l})=>e.jsxs(k,{className:p.component,children:[e.jsx("img",{src:n,alt:"",className:p.avatar}),e.jsxs("section",{className:p.content,children:[e.jsxs("section",{className:p.name,children:[e.jsxs("div",{className:p.fullName,children:[t.first," ",t.last]}),e.jsxs("div",{className:p.username,children:["@",s]})]}),e.jsx("p",{className:p.bio,children:a}),!!l&&l.map(c=>e.jsxs("a",{href:c.url,className:p.link,children:[e.jsx(L,{className:p.icon,icon:o.Link}),c.label]},c.label+c.url))]})]}),ot=()=>{var a;const t=E(),[s,n]=w.useState({name:{first:"Admin",last:"Istrator"},avatar:"abc",username:"admin",bio:"This is the user's sample bio",links:[{url:"https://github.com/yourdash/yourdash",label:"Click me"}]});return x.useEffect(()=>{u.getText("/core/user/current/avatar/original",l=>{n({...s,avatar:`${u.getInstanceUrl()}${l}`})})},[]),e.jsx(b,{title:"Profile",children:e.jsxs("section",{className:"grid grid-cols-[auto,1fr] w-full col-span-2 gap-4",children:[e.jsx("div",{className:"h-full flex items-center justify-center",children:e.jsx(it,{name:s.name,avatar:s.avatar,username:s.username,bio:s.bio,links:s.links})}),e.jsxs(k,{className:"gap-4 flex flex-col child:w-full",children:[e.jsx("h2",{className:"-mb-2 font-semibold text-2xl",children:"Name"}),e.jsxs(Z,{className:"child:flex-grow",children:[e.jsx(N,{accessibleName:"First name",onChange:l=>{n({...s,name:{...s.name,first:l}})},defaultValue:s.name.first,label:"FirstName"}),e.jsx(N,{accessibleName:"Last name",onChange:l=>{n({...s,name:{...s.name,last:l}})},defaultValue:s.name.last,label:"LastName"})]}),e.jsx(N,{accessibleName:"Username",onChange:l=>{n({...s,username:l})},defaultValue:s.username,label:"username"}),e.jsx("h2",{className:"-mb-4 font-semibold text-2xl",children:"Bio"}),e.jsx(Ee,{defaultValue:s.bio,onChange:l=>{n({...s,bio:l.currentTarget.value})}}),e.jsxs("div",{className:"-mb-2 flex justify-between items-center",children:[e.jsx("h2",{className:"font-semibold text-2xl",children:"Links"}),e.jsx(I,{icon:o.Plus,onClick:()=>{var l;n({...s,links:[...s.links||[],{url:"https://example.com",label:`Example${(((l=s.links)==null?void 0:l.length)||0)+1}`}]})}})]}),e.jsx(e.Fragment,{children:(a=s.links)==null?void 0:a.map((l,c)=>e.jsx(Ze,{links:s.links||[],setLinks:r=>{n({...s,links:r})},link:l},l.url+l.label))}),e.jsx(z,{onClick:()=>{u.syncPostJson("/core/user/current",s,()=>{t.toast.success("Success","Saved user data")},()=>{t.toast.error("Error","Failed to save user data")})},children:"Save"})]})]})})},ct=()=>e.jsxs("div",{className:"flex",children:[e.jsx(U,{title:"Chiplet UI",items:[{type:R.Button,label:"Button",icon:o.FileBadge,onClick:()=>0}],defaultState:V.NormalMinimised}),e.jsx(U,{title:"Chiplet UI",items:[{type:R.Button,label:"Button",icon:o.FileBadge,onClick:()=>0}],defaultState:V.FloatingMinimised}),e.jsx(U,{title:"Chiplet UI",items:[{type:R.Button,label:"Button",icon:o.FileBadge,onClick:()=>0}],defaultState:V.FloatingToggleMinimised})]}),dt=()=>{const t=E();return e.jsx(e.Fragment,{children:e.jsx(z,{onClick:()=>{u.syncGetJson("/app/settings/developer/install-all-applications",()=>(window.__yourdashCorePanelReload(),t.toast.success("Devtools","Installed all applications"),0))},children:"Install all applications"})})},ut=()=>e.jsxs(b,{title:"Developer tools",children:[e.jsx(dt,{}),e.jsx(ct,{})]}),mt=()=>e.jsx(b,{title:"Accessibility",children:e.jsx("section",{className:"w-full h-full flex flex-col items-center col-span-2",children:e.jsx(W,{})})}),xt=""+new URL("icon-f1ef8852.avif",import.meta.url).href,wt=()=>e.jsx(ue,{children:e.jsx(i,{element:e.jsx(oe,{meta:xe,pages:[{headerImage:xt,header:"YourDash Settings",body:"Configure YourDash and it's applications",actions:[{label:"Continue",onClick:()=>{},changeTo:"next"}]}]}),children:e.jsxs(i,{element:e.jsx(Ie,{}),children:[e.jsx(i,{index:!0,element:e.jsx(Be,{})}),e.jsxs(i,{path:"cat",children:[e.jsx(i,{index:!0,element:e.jsx(le,{to:`${h}/`})}),e.jsxs(i,{path:":categoryName",children:[e.jsx(i,{index:!0,element:e.jsx(be,{})}),e.jsx(i,{path:":settingName",element:e.jsx(we,{})})]})]}),e.jsx(i,{path:"profile",children:e.jsx(i,{index:!0,element:e.jsx(ot,{})})}),e.jsxs(i,{path:"personalization",children:[e.jsx(i,{index:!0,element:e.jsx(Ue,{})}),e.jsx(i,{path:"dashboard",element:e.jsx(Je,{})}),e.jsx(i,{path:"panel",element:e.jsx(Oe,{})})]}),e.jsx(i,{path:"session",children:e.jsx(i,{index:!0,element:e.jsx(Pe,{})})}),e.jsx(i,{path:"accessibility",children:e.jsx(i,{index:!0,element:e.jsx(mt,{})})}),e.jsx(i,{path:"admin",children:e.jsx(i,{index:!0,element:e.jsx(qe,{})})}),e.jsx(i,{path:"developer",children:e.jsx(i,{index:!0,element:e.jsx(ut,{})})})]})})});export{wt as default};
