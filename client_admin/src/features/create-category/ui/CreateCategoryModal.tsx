import { Modal } from "antd";
import { motion } from "framer-motion";
import { CreateCategoryForm } from "./CreateCategoryForm";
import * as Styled from "./styled";

interface CreateCategoryModalProps {
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

export function CreateCategoryModal({ open, onCancel }: CreateCategoryModalProps) {
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
      width={500}
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
          <CreateCategoryForm onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}
