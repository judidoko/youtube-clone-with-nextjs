import axios from "axios";
import { Video } from "../../types/custom_types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchVideos(query: string, maxResult: number) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search?key=${API_KEY}&q=${query}&order=date&maxResults=${maxResult}&type=video&part=snippet`
    );

    const videos: Video[] = [];

    for (const video of data.items) {
      const videoId = video.id.videoId;
      const videoTitle = video.snippet.title;
      const videoDescription = video.snippet.description;
      const videoThumbnail = video.snippet.thumbnails.medium.url;

      const videoDetailsUrl = `${BASE_URL}/videos?key=${API_KEY}&id=${videoId}&part=snippet,statistics`;

      const { data: videoData } = await axios.get(videoDetailsUrl);

      const viewCount = videoData.items[0].statistics.viewCount;
      const channelId = video.snippet.channelId;

      const channelDetailsUrl = `${BASE_URL}/channels?key=${API_KEY}&id=${channelId}&part=snippet`;
      const { data: channelData } = await axios.get(channelDetailsUrl);
      const channelTitle = channelData.items[0].snippet.title;
      const channelImage = channelData.items[0].snippet.thumbnails.medium.url;

      const publishedDate = video.snippet.publishedAt;

      videos.push({
        id: videoId,
        title: videoTitle,
        description: videoDescription,
        thumbnail: videoThumbnail,
        viewCount,
        channel: {
          channelId,
          channelTitle,
          channelImage,
        },
        publishedDate,
      });
    }

    return videos;
  } catch (error: any) {
    console.log("Error fetching videos", error.response.data);
    throw error;
  }
}

export async function fetchVideoDetails(videoId: string) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/videos?key=${API_KEY}&id=${videoId}&part=snippet,statistics`
    );
    const videoData = data.items[0].snippet;
    const channelData = await fetchChannelDetails(videoData.channelId);

    const videoDetails = {
      title: videoData.title,
      videoUrl: `${process.env.NEXT_PUBLIC_VIDEO_BASE_URL}`,
      likes: data.items[0].statistics.likeCount,
      description: videoData.description,
      publishedDate: videoData.publishedAt,
      channelImage: channelData.channelImage,
      channelName: channelData.channelName,
      subscribersCount: channelData.subscribersCount,
    };
    return videoDetails;
  } catch (error) {
    console.log("Error fetching video details", error);
  }
}

export async function fetchChannelDetails(channelId: string): Promise<{
  channelName: string;
  subscribersCount: string;
  channelImage: string;
}> {
  const { data } = await axios.get(
    `${BASE_URL}/channels?key=${API_KEY}&id=${channelId}&part=snippet,statistics`
  );

  const channelDetails: {
    channelName: string;
    subscribersCount: string;
    channelImage: string;
  } = {
    channelName: data.items[0].snippet.title,
    subscribersCount: data.items[0].statistics.subscriberCount,
    channelImage: data.items[0].snippet.thumbnails.medium.url,
  };
  return channelDetails;
}
