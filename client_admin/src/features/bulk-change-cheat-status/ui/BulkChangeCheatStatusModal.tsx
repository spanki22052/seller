import { Modal } from "antd";
import { motion } from "framer-motion";
import { BulkChangeCheatStatusForm } from "./BulkChangeCheatStatusForm";
import { useTranslation } from "react-i18next";

interface BulkChangeCheatStatusModalProps {
  open: boolean;
  cheatIds: string[];
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

export function BulkChangeCheatStatusModal({
  open,
  cheatIds,
  onCancel,
}: BulkChangeCheatStatusModalProps) {
  const { t } = useTranslation();

  const handleSuccess = () => {
    onCancel();
  };

  if (cheatIds.length === 0) {
    return null;
  }

  return (
    <Modal
      title={t("cheats.bulkChange.title")}
      open={open}
      onCancel={onCancel}
      footer={null}
      closable
      destroyOnClose
      width={500}
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
        <BulkChangeCheatStatusForm
          cheatIds={cheatIds}
          onSuccess={handleSuccess}
          onCancel={onCancel}
        />
      </motion.div>
    </Modal>
  );
}
