import { sanityFetch } from "@/lib/live";
import SearchFrom from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "../../components/StartupCard";
import { Startup_Query } from "@/sanity/lib/queries";
import { SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;

  const params = { search: query || null };

  const session = await auth();

  // console.log(session?.id);

  const { data: posters } = await sanityFetch({
    query: Startup_Query,
    params,
  });

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
            posters.map((poster: StartupTypeCard) => {
              return <StartupCard poster={poster} key={poster._id} />;
            })
          ) : (
            <p className="no-result">No startup found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
