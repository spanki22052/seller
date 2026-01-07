import { Modal } from "antd";
import { motion } from "framer-motion";
import { EditHomeLinkForm } from "./EditHomeLinkForm";
import { HomeLink } from "@/entities/home-link";
import * as Styled from "./styled";

interface EditHomeLinkModalProps {
  homeLink: HomeLink | null;
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

export function EditHomeLinkModal({ homeLink, open, onCancel }: EditHomeLinkModalProps) {
  const handleSuccess = () => {
    onCancel();
  };

  if (!homeLink) return null;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable
      destroyOnClose
      width={600}
      title="Редактировать ссылку главной страницы"
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
          <EditHomeLinkForm homeLink={homeLink} onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}
