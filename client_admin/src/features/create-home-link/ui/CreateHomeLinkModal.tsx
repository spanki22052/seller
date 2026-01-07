import { Modal } from "antd";
import { motion } from "framer-motion";
import { CreateHomeLinkForm } from "./CreateHomeLinkForm";
import * as Styled from "./styled";

interface CreateHomeLinkModalProps {
  open: boolean;
  onCancel: () => void;
}

const contentVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

export function CreateHomeLinkModal({ open, onCancel }: CreateHomeLinkModalProps) {
  const handleSuccess = () => {
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable
      destroyOnClose
      width={600}
      title="Создать ссылку главной страницы"
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.ModalContent>
          <CreateHomeLinkForm onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}
