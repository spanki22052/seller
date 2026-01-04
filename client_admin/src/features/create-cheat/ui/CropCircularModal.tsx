import { useState, useCallback, useEffect, useRef } from "react";
import { Modal, Button, Slider, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import * as Styled from "./styled";
import { getCroppedCircularImg } from "../lib/cropCircularImage";

interface CropCircularModalProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImageFile: File) => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  // For square crops, use the smaller dimension percentage
  // This ensures the crop fits within both width and height
  const imageAspect = mediaWidth / mediaHeight;
  let cropPercent: number;
  
  if (imageAspect > aspect) {
    // Image is wider than crop aspect - limit by height
    cropPercent = Math.min(90, (mediaHeight * aspect / mediaWidth) * 100);
  } else {
    // Image is taller than crop aspect - limit by width
    cropPercent = Math.min(90, (mediaWidth / aspect / mediaHeight) * 100);
  }
  
  // Ensure minimum size
  cropPercent = Math.max(cropPercent, 50);
  
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: cropPercent,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function CropCircularModal({
  open,
  imageSrc,
  onClose,
  onCropComplete,
}: CropCircularModalProps) {
  const { t } = useTranslation();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [zoom, setZoom] = useState(1);
  const [cropping, setCropping] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset state when modal opens or image changes
  useEffect(() => {
    if (open && imageSrc) {
      setCrop(undefined);
      setCompletedCrop(undefined);
      setZoom(1);
    }
  }, [open, imageSrc]);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const newCrop = centerAspectCrop(naturalWidth, naturalHeight, 1);
    setCrop(newCrop);
  }, []);

  const handleApply = useCallback(async () => {
    if (!imageSrc || !completedCrop || !imgRef.current) return;

    setCropping(true);
    try {
      const croppedImageFile = await getCroppedCircularImg(
        imageSrc,
        completedCrop,
        imgRef.current
      );
      onCropComplete(croppedImageFile);
      message.success(t("cheats.form.imageCroppedSuccess"));
    } catch (error) {
      message.error(t("cheats.form.imageCropFailed"));
    } finally {
      setCropping(false);
    }
  }, [imageSrc, completedCrop, onCropComplete, t]);

  const handleCancel = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setZoom(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onCancel={handleCancel}
          footer={null}
          width={600}
          closable={false}
          styles={{
            body: { padding: 0 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Styled.CropModalContent>
              <Styled.CropHeader>
                <Styled.CropTitle>{t("cheats.form.cropCircularImage")}</Styled.CropTitle>
              </Styled.CropHeader>

              <Styled.CropContainer>
                {imageSrc && (
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={1}
                    circularCrop
                    minWidth={50}
                  >
                    <img
                      ref={imgRef}
                      alt="Crop me"
                      src={imageSrc}
                      style={{
                        transform: `scale(${zoom})`,
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        display: "block",
                        objectFit: "contain",
                      }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                )}
              </Styled.CropContainer>

              <Styled.CropControls>
                <Styled.ZoomLabel>{t("cheats.form.zoom")}</Styled.ZoomLabel>
                <Styled.SliderWrapper>
                  <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={setZoom}
                    tooltip={{ formatter: (value) => `${Math.round((value || 1) * 100)}%` }}
                  />
                </Styled.SliderWrapper>
              </Styled.CropControls>

              <Styled.CropActions>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button icon={<CloseOutlined />} onClick={handleCancel} disabled={cropping}>
                    {t("common.cancel")}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={handleApply}
                    loading={cropping}
                    disabled={!completedCrop}
                  >
                    {t("cheats.form.applyCrop")}
                  </Button>
                </motion.div>
              </Styled.CropActions>
            </Styled.CropModalContent>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
