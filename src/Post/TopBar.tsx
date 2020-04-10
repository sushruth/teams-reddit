import * as React from "react";
import { Text, Flex, Reaction } from "@fluentui/react-northstar";
import { PostData } from "../reddit.types";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(calendar);

type TopBarProps = {
  data: PostData;
};

export const TopBar: React.FC<TopBarProps> = ({ data }) => {
  return (
    <Flex gap="gap.small">
      <Text size="small" content={`u/${data.author}`} />
      <Text
        size="small"
        timestamp
        content={dayjs
          .utc(dayjs.unix(data.created_utc))
          .local()
          .calendar()}
      />
      <Flex.Item push>
        <Reaction
          icon={{
            name: "like",
            outline: true
          }}
          content={data.score}
        />
      </Flex.Item>
    </Flex>
  );
};
