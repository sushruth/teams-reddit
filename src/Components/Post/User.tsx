import { Avatar, AvatarProps } from "@fluentui/react-northstar";
import * as React from "react";
import { useFetch } from "../../helpers/useFetch";

type UserProps = {
  name: string;
  size?: AvatarProps["size"];
};

type AvatarData = {
  kind: "t2";
  data: {
    icon_img: string;
  };
};

export const User: React.FC<UserProps> = ({ name, size = "medium" }) => {
  const avatar = useFetch<AvatarData>(
    `https://www.reddit.com/user/${name}/about.json`
  );

  return (
    <Avatar
      size={size}
      name={name}
      image={avatar.data ? avatar.data.data.icon_img.split("?")[0] : undefined}
    />
  );
};
