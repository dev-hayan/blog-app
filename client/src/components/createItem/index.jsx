/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { convertToHTML } from "draft-convert"
import { MdAttachment } from "react-icons/md"
import "./style.css"
import useAsync from "../../hooks/useAsync"
import addItem from "../../services/createItem"
import { useAuth } from "../../provider/authProvider"
import Spinner from "../spinner"
import toastError from "../toast/error"

export default function CreateItem({
  itemName,
  handeAddItem = null,
  itemOptions,
  type,
}) {
  const [show, setShow] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [selectedFiles, setSelectedFiles] = useState([])
  const [convertedContent, setConvertedContent] = useState(null)
  const fileInputRef = useRef(null)
  const [loading, execute, error] = useAsync()
  const { token } = useAuth()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent())
    setConvertedContent(html)
  }, [editorState])

  const handleFileChange = (event) => {
    console.log("first")
    const files = Array.from(event.target.files)
    const validFiles = []
    setErrors([])

    if (files.length > 5) {
      setErrors((prev) => [...prev, "You can upload a maximum of 5 files."])
    }

    files.forEach((file) => {
      if (file.size > 0.5 * 1024 * 1024) {
        console.log(file.size)
        setErrors((prev) => [
          ...prev,
          `File "${file.name}" exceeds the 0.5MB size limit.`,
        ])
      } else {
        validFiles.push(file)
      }
    })

    if (errors.length === 0) {
      setSelectedFiles(validFiles)
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()

    if (selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i])
      }
    }

    if (itemOptions.requestBody)
      for (const key in itemOptions.requestBody) {
        formData.append(key, itemOptions.requestBody[key])
      }

    formData.append("content", convertedContent)
    try {
      const response = await execute(addItem, formData, itemOptions.url, token)
      if (response && handeAddItem) {
        setEditorState(() => EditorState.createEmpty())
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
      {type !== "replyCommet" ? (
        <button className="btn btn-outline-primary btn-sm" onClick={handleShow}>
          {itemName}
        </button>
      ) : (
        <span
          onClick={handleShow}
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ cursor: "pointer" }}
        >
          Reply
          <span className="visually-hidden">Reply Comment</span>
        </span>
      )}

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
                  {type !== "noFile" && (
                    <div
                      className="file-upload-icon"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <label htmlFor="attachments">
                        <MdAttachment size={25} />
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="attachments"
                        name="attachments"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      {errors.length > 0 &&
                        errors.map((error) => (
                          <p key={error} className="text-danger">
                            {error}
                          </p>
                        ))}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-outline-primary mt-2 d-block"
                    disabled={errors.length > 0 ? true : false}
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
