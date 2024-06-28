const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const blogModel = require("../models/blog.model");
const blogTest = require("./blog.test.data");

describe("blog test", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);

    assert.strictEqual(result, 1);
  });
});

describe("total likes", () => {
  test("if empty list returns zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });
  test("when list has one blogModel, equal the likes of that", () => {
    const oneBlog = [blogTest[0]];
    assert.strictEqual(listHelper.totalLikes(oneBlog), 7);
  });

  test("of a bigger list is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(blogTest), 36);
  });
});

describe("Favorite Blog", () => {
  const mostFavorite = {
    __v: 0,
    _id: "5a422b3a1b54a676234d17f9",
    author: "Edsger W. Dijkstra",
    likes: 12,
    title: "Canonical string reduction",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };
  test("finds which blog has the most likes", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogTest), mostFavorite);
  });
});
