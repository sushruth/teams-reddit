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

export type Subreddit = {
  kind: "Listing";
  data: {
    dist: number;
    children: Post[];
  };
};
