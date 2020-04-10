import { Chat, Flex, Provider, ThemePrepared } from "@fluentui/react-northstar";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { Controls } from "./Components/Controls";
import { Content, User } from "./Components/Post";
import { subRedditState } from "./state/subreddit.state";
import { themeState } from "./state/theme.state";

export default function App() {
  return useObserver(() => (
    <Provider
      theme={themeState.theme}
      styles={({ theme }: { theme: ThemePrepared }) => ({
        minWidth: '100%',
        minHeight: '100%',
        backgroundColor: theme.siteVariables.colorScheme.default.background2,
      })}
    >
      <Flex gap="gap.medium" column padding="padding.medium">
        <Controls />
        <Chat
          items={subRedditState.subRedditData.data.children.map(({ data }) => {
            if (data.stickied || data.over_18) return undefined;

            return {
              gutter: <User name={data.author} />,
              message: {
                content: <Content data={data} />,
              },
              key: data.id,
            };
          })}
        />
      </Flex>
    </Provider>
  ));
}
