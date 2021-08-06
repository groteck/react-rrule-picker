import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import { Options as RRuleOpts, Weekday } from 'rrule'
import { useTranslation } from 'react-i18next'

import Frequency from '../utils/frequency'

import WeekMode from './WeekMode'
import YearMode from './YearMode'

export interface WeekModeProps {
  rruleOptions: RRuleOpts
  setFrequency: (arg: RRuleOpts['freq']) => void
  setByweekday: (arg: Weekday[]) => void
}

const ModeSelector: React.FC<WeekModeProps> = ({
  rruleOptions,
  setFrequency,
  setByweekday
}) => {
  const { t } = useTranslation()
  const [frequency, setInternalFreq] = React.useState<RRuleOpts['freq']>(
    rruleOptions.freq
  )

  const handleChange = (e: React.ChangeEvent<{ value: RRuleOpts['freq'] }>) => {
    setFrequency(e.target.value)
    setInternalFreq(e.target.value)
  }

  return (
    <>
      <Select
        labelId='mode-selector-label'
        id='mode-selector'
        value={frequency}
        onChange={handleChange}
      >
        {Object.entries(Frequency).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {t(`frequency.${key}`)}
          </MenuItem>
        ))}
      </Select>
      {frequency === Frequency.Weekly && (
        <WeekMode rruleOptions={rruleOptions} onWeekdaysChange={setByweekday} />
      )}
      {frequency === Frequency.Yearly && (
        <YearMode rruleOptions={rruleOptions} />
      )}
    </>
  )
}

export default ModeSelector
