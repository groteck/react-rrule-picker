import React from 'react'
import { Box } from '@material-ui/core'
import { Options as RRuleOpts } from 'rrule'

export interface YearModeProps {
  rruleOptions: RRuleOpts
}

const YearMode: React.FC<YearModeProps> = () => {
  return <Box>YearMode</Box>
}

export default YearMode
