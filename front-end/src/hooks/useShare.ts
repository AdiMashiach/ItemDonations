type ShareButtonProps = {
  title: string;
  text?: string;
  url: string;
}
export const handleShare = async ({ title, text, url }: ShareButtonProps) => {
  if (navigator.share) {
    try {      
      await navigator.share({
        title,
        text,
        url
      })

    } catch (error) {
      console.log(error);
    }
  }
}