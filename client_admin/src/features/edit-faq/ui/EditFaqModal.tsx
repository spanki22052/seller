import { Modal } from "antd";
import { motion } from "framer-motion";
import { EditFaqForm } from "./EditFaqForm";
import { Faq } from "@/entities/faq";
import * as Styled from "./styled";

interface EditFaqModalProps {
  faq: Faq | null;
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

export function EditFaqModal({ faq, open, onCancel }: EditFaqModalProps) {
  const handleSuccess = () => {
    onCancel();
  };

  if (!faq) return null;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable
      destroyOnClose
      width={700}
      title="Редактировать FAQ"
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
          <EditFaqForm faq={faq} onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}
