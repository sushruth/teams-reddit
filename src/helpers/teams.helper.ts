import * as microsoftTeams from '@microsoft/teams-js'
import { useEffect, useState } from 'react'

export function useTeams() {
  const [isInitialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!isInitialized) {
      microsoftTeams.initialize(() => {
        setInitialized(true)
      })
    }
  }, [isInitialized])

  return isInitialized
}
