import { defineQuery } from "next-sanity";

export const Startup_Query =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || author->name match $search || category match $search ]{
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

export const Startup_Query_up_byid =
  defineQuery(`*[_type == "startup" && _id match $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image,username, bio
  }, 
  views,
  description,
  category,
  image,
    pitch
  
  
}`);

export const Startup_Query_Views =
  defineQuery(`*[_type == "startup" && _id match $id][0]{
  _id, views,}`);
