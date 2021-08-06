import RRule from 'rrule'

const Frequency = {
  Weekly: RRule.WEEKLY,
  Yearly: RRule.YEARLY
}

export default Frequency

export const WeekDaysList = [Frequency.Weekly, Frequency.Yearly]
