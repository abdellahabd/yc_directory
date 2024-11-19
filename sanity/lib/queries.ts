import { defineQuery } from "next-sanity";

export const Startup_Query =
  defineQuery(`*[_type == "startup" && defined(slug.current)]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);
