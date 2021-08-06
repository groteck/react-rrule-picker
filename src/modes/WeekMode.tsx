import React from 'react'
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup
} from '@material-ui/core'
import RRule, { Options as RRuleOpts, Weekday, ByWeekday } from 'rrule'
import { useTranslation } from 'react-i18next'

import Weekdays, { WeekDaysList } from '../utils/weekdays'

export interface WeekModeProps {
  rruleOptions: RRuleOpts
  onWeekdaysChange: (weekdays: Weekday[]) => void
}

const getWeekdays = (byweekday: ByWeekday | null | ByWeekday[]): Weekday[] => {
  const result: Weekday[] = []

  if (byweekday === null) {
    return result
  }

  if (typeof byweekday === 'string') {
    result.push(RRule[byweekday])
  }

  if (typeof byweekday === 'number') {
    result.push(WeekDaysList[byweekday])
  }

  if (Array.isArray(byweekday)) {
    for (let i = 0, len = byweekday.length; i < len; i++) {
      result.concat(getWeekdays(byweekday[i]))
    }
  }

  return result
}

const WeekMode: React.FC<WeekModeProps> = ({
  rruleOptions,
  onWeekdaysChange
}) => {
  const { t } = useTranslation()
  const [weekdays, setWeekdays] = React.useState<Weekday[]>(
    getWeekdays(rruleOptions.byweekday)
  )

  const handleChange = (value: Weekday) => () => {
    function addOrRemove(array: Weekday[], value: Weekday) {
      const result = [...array]
      const index = result.indexOf(value)

      if (index === -1) {
        result.push(value)
      } else {
        result.splice(index, 1)
      }

      return result
    }

    const updatedWeekdays = addOrRemove(weekdays, value)

    setWeekdays(updatedWeekdays)
    onWeekdaysChange(updatedWeekdays)
  }

  return (
    <FormControl component='fieldset'>
      <FormGroup row>
        {Object.entries(Weekdays).map(([key, value]) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                color='primary'
                checked={weekdays.indexOf(value) !== -1}
                onChange={handleChange(value)}
              />
            }
            label={t(`weekdays.${key}`)}
            labelPlacement='top'
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default WeekMode
