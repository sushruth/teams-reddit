import { Chat, Flex, Provider, ThemePrepared } from '@fluentui/react-northstar'
import { useObserver } from 'mobx-react-lite'
import * as React from 'react'

import { Controls } from './Components/Controls'
import { Content, User } from './Components/Post'
import { subRedditState } from './state/subreddit.state'
import { themeState } from './state/theme.state'

export const Main: React.FC = () => {
  return useObserver(() => (
    <Provider
      theme={themeState.theme}
      styles={({ theme }: { theme: ThemePrepared }) => ({
        backgroundColor: theme.siteVariables.colorScheme.default.background2,
        height: '100%',
        '& a': {
          color: 'inherit',
          textDecoration: 'none',
        },
        '& p': {
          margin: 0,
        },
      })}
    >
      <Flex
        gap="gap.medium"
        column
        fill
        styles={{
          overflowY: 'scroll',
          position: 'relative',
        }}
      >
        <Controls />
        <Chat
          items={subRedditState.subRedditData.data.children.map(({ data }) => {
            if (data.stickied || data.over_18) return undefined

            return {
              gutter: <User name={data.author} />,
              message: {
                content: <Content data={data} />,
                styles: {
                  width: '100%',
                  maxWidth: 'calc(100% - 6.32rem)',
                },
              },
            }
          })}
        />
      </Flex>
    </Provider>
  ))
}
