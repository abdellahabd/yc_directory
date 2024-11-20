import Image from "next/image";
import SearchFrom from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "../../components/StartupCard";
import { client } from "@/sanity/lib/client";
import { Startup_Query } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const posters = await client.fetch(Startup_Query);
  const query = (await searchParams).query;
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitsh your statup , <br /> connect whith entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          {" "}
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchFrom query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold ">
          {query ? `Search results for  "${query}"` : "All Statups"}
        </p>
        <ul className=" mt-7 card_grid">
          {posters?.length > 0 ? (
            posters.map((poster: StartupTypeCard, index: number) => (
              <StartupCard poster={poster} key={poster._id} />
            ))
          ) : (
            <p className="no-result">No startup found</p>
          )}
        </ul>
      </section>
    </>
  );
}
