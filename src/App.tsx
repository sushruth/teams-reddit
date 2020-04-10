import {
  Chat,
  Flex,
  Provider,
  ThemePrepared,
  themes
} from "@fluentui/react-northstar";
import * as React from "react";
import { useState } from "react";
import { Content, User } from "./Components/Post";
import { useFetch } from "./helpers/useFetch";
import { Subreddit } from "./reddit.types";
import { Controls } from "./Components/Controls";

const myInterestingSubreddits = [
  "ProgrammerHumor",
  "funny",
  "askreddit",
  "todayilearned",
  "YouShouldKnow"
];

export default function App() {
  const [subredditName, setSubredditName] = useState(
    myInterestingSubreddits[0]
  );

  const subreddit = useFetch<Subreddit>(
    `https://www.reddit.com/r/${subredditName}/best/.json?limit=10`
  );

  const onDropdownChange = React.useCallback((e, d) => {
    setSubredditName(d.value);
  }, []);

  const items = React.useMemo(
    () =>
      subreddit.data &&
      subreddit.data.data.children.map(({ data }) => {
        if (data.stickied || data.over_18) return undefined;

        return {
          gutter: <User name={data.author} />,
          message: {
            styles: {
              width: "100%"
            },
            content: <Content data={data} />
          },
          key: data.id
        };
      }),
    [subreddit.data]
  );

  return (
    <Provider
      theme={themes.teams}
      styles={({ theme }: { theme: ThemePrepared }) => ({
        backgroundColor: theme.siteVariables.colorScheme.default.background2
      })}
    >
      <Flex gap="gap.medium" column padding="padding.medium">
        <Controls
          dropdownProps={{
            defaultValue: myInterestingSubreddits[0],
            onChange: onDropdownChange,
            items: myInterestingSubreddits
          }}
        />
        <Chat items={items} />
      </Flex>
    </Provider>
  );
}
