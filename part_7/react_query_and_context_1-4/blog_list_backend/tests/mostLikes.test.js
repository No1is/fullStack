const { test, describe } = require("node:test");
const assert = require("node:assert");

const mostLikes = require("../utils/list_helper").mostLikes;

describe("most likes", () => {
  const listWithZero = [];

  test("with a list of zero blogs", () => {
    const result = mostLikes(listWithZero);

    assert.deepStrictEqual(result, 0);
  });

  const listWithOneblog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("with a list of one blog", () => {
    const result = mostLikes(listWithOneblog);
    const compare = {
      author: listWithOneblog[0].author,
      likes: listWithOneblog[0].likes,
    };

    assert.deepStrictEqual(result, compare);
  });

  const listWithThreeblogs = [
    {
      _id: "gds21t33t",
      title: "dont do it",
      author: "No Bugs",
      url: "http://localhost:3001",
      likes: 10,
      __v: 0,
    },
    {
      _id: "gds21gsag33t",
      title: "ill be back",
      author: "Zero Bugs",
      url: "http://localhost:3001",
      likes: 20,
      __v: 0,
    },
    {
      _id: "gds215215312t",
      title: "master of the universe",
      author: "Bugz Control",
      url: "http://localhost:3001",
      likes: 30,
      __v: 0,
    },
  ];

  test("list with more than one blog", () => {
    const result = mostLikes(listWithThreeblogs);
    const compare = {
      author: listWithThreeblogs[2].author,
      likes: listWithThreeblogs[2].likes,
    };

    assert.deepEqual(result, compare);
  });
});
