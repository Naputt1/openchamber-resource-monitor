(()=>{var _="openchamber.sdk",S=1;var nt=`
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
`;function ao(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let i=s.target===e?o:s.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let c=n.get(i);if(c!==void 0)clearTimeout(c);n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Or=`(${ao.toString()})(document);`;var st=128,it=65536;var we=128;var Oe=65536;var uo=/^[a-z][a-z0-9-]{0,39}$/;var co=(e)=>Object(e)===e&&!Array.isArray(e),at=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),lo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,po=(e)=>String(e)===e&&e.length>=1&&e.length<=80,mo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!co(n)||!uo.test(n.id)||!lo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!at(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!at(n,["kind","id","label","value","options","disabled"]))return!1;if(!po(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!co(i)||!at(i,["value","label"])||!po(i.value)||!lo(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var Re=20000000,Ce=256;var ct=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,fo=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var Eo=/^[A-Za-z0-9_-]{1,80}$/;var ho=["left","right","top","bottom"];var _o=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!_o(i,o+1,n))return!1;return!0},dt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(dt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(dt)}return String(e)===e||Number.isFinite(e)},lt=(e)=>{try{if(String(e.id)!==e.id||!Eo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ho.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!_o(e.data)||!dt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var xo=["file","directory","other","missing"],ut=(e)=>Boolean(e&&"sessionId"in e),mt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var To=/^[0-9a-f]{7,64}$/i,ft=(e)=>To.test(e),Ue=500,Ie=32000,bo=16000,go=128,yo=200,Ao=2000,vo=16000,ko=80,wo=200,Oo=16000;var Ro=2000;var Et=20000,Le=1024,Me=2000000;var Ge=64000,Pe=8000,ht=4000;var _t=90000;var Co=999,Uo=1e4,he=500,Io=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Lo=["stopped","starting","ready","failed"],Rr=new Set(Io),Mo=(e)=>Rr.has(e),Go=(e)=>e&&Mo(e)?e:"HOST_REJECTED",pe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(pe);if(Object(e)===e)return Object.values(e).every(pe);return!1},Po=(e)=>pe(e)&&JSON.stringify(e).length<=Oo,So=(e)=>e?.trim().slice(0,wo)??"",ue=(e)=>{let o=e.id.trim().slice(0,go),n=e.title.trim().slice(0,yo),s=e.url.trim().slice(0,Ao),i=e.text?.trim().slice(0,vo),c=e.author?.trim().slice(0,ko),E=e.kind==="pull"?"pull":"issue",x={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:E};if(i)x.text=i;if(c)x.author=c;if(E==="pull"){let h=So(e.branches?.head),T=So(e.branches?.base);if(h&&T)x.branches={head:h,base:T}}if(Po(e.data))x.data=e.data;return x},St=(e)=>{let o=ue(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},xt=(e)=>{let o={text:e.text.trim().slice(0,bo)};if(e.send)o.send=!0;return o},Tt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Co,Math.max(0,Math.round(e)))},bt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Uo,Math.max(0,Math.ceil(e)))};var me=(e)=>e.length>0&&e.length<=Le&&!e.includes("\x00")&&!e.includes("\\");var Ne=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ro)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Cr=new Set(Lo),gt=(e)=>Boolean(e&&"status"in e&&Cr.has(String(e.status))&&!("body"in e)),De=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),yt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),At=(e)=>Boolean(e&&"written"in e&&e.written===!0),vt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Ur=new Set(xo),kt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Ur.has(String(e.kind))&&Number.isFinite(e.size)),wt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Ir=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),Lr=(e)=>Object(e)===e?e:null,pt=(e)=>String(e)===e&&e.length>0,Mr=(e)=>{if(!pt(e.id))return null;if(e.ok===!0){let o={channel:_,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&pt(e.error))return{channel:_,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:Go(pt(e.code)?e.code:void 0)};return null},Ot=(e)=>{let o=Lr(e);if(!o||o.channel!==_||o.v!==S)return null;if(o.type==="result")return Mr(o);if(!Ir.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var No=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Gr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class m extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Do=()=>Promise.reject(new m("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),$e=()=>Promise.reject(new m("BAD_PATH",`File path must be 1 to ${Le} characters without NUL or backslash.`)),He=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new m("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},f=(e)=>(e.value+=1,`oc-${e.value}`),Rt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new m("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),s=e.requestTimeoutMs??Et,i=new Set,c=new Set,E=new Set,x=new Set,h=new Set,T=new Set,B=new Set,W=new Set,j=new Set,I=null,J=null,H=new Set,Y=new Set,V=null,te=null,le=!1,Q=new Map,ne=new Map,k=new Map,A=!1,d={value:0},p=null,L=null,K=!1,se=!1,ye=null,Qt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},F=(t)=>{o.parent.postMessage(t,"*")},C=(t,r)=>{for(let l of t)try{l(r)}catch(u){console.error(u)}},Zt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Ot(t.data);if(!r)return;if(r.type==="workspace"){let u=ne.get(r.payload.subscriptionId);if(u)C([u],r.payload.snapshot);return}if(r.type==="shells"){let u=k.get(r.payload.subscriptionId);if(u)C([u],r.payload.snapshot);return}if(r.type==="ready"){if(p=r.payload,L=Qt(r.payload.session),C(i,r.payload),C(c,r.payload.directory),C(E,r.payload.session),L)C(x,L);C(h,r.payload.connection),C(T,r.payload.settings),C(B,r.payload.item);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};C(c,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)L=null;else if(L?.sessionId!==r.payload.session.id)L=Qt(r.payload.session);C(E,r.payload.session);return}if(r.type==="session-lifecycle"){L=r.payload,C(x,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};C(h,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};C(T,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};C(B,r.payload.item);return}if(r.type==="status-control-event"){C(W,r.payload);return}if(r.type==="popover-closed"){C(j,r.payload);return}if(r.type==="action"){let u=(b)=>{if(!A)F({channel:_,v:S,type:"action-result",id:r.id,payload:b})},g=J;if(!g){u({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>g(r.payload)).then(()=>u({ok:!0}),(b)=>{let R=(b instanceof Error?b.message:String(b)).trim();u({ok:!1,error:(R||"Action failed.").slice(0,he)})});return}if(r.type==="file-open"){let u=r.payload;if(te&&fo(te,u))return;te=u,C(H,r.payload);return}if(r.type==="file-saved"){C(Y,r.payload.version);return}if(r.type==="file-snapshot"){let u=(R)=>{if(!A)F({channel:_,v:S,type:"file-snapshot-result",id:r.id,payload:R})},g=(R)=>u({error:(R.trim()||"Could not read the edited file.").slice(0,he)}),b=V;if(!b){g("This extension does not edit files.");return}Promise.resolve().then(()=>b(r.payload.purpose)).then((R)=>{if(ct(R)>Re){g(`The file is over ${Re} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>Ce){g(`The snapshot version is over ${Ce} characters.`);return}u({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>g(R instanceof Error?R.message:String(R)));return}if(r.type==="resolve"){let u=(b)=>{F({channel:_,v:S,type:"resolve-result",id:r.id,payload:b})},g=I;if(!g){u({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>g(r.payload)).then((b)=>u({item:b?ue(b):null}),(b)=>{let R=(b instanceof Error?b.message:String(b)).trim();u({error:(R||"Command failed.").slice(0,he)})});return}let l=Q.get(r.id);if(!l)return;if(clearTimeout(l.timer),Q.delete(r.id),r.ok){l.resolve(r.payload);return}l.reject(new m(r.code,r.error))};o.addEventListener("message",Zt),F({channel:_,v:S,type:"hello"});let M=(t,r=s)=>{if(A||o.parent===o)return Promise.reject(new m("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((l,u)=>{let g=setTimeout(()=>{Q.delete(t.id),u(new m("HOST_TIMEOUT","Host did not answer in time."))},r);Q.set(t.id,{resolve:l,reject:u,timer:g}),F(t)})},w=(t)=>M(t).then(()=>{return}),O={channel:_,v:S},tt=(t)=>{if(!A&&o.parent!==o)F(t)},qt=()=>tt({...O,type:"file-save"}),eo=(t)=>{if(!No(t)||!Gr(t))return;t.preventDefault(),qt()},to=(t)=>{if(!No(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),so(p.popover.id,"escape").catch(()=>{return})},Ae=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let r=K||se;if(ye===r)return;ye=r,io(t.id,r).catch(()=>{return})},ve=()=>{if(p?.surface!=="popover"||K)return;K=!0,Ae()},oo=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!K)return;K=!1,Ae()},ro=()=>{if(p?.surface!=="popover"||se)return;se=!0,Ae()},no=()=>{if(p?.surface!=="popover"||!se)return;se=!1,Ae()},z=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new m("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},ot=async(t)=>{if(t.kind!=="projects")z(t.projectId);let r=await M({...O,type:"workspace-read",id:f(d),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new m("HOST_REJECTED","Host did not return workspace data.");return r},rt=async(t,r)=>{if(t.kind!=="projects")z(t.projectId);let l=f(d);ne.set(l,r);try{await w({...O,type:"workspace-subscribe",id:f(d),payload:{subscriptionId:l,query:t}})}catch(u){if(ne.delete(l),!A)F({...O,type:"workspace-unsubscribe",id:f(d),payload:{subscriptionId:l}});throw u}return()=>{if(!ne.delete(l)||A)return;F({...O,type:"workspace-unsubscribe",id:f(d),payload:{subscriptionId:l}})}},wr=async(t,r)=>{if(t.kind==="session")z(t.sessionId);if(t.kind==="project")z(t.projectId);let l=f(d);k.set(l,r);try{await w({...O,type:"shells-subscribe",id:f(d),payload:{subscriptionId:l,scope:t}})}catch(u){if(k.delete(l),!A)F({...O,type:"shells-unsubscribe",id:f(d),payload:{subscriptionId:l}});throw u}return()=>{if(!k.delete(l)||A)return;F({...O,type:"shells-unsubscribe",id:f(d),payload:{subscriptionId:l}})}},ke=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>st))throw new m("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!pe(t.value))throw new m("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>it)throw new m("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new m("UNSUPPORTED","This host does not support device storage.");let r=await M({...O,type:"storage",id:f(d),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new m("HOST_REJECTED","Host did not return storage data.");return r},so=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new m("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-close",id:f(d),payload:r?{id:t,reason:r}:{id:t}}),io=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new m("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-anchor",id:f(d),payload:{id:t,active:r}});return o.addEventListener("keydown",to,!0),o.addEventListener("pointerover",ve),o.addEventListener("pointermove",ve),o.addEventListener("pointerout",oo),o.addEventListener("focus",ro),o.addEventListener("blur",no),{onAction:(t)=>(J=t,()=>{if(J===t)J=null}),listProjects:async()=>{let t=await ot({kind:"projects"});if(t.kind!=="projects")throw new m("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await ot({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new m("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await ot({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new m("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>rt({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>rt({kind:"worktrees",projectId:t},(l)=>{if(l.kind==="worktrees")r(l)}),onSessions:(t,r)=>rt({kind:"sessions",projectId:t},(l)=>{if(l.kind==="sessions")r(l)}),onRunningShells:(t,r)=>wr(t,r),readShellOutput:async(t,r)=>{z(t,we);let l=r?.cursor;if(l!==void 0&&(!Number.isInteger(l)||l<0))throw new m("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let u=r?.tailBytes;if(u!==void 0&&(!Number.isInteger(u)||u<1||u>Oe))throw new m("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Oe}.`);let b=await M({...O,type:"shell-output",id:f(d),payload:{shellId:t,cursor:l,tailBytes:u}});if(!b||typeof b.output!=="string"||!Number.isFinite(b.cursor))throw new m("HOST_REJECTED","Host did not return shell output.");return b},stopShell:async(t)=>{if(z(t,we),(await M({...O,type:"shell-stop",id:f(d),payload:{shellId:t}}))?.stopped!==!0)throw new m("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{z(t),await w({...O,type:"open-session",id:f(d),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let l=He(r),u={op:"get",key:t};if(l)u.scope=l;let g=await ke(u);return g.op==="get"&&g.found?g.value:void 0},set:async(t,r,l)=>{let u=He(l),g={op:"set",key:t,value:r};if(u)g.scope=u;await ke(g)},delete:async(t,r)=>{let l=He(r),u={op:"delete",key:t};if(l)u.scope=l;await ke(u)},keys:async(t)=>{let r=He(t),l={op:"keys"};if(r)l.scope=r;let u=await ke(l);if(u.op!=="keys")throw new m("HOST_REJECTED","Expected storage keys.");return u.keys}},onReady:(t)=>{if(i.add(t),p)t(p);return()=>{i.delete(t)}},onDirectory:(t)=>{if(c.add(t),p)t(p.directory);return()=>{c.delete(t)}},onSession:(t)=>{if(E.add(t),p)t(p.session);return()=>{E.delete(t)}},onSessionLifecycle:(t)=>{if(x.add(t),L)t(L);return()=>{x.delete(t)}},onConnection:(t)=>{if(h.add(t),p)t(p.connection);return()=>{h.delete(t)}},onSettings:(t)=>{if(T.add(t),p)t(p.settings);return()=>{T.delete(t)}},onItem:(t)=>{if(B.add(t),p)t(p.item);return()=>{B.delete(t)}},onStatusControl:(t)=>(W.add(t),()=>{W.delete(t)}),onPopoverClosed:(t)=>(j.add(t),()=>{j.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new m("UNSUPPORTED","This host does not support status controls."));if(!mo(t))return Promise.reject(new m("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...O,type:"status-controls",id:f(d),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new m("UNSUPPORTED","This host does not support popovers."));if(!lt(t))return Promise.reject(new m("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...O,type:"popover-open",id:f(d),payload:t})},closePopover:so,setPopoverAnchorActive:io,onResolve:(t)=>(I=t,()=>{if(I===t)I=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Ue)return Promise.reject(new m("HOST_REJECTED",`Toast message must contain 1 to ${Ue} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ie))return Promise.reject(new m("HOST_REJECTED",`Toast copy text must contain 1 to ${Ie} characters.`));return w({channel:_,v:S,type:"toast",id:f(d),payload:{...t,message:r}})},openUrl:(t)=>w({channel:_,v:S,type:"open-url",id:f(d),payload:{url:t}}),openCommit:(t)=>ft(t)?w({channel:_,v:S,type:"open-commit",id:f(d),payload:{sha:t}}):Promise.reject(new m("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>w({channel:_,v:S,type:"open-surface",id:f(d),payload:{surfaceId:t}}),writeClipboard:(t)=>w({channel:_,v:S,type:"clipboard-write",id:f(d),payload:{text:t}}),compose:(t)=>w({channel:_,v:S,type:"compose",id:f(d),payload:t}),attach:(t)=>w({channel:_,v:S,type:"attach",id:f(d),payload:ue(t)}),startSession:async(t)=>{if(t.projectId!==void 0)z(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")z(r.directory);else{if(r.name!==void 0)z(r.name,200);if(r.baseBranch!==void 0)z(r.baseBranch,200)}let l=await M({channel:_,v:S,type:"start-session",id:f(d),payload:St(t)},e.requestTimeoutMs??180000);if(!ut(l))throw new m("HOST_REJECTED","Host did not return a session.");return l},prompt:(t)=>M({channel:_,v:S,type:"prompt",id:f(d),payload:xt(t)}).then((r)=>{if(!mt(r))throw new m("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>w({channel:_,v:S,type:"session-link",id:f(d),payload:ue(t)}),close:()=>w({channel:_,v:S,type:"close",id:f(d)}),oauthStart:()=>w({channel:_,v:S,type:"oauth-start",id:f(d)}),oauthDisconnect:()=>w({channel:_,v:S,type:"oauth-disconnect",id:f(d)}),request:(t)=>(Ne(t.path)?M({channel:_,v:S,type:"request",id:f(d),payload:t}):Do()).then((r)=>{if(!De(r))throw new m("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Ne(t.path)?M({channel:_,v:S,type:"service-request",id:f(d),payload:t}):Do()).then((r)=>{if(!De(r))throw new m("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>M({channel:_,v:S,type:"service-status",id:f(d)}).then((t)=>{if(!gt(t))throw new m("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(me(t)?M({channel:_,v:S,type:"file-read",id:f(d),payload:{path:t}}):$e()).then((r)=>{if(!yt(r))throw new m("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!me(t))return $e();if(r.length>Me)return Promise.reject(new m("FILE_TOO_LARGE",`Content is over ${Me} characters.`));return M({channel:_,v:S,type:"file-write",id:f(d),payload:{path:t,content:r}}).then((l)=>{if(!At(l))throw new m("HOST_REJECTED","Host did not confirm the write.");return l})},listDir:(t)=>(me(t)?M({channel:_,v:S,type:"file-list",id:f(d),payload:{path:t}}):$e()).then((r)=>{if(!vt(r))throw new m("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(me(t)?M({channel:_,v:S,type:"file-stat",id:f(d),payload:{path:t}}):$e()).then((r)=>{if(!kt(r))throw new m("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),l=t.system?.trim();if(r.length===0||r.length>Ge)return Promise.reject(new m("HOST_REJECTED",`Prompt must be 1 to ${Ge} characters.`));if(l!==void 0&&(l.length===0||l.length>Pe))return Promise.reject(new m("HOST_REJECTED",`System prompt must be 1 to ${Pe} characters.`));let u=t.maxOutputTokens===void 0?void 0:Math.min(ht,Math.max(1,Math.floor(t.maxOutputTokens)));if(u!==void 0&&!Number.isFinite(u))return Promise.reject(new m("HOST_REJECTED","maxOutputTokens must be a number."));let g={prompt:r};if(l!==void 0)g.system=l;if(u!==void 0)g.maxOutputTokens=u;return M({channel:_,v:S,type:"generate",id:f(d),payload:g},e.requestTimeoutMs??_t).then((b)=>{if(!wt(b))throw new m("HOST_REJECTED","Host did not return generated text.");return b})},setBadge:(t)=>w({channel:_,v:S,type:"badge",id:f(d),payload:{count:Tt(t)}}),setHeight:(t)=>w({channel:_,v:S,type:"resize",id:f(d),payload:{height:bt(t)}}),onFileOpen:(t)=>{if(H.add(t),!le)le=!0,o.addEventListener("keydown",eo,!0);if(te)t(te);return()=>{H.delete(t)}},onFileSnapshot:(t)=>(V=t,()=>{if(V===t)V=null}),onFileSaved:(t)=>(Y.add(t),()=>{Y.delete(t)}),reportFileChange:(t)=>tt({...O,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:qt,reportFileUnsupported:()=>tt({...O,type:"file-unsupported"}),dispose:()=>{for(let t of ne.keys())F({...O,type:"workspace-unsubscribe",id:f(d),payload:{subscriptionId:t}});ne.clear();for(let t of k.keys())F({...O,type:"shells-unsubscribe",id:f(d),payload:{subscriptionId:t}});if(k.clear(),A=!0,I=null,J=null,V=null,H.clear(),Y.clear(),le)o.removeEventListener("keydown",eo,!0);o.removeEventListener("message",Zt),o.removeEventListener("keydown",to,!0),o.removeEventListener("pointerover",ve),o.removeEventListener("pointermove",ve),o.removeEventListener("pointerout",oo),o.removeEventListener("focus",ro),o.removeEventListener("blur",no);for(let t of Q.values())clearTimeout(t.timer),t.reject(new m("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),i.clear(),c.clear(),E.clear(),x.clear(),h.clear(),T.clear(),B.clear(),W.clear(),j.clear()}}};var $o=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var Un=new Set($o);var Ho=["none","agent","user"];var Ln=new Set(Ho);var Pr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Nr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Fo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of Pr)o.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of Nr){let c=e.tokens[i]??"";o.style.setProperty(n,c),o.style.setProperty(s,c)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Ct=(e,o)=>{if(Fo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Dr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},y=(e,o)=>`var(--${e}, var(--oc-${Dr[e]}, ${o}))`,ie=y("surface-background","transparent"),Fe=y("surface-elevated","transparent"),_e=y("surface-elevated-foreground","inherit"),oe=y("surface-foreground","inherit"),v=y("surface-muted-foreground","gray"),$r=y("surface-muted","transparent"),X=y("interactive-border","currentColor"),D=y("interactive-hover","transparent"),ae=y("interactive-active","transparent"),Ut=y("interactive-selection","transparent"),It=y("interactive-selection-foreground","inherit"),Vo=y("interactive-focus-ring","currentColor"),Z=y("primary","currentColor"),Lt=y("primary-text","inherit"),Mt=y("error-text","inherit"),Hr=y("font-sans","inherit"),Gt=y("font-mono","monospace"),zo=y("radius","9px"),Pt=`calc(${zo} - 2px)`,Xo=`calc(${zo} - 4px)`,U=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Bo=`box-shadow: 0 0 0 2px ${Vo};`,Xe=(e)=>{let o=y(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${y(`${e}-text`,"inherit")}; }`},Fr=`
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
`,jo=`
.oc-sdk { color: ${oe}; font-family: ${Hr}; }
.oc-sdk :focus-visible { outline: none; ${Bo} }
.oc-sdk-mono { font-family: ${Gt}; }
.oc-sdk-muted { color: ${v}; }
${Xe("success")}${Xe("warning")}${Xe("error")}${Xe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Z}; --oc-sdk-tone-text: ${Lt}; }

.oc-sdk-btn { border-radius: ${Pt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Xo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Lt}; background: ${U(Z,10,ie)}; border-color: ${U(Z,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${U(Z,16,ie)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${U(Z,22,ie)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${$r}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Fe}; color: ${_e}; border-color: ${X}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${D}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ae}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${y("status-error","red")}; color: ${Mt}; background: ${U("var(--oc-sdk-tone)",7,ie)}; border-color: ${U("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${U("var(--oc-sdk-tone)",9,ie)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${U("var(--oc-sdk-tone)",11,ie)}; }

.oc-sdk-field-note { color: ${v}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Mt}; }
.oc-sdk-input { border-radius: ${Pt}; background: ${Fe}; color: ${_e}; box-shadow: inset 0 0 0 1px ${U(X,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${v}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Vo}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${y("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${y("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Gt}; }

.oc-sdk-search-icon { color: ${v}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search-clear { border-radius: ${Xo}; color: ${v}; }
.oc-sdk-search-clear:hover { background: ${D}; color: ${oe}; }

.oc-sdk-trigger { border-color: ${X}; border-radius: ${Pt}; background: ${Fe}; color: ${_e}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${v}; }
.oc-sdk-trigger-chevron { color: ${v}; }
.oc-sdk-popup { --surface-foreground: ${_e}; border-color: ${U(X,60)}; border-radius: 12px; background: ${Fe}; color: ${_e}; box-shadow: 0 8px 24px ${U(oe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${D}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ut}; color: ${It}; }
.oc-sdk-option-check { color: ${oe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Mt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${U(y("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${v}; }
.oc-sdk-popup-empty { color: ${v}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${X}; border-radius: 4px; color: ${oe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${U(oe,60,X)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${X}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ie}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Bo} }
.oc-sdk-check-desc { color: ${v}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${U(oe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${v}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${oe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${It}; background: ${Ut}; border-color: ${X}; }
.oc-sdk-tab-count { color: ${v}; }

.oc-sdk-badge { border-radius: 9999px; background: ${D}; color: ${v}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${U("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${D}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ut}; color: ${It}; }
.oc-sdk-row-lead { font-family: ${Gt}; color: ${v}; }
.oc-sdk-row-sub { color: ${v}; }
.oc-sdk-row-meta { color: ${v}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${v}; }

.oc-sdk-empty-body { color: ${v}; }

.oc-sdk-spinner { color: ${v}; }
.oc-sdk-spinner-ring { border-color: ${X}; border-top-color: ${Z}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${U("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${U("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${v}; }

.oc-sdk-separator { color: ${v}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${U(X,40)}; }

.oc-sdk-progress-label { color: ${v}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${X}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Z}); }

.oc-sdk-text a { color: ${Lt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${U(X,60)}; }
`,G=`
${nt}
${Fr}
${jo}`;var jr=0,re=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[s,i]of Object.entries(o))n.setAttribute(s,String(i));return n},$t=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,s=re("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),i=`fill-${++jr}`,c=re("defs",{}),E=re("linearGradient",{id:i,x1:0,x2:0,y1:0,y2:1});E.append(re("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),re("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),c.append(E);let x=re("path",{d:"",class:"chart-grid"}),h=re("path",{d:"",fill:`url(#${i})`}),T=re("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});s.append(c,x,h,T);let B=document.createElement("div");B.className="chart-cursor";let W=document.createElement("div");W.className="chart-dot",W.style.background=e.color;let j=document.createElement("div");j.className="chart-tip",o.append(s,B,W,j);let I=[],J=1,H=null,Y=null,V=(k,A)=>(e.capacity-A+k)/Math.max(1,e.capacity-1)*300,te=(k)=>n-1-Math.min(k,J)/J*(n-1-2),le=()=>{let k=H===null?void 0:I[H];if(H===null||k===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let A=o.getBoundingClientRect(),d=V(H,I.length)/300*A.width,p=te(k)/n*A.height;B.style.transform=`translateX(${d}px)`,W.style.transform=`translate(${d}px, ${p}px)`;let L=(I.length-1-H)*e.intervalSeconds;j.textContent=`${e.format(k)} · ${L===0?"now":`${L} s ago`}`;let K=d>A.width/2;j.style.left=K?"":`${d+8}px`,j.style.right=K?`${A.width-d+8}px`:""},Q=(k)=>{if(I.length===0)return;let A=o.getBoundingClientRect(),d=(k-A.left)/A.width*(e.capacity-1),p=Math.round(d-(e.capacity-I.length));H=Math.min(I.length-1,Math.max(0,p)),le()};return o.addEventListener("pointermove",(k)=>{Y=k.clientX,Q(k.clientX)}),o.addEventListener("pointerleave",()=>{Y=null,H=null,le()}),{element:o,update:(k,A)=>{if(I=k,J=A>0?A:1,x.setAttribute("d",[0.25,0.5,0.75].map((d)=>`M0 ${n*d} H300`).join(" ")),I.length===0)h.setAttribute("d",""),T.setAttribute("d","");else{let d=I.map((se,ye)=>`${V(ye,I.length).toFixed(2)} ${te(se).toFixed(2)}`),p=I.length===1,L=p?`M${V(0,1)-2} ${d[0]?.split(" ")[1]} L${d[0]}`:`M${d.join(" L")}`;T.setAttribute("d",L);let K=p?V(0,1)-2:V(0,I.length);h.setAttribute("d",`${L} L300 ${n} L${K.toFixed(2)} ${n} Z`)}if(Y!==null)Q(Y)}}};var Ft=2000,Ko={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},Ke=(e)=>typeof e==="object"&&e!==null,Kr=(e)=>Ke(e)&&typeof e.at==="number"&&Ke(e.system)&&Ke(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Ke(e.history),Wr=(e)=>{if(!(e instanceof m))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Wo=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},Ht=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Jo=(e,o,n,s)=>{let i=!1,c=async()=>{if(i||!Ht(o))return;i=!0;try{let h=await e.serviceRequest({method:"GET",path:"/snapshot"}),T;try{T=JSON.parse(h.body)}catch{T=null}if(h.status===200&&Kr(T))n(T);else s(h.status===200?"bad-answer":"service-failed")}catch(h){s(Wr(h))}finally{i=!1}};c(),setInterval(()=>{c()},Ft);let E=Ht(o),x=()=>{let h=Ht(o);if(h&&!E)c();E=h};return document.addEventListener("visibilitychange",x),new ResizeObserver(x).observe(document.documentElement),{refresh:()=>{c()}}};var Yo="en",Qo=(e)=>{Yo=e||"en"},Zo=(e,o)=>new Intl.NumberFormat(Yo,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),ee=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),s=0;while(n>=1024&&s<o.length-1)n/=1024,s+=1;let i=s>=3&&n<100?1:0;return`${Zo(n,i)} ${o[s]}`},ce=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Zo(e,e<10?1:0)}%`},qo=(e)=>{let o=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60);if(o>0)return`${o} d ${n} h`;if(n>0)return`${n} h ${s} min`;return`${s} min`},We=(e,o)=>{let n=o.replace(/^"([^"]+)"/,"$1");if(!e||!/^([A-Za-z]:)?[\\/]/.test(n))return o;let s=-1;while((s=n.indexOf(e,s+1))>=0){if(!/[\\/]/.test(n[s-1]??""))continue;let i=n.slice(s+e.length).replace(/^\.exe/i,"");if(i===""||i.startsWith(" "))return i.trim()}return o},Jr={renderer:"Renderer","gpu-process":"GPU",utility:"Utility",zygote:"Zygote"},Yr=[[/network/i,"Network service"],[/storage/i,"Storage service"],[/audio/i,"Audio service"],[/video_?capture/i,"Video capture"]],Je=(...e)=>e.filter(Boolean).join(" · "),er=(e,o)=>{let n=e.ports.map((E)=>`:${E}`).join(" ");if(o==="root")return{title:"Main process",detail:Je(n,We(e.name,e.command))};if(o==="self")return{title:"Resource Monitor",detail:"this extension"};let s=/--type=([\w-]+)/.exec(e.command)?.[1];if(s&&/\bHelper\b/.test(e.name)){let E=s==="utility"?/--utility-sub-type=([\w.]+)/.exec(e.command)?.[1]??"":"";return{title:Yr.find(([h])=>h.test(E))?.[1]??Jr[s]??s,detail:Je(n,We(e.name,e.command))}}let i=e.label||e.name,c=We(e.name,e.command);return{title:i,detail:Je(n,c===i||c===e.name?"":c)}},tr=(e)=>{let o=We(e.name,e.command),n=o===e.title||o===e.name||e.command===e.title;return Je(e.ports.map((s)=>`:${s}`).join(" "),e.count>1?`${e.count} processes`:"",n?"":o)},or=(e)=>{if(e==="darwin")return"macOS";if(e==="win32")return"Windows";if(e==="linux")return"Linux";return e},Ye={app:"OpenChamber",opencode:"OpenCode",terminals:"Terminal"},rr={app:"OpenChamber",opencode:"Agent",terminals:"Terminal"},de={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var a=(e,o="",n="",s=[])=>{let i=document.createElement(e);if(o)i.className=o;if(n)i.textContent=n;if(s.length>0)i.append(...s);return i};var nr=`
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
`,sr=`
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
  .empty { color: var(--oc-muted); padding: 6px 2px; }
  .origin { font-size: 10px; padding: 0 5px; border-radius: 4px; line-height: 16px; border: 1px solid var(--oc-border); color: var(--oc-muted); flex: none; }
  /* Lists sit on the panel itself: rows divided by hairlines, no boxes inside boxes. */
  .list { display: flex; flex-direction: column; }
  .cols, .row, .group-head { display: grid; grid-template-columns: minmax(0, 1fr) 56px 72px; align-items: center; column-gap: 8px; }
  .cols { padding: 0 2px 4px; color: var(--oc-muted); font-size: 11px; border-bottom: 1px solid var(--oc-border); }
  .cell { text-align: right; white-space: nowrap; }
  .quiet { color: var(--oc-muted); }
  /* Three levels, told apart by size, weight and indent rather than boxes:
     group heading, rows on a rail in the group's colour, unfolded members deeper and quieter. */
  .row { padding: 7px 2px; border-bottom: 1px solid color-mix(in srgb, var(--oc-border) 55%, transparent); }
  .list > .row:last-child { border-bottom-color: transparent; }
  .group { display: flex; flex-direction: column; padding: 4px 0 10px; border-bottom: 1px solid var(--oc-border); }
  .group-head { padding: 12px 2px 6px; font-size: 13px; }
  .group-head .cell { font-weight: 600; }
  .group > .row, .group > .job-wrap { margin-left: 4px; padding-left: 12px;
    border-left: 2px solid color-mix(in srgb, var(--group-color, var(--oc-border)) 40%, transparent); }
  .group > .row { padding-top: 5px; padding-bottom: 5px; border-bottom: none; }
  .group > .job-wrap > .row { padding: 5px 2px; border-bottom: none; }
  .group .row .cell { color: color-mix(in srgb, var(--oc-fg) 80%, transparent); }
  .group .row .cell.quiet { color: var(--oc-muted); }
  .gname { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .gname b { font-weight: 650; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .count { color: var(--oc-muted); font-weight: 400; }
  .dot { flex: none; width: 6px; height: 6px; border-radius: 50%; }
  .who { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .title-line { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .pname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
  .pname.strong { font-weight: 600; flex: none; max-width: 50%; }
  .pdetail { color: var(--oc-muted); font: 11px/1.35 var(--oc-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .job.foldable { cursor: pointer; }
  .job.foldable .title-line::before { content: ''; flex: none; width: 0; height: 0; margin: 0 2px 0 1px;
    border-left: 4px solid var(--oc-muted); border-top: 3.5px solid transparent; border-bottom: 3.5px solid transparent; transition: transform .15s ease; }
  .job.foldable.open .title-line::before { transform: rotate(90deg); }
  .job.foldable:focus-visible { outline: 2px solid var(--oc-focus); outline-offset: -2px; border-radius: 4px; }
  .job-wrap.open .pdetail { white-space: normal; overflow-wrap: anywhere; }
  .pdetail { user-select: text; }
  .members { display: flex; flex-direction: column; padding: 0 0 6px 16px; }
  .row.member { padding: 3px 2px; border-bottom: none; font-size: 11.5px; }
  .row.member .pname { color: var(--oc-muted); }
  .row.member .pdetail { font-size: 10.5px; }
  .group .row.member .cell { color: var(--oc-muted); }
  .more { color: var(--oc-muted); padding: 2px 2px 4px; font-size: 11px; }
  /* Stop is a text button: no fill, it only changes colour, and asks once before acting. */
  .stop { flex: none; margin-left: auto; padding: 0 2px; border: 0; background: none; font: 11px var(--oc-font); color: var(--oc-muted); cursor: pointer; }
  .stop:hover, .stop:focus-visible { color: var(--oc-error-text, var(--oc-error)); }
  .stop.armed { color: var(--oc-error-text, var(--oc-error)); font-weight: 600; }
  .stop:disabled { cursor: default; opacity: .6; }
  .stop:focus-visible { outline: 2px solid var(--oc-focus); outline-offset: 1px; border-radius: 3px; }
  .banner { padding: 8px 12px; border-radius: var(--oc-radius); border: 1px solid color-mix(in srgb, var(--oc-warning) 40%, transparent);
    background: color-mix(in srgb, var(--oc-warning) 10%, transparent); color: var(--oc-warning-text, var(--oc-fg)); }
  .banner.error { border-color: color-mix(in srgb, var(--oc-error) 40%, transparent); background: color-mix(in srgb, var(--oc-error) 10%, transparent);
    color: var(--oc-error-text, var(--oc-fg)); }
  .footnote { color: var(--oc-muted); font-size: 11px; padding: 0 2px; }
  [hidden] { display: none !important; }
`;var Xt=90;var Bt=Rt(),jt=document.querySelector("#root");if(!jt)throw Error("Missing #root");var dr=document.createElement("style");dr.textContent=nr+sr;document.head.append(dr);var Kt=Ft/1000,Te=a("div","banner");Te.hidden=!0;var lr=a("div","host-name","This machine"),pr=a("div","host-meta","Reading…"),ge=a("div","live stale","Starting"),ur=a("div","head");ur.append(a("div","titles","",[lr,pr]),ge);var mr=(e,o,n)=>{let s=a("span","big num","–"),i=a("span","sub num"),c=a("div","card-top","",[a("span","label",e),a("span","grow"),i]),E=$t({color:o,height:56,capacity:Xt,format:n,intervalSeconds:Kt}),x=a("div","sub num");return{card:a("div","card","",[c,s,E.element,x]),value:s,side:i,sub:x,chart:E}},Se=mr("CPU",de.cpu,ce),xe=mr("Memory",de.memory,ee),Qr=a("div","grid","",[Se.card,xe.card]),fr=a("span","big num","–"),Er=a("span","sub num"),hr=$t({color:de.app,height:44,capacity:Xt,format:ee,intervalSeconds:Kt}),_r=a("div","stack"),Sr=a("div","legend"),Zr=a("div","card","",[a("div","card-top","",[a("span","label","OpenChamber"),a("span","grow"),Er]),fr,a("div","sub","The app, OpenCode, and everything they started"),hr.element,_r,Sr]),qr=()=>a("div","cols","",[a("span"),a("span","cell","CPU"),a("span","cell","Memory")]),xr=a("span","count"),Vt=a("div","list"),Tr=a("div","empty","No dev servers right now. Servers started by an agent, a project action, or the terminal show up here with their ports."),en=a("section","section","",[a("div","section-head","",[a("span","label","Dev servers"),xr]),Vt,Tr]),br=a("div","list"),tn=a("section","section","",[a("div","section-head","",[a("span","label","Processes")]),qr(),br]),gr=a("div","list"),Wt=a("section","section","",[a("div","section-head","",[a("span","label","OpenCode outside OpenChamber")]),gr]);Wt.hidden=!0;var on=a("div","footnote","Process CPU counts 100% per core, as Activity Monitor does; the CPU card above is the whole machine. Memory is resident memory: pages a process shares with others count in each of them.");jt.append(Te,ur,Qr,Zr,en,tn,Wt,on);var yr=()=>{return},Jt=(e,o,n)=>{let s=a("button","stop",e);s.type="button";let i=!1,c,E=()=>{i=!1,s.classList.remove("armed"),s.textContent=e};return s.addEventListener("click",(x)=>{if(x.preventDefault(),x.stopPropagation(),s.disabled)return;if(!i){i=!0,s.classList.add("armed"),s.textContent=o,clearTimeout(c),c=setTimeout(E,4000);return}clearTimeout(c),s.disabled=!0,s.textContent="Stopping…",Wo(Bt,n).then((h)=>{if(!h)dn();yr()})}),s},qe=(e)=>a("span",e!==null&&e>=1?"cell num":"cell num quiet",ce(e)),et=(e)=>a("span","cell num",ee(e)),Ar=(e,o,n=[])=>{let s=a("span","title-line","",[a("span","pname",e),...n]),i=a("div","who","",[s]);if(o)i.append(a("span","pdetail",o));return i},Yt=(e,o,n="row")=>{let{title:s,detail:i}=er(e,o),c=a("div",n,"",[Ar(s,i),qe(e.cpu),et(e.memory)]);return c.title=`${e.name} · pid ${e.pid}${e.command?`
${e.command}`:""}`,c},Ee=new Set,rn=(e,o)=>{let n=e.members.length>0&&e.count>1,s=n&&Ee.has(e.pid),i=tr(e),c=o?[Jt("Stop",`Stop ${e.title}?`,{kind:"job",pid:e.pid,name:e.name})]:[],E=a("div",n?"row job foldable":"row job","",[Ar(e.title,i,c),qe(e.cpu),et(e.memory)]);E.title=e.command||e.title,E.classList.toggle("open",s);let x=a("div",s?"job-wrap open":"job-wrap","",[E]);if(n){E.tabIndex=0,E.setAttribute("role","button"),E.setAttribute("aria-expanded",String(s));let h=()=>{if(Ee.has(e.pid))Ee.delete(e.pid);else Ee.add(e.pid);if(zt)kr(zt)};E.addEventListener("click",h),E.addEventListener("keydown",(T)=>{if(T.key==="Enter"||T.key===" ")T.preventDefault(),h()})}if(s){let h=a("div","members","",e.members.map((B)=>Yt(B,"other","row member"))),T=e.count-e.members.length;if(T>0)h.append(a("div","more",T===1?"1 more process, idle":`${T} more processes, idle`));x.append(h)}return x},nn=(e,o)=>{let n=a("span","dot");n.style.background=de[e.id];let s=[];if(e.id==="terminals"&&e.jobs.length>0)s.push(Jt("Stop all","Stop everything running in the terminal?",{kind:"terminals"}));let i=a("span","gname","",[n,a("b","",Ye[e.id]),a("span","count",String(e.count)),...s]),c=a("div","group-head","",[i,qe(e.cpu),et(e.memory)]),E=(h)=>e.id==="terminals"||e.id==="opencode"&&h.ports.length>0,x=a("div","group","",[c,...e.processes.map((h)=>Yt(h,o(h))),...e.jobs.map((h)=>rn(h,E(h)))]);return x.style.setProperty("--group-color",de[e.id]),x},sn=(e)=>{let o=e.ports.map((E)=>a("span","port",`:${E}`)),n=a("div","title-line","",[...o,a("span","pname strong",e.name),a("span","origin",rr[e.group])]);if(e.job)n.append(Jt("Stop",`Stop ${e.job.title}?`,{kind:"job",pid:e.job.pid,name:e.job.name}));let s=a("div","who","",[n]),i=e.job?.title??"";if(i)s.append(a("span","pdetail",i));let c=a("div","row server","",[s,qe(e.cpu),et(e.memory)]);return c.title=`pid ${e.pid}${e.command?`
${e.command}`:""}`,c},an=(e,o,n)=>{e.replaceChildren(...o.filter((s)=>s.value>0).map((s)=>{let i=a("span");return i.style.width=`${Math.min(100,s.value/Math.max(1,n)*100)}%`,i.style.background=s.color,i.title=s.label,i}))},cn={"processes-unavailable":"The process list could not be read just now. OpenChamber's numbers are from the last reading that worked.","ports-unavailable":"Listening ports could not be read, so dev servers are not detected."},ir=(e)=>de[e],be=null,Qe=!1,ar,vr=[],zt=null,Ze=()=>{let e=be!==null?Ko[be]:Qe?"Could not stop it. It may have ended already, or it is not something this panel stops.":vr.join(" ");Te.hidden=e==="",Te.classList.toggle("error",be!==null||Qe),Te.textContent=e};function dn(){Qe=!0,clearTimeout(ar),ar=setTimeout(()=>{Qe=!1,Ze()},6000),Ze()}var kr=(e)=>{zt=e;let{system:o,app:n}=e;lr.textContent=o.hostname,pr.textContent=[or(o.platform),o.arch,o.cpuModel,`up ${qo(o.uptimeSeconds)}`].filter(Boolean).join(" · "),ge.textContent=`Live · every ${Kt} s`,ge.classList.remove("stale"),Se.value.textContent=ce(o.cpu),Se.side.textContent=`${o.cores} cores`,Se.sub.textContent=o.load?`Load ${o.load.map((c)=>c.toFixed(2)).join(" · ")}`:"All cores together",Se.chart.update(e.history.system.cpu,100),xe.value.textContent=ee(o.memoryUsed),xe.side.textContent=ce(o.memoryUsed/Math.max(1,o.memoryTotal)*100),xe.sub.textContent=`of ${ee(o.memoryTotal)} · ${ee(Math.max(0,o.memoryTotal-o.memoryUsed))} free`,xe.chart.update(e.history.system.memory,o.memoryTotal),fr.textContent=ee(n.memory),Er.textContent=`${ce(n.cpu)} CPU`,hr.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),an(_r,n.groups.map((c)=>({value:c.memory,color:ir(c.id),label:Ye[c.id]})),n.memory),Sr.replaceChildren(...n.groups.map((c)=>{let E=a("span","swatch");return E.style.background=ir(c.id),a("div","legend-row","",[E,a("span","name",Ye[c.id],[a("span","muted",` · ${c.count} ${c.count===1?"process":"processes"}`)]),a("span","value num muted",ce(c.cpu)),a("span","value num",ee(c.memory))])})),xr.textContent=e.servers.length>0?String(e.servers.length):"",Vt.replaceChildren(...e.servers.map(sn)),Vt.hidden=e.servers.length===0,Tr.hidden=e.servers.length>0;let s=(c)=>c.pid===n.rootPid?"root":c.label==="Resource Monitor"&&c.ppid===n.rootPid?"self":"other";br.replaceChildren(...n.groups.map((c)=>nn(c,s)));let i=new Set(n.groups.flatMap((c)=>c.jobs.map((E)=>E.pid)));for(let c of Ee)if(!i.has(c))Ee.delete(c);Wt.hidden=e.outside.length===0,gr.replaceChildren(...e.outside.map((c)=>Yt(c,"other"))),vr=e.warnings.map((c)=>cn[c]),Ze()},ln=(e)=>{be=e,Ze(),ge.textContent="Paused",ge.classList.add("stale")},cr=!1;Bt.onReady((e)=>{if(Ct(e,document.documentElement),Qo(e.locale),cr)return;cr=!0,{refresh:yr}=Jo(Bt,jt,(o)=>{be=null,kr(o)},ln)});})();
