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
import { Eye, Pencil, Trash2, Ban } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

// ✅ Change this to your backend URL
const BASE_URL = `${API_URL}/api/users`;

const UserPage = () => {
  const [users, setUsers] = useState([]);

  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("view"); // view | edit
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ 1. FETCH ALL USERS on page load
  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setUsers(res.data.data); // we using data.data because we store our backend in the {{ success: true, data: user }} for getting the array we use the data.data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // runs once when page load

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
          fetchUsers(); // refresh list
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
          fetchUsers(); // refresh list
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
      fetchUsers(); // refresh list
      setIsModalOpen(false);
      Swal.fire("Updated!", "User has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Could not update user.", "error");
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Users</BreadcrumbItem>
      </Breadcrumb>

      <h2 className="mb-4">Users Table</h2>

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
              {/*  use index+1 for serial number, _id is MongoDB id */}
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

                {/* BLOCK */}
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

      {/* MODAL (VIEW + EDIT) */}
      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
        <ModalHeader toggle={() => setIsModalOpen(false)}>
          {mode === "edit" ? "Edit User" : "View User"}
        </ModalHeader>

        <ModalBody>
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
        </ModalBody>

        <ModalFooter>
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
