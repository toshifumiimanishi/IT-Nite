import React from 'react'
import moment from 'moment'
import 'moment/locale/ja'

type DOMProps = {}

type PresenterProps = {
  dateTime: string
}

type ContainerProps = {
  presenter: React.FC<PresenterProps>
  dateTime?: string
  format?: string
}

type Props = {}

const TimeDOM: React.FC<DOMProps> = (props) => <time { ...props } />

const ContainerTime: React.FC<ContainerProps> = ({
  presenter,
  children: value,
  dateTime,
  format = 'YYYY年MM月DD日',
  ...props
}) => {
  let children

  if (!isValid(value as moment.MomentInput)) {
    throw new Error(`${value}は有効な時間表現はありません。`)
  } else {
    children = formatDateTime(value as moment.MomentInput, format)
  }

  if (!dateTime) {
    dateTime = formatDateTime(value as moment.MomentInput)
  }

  return presenter({ children, dateTime, ...props })
}

const Time: React.FC<Props> = (props) => (
  <ContainerTime
    presenter={(presenterProps) => (
      <TimeDOM {...presenterProps} />
    )}
    { ...props }
  />
)

export default Time

moment.locale()

function isValid(unixtime: moment.MomentInput) {
  return moment(unixtime, 'YYYY-MM-DDTHH:mm').isValid()
}

function formatDateTime(datetime: moment.MomentInput, format: string = 'YYYY-MM-DDTHH:mm') {
  return moment(datetime).format(format)
}
