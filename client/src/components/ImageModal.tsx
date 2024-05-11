type PropsType = {
  imageUrl: string | null;
  altText?: string;
  exit: () => any
}

export default function ImageModal({ imageUrl, altText, exit }: PropsType) {
  return (
    <>
      {imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-4 shadow-lg max-w-3xl w-full">
            <button
              onClick={exit}
              className="absolute -top-4 -right-4 bg-gray-200 text-black font-bold px-3 py-2 rounded-full focus:outline-none"
            >
              ✖
            </button>
            <img src={imageUrl} alt={altText} className="w-full h-auto" />
          </div>
        </div>
      )}
    </>
  );
}
