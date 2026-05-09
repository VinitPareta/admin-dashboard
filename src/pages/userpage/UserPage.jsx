import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { Eye, Pencil, Trash2, Ban, UserPlus } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

// ✅ Change this to your backend URL
const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/api/users`;

const UserPage = () => {
  const [users, setUsers] = useState([]);

  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("view"); // view | edit | create
  const [selectedUser, setSelectedUser] = useState(null);

  // CREATE FORM STATE
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });

  // ✅ 1. FETCH ALL USERS on page load
  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ 2. DELETE
  const handleDelete = (user) => {
    Swal.fire({
      title: "Delete User",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/${user._id}`);
          fetchUsers();
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Could not delete user.", "error");
        }
      }
    });
  };

  // ✅ 3. BLOCK / UNBLOCK
  const handleBlock = (user) => {
    Swal.fire({
      title: user.isBlocked ? "Unblock User" : "Block User",
      text: `Are you sure you want to ${user.isBlocked ? "unblock" : "block"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`${BASE_URL}/${user._id}/toggle-block`);
          fetchUsers();
        } catch (error) {
          Swal.fire("Error!", "Could not block/unblock user.", "error");
        }
      }
    });
  };

  // VIEW
  const handleView = (user) => {
    setMode("view");
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // EDIT - open modal
  const handleEdit = (user) => {
    setMode("edit");
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  // ✅ 4. UPDATE USER
  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/${selectedUser._id}`, {
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
      });
      fetchUsers();
      setIsModalOpen(false);
      Swal.fire("Updated!", "User has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Could not update user.", "error");
    }
  };

  // CREATE - open modal
  const handleOpenCreate = () => {
    setNewUser({ name: "", email: "", phone: "" });
    setMode("create");
    setIsModalOpen(true);
  };

  // ✅ 5. CREATE USER
  const handleCreate = async () => {
    const { name, email, phone } = newUser;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      Swal.fire("Validation Error", "All fields are required.", "warning");
      return;
    }

    try {
      await axios.post(BASE_URL, { name, email, phone });
      fetchUsers();
      setIsModalOpen(false);
      Swal.fire("Created!", "New user has been created.", "success");
    } catch (error) {
      const message = error.response?.data?.message || "Could not create user.";
      Swal.fire("Error!", message, "error"); // shows "Email already exists" from backend
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Users</BreadcrumbItem>
      </Breadcrumb>

      {/* Header row with Create button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Users Table</h2>
        <button className="btn btn-primary" onClick={handleOpenCreate}>
          <UserPlus size={16} className="me-2" />
          Create User
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} style={{ opacity: user.isBlocked ? 0.5 : 1 }}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>

              <td className="d-flex gap-2">
                {/* VIEW */}
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleView(user)}
                >
                  <Eye size={16} />
                </button>

                {/* EDIT */}
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(user)}
                  disabled={user.isBlocked}
                >
                  <Pencil size={16} />
                </button>

                {/* DELETE */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user)}
                >
                  <Trash2 size={16} />
                </button>

                {/* BLOCK / UNBLOCK */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBlock(user)}
                >
                  <Ban size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL (VIEW + EDIT + CREATE) */}
      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
        <ModalHeader toggle={() => setIsModalOpen(false)}>
          {mode === "create"
            ? "Create User"
            : mode === "edit"
              ? "Edit User"
              : "View User"}
        </ModalHeader>

        <ModalBody>
          {mode === "create" ? (
            <>
              <Input
                className="mb-2"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <Input
                className="mb-2"
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <Input
                className="mb-2"
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <Input
                className="mb-2"
                placeholder="Name"
                value={selectedUser?.name || ""}
                disabled={mode === "view"}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
              <Input
                className="mb-2"
                placeholder="Email"
                value={selectedUser?.email || ""}
                disabled={mode === "view"}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
              <Input
                className="mb-2"
                placeholder="Phone"
                value={selectedUser?.phone || ""}
                disabled={mode === "view"}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, phone: e.target.value })
                }
              />
            </>
          )}
        </ModalBody>

        <ModalFooter>
          {mode === "create" && (
            <button className="btn btn-primary" onClick={handleCreate}>
              Create
            </button>
          )}
          {mode === "edit" && (
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserPage;
