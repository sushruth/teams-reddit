type RedditListing<T> = {
  kind: "Listing";
  data: {
    dist: number;
    children: T[];
  };
};

type KindData<S extends string, T> = {
  kind: S;
  data: T;
};

type PostDataBase = {
  title: string;
  permalink: string;
  score: number;
  created_utc: number;
  author: string;
  num_comments: number;
  id: string;
  stickied: boolean;
  url: string;
  over_18: boolean;
  selftext: string;
  selftext_html: string;
  preview: {
    images: {
      source: {
        url: string;
      };
    }[];
  };
};

type PostDataImage = PostDataBase & {
  is_video: false;
};

type PostDataVideo = PostDataBase & {
  is_video: true;
  media: {
    reddit_video: {
      fallback_url: string;
    };
  };
};

export type PostData = PostDataImage | PostDataVideo;

export type Post = {
  kind: "t3";
  data: PostData;
};

export type Subreddit = RedditListing<Post>;

export type SubredditListing = RedditListing<{
  kind: "t5";
  data: {
    display_name: string;
  };
}>;

export type Comments = RedditListing<
  KindData<
    "t1",
    {
      score: number;
      author: string;
      created_utc: number;
      body_html: string;
      id: string;
    }
  >
>;

export type CommentsResponse = [Subreddit, Comments];
