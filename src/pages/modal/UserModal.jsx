import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const UserModal = ({
  modalType,
  toggleModal,
  formData,
  handleChange,
  handleUpdate,
  handleDelete,
  handleBlock,
  selectedUser,
}) => {
  return (
    <Modal isOpen={!!modalType} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        {modalType === "delete" && "Delete User"}
        {modalType === "block" && "Block User"}
        {(modalType === "edit" || modalType === "view") && "User Details"}
      </ModalHeader>

      <ModalBody>
        {/* DELETE */}
        {modalType === "delete" && (
          <p className="text-danger">
            Are you sure you want to delete this user?
          </p>
        )}

        {/* BLOCK */}
        {modalType === "block" && (
          <p className="text-danger">
            Are you sure you want to block this user?
          </p>
        )}

        {/* EDIT / VIEW */}
        {(modalType === "edit" || modalType === "view") && (
          <>
            <input
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="form-control mb-2"
              disabled={modalType === "view" || selectedUser?.blocked}
            />

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control mb-2"
              disabled={modalType === "view" || selectedUser?.blocked}
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control mb-2"
              disabled={modalType === "view" || selectedUser?.blocked}
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              disabled={modalType === "view" || selectedUser?.blocked}
            />
          </>
        )}
      </ModalBody>

      <ModalFooter>
        {/* EDIT */}
        {modalType === "edit" && !selectedUser?.blocked && (
          <Button color="warning" onClick={handleUpdate}>
            Save Changes
          </Button>
        )}

        {/* DELETE */}
        {modalType === "delete" && (
          <Button color="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        )}

        {/* BLOCK */}
        {modalType === "block" && (
          <Button color="danger" onClick={handleBlock}>
            Yes, Block
          </Button>
        )}

        <Button color="primary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
