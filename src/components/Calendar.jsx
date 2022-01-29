import styles from './Calendar.module.css'
import CalendarDay from './CalendarDay.jsx'
import EventItem from './EventItem.jsx'
import DateTime from '../utils/datetime.js'
import EventList from '../utils/eventList'
import {eventList} from '../utils/schedule.js'
import Modal from './Modal.jsx'
import Button from './Button.jsx'
import EventForm from './EventForm.jsx'
import useUpdate from '../hooks/useUpdate.js'

const dayHeight = 150
const weekBuffer = 4

export default function Calendar({children = null}) {

  const forceUpdate = useUpdate()
  const [isModal,setModal] = React.useState(false)
  const [shift,setShift] = React.useState(weekBuffer)
  const scrollElement = React.useRef(null)
  const divElement = React.useRef(null)
  const [modalState,setModalState] = React.useState({title: 'Add new event', name:'New event'})
  

  let currentTimestamp = DateTime.getBegintWeekTimestamp(Date.now()/1000)
  const zeroPoint = currentTimestamp
  currentTimestamp -= shift*7*86400

  React.useEffect(()=>{
    setShift(2+weekBuffer)
    scrollElement.current.scrollTop = (weekBuffer)*(dayHeight+1)//606
  }, [])

  const arrayOfDays = []
  for(let i=0;i<=20;i++) {
    arrayOfDays.push([])
    let stack = []
    for(let j=0;j<=6;j++) {
      arrayOfDays[i].push([])
      arrayOfDays[i][j] = {
        timestamp: currentTimestamp, 
        tasks: eventList.getEventsWithPlaceholders(currentTimestamp,stack),
        actualBalance: eventList.getActualBalance(currentTimestamp),
        plannedBalance: eventList.getPlannedBalance(currentTimestamp),
        plannedBalanceChange: eventList.getPlannedBalanceChange(currentTimestamp)
      }
      currentTimestamp += 86400
    }
  }
  const min = (a,b)=>a<b?a:b

  const onScrollHandle = (e)=>{
    const el=e.target
    const t = el.scrollTop
    const b = el.scrollHeight-el.scrollTop-el.clientHeight
    const w = Math.ceil(t/(dayHeight+1)-shift)
    const d = new Date((zeroPoint+w*7*86400)*1000)
    divElement.current.innerText =d.getFullYear() + ' ' + DateTime.MONTHS_FULL[d.getMonth()] + ' '+w+' week'
    if(t<weekBuffer*dayHeight) setShift(s=>s+weekBuffer)
    else if(b<weekBuffer*dayHeight) setShift(s=>s-weekBuffer)
  }

  const SaveToLocalStorage = ()=>{
    const dataString = JSON.stringify(eventList.prepareToStorage())
    localStorage.setItem('data',dataString)
    console.log(dataString)
  }

  /////////////////////////////////////////////////////////////////////////////
  // Методы открывания формы
  const openNewEventForm = (timestamp, name) => {
    if(name==='') return
    setModalState(EventList.eventToRaw({name, start:timestamp}))
    setModal(true)
  }

  const openEventForm = compactEvent => {
    const {id, completed, start} = compactEvent
    const s = (completed ? eventList.completed.find(e=>e.id===id) : eventList.planned.find(e=>e.id===id)) ?? 
      eventList.plannedRepeatable.find(e=>e.id===id)
    setModalState({...EventList.eventToRaw(s), completed, timestamp:start, id:s.id})
    setModal(true)
  }

  /////////////////////////////////////////////////////////////////////////////
  // Методы изменения событий в форме
  const onCompleteEvent = (id, timestamp, raw) => {
    eventList.completeEvent(id, timestamp, raw)
    setModal(false)
    forceUpdate()
  }

  const onDeleteEvent = id => {
    eventList.deleteEvent(id)
    setModal(false)
    forceUpdate()
  }

  const onAddEvent = raw => {
    eventList.addPlannedRawEvent(raw)
    eventList.clearCache()
    setModal(false)
    forceUpdate()
  }

  // Изменение параметров события
  // domain:
  // 'all'      для всех событий, если они повторяемые
  // 'current'  для текущего
  // 'after'    для текущего и последующих
  const onChangeEvent = (id, timestamp, raw, domain='all') => {

  }

  console.log('draw calendar')
  return (
    <div className={styles.wrapper}>
    <div className={styles.header}>
      <Button onClick={SaveToLocalStorage}>Save to LocalStorage</Button>
      <Button>Today</Button>
      <span ref={divElement} className={styles.monthTitle}></span>
    </div>
    <div className={styles.dayOfWeekLabels}>
      { DateTime.WEEKDAYS.map( (d,i) => <div key={i}>{d}</div> ) }
    </div>
    <div className={styles.CalendarBody} onScroll={onScrollHandle} ref={scrollElement}>
      { arrayOfDays.map( week => (
        <div className={styles.CalendarWeek} key={week[0].timestamp}> {
          week.map( (d,j) => (
            <CalendarDay data={d} key={d.timestamp} onAddEvent={openNewEventForm}>
              { d.tasks.map((t,i)=>(<EventItem key={i} event={t} days={min(t.days,7-j)} onClick={openEventForm}/>))}
            </CalendarDay>
          ))}
        </div>
      ))}
    </div>
    <Modal isOpen={isModal} onCancel={()=>setModal(false)}>
      <EventForm event={modalState} onDelete={onDeleteEvent} onComplete={onCompleteEvent} onAdd={onAddEvent}/>
    </Modal>
    </div>
  )
}