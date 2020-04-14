import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import utc from 'dayjs/plugin/utc'
import mdit from 'markdown-it'
import * as React from 'react'

dayjs.extend(utc)
dayjs.extend(calendar)

var md = mdit({
  html: true,
  linkify: true,
  typographer: true,
})

export function decodeHtml(html: string) {
  var txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export function toCalendar(created_utc: number) {
  return dayjs.utc(dayjs.unix(created_utc)).local().calendar()
}

export function renderHTML(input?: string): JSX.Element | null {
  return input ? (
    <div
      dangerouslySetInnerHTML={{
        __html: md.render(decodeHtml(input.trim())),
      }}
    />
  ) : null
}
