import { TeamsThemeStylesProps, ThemePrepared } from '@fluentui/react-northstar'
import {
  teams,
  teamsDark,
  teamsHighContrast,
} from '@fluentui/react-northstar/dist/es/themes'
import * as msTeams from '@microsoft/teams-js'
import { action, computed, observable } from 'mobx'

export const themeMap = {
  dark: teamsDark,
  default: teams,
  contrast: teamsHighContrast,
}

class ThemeState {
  @observable private _theme:
    | undefined
    | ThemePrepared<TeamsThemeStylesProps> = undefined

  @action setThemeManually(theme: ThemePrepared<TeamsThemeStylesProps>) {
    this._theme = theme
  }

  @computed get theme(): ThemePrepared<TeamsThemeStylesProps> {
    if (!this._theme) {
      if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        return teamsDark
      }

      if (window.matchMedia?.('(-ms-high-contrast: white-on-black)').matches) {
        return teamsHighContrast
      }

      return teams
    } else {
      return this._theme
    }
  }
}

export const themeState = new ThemeState()

msTeams.initialize(() => {
  console.debug('Initialized')
  msTeams.getContext((context) => {
    console.debug('Got Context', context)
    if (context.theme) {
      console.debug('theme - ', context.theme)
      themeState.setThemeManually(
        themeMap[context.theme as keyof typeof themeMap]
      )
    }
  })

  msTeams.registerOnThemeChangeHandler((theme) => {
    console.debug('Theme changed - ', theme)
    themeState.setThemeManually(themeMap[theme as keyof typeof themeMap])
  })
})
