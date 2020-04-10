import { Chat, Flex, Text, Video } from "@fluentui/react-northstar";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import utc from "dayjs/plugin/utc";
import mdit from "markdown-it";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { useMemo } from "react";
import { emptyArrayReference } from "../../helpers/state.helper";
import { PostData } from "../../reddit.types";
import { previewState } from "../../state/preview.state";

dayjs.extend(utc);
dayjs.extend(calendar);

var md = mdit({
  html: true,
  linkify: true,
  typographer: true,
});

type ContentProps = {
  data: PostData;
};

export const Content: React.FC<ContentProps> = ({ data }) => {
  const images =
    data.preview && data.preview.images && data.preview.images.length
      ? data.preview.images
      : emptyArrayReference;

  const media = useMemo(() => {
    switch (data.is_video) {
      case true:
        return (
          <Video
            poster={images[0].source.url.replace(/amp;/g, "")}
            src={data.media.reddit_video.fallback_url.split("?")[0]}
            styles={{
              width: "80vh",
              height: "auto",
              maxWidth: "100%",
            }}
          />
        );
      case false:
        return images.length ? (
          <img
            alt={data.title}
            style={{
              width: "80vh",
              height: "auto",
              maxWidth: "100%",
            }}
            src={images[0].source.url.replace(/amp;/g, "")}
          />
        ) : null;
    }
  }, [data, images]);

  return useObserver(() => (
    <Chat.Message
      author={{
        content: data.author,
      }}
      timestamp={dayjs.utc(dayjs.unix(data.created_utc)).local().calendar()}
      reactionGroup={{
        items: [
          {
            icon: {
              name: "chevron-down-medium",
              rotate: 180,
            },
            content: data.score,
          },
        ],
      }}
      results={data.num_comments}
      variables={{ offset: 0 }}
      content={
        <Flex column gap="gap.small">
          <Text weight="semibold" content={data.title} />
          {previewState.enablePreview && media}
          <div dangerouslySetInnerHTML={{ __html: md.render(data.selftext) }} />
        </Flex>
      }
    />
  ));
};
