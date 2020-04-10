import { action, autorun, computed, observable } from "mobx";
import { Subreddit, SubredditListing } from "../reddit.types";

class SubredditState {
  @observable public subRedditName = "ProgrammerHumor";

  @observable private _subredditNames: string[] = ["ProgrammerHumor"];

  @computed get subredditNames(): string[] {
    if (this._subredditNames.length === 1) {
      fetch("https://www.reddit.com/subreddits/.json")
        .then((res) => res.json())
        .then((data: SubredditListing) => {
          this._subredditNames = data.data.children.map(
            (sr) => sr.data.display_name
          );
        });
    }

    return this._subredditNames;
  }

  @action setSubRedditName(name: string) {
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
  fetch(`https://www.reddit.com/r/${subRedditState.subRedditName}/best/.json`)
    .then((res) => res.json())
    .then((data) => (subRedditState.subRedditData = data));
});
