"use client";

import { useEffect } from "react";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useStore } from "zustand";

export default function SetUpPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className="p-4">
      <div>SETUP PAGE AKA ROOT PAGE</div>
    </div>
  );
}
