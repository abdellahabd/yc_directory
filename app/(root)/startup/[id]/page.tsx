/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Startup_Query_up_byid } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import Views from "@/components/views";

export const experimental_ppr = true;
async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const startup = await client.fetch(Startup_Query_up_byid, { id });

  const md = markdownit();
  const markdownparesed = md.render(startup?.pitch ?? "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag"> {formatDate(startup?._createdAt)}</p>
        <h1 className="heading">{startup?.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup?.description}</p>
      </section>
      <section className="section_container">
        <img
          src={startup?.image || ""}
          alt={startup?.title || ""}
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between gap-5">
            <Link
              href={`/user/${startup?.author?._id}`}
              className="flex gap-2 items-center mb-3">
              <Image
                src={startup?.author?.image || ""}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{startup?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{startup?.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{startup?.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {markdownparesed ? (
            <article
              className="prose  max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: markdownparesed }}
            />
          ) : (
            <p className="no-result">No dei</p>
          )}
        </div>

        {/* TODO: relate statrup */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <Views id={startup?._id} />
        </Suspense>
      </section>
    </>
  );
}

export default page;
