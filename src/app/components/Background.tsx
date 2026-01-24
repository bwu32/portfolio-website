export default function Background() {
  return (
    <div
      className="fixed inset-0 z-0 bg-cover bg-center w-screen h-screen"
      style={{
        backgroundImage: 'url("/icons/background.png")',
        // This ensures the image doesn't shift if the scrollbar appears/disappears
        backgroundAttachment: 'fixed' 
      }}
    />
  );
}