import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

import Swal from "sweetalert2";
import { X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchPosts,
  createPost,
  deletePostAsync,
  updatePostAsync,
} from "../../../features/posts/postsSlice";
import Widget from "../../../components/Widget";
import s from "./PostList.module.scss";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const API_URL = import.meta.env.VITE_API_URL;

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const DEFAULT_IMAGE = `${API_URL}/uploads/defaultimage.jpg`;
console.log(DEFAULT_IMAGE);
console.log(API_URL, "REACT_API_URL");

// ✅ get image src safely
const getImageSrc = (image) => {
  if (!image || image.trim() === "") return DEFAULT_IMAGE;
  if (image.startsWith("http")) return image;
  return `${API_URL}/${image}`;
};

// MODAL COMPONENT
const PostFormModal = ({ mode, formData, setFormData, onSubmit, onClose }) => {
  const { quill, quillRef } = useQuill({ theme: "snow" });
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!quill) return;
    const handler = () => {
      setFormData((prev) => ({ ...prev, content: quill.root.innerHTML }));
    };
    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [quill]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/gif"];
    if (!allowed.includes(file.type)) {
      setError("Only JPG, PNG, GIF allowed");
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
    // store in formData directly
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  return (
    <>
      <ModalBody>
        <Input
          className="mb-3"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <div style={{ marginBottom: "40px" }}>
          <div ref={quillRef} />
        </div>

        <input
          type="file"
          id="imageUpload"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <button
          className="btn btn-secondary mb-2"
          onClick={() => document.getElementById("imageUpload").click()}
        >
          Add Image
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {preview && (
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={() => {
                setPreview("");
                setFormData((prev) => ({ ...prev, imageFile: null }));
              }}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X />
            </button>
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-primary" onClick={onSubmit}>
          {mode === "edit" ? "Update" : "Create"}
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </ModalFooter>
    </>
  );
};

const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const fetchStatus = useAppSelector((state) => state.posts.fetchStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageFile: null,
  });
  const [mode, setMode] = useState("create");
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    if (fetchStatus === "idle" && posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchStatus, posts.length]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreate = () => {
    setMode("create");
    setFormData({ title: "", content: "", imageFile: null });
    setModalKey((prev) => prev + 1);
    setIsModalOpen(true);
  };

  const handleEdit = (post) => {
    setMode("edit");
    setFormData({ ...post, imageFile: null });
    setModalKey((prev) => prev + 1);
    setIsModalOpen(true);
  };

  const handleClose = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    if (!formData.title) {
      return Swal.fire("Error", "Title is required", "error");
    }

    //  default image
    let imageUrl = DEFAULT_IMAGE;

    try {
      // imageFile is now inside formData directly
      if (formData.imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", formData.imageFile);

        const res = await fetch(`${API_URL}/api/upload/image`, {
          method: "POST",
          body: uploadData,
        });

        const data = await res.json();

        if (data?.file?.url) {
          imageUrl = data.file.url;
        }
      }

      const postPayload = {
        title: formData.title,
        content: formData.content,
        image: imageUrl,
        user: "69f314c924b0318dbc1de037",
      };

      if (mode === "edit") {
        dispatch(updatePostAsync({ id: formData._id, data: postPayload }));
      } else {
        dispatch(createPost(postPayload));
      }
      setTimeout(() => {
        dispatch(fetchPosts());
      }, 500);

      Swal.fire({
        icon: "success",
        title: mode === "edit" ? "Updated!" : "Created!",
        timer: 1500,
        showConfirmButton: false,
      });

      setIsModalOpen(false);
    } catch (err) {
      console.error("ERROR:", err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleDelete = (post) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${post.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePostAsync(post._id));
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Posts</BreadcrumbItem>
      </Breadcrumb>

      <h1>Posts</h1>

      <Widget
        className="pb-0"
        title={
          <div>
            <div className="pull-right mt-n-xs">
              <button className="btn btn-sm btn-inverse" onClick={handleCreate}>
                Create new
              </button>
            </div>
            <h5 className="mt-0">
              Posts <span className="fw-semi-bold">List</span>
            </h5>
          </div>
        }
      >
        <div className="widget-table-overflow">
          <Table striped>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Content</th>
                <th>Last Updated</th>
                <th>user email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    {/* always shows image - uploaded or default */}
                    <img
                      src={getImageSrc(post.image)}
                      alt="post"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open(getImageSrc(post.image), "_blank")
                      }
                    />
                  </td>
                  <td>{post.title}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: post.content.slice(0, 80),
                    }}
                  />
                  <td>{formatDate(post.updatedAt)}</td>
                  <td>{post.user?.email || "N/A"}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(post)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Widget>

      <Modal isOpen={isModalOpen} toggle={handleClose} unmountOnClose={true}>
        <ModalHeader toggle={handleClose}>
          {mode === "edit" ? "Edit Post" : "Create Post"}
        </ModalHeader>

        {isModalOpen && (
          <PostFormModal
            key={modalKey}
            mode={mode}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />
        )}
      </Modal>
    </div>
  );
};

export default PostList;
