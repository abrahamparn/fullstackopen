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

describe("totla likes", () => {
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
