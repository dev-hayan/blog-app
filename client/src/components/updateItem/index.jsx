/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { convertFromHTML, convertToHTML } from "draft-convert"
import useAsync from "../../hooks/useAsync"
import { useAuth } from "../../provider/authProvider"
import Spinner from "../spinner"
import upDateItem from "../../services/updateItem"
import toastError from "../toast/error"

export default function UpdateItem({
  itemName,
  handeAddItem,
  itemOptions,
  content = null,
}) {
  const [show, setShow] = useState(false)
  const [editorState, setEditorState] = useState(() => {
    if (!content) return EditorState.createEmpty()
    else return EditorState.createWithContent(convertFromHTML(content))
  })
  const [convertedContent, setConvertedContent] = useState(null)

  const [loading, execute, error] = useAsync()
  const { token } = useAuth()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent())
    setConvertedContent(html)
  }, [editorState])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      let requestBody = { content: convertedContent }
      if (itemOptions.requestBody)
        requestBody = { ...requestBody, ...itemOptions.requestBody }
      const response = await execute(
        upDateItem,
        requestBody,
        itemOptions.url,
        token
      )
      if (response && handeAddItem) {
        handleClose()
        handeAddItem(response)
      }
      if (error) toastError(error)
    } catch (error) {
      //
    }
  }

  return (
    <>
      <button className="btn btn-outline-primary btn-sm" onClick={handleShow}>
        {itemName}
      </button>

      {show && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{itemName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                  />
                  <button
                    type="submit"
                    className="btn btn-outline-primary mt-2 d-block"
                  >
                    {!loading ? "Create" : <Spinner />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
