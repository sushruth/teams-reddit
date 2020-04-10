import { action, autorun, observable } from "mobx";
import { Subreddit } from "../reddit.types";

export enum SubRedditNames {
  ProgrammerHumor = "ProgrammerHumor",
  funny = "funny",
  askreddit = "askreddit",
  todayilearned = "todayilearned",
  worldnews = "worldnews",
  javascript = "javascript",
  reactjs = "reactjs",
}

class SubredditState {
  @observable public subRedditName = SubRedditNames.ProgrammerHumor;
  @action setSubRedditName(name: SubRedditNames) {
    this.subRedditName = name;
  }

  @observable subRedditData: Subreddit = {
    data: {
      dist: 0,
      children: [],
    },
    kind: "Listing",
  };

  @action setSubRedditDataManually(data: Subreddit) {
    this.subRedditData = data;
  }
}

export const subRedditState = new SubredditState();

autorun(() => {
  fetch(
    `https://www.reddit.com/r/${subRedditState.subRedditName}/best/.json`
  )
    .then((res) => res.json())
    .then((data) => (subRedditState.subRedditData = data));
});
