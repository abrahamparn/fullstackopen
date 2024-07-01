// const { test, describe } = require("node:test");
// const assert = require("node:assert");
// const listHelper = require("../utils/list_helper");
// const blogModel = require("../models/blog.model");
// const blogTest = require("./blog.test.data");

// describe("blog test", () => {
//   test("dummy returns one", () => {
//     const blogs = [];
//     const result = listHelper.dummy(blogs);

//     assert.strictEqual(result, 1);
//   });
// });

// describe("total likes", () => {
//   test("if empty list returns zero", () => {
//     assert.strictEqual(listHelper.totalLikes([]), 0);
//   });
//   test("when list has one blogModel, equal the likes of that", () => {
//     const oneBlog = [blogTest[0]];
//     assert.strictEqual(listHelper.totalLikes(oneBlog), 7);
//   });

//   test("of a bigger list is calculated right", () => {
//     assert.strictEqual(listHelper.totalLikes(blogTest), 36);
//   });
// });

// describe("Favorite Blog", () => {
//   const mostFavorite = {
//     __v: 0,
//     _id: "5a422b3a1b54a676234d17f9",
//     author: "Edsger W. Dijkstra",
//     likes: 12,
//     title: "Canonical string reduction",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//   };
//   test("finds which blog has the most likes", () => {
//     assert.deepStrictEqual(listHelper.favoriteBlog(blogTest), mostFavorite);
//   });
// });

// describe("mostBlogs", () => {
//   test("finds the author with the most blogs", () => {
//     const result = listHelper.mostBlogs(blogTest);
//     const expected = {
//       author: "Robert C. Martin",
//       blogs: 3,
//     };

//     assert.deepStrictEqual(result, expected);
//   });

//   test("returns one of the top bloggers if there is a tie", () => {
//     const additionalBlogs = [
//       ...blogTest,
//       {
//         _id: "5a422bc61b54a676234d17fd",
//         title: "Another blog",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.example.com",
//         likes: 5,
//         __v: 0,
//       },
//     ];
//     const result = listHelper.mostBlogs(additionalBlogs);
//     const expectedAuthors = ["Robert C. Martin", "Edsger W. Dijkstra"];

//     assert.ok(expectedAuthors.includes(result.author));
//     assert.strictEqual(result.blogs, 3);
//   });
// });

// describe("mostLikes", () => {
//   test("finds the author with the most likes", () => {
//     const result = listHelper.mostLikes(blogTest);
//     const expected = {
//       author: "Edsger W. Dijkstra",
//       likes: 17,
//     };

//     assert.deepStrictEqual(result, expected);
//   });

//   test("returns one of the top authors if there is a tie", () => {
//     const additionalBlogs = [
//       ...blogTest,
//       {
//         _id: "5a422bc61b54a676234d17fd",
//         title: "Another blog",
//         author: "Robert C. Martin",
//         url: "http://www.example.com",
//         likes: 5,
//         __v: 0,
//       },
//     ];
//     const result = listHelper.mostLikes(additionalBlogs);
//     const expectedAuthors = ["Edsger W. Dijkstra", "Robert C. Martin"];

//     assert.ok(expectedAuthors.includes(result.author));
//     assert.strictEqual(result.likes, 17);
//   });
// });
