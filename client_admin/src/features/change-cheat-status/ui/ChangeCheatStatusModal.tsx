import { Modal } from "antd";
import { motion } from "framer-motion";
import { ChangeCheatStatusForm } from "./ChangeCheatStatusForm";
import { Cheat } from "@/entities/cheat";
import { useTranslation } from "react-i18next";

interface ChangeCheatStatusModalProps {
  open: boolean;
  cheat: Cheat | null;
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

export function ChangeCheatStatusModal({
  open,
  cheat,
  onCancel,
}: ChangeCheatStatusModalProps) {
  const { t } = useTranslation();

  const handleSuccess = () => {
    onCancel();
  };

  if (!cheat) {
    return null;
  }

  return (
    <Modal
      title={t("cheats.changeStatus.title", { name: cheat.name })}
      open={open}
      onCancel={onCancel}
      footer={null}
      closable
      destroyOnClose
      width={400}
      styles={{
        body: {
          padding: 24,
        },
      }}
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <ChangeCheatStatusForm
          cheat={cheat}
          onSuccess={handleSuccess}
          onCancel={onCancel}
        />
      </motion.div>
    </Modal>
  );
}
