// import CommentWidget from "./components/CommentWidget/CommentWidget";

import CommentWidget from "comment-widget";

const user = { id: 2, name: "Swapnil Doe" };

const App = () => {
  return <CommentWidget initialState={{}} user={user} />;
};

export default App;
