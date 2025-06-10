import path from "path";
import fs from "fs";
import _ from "lodash";

const BASE_URL = "http://localhost:3333/api";

const photosPath = path.join(__dirname, "/public/photos");

const photos = fs.readdirSync(photosPath);

const getToken = async () => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "terryhycheng@gmail.com",
      password: "69609055",
    }),
  });
  const data = await res.json();
  return data.access_token;
};

const token = await getToken();

// ------- get authors from photos ---------

// const getAuthors = (photos: string[]): string[] => {
//   const authors: string[] = [];

//   photos.forEach((photo) => {
//     authors.push(photo.split(".")[0]!.slice(4, 8));
//   });

//   return _.uniq(authors);
// };

// const authors = getAuthors(photos);

// const authorPromises = authors.map(async (author) => {
//   const authorData = {
//     code: author,
//     name: author,
//   };

//   const res = await fetch(`${BASE_URL}/authors`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(authorData),
//   });

//   return res;
// });

// await Promise.all(authorPromises);

// console.log("Authors uploaded successfully");

// --------- upload photos to db ---------

type Author = {
  id: string;
  code: string;
  name: string;
};

const getAuthors = async () => {
  const res = await fetch(`${BASE_URL}/authors`);
  const data = await res.json();
  return data as Author[];
};

const authors = await getAuthors();

const photoData = photos.map((photo) => {
  const author = authors.find(
    (author) => author.code === photo.split(".")[0]?.slice(4, 8),
  )?.id;

  if (!author) {
    throw new Error(`Author not found for photo: ${photo}`);
  }

  return {
    url: `/photos/${photo}`,
    original_filename: photo,
    photo_id: photo.split(".")[0]?.slice(10),
    author,
  };
});

const res = await fetch(`${BASE_URL}/photos/batch`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(photoData),
});

if (res.ok) {
  console.log("Photos uploaded successfully");
} else {
  console.log("Photos upload failed", res.statusText);
}
