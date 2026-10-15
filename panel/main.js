(()=>{var h="openchamber.sdk",_=1;var Qe=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function qt(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(a)=>{let s=a.target===e?o:a.target;if(!(s instanceof Element))return;if(!s.hasAttribute("data-oc-scrolling"))s.setAttribute("data-oc-scrolling","");let E=n.get(s);if(E!==void 0)clearTimeout(E);n.set(s,setTimeout(()=>{n.delete(s),s.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var _r=`(${qt.toString()})(document);`;var Ze=128,qe=65536;var ve=128;var ke=65536;var ro=/^[a-z][a-z0-9-]{0,39}$/;var eo=(e)=>Object(e)===e&&!Array.isArray(e),et=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),to=(e)=>String(e)===e&&e.length>=1&&e.length<=60,oo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,no=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!eo(n)||!ro.test(n.id)||!to(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!et(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!et(n,["kind","id","label","value","options","disabled"]))return!1;if(!oo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let a=new Set;for(let s of n.options){if(!eo(s)||!et(s,["value","label"])||!oo(s.value)||!to(s.label)||a.has(s.value))return!1;a.add(s.value)}if(!a.has(n.value))return!1}return!0};var Oe=20000000,we=256;var tt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,so=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var io=/^[A-Za-z0-9_-]{1,80}$/;var ao=["left","right","top","bottom"];var co=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let a=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of a)if(!co(s,o+1,n))return!1;return!0},ot=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(ot);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(ot)}return String(e)===e||Number.isFinite(e)},rt=(e)=>{try{if(String(e.id)!==e.id||!io.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ao.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!co(e.data)||!ot(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var po=["file","directory","other","missing"],st=(e)=>Boolean(e&&"sessionId"in e),it=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var uo=/^[0-9a-f]{7,64}$/i,at=(e)=>uo.test(e),Re=500,Ue=32000,mo=16000,fo=128,Eo=200,ho=2000,_o=16000,So=80,To=200,xo=16000;var bo=2000;var ct=20000,Ce=1024,Ie=2000000;var Le=64000,Me=8000,dt=4000;var lt=90000;var go=999,Ao=1e4,Ee=500,yo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],vo=["stopped","starting","ready","failed"],Sr=new Set(yo),ko=(e)=>Sr.has(e),Oo=(e)=>e&&ko(e)?e:"HOST_REJECTED",pe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(pe);if(Object(e)===e)return Object.values(e).every(pe);return!1},wo=(e)=>pe(e)&&JSON.stringify(e).length<=xo,lo=(e)=>e?.trim().slice(0,To)??"",ue=(e)=>{let o=e.id.trim().slice(0,fo),n=e.title.trim().slice(0,Eo),a=e.url.trim().slice(0,ho),s=e.text?.trim().slice(0,_o),E=e.author?.trim().slice(0,So),m=e.kind==="pull"?"pull":"issue",T={providerId:e.providerId.trim(),id:o,title:n||o,url:a,kind:m};if(s)T.text=s;if(E)T.author=E;if(m==="pull"){let S=lo(e.branches?.head),b=lo(e.branches?.base);if(S&&b)T.branches={head:S,base:b}}if(wo(e.data))T.data=e.data;return T},pt=(e)=>{let o=ue(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},ut=(e)=>{let o={text:e.text.trim().slice(0,mo)};if(e.send)o.send=!0;return o},mt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(go,Math.max(0,Math.round(e)))},ft=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Ao,Math.max(0,Math.ceil(e)))};var me=(e)=>e.length>0&&e.length<=Ce&&!e.includes("\x00")&&!e.includes("\\");var Ge=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>bo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Tr=new Set(vo),Et=(e)=>Boolean(e&&"status"in e&&Tr.has(String(e.status))&&!("body"in e)),Ne=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),ht=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),_t=(e)=>Boolean(e&&"written"in e&&e.written===!0),St=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),xr=new Set(po),Tt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&xr.has(String(e.kind))&&Number.isFinite(e.size)),xt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),br=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),gr=(e)=>Object(e)===e?e:null,nt=(e)=>String(e)===e&&e.length>0,Ar=(e)=>{if(!nt(e.id))return null;if(e.ok===!0){let o={channel:h,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&nt(e.error))return{channel:h,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:Oo(nt(e.code)?e.code:void 0)};return null},bt=(e)=>{let o=gr(e);if(!o||o.channel!==h||o.v!==_)return null;if(o.type==="result")return Ar(o);if(!br.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Ro=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),yr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class u extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Uo=()=>Promise.reject(new u("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pe=()=>Promise.reject(new u("BAD_PATH",`File path must be 1 to ${Ce} characters without NUL or backslash.`)),De=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new u("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},f=(e)=>(e.value+=1,`oc-${e.value}`),gt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new u("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),a=e.requestTimeoutMs??ct,s=new Set,E=new Set,m=new Set,T=new Set,S=new Set,b=new Set,H=new Set,J=new Set,K=new Set,I=null,Y=null,F=new Set,Q=new Set,V=null,te=null,le=!1,Z=new Map,ie=new Map,k=new Map,y=!1,c={value:0},l=null,L=null,W=!1,ae=!1,be=null,Bt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},X=(t)=>{o.parent.postMessage(t,"*")},U=(t,r)=>{for(let d of t)try{d(r)}catch(p){console.error(p)}},Vt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=bt(t.data);if(!r)return;if(r.type==="workspace"){let p=ie.get(r.payload.subscriptionId);if(p)U([p],r.payload.snapshot);return}if(r.type==="shells"){let p=k.get(r.payload.subscriptionId);if(p)U([p],r.payload.snapshot);return}if(r.type==="ready"){if(l=r.payload,L=Bt(r.payload.session),U(s,r.payload),U(E,r.payload.directory),U(m,r.payload.session),L)U(T,L);U(S,r.payload.connection),U(b,r.payload.settings),U(H,r.payload.item);return}if(r.type==="directory"){if(l)l={...l,directory:r.payload.directory};U(E,r.payload.directory);return}if(r.type==="session"){if(l)l={...l,session:r.payload.session};if(!r.payload.session)L=null;else if(L?.sessionId!==r.payload.session.id)L=Bt(r.payload.session);U(m,r.payload.session);return}if(r.type==="session-lifecycle"){L=r.payload,U(T,r.payload);return}if(r.type==="connection"){if(l)l={...l,connection:r.payload.connection};U(S,r.payload.connection);return}if(r.type==="settings"){if(l)l={...l,settings:r.payload.settings};U(b,r.payload.settings);return}if(r.type==="item"){if(l)l={...l,item:r.payload.item};U(H,r.payload.item);return}if(r.type==="status-control-event"){U(J,r.payload);return}if(r.type==="popover-closed"){U(K,r.payload);return}if(r.type==="action"){let p=(x)=>{if(!y)X({channel:h,v:_,type:"action-result",id:r.id,payload:x})},g=Y;if(!g){p({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>g(r.payload)).then(()=>p({ok:!0}),(x)=>{let R=(x instanceof Error?x.message:String(x)).trim();p({ok:!1,error:(R||"Action failed.").slice(0,Ee)})});return}if(r.type==="file-open"){let p=r.payload;if(te&&so(te,p))return;te=p,U(F,r.payload);return}if(r.type==="file-saved"){U(Q,r.payload.version);return}if(r.type==="file-snapshot"){let p=(R)=>{if(!y)X({channel:h,v:_,type:"file-snapshot-result",id:r.id,payload:R})},g=(R)=>p({error:(R.trim()||"Could not read the edited file.").slice(0,Ee)}),x=V;if(!x){g("This extension does not edit files.");return}Promise.resolve().then(()=>x(r.payload.purpose)).then((R)=>{if(tt(R)>Oe){g(`The file is over ${Oe} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>we){g(`The snapshot version is over ${we} characters.`);return}p({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>g(R instanceof Error?R.message:String(R)));return}if(r.type==="resolve"){let p=(x)=>{X({channel:h,v:_,type:"resolve-result",id:r.id,payload:x})},g=I;if(!g){p({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>g(r.payload)).then((x)=>p({item:x?ue(x):null}),(x)=>{let R=(x instanceof Error?x.message:String(x)).trim();p({error:(R||"Command failed.").slice(0,Ee)})});return}let d=Z.get(r.id);if(!d)return;if(clearTimeout(d.timer),Z.delete(r.id),r.ok){d.resolve(r.payload);return}d.reject(new u(r.code,r.error))};o.addEventListener("message",Vt),X({channel:h,v:_,type:"hello"});let M=(t,r=a)=>{if(y||o.parent===o)return Promise.reject(new u("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((d,p)=>{let g=setTimeout(()=>{Z.delete(t.id),p(new u("HOST_TIMEOUT","Host did not answer in time."))},r);Z.set(t.id,{resolve:d,reject:p,timer:g}),X(t)})},O=(t)=>M(t).then(()=>{return}),w={channel:h,v:_},We=(t)=>{if(!y&&o.parent!==o)X(t)},zt=()=>We({...w,type:"file-save"}),jt=(t)=>{if(!Ro(t)||!yr(t))return;t.preventDefault(),zt()},Kt=(t)=>{if(!Ro(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),Qt(l.popover.id,"escape").catch(()=>{return})},ge=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let r=W||ae;if(be===r)return;be=r,Zt(t.id,r).catch(()=>{return})},Ae=()=>{if(l?.surface!=="popover"||W)return;W=!0,ge()},Wt=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!W)return;W=!1,ge()},Jt=()=>{if(l?.surface!=="popover"||ae)return;ae=!0,ge()},Yt=()=>{if(l?.surface!=="popover"||!ae)return;ae=!1,ge()},z=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new u("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Je=async(t)=>{if(t.kind!=="projects")z(t.projectId);let r=await M({...w,type:"workspace-read",id:f(c),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new u("HOST_REJECTED","Host did not return workspace data.");return r},Ye=async(t,r)=>{if(t.kind!=="projects")z(t.projectId);let d=f(c);ie.set(d,r);try{await O({...w,type:"workspace-subscribe",id:f(c),payload:{subscriptionId:d,query:t}})}catch(p){if(ie.delete(d),!y)X({...w,type:"workspace-unsubscribe",id:f(c),payload:{subscriptionId:d}});throw p}return()=>{if(!ie.delete(d)||y)return;X({...w,type:"workspace-unsubscribe",id:f(c),payload:{subscriptionId:d}})}},hr=async(t,r)=>{if(t.kind==="session")z(t.sessionId);if(t.kind==="project")z(t.projectId);let d=f(c);k.set(d,r);try{await O({...w,type:"shells-subscribe",id:f(c),payload:{subscriptionId:d,scope:t}})}catch(p){if(k.delete(d),!y)X({...w,type:"shells-unsubscribe",id:f(c),payload:{subscriptionId:d}});throw p}return()=>{if(!k.delete(d)||y)return;X({...w,type:"shells-unsubscribe",id:f(c),payload:{subscriptionId:d}})}},ye=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ze))throw new u("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!pe(t.value))throw new u("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>qe)throw new u("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new u("UNSUPPORTED","This host does not support device storage.");let r=await M({...w,type:"storage",id:f(c),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new u("HOST_REJECTED","Host did not return storage data.");return r},Qt=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):O({...w,type:"popover-close",id:f(c),payload:r?{id:t,reason:r}:{id:t}}),Zt=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):O({...w,type:"popover-anchor",id:f(c),payload:{id:t,active:r}});return o.addEventListener("keydown",Kt,!0),o.addEventListener("pointerover",Ae),o.addEventListener("pointermove",Ae),o.addEventListener("pointerout",Wt),o.addEventListener("focus",Jt),o.addEventListener("blur",Yt),{onAction:(t)=>(Y=t,()=>{if(Y===t)Y=null}),listProjects:async()=>{let t=await Je({kind:"projects"});if(t.kind!=="projects")throw new u("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await Je({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new u("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await Je({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new u("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Ye({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Ye({kind:"worktrees",projectId:t},(d)=>{if(d.kind==="worktrees")r(d)}),onSessions:(t,r)=>Ye({kind:"sessions",projectId:t},(d)=>{if(d.kind==="sessions")r(d)}),onRunningShells:(t,r)=>hr(t,r),readShellOutput:async(t,r)=>{z(t,ve);let d=r?.cursor;if(d!==void 0&&(!Number.isInteger(d)||d<0))throw new u("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let p=r?.tailBytes;if(p!==void 0&&(!Number.isInteger(p)||p<1||p>ke))throw new u("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ke}.`);let x=await M({...w,type:"shell-output",id:f(c),payload:{shellId:t,cursor:d,tailBytes:p}});if(!x||typeof x.output!=="string"||!Number.isFinite(x.cursor))throw new u("HOST_REJECTED","Host did not return shell output.");return x},stopShell:async(t)=>{if(z(t,ve),(await M({...w,type:"shell-stop",id:f(c),payload:{shellId:t}}))?.stopped!==!0)throw new u("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{z(t),await O({...w,type:"open-session",id:f(c),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let d=De(r),p={op:"get",key:t};if(d)p.scope=d;let g=await ye(p);return g.op==="get"&&g.found?g.value:void 0},set:async(t,r,d)=>{let p=De(d),g={op:"set",key:t,value:r};if(p)g.scope=p;await ye(g)},delete:async(t,r)=>{let d=De(r),p={op:"delete",key:t};if(d)p.scope=d;await ye(p)},keys:async(t)=>{let r=De(t),d={op:"keys"};if(r)d.scope=r;let p=await ye(d);if(p.op!=="keys")throw new u("HOST_REJECTED","Expected storage keys.");return p.keys}},onReady:(t)=>{if(s.add(t),l)t(l);return()=>{s.delete(t)}},onDirectory:(t)=>{if(E.add(t),l)t(l.directory);return()=>{E.delete(t)}},onSession:(t)=>{if(m.add(t),l)t(l.session);return()=>{m.delete(t)}},onSessionLifecycle:(t)=>{if(T.add(t),L)t(L);return()=>{T.delete(t)}},onConnection:(t)=>{if(S.add(t),l)t(l.connection);return()=>{S.delete(t)}},onSettings:(t)=>{if(b.add(t),l)t(l.settings);return()=>{b.delete(t)}},onItem:(t)=>{if(H.add(t),l)t(l.item);return()=>{H.delete(t)}},onStatusControl:(t)=>(J.add(t),()=>{J.delete(t)}),onPopoverClosed:(t)=>(K.add(t),()=>{K.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new u("UNSUPPORTED","This host does not support status controls."));if(!no(t))return Promise.reject(new u("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return O({...w,type:"status-controls",id:f(c),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new u("UNSUPPORTED","This host does not support popovers."));if(!rt(t))return Promise.reject(new u("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return O({...w,type:"popover-open",id:f(c),payload:t})},closePopover:Qt,setPopoverAnchorActive:Zt,onResolve:(t)=>(I=t,()=>{if(I===t)I=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Re)return Promise.reject(new u("HOST_REJECTED",`Toast message must contain 1 to ${Re} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ue))return Promise.reject(new u("HOST_REJECTED",`Toast copy text must contain 1 to ${Ue} characters.`));return O({channel:h,v:_,type:"toast",id:f(c),payload:{...t,message:r}})},openUrl:(t)=>O({channel:h,v:_,type:"open-url",id:f(c),payload:{url:t}}),openCommit:(t)=>at(t)?O({channel:h,v:_,type:"open-commit",id:f(c),payload:{sha:t}}):Promise.reject(new u("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>O({channel:h,v:_,type:"open-surface",id:f(c),payload:{surfaceId:t}}),writeClipboard:(t)=>O({channel:h,v:_,type:"clipboard-write",id:f(c),payload:{text:t}}),compose:(t)=>O({channel:h,v:_,type:"compose",id:f(c),payload:t}),attach:(t)=>O({channel:h,v:_,type:"attach",id:f(c),payload:ue(t)}),startSession:async(t)=>{if(t.projectId!==void 0)z(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")z(r.directory);else{if(r.name!==void 0)z(r.name,200);if(r.baseBranch!==void 0)z(r.baseBranch,200)}let d=await M({channel:h,v:_,type:"start-session",id:f(c),payload:pt(t)},e.requestTimeoutMs??180000);if(!st(d))throw new u("HOST_REJECTED","Host did not return a session.");return d},prompt:(t)=>M({channel:h,v:_,type:"prompt",id:f(c),payload:ut(t)}).then((r)=>{if(!it(r))throw new u("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>O({channel:h,v:_,type:"session-link",id:f(c),payload:ue(t)}),close:()=>O({channel:h,v:_,type:"close",id:f(c)}),oauthStart:()=>O({channel:h,v:_,type:"oauth-start",id:f(c)}),oauthDisconnect:()=>O({channel:h,v:_,type:"oauth-disconnect",id:f(c)}),request:(t)=>(Ge(t.path)?M({channel:h,v:_,type:"request",id:f(c),payload:t}):Uo()).then((r)=>{if(!Ne(r))throw new u("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Ge(t.path)?M({channel:h,v:_,type:"service-request",id:f(c),payload:t}):Uo()).then((r)=>{if(!Ne(r))throw new u("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>M({channel:h,v:_,type:"service-status",id:f(c)}).then((t)=>{if(!Et(t))throw new u("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(me(t)?M({channel:h,v:_,type:"file-read",id:f(c),payload:{path:t}}):Pe()).then((r)=>{if(!ht(r))throw new u("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!me(t))return Pe();if(r.length>Ie)return Promise.reject(new u("FILE_TOO_LARGE",`Content is over ${Ie} characters.`));return M({channel:h,v:_,type:"file-write",id:f(c),payload:{path:t,content:r}}).then((d)=>{if(!_t(d))throw new u("HOST_REJECTED","Host did not confirm the write.");return d})},listDir:(t)=>(me(t)?M({channel:h,v:_,type:"file-list",id:f(c),payload:{path:t}}):Pe()).then((r)=>{if(!St(r))throw new u("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(me(t)?M({channel:h,v:_,type:"file-stat",id:f(c),payload:{path:t}}):Pe()).then((r)=>{if(!Tt(r))throw new u("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),d=t.system?.trim();if(r.length===0||r.length>Le)return Promise.reject(new u("HOST_REJECTED",`Prompt must be 1 to ${Le} characters.`));if(d!==void 0&&(d.length===0||d.length>Me))return Promise.reject(new u("HOST_REJECTED",`System prompt must be 1 to ${Me} characters.`));let p=t.maxOutputTokens===void 0?void 0:Math.min(dt,Math.max(1,Math.floor(t.maxOutputTokens)));if(p!==void 0&&!Number.isFinite(p))return Promise.reject(new u("HOST_REJECTED","maxOutputTokens must be a number."));let g={prompt:r};if(d!==void 0)g.system=d;if(p!==void 0)g.maxOutputTokens=p;return M({channel:h,v:_,type:"generate",id:f(c),payload:g},e.requestTimeoutMs??lt).then((x)=>{if(!xt(x))throw new u("HOST_REJECTED","Host did not return generated text.");return x})},setBadge:(t)=>O({channel:h,v:_,type:"badge",id:f(c),payload:{count:mt(t)}}),setHeight:(t)=>O({channel:h,v:_,type:"resize",id:f(c),payload:{height:ft(t)}}),onFileOpen:(t)=>{if(F.add(t),!le)le=!0,o.addEventListener("keydown",jt,!0);if(te)t(te);return()=>{F.delete(t)}},onFileSnapshot:(t)=>(V=t,()=>{if(V===t)V=null}),onFileSaved:(t)=>(Q.add(t),()=>{Q.delete(t)}),reportFileChange:(t)=>We({...w,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:zt,reportFileUnsupported:()=>We({...w,type:"file-unsupported"}),dispose:()=>{for(let t of ie.keys())X({...w,type:"workspace-unsubscribe",id:f(c),payload:{subscriptionId:t}});ie.clear();for(let t of k.keys())X({...w,type:"shells-unsubscribe",id:f(c),payload:{subscriptionId:t}});if(k.clear(),y=!0,I=null,Y=null,V=null,F.clear(),Q.clear(),le)o.removeEventListener("keydown",jt,!0);o.removeEventListener("message",Vt),o.removeEventListener("keydown",Kt,!0),o.removeEventListener("pointerover",Ae),o.removeEventListener("pointermove",Ae),o.removeEventListener("pointerout",Wt),o.removeEventListener("focus",Jt),o.removeEventListener("blur",Yt);for(let t of Z.values())clearTimeout(t.timer),t.reject(new u("HOST_UNAVAILABLE","Host client was disposed."));Z.clear(),s.clear(),E.clear(),m.clear(),T.clear(),S.clear(),b.clear(),H.clear(),J.clear(),K.clear()}}};var Co=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var Tn=new Set(Co);var Io=["none","agent","user"];var bn=new Set(Io);var vr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],kr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Lo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,a]of vr)o.style.setProperty(n,e.tokens[a]);for(let[n,a,s]of kr){let E=e.tokens[s]??"";o.style.setProperty(n,E),o.style.setProperty(a,E)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},At=(e,o)=>{if(Lo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Or={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},A=(e,o)=>`var(--${e}, var(--oc-${Or[e]}, ${o}))`,ce=A("surface-background","transparent"),$e=A("surface-elevated","transparent"),he=A("surface-elevated-foreground","inherit"),oe=A("surface-foreground","inherit"),v=A("surface-muted-foreground","gray"),wr=A("surface-muted","transparent"),B=A("interactive-border","currentColor"),D=A("interactive-hover","transparent"),de=A("interactive-active","transparent"),yt=A("interactive-selection","transparent"),vt=A("interactive-selection-foreground","inherit"),No=A("interactive-focus-ring","currentColor"),q=A("primary","currentColor"),kt=A("primary-text","inherit"),Ot=A("error-text","inherit"),Rr=A("font-sans","inherit"),wt=A("font-mono","monospace"),Po=A("radius","9px"),Rt=`calc(${Po} - 2px)`,Mo=`calc(${Po} - 4px)`,C=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Go=`box-shadow: 0 0 0 2px ${No};`,He=(e)=>{let o=A(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${A(`${e}-text`,"inherit")}; }`},Ur=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Do=`
.oc-sdk { color: ${oe}; font-family: ${Rr}; }
.oc-sdk :focus-visible { outline: none; ${Go} }
.oc-sdk-mono { font-family: ${wt}; }
.oc-sdk-muted { color: ${v}; }
${He("success")}${He("warning")}${He("error")}${He("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${q}; --oc-sdk-tone-text: ${kt}; }

.oc-sdk-btn { border-radius: ${Rt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Mo}; }
.oc-sdk-btn[data-variant="default"] { color: ${kt}; background: ${C(q,10,ce)}; border-color: ${C(q,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${C(q,16,ce)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${C(q,22,ce)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${wr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="outline"] { background: ${$e}; color: ${he}; border-color: ${B}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${D}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${de}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${A("status-error","red")}; color: ${Ot}; background: ${C("var(--oc-sdk-tone)",7,ce)}; border-color: ${C("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${C("var(--oc-sdk-tone)",9,ce)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${C("var(--oc-sdk-tone)",11,ce)}; }

.oc-sdk-field-note { color: ${v}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Ot}; }
.oc-sdk-input { border-radius: ${Rt}; background: ${$e}; color: ${he}; box-shadow: inset 0 0 0 1px ${C(B,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${v}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${No}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${A("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${A("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${wt}; }

.oc-sdk-search-icon { color: ${v}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search-clear { border-radius: ${Mo}; color: ${v}; }
.oc-sdk-search-clear:hover { background: ${D}; color: ${oe}; }

.oc-sdk-trigger { border-color: ${B}; border-radius: ${Rt}; background: ${$e}; color: ${he}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${v}; }
.oc-sdk-trigger-chevron { color: ${v}; }
.oc-sdk-popup { --surface-foreground: ${he}; border-color: ${C(B,60)}; border-radius: 12px; background: ${$e}; color: ${he}; box-shadow: 0 8px 24px ${C(oe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${D}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${yt}; color: ${vt}; }
.oc-sdk-option-check { color: ${oe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Ot}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${C(A("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${v}; }
.oc-sdk-popup-empty { color: ${v}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${B}; border-radius: 4px; color: ${oe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${C(oe,60,B)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${B}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ce}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${q}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Go} }
.oc-sdk-check-desc { color: ${v}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${C(oe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${v}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${oe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${vt}; background: ${yt}; border-color: ${B}; }
.oc-sdk-tab-count { color: ${v}; }

.oc-sdk-badge { border-radius: 9999px; background: ${D}; color: ${v}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${C("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${D}; }
.oc-sdk-row[aria-selected="true"] { background: ${yt}; color: ${vt}; }
.oc-sdk-row-lead { font-family: ${wt}; color: ${v}; }
.oc-sdk-row-sub { color: ${v}; }
.oc-sdk-row-meta { color: ${v}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${v}; }

.oc-sdk-empty-body { color: ${v}; }

.oc-sdk-spinner { color: ${v}; }
.oc-sdk-spinner-ring { border-color: ${B}; border-top-color: ${q}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${C("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${C("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${v}; }

.oc-sdk-separator { color: ${v}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${C(B,40)}; }

.oc-sdk-progress-label { color: ${v}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${B}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${q}); }

.oc-sdk-text a { color: ${kt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${C(B,60)}; }
`,G=`
${Qe}
${Ur}
${Do}`;var Gr=0,re=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[a,s]of Object.entries(o))n.setAttribute(a,String(s));return n},It=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,a=re("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),s=`fill-${++Gr}`,E=re("defs",{}),m=re("linearGradient",{id:s,x1:0,x2:0,y1:0,y2:1});m.append(re("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),re("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),E.append(m);let T=re("path",{d:"",class:"chart-grid"}),S=re("path",{d:"",fill:`url(#${s})`}),b=re("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});a.append(E,T,S,b);let H=document.createElement("div");H.className="chart-cursor";let J=document.createElement("div");J.className="chart-dot",J.style.background=e.color;let K=document.createElement("div");K.className="chart-tip",o.append(a,H,J,K);let I=[],Y=1,F=null,Q=null,V=(k,y)=>(e.capacity-y+k)/Math.max(1,e.capacity-1)*300,te=(k)=>n-1-Math.min(k,Y)/Y*(n-1-2),le=()=>{let k=F===null?void 0:I[F];if(F===null||k===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let y=o.getBoundingClientRect(),c=V(F,I.length)/300*y.width,l=te(k)/n*y.height;H.style.transform=`translateX(${c}px)`,J.style.transform=`translate(${c}px, ${l}px)`;let L=(I.length-1-F)*e.intervalSeconds;K.textContent=`${e.format(k)} · ${L===0?"now":`${L} s ago`}`;let W=c>y.width/2;K.style.left=W?"":`${c+8}px`,K.style.right=W?`${y.width-c+8}px`:""},Z=(k)=>{if(I.length===0)return;let y=o.getBoundingClientRect(),c=(k-y.left)/y.width*(e.capacity-1),l=Math.round(c-(e.capacity-I.length));F=Math.min(I.length-1,Math.max(0,l)),le()};return o.addEventListener("pointermove",(k)=>{Q=k.clientX,Z(k.clientX)}),o.addEventListener("pointerleave",()=>{Q=null,F=null,le()}),{element:o,update:(k,y)=>{if(I=k,Y=y>0?y:1,T.setAttribute("d",[0.25,0.5,0.75].map((c)=>`M0 ${n*c} H300`).join(" ")),I.length===0)S.setAttribute("d",""),b.setAttribute("d","");else{let c=I.map((ae,be)=>`${V(be,I.length).toFixed(2)} ${te(ae).toFixed(2)}`),l=I.length===1,L=l?`M${V(0,1)-2} ${c[0]?.split(" ")[1]} L${c[0]}`:`M${c.join(" L")}`;b.setAttribute("d",L);let W=l?V(0,1)-2:V(0,I.length);S.setAttribute("d",`${L} L300 ${n} L${W.toFixed(2)} ${n} Z`)}if(Q!==null)Z(Q)}}};var Mt=2000,$o={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},ze=(e)=>typeof e==="object"&&e!==null,Nr=(e)=>ze(e)&&typeof e.at==="number"&&ze(e.system)&&ze(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&ze(e.history),Pr=(e)=>{if(!(e instanceof u))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Lt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Ho=(e,o,n,a)=>{let s=!1,E=async()=>{if(s||!Lt(o))return;s=!0;try{let S=await e.serviceRequest({method:"GET",path:"/snapshot"}),b;try{b=JSON.parse(S.body)}catch{b=null}if(S.status===200&&Nr(b))n(b);else a(S.status===200?"bad-answer":"service-failed")}catch(S){a(Pr(S))}finally{s=!1}};E(),setInterval(()=>{E()},Mt);let m=Lt(o),T=()=>{let S=Lt(o);if(S&&!m)E();m=S};document.addEventListener("visibilitychange",T),new ResizeObserver(T).observe(document.documentElement)};var Xo="en",Bo=(e)=>{Xo=e||"en"},Vo=(e,o)=>new Intl.NumberFormat(Xo,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),j=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),a=0;while(n>=1024&&a<o.length-1)n/=1024,a+=1;let s=a>=3&&n<100?1:0;return`${Vo(n,s)} ${o[a]}`},ne=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Vo(e,e<10?1:0)}%`},zo=(e)=>{let o=Math.floor(e/86400),n=Math.floor(e%86400/3600),a=Math.floor(e%3600/60);if(o>0)return`${o} d ${n} h`;if(n>0)return`${n} h ${a} min`;return`${a} min`},je=(e,o)=>{let n=o.replace(/^"([^"]+)"/,"$1");if(!e||!/^([A-Za-z]:)?[\\/]/.test(n))return o;let a=-1;while((a=n.indexOf(e,a+1))>=0){if(!/[\\/]/.test(n[a-1]??""))continue;let s=n.slice(a+e.length).replace(/^\.exe/i,"");if(s===""||s.startsWith(" "))return s.trim()}return o},Dr={renderer:"Renderer","gpu-process":"GPU",utility:"Utility",zygote:"Zygote"},$r=[[/network/i,"Network service"],[/storage/i,"Storage service"],[/audio/i,"Audio service"],[/video_?capture/i,"Video capture"]],Fo=(...e)=>e.filter(Boolean).join(" · "),jo=(e,o)=>{let n=e.ports.map((s)=>`:${s}`).join(" ");if(o==="root")return{title:"Main process",detail:Fo(n,je(e.name,e.command))};if(o==="self")return{title:"Resource Monitor",detail:"this extension"};let a=/--type=([\w-]+)/.exec(e.command)?.[1];if(a&&/\bHelper\b/.test(e.name)){let s=a==="utility"?/--utility-sub-type=([\w.]+)/.exec(e.command)?.[1]??"":"";return{title:$r.find(([m])=>m.test(s))?.[1]??Dr[a]??a,detail:n}}return{title:e.name,detail:Fo(n,je(e.name,e.command))}},Ko=(e)=>{if(e==="darwin")return"macOS";if(e==="win32")return"Windows";if(e==="linux")return"Linux";return e},Ke={app:"OpenChamber",opencode:"OpenCode",terminals:"Terminal"},Wo={app:"OpenChamber",opencode:"Agent",terminals:"Terminal"},_e={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var i=(e,o="",n="",a=[])=>{let s=document.createElement(e);if(o)s.className=o;if(n)s.textContent=n;if(a.length>0)s.append(...a);return s};var Jo=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .chart { position: relative; width: 100%; overflow: hidden; }
  .chart svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .chart-grid { stroke: var(--oc-border); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .5; fill: none; }
  .chart-cursor, .chart-dot, .chart-tip { position: absolute; pointer-events: none; opacity: 0; }
  .chart.hovering .chart-cursor, .chart.hovering .chart-dot, .chart.hovering .chart-tip { opacity: 1; }
  .chart-cursor { top: 0; bottom: 0; left: 0; width: 1px; background: var(--oc-border); }
  .chart-dot { top: -3px; left: -3px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 0 2px var(--oc-bg); }
  .chart-tip { top: 2px; padding: 1px 6px; border-radius: 4px; white-space: nowrap; font-size: 11px;
    background: var(--oc-elevated); color: var(--oc-elevated-fg); border: 1px solid var(--oc-border); font-variant-numeric: tabular-nums; }
  .port { display: inline-flex; align-items: center; height: 18px; padding: 0 6px; border-radius: 4px; font: 11px var(--oc-mono);
    background: color-mix(in srgb, var(--oc-primary) 14%, transparent); color: var(--oc-primary-text, var(--oc-primary)); }
`,Yo=`
  html, body { height: 100%; overflow-y: auto; overflow-x: hidden; }
  #root { display: flex; flex-direction: column; gap: 14px; padding: 12px 12px 20px; }
  .head { display: flex; align-items: flex-start; gap: 8px; }
  .head .titles { min-width: 0; flex: 1; }
  .host-name { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .host-meta { color: var(--oc-muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .live { display: inline-flex; align-items: center; gap: 6px; color: var(--oc-muted); font-size: 11px; white-space: nowrap; padding-top: 2px; }
  .live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--oc-success); }
  .live.stale::before { background: var(--oc-muted); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
  .card { min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid var(--oc-border);
    border-radius: var(--oc-radius); background: var(--oc-elevated); color: var(--oc-elevated-fg); }
  .card-top { display: flex; align-items: baseline; gap: 8px; }
  .label { font-size: 11px; font-weight: 600; letter-spacing: .02em; color: var(--oc-muted); text-transform: uppercase; }
  .big { font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -.01em; }
  .card-top .grow { flex: 1; }
  .sub { color: var(--oc-muted); font-size: 11px; }
  .stack { display: flex; height: 8px; border-radius: 4px; overflow: hidden; background: var(--oc-muted-surface, var(--oc-hover)); }
  .stack > span { height: 100%; transition: width .4s ease; }
  .stack > span + span { box-shadow: -1px 0 0 var(--oc-elevated); }
  .legend { display: flex; flex-direction: column; gap: 4px; }
  .legend-row { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto auto; align-items: center; gap: 8px; }
  .legend-row .swatch { width: 8px; height: 8px; border-radius: 2px; }
  .legend-row .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .legend-row .value { text-align: right; min-width: 56px; }
  .section { display: flex; flex-direction: column; gap: 6px; }
  .section-head { display: flex; align-items: baseline; gap: 8px; padding: 0 2px; }
  .section-head .grow { flex: 1; }
  .empty { color: var(--oc-muted); padding: 10px 12px; border: 1px dashed var(--oc-border); border-radius: var(--oc-radius); }
  .servers { display: flex; flex-direction: column; border: 1px solid var(--oc-border); border-radius: var(--oc-radius); overflow: hidden; }
  .server { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 10px; padding: 8px 12px; }
  .server + .server { border-top: 1px solid var(--oc-border); }
  .server .title { display: flex; align-items: center; gap: 6px; min-width: 0; flex-wrap: wrap; }
  .server .title b { font-weight: 600; }
  .origin { font-size: 10px; padding: 0 5px; border-radius: 4px; line-height: 16px; border: 1px solid var(--oc-border); color: var(--oc-muted); }
  .server .stats { text-align: right; white-space: nowrap; }
  .server .command { grid-column: 1 / -1; color: var(--oc-muted); font: 11px var(--oc-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .table { border: 1px solid var(--oc-border); border-radius: var(--oc-radius); overflow: hidden; }
  .thead, details.group > summary, .proc { display: grid; grid-template-columns: minmax(0, 1fr) 60px 72px; align-items: center; column-gap: 8px; }
  .thead { padding: 6px 12px; color: var(--oc-muted); font-size: 11px; border-bottom: 1px solid var(--oc-border); }
  .cell { text-align: right; white-space: nowrap; }
  .quiet { color: var(--oc-muted); }
  details.group + details.group { border-top: 1px solid var(--oc-border); }
  details.group > summary { list-style: none; padding: 8px 12px; cursor: pointer; user-select: none; }
  details.group > summary::-webkit-details-marker { display: none; }
  details.group > summary:focus-visible { outline: 2px solid var(--oc-focus); outline-offset: -2px; }
  .gname { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .gname b { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .gname .count { color: var(--oc-muted); }
  .chevron { flex: none; width: 12px; height: 12px; color: var(--oc-muted); transition: transform .15s ease; }
  details.group[open] .chevron { transform: rotate(90deg); }
  .dot { flex: none; width: 6px; height: 6px; border-radius: 50%; }
  .rows { padding: 0 0 6px; }
  /* Names line up under the group name (past the chevron and dot), then step in per level. */
  .proc { padding: 4px 12px 4px calc(36px + var(--depth, 0) * 14px); }
  .who { display: flex; flex-direction: column; min-width: 0; }
  .pname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pdetail { color: var(--oc-muted); font: 11px/1.35 var(--oc-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .more { color: var(--oc-muted); padding: 4px 12px 2px 36px; }
  .banner { padding: 8px 12px; border-radius: var(--oc-radius); border: 1px solid color-mix(in srgb, var(--oc-warning) 40%, transparent);
    background: color-mix(in srgb, var(--oc-warning) 10%, transparent); color: var(--oc-warning-text, var(--oc-fg)); }
  .banner.error { border-color: color-mix(in srgb, var(--oc-error) 40%, transparent); background: color-mix(in srgb, var(--oc-error) 10%, transparent);
    color: var(--oc-error-text, var(--oc-fg)); }
  .footnote { color: var(--oc-muted); font-size: 11px; padding: 0 2px; }
  [hidden] { display: none !important; }
`;var Gt=90;var Qo=gt(),$t=document.querySelector("#root");if(!$t)throw Error("Missing #root");var tr=document.createElement("style");tr.textContent=Jo+Yo;document.head.append(tr);var Ht=Mt/1000,se=i("div","banner");se.hidden=!0;var or=i("div","host-name","This machine"),rr=i("div","host-meta","Reading…"),xe=i("div","live stale","Starting"),nr=i("div","head");nr.append(i("div","titles","",[or,rr]),xe);var sr=(e,o,n)=>{let a=i("span","big num","–"),s=i("span","sub num"),E=i("div","card-top","",[i("span","label",e),i("span","grow"),s]),m=It({color:o,height:56,capacity:Gt,format:n,intervalSeconds:Ht}),T=i("div","sub num");return{card:i("div","card","",[E,a,m.element,T]),value:a,side:s,sub:T,chart:m}},Se=sr("CPU",_e.cpu,ne),Te=sr("Memory",_e.memory,j),Hr=i("div","grid","",[Se.card,Te.card]),ir=i("span","big num","–"),ar=i("span","sub num"),cr=It({color:_e.app,height:44,capacity:Gt,format:j,intervalSeconds:Ht}),dr=i("div","stack"),lr=i("div","legend"),Fr=i("div","card","",[i("div","card-top","",[i("span","label","OpenChamber"),i("span","grow"),ar]),ir,i("div","sub","The app, OpenCode, and everything they started"),cr.element,dr,lr]),pr=i("span","sub num"),Dt=i("div","servers"),ur=i("div","empty","No dev servers right now. Servers started by an agent or in the terminal show up here with their ports."),Xr=i("div","section","",[i("div","section-head","",[i("span","label","Dev servers"),pr]),Dt,ur]),mr=i("div"),Br=i("div","section","",[i("div","section-head","",[i("span","label","Processes")]),mr]),fr=i("div"),Ft=i("div","section","",[i("div","section-head","",[i("span","label","OpenCode outside OpenChamber")]),fr]);Ft.hidden=!0;var Vr=i("div","footnote","Process CPU counts 100% per core, as Activity Monitor does. The CPU card above is the whole machine. Memory is resident memory: pages a process shares with others count in each of them.");$t.append(se,nr,Hr,Fr,Xr,Br,Ft,Vr);var Nt=new Set(["app","opencode","terminals"]),zr=()=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("class","chevron"),e.setAttribute("aria-hidden","true");let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d","M6 4l4 4-4 4"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.6"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),e.append(o),e},Pt=(e)=>_e[e],Er=(e)=>i("span",e!==null&&e>=1?"cell num":"cell num quiet",ne(e)),jr=(e,o)=>{let{title:n,detail:a}=jo(e,o),s=i("div","who","",[i("span","pname",n)]);if(a)s.append(i("span","pdetail",a));let E=i("div","proc","",[s,Er(e.cpu),i("span","cell num",j(e.memory))]);return E.style.setProperty("--depth",String(e.depth)),E.title=`${e.name} · pid ${e.pid}${e.command?`
${e.command}`:""}`,E},Zo=(e,o,n,a)=>{let s=document.createElement("details");s.className="group",s.open=Nt.has(e.id),s.addEventListener("toggle",()=>{if(s.open)Nt.add(e.id);else Nt.delete(e.id)});let E=i("span","dot");E.style.background=n;let m=e.processes.length+e.hidden,T=i("span","gname","",[zr(),E,i("b","",o),i("span","count",String(m))]),S=document.createElement("summary");S.append(T,Er(e.cpu),i("span","cell num",j(e.memory)));let b=i("div","rows","",e.processes.map((H)=>jr(H,a(H))));if(e.hidden>0)b.append(i("div","more",`${e.hidden} smaller processes not shown`));return s.append(S,b),s},qo=(e)=>i("div","table","",[i("div","thead","",[i("span","","Process"),i("span","cell","CPU"),i("span","cell","Memory")]),...e]),Kr=(e)=>{let o=i("div","title","",[...e.ports.map((E)=>i("span","port",`:${E}`)),i("b","",e.name),i("span","origin",Wo[e.group])]),n=i("div","stats num",`${ne(e.cpu)} · ${j(e.memory)}`),a=i("div","server","",[o,n]),s=je(e.executable,e.command);if(s)a.append(i("div","command",s));return a.title=`pid ${e.pid}${e.command?`
${e.command}`:""}`,a},Wr=(e,o,n)=>{e.replaceChildren(...o.filter((a)=>a.value>0).map((a)=>{let s=i("span");return s.style.width=`${Math.min(100,a.value/Math.max(1,n)*100)}%`,s.style.background=a.color,s.title=a.label,s}))},Jr={"processes-unavailable":"The process list could not be read just now. OpenChamber's numbers are from the last reading that worked.","ports-unavailable":"Listening ports could not be read, so dev servers are not detected."},Xt=null,Yr=(e)=>{let{system:o,app:n}=e;or.textContent=o.hostname,rr.textContent=[Ko(o.platform),o.arch,o.cpuModel,`up ${zo(o.uptimeSeconds)}`].filter(Boolean).join(" · "),xe.textContent=`Live · every ${Ht} s`,xe.classList.remove("stale"),Se.value.textContent=ne(o.cpu),Se.side.textContent=`${o.cores} cores`,Se.sub.textContent=o.load?`Load ${o.load.map((m)=>m.toFixed(2)).join(" · ")}`:"All cores together",Se.chart.update(e.history.system.cpu,100),Te.value.textContent=j(o.memoryUsed),Te.side.textContent=ne(o.memoryUsed/Math.max(1,o.memoryTotal)*100),Te.sub.textContent=`of ${j(o.memoryTotal)} · ${j(Math.max(0,o.memoryTotal-o.memoryUsed))} free`,Te.chart.update(e.history.system.memory,o.memoryTotal),ir.textContent=j(n.memory),ar.textContent=`${ne(n.cpu)} CPU`;let a=Math.max(n.memory,...e.history.app.memory);cr.update(e.history.app.memory,a*1.15),Wr(dr,n.groups.map((m)=>({value:m.memory,color:Pt(m.id),label:Ke[m.id]})),n.memory),lr.replaceChildren(...n.groups.map((m)=>{let T=i("span","swatch");T.style.background=Pt(m.id);let S=m.processes.length+m.hidden;return i("div","legend-row","",[T,i("span","name",`${Ke[m.id]}`,[i("span","muted",` · ${S} ${S===1?"process":"processes"}`)]),i("span","value num muted",ne(m.cpu)),i("span","value num",j(m.memory))])})),pr.textContent=e.servers.length>0?String(e.servers.length):"",Dt.replaceChildren(...e.servers.map(Kr)),Dt.hidden=e.servers.length===0,ur.hidden=e.servers.length>0;let s=(m)=>m.pid===n.rootPid?"root":m.name==="Resource Monitor"&&m.ppid===n.rootPid?"self":"other";if(mr.replaceChildren(qo(n.groups.map((m)=>Zo(m,Ke[m.id],Pt(m.id),s)))),Ft.hidden=e.outside.length===0,e.outside.length>0){let m=e.outside.reduce((S,b)=>S+(b.cpu??0),0),T=e.outside.reduce((S,b)=>S+b.memory,0);fr.replaceChildren(qo([Zo({id:"outside",cpu:m,memory:T,processes:e.outside,hidden:0},"OpenCode","var(--oc-muted)",()=>"other")]))}let E=e.warnings.map((m)=>Jr[m]);se.hidden=E.length===0&&Xt===null,se.classList.toggle("error",!1),se.textContent=E.join(" ")},Qr=(e)=>{Xt=e,se.hidden=!1,se.classList.add("error"),se.textContent=$o[e],xe.textContent="Paused",xe.classList.add("stale")},er=!1;Qo.onReady((e)=>{if(At(e,document.documentElement),Bo(e.locale),er)return;er=!0,Ho(Qo,$t,(o)=>{Xt=null,Yr(o)},Qr)});})();
