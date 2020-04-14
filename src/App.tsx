import * as React from 'react'

import { useTeams } from './helpers/teams.helper'
import { Main } from './Main'

export default function App() {
  const isInitialized = useTeams()

  if (!isInitialized) {
    return null
  }

  return <Main />
}
