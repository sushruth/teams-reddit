import * as React from "react";
import { Avatar } from "@fluentui/react-northstar";
import { useFetch } from "../reddit.fetch";

type UserProps = {
  name: string;
};

type AvatarData = {
  kind: "t2";
  data: {
    icon_img: string;
  };
};

export const User: React.FC<UserProps> = ({ name }) => {
  const avatar = useFetch<AvatarData>(
    `https://www.reddit.com/user/${name}/about.json`
  );

  return (
    <Avatar
      name={name}
      image={avatar.data ? avatar.data.data.icon_img.split("?")[0] : undefined}
    />
  );
};
