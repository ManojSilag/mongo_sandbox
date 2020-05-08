const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("middleware", () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "js is great",
      content: "abcdefghijklmnop",
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => {
      done();
    });
  });

  it("users clean up dangling blogpost on remove", (done) => {
    joe
      .remove()
      .then(() => {
        return BlogPost.count();
      })
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
