import Image from "next/image";
import SearchFrom from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const posters = [
    {
      _createdAt: new Date(),
      title: "We robot",
      discription: "this is a discription",
      views: 55,
      imageUrl:
        "https://eu-images.contentstack.com/v3/assets/blt31d6b0704ba96e9d/blt46f496902fa86192/66b48b47e7b54b81809e88c7/News_Image_-_2024-08-07T095607.430.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale",
      category: "Robotic",
      _id: 1,
      auther: { _id: 1, name: "Abdellah" },
    },
  ];
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
          {query ? `Search results for  ${query}` : "All Statups"}
        </p>
        <ul className=" mt-7 card_grid">
          {posters?.length > 0 ? (
            posters.map((poster, index: number) => (
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
