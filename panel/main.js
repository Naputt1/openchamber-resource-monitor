(()=>{var S="openchamber.sdk",x=1;var Ye=`
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
`;function qt(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(i)=>{let a=i.target===e?o:i.target;if(!(a instanceof Element))return;if(!a.hasAttribute("data-oc-scrolling"))a.setAttribute("data-oc-scrolling","");let _=n.get(a);if(_!==void 0)clearTimeout(_);n.set(a,setTimeout(()=>{n.delete(a),a.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var hr=`(${qt.toString()})(document);`;var Qe=128,Ze=65536;var ve=128;var ke=65536;var ro=/^[a-z][a-z0-9-]{0,39}$/;var eo=(e)=>Object(e)===e&&!Array.isArray(e),qe=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),to=(e)=>String(e)===e&&e.length>=1&&e.length<=60,oo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,no=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!eo(n)||!ro.test(n.id)||!to(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!qe(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!qe(n,["kind","id","label","value","options","disabled"]))return!1;if(!oo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let i=new Set;for(let a of n.options){if(!eo(a)||!qe(a,["value","label"])||!oo(a.value)||!to(a.label)||i.has(a.value))return!1;i.add(a.value)}if(!i.has(n.value))return!1}return!0};var we=20000000,Oe=256;var et=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,so=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var io=/^[A-Za-z0-9_-]{1,80}$/;var ao=["left","right","top","bottom"];var co=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let a of i)if(!co(a,o+1,n))return!1;return!0},tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(tt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(tt)}return String(e)===e||Number.isFinite(e)},ot=(e)=>{try{if(String(e.id)!==e.id||!io.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ao.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!co(e.data)||!tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var po=["file","directory","other","missing"],nt=(e)=>Boolean(e&&"sessionId"in e),st=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var uo=/^[0-9a-f]{7,64}$/i,it=(e)=>uo.test(e),Re=500,Ce=32000,mo=16000,fo=128,Eo=200,ho=2000,_o=16000,So=80,xo=200,To=16000;var go=2000;var at=20000,Ue=1024,Ie=2000000;var Le=64000,Me=8000,ct=4000;var dt=90000;var bo=999,yo=1e4,Se=500,Ao=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],vo=["stopped","starting","ready","failed"],_r=new Set(Ao),ko=(e)=>_r.has(e),wo=(e)=>e&&ko(e)?e:"HOST_REJECTED",ue=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ue);if(Object(e)===e)return Object.values(e).every(ue);return!1},Oo=(e)=>ue(e)&&JSON.stringify(e).length<=To,lo=(e)=>e?.trim().slice(0,xo)??"",me=(e)=>{let o=e.id.trim().slice(0,fo),n=e.title.trim().slice(0,Eo),i=e.url.trim().slice(0,ho),a=e.text?.trim().slice(0,_o),_=e.author?.trim().slice(0,So),m=e.kind==="pull"?"pull":"issue",h={providerId:e.providerId.trim(),id:o,title:n||o,url:i,kind:m};if(a)h.text=a;if(_)h.author=_;if(m==="pull"){let E=lo(e.branches?.head),g=lo(e.branches?.base);if(E&&g)h.branches={head:E,base:g}}if(Oo(e.data))h.data=e.data;return h},lt=(e)=>{let o=me(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},pt=(e)=>{let o={text:e.text.trim().slice(0,mo)};if(e.send)o.send=!0;return o},ut=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(bo,Math.max(0,Math.round(e)))},mt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(yo,Math.max(0,Math.ceil(e)))};var fe=(e)=>e.length>0&&e.length<=Ue&&!e.includes("\x00")&&!e.includes("\\");var Ge=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>go)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Sr=new Set(vo),ft=(e)=>Boolean(e&&"status"in e&&Sr.has(String(e.status))&&!("body"in e)),Ne=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Et=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ht=(e)=>Boolean(e&&"written"in e&&e.written===!0),_t=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),xr=new Set(po),St=(e)=>Boolean(e&&"kind"in e&&"size"in e&&xr.has(String(e.kind))&&Number.isFinite(e.size)),xt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Tr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),gr=(e)=>Object(e)===e?e:null,rt=(e)=>String(e)===e&&e.length>0,br=(e)=>{if(!rt(e.id))return null;if(e.ok===!0){let o={channel:S,v:x,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&rt(e.error))return{channel:S,v:x,type:"result",id:e.id,ok:!1,error:e.error,code:wo(rt(e.code)?e.code:void 0)};return null},Tt=(e)=>{let o=gr(e);if(!o||o.channel!==S||o.v!==x)return null;if(o.type==="result")return br(o);if(!Tr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Ro=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),yr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class u extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Co=()=>Promise.reject(new u("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pe=()=>Promise.reject(new u("BAD_PATH",`File path must be 1 to ${Ue} characters without NUL or backslash.`)),$e=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new u("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},f=(e)=>(e.value+=1,`oc-${e.value}`),gt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new u("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),i=e.requestTimeoutMs??at,a=new Set,_=new Set,m=new Set,h=new Set,E=new Set,g=new Set,D=new Set,Y=new Set,K=new Set,I=null,Q=null,X=new Set,Z=new Set,z=null,oe=null,pe=!1,q=new Map,ae=new Map,k=new Map,A=!1,c={value:0},l=null,L=null,W=!1,ce=!1,ge=null,Bt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},B=(t)=>{o.parent.postMessage(t,"*")},C=(t,r)=>{for(let d of t)try{d(r)}catch(p){console.error(p)}},Vt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Tt(t.data);if(!r)return;if(r.type==="workspace"){let p=ae.get(r.payload.subscriptionId);if(p)C([p],r.payload.snapshot);return}if(r.type==="shells"){let p=k.get(r.payload.subscriptionId);if(p)C([p],r.payload.snapshot);return}if(r.type==="ready"){if(l=r.payload,L=Bt(r.payload.session),C(a,r.payload),C(_,r.payload.directory),C(m,r.payload.session),L)C(h,L);C(E,r.payload.connection),C(g,r.payload.settings),C(D,r.payload.item);return}if(r.type==="directory"){if(l)l={...l,directory:r.payload.directory};C(_,r.payload.directory);return}if(r.type==="session"){if(l)l={...l,session:r.payload.session};if(!r.payload.session)L=null;else if(L?.sessionId!==r.payload.session.id)L=Bt(r.payload.session);C(m,r.payload.session);return}if(r.type==="session-lifecycle"){L=r.payload,C(h,r.payload);return}if(r.type==="connection"){if(l)l={...l,connection:r.payload.connection};C(E,r.payload.connection);return}if(r.type==="settings"){if(l)l={...l,settings:r.payload.settings};C(g,r.payload.settings);return}if(r.type==="item"){if(l)l={...l,item:r.payload.item};C(D,r.payload.item);return}if(r.type==="status-control-event"){C(Y,r.payload);return}if(r.type==="popover-closed"){C(K,r.payload);return}if(r.type==="action"){let p=(T)=>{if(!A)B({channel:S,v:x,type:"action-result",id:r.id,payload:T})},b=Q;if(!b){p({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>b(r.payload)).then(()=>p({ok:!0}),(T)=>{let R=(T instanceof Error?T.message:String(T)).trim();p({ok:!1,error:(R||"Action failed.").slice(0,Se)})});return}if(r.type==="file-open"){let p=r.payload;if(oe&&so(oe,p))return;oe=p,C(X,r.payload);return}if(r.type==="file-saved"){C(Z,r.payload.version);return}if(r.type==="file-snapshot"){let p=(R)=>{if(!A)B({channel:S,v:x,type:"file-snapshot-result",id:r.id,payload:R})},b=(R)=>p({error:(R.trim()||"Could not read the edited file.").slice(0,Se)}),T=z;if(!T){b("This extension does not edit files.");return}Promise.resolve().then(()=>T(r.payload.purpose)).then((R)=>{if(et(R)>we){b(`The file is over ${we} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>Oe){b(`The snapshot version is over ${Oe} characters.`);return}p({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>b(R instanceof Error?R.message:String(R)));return}if(r.type==="resolve"){let p=(T)=>{B({channel:S,v:x,type:"resolve-result",id:r.id,payload:T})},b=I;if(!b){p({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>b(r.payload)).then((T)=>p({item:T?me(T):null}),(T)=>{let R=(T instanceof Error?T.message:String(T)).trim();p({error:(R||"Command failed.").slice(0,Se)})});return}let d=q.get(r.id);if(!d)return;if(clearTimeout(d.timer),q.delete(r.id),r.ok){d.resolve(r.payload);return}d.reject(new u(r.code,r.error))};o.addEventListener("message",Vt),B({channel:S,v:x,type:"hello"});let M=(t,r=i)=>{if(A||o.parent===o)return Promise.reject(new u("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((d,p)=>{let b=setTimeout(()=>{q.delete(t.id),p(new u("HOST_TIMEOUT","Host did not answer in time."))},r);q.set(t.id,{resolve:d,reject:p,timer:b}),B(t)})},w=(t)=>M(t).then(()=>{return}),O={channel:S,v:x},Ke=(t)=>{if(!A&&o.parent!==o)B(t)},zt=()=>Ke({...O,type:"file-save"}),jt=(t)=>{if(!Ro(t)||!yr(t))return;t.preventDefault(),zt()},Kt=(t)=>{if(!Ro(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),Qt(l.popover.id,"escape").catch(()=>{return})},be=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let r=W||ce;if(ge===r)return;ge=r,Zt(t.id,r).catch(()=>{return})},ye=()=>{if(l?.surface!=="popover"||W)return;W=!0,be()},Wt=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!W)return;W=!1,be()},Jt=()=>{if(l?.surface!=="popover"||ce)return;ce=!0,be()},Yt=()=>{if(l?.surface!=="popover"||!ce)return;ce=!1,be()},j=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new u("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},We=async(t)=>{if(t.kind!=="projects")j(t.projectId);let r=await M({...O,type:"workspace-read",id:f(c),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new u("HOST_REJECTED","Host did not return workspace data.");return r},Je=async(t,r)=>{if(t.kind!=="projects")j(t.projectId);let d=f(c);ae.set(d,r);try{await w({...O,type:"workspace-subscribe",id:f(c),payload:{subscriptionId:d,query:t}})}catch(p){if(ae.delete(d),!A)B({...O,type:"workspace-unsubscribe",id:f(c),payload:{subscriptionId:d}});throw p}return()=>{if(!ae.delete(d)||A)return;B({...O,type:"workspace-unsubscribe",id:f(c),payload:{subscriptionId:d}})}},Er=async(t,r)=>{if(t.kind==="session")j(t.sessionId);if(t.kind==="project")j(t.projectId);let d=f(c);k.set(d,r);try{await w({...O,type:"shells-subscribe",id:f(c),payload:{subscriptionId:d,scope:t}})}catch(p){if(k.delete(d),!A)B({...O,type:"shells-unsubscribe",id:f(c),payload:{subscriptionId:d}});throw p}return()=>{if(!k.delete(d)||A)return;B({...O,type:"shells-unsubscribe",id:f(c),payload:{subscriptionId:d}})}},Ae=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Qe))throw new u("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ue(t.value))throw new u("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Ze)throw new u("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new u("UNSUPPORTED","This host does not support device storage.");let r=await M({...O,type:"storage",id:f(c),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new u("HOST_REJECTED","Host did not return storage data.");return r},Qt=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-close",id:f(c),payload:r?{id:t,reason:r}:{id:t}}),Zt=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new u("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-anchor",id:f(c),payload:{id:t,active:r}});return o.addEventListener("keydown",Kt,!0),o.addEventListener("pointerover",ye),o.addEventListener("pointermove",ye),o.addEventListener("pointerout",Wt),o.addEventListener("focus",Jt),o.addEventListener("blur",Yt),{onAction:(t)=>(Q=t,()=>{if(Q===t)Q=null}),listProjects:async()=>{let t=await We({kind:"projects"});if(t.kind!=="projects")throw new u("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await We({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new u("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await We({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new u("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Je({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Je({kind:"worktrees",projectId:t},(d)=>{if(d.kind==="worktrees")r(d)}),onSessions:(t,r)=>Je({kind:"sessions",projectId:t},(d)=>{if(d.kind==="sessions")r(d)}),onRunningShells:(t,r)=>Er(t,r),readShellOutput:async(t,r)=>{j(t,ve);let d=r?.cursor;if(d!==void 0&&(!Number.isInteger(d)||d<0))throw new u("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let p=r?.tailBytes;if(p!==void 0&&(!Number.isInteger(p)||p<1||p>ke))throw new u("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ke}.`);let T=await M({...O,type:"shell-output",id:f(c),payload:{shellId:t,cursor:d,tailBytes:p}});if(!T||typeof T.output!=="string"||!Number.isFinite(T.cursor))throw new u("HOST_REJECTED","Host did not return shell output.");return T},stopShell:async(t)=>{if(j(t,ve),(await M({...O,type:"shell-stop",id:f(c),payload:{shellId:t}}))?.stopped!==!0)throw new u("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{j(t),await w({...O,type:"open-session",id:f(c),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let d=$e(r),p={op:"get",key:t};if(d)p.scope=d;let b=await Ae(p);return b.op==="get"&&b.found?b.value:void 0},set:async(t,r,d)=>{let p=$e(d),b={op:"set",key:t,value:r};if(p)b.scope=p;await Ae(b)},delete:async(t,r)=>{let d=$e(r),p={op:"delete",key:t};if(d)p.scope=d;await Ae(p)},keys:async(t)=>{let r=$e(t),d={op:"keys"};if(r)d.scope=r;let p=await Ae(d);if(p.op!=="keys")throw new u("HOST_REJECTED","Expected storage keys.");return p.keys}},onReady:(t)=>{if(a.add(t),l)t(l);return()=>{a.delete(t)}},onDirectory:(t)=>{if(_.add(t),l)t(l.directory);return()=>{_.delete(t)}},onSession:(t)=>{if(m.add(t),l)t(l.session);return()=>{m.delete(t)}},onSessionLifecycle:(t)=>{if(h.add(t),L)t(L);return()=>{h.delete(t)}},onConnection:(t)=>{if(E.add(t),l)t(l.connection);return()=>{E.delete(t)}},onSettings:(t)=>{if(g.add(t),l)t(l.settings);return()=>{g.delete(t)}},onItem:(t)=>{if(D.add(t),l)t(l.item);return()=>{D.delete(t)}},onStatusControl:(t)=>(Y.add(t),()=>{Y.delete(t)}),onPopoverClosed:(t)=>(K.add(t),()=>{K.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new u("UNSUPPORTED","This host does not support status controls."));if(!no(t))return Promise.reject(new u("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...O,type:"status-controls",id:f(c),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new u("UNSUPPORTED","This host does not support popovers."));if(!ot(t))return Promise.reject(new u("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...O,type:"popover-open",id:f(c),payload:t})},closePopover:Qt,setPopoverAnchorActive:Zt,onResolve:(t)=>(I=t,()=>{if(I===t)I=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Re)return Promise.reject(new u("HOST_REJECTED",`Toast message must contain 1 to ${Re} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ce))return Promise.reject(new u("HOST_REJECTED",`Toast copy text must contain 1 to ${Ce} characters.`));return w({channel:S,v:x,type:"toast",id:f(c),payload:{...t,message:r}})},openUrl:(t)=>w({channel:S,v:x,type:"open-url",id:f(c),payload:{url:t}}),openCommit:(t)=>it(t)?w({channel:S,v:x,type:"open-commit",id:f(c),payload:{sha:t}}):Promise.reject(new u("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>w({channel:S,v:x,type:"open-surface",id:f(c),payload:{surfaceId:t}}),writeClipboard:(t)=>w({channel:S,v:x,type:"clipboard-write",id:f(c),payload:{text:t}}),compose:(t)=>w({channel:S,v:x,type:"compose",id:f(c),payload:t}),attach:(t)=>w({channel:S,v:x,type:"attach",id:f(c),payload:me(t)}),startSession:async(t)=>{if(t.projectId!==void 0)j(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")j(r.directory);else{if(r.name!==void 0)j(r.name,200);if(r.baseBranch!==void 0)j(r.baseBranch,200)}let d=await M({channel:S,v:x,type:"start-session",id:f(c),payload:lt(t)},e.requestTimeoutMs??180000);if(!nt(d))throw new u("HOST_REJECTED","Host did not return a session.");return d},prompt:(t)=>M({channel:S,v:x,type:"prompt",id:f(c),payload:pt(t)}).then((r)=>{if(!st(r))throw new u("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>w({channel:S,v:x,type:"session-link",id:f(c),payload:me(t)}),close:()=>w({channel:S,v:x,type:"close",id:f(c)}),oauthStart:()=>w({channel:S,v:x,type:"oauth-start",id:f(c)}),oauthDisconnect:()=>w({channel:S,v:x,type:"oauth-disconnect",id:f(c)}),request:(t)=>(Ge(t.path)?M({channel:S,v:x,type:"request",id:f(c),payload:t}):Co()).then((r)=>{if(!Ne(r))throw new u("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Ge(t.path)?M({channel:S,v:x,type:"service-request",id:f(c),payload:t}):Co()).then((r)=>{if(!Ne(r))throw new u("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>M({channel:S,v:x,type:"service-status",id:f(c)}).then((t)=>{if(!ft(t))throw new u("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(fe(t)?M({channel:S,v:x,type:"file-read",id:f(c),payload:{path:t}}):Pe()).then((r)=>{if(!Et(r))throw new u("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!fe(t))return Pe();if(r.length>Ie)return Promise.reject(new u("FILE_TOO_LARGE",`Content is over ${Ie} characters.`));return M({channel:S,v:x,type:"file-write",id:f(c),payload:{path:t,content:r}}).then((d)=>{if(!ht(d))throw new u("HOST_REJECTED","Host did not confirm the write.");return d})},listDir:(t)=>(fe(t)?M({channel:S,v:x,type:"file-list",id:f(c),payload:{path:t}}):Pe()).then((r)=>{if(!_t(r))throw new u("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(fe(t)?M({channel:S,v:x,type:"file-stat",id:f(c),payload:{path:t}}):Pe()).then((r)=>{if(!St(r))throw new u("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),d=t.system?.trim();if(r.length===0||r.length>Le)return Promise.reject(new u("HOST_REJECTED",`Prompt must be 1 to ${Le} characters.`));if(d!==void 0&&(d.length===0||d.length>Me))return Promise.reject(new u("HOST_REJECTED",`System prompt must be 1 to ${Me} characters.`));let p=t.maxOutputTokens===void 0?void 0:Math.min(ct,Math.max(1,Math.floor(t.maxOutputTokens)));if(p!==void 0&&!Number.isFinite(p))return Promise.reject(new u("HOST_REJECTED","maxOutputTokens must be a number."));let b={prompt:r};if(d!==void 0)b.system=d;if(p!==void 0)b.maxOutputTokens=p;return M({channel:S,v:x,type:"generate",id:f(c),payload:b},e.requestTimeoutMs??dt).then((T)=>{if(!xt(T))throw new u("HOST_REJECTED","Host did not return generated text.");return T})},setBadge:(t)=>w({channel:S,v:x,type:"badge",id:f(c),payload:{count:ut(t)}}),setHeight:(t)=>w({channel:S,v:x,type:"resize",id:f(c),payload:{height:mt(t)}}),onFileOpen:(t)=>{if(X.add(t),!pe)pe=!0,o.addEventListener("keydown",jt,!0);if(oe)t(oe);return()=>{X.delete(t)}},onFileSnapshot:(t)=>(z=t,()=>{if(z===t)z=null}),onFileSaved:(t)=>(Z.add(t),()=>{Z.delete(t)}),reportFileChange:(t)=>Ke({...O,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:zt,reportFileUnsupported:()=>Ke({...O,type:"file-unsupported"}),dispose:()=>{for(let t of ae.keys())B({...O,type:"workspace-unsubscribe",id:f(c),payload:{subscriptionId:t}});ae.clear();for(let t of k.keys())B({...O,type:"shells-unsubscribe",id:f(c),payload:{subscriptionId:t}});if(k.clear(),A=!0,I=null,Q=null,z=null,X.clear(),Z.clear(),pe)o.removeEventListener("keydown",jt,!0);o.removeEventListener("message",Vt),o.removeEventListener("keydown",Kt,!0),o.removeEventListener("pointerover",ye),o.removeEventListener("pointermove",ye),o.removeEventListener("pointerout",Wt),o.removeEventListener("focus",Jt),o.removeEventListener("blur",Yt);for(let t of q.values())clearTimeout(t.timer),t.reject(new u("HOST_UNAVAILABLE","Host client was disposed."));q.clear(),a.clear(),_.clear(),m.clear(),h.clear(),E.clear(),g.clear(),D.clear(),Y.clear(),K.clear()}}};var Uo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var En=new Set(Uo);var Io=["none","agent","user"];var _n=new Set(Io);var Ar=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],vr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Lo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,i]of Ar)o.style.setProperty(n,e.tokens[i]);for(let[n,i,a]of vr){let _=e.tokens[a]??"";o.style.setProperty(n,_),o.style.setProperty(i,_)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},bt=(e,o)=>{if(Lo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var kr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},y=(e,o)=>`var(--${e}, var(--oc-${kr[e]}, ${o}))`,de=y("surface-background","transparent"),De=y("surface-elevated","transparent"),xe=y("surface-elevated-foreground","inherit"),re=y("surface-foreground","inherit"),v=y("surface-muted-foreground","gray"),wr=y("surface-muted","transparent"),V=y("interactive-border","currentColor"),H=y("interactive-hover","transparent"),le=y("interactive-active","transparent"),yt=y("interactive-selection","transparent"),At=y("interactive-selection-foreground","inherit"),No=y("interactive-focus-ring","currentColor"),ee=y("primary","currentColor"),vt=y("primary-text","inherit"),kt=y("error-text","inherit"),Or=y("font-sans","inherit"),wt=y("font-mono","monospace"),Po=y("radius","9px"),Ot=`calc(${Po} - 2px)`,Mo=`calc(${Po} - 4px)`,U=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Go=`box-shadow: 0 0 0 2px ${No};`,He=(e)=>{let o=y(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${y(`${e}-text`,"inherit")}; }`},Rr=`
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
`,$o=`
.oc-sdk { color: ${re}; font-family: ${Or}; }
.oc-sdk :focus-visible { outline: none; ${Go} }
.oc-sdk-mono { font-family: ${wt}; }
.oc-sdk-muted { color: ${v}; }
${He("success")}${He("warning")}${He("error")}${He("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ee}; --oc-sdk-tone-text: ${vt}; }

.oc-sdk-btn { border-radius: ${Ot}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Mo}; }
.oc-sdk-btn[data-variant="default"] { color: ${vt}; background: ${U(ee,10,de)}; border-color: ${U(ee,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${U(ee,16,de)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${U(ee,22,de)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${wr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-btn[data-variant="outline"] { background: ${De}; color: ${xe}; border-color: ${V}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${le}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${y("status-error","red")}; color: ${kt}; background: ${U("var(--oc-sdk-tone)",7,de)}; border-color: ${U("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${U("var(--oc-sdk-tone)",9,de)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${U("var(--oc-sdk-tone)",11,de)}; }

.oc-sdk-field-note { color: ${v}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${kt}; }
.oc-sdk-input { border-radius: ${Ot}; background: ${De}; color: ${xe}; box-shadow: inset 0 0 0 1px ${U(V,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${v}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${No}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${y("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${y("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${wt}; }

.oc-sdk-search-icon { color: ${v}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ee}; }
.oc-sdk-search-clear { border-radius: ${Mo}; color: ${v}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${re}; }

.oc-sdk-trigger { border-color: ${V}; border-radius: ${Ot}; background: ${De}; color: ${xe}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${v}; }
.oc-sdk-trigger-chevron { color: ${v}; }
.oc-sdk-popup { --surface-foreground: ${xe}; border-color: ${U(V,60)}; border-radius: 12px; background: ${De}; color: ${xe}; box-shadow: 0 8px 24px ${U(re,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${yt}; color: ${At}; }
.oc-sdk-option-check { color: ${re}; }
.oc-sdk-option[data-destructive="true"] { color: ${kt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${U(y("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${v}; }
.oc-sdk-popup-empty { color: ${v}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${V}; border-radius: 4px; color: ${re}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${U(re,60,V)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${V}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${de}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ee}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Go} }
.oc-sdk-check-desc { color: ${v}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${U(re,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${v}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${re}; }
.oc-sdk-tab[aria-selected="true"] { color: ${At}; background: ${yt}; border-color: ${V}; }
.oc-sdk-tab-count { color: ${v}; }

.oc-sdk-badge { border-radius: 9999px; background: ${H}; color: ${v}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${U("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${yt}; color: ${At}; }
.oc-sdk-row-lead { font-family: ${wt}; color: ${v}; }
.oc-sdk-row-sub { color: ${v}; }
.oc-sdk-row-meta { color: ${v}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${v}; }

.oc-sdk-empty-body { color: ${v}; }

.oc-sdk-spinner { color: ${v}; }
.oc-sdk-spinner-ring { border-color: ${V}; border-top-color: ${ee}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${U("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${U("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${v}; }

.oc-sdk-separator { color: ${v}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${U(V,40)}; }

.oc-sdk-progress-label { color: ${v}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${V}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ee}); }

.oc-sdk-text a { color: ${vt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${U(V,60)}; }
`,G=`
${Ye}
${Rr}
${$o}`;var Mr=0,ne=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[i,a]of Object.entries(o))n.setAttribute(i,String(a));return n},Ut=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,i=ne("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),a=`fill-${++Mr}`,_=ne("defs",{}),m=ne("linearGradient",{id:a,x1:0,x2:0,y1:0,y2:1});m.append(ne("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),ne("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),_.append(m);let h=ne("path",{d:"",class:"chart-grid"}),E=ne("path",{d:"",fill:`url(#${a})`}),g=ne("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});i.append(_,h,E,g);let D=document.createElement("div");D.className="chart-cursor";let Y=document.createElement("div");Y.className="chart-dot",Y.style.background=e.color;let K=document.createElement("div");K.className="chart-tip",o.append(i,D,Y,K);let I=[],Q=1,X=null,Z=null,z=(k,A)=>(e.capacity-A+k)/Math.max(1,e.capacity-1)*300,oe=(k)=>n-1-Math.min(k,Q)/Q*(n-1-2),pe=()=>{let k=X===null?void 0:I[X];if(X===null||k===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let A=o.getBoundingClientRect(),c=z(X,I.length)/300*A.width,l=oe(k)/n*A.height;D.style.transform=`translateX(${c}px)`,Y.style.transform=`translate(${c}px, ${l}px)`;let L=(I.length-1-X)*e.intervalSeconds;K.textContent=`${e.format(k)} · ${L===0?"now":`${L} s ago`}`;let W=c>A.width/2;K.style.left=W?"":`${c+8}px`,K.style.right=W?`${A.width-c+8}px`:""},q=(k)=>{if(I.length===0)return;let A=o.getBoundingClientRect(),c=(k-A.left)/A.width*(e.capacity-1),l=Math.round(c-(e.capacity-I.length));X=Math.min(I.length-1,Math.max(0,l)),pe()};return o.addEventListener("pointermove",(k)=>{Z=k.clientX,q(k.clientX)}),o.addEventListener("pointerleave",()=>{Z=null,X=null,pe()}),{element:o,update:(k,A)=>{if(I=k,Q=A>0?A:1,h.setAttribute("d",[0.25,0.5,0.75].map((c)=>`M0 ${n*c} H300`).join(" ")),I.length===0)E.setAttribute("d",""),g.setAttribute("d","");else{let c=I.map((ce,ge)=>`${z(ge,I.length).toFixed(2)} ${oe(ce).toFixed(2)}`),l=I.length===1,L=l?`M${z(0,1)-2} ${c[0]?.split(" ")[1]} L${c[0]}`:`M${c.join(" L")}`;g.setAttribute("d",L);let W=l?z(0,1)-2:z(0,I.length);E.setAttribute("d",`${L} L300 ${n} L${W.toFixed(2)} ${n} Z`)}if(Z!==null)q(Z)}}};var Lt=2000,Do={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},ze=(e)=>typeof e==="object"&&e!==null,Gr=(e)=>ze(e)&&typeof e.at==="number"&&ze(e.system)&&ze(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&ze(e.history),Nr=(e)=>{if(!(e instanceof u))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},It=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Ho=(e,o,n,i)=>{let a=!1,_=async()=>{if(a||!It(o))return;a=!0;try{let E=await e.serviceRequest({method:"GET",path:"/snapshot"}),g;try{g=JSON.parse(E.body)}catch{g=null}if(E.status===200&&Gr(g))n(g);else i(E.status===200?"bad-answer":"service-failed")}catch(E){i(Nr(E))}finally{a=!1}};_(),setInterval(()=>{_()},Lt);let m=It(o),h=()=>{let E=It(o);if(E&&!m)_();m=E};document.addEventListener("visibilitychange",h),new ResizeObserver(h).observe(document.documentElement)};var Fo="en",Xo=(e)=>{Fo=e||"en"},Bo=(e,o)=>new Intl.NumberFormat(Fo,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),F=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),i=0;while(n>=1024&&i<o.length-1)n/=1024,i+=1;let a=i>=3&&n<100?1:0;return`${Bo(n,a)} ${o[i]}`},J=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Bo(e,e<10?1:0)}%`},Vo=(e)=>{let o=Math.floor(e/86400),n=Math.floor(e%86400/3600),i=Math.floor(e%3600/60);if(o>0)return`${o} d ${n} h`;if(n>0)return`${n} h ${i} min`;return`${i} min`},Mt=(e,o)=>{let n=o.replace(/^"([^"]+)"/,"$1");if(!e||!/^([A-Za-z]:)?[\\/]/.test(n))return o;let i=-1;while((i=n.indexOf(e,i+1))>=0){if(!/[\\/]/.test(n[i-1]??""))continue;let a=n.slice(i+e.length).replace(/^\.exe/i,"");if(a===""||a.startsWith(" "))return a.trim()}return o},zo=(e)=>{if(e==="darwin")return"macOS";if(e==="win32")return"Windows";if(e==="linux")return"Linux";return e},je={app:"OpenChamber",opencode:"OpenCode",terminals:"Terminal"},jo={app:"OpenChamber",opencode:"Agent",terminals:"Terminal"},se={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var s=(e,o="",n="",i=[])=>{let a=document.createElement(e);if(o)a.className=o;if(n)a.textContent=n;if(i.length>0)a.append(...i);return a};var Ko=`
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
`,Wo=`
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
  .cores { display: flex; align-items: flex-end; gap: 2px; height: 18px; }
  .core { flex: 1; min-width: 2px; height: 100%; border-radius: 2px; background: var(--oc-muted-surface, var(--oc-hover)); position: relative; overflow: hidden; }
  .core > span { position: absolute; left: 0; right: 0; bottom: 0; border-radius: 2px; transition: height .4s ease; }
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
  details.group { border: 1px solid var(--oc-border); border-radius: var(--oc-radius); overflow: hidden; }
  details.group + details.group { margin-top: 6px; }
  details.group > summary { list-style: none; display: grid; grid-template-columns: 12px 8px minmax(0, 1fr) auto auto; align-items: center;
    gap: 8px; padding: 8px 12px; cursor: pointer; user-select: none; }
  details.group > summary::-webkit-details-marker { display: none; }
  details.group > summary:focus-visible { outline: 2px solid var(--oc-focus); outline-offset: -2px; }
  .chevron { width: 12px; height: 12px; color: var(--oc-muted); transition: transform .15s ease; }
  details.group[open] .chevron { transform: rotate(90deg); }
  .swatch { width: 8px; height: 8px; border-radius: 2px; }
  summary .name { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  summary .count { color: var(--oc-muted); font-weight: 400; margin-left: 4px; }
  .rows { border-top: 1px solid var(--oc-border); padding: 4px 0; }
  .proc { display: grid; grid-template-columns: minmax(0, 1fr) 52px 64px; align-items: center; gap: 8px; padding: 3px 12px; }
  .proc .who { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .proc .pname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: none; max-width: 70%; }
  .proc .pcmd { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 11px var(--oc-mono); min-width: 0; }
  .proc .tick { flex: none; width: 8px; height: 1px; background: var(--oc-border); }
  .proc .cell { text-align: right; white-space: nowrap; }
  .proc .mem { position: relative; }
  .proc .mem i { position: absolute; right: 0; bottom: -3px; height: 2px; border-radius: 1px; opacity: .55; }
  .more { color: var(--oc-muted); padding: 4px 12px; }
  .head-cells { display: grid; grid-template-columns: minmax(0, 1fr) 52px 64px; gap: 8px; padding: 0 12px; color: var(--oc-muted); font-size: 11px; }
  .head-cells span { text-align: right; }
  .banner { padding: 8px 12px; border-radius: var(--oc-radius); border: 1px solid color-mix(in srgb, var(--oc-warning) 40%, transparent);
    background: color-mix(in srgb, var(--oc-warning) 10%, transparent); color: var(--oc-warning-text, var(--oc-fg)); }
  .banner.error { border-color: color-mix(in srgb, var(--oc-error) 40%, transparent); background: color-mix(in srgb, var(--oc-error) 10%, transparent);
    color: var(--oc-error-text, var(--oc-fg)); }
  .footnote { color: var(--oc-muted); font-size: 11px; padding: 0 2px; }
  [hidden] { display: none !important; }
`;var Gt=90;var Jo=gt(),Dt=document.querySelector("#root");if(!Dt)throw Error("Missing #root");var qo=document.createElement("style");qo.textContent=Ko+Wo;document.head.append(qo);var Ht=Lt/1000,ie=s("div","banner");ie.hidden=!0;var er=s("div","host-name","This machine"),tr=s("div","host-meta","Reading…"),Te=s("div","live stale","Starting"),or=s("div","head");or.append(s("div","titles","",[er,tr]),Te);var rr=(e,o,n)=>{let i=s("span","big num","–"),a=s("span","sub num"),_=s("div","card-top","",[s("span","label",e),s("span","grow"),a]),m=Ut({color:o,height:56,capacity:Gt,format:n,intervalSeconds:Ht}),h=s("div","sub num");return{card:s("div","card","",[_,i,m.element,h]),value:i,side:a,sub:h,chart:m}},he=rr("CPU",se.cpu,J),nr=s("div","cores");he.card.append(nr);var _e=rr("Memory",se.memory,F),sr=s("div","stack");_e.card.append(sr);var Pr=s("div","grid","",[he.card,_e.card]),ir=s("span","big num","–"),ar=s("span","sub num"),cr=Ut({color:se.app,height:44,capacity:Gt,format:F,intervalSeconds:Ht}),dr=s("div","stack"),lr=s("div","legend"),$r=s("div","card","",[s("div","card-top","",[s("span","label","OpenChamber"),s("span","grow"),ar]),ir,s("div","sub","The app, OpenCode, and everything they started"),cr.element,dr,lr]),pr=s("span","sub num"),$t=s("div","servers"),ur=s("div","empty","No dev servers right now. Servers started by an agent or in the terminal show up here with their ports."),Dr=s("div","section","",[s("div","section-head","",[s("span","label","Dev servers"),pr]),$t,ur]),mr=s("div"),Hr=s("div","section","",[s("div","section-head","",[s("span","label","Processes"),s("span","grow")]),s("div","head-cells","",[s("b"),s("span","","CPU"),s("span","","Memory")]),mr]),fr=s("div"),Ft=s("div","section","",[s("div","section-head","",[s("span","label","OpenCode outside OpenChamber")]),fr]);Ft.hidden=!0;var Fr=s("div","footnote","CPU is a share of the whole machine, so rows add up. Memory is resident memory: pages a process shares with others count in each of them.");Dt.append(ie,or,Pr,$r,Dr,Hr,Ft,Fr);var Nt=new Set(["app","opencode","terminals"]),Xr=()=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("class","chevron"),e.setAttribute("aria-hidden","true");let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d","M6 4l4 4-4 4"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.6"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),e.append(o),e},Pt=(e)=>se[e],Br=(e,o,n)=>{let i=s("div","who");if(i.style.paddingInlineStart=`${e.depth*14}px`,e.depth>0)i.append(s("span","tick"));i.append(s("span","pname",e.name));for(let E of e.ports)i.append(s("span","port",`:${E}`));let a=Mt(e.name,e.command);if(a)i.append(s("span","pcmd",a));let _=s("i");_.style.width=`${Math.max(2,e.memory/Math.max(1,o)*100)}%`,_.style.background=n;let m=s("span","cell mem num",F(e.memory),[_]),h=s("div","proc","",[i,s("span","cell num",J(e.cpu)),m]);return h.title=`${e.name} · pid ${e.pid}${e.command?`
${e.command}`:""}`,h},Yo=(e,o,n)=>{let i=document.createElement("details");i.className="group",i.open=Nt.has(e.id),i.addEventListener("toggle",()=>{if(i.open)Nt.add(e.id);else Nt.delete(e.id)});let a=s("span","swatch");a.style.background=n;let _=e.processes.length+e.hidden,m=s("span","name",o,[s("span","count",`${_}`)]),h=document.createElement("summary");h.append(Xr(),a,m,s("span","num muted",J(e.cpu)),s("span","num",F(e.memory)));let E=Math.max(0,...e.processes.map((D)=>D.memory)),g=s("div","rows","",e.processes.map((D)=>Br(D,E,n)));if(e.hidden>0)g.append(s("div","more",`${e.hidden} more, smaller processes not shown`));return i.append(h,g),i},Vr=(e)=>{let o=s("div","title","",[...e.ports.map((_)=>s("span","port",`:${_}`)),s("b","",e.name),s("span","origin",jo[e.group])]),n=s("div","stats num",`${J(e.cpu)} · ${F(e.memory)}`),i=s("div","server","",[o,n]),a=Mt(e.executable,e.command);if(a)i.append(s("div","command",a));return i.title=`pid ${e.pid}${e.command?`
${e.command}`:""}`,i},Qo=(e,o,n)=>{e.replaceChildren(...o.filter((i)=>i.value>0).map((i)=>{let a=s("span");return a.style.width=`${Math.min(100,i.value/Math.max(1,n)*100)}%`,a.style.background=i.color,a.title=i.label,a}))},zr={"processes-unavailable":"The process list could not be read just now. OpenChamber's numbers are from the last reading that worked.","ports-unavailable":"Listening ports could not be read, so dev servers are not detected."},Xt=null,jr=(e)=>{let{system:o,app:n}=e;er.textContent=o.hostname,tr.textContent=[zo(o.platform),o.arch,o.cpuModel,`up ${Vo(o.uptimeSeconds)}`].filter(Boolean).join(" · "),Te.textContent=`Live · every ${Ht} s`,Te.classList.remove("stale"),he.value.textContent=J(o.cpu),he.side.textContent=`${o.cores} cores`,he.sub.textContent=o.load?`Load ${o.load.map((m)=>m.toFixed(2)).join(" · ")}`:"All cores together",he.chart.update(e.history.system.cpu,100),nr.replaceChildren(...o.perCore.map((m)=>{let h=s("span");h.style.height=`${Math.max(4,m)}%`,h.style.background=se.cpu;let E=s("div","core","",[h]);return E.title=J(m),E})),_e.value.textContent=F(o.memoryUsed),_e.side.textContent=J(o.memoryUsed/Math.max(1,o.memoryTotal)*100),_e.sub.textContent=`of ${F(o.memoryTotal)} · ${F(Math.max(0,o.memoryTotal-o.memoryUsed))} free`,_e.chart.update(e.history.system.memory,o.memoryTotal);let i=Math.min(n.memory,o.memoryUsed);Qo(sr,[{value:i,color:se.app,label:`OpenChamber ${F(n.memory)}`},{value:o.memoryUsed-i,color:se.memory,label:`Everything else ${F(o.memoryUsed-i)}`}],o.memoryTotal),ir.textContent=F(n.memory),ar.textContent=`${J(n.cpu)} CPU`;let a=Math.max(n.memory,...e.history.app.memory);if(cr.update(e.history.app.memory,a*1.15),Qo(dr,n.groups.map((m)=>({value:m.memory,color:Pt(m.id),label:je[m.id]})),n.memory),lr.replaceChildren(...n.groups.map((m)=>{let h=s("span","swatch");h.style.background=Pt(m.id);let E=m.processes.length+m.hidden;return s("div","legend-row","",[h,s("span","name",`${je[m.id]}`,[s("span","muted",` · ${E} ${E===1?"process":"processes"}`)]),s("span","value num muted",J(m.cpu)),s("span","value num",F(m.memory))])})),pr.textContent=e.servers.length>0?String(e.servers.length):"",$t.replaceChildren(...e.servers.map(Vr)),$t.hidden=e.servers.length===0,ur.hidden=e.servers.length>0,mr.replaceChildren(...n.groups.map((m)=>Yo(m,je[m.id],Pt(m.id)))),Ft.hidden=e.outside.length===0,e.outside.length>0){let m=e.outside.reduce((E,g)=>E+(g.cpu??0),0),h=e.outside.reduce((E,g)=>E+g.memory,0);fr.replaceChildren(Yo({id:"outside",cpu:m,memory:h,processes:e.outside,hidden:0},"OpenCode","var(--oc-muted)"))}let _=e.warnings.map((m)=>zr[m]);ie.hidden=_.length===0&&Xt===null,ie.classList.toggle("error",!1),ie.textContent=_.join(" ")},Kr=(e)=>{Xt=e,ie.hidden=!1,ie.classList.add("error"),ie.textContent=Do[e],Te.textContent="Paused",Te.classList.add("stale")},Zo=!1;Jo.onReady((e)=>{if(bt(e,document.documentElement),Xo(e.locale),Zo)return;Zo=!0,Ho(Jo,Dt,(o)=>{Xt=null,jr(o)},Kr)});})();
