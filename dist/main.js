(()=>{"use strict";function e(e,t){return new Promise(((a,n)=>{e(t).then((e=>{e&&(e.status<200||e.status>299)?(console.log("GAPI call returned bad status",e),n(e)):a(e)}),(e=>{console.log("GAPI call failed",e),n(e)}))}))}class t{static init({onSuccess:e=(()=>{}),onFailure:t=(()=>{}),onSignIn:a=(()=>{})}){gapi.load("client:auth2",(()=>{gapi.client.init({apiKey:"AIzaSyDRPEe6LBi-O697m5NPCxhn8swqHm3ExEg",clientId:"153901704601-4n12u2s1bup0sinlesv6aetfgjdsldt2.apps.googleusercontent.com",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],scope:"https://www.googleapis.com/auth/drive.appfolder"}).then((()=>{console.log("Init GAPI client ok"),gapi.auth2.getAuthInstance().isSignedIn.listen(a),e()}),(e=>{console.log("Failed to init GAPI client",e),t()}))}))}static isGapiLoaded=()=>gapi&&gapi.auth2;static logIn=()=>{t.isGapiLoaded()&&gapi.auth2.getAuthInstance().signIn()};static logOut=()=>{t.isGapiLoaded()&&gapi.auth2.getAuthInstance().signOut()};static isLoggedIn=()=>t.isGapiLoaded()&&gapi.auth2.getAuthInstance().isSignedIn.get();static async createEmptyFile(t,a){return(await e(gapi.client.drive.files.create,{resource:{name:t,mimeType:a||"text/plain",parents:["appDataFolder"]},fields:"id"})).result.id}static async upload(t,a){return e(gapi.client.request,{path:`/upload/drive/v3/files/${t}`,method:"PATCH",params:{uploadType:"media"},body:"string"==typeof a?a:JSON.stringify(a)})}static async download(t){const a=await e(gapi.client.drive.files.get,{fileId:t,alt:"media"});return a.result||a.body}static async find(t){let a,n=[];do{const c=await e(gapi.client.drive.files.list,{spaces:"appDataFolder",fields:"files(id, name), nextPageToken",pageSize:100,pageToken:a,orderBy:"createdTime",q:t});n=n.concat(c.result.files),a=c.result.nextPageToken}while(a);return n}static async deleteFile(t){try{return await e(gapi.client.drive.files.delete,{fileId:t}),!0}catch(e){if(404===e.status)return!1;throw e}}}async function a(e){var a=localStorage.getItem(e);if(a)return a;const n=await t.find('name = "'+e+'"');return a=n.length>0?n[0].id:await t.createEmptyFile(e),localStorage.setItem(e,a),a}class n{static async saveFile(e,n){if(t.isLoggedIn()){const c=await a(e);await t.upload(c,n)}}static async loadFile(e){if(t.isLoggedIn()){const n=await a(e);return await t.download(n)}}}class c{static WEEKDAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];static MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];static MONTHS_FULL=["January","February","March","April","May","June","July","August","September","October","November","December"];static startWeek=1;static timezone=3;static initLocale(e=3,t=1){c.timezone=e,c.startWeek=t}static getDayMonthWeekday(e){const t=new Date(1e3*e);return{day:t.getDate(),month:t.getMonth(),weekday:t.getDay()}}static getWeekday(e){return new Date(1e3*e).getDay()}static getBegintWeekTimestamp(e){const t=new Date(1e3*e);t.setHours(0,0,0,0);const a=t.getDate();let n=t.getDay()-c.startWeek;return n<0&&(n+=7),t.setDate(a-n)/1e3}static getBeginDayTimestamp=e=>new Date(1e3*e).setHours(0,0,0,0)/1e3;static getEndDayTimestamp=e=>86400*~~((e+3600*c.timezone)/86400)-3600*c.timezone+86399;static getTime=e=>e-c.getBeginDayTimestamp(e);static getTimeToEndDay=e=>c.getBeginDayTimestamp(e)+86399-e;static getDifferenceInDays=(e,t)=>(c.getBeginDayTimestamp(t)-c.getBeginDayTimestamp(e))/86400;static getTimeString(e){const t=new Date(1e3*e),a=t.getUTCHours(),n=t.getUTCMinutes();return a+(n>9?":":":0")+n}static getYYYYMMDD(e){const t=new Date(1e3*e),a=t.getFullYear(),n=t.getMonth()+1,c=t.getDate();return a+(n>9?"-":"-0")+n+(c>9?"-":"-0")+c}static getHHMM(e){const t=new Date(1e3*e),a=t.getHours(),n=t.getMinutes();return(a>9?"":"0")+a+(n>9?":":":0")+n}static getYYYYMMDDTHHMM(e){const t=new Date(1e3*e),a=t.getFullYear(),n=t.getMonth()+1,c=t.getDate(),r=t.getHours(),i=t.getMinutes();return a+(n>9?"-":"-0")+n+(c>9?"-":"-0")+c+(r>9?"T":"T0")+r+(i>9?":":":0")+i}static HHMMToSeconds(e){if(!e)return 0;const[t,a]=e.split(":",2);return 60*(60*t+ +a)}static DDHHMMToSeconds(e){const[t,a]=e.split("d",2);return void 0===a?c.HHMMToSeconds(t):86400*t+c.HHMMToSeconds(a)}static HHMMFromSeconds(e){if(null===e)return"";const t=~~(e%3600/60);return~~(e/3600)+(t>9?":":":0")+t}static DDHHMMFromSeconds(e){if(e<0)return"";const t=~~(e/86400);return(t<1?"":t+"d ")+c.HHMMFromSeconds(e%86400)}}function r(e,t,a=31,n=1){const[c,r=null]=t.split("-",2);if(null===r){const[c,r=null]=t.split("/",2);if(""===c||""===r)return e;const i="*"===c?n:+c;let s=+r;if(isNaN(i)||isNaN(s))return e;if(null===r&&"*"!==c)return e.push(+c),e;0===s&&(s=1);for(let t=i;t<=a;t+=s)e.push(t);return e}if(""===c||""===r)return e;for(let t=+c;t<=+r;t++)e.push(t);return e}class i{static isMatch(e,t,a){const{day:n,month:i,weekday:s}=c.getDayMonthWeekday(a),[l=null,o="*",d="*"]=e.trim().split(" ",3);if(null===l)return!1;if("/"===l[0]){const e=~~((a-c.getBeginDayTimestamp(t))/86400);return!(e<0)&&e%+l.substring(1)==0}const u=l.split(",").reduce(((e,t)=>r(e,t)),[]),m=o.split(",").reduce(((e,t)=>r(e,t,12)),[]),p=d.split(",").reduce(((e,t)=>r(e,t,7,0)),[]);return!!(m.includes(i+1)&&u.includes(n)&&p.includes(s))}static ariseInInterval(e,t,a,n){for(var c=a;c<n;c+=86400)if(this.isMatch(e,t,c))return!0;return!1}}class s{static default_background="lightgray";static default_color="black";static asanaToEvent=e=>{const t=e.split('"').map(((e,t)=>t%2==0?e:e.replace(/,/g,"."))).join('"'),[a,n,r,i,s,l,o,d,u,m,p,h,g,f,v]=t.split(","),E={name:s.replace(/"/g,""),start:m,comment:h.replace(/"/g,""),project:g},R=c.getBeginDayTimestamp(new Date(E.start)/1e3);return{name:""===E.name?"без названия":E.name,comment:E.comment??"",project:E.project??"",start:R,time:null,duration:0,end:R+86400,credit:0,debit:0,completed:""!==r}};eventToCompact=(e,t,a)=>{const n={id:e.id,name:e.name,background:this.projects[e.projectId].background,color:this.projects[e.projectId].color,start:e.start,time:e.time,end:e.end,days:Math.ceil((e.end-t)/86400),credit:e.credit,debit:e.debit,completed:a,repeatable:!1};return e.repeat&&(n.start=t,n.end=t+86400,n.days=1,n.repeatable=!0),n};rawToEvent=e=>{const t=c.getBeginDayTimestamp(new Date(e.start)/1e3),a=e.time?c.HHMMToSeconds(e.time):null,n=e.duration?c.DDHHMMToSeconds(e.duration):0;var r=e.project?this.projects.findIndex((t=>t.name===e.project)):0;if(r<0&&(r=0),e.repeat)return{name:e.name,comment:e.comment??"",project:e.project??"",projectId:r,repeat:e.repeat,start:t,time:a,duration:n,end:e.end?c.getBeginDayTimestamp(new Date(e.end)/1e3):0,credit:e.credit??0,debit:e.debit??0};const i=n?(null!==a?t+a:t)+n:e.end?c.getBeginDayTimestamp(new Date(e.end)/1e3):t+86400;return{name:e.name,comment:e.comment??"",project:e.project??"",projectId:r,start:t,time:a,duration:n,end:i,credit:e.credit??0,debit:e.debit??0}};static eventToRaw=e=>{const t={};return t.name=e.name,e.comment&&(t.comment=e.comment),e.project&&(t.project=e.project),t.start=c.getYYYYMMDD(e.start),null!==e.time&&(t.time=c.HHMMFromSeconds(e.time)),e.repeat?(t.repeat=e.repeat,e.duration&&(t.duration=c.DDHHMMFromSeconds(e.duration)),e.end&&(t.end=c.getYYYYMMDD(e.end))):e.duration?t.duration=c.DDHHMMFromSeconds(e.duration):e.end&&e.end-e.start!=86400&&(t.end=c.getYYYYMMDD(e.end)),e.credit&&(t.credit=e.credit),e.debit&&(t.debit=e.debit),t};constructor({completedList:e=[],plannedList:t=[],projectsList:a=[]}){this.cachedEvents=[],this.cachedActualBalance=[],this.cachedPlannedBalance=[],this.lastId=1,this.projects=[{name:"Default",background:s.default_background,color:s.default_color},...a],this.completed=[],e.forEach((e=>{const t=this.rawToEvent(e);this.addCompletedEvent(t)})),this.planned=[],this.plannedRepeatable=[],t.forEach((e=>this.addPlannedRawEvent(e))),this.sort(),this.lastActualBalance=this.calculateActualBalance(),this.lastActualBalanceDate=this.completed.length?this.completed[this.completed.length-1].start:0,this.firstActualBalanceDate=this.completed.length?this.completed[0].start:0}reload({completedList:e=[],plannedList:t=[],projectsList:a=[]}){this.cachedEvents=[],this.cachedActualBalance=[],this.cachedPlannedBalance=[],this.lastId=1,this.projects=[{name:"Default",background:s.default_background,color:s.default_color},...a],this.completed=[],e.forEach((e=>{const t=this.rawToEvent(e);this.addCompletedEvent(t)})),this.planned=[],this.plannedRepeatable=[],t.forEach((e=>this.addPlannedRawEvent(e))),this.sort(),this.lastActualBalance=this.calculateActualBalance(),this.lastActualBalanceDate=this.completed.length?this.completed[this.completed.length-1].start:0,this.firstActualBalanceDate=this.completed.length?this.completed[0].start:0}addCompletedEvent(e){this.completed.push({id:this.lastId++,name:e.name,comment:e.comment,project:e.project,projectId:e.projectId,start:e.start,time:e.time,duration:e.duration,end:e.end,days:Math.ceil((e.end-e.start)/86400),credit:e.credit,debit:e.debit})}addPlannedRawEvent(e){this.addPlannedEvent(this.rawToEvent(e))}addPlannedEvent(e){e.repeat?this.plannedRepeatable.push({id:this.lastId++,name:e.name,comment:e.comment,project:e.project,projectId:e.projectId,repeat:e.repeat,start:e.start,time:e.time,duration:e.duration,end:e.end,days:1,credit:e.credit,debit:e.debit}):this.planned.push({id:this.lastId++,name:e.name,comment:e.comment,project:e.project,projectId:e.projectId,start:e.start,time:e.time,duration:e.duration,end:e.end,days:Math.ceil((e.end-e.start)/86400),credit:e.credit,debit:e.debit})}clearCache(){this.cachedEvents=[],this.cachedActualBalance=[],this.cachedPlannedBalance=[],this.lastActualBalance=this.calculateActualBalance(),this.lastActualBalanceDate=this.completed.length?this.completed[this.completed.length-1].start:0,this.firstActualBalanceDate=this.completed.length?this.completed[0].start:0}deleteEvent(e){this.completed=this.completed.filter((t=>t.id!==e)),this.planned=this.planned.filter((t=>t.id!==e)),this.plannedRepeatable=this.plannedRepeatable.filter((t=>t.id!==e)),this.clearCache()}completeEvent(e,t,a={}){var n=this.completed.find((t=>t.id===e));if(void 0!==n)return this.addPlannedEvent({...n,...this.rawToEvent(a)}),this.sort(),void this.deleteEvent(n.id);if(void 0!==(n=this.planned.find((t=>t.id===e))))return this.addCompletedEvent({...n,...this.rawToEvent(a)}),this.sort(),void this.deleteEvent(n.id);if(void 0!==(n=this.plannedRepeatable.find((t=>t.id===e)))){const e=((e,t,a)=>({id:e,name:t.name,comment:t.comment,project:t.project,projectId:t.projectId,start:a,time:t.time,end:a+86400,days:1,credit:t.credit,debit:t.debit}))(this.lastId++,{...n,...this.rawToEvent(a)},t);if(this.completed.push(e),i.ariseInInterval(n.repeat,n.start,n.start,t)){const e={...n,end:t,id:this.lastId++};this.plannedRepeatable.push(e)}if("/"==n.repeat[0]){const e=+n.repeat.substr(1);n.start=t+86400*e}else n.start=t+86400;return n.end&&!i.ariseInInterval(n.repeat,n.start,n.start,n.end)&&this.deleteEvent(n.id),this.sort(),void this.clearCache()}}updateEvent(e,t){var a=this.completed.find((t=>t.id===e));return void 0!==a?(this.addCompletedEvent(this.rawToEvent(t)),this.sort(),void this.deleteEvent(e)):void 0!==(a=this.planned.find((t=>t.id===e)))||void 0!==(a=this.plannedRepeatable.find((t=>t.id===e)))?(this.addPlannedEvent(this.rawToEvent(t)),this.sort(),void this.deleteEvent(e)):void 0}shiftToDate(e,t,a){var n=this.completed.find((t=>t.id===e));if(void 0!==n){const e=t-n.start;return n.start=t,n.end=n.end?n.end+e:n.end,this.sort(),void this.clearCache()}if(void 0!==(n=this.planned.find((t=>t.id===e)))){const e=t-n.start;return n.start=t,n.end=n.end?n.end+e:n.end,this.sort(),void this.clearCache()}if(void 0!==(n=this.plannedRepeatable.find((t=>t.id===e)))){if("/"!==n.repeat[0]||n.start!==a)return;const e=t-a;return n.start=n.start+e,n.end=n.end?n.end+e:n.end,this.sort(),void this.clearCache()}}copyToDate(e,t){var a=this.completed.find((t=>t.id===e));if(void 0!==a){const e=t-a.start,n={...a,start:t,end:a.end?a.end+e:a.end};return this.addCompletedEvent(n),this.sort(),void this.clearCache()}if(void 0!==(a=this.planned.find((t=>t.id===e)))){const e=t-a.start,n={...a,start:t,end:a.end?a.end+e:a.end};return this.addPlannedEvent(n),this.sort(),void this.clearCache()}if(void 0!==(a=this.plannedRepeatable.find((t=>t.id===e)))){a.start;const e={...a,repeat:"",start:t,end:t+86400};return this.addPlannedEvent(e),this.sort(),void this.clearCache()}}sort(){this.completed.sort(((e,t)=>{const a=e.start-t.start;return 0===a?t.days-e.days:a})),this.planned.sort(((e,t)=>{const a=e.start-t.start;return 0===a?t.days-e.days:a})),this.plannedRepeatable.sort(((e,t)=>e.time-t.time))}getEvents(e){if(void 0!==this.cachedEvents[e])return this.cachedEvents[e];const t=this.planned.reduce(((t,a)=>(e<a.start||e>=a.end||t.push(this.eventToCompact(a,e,!1)),t)),[]);return this.plannedRepeatable.reduce(((t,a)=>(e<a.start||a.end&&e+a.time>=a.end||i.isMatch(a.repeat,a.start,e)&&t.push(this.eventToCompact(a,e,!1)),t)),t),this.completed.reduce(((t,a)=>(e>=a.start&&e<a.end&&t.push(this.eventToCompact(a,e,!0)),t)),t),t.sort(((e,t)=>{var a=e.start-t.start;return a||(a=t.end-t.start-(e.end-e.start))||e.time-t.time})),this.cachedEvents[e]=t,t}getEventsWithPlaceholders(e,t=[],a=[]){for(;t.length>0&&!(e<t[t.length-1].end);)t.pop();return t.forEach((e=>a.push({id:-1}))),this.getEvents(e).reduce(((e,a)=>(t.some((e=>a.id===e.id))||(a.end-a.start>86400&&t.push({id:a.id,end:a.end}),e.push(a)),e)),a),a}getPlannedEventsFilteredBySkip(e,t=[],a=[]){for(;t.length>0&&!(e<t[t.length-1].end);)t.pop();this.getEvents(e).reduce(((e,a)=>(t.some((e=>a.id===e.id))||a.completed||(a.days>1&&t.push({id:a.id,end:a.end}),e.push(a)),e)),a)}getPlannedEventsInInterval(e,t){const a=[],n=[];for(let c=e;c<t;c+=86400)this.getPlannedEventsFilteredBySkip(c,n,a);return a}calculateActualBalance(){return this.completed.reduce(((e,t)=>e+(t.credit-t.debit)),0)}getActualBalance(e){if(e<this.firstActualBalanceDate)return 0;if(e>this.lastActualBalanceDate)return this.lastActualBalance;if(void 0!==this.cachedActualBalance[e])return this.cachedActualBalance[e];const t=this.completed.reduce(((t,a)=>(e>a.start+a.time&&(t+=a.credit-a.debit),t)),0);return this.cachedActualBalance[e]=t,t}getPlannedBalance(e){if(e<this.firstActualBalanceDate)return 0;if(e<=this.lastActualBalanceDate)return this.getActualBalance(e);if(void 0!==this.cachedPlannedBalance[e])return this.cachedPlannedBalance[e];const t=this.getPlannedEventsInInterval(this.lastActualBalanceDate,e).reduce(((e,t)=>e+(t.credit-t.debit)),this.lastActualBalance);return this.cachedPlannedBalance[e]=t,t}getPlannedBalanceChange(e){return this.getEvents(e).reduce(((e,t)=>e+(t.credit-t.debit)),0)}prepareToStorage(){const e=this.completed.map((e=>s.eventToRaw(e))),t=this.plannedRepeatable.reduce(((e,t)=>(e.push(s.eventToRaw(t)),e)),[]);return this.planned.reduce(((e,t)=>(e.push(s.eventToRaw(t)),e)),t),{projectsList:this.projects.slice(1),completedList:e,plannedList:t}}}const l=localStorage.getItem("data")??"{}";console.log("localStorage",l);const o=JSON.parse(l),d=new s(o);function u({data:e,today:t=!1,onAddEvent:a=(()=>{}),onDragDrop:n=(e=>{}),children:r=null}){const{timestamp:i,actualBalance:s,lastActualBalanceDate:l,plannedBalance:o,plannedBalanceChange:d}=e,u=React.useRef(null),{day:m,month:p}=c.getDayMonthWeekday(i),h=e=>(e/1e3).toFixed(1);return React.createElement("div",{className:i>=l?"day_d84e778":"before_actual_date_fb6a4cf",onClick:function(e){u&&u.current.focus()},onDrop:n,onDragOver:e=>{e.preventDefault(),e.ctrlKey?e.dataTransfer.dropEffect="copy":e.dataTransfer.dropEffect="move"}},React.createElement("div",{className:t?"today_ded7894":"header_d741756",onClick:e=>{console.log(e),e.target.parentElement.requestFullscreen()}},m+(1==m?" "+c.MONTHS[p]:"")),React.createElement("div",{className:"balance_c271232"},h(o)+(0==d?"k":((g=d/1e3)>0?"+"+g.toFixed(1):g.toFixed(1))+"k")+" "+h(s)),r,React.createElement("div",{ref:u,className:"input_f2f0e78",contentEditable:"true",suppressContentEditableWarning:!0,onBlur:function(e){a(i,e.target.innerText),e.target.innerText=""},onKeyDown:function(e){console.log("key",e.key),"Enter"==e.key&&e.target.blur()}}));var g}function m({event:e,days:t,onClick:a=(e=>{}),onDragStart:n=(e=>{})}){const{name:r,completed:i,background:s,color:l,repeatable:o}=e;return-1===e.id?React.createElement("div",{className:"placeholder_c47b4a3"}):React.createElement("div",{className:i?"completed_b30da5e":o?"repeatable_ca186f6":"item_bb964bd",draggable:!0,onDragStart:n,style:{width:1==t?"calc(100% + 2px)":"calc("+t+" * (100% + 1px) + 1px )",backgroundColor:s,color:l},onClick:t=>{t.stopPropagation(),a(e)}},React.createElement("div",{className:"name_ddde4d8"},r)," ",React.createElement("div",{className:"time_c10a237"},c.HHMMFromSeconds(e.time)))}function p({isOpen:e=!1,onCancel:t=(()=>{}),children:a=null}){return e&&React.createElement("div",{className:"modalOverlay_faa7164",onClick:t},React.createElement("div",{className:"modalWindow_fac41c2",onClick:e=>e.stopPropagation()},React.createElement("div",{className:"modalBody_a8134eb"},a)))}function h(){return h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},h.apply(this,arguments)}function g({active:e=!1,disabled:t=!1,children:a="Button",...n}){return React.createElement("span",h({className:"button_c0afaa2 "+(e?"active_b40adfc":"")},n),a)}const f="color_f674b54";function v({name:e,style:t,children:a}){return React.createElement(React.Fragment,null,React.createElement("div",{className:"parameter_dcc1064",style:t},React.createElement("div",null,e),a)," ")}function E({inputRef:e,children:t}){return React.createElement("div",{ref:e,className:"value_f50ce86",contentEditable:"true",suppressContentEditableWarning:!0},t)}function R({colors:e,onChange:t=(()=>{})}){return React.createElement(React.Fragment,null,React.createElement("div",{className:f,style:{backgroundColor:e.background,color:e.color},contentEditable:"true",suppressContentEditableWarning:!0,onBlur:e=>t((t=>({...t,background:e.target.innerText})))},e.background),React.createElement("div",{className:"completed_a56a0e7",style:{backgroundColor:e.background}},e.background),React.createElement("div",{className:f,style:{backgroundColor:"white",color:"black"},contentEditable:"true",suppressContentEditableWarning:!0,onBlur:e=>t((t=>({...t,color:e.target.innerText})))},e.color))}function y({event:e,onExit:t=(()=>{})}){const a=React.useRef(null),n=React.useRef(null),c=React.useRef(null),r=React.useRef(null),i=React.useRef(null),s=React.useRef(null),l=React.useRef(null),o=React.useRef(null),u=React.useRef(null),m=React.useRef(null),p=!e.id;var h=d.projects.findIndex((t=>t.name===e.project));h<0&&(h=0);const[f,y]=React.useState(h),[b,D]=React.useState({...d.projects[f]});return console.log("event",e),React.createElement("div",{className:"form_aaccbc4"},!p&&React.createElement(g,{onClick:()=>{const r={name:a.current.innerText,comment:n.current.innerText,project:c.current.value,start:i.current.innerText,end:o.current.innerText,time:s.current.innerText,duration:l.current.innerText,credit:u.current.innerText,debit:m.current.innerText};d.completeEvent(e.id,e.timestamp,r),t()}},e.completed?"Mark uncompleted":"Complete"),!p&&React.createElement(g,{onClick:()=>{return a=e.id,d.deleteEvent(a),void t();var a}},"Delete"),!p&&React.createElement(g,{onClick:()=>(e=>{const p={name:a.current.innerText,comment:n.current.innerText,project:c.current.value,repeat:r.current.innerText,start:i.current.innerText,end:o.current.innerText,time:s.current.innerText,duration:l.current.innerText,credit:u.current.innerText,debit:m.current.innerText};d.updateEvent(e,p),t()})(e.id)},e.repeat?"Change All":"Change"),p&&React.createElement(g,{onClick:()=>{const e={name:a.current.innerText,comment:n.current.innerText,project:c.current.value,repeat:r.current.innerText,start:i.current.innerText,end:o.current.innerText,time:s.current.innerText,duration:l.current.innerText,credit:u.current.innerText,debit:m.current.innerText};d.addPlannedRawEvent(e),d.clearCache(),t()}},"Add Event"),React.createElement(g,{onClick:()=>{d.projects[f].background=b.background,d.projects[f].color=b.color,d.clearCache(),t()}},"Save Project Color"),React.createElement(g,{onClick:t},"Cancel"),React.createElement("div",{ref:a,className:"name_c4b14a4",contentEditable:"true",suppressContentEditableWarning:!0},e.name??""),React.createElement(v,{name:"comment",style:{width:"100%"}},React.createElement(E,{inputRef:n},e.comment??"")),React.createElement("br",null),React.createElement(v,{name:"project",style:{minWidth:100}},React.createElement("select",{className:"select_b60c21c",ref:c,defaultValue:e.project,onChange:e=>{var t=d.projects.findIndex((t=>t.name===e.target.value));t<0&&(t=0),D({...d.projects[t]}),y(t)}},d.projects.map(((e,t)=>React.createElement("option",{key:t,value:e.name},e.name))))),React.createElement(v,{name:"background/color",style:{minWidth:60}},React.createElement(R,{colors:b,onChange:D})),React.createElement("br",null),React.createElement(v,{name:"repeat",style:{minWidth:120}},React.createElement(E,{inputRef:r},e.repeat)),React.createElement("br",null),React.createElement(v,{name:"start date",style:{minWidth:110}},React.createElement(E,{inputRef:i},e.start?e.start:"")),React.createElement(v,{name:"time",style:{minWidth:60}},React.createElement(E,{inputRef:s},e.time?e.time:"")),React.createElement(v,{name:"duration",style:{minWidth:70}},React.createElement(E,{inputRef:l},e.duration?e.duration:"")),React.createElement(v,{name:"end date",style:{minWidth:110}},React.createElement(E,{inputRef:o},e.end?e.end:"")),React.createElement("br",null),React.createElement(v,{name:"credit",style:{minWidth:120}},React.createElement(E,{inputRef:u},e.credit?e.credit:"")),React.createElement(v,{name:"debit",style:{minWidth:120}},React.createElement(E,{inputRef:m},e.debit?e.debit:"")))}function b(){const[e,t]=React.useState(!1),[a,n]=React.useState(4),r=React.useRef(null),i=React.useRef(null),[l,o]=React.useState({title:"Add new event",name:"New event"}),h=React.useRef(null),f=React.useRef(null),v=c.getBeginDayTimestamp(Date.now()/1e3);let E=c.getBegintWeekTimestamp(Date.now()/1e3);const R=E;E-=7*a*86400,React.useEffect((()=>{h.current.scrollIntoView(!0),f.current.scrollIntoView(!0)}),[]);const b=[];for(let e=0;e<=20;e++){b.push([]);let t=[];for(let a=0;a<=6;a++)b[e].push([]),b[e][a]={timestamp:E,tasks:d.getEventsWithPlaceholders(E,t),actualBalance:d.getActualBalance(E),lastActualBalanceDate:d.lastActualBalanceDate,plannedBalance:d.getPlannedBalance(E),plannedBalanceChange:d.getPlannedBalanceChange(E)},E+=86400}const D=(e,a)=>{""!==a&&(o(s.eventToRaw({name:a,start:e,time:null})),t(!0))},T=e=>{const{id:a,completed:n,start:c}=e,r=(n?d.completed.find((e=>e.id===a)):d.planned.find((e=>e.id===a)))??d.plannedRepeatable.find((e=>e.id===a));o({...s.eventToRaw(r),completed:n,timestamp:c,id:r.id}),t(!0)};return console.log("draw calendar"),React.createElement("div",{className:"wrapper_af90f78"},React.createElement("div",{ref:f,className:"header_e3daf93"},React.createElement(g,null,"Today"),React.createElement("span",{ref:i,className:"monthTitle_a8c3ab6"}),React.createElement("div",{className:"dayOfWeekLabels_cf63ad3"},c.WEEKDAYS.map(((e,t)=>React.createElement("div",{key:t},e))))),React.createElement("div",{className:"CalendarBody_b3637e9",onScroll:e=>{const t=e.target,r=t.scrollTop,s=t.scrollHeight-t.scrollTop-t.clientHeight,l=t.scrollHeight/b.length,o=Math.ceil(r/l-a),d=new Date(1e3*(R+7*o*86400));i.current.innerText=d.getFullYear()+" "+c.MONTHS_FULL[d.getMonth()]+" "+o+" week",r<4*l?n((e=>e+4)):s<4*l&&n((e=>e-4))},ref:r},b.map((e=>React.createElement("div",{ref:e[0].timestamp==R?h:null,className:"CalendarWeek_ef509bf",key:e[0].timestamp,style:{height:1.5*e.reduce(((e,t)=>t.tasks.length>e?t.tasks.length:e),7)+1.4+1.4+1.4+"em"}}," ",e.map(((e,t)=>React.createElement(u,{data:e,key:e.timestamp,today:v===e.timestamp,onAddEvent:D,onDragDrop:t=>((e,t)=>{e.preventDefault();const a=JSON.parse(e.dataTransfer.getData("event_item"));e.ctrlKey?d.copyToDate(a.id,t):d.shiftToDate(a.id,t,a.start),o((e=>({...e})))})(t,e.timestamp)},e.tasks.map(((e,a)=>{return React.createElement(m,{key:a,event:e,days:(n=e.days,c=7-t,n<c?n:c),onClick:T,onDragStart:t=>((e,t)=>{e.dataTransfer.setData("event_item",JSON.stringify(t))})(t,e)});var n,c}))))))))),React.createElement(p,{isOpen:e,onCancel:()=>t(!1)},React.createElement(y,{event:l,onExit:()=>t(!1)})))}function D({menuItems:e=[],iconItems:t=[],navItems:a=[]}){const[n,c]=React.useState(!1);return React.createElement(React.Fragment,null,React.createElement("nav",{className:"navigationbar_f859c3d"},React.createElement("span",{className:"burgermenu_c26f52c",tabIndex:"0",onClick:()=>c((e=>!e)),onBlur:()=>c(!1)},React.createElement("svg",{width:"100%",viewBox:"0 0 12 11"},React.createElement("rect",{width:"12",height:"2",y:"0"}),React.createElement("rect",{width:"12",height:"2",y:"4"}),React.createElement("rect",{width:"12",height:"2",y:"8"})),n&&React.createElement("div",{className:"menu_c9f0c5b"},e.map(((e,t)=>React.createElement("div",{key:t,onClick:e.fn},e.name))))),t.map(((e,t)=>React.createElement("span",{className:"icons_d57fcfa",title:e.name,key:t,onClick:e.fn},e.jsx))),React.createElement("span",{onClick:()=>document.getElementById("root").requestFullscreen()},"Fullscreen")))}function T(){const e=JSON.stringify(d.prepareToStorage());localStorage.setItem("data",e),console.log(e)}async function w(){n.saveFile("data.json",d.prepareToStorage()).then((()=>console.log("save ok"))).catch((()=>alert("Save error")))}function k(){const e=(()=>{const[,e]=React.useState({});return React.useCallback((()=>e({})),[])})(),[a,c]=React.useState(!1);async function r(){try{const t=await n.loadFile("data.json");d.reload(t),e()}catch(e){console.log("Load error",e),alert("Load error")}}React.useEffect((()=>{t.init({onSuccess:()=>{c(t.isLoggedIn())},onSignIn:()=>{c(t.isLoggedIn()),console.log("onSignIn",t.isLoggedIn())}})}),[]);let i=[],s=[];return i.push({name:"Save to LocalStorage",fn:T}),s.push({name:"Save to LocalStorage",jsx:React.createElement("svg",{width:"100%",viewBox:"0 0 76 76"},React.createElement("path",{fill:"none",d:"m3 10a7 7 0 017-7l54 0a7 7 0 017 7l0 56a7 7 0 01-7 7l-54 0a7 7 0 01-7-7l0-56m14-7 0 22a4 4 0 004 4l32 0a4 4 0 004-4l0-22m-9 7a1 1 0 00-6 0l0 12a1 1 0 006 0l0-12"})),fn:T}),a?(i.push({name:"Logout",fn:t.logOut}),i.push({name:"Save to Google Drive",fn:w}),s.push({name:"Save to Google Drive",jsx:React.createElement("svg",{width:"100%",viewBox:"0 0 76 76"},React.createElement("path",{fill:"none",strokeLinecap:"round",d:"m15 44a1 1 0 010-25 11 11 0 0117-8 13 13 0 0125 4 1 1 0 013 29m-3 10a1 1 0 00-39 0 1 1 0 0039 0m-10-2-9-9-9 9m9 13 0-22"})),fn:w}),i.push({name:"Load from Google Drive",fn:r}),s.push({name:"Load from Google Drive",jsx:React.createElement("svg",{width:"100%",viewBox:"0 0 76 76"},React.createElement("path",{fill:"none",strokeLinecap:"round",d:"m15 44a1 1 0 010-25 11 11 0 0117-8 13 13 0 0125 4 1 1 0 013 29m-3 10a1 1 0 00-39 0 1 1 0 0039 0m-10 2-9 9-9-9m9 9 0-22"})),fn:r})):i.push({name:"Login",fn:t.logIn}),i.push({name:"Projects",fn:()=>{}}),console.log("app"),React.createElement("div",{className:"page_d7bcb36"},React.createElement(D,{menuItems:i,iconItems:s}),React.createElement(b,null))}ReactDOM.render(React.createElement(k,null),document.getElementById("root"))})();