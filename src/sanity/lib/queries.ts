import { defineQuery } from "next-sanity";

export const SKILLS_QUERY =
  defineQuery(`*[_type=="skill"] | order(_createdAt asc){
  _id,category,name,icon, use, link
}`);

export const FEATURED_PROJECTS_QUERY =
  defineQuery(`*[_type=="project" && isFeatured][0..2] | order(_createdAt desc){
  codeLink,description,_id,title,projectLink,imgUrl,icon
}`);

export const PROJECTS_QUERY =
  defineQuery(`*[_type=="project"] | order(_createdAt desc){
  codeLink,description,_id,title,projectLink,isFeatured,imgUrl,icon
}`);

export const EXPERIENCE_QUERY =
  defineQuery(`*[_type=="experience"] | order(coalesce(order, 999), duration.start desc){
  _id,
  role,
  company,
  location,
  website,
  duration,
  isPresent,
  "logoUrl": logo.asset->url,
  description,
  "technologies": technologies[]->{
    _id,
    name,
    category,
    link,
    "iconUrl": icon.asset->url
  }
}`);
