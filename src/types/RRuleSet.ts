import RRule, { RRuleSet, Frequency, Weekday } from 'rrule'

const defaultRRule = new RRule({
  freq: RRule.YEARLY,
  interval: 1,
  bymonth: 1,
  bymonthday: 1
})

const defaultRRuleSet = new RRuleSet()
defaultRRuleSet.rrule(defaultRRule)

declare module 'rrule' {
  class RRuleSet {
    _type: 'RRuleSet'
    static freqUpdate: (rruleSet: RRuleSet, freq: Frequency) => RRuleSet
    static byweekdayUpdate: (
      rruleSet: RRuleSet,
      byweekday: Weekday[]
    ) => RRuleSet
  }
}

RRuleSet.prototype._type = 'RRuleSet'

RRuleSet.freqUpdate = (rruleSet: RRuleSet, freq: Frequency) => {
  const rruleOptions =
    rruleSet.rrules().length > 0
      ? rruleSet.rrules()[0].options
      : defaultRRuleSet.options
  const rrule = new RRule({ ...rruleOptions, freq })
  const newRRuleSet = new RRuleSet()

  newRRuleSet.rrule(rrule)
  return newRRuleSet
}

RRuleSet.byweekdayUpdate = (rruleSet: RRuleSet, byweekday: Weekday[]) => {
  const rruleOptions =
    rruleSet.rrules().length > 0
      ? rruleSet.rrules()[0].options
      : defaultRRuleSet.options
  const rrule = new RRule({ ...rruleOptions, byweekday })
  const newRRuleSet = new RRuleSet()

  newRRuleSet.rrule(rrule)
  return newRRuleSet
}
