import { store } from "@risingstack/react-easy-state";

export const emptyArrayReference = [];

export enum Subreddits {
  ProgrammerHumor = "ProgrammerHumor",
  funny = "funny",
  askreddit = "askreddit",
  todayilearned = "todayilearned"
}

export const state = store({
  previews: false,
  subredditName: Subreddits.ProgrammerHumor,
  togglePreview: () => {
    state.previews = !state.previews;
  }
});
