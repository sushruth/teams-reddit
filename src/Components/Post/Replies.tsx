import {
  Button,
  ButtonProps,
  Chat,
  ComponentEventHandler,
  ComponentSlotStyleFunction,
  Divider,
  Flex,
  FlexProps,
  Loader,
} from "@fluentui/react-northstar";
import * as React from "react";
import { renderHTML } from "../../helpers/content.helper";
import { useFetch } from "../../helpers/useFetch";
import { CommentsResponse } from "../../reddit.types";
import { RChatMessage } from "../Chat/RChatMessage";
import { User } from "./User";

type RepliesProps = {
  numberOfReplies: number;
  permalink: string;
};

export const RepliesContainer: React.FC<RepliesProps> = ({
  numberOfReplies,
  permalink,
}) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const onButtonClick: ComponentEventHandler<ButtonProps> = React.useCallback(() => {
    setCollapsed((state) => !state);
  }, []);

  return (
    <>
      <Divider styles={{ alignSelf: "stretch" }} size={0} />
      <Button
        iconOnly
        text
        onClick={onButtonClick}
        styles={{
          padding: "0 0.5rem",
          margin: "0 0.5rem 0.2rem",
        }}
        size="small"
        content={collapsed ? `${numberOfReplies} replies` : "Collapse"}
      />
      {!collapsed && (
        <>
          <RepliesContent permalink={permalink} />
        </>
      )}
    </>
  );
};

type RepliesContainerProps = {
  permalink: string;
};

const RepliesContent: React.FC<RepliesContainerProps> = ({ permalink }) => {
  const data = useFetch<CommentsResponse>(
    `https://www.reddit.com${permalink}.json`
  );

  const posts = React.useMemo(() => {
    return data.data?.[1].data.children;
  }, [data.data]);

  const containerStyle: ComponentSlotStyleFunction<FlexProps> = React.useCallback(
    ({ theme }) => {
      return {
        padding: "0 1rem",
        background: theme.siteVariables.colorScheme.default.background1,
      };
    },
    []
  );

  if (!posts) {
    return (
      <Flex
        fill
        hAlign="start"
        padding="padding.medium"
        column
        styles={containerStyle}
      >
        <Loader size="small" />
      </Flex>
    );
  }

  return (
    <Flex fill column styles={containerStyle}>
      {posts.length &&
        posts.map(({ data }) => {
          return (
            <Chat.Item
              styles={{
                padding: "0.5rem 0 0.5rem 1rem",
                width: "100%",
              }}
              gutter={<User name={data.author} />}
              message={{
                content: (
                  <RChatMessage
                    author={data.author}
                    score={data.score}
                    created={data.created_utc}
                    content={renderHTML(data.body_html)}
                  />
                ),
                styles: {
                  width: "100%",
                  marginLeft: "1rem",
                  marginRight: 0,
                  background: "transparent",
                },
              }}
            />
          );
        })}
    </Flex>
  );
};
