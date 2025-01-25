export default function Background() {
    return (
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/icons/background.png")', // Replace with the actual path to your image
        }}
      />
    );
  }
  