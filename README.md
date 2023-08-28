# Comment Widget

You Can clone this repo and to run locally do:

- npm i

- npm run dev

Also to render icons also add fontAwesome CDN in index.html:

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
```

This package is also deployed on npm:

- To use in another React projects:

      - npm i comment-widget

  ```
      import CommentWidget from "comment-widget";

      const user = { id: 2, name: "Swapnil Doe" };

      const Component = () => {
          return <CommentWidget initialState={{}} user={user} />;
      };




  - Sample Comment Object:

      {
          id
          commentText
          childCommments: [],
          isRootNode,
          parentNodeId,
          timestamp: new Date().toLocaleString(),
          likeCount: 0,
          likedBy: [],
          userId: user.id,
          userName: user.name,
      };


  ```
