import React from 'react'
import { Box, TextField } from '@material-ui/core'
import { Options as RRuleOpts } from 'rrule'

export interface YearModeProps {
  rruleOptions: RRuleOpts
}

const YearMode: React.FC<YearModeProps> = () => {
  return (
    <Box>
      <TextField />
    </Box>
  )
}

export default YearMode
