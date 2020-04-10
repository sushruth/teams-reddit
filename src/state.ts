import { store, autoEffect } from "@risingstack/react-easy-state";
import { Subreddit } from "./reddit.types";

export const emptyArrayReference = [];

export enum SubredditNames {
  ProgrammerHumor = "ProgrammerHumor",
  funny = "funny",
  askreddit = "askreddit",
  todayilearned = "todayilearned",
}

type State = {
  previews: boolean;
  subRedditName: SubredditNames;
  subreddit: Subreddit;
};

const initialState: State = {
  previews: false,
  subRedditName: SubredditNames.ProgrammerHumor,
  subreddit: {
    kind: "Listing",
    data: {
      dist: 0,
      children: [],
    },
  },
};

export const state = store(initialState);

autoEffect(() => {
  fetch("https://www.reddit.com/r/javascript/best/.json?limit=10")
    .then((res) => res.json())
    .then((data) => {
      state.subreddit = data;
    });
});
