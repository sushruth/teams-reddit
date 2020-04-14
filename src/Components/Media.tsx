import { Video } from '@fluentui/react-northstar'
import * as React from 'react'

import { emptyArrayReference } from '../helpers/state.helper'
import { PostData } from '../reddit.types'

type MediaProps = {
  data: PostData
}

export const Media: React.FC<MediaProps> = ({ data }) => {
  const images =
    data.preview && data.preview.images && data.preview.images.length
      ? data.preview.images
      : emptyArrayReference

  switch (data.is_video) {
    case true:
      return (
        <Video
          poster={images[0].source.url.replace(/amp;/g, '')}
          src={data.media.reddit_video.fallback_url.split('?')[0]}
          styles={{
            width: '80vh',
            height: 'auto',
            maxWidth: '100%',
          }}
        />
      )
    case false:
      return images.length ? (
        <img
          alt={data.title}
          style={{
            width: '80vh',
            height: 'auto',
            maxWidth: '100%',
          }}
          src={images[0].source.url.replace(/amp;/g, '')}
        />
      ) : null
    default:
      return null
  }
}
