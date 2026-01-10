import { Modal } from "antd";
import { motion } from "framer-motion";
import { CreateCarouselCategoryForm } from "./CreateCarouselCategoryForm";
import * as Styled from "./styled";

interface CreateCarouselCategoryModalProps {
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

export function CreateCarouselCategoryModal({ open, onCancel }: CreateCarouselCategoryModalProps) {
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
          <CreateCarouselCategoryForm onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}
