"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface ImageModalStateContextValue {
  isImageModalOpen: boolean;
}

interface ImageModalActionsContextValue {
  setIsImageModalOpen: (isOpen: boolean) => void;
}

const ImageModalStateContext = createContext<
  ImageModalStateContextValue | undefined
>(undefined);
const ImageModalActionsContext = createContext<
  ImageModalActionsContextValue | undefined
>(undefined);

export function ImageModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const stateValue = useMemo(() => ({ isImageModalOpen }), [isImageModalOpen]);
  const actionsValue = useMemo(
    () => ({ setIsImageModalOpen }),
    [setIsImageModalOpen]
  );

  return (
    <ImageModalStateContext.Provider value={stateValue}>
      <ImageModalActionsContext.Provider value={actionsValue}>
        {children}
      </ImageModalActionsContext.Provider>
    </ImageModalStateContext.Provider>
  );
}

export function useImageModalState() {
  const context = useContext(ImageModalStateContext);
  if (!context) {
    throw new Error(
      "useImageModalState must be used within ImageModalProvider"
    );
  }
  return context;
}

export function useImageModalActions() {
  const context = useContext(ImageModalActionsContext);
  if (!context) {
    throw new Error(
      "useImageModalActions must be used within ImageModalProvider"
    );
  }
  return context;
}

