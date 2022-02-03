(()=>{"use strict";class e{static WEEKDAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];static MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];static MONTHS_FULL=["January","February","March","April","May","June","July","August","September","October","November","December"];static startWeek=1;static timezone=3;static initLocale(t=3,a=1){e.timezone=t,e.startWeek=a}static getDayMonthWeekday(e){const t=new Date(1e3*e);return{day:t.getDate(),month:t.getMonth(),weekday:t.getDay()}}static getWeekday(e){return new Date(1e3*e).getDay()}static getBegintWeekTimestamp(t){const a=new Date(1e3*t);a.setHours(0,0,0,0);const n=a.getDate();let c=a.getDay()-e.startWeek;return c<0&&(c+=7),a.setDate(n-c)/1e3}static getBeginDayTimestamp=e=>new Date(1e3*e).setHours(0,0,0,0)/1e3;static getEndDayTimestamp=t=>86400*~~((t+3600*e.timezone)/86400)-3600*e.timezone+86399;static getTime=t=>t-e.getBeginDayTimestamp(t);static getTimeToEndDay=t=>e.getBeginDayTimestamp(t)+86399-t;static getDifferenceInDays=(t,a)=>(e.getBeginDayTimestamp(a)-e.getBeginDayTimestamp(t))/86400;static getTimeString(e){const t=new Date(1e3*e),a=t.getUTCHours(),n=t.getUTCMinutes();return a+(n>9?":":":0")+n}static getYYYYMMDD(e){const t=new Date(1e3*e),a=t.getFullYear(),n=t.getMonth()+1,c=t.getDate();return a+(n>9?"-":"-0")+n+(c>9?"-":"-0")+c}static getHHMM(e){const t=new Date(1e3*e),a=t.getHours(),n=t.getMinutes();return(a>9?"":"0")+a+(n>9?":":":0")+n}static getYYYYMMDDTHHMM(e){const t=new Date(1e3*e),a=t.getFullYear(),n=t.getMonth()+1,c=t.getDate(),r=t.getHours(),i=t.getMinutes();return a+(n>9?"-":"-0")+n+(c>9?"-":"-0")+c+(r>9?"T":"T0")+r+(i>9?":":":0")+i}static HHMMToSeconds(e){if(!e)return 0;const[t,a]=e.split(":",2);return 60*(60*t+ +a)}static DDHHMMToSeconds(t){const[a,n]=t.split("d",2);return void 0===n?e.HHMMToSeconds(a):86400*a+e.HHMMToSeconds(n)}static HHMMFromSeconds(e){if(null===e)return"";const t=~~(e%3600/60);return~~(e/3600)+(t>9?":":":0")+t}static DDHHMMFromSeconds(t){if(t<0)return"";const a=~~(t/86400);return(a<1?"":a+"d ")+e.HHMMFromSeconds(t%86400)}}function t(e,t,a=31,n=1){const[c,r=null]=t.split("-",2);if(null===r){const[c,r=null]=t.split("/",2);if(""===c||""===r)return e;const i="*"===c?n:+c;let s=+r;if(isNaN(i)||isNaN(s))return e;if(null===r&&"*"!==c)return e.push(+c),e;0===s&&(s=1);for(let t=i;t<=a;t+=s)e.push(t);return e}if(""===c||""===r)return e;for(let t=+c;t<=+r;t++)e.push(t);return e}class a{static isMatch(a,n,c){const{day:r,month:i,weekday:s}=e.getDayMonthWeekday(c),[l=null,d="*",o="*"]=a.trim().split(" ",3);if(null===l)return!1;if("/"===l[0]){const t=~~((c-e.getBeginDayTimestamp(n))/86400);return!(t<0)&&t%+l.substring(1)==0}const u=l.split(",").reduce(((e,a)=>t(e,a)),[]),m=d.split(",").reduce(((e,a)=>t(e,a,12)),[]),p=o.split(",").reduce(((e,a)=>t(e,a,7,0)),[]);return!!(m.includes(i+1)&&u.includes(r)&&p.includes(s))}static ariseInInterval(e,t,a,n){for(var c=a;c<n;c+=86400)if(this.isMatch(e,t,c))return!0;return!1}}class n{static default_background="lightgray";static default_color="black";static asanaToEvent=t=>{const a=t.split('"').map(((e,t)=>t%2==0?e:e.replace(/,/g,"."))).join('"'),[n,c,r,i,s,l,d,o,u,m,p,h,g,f,v]=a.split(","),E={name:s.replace(/"/g,""),start:m,comment:h.replace(/"/g,""),project:g},R=e.getBeginDayTimestamp(new Date(E.start)/1e3);return{name:""===E.name?"без названия":E.name,comment:E.comment??"",project:E.project??"",start:R,time:null,duration:0,end:R+86400,credit:0,debit:0,completed:""!==r}};eventToCompact=(e,t,a)=>{const n={id:e.id,name:e.name,background:this.projects[e.projectId].background,color:this.projects[e.projectId].color,start:e.start,time:e.time,end:e.end,days:Math.ceil((e.end-t)/86400),credit:e.credit,debit:e.debit,completed:a,repeatable:!1};return e.repeat&&(n.start=t,n.end=t+86400,n.days=1,n.repeatable=!0),n};rawToEvent=t=>{const a=e.getBeginDayTimestamp(new Date(t.start)/1e3),n=t.time?e.HHMMToSeconds(t.time):null,c=t.duration?e.DDHHMMToSeconds(t.duration):0;var r=t.project?this.projects.findIndex((e=>e.name===t.project)):0;if(r<0&&(r=0),t.repeat)return{name:t.name,comment:t.comment??"",project:t.project??"",projectId:r,repeat:t.repeat,start:a,time:n,duration:c,end:t.end?e.getBeginDayTimestamp(new Date(t.end)/1e3):0,credit:t.credit??0,debit:t.debit??0};const i=c?(null!==n?a+n:a)+c:t.end?e.getBeginDayTimestamp(new Date(t.end)/1e3):a+86400;return{name:t.name,comment:t.comment??"",project:t.project??"",projectId:r,start:a,time:n,duration:c,end:i,credit:t.credit??0,debit:t.debit??0}};static eventToRaw=t=>{const a={};return a.name=t.name,t.comment&&(a.comment=t.comment),t.project&&(a.project=t.project),a.start=e.getYYYYMMDD(t.start),null!==t.time&&(a.time=e.HHMMFromSeconds(t.time)),t.repeat?(a.repeat=t.repeat,t.duration&&(a.duration=e.DDHHMMFromSeconds(t.duration)),t.end&&(a.end=e.getYYYYMMDD(t.end))):t.duration?a.duration=e.DDHHMMFromSeconds(t.duration):t.end&&t.end-t.start!=86400&&(a.end=e.getYYYYMMDD(t.end)),t.credit&&(a.credit=t.credit),t.debit&&(a.debit=t.debit),a};constructor({completedList:e=[],plannedList:t=[],projectsList:a=[]}){this.cachedEvents=[],this.cachedActualBalance=[],this.cachedPlannedBalance=[],this.lastId=1,this.projects=[{name:"Default",background:n.default_background,color:n.default_color},...a],this.completed=[],e.forEach((e=>{const t=this.rawToEvent(e);this.addCompletedEvent(t)})),this.planned=[],this.plannedRepeatable=[],t.forEach((e=>this.addPlannedRawEvent(e))),this.sort(),this.lastActualBalance=this.calculateActualBalance(),this.lastActualBalanceDate=this.completed.length?this.completed[this.completed.length-1].start:0,this.firstActualBalanceDate=this.completed.length?this.completed[0].start:0}reload({completedList:e=[],plannedList:t=[],projectsList:a=[]}){this.cachedEvents=[],this.cachedActualBalance=[],this.cachedPlannedBalance=[],this.lastId=1,this.projects=[{name:"Default",background:n.default_background,color:n.default_color},...a],this.completed=[],e.forEach((e=>{const t=this.rawToEvent(e);this.addCompletedEvent(t)})),this.planned=[],this.plannedRepeatable=[],t.forEach((e=>this.addPlannedRawEvent(e))),this.sort(),this.lastActualBalance=this.calculateActualBalance(),this.lastActualBalanceDate=this.completed.length?this.completed[this.completed.length-1].start:0,this.firstActualBalanceDate=this.completed.length?this.completed[0].start:0}addCompletedEvent(e){this.completed.push({id:this.lastId++,name:e.name,comment:e.comment,project:e.project,projectId:e.projectId,start:e.start,time:e.time,duration:e.duration,end:e.end,days:Math.ceil((e.end-e.start)/86400),credit:e.credit,debit:e.debit})}addPlannedRawEvent(e){this.addPlannedEvent(this.rawToEvent(e))}addPlannedEvent(e){e.repeat?this.plannedRepeatable.push({id:this.lastId++,name:e.name,comment:e.comment,project:e.project,projectId:e.projectId,repeat:e.repeat,start:e.start,time:e.time,duration:e.duration,end:e.end,days:1,credit:e.credit,debit:e.debit}):this.planned.push({id:this.lastId++,name:e.name,comment:e.comment,project:e.project,projectId:e.projectId,start:e.start,time:e.time,duration:e.duration,end:e.end,days:Math.ceil((e.end-e.start)/86400),credit:e.credit,debit:e.debit})}clearCache(){this.cachedEvents=[],this.cachedActualBalance=[],this.cachedPlannedBalance=[],this.lastActualBalance=this.calculateActualBalance(),this.lastActualBalanceDate=this.completed.length?this.completed[this.completed.length-1].start:0,this.firstActualBalanceDate=this.completed.length?this.completed[0].start:0}deleteEvent(e){this.completed=this.completed.filter((t=>t.id!==e)),this.planned=this.planned.filter((t=>t.id!==e)),this.plannedRepeatable=this.plannedRepeatable.filter((t=>t.id!==e)),this.clearCache()}completeEvent(e,t,n={}){var c=this.completed.find((t=>t.id===e));if(void 0!==c)return this.addPlannedEvent({...c,...this.rawToEvent(n)}),this.sort(),void this.deleteEvent(c.id);if(void 0!==(c=this.planned.find((t=>t.id===e))))return this.addCompletedEvent({...c,...this.rawToEvent(n)}),this.sort(),void this.deleteEvent(c.id);if(void 0!==(c=this.plannedRepeatable.find((t=>t.id===e)))){const e=((e,t,a)=>({id:e,name:t.name,comment:t.comment,project:t.project,projectId:t.projectId,start:a,time:t.time,end:a+86400,days:1,credit:t.credit,debit:t.debit}))(this.lastId++,{...c,...this.rawToEvent(n)},t);if(this.completed.push(e),a.ariseInInterval(c.repeat,c.start,c.start,t)){const e={...c,end:t,id:this.lastId++};this.plannedRepeatable.push(e)}if("/"==c.repeat[0]){const e=+c.repeat.substr(1);c.start=t+86400*e}else c.start=t+86400;return c.end&&!a.ariseInInterval(c.repeat,c.start,c.start,c.end)&&this.deleteEvent(c.id),this.sort(),void this.clearCache()}}updateEvent(e,t){var a=this.completed.find((t=>t.id===e));return void 0!==a?(this.addCompletedEvent(this.rawToEvent(t)),this.sort(),void this.deleteEvent(e)):void 0!==(a=this.planned.find((t=>t.id===e)))||void 0!==(a=this.plannedRepeatable.find((t=>t.id===e)))?(this.addPlannedEvent(this.rawToEvent(t)),this.sort(),void this.deleteEvent(e)):void 0}shiftToDate(e,t,a){var n=this.completed.find((t=>t.id===e));if(void 0!==n){const e=t-n.start;return n.start=t,n.end=n.end?n.end+e:n.end,this.sort(),void this.clearCache()}if(void 0!==(n=this.planned.find((t=>t.id===e)))){const e=t-n.start;return n.start=t,n.end=n.end?n.end+e:n.end,this.sort(),void this.clearCache()}if(void 0!==(n=this.plannedRepeatable.find((t=>t.id===e)))){if("/"!==n.repeat[0]||n.start!==a)return;const e=t-a;return n.start=n.start+e,n.end=n.end?n.end+e:n.end,this.sort(),void this.clearCache()}}copyToDate(e,t){var a=this.completed.find((t=>t.id===e));if(void 0!==a){const e=t-a.start,n={...a,start:t,end:a.end?a.end+e:a.end};return this.addCompletedEvent(n),this.sort(),void this.clearCache()}if(void 0!==(a=this.planned.find((t=>t.id===e)))){const e=t-a.start,n={...a,start:t,end:a.end?a.end+e:a.end};return this.addPlannedEvent(n),this.sort(),void this.clearCache()}if(void 0!==(a=this.plannedRepeatable.find((t=>t.id===e)))){a.start;const e={...a,repeat:"",start:t,end:t+86400};return this.addPlannedEvent(e),this.sort(),void this.clearCache()}}sort(){this.completed.sort(((e,t)=>{const a=e.start-t.start;return 0===a?t.days-e.days:a})),this.planned.sort(((e,t)=>{const a=e.start-t.start;return 0===a?t.days-e.days:a})),this.plannedRepeatable.sort(((e,t)=>e.time-t.time))}getEvents(e){if(void 0!==this.cachedEvents[e])return this.cachedEvents[e];const t=this.planned.reduce(((t,a)=>(e<a.start||e>=a.end||t.push(this.eventToCompact(a,e,!1)),t)),[]);return this.plannedRepeatable.reduce(((t,n)=>(e<n.start||n.end&&e+n.time>=n.end||a.isMatch(n.repeat,n.start,e)&&t.push(this.eventToCompact(n,e,!1)),t)),t),this.completed.reduce(((t,a)=>(e>=a.start&&e<a.end&&t.push(this.eventToCompact(a,e,!0)),t)),t),t.sort(((e,t)=>{var a=e.start-t.start;return a||(a=t.end-t.start-(e.end-e.start))||e.time-t.time})),this.cachedEvents[e]=t,t}getEventsWithPlaceholders(e,t=[],a=[]){for(;t.length>0&&!(e<t[t.length-1].end);)t.pop();return t.forEach((e=>a.push({id:-1}))),this.getEvents(e).reduce(((e,a)=>(t.some((e=>a.id===e.id))||(a.days>1&&t.push({id:a.id,end:a.end}),e.push(a)),e)),a),a}getPlannedEventsFilteredBySkip(e,t=[],a=[]){for(;t.length>0&&!(e<t[t.length-1].end);)t.pop();this.getEvents(e).reduce(((e,a)=>(t.some((e=>a.id===e.id))||a.completed||(a.days>1&&t.push({id:a.id,end:a.end}),e.push(a)),e)),a)}getPlannedEventsInInterval(e,t){const a=[],n=[];for(let c=e;c<t;c+=86400)this.getPlannedEventsFilteredBySkip(c,n,a);return a}calculateActualBalance(){return this.completed.reduce(((e,t)=>e+(t.credit-t.debit)),0)}getActualBalance(e){if(e<this.firstActualBalanceDate)return 0;if(e>this.lastActualBalanceDate)return this.lastActualBalance;if(void 0!==this.cachedActualBalance[e])return this.cachedActualBalance[e];const t=this.completed.reduce(((t,a)=>(e>a.start+a.time&&(t+=a.credit-a.debit),t)),0);return this.cachedActualBalance[e]=t,t}getPlannedBalance(e){if(e<this.firstActualBalanceDate)return 0;if(e<=this.lastActualBalanceDate)return this.getActualBalance(e);if(void 0!==this.cachedPlannedBalance[e])return this.cachedPlannedBalance[e];const t=this.getPlannedEventsInInterval(this.lastActualBalanceDate,e).reduce(((e,t)=>e+(t.credit-t.debit)),this.lastActualBalance);return this.cachedPlannedBalance[e]=t,t}getPlannedBalanceChange(e){return this.getEvents(e).reduce(((e,t)=>e+(t.credit-t.debit)),0)}prepareToStorage(){const e=this.completed.map((e=>n.eventToRaw(e))),t=this.plannedRepeatable.reduce(((e,t)=>(e.push(n.eventToRaw(t)),e)),[]);return this.planned.reduce(((e,t)=>(e.push(n.eventToRaw(t)),e)),t),{projectsList:this.projects.slice(1),completedList:e,plannedList:t}}}function c(e,t){return new Promise(((a,n)=>{e(t).then((e=>{e&&(e.status<200||e.status>299)?(console.log("GAPI call returned bad status",e),n(e)):a(e)}),(e=>{console.log("GAPI call failed",e),n(e)}))}))}class r{static init({onSuccess:e=(()=>{}),onFailure:t=(()=>{}),onSignIn:a=(()=>{})}){gapi.load("client:auth2",(()=>{gapi.client.init({apiKey:"AIzaSyDRPEe6LBi-O697m5NPCxhn8swqHm3ExEg",clientId:"153901704601-4n12u2s1bup0sinlesv6aetfgjdsldt2.apps.googleusercontent.com",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],scope:"https://www.googleapis.com/auth/drive.appfolder"}).then((()=>{console.log("Init GAPI client ok"),gapi.auth2.getAuthInstance().isSignedIn.listen(a),e()}),(e=>{console.log("Failed to init GAPI client",e),t()}))}))}static isGapiLoaded=()=>gapi&&gapi.auth2;static logIn=()=>{r.isGapiLoaded()&&gapi.auth2.getAuthInstance().signIn()};static logOut=()=>{r.isGapiLoaded()&&gapi.auth2.getAuthInstance().signOut()};static isLoggedIn=()=>r.isGapiLoaded()&&gapi.auth2.getAuthInstance().isSignedIn.get();static async createEmptyFile(e,t){return(await c(gapi.client.drive.files.create,{resource:{name:e,mimeType:t||"text/plain",parents:["appDataFolder"]},fields:"id"})).result.id}static async upload(e,t){return c(gapi.client.request,{path:`/upload/drive/v3/files/${e}`,method:"PATCH",params:{uploadType:"media"},body:"string"==typeof t?t:JSON.stringify(t)})}static async download(e){const t=await c(gapi.client.drive.files.get,{fileId:e,alt:"media"});return t.result||t.body}static async find(e){let t,a=[];do{const n=await c(gapi.client.drive.files.list,{spaces:"appDataFolder",fields:"files(id, name), nextPageToken",pageSize:100,pageToken:t,orderBy:"createdTime",q:e});a=a.concat(n.result.files),t=n.result.nextPageToken}while(t);return a}static async deleteFile(e){try{return await c(gapi.client.drive.files.delete,{fileId:e}),!0}catch(e){if(404===e.status)return!1;throw e}}}const i=localStorage.getItem("data");console.log("localStorage",i);const s=JSON.parse(i),l=new n(s);function d({data:t,today:a=!1,onAddEvent:n=(()=>{}),onDragDrop:c=(e=>{}),children:r=null}){const{timestamp:i,actualBalance:s,plannedBalance:d,plannedBalanceChange:o}=t,u=React.useRef(null),{day:m,month:p}=e.getDayMonthWeekday(i),h=e=>(e/1e3).toFixed(1);return React.createElement("div",{className:i>=l.lastActualBalanceDate?"day_d84e778":"before_actual_date_fb6a4cf",onClick:function(e){u&&u.current.focus()},onDrop:c,onDragOver:e=>{e.preventDefault(),e.ctrlKey?e.dataTransfer.dropEffect="copy":e.dataTransfer.dropEffect="move"}},React.createElement("div",{className:a?"today_ded7894":"header_d741756"},m+(1==m?" "+e.MONTHS[p]:"")),React.createElement("div",{className:"balance_c271232"},h(d)+(0==o?"k":((g=o/1e3)>0?"+"+g.toFixed(1):g.toFixed(1))+"k")+" "+h(s)),r,React.createElement("div",{ref:u,className:"input_f2f0e78",contentEditable:"true",suppressContentEditableWarning:!0,onBlur:function(e){n(i,e.target.innerText),e.target.innerText=""},onKeyDown:function(e){"Enter"==e.key&&e.target.blur()}}));var g}function o({event:t,days:a,onClick:n=(e=>{}),onDragStart:c=(e=>{})}){const{name:r,completed:i,background:s,color:l,repeatable:d}=t;return-1===t.id?React.createElement("div",{className:"placeholder_c47b4a3"}):React.createElement("div",{className:i?"completed_b30da5e":d?"repeatable_ca186f6":"item_bb964bd",draggable:!0,onDragStart:c,style:{width:1==a?"calc(100% + 2px)":"calc("+a+" * (100% + 1px) + 1px )",backgroundColor:s,color:l},onClick:e=>{e.stopPropagation(),n(t)}},React.createElement("div",{className:"name_ddde4d8"},r)," ",React.createElement("div",{className:"time_c10a237"},e.HHMMFromSeconds(t.time)))}function u({isOpen:e=!1,onCancel:t=(()=>{}),children:a=null}){return e&&React.createElement("div",{className:"modalOverlay_faa7164",onClick:t},React.createElement("div",{className:"modalWindow_fac41c2",onClick:e=>e.stopPropagation()},React.createElement("div",{className:"modalBody_a8134eb"},a)))}function m(){return m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},m.apply(this,arguments)}function p({active:e=!1,disabled:t=!1,children:a="Button",...n}){return React.createElement("span",m({className:"button_c0afaa2 "+(e?"active_b40adfc":"")},n),a)}const h="color_f674b54";function g({name:e,style:t,children:a}){return React.createElement(React.Fragment,null,React.createElement("div",{className:"parameter_dcc1064",style:t},React.createElement("div",null,e),a)," ")}function f({inputRef:e,children:t}){return React.createElement("div",{ref:e,className:"value_f50ce86",contentEditable:"true",suppressContentEditableWarning:!0},t)}function v({colorRef:e}){const[t,a]=React.useState(e.current);return React.createElement(React.Fragment,null,React.createElement("div",{className:h,style:{backgroundColor:t.background,color:t.color},contentEditable:"true",suppressContentEditableWarning:!0,onBlur:t=>{e.current.background=t.target.innerText,a((e=>({...e,background:t.target.innerText})))}},t.background),React.createElement("div",{className:"completed_a56a0e7",style:{backgroundColor:t.background}},t.background),React.createElement("div",{className:h,style:{backgroundColor:"white",color:"black"},contentEditable:"true",suppressContentEditableWarning:!0,onBlur:t=>{e.current.color=t.target.innerText,a((e=>({...e,color:t.target.innerText})))}},t.color))}function E({event:e,onExit:t=(()=>{})}){const a=React.useRef(null),n=React.useRef(null),c=React.useRef(null),r=React.useRef(null),i=React.useRef(null),s=React.useRef(null),d=React.useRef(null),o=React.useRef(null),u=React.useRef(null),m=React.useRef(null),h=!e.id;var E=l.projects.findIndex((t=>t.name===e.project));E<0&&(E=0);const R=React.useRef({...l.projects[E]});return console.log("event",e),React.createElement("div",{className:"form_aaccbc4"},!h&&React.createElement(p,{onClick:()=>{const r={name:a.current.innerText,comment:n.current.innerText,project:c.current.value,start:i.current.innerText,end:o.current.innerText,time:s.current.innerText,duration:d.current.innerText,credit:u.current.innerText,debit:m.current.innerText};l.completeEvent(e.id,e.timestamp,r),t()}},e.completed?"Mark uncompleted":"Complete"),!h&&React.createElement(p,{onClick:()=>{return a=e.id,l.deleteEvent(a),void t();var a}},"Delete"),!h&&React.createElement(p,{onClick:()=>(e=>{const p={name:a.current.innerText,comment:n.current.innerText,project:c.current.value,repeat:r.current.innerText,start:i.current.innerText,end:o.current.innerText,time:s.current.innerText,duration:d.current.innerText,credit:u.current.innerText,debit:m.current.innerText};l.updateEvent(e,p),t()})(e.id)},e.repeat?"Change All":"Change"),h&&React.createElement(p,{onClick:()=>{const e={name:a.current.innerText,comment:n.current.innerText,project:c.current.value,repeat:r.current.innerText,start:i.current.innerText,end:o.current.innerText,time:s.current.innerText,duration:d.current.innerText,credit:u.current.innerText,debit:m.current.innerText};l.addPlannedRawEvent(e),l.clearCache(),t()}},"Add Event"),React.createElement(p,{onClick:()=>{l.projects[E].background=R.current.background,l.projects[E].color=R.current.color,l.clearCache(),t()}},"Save Project Color"),React.createElement(p,{onClick:t},"Cancel"),React.createElement("div",{ref:a,className:"name_c4b14a4",contentEditable:"true",suppressContentEditableWarning:!0},e.name??""),React.createElement(g,{name:"comment",style:{width:"100%"}},React.createElement(f,{inputRef:n},e.comment??"")),React.createElement("br",null),React.createElement(g,{name:"project",style:{minWidth:100}},React.createElement("select",{className:"select_b60c21c",ref:c,defaultValue:e.project},l.projects.map(((e,t)=>React.createElement("option",{key:t,value:e.name},e.name))))),React.createElement(g,{name:"background/color",style:{minWidth:60}},React.createElement(v,{colorRef:R})),React.createElement("br",null),React.createElement(g,{name:"repeat",style:{minWidth:120}},React.createElement(f,{inputRef:r},e.repeat)),React.createElement("br",null),React.createElement(g,{name:"start date",style:{minWidth:110}},React.createElement(f,{inputRef:i},e.start?e.start:"")),React.createElement(g,{name:"time",style:{minWidth:60}},React.createElement(f,{inputRef:s},e.time?e.time:"")),React.createElement(g,{name:"duration",style:{minWidth:70}},React.createElement(f,{inputRef:d},e.duration?e.duration:"")),React.createElement(g,{name:"end date",style:{minWidth:110}},React.createElement(f,{inputRef:o},e.end?e.end:"")),React.createElement("br",null),React.createElement(g,{name:"credit",style:{minWidth:120}},React.createElement(f,{inputRef:u},e.credit?e.credit:"")),React.createElement(g,{name:"debit",style:{minWidth:120}},React.createElement(f,{inputRef:m},e.debit?e.debit:"")))}async function R(e){var t=localStorage.getItem(e);if(t)return t;const a=await r.find('name = "'+e+'"');return t=a.length>0?a[0].id:await r.createEmptyFile(e),localStorage.setItem(e,t),t}class y{static async saveFile(e,t){if(r.isLoggedIn()){const a=await R(e);await r.upload(a,t)}}static async loadFile(e){if(r.isLoggedIn()){const t=await R(e);return await r.download(t)}}}function b(){const[t,a]=React.useState(!1),[c,i]=React.useState(4),s=React.useRef(null),m=React.useRef(null),[h,g]=React.useState({title:"Add new event",name:"New event"}),f=React.useRef(null),v=e.getBeginDayTimestamp(Date.now()/1e3);let R=e.getBegintWeekTimestamp(Date.now()/1e3);const b=R;R-=7*c*86400,React.useEffect((()=>{f.current.scrollIntoView(!0)}),[]);const T=[];for(let e=0;e<=20;e++){T.push([]);let t=[];for(let a=0;a<=6;a++)T[e].push([]),T[e][a]={timestamp:R,tasks:l.getEventsWithPlaceholders(R,t),actualBalance:l.getActualBalance(R),plannedBalance:l.getPlannedBalance(R),plannedBalanceChange:l.getPlannedBalanceChange(R)},R+=86400}const D=(e,t)=>{""!==t&&(g(n.eventToRaw({name:t,start:e,time:null})),a(!0))},k=e=>{const{id:t,completed:c,start:r}=e,i=(c?l.completed.find((e=>e.id===t)):l.planned.find((e=>e.id===t)))??l.plannedRepeatable.find((e=>e.id===t));g({...n.eventToRaw(i),completed:c,timestamp:r,id:i.id}),a(!0)};return console.log("draw calendar"),React.createElement("div",{className:"wrapper_af90f78"},React.createElement("div",{className:"header_e3daf93"},React.createElement(p,{onClick:document.body.requestFullscreen()},"FullScr"),React.createElement(p,{onClick:r.logOut},"Logout"),React.createElement(p,{onClick:()=>{const e=JSON.stringify(l.prepareToStorage());localStorage.setItem("data",e),console.log(e)}},"Save>LS"),React.createElement(p,{onClick:async()=>{y.saveFile("data.json",l.prepareToStorage()).then((()=>console.log("save ok"))).catch((()=>console.log("save error")))}},"Save>GD"),React.createElement(p,{onClick:async()=>{const e=await y.loadFile("data.json");l.reload(e),console.log(l),g((e=>({...e})))}},"Load<GD"),React.createElement(p,null,"Today"),React.createElement("span",{ref:m,className:"monthTitle_a8c3ab6"})),React.createElement("div",{className:"dayOfWeekLabels_cf63ad3"},e.WEEKDAYS.map(((e,t)=>React.createElement("div",{key:t},e)))),React.createElement("div",{className:"CalendarBody_b3637e9",onScroll:t=>{const a=t.target,n=a.scrollTop,r=a.scrollHeight-a.scrollTop-a.clientHeight,s=Math.ceil(n/151-c),l=new Date(1e3*(b+7*s*86400));m.current.innerText=l.getFullYear()+" "+e.MONTHS_FULL[l.getMonth()]+" "+s+" week",n<600?i((e=>e+4)):r<600&&i((e=>e-4))},ref:s},T.map((e=>React.createElement("div",{ref:e[0].timestamp==b?f:null,className:"CalendarWeek_ef509bf",key:e[0].timestamp,style:{height:14*e.reduce(((e,t)=>t.tasks.length>e?t.tasks.length:e),7)+31+19}}," ",e.map(((e,t)=>React.createElement(d,{data:e,key:e.timestamp,today:v===e.timestamp,onAddEvent:D,onDragDrop:t=>((e,t)=>{e.preventDefault();const a=JSON.parse(e.dataTransfer.getData("event_item"));e.ctrlKey?l.copyToDate(a.id,t):l.shiftToDate(a.id,t,a.start),g((e=>({...e})))})(t,e.timestamp)},e.tasks.map(((e,a)=>{return React.createElement(o,{key:a,event:e,days:(n=e.days,c=7-t,n<c?n:c),onClick:k,onDragStart:t=>((e,t)=>{e.dataTransfer.setData("event_item",JSON.stringify(t)),console.log("drag start",e,t)})(t,e)});var n,c}))))))))),React.createElement(u,{isOpen:t,onCancel:()=>a(!1)},React.createElement(E,{event:h,onExit:()=>a(!1)})))}function T(){return React.createElement(React.Fragment,null,React.createElement(p,{onClick:r.logIn},"Log in"),React.createElement(p,{onClick:r.logOut},"Log out"))}function D(){const[e,t]=React.useState(!1);return React.useEffect((()=>{r.init({onSuccess:()=>t(r.isLoggedIn()),onSignIn:()=>{t(r.isLoggedIn()),console.log("onSignIn",r.isLoggedIn())}})}),[]),console.log("app"),e?React.createElement(b,null):React.createElement(T,null)}ReactDOM.render(React.createElement(D,null),document.getElementById("root"))})();