import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const neutralModalTheme = {
  root: {
    show: {
      on: "flex bg-neutral-900/50 dark:bg-neutral-900/80",
    },
  },
  content: {
    inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-neutral-800",
  },
  header: {
    base: "flex items-start justify-between rounded-t border-b p-5 dark:border-neutral-700",
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ms-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-neutral-200 hover:text-gray-900 dark:hover:bg-neutral-700 dark:hover:text-white",
    },
  },
  footer: {
    base: "flex items-center gap-2 rounded-b border-gray-200 p-6 dark:border-neutral-700",
  },
};

export default function ModalWrapper({ header, body, openModal, setOpenModal }) {
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
        theme={neutralModalTheme}
      >
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{body}</ModalBody>
      </Modal>
    </>
  );
}
