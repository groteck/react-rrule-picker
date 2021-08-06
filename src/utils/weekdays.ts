import RRule from 'rrule'

const WeekDays = {
  M: RRule.MO,
  T: RRule.TU,
  W: RRule.WE,
  R: RRule.TH,
  F: RRule.FR,
  S: RRule.SA,
  U: RRule.SU
}

export default WeekDays
export const WeekDaysList = [
  WeekDays.M,
  WeekDays.T,
  WeekDays.W,
  WeekDays.R,
  WeekDays.F,
  WeekDays.S,
  WeekDays.U
]
