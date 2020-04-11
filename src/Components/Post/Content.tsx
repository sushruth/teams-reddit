import { Flex, Text } from "@fluentui/react-northstar";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { decodeHtml, renderHTML } from "../../helpers/content.helper";
import { PostData } from "../../reddit.types";
import { previewState } from "../../state/preview.state";
import { RChatMessage } from "../Chat/RChatMessage";
import { Media } from "../Media";
import { RepliesContainer } from "./Replies";

type ContentProps = {
  data: PostData;
};

export const Content: React.FC<ContentProps> = ({ data }) => {
  return useObserver(() => (
    <RChatMessage
      author={data.author}
      created={data.created_utc}
      score={data.score}
      content={
        <Flex column hAlign="start" fill>
          <Flex gap="gap.small" styles={{ padding: "0.5rem 0" }} column>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={data.url}
              style={{ color: "inherit" }}
            >
              <Text weight="semibold" content={decodeHtml(data.title)} />
            </a>
            {previewState.enablePreview && <Media data={data} />}
            {data.selftext && renderHTML(data.selftext_html)}
          </Flex>
          <RepliesContainer
            permalink={data.permalink}
            numberOfReplies={data.num_comments}
          />
        </Flex>
      }
    />
  ));
};
