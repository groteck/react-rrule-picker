import React from 'react'
import { Story, Meta } from '@storybook/react'

import { RRulePicker, Props } from '../index'

export default {
  title: 'RRulePicker',
  component: RRulePicker
} as Meta

const Template: Story<Props> = (args) => <RRulePicker {...args} />

export const WithoutDefaultValue = Template.bind({})
WithoutDefaultValue.args = {
  defaultValue: undefined
}

export const WithDefaultValue = Template.bind({})
WithDefaultValue.args = {
  defaultValue: 'FREQ=YEARLY;BYMONTH=1;BYMONTHDAY=1'
}

export const WithPlaceHolderText = Template.bind({})
WithPlaceHolderText.args = {
  placeholderText: 'This is a custom placeholder'
}
