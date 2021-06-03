import React from 'react'
import {
  TextField,
  InputAdornment,
  TextFieldProps,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  ButtonProps
} from '@material-ui/core'
import { EventNote } from '@material-ui/icons'
import RRule, { rrulestr } from 'rrule'
import { useTranslation, I18nextProvider } from 'react-i18next'
import { i18n } from 'i18next'

import Placeholder from './types/Placeholder'
import RRuleSet from './types/RRuleSet'

import i18nDefault from './utils/i18n'

const defaultPlaceholder: (text: string) => Placeholder = (text) => ({
  toText: () => text,
  _type: 'Placeholder'
})

const defaultRRule = new RRule({
  freq: RRule.YEARLY,
  interval: 1,
  bymonth: 1,
  bymonthday: 1
})

const defaultRRuleSet = new RRuleSet()
defaultRRuleSet.rrule(defaultRRule)

const defaultTextFieldProps: TextFieldProps = {
  disabled: true,
  variant: 'outlined',
  InputProps: {
    startAdornment: (
      <InputAdornment position='start'>
        <EventNote />
      </InputAdornment>
    )
  }
}

const getInputDefaultValue = (
  placeholderText: string,
  defaultValue?: string
): RRuleSet | Placeholder => {
  // Cast the `defaultValue` into an `RRuleSet` in case of failure we will
  // use the Placeholder type and trigger a warning
  try {
    if (defaultValue?.length)
      return rrulestr(defaultValue as string, {
        forceset: true
      }) as RRuleSet
  } catch (e) {
    console.warn(
      `Failure trying to cast the defaultValue: ${defaultValue} into an RRuleSet, 
      this usually means that you are not passing an RRule or RRuleSet string as defaultValue`
    )
  }
  return defaultPlaceholder(placeholderText)
}

const getRRuleOptions = (set: RRuleSet) => {
  const rruleOptions =
    set.rrules().length > 0 ? set.rrules()[0].options : defaultRRuleSet.options
  return rruleOptions
}

export interface Props {
  defaultValue?: string // RRule or RRuleSet string
  TextFieldProps?: TextFieldProps
  SaveButtonProps?: ButtonProps
  CancelButtonProps?: ButtonProps
  onChange?: (arg0: string, arg1: RRuleSet) => any
  i18n?: i18n
}

export const RRulePicker: React.FC<Props> = ({
  defaultValue,
  TextFieldProps = defaultTextFieldProps,
  SaveButtonProps = { variant: 'contained', color: 'primary' },
  CancelButtonProps = { variant: 'text', color: 'secondary' },
  onChange: onChangeCallback = () => {},
  i18n = i18nDefault
}) => {
  // COMPONENT SETUP
  const { t } = useTranslation()
  const rruleSetParsed: Placeholder | RRuleSet = getInputDefaultValue(
    t('placeholderText'),
    defaultValue
  )
  const [displayPicker, setDisplayPicker] = React.useState<boolean>(false)
  const [result, setResult] = React.useState<RRuleSet | undefined>()

  // Generate the text field props
  const composedTextFieldProps = {
    ...defaultTextFieldProps,
    ...TextFieldProps
  }

  // CALLBACKS
  const handleCloseDialog = () => {
    setDisplayPicker(false)
  }

  const handleOpenDialog = () => {
    setDisplayPicker(true)
  }

  const handleChange = (resultValue?: RRuleSet) => {
    if (resultValue) onChangeCallback(resultValue.toString(), resultValue)
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(defaultRRuleSet)
    handleCloseDialog()
  }

  // EFFECTS
  React.useEffect(() => handleChange(result), [result])

  return (
    <I18nextProvider i18n={i18n}>
      <TextField
        id='RRulePickerField'
        {...composedTextFieldProps}
        onClick={handleOpenDialog}
        defaultValue={rruleSetParsed.toText()}
      />
      <Dialog open={displayPicker} onClose={handleCloseDialog}>
        <DialogTitle>{t('selectorTitle')}</DialogTitle>
        <form id='RRulePickerForm' onSubmit={handleSave}>
          <DialogContent>
            {rruleSetParsed._type === 'RRuleSet' && (
              <span>{getRRuleOptions(rruleSetParsed).freq}</span>
            )}
          </DialogContent>
          <DialogActions>
            <Button {...CancelButtonProps} onClick={handleCloseDialog}>
              {t('cancelButtonText')}
            </Button>
            <Button {...SaveButtonProps} type='submit'>
              {t('saveButtonText')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </I18nextProvider>
  )
}

export default RRulePicker
