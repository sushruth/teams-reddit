import { Chat, ChatMessageProps, Text } from '@fluentui/react-northstar'
import * as React from 'react'

import { toCalendar } from '../../helpers/content.helper'

interface IRChatMessageProps
  extends Omit<
    ChatMessageProps,
    'actionMenu' | 'styles' | 'variables' | 'author'
  > {
  score: number
  author: string
  created: number
}

export const RChatMessage: React.FC<IRChatMessageProps> = ({
  score,
  author,
  created: timestamp,
  ...props
}) => {
  return (
    <Chat.Message
      as="div"
      actionMenu={{
        iconOnly: true,
        items: [
          {
            key: 'upvotes',
            icon: 'like',
            content: (
              <Text
                size="small"
                content={score}
                styles={{ whiteSpace: 'nowrap' }}
              />
            ),
          },
        ],
      }}
      styles={{
        width: '100%',
        paddingBottom: 0,
        '& .ui-chat__message': {
          background: 'transparent',
        },
      }}
      variables={{
        offset: 0,
      }}
      author={{
        content: (
          <Text
            weight="semibold"
            size="small"
            content={
              <a href={`https://www.reddit.com/u/${author}`}>{author}</a>
            }
          />
        ),
      }}
      timestamp={toCalendar(timestamp)}
      {...props}
    />
  )
}
