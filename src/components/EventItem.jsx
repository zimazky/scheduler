import DateTime from '../utils/datetime.js'
import styles from './EventItem.module.css'

export default function EventItem({name, days, time=0, completed=false}) {
  return (
  <div className={styles.EventItem} style={{width: days==1?'calc(100% + 2px)':'calc(' +days +' * (100% + 1px) + 1px )'}}>
    {completed && <div className={styles.event_item_completed}></div>}
    <div className={styles.event_row}>
      <div className={styles.complete_button}>{completed?'✔':'☐'}</div><span>{name}</span><span className={styles.EventTime}>{DateTime.getTimeString(time)}</span>
    </div>
  </div>)
}

export function EventPlaceholder() {
  return <div className={styles.EventPlaceholder} ></div>
}