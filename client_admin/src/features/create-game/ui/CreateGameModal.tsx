import { Modal } from "antd";
import { motion } from "framer-motion";
import { CreateGameForm } from "./CreateGameForm";
import * as Styled from "./styled";

interface CreateGameModalProps {
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

export function CreateGameModal({ open, onCancel }: CreateGameModalProps) {
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
          <CreateGameForm onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}

