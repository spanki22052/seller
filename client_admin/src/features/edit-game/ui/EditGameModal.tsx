import { Modal } from "antd";
import { motion } from "framer-motion";
import { EditGameForm } from "./EditGameForm";
import { Game } from "@/entities/game";
import * as Styled from "./styled";

interface EditGameModalProps {
  open: boolean;
  game: Game | null;
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

export function EditGameModal({ open, game, onCancel }: EditGameModalProps) {
  const handleSuccess = () => {
    onCancel();
  };

  if (!game) {
    return null;
  }

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
          <EditGameForm game={game} onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}

