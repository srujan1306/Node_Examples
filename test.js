import { Entity } from "electrodb";
import { client } from "./util/dbconnection.js";
// Define the Author entity
const Author = new Entity(
  {
    model: {
      service: "BlogService",
      entity: "Author",
      version: "1",
    },
    attributes: {
      authorId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
      email: {
        type: "string",
        required: true,
      },
      bio: {
        type: "string",
      },
    },
    indexes: {
      authorIndex: {
        pk: {
          field: "pk",
          composite: ["authorId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  { table: "author", client }
);

// Define the BlogPost entity
const BlogPost = new Entity(
  {
    model: {
      service: "BlogService",
      entity: "BlogPost",
      version: "1",
    },
    attributes: {
      authorId: {
        type: "string",
        required: true,
      },
      postId: {
        type: "string",
        required: true,
      },
      title: {
        type: "string",
        required: true,
      },
      content: {
        type: "string",
        required: true,
      },
      postDate: {
        type: "string",
        required: true,
      },
      tags: {
        type: "list",
        items: "string",
      },
    },
    indexes: {
      postIndex: {
        pk: {
          field: "pk",
          composite: ["authorId"],
        },
        sk: {
          field: "sk",
          composite: ["postDate", "postId"],
        },
      },
    },
  },
  { table: "blog", client }
);
const insertData = async () => {
  const sampleAuthors = [
    {
      authorId: "A001",
      name: "John Doe",
      email: "john@example.com",
      bio: "Tech enthusiast and blogger",
    },
    {
      authorId: "A002",
      name: "Jane Smith",
      email: "jane@example.com",
      bio: "Writes about tech and science",
    },
  ];

  const samplePosts = [
    {
      authorId: "A001",
      postId: "P001",
      title: "Introduction to DynamoDB",
      content: "DynamoDB is a NoSQL database...",
      postDate: "2024-08-01",
      tags: ["DynamoDB", "NoSQL"],
    },
    {
      authorId: "A001",
      postId: "P002",
      title: "Advanced DynamoDB Queries",
      content: "Explore advanced queries in DynamoDB...",
      postDate: "2024-08-02",
      tags: ["DynamoDB", "Advanced"],
    },
    {
      authorId: "A002",
      postId: "P003",
      title: "DynamoDB Best Practices",
      content: "Learn best practices for DynamoDB...",
      postDate: "2024-08-01",
      tags: ["DynamoDB", "BestPractices"],
    },
    {
      authorId: "A002",
      postId: "P004",
      title: "Understanding NoSQL Databases",
      content: "An overview of NoSQL databases...",
      postDate: "2024-08-03",
      tags: ["NoSQL", "Database"],
    },
  ];

  // Insert authors
  for (const author of sampleAuthors) {
    await Author.put(author).go();
  }

  // Insert posts
  for (const post of samplePosts) {
    await BlogPost.put(post).go();
  }

  console.log("Sample data inserted successfully!");
};

// insertData();

// Task1:  Get all the blogs made - A002
// with scan

// const blogsbyA002 = await BlogPost.scan
//   .where(({ authorId }, { eq }) => `${eq(authorId, "A002")}`)
//   .go();

// console.log(blogsbyA002);

//query

// const blogsbyA002query = await BlogPost.query
//   .postIndex({
//     authorId: "A002",
//   })
//   .go();
// console.log(blogsbyA002query);

// TASK -2 BLog which contains the word "NoSQL"

// const blogswithNoSQL = await BlogPost.scan
//   .where(({ content }, { contains }) => contains(content, "NoSQL"))
//   .go();
// console.log(blogswithNoSQL);

// TASK 3 get all the blogs made by A002 which contains the word "NoSQL"

// const blogswithNoSQL2 = await BlogPost.scan
//   .where(({ authorId }, { eq }) => eq(authorId, "A002"))
//   .where(({ content }, { contains }) => contains(content, "NoSQL"))
//   .go();
// console.log(blogswithNoSQL2);
//-------------------------------------------------------------
async () => {
  const author = await Author.get({ authorId: "A001" }).go();
  console.log(author);
};
//Task - 4 Get all blogs made from 2024-08-01 to 2024-08-22

// const blogsbtw = await BlogPost.query
//   .postIndex({
//     authorId: "A001",
//   })
//   .between({ postDate: "2024-08-01" }, { postDate: "2024-08-22" })
//   .go();
// console.log(blogsbtw);

//using where
// const blogsbtw2 = await BlogPost.scan
//   .where(({ postDate }, { between }) =>
//     between(postDate, "2024-08-01", "2024-08-22")
//   )
//   .go();
// console.log(blogsbtw2);

//Task - 5 Get author details + posts made by "A001" author

// const posts = await BlogPost.scan
//   .where(({ authorId }, { eq }) => eq(authorId, "A001"))
//   .go();
// const author = await Author.get({ authorId: "A001" }).go();
// console.log(author);
// const authorPosts = {
//   ...author.data,
//   posts: posts.data,
// };
// console.log(authorPosts);

//Task - 6 Retrieve the count of posts made by "A002"

// const posts2 = await BlogPost.scan
//   .where(({ authorId }, { eq }) => eq(authorId, "A002"))
//   .go();
// const author2 = await Author.get({ authorId: "A002" }).go();
// console.log(author2);
// const authorPosts2 = {
//   ...author2.data,
//   posts: posts2.data,
// };
// console.log(authorPosts2.posts.length);

//-----------------------------------------------
//BATCH

// (async () => {
//   //  Batch mode
//   const authors = await Author.get([
//     { authorId: "A001" },
//     { authorId: "A002" },
//     { authorId: "A003" },
//     { authorId: "A004" },
//   ]).go();
//   console.log(authors);
// })();

// Batch Put

const sampleAuthors = [
  {
    authorId: "A003",
    name: "Teja Doe",
    email: "teja@example.com",
    bio: "Tech enthusiast and blogger",
  },
  {
    authorId: "A004",
    name: "Nithin Smith",
    email: "nithin@example.com",
    bio: "Writes about tech and science",
  },
];
// Batch writing
const authors = await Author.put(sampleAuthors).go();
console.log("Batch write Completed");
