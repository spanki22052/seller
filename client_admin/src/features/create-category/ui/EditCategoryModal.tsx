import { Modal } from "antd";
import { motion } from "framer-motion";
import { EditCategoryForm } from "./EditCategoryForm";
import * as Styled from "./styled";

interface EditCategoryModalProps {
  category: { id: string; name: string } | null;
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

export function EditCategoryModal({ category, open, onCancel }: EditCategoryModalProps) {
  const handleSuccess = () => {
    onCancel();
  };

  if (!category) return null;

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
          <EditCategoryForm category={category} onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}
