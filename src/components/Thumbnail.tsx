import Link from "next/link";
import { Dot } from "lucide-react";
import { Video } from "../../types/custom_types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCount, formatPublishedDate } from "@/lib/utils";

const Thumbnail = ({ video }: { video: Video }) => {
  return (
    <>
      <Link
        href={`/watch/${video.id}`}
        className="W-[320px] mx-auto md:w-[300px] my-3 "
      >
        <div className="h-52 overflow-hidden rounded-2xl bg-slate-300">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={500}
            className="w-full h-full object-cover hover:scale-110 transition-allv duration-700"
          />
        </div>
        <div className="flex space-x-2 py-3">
          <Avatar>
            <AvatarImage
              src={video.channel.channelImage}
              alt={video.channel.channelTitle}
            />

            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h4 className="scroll-m-20 text-lg font-bold tracking-tight">
              {video.title.substring(0, 40)}
            </h4>
            <p className="text-sm text-background-dark dark:text-background-light">
              {video.channel.channelTitle}
            </p>
            <div className="flex text-sm dark:text-background-light text-background-dark">
              <p>{formatCount(+video.viewCount)}</p>
              <Dot />
              <p>{formatPublishedDate(video.publishedDate)}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Thumbnail;
