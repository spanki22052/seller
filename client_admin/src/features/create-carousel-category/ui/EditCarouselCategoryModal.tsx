import { Modal } from "antd";
import { motion } from "framer-motion";
import { CarouselCategory } from "@/entities/carousel-category";
import { EditCarouselCategoryForm } from "./EditCarouselCategoryForm";
import * as Styled from "./styled";

interface EditCarouselCategoryModalProps {
  category: CarouselCategory | null;
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

export function EditCarouselCategoryModal({ category, open, onCancel }: EditCarouselCategoryModalProps) {
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
          <EditCarouselCategoryForm category={category} onSuccess={handleSuccess} />
        </Styled.ModalContent>
      </motion.div>
    </Modal>
  );
}
