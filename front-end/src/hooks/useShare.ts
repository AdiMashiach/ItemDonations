import { useCallback } from "react";

const useShare = () => {
  const shareContent = useCallback(
    async (data: { title: string; text?: string; url?: string }) => {
      if (navigator.share) {
        try {
          await navigator.share(data);
        } catch (error) {
          console.error(error);
        }
      }
    },
    []
  );

  return shareContent;
};

export default useShare;
