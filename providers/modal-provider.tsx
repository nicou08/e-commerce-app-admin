"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

// This way ensures that there is no hydration error.
// This is used in the layout.tsx which is a server rendered page.
// Timestamp: 1:00:00
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};
