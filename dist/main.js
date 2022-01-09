(()=>{"use strict";class e{static WEEKDAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];static MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];static MONTHS_FULL=["January","February","March","April","May","June","July","August","September","October","November","December"];static startWeek=1;static timezone=3;static initLocale(t=3,a=1){e.timezone=t,e.startWeek=a}static getDayMonthWeekday(e){const t=new Date(1e3*e);return{day:t.getDate(),month:t.getMonth(),weekday:t.getDay()}}static getWeekday(e){return new Date(1e3*e).getDay()}static getBegintWeekTimestamp(t){const a=new Date(1e3*t);a.setHours(0,0,0,0);const n=a.getDate();let c=a.getDay()-e.startWeek;return c<0&&(c+=7),a.setDate(n-c)/1e3}static getBeginDayTimestamp=e=>new Date(1e3*e).setHours(0,0,0,0)/1e3;static getEndDayTimestamp=t=>86400*~~((t+3600*e.timezone)/86400)-3600*e.timezone+86399;static getTime=t=>t-e.getBeginDayTimestamp(t);static getTimeToEndDay=t=>e.getBeginDayTimestamp(t)+86399-t;static getDifferenceInDays=(t,a)=>(e.getBeginDayTimestamp(a)-e.getBeginDayTimestamp(t))/86400;static getTimeString(e){const t=new Date(1e3*e),a=t.getUTCHours(),n=t.getUTCMinutes();return a+(n>9?":":":0")+n}}function t({timestamp:t,dayHeight:a,actualBalance:n,plannedBalance:c,plannedBalanceChange:s,onAddEvent:r=(()=>{}),children:i=null}){const d=React.useRef(null),{day:l,month:m}=e.getDayMonthWeekday(t),o=e=>(e/1e3).toFixed(1);return React.createElement("div",{className:"CalendarDay_afb7130",style:{height:a},onClick:function(e){d&&d.current.focus()}},React.createElement("div",{className:"CalendarDayHeader_ce37fdc"},l+(1==l?" "+e.MONTHS[m]:"")),React.createElement("div",{className:"balance_c271232"},React.createElement("span",{className:"plannedBalance_dee8e33"},o(c)+(0==s?"k":((u=s/1e3)>0?"+"+u.toFixed(1):u.toFixed(1))+"k"))," ",React.createElement("span",{className:"actualBalance_c28974d"},o(n))),React.createElement("div",{className:"CalendarDayTasks"}," ",i," "),React.createElement("div",{className:"DayTaskInput_c3fce47"},React.createElement("input",{ref:d,rows:1,wrap:"off",onBlur:function(e){r(t,e.target.value),e.target.value=""},onKeyDown:function(e){13===e.keyCode&&e.target.blur()}})));var u}function a({name:t,days:a,time:n=0}){return React.createElement("div",{className:"EventItem_b1f2ae7",style:{width:1==a?"calc(100% + 2px)":"calc("+a+" * (100% + 1px) + 1px )"}},React.createElement("span",null,t),React.createElement("span",{className:"EventTime_f0aa565"},e.getTimeString(n)))}function n(){return React.createElement("div",{className:"EventPlaceholder_b109d15"})}function c(e,t,a=31,n=1){const[c,s=null]=t.split("-",2);if(null===s){const[c,s=null]=t.split("/",2);if(""===c||""===s)return e;const r="*"===c?n:+c;let i=+s;if(isNaN(r)||isNaN(i))return e;if(null===s&&"*"!==c)return e.push(+c),e;0===i&&(i=1);for(let t=r;t<=a;t+=i)e.push(t);return e}if(""===c||""===s)return e;for(let t=+c;t<=+s;t++)e.push(t);return e}class s{static getStartDay=t=>e.getBeginDayTimestamp(t.start);static getStartTime=t=>e.getTime(t.start);static getEnd=t=>void 0!==t.end?t.end:void 0!==t.duration?t.start+60*t.duration:e.getEndDayTimestamp(t.start);static getEndDayOfEnd=t=>e.getEndDayTimestamp(s.getEnd(t));static getDuration=t=>void 0!==t.end?t.end-t.start:void 0!==t.duration?60*t.duration:e.getTimeToEndDay(t.start);static getDurationInDays=t=>{const a=void 0!==t.end?(e.getEndDayTimestamp(t.end)-e.getBeginDayTimestamp(t.start))/86400:void 0!==t.duration?(e.getEndDayTimestamp(t.start+60*t.duration)-e.getBeginDayTimestamp(t.start))/86400:1;return Math.ceil(a)};static isRepeatable=e=>void 0!==e.repeat;static isIncludes=(e,t)=>t>=s.getStartDay(e)&&t<s.getEndDayOfEnd(e);static toPlannedEventItem=(e,t,a)=>({id:e,name:t.name,time:s.getStartTime(t),days:a,debit:t.debit??0,credit:t.credit??0});static toActualEventItem=(e,t,a)=>({id:e,name:t.name,time:s.getStartTime(t),days:a,debit:t.debit??0,credit:t.credit??0})}const r=e=>new Date(1e3*e).toLocaleString(),i=(t,a)=>({id:t.id,name:t.name,start:t.start,end:t.end,days:e.getDifferenceInDays(a,t.end)+1,credit:t.credit,debit:t.debit}),d=[{name:"НО +30000",credit:52683,comment:"начальный остаток",start:new Date("2022-01-01 00:00")/1e3}],l=[{name:"ЗП +40020",credit:40020,repeat:"10,25 * *",start:new Date("2021-12-01 10:00")/1e3,duration:20},{name:"пенсия мамы",credit:31e3,repeat:"17",start:new Date("2021-12-01 09:00")/1e3,duration:20},{name:"заправка",debit:2500,repeat:"/6",start:new Date("2022-01-12 15:00")/1e3,duration:30},{name:"купить продукты",debit:8e3,repeat:"* * 0",start:new Date("2022-01-04 15:00")/1e3,duration:80},{name:"маму на укол",debit:4e4,start:new Date("2022-02-05 18:00")/1e3,duration:80},{name:"тест2",debit:0,start:new Date("2022-02-05 20:00")/1e3,duration:80},{name:"четные",repeat:"2/2",repeatEnd:new Date("2022-01-16 1:30")/1e3,start:new Date("2021-11-01 01:00")/1e3,duration:0},{name:"комплексные",repeat:"1/3,20-25",start:new Date("2021-11-01 01:00")/1e3,duration:0},{name:"дорога на работу",cost:0,repeat:"* * 1-5",start:new Date("2021-11-01 08:00")/1e3,duration:60},{name:"работа",cost:0,repeat:"* * 1-5",start:new Date("2021-11-01 09:00")/1e3,duration:540},{name:"праздники",cost:0,start:new Date("2021-12-31 00:00")/1e3,end:new Date("2022-01-19 23:59")/1e3},{name:"test",cost:0,start:new Date("2022-01-14 14:00")/1e3,duration:2039},{name:"отпуск",cost:0,start:new Date("2022-01-07 00:00")/1e3,duration:20159}],m=new class{constructor(t,a){this.cachedPlannedEvents=[],this.cachedCompletedEvents=[],this.cachedActualBalance=[],this.cachedPlannedBalance=[],this.lastId=1,this.completed=t.map((t=>({id:this.lastId++,name:t.name,comment:t.comment??"",start:t.start,startDay:e.getBeginDayTimestamp(t.start),end:s.getEnd(t),days:s.getDurationInDays(t),credit:t.credit??0,debit:t.debit??0}))),this.planned=[],this.plannedRepeatable=[],a.forEach((t=>{t.repeat?this.plannedRepeatable.push({id:this.lastId++,name:t.name,comment:t.comment??"",repeat:t.repeat,repeatStart:t.start,repeatStartDay:e.getBeginDayTimestamp(t.start),time:e.getTime(t.start),duration:t.duration?60*t.duration:e.getTimeToEndDay(t.start),repeatEnd:t.repeatEnd??null,days:1,credit:t.credit??0,debit:t.debit??0}):this.planned.push({id:this.lastId++,name:t.name,comment:t.comment??"",start:t.start,startDay:e.getBeginDayTimestamp(t.start),end:s.getEnd(t),days:s.getDurationInDays(t),credit:t.credit??0,debit:t.debit??0})})),this.sort(),this.lastActualBalance=this.calculateActualBalance(),this.lastActualBalanceDate=this.completed[this.completed.length-1].startDay,this.firstActualBalanceDate=this.completed[0].startDay}sort(){this.completed.sort(((e,t)=>{const a=e.start-t.start;return 0===a?t.days-e.days:a})),this.planned.sort(((e,t)=>{const a=e.start-t.start;return 0===a?t.days-e.days:a})),this.plannedRepeatable.sort(((e,t)=>e.time-t.time))}calculateActualBalance(){return this.completed.reduce(((e,t)=>e+(t.credit-t.debit)),0)}getPlannedEvents(t){if(void 0!==this.cachedPlannedEvents[t])return this.cachedPlannedEvents[t];const a=this.planned.reduce(((a,n)=>(t<n.startDay||t>=e.getEndDayTimestamp(n.end)||a.push(i(n,t)),a)),[]);return this.plannedRepeatable.reduce(((a,n)=>(t<n.repeatStartDay||n.repeatEnd&&t+n.time>=n.repeatEnd||class{static isMatch(t,a,n){const{day:s,month:r,weekday:i}=e.getDayMonthWeekday(n),[d=null,l="*",m="*"]=t.trim().split(" ",3);if(null===d)return!1;if("/"===d[0]){const t=~~((n-e.getBeginDayTimestamp(a))/86400);return!(t<0)&&t%+d.substring(1)==0}const o=d.split(",").reduce(((e,t)=>c(e,t)),[]),u=l.split(",").reduce(((e,t)=>c(e,t,12)),[]),p=m.split(",").reduce(((e,t)=>c(e,t,7,0)),[]);return!!(u.includes(r+1)&&o.includes(s)&&p.includes(i))}}.isMatch(n.repeat,n.repeatStartDay,t)&&a.push(i(((t,a,n)=>{const c=n+a.time;return{id:t,name:a.name,comment:a.comment,start:c,startDay:e.getBeginDayTimestamp(c),end:c+a.duration,days:1,credit:a.credit,debit:a.debit}})(n.id,n,t),t)),a)),a),this.cachedPlannedEvents[t]=a,a}getCompletedEvents(t){if(void 0!==this.cachedCompletedEvents[t])return this.cachedCompletedEvents[t];const a=this.completed.reduce(((a,n)=>(t>=n.startDay&&t<e.getEndDayTimestamp(n.start)&&a.push(i(n,t)),a)),[]);return this.cachedCompletedEvents[t]=a,a}getEventsWithPlaceholders(e,t=[],a=[]){for(;t.length>0&&!(e<t[t.length-1].end);)t.pop();return t.forEach((e=>a.push({id:-1}))),this.getPlannedEvents(e).reduce(((e,a)=>(t.some((e=>a.id===e.id))||(a.days>1&&t.push({id:a.id,end:a.end}),e.push(a)),e)),a),this.getCompletedEvents(e).reduce(((e,t)=>(e.push(t),e)),a),a}getPlannedEventsFilteredBySkip(e,t=[],a=[]){for(;t.length>0&&!(e<t[t.length-1].end);)t.pop();this.getPlannedEvents(e).reduce(((e,a)=>(t.some((e=>a.id===e.id))||(a.days>1&&t.push({id:a.id,end:a.end}),e.push(a)),e)),a)}getPlannedEventsInInterval(e,t){const a=[],n=[];for(let c=e;c<t;c+=86400)this.getPlannedEventsFilteredBySkip(c,n,a);return a}getActualBalance(e){if(e<this.firstActualBalanceDate)return 0;if(e>=this.lastActualBalanceDate)return this.lastActualBalance;if(void 0!==this.cachedActualBalance[e])return this.cachedActualBalance[e];const t=this.completed.reduce(((t,a)=>(e>=a.start&&(t+=a.credit-a.debit),t)),0);return this.cachedActualBalance[e]=t,t}getPlannedBalance(e){if(e<this.firstActualBalanceDate)return 0;if(e<this.lastActualBalanceDate)return this.getActualBalance(e);if(void 0!==this.cachedPlannedBalance[e])return this.cachedPlannedBalance[e];const t=this.getPlannedEventsInInterval(this.lastActualBalanceDate,e).reduce(((e,t)=>e+(t.credit-t.debit)),this.lastActualBalance);return this.cachedPlannedBalance[e]=t,t}getPlannedBalanceChange(e){return this.getPlannedEvents(e).reduce(((e,t)=>e+(t.credit-t.debit)),0)}prepareToStorage(){const e=this.completed.map((e=>{const t={};return t.name=e.name,e.comment&&(t.comment=e.comment),t.start=r(e.start),t.end=r(e.end),e.credit&&(t.credit=e.credit),e.debit&&(t.debit=e.debit),t})),t=this.plannedRepeatable.reduce(((e,t)=>{const a={};return a.name=t.name,t.comment&&(a.comment=t.comment),a.repeat=t.repeat,a.start=r(t.repeatStart),a.duration=t.duration,t.repeatEnd&&(a.repeatEnd=r(t.repeatEnd)),t.credit&&(a.credit=t.credit),t.debit&&(a.debit=t.debit),e.push(a),e}),[]);return this.planned.reduce(((e,t)=>{const a={};return a.name=t.name,t.comment&&(a.comment=t.comment),a.start=r(t.start),a.end=r(t.end),t.credit&&(a.credit=t.credit),t.debit&&(a.debit=t.debit),e.push(a),e}),t),{completedList:e,plannedList:t}}}(d,l);function o({title:e="Modal title",isOpen:t=!1,onSubmit:a=(()=>{}),onCancel:n=(()=>{}),children:c=null}){return t&&React.createElement("div",{className:"modalOverlay_faa7164",onClick:n},React.createElement("div",{className:"modalWindow_fac41c2",onClick:e=>e.stopPropagation()},React.createElement("div",{className:"modalHeader_ec3e5fe"},React.createElement("div",{className:"modalTitle_e276bb7"},e)),React.createElement("div",{className:"modalBody_a8134eb"},c),React.createElement("div",{className:"modalFooter_dcf803f"},React.createElement("span",{className:"cancel_b0d96c0",onClick:n},"Cancel"),React.createElement("span",{className:"apply_dc7f5d7",onClick:a},"Apply"))))}function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},u.apply(this,arguments)}function p({active:e=!1,disabled:t=!1,children:a="Button",...n}){return React.createElement("span",u({className:"button_c0afaa2 "+(e?"active_b40adfc":"")},n),a)}function h({children:c=null}){const[s,r]=React.useState(!1),[i,d]=React.useState(4),l=React.useRef(null),u=React.useRef(null);let h=e.getBegintWeekTimestamp(Date.now()/1e3);const g=h;h-=7*i*86400,React.useEffect((()=>{d(6),l.current.scrollTop=604}),[]);const y=[];for(let e=0;e<=20;e++){y.push([]);let t=[];for(let a=0;a<=6;a++)y[e].push([]),y[e][a]={timestamp:h,tasks:m.getEventsWithPlaceholders(h,t),actualBalance:m.getActualBalance(h),plannedBalance:m.getPlannedBalance(h),plannedBalanceChange:m.getPlannedBalanceChange(h)},h+=86400}const D=React.useCallback(((e,t)=>{""!==t&&r(!0)}));return console.log("draw calendar"),React.createElement("div",{className:"wrapper_af90f78"},React.createElement("div",{className:"header_e3daf93"},React.createElement(p,{onClick:e=>{console.log(JSON.stringify(m.prepareToStorage()))}},"Save to LocalStorage"),React.createElement(p,null,"Today"),React.createElement("span",{ref:u,className:"monthTitle_a8c3ab6"})),React.createElement("div",{className:"dayOfWeekLabels_cf63ad3"},e.WEEKDAYS.map(((e,t)=>React.createElement("div",{key:t},e)))),React.createElement("div",{className:"CalendarBody_b3637e9",onScroll:t=>{const a=t.target,n=a.scrollTop,c=a.scrollHeight-a.scrollTop-a.clientHeight,s=Math.ceil(n/151-i),r=new Date(1e3*(g+7*s*86400));u.current.innerText=r.getFullYear()+" "+e.MONTHS_FULL[r.getMonth()]+" "+s+" week",n<600?d((e=>e+4)):c<600&&d((e=>e-4))},ref:l},React.createElement("div",{className:"Scrolled_ce022ef"}," ",y.map((c=>React.createElement("div",{className:"CalendarWeek_ef509bf",key:c[0].timestamp}," ",c.map(((c,s)=>React.createElement(t,{timestamp:c.timestamp,dayHeight:150,key:c.timestamp,actualBalance:c.actualBalance,plannedBalance:c.plannedBalance,plannedBalanceChange:c.plannedBalanceChange,onAddEvent:D},c.tasks.map(((t,c)=>{return-1===t.id?React.createElement(n,{key:c}):React.createElement(a,{key:c,name:t.name,time:e.getTime(t.start),days:(r=t.days,i=7-s,r<i?r:i)});var r,i})))))))))),React.createElement(o,{title:"Add event",isOpen:s,onCancel:()=>r(!1)}))}function g(){return React.createElement(h,null)}ReactDOM.render(React.createElement(g,null),document.getElementById("root"))})();