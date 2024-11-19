import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const StartupCard = ({ poster }) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(poster?._createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{poster?.views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${poster?.author?._id}`}>
            <p className="text-16-medium line-clamp-1">
              {poster?.author?.name}
            </p>
          </Link>
          <Link href={`/startup/${poster?._id}`}>
            <h3 className="text-26-semibold line-clamp-1">{poster?.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${poster?.author?._id}`}>
          <Image
            src="https://placehold.co/48x48"
            alt={poster?.auther?.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${poster?._id}`}>
        <p className="startup-card_desc">{poster?.description}</p>

        <img
          src={poster?.imageUrl}
          alt="placeholder"
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${poster?.category?.toLowerCase()}`}>
          <p className="text-16-medium">{poster?.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${poster?._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
