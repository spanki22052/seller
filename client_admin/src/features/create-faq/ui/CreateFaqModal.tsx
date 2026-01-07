import { Modal } from "antd";
import { motion } from "framer-motion";
import { CreateFaqForm } from "./CreateFaqForm";
import * as Styled from "./styled";

interface CreateFaqModalProps {
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

export function CreateFaqModal({ open, onCancel }: CreateFaqModalProps) {
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
      width={700}
      title="Создать FAQ"
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
          <CreateFaqForm onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}
