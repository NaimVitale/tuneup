import { useState, useCallback } from "react";

export function useConfirmPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => {});

  const openConfirm = useCallback((msg, action) => {
    setMessage(msg);
    setOnConfirm(() => action);
    setIsOpen(true);
  }, []);

  const closeConfirm = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    message,
    onConfirm,
    openConfirm,
    closeConfirm,
  };
}
