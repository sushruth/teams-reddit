import {
  Button,
  ButtonProps,
  Chat,
  ComponentEventHandler,
  Divider,
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
        size="small"
        content={collapsed ? `${numberOfReplies} replies` : "Collapse"}
      />
      {!collapsed && (
        <>
          <Divider styles={{ alignSelf: "stretch" }} size={0} />
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

  if (!posts) {
    return <Loader size="small" />;
  }

  return (
    <>
      {posts.map(({ data }) => {
        return (
          <Chat.Item
            styles={{
              padding: 0,
              width: "100%",
              maxWidth: "calc(100% - 6.32rem)",
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
              },
            }}
          />
        );
      })}
    </>
  );
};
