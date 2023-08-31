/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Post from "./posts"
import CreateItem from "../../components/createItem"
import { useAuth } from "../../provider/authProvider"
import getPosts from "../../services/readPosts"
import useAsync from "../../hooks/useAsync"
import Spinner from "../../components/spinner"
import PostSuggestions from "./suggestions"
import getUserPostSuggestions from "../../services/readUserPostSuggestion"
import getUserSuggestions from "../../services/readUserSuggestion"
import toastSuccess from "../../components/toast/success"

export default function Users() {
  const { user, token } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, execute] = useAsync()

  useEffect(() => {
    (async function () {
      const response = await execute(getPosts, token)
      if (response) {
        setPosts(response)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handeAddPost = (post) => {
    if (post) toastSuccess("Post created. Its status is pending")
  }

  const handleAddSuggestion = (response) => {
    if (response) toastSuccess("Suggestion created")
  }

  const handleUpdatePostContent = (id, content) => {
    const tempPosts = [...posts]
    let index = tempPosts.findIndex((post) => post.id === id)
    tempPosts[index].content = content
    setPosts(tempPosts)
  }
  return (
    <div className="User p-1">
      <PostSuggestions type={"to"} getSuggestionMethod={getUserSuggestions} />
      <div className="bg-black post-parent pb-5 mt-1 d-flex flex-column rounded">
        {posts && (
          <div className="d-flex justify-content-between align-items-center ps-2 pe-2 rounded ">
            <h1 className="text-light">Posts</h1>{" "}
            <CreateItem
              itemName={"Create Post"}
              handeAddItem={handeAddPost}
              type={"createpost"}
              itemOptions={{
                requestBody: {
                  userId: user._id,
                },
                // eslint-disable-next-line no-undef
                url: `${process.env.REACT_APP_API_URL}/posts/`,
              }}
            />
          </div>
        )}
        {loading ? (
          <Spinner />
        ) : (
          <div className=" post-section rounded m-auto">
            {posts ? (
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  handleAddSuggestion={handleAddSuggestion}
                />
              ))
            ) : (
              <div>No posts to show</div>
            )}
          </div>
        )}
      </div>
      <PostSuggestions
        type={"from"}
        handleUpdatePostContent={handleUpdatePostContent}
        getSuggestionMethod={getUserPostSuggestions}
      />
    </div>
  )
}
