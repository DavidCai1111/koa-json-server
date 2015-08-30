# koa-json-server

A json-server implement with [koa](https://github.com/koajs/koa) (framework) and [Ramda](http://ramdajs.com/) (utils library).

# Example

If you have a json file named `db.json`:

```json
{
  "posts": [
    {
      "id": "1",
      "title": "koa-json-server",
      "author": "dc",
      "content": {
        "1": "2"
      }
    }
  ],
  "comments": [
    {
      "id": "1",
      "body": "some comment",
      "postId": "1"
    }
  ]
}
```

And then you can start `koa-json-server` by: 
```Shell
> kjs db.json 3000

> =============================
> welcome to use koa-json-server!
> use json data base: /Users/xxx/db.json
> koa-json-server listened at port 3000, god bless it
> =============================
```

Now you can use the REST API like:
```
GET       /posts
GET       /posts/0?id=1
POST      /comments/body
PUT       /comments/postId
DELETE    /posts/0
```
