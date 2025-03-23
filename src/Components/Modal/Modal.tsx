import { useState, useEffect } from "react";

// const Modal = ({ isOpen, onClose, todo, onUpdate }) => {
//   const [title, setTitle] = useState("");

//   // 🔹 Saat modal dibuka, isi dengan title todo yang sedang diedit
//   useEffect(() => {
//     if (todo) {
//       setTitle(todo.title);
//     }
//   }, [todo]);

//   const handleSubmit = () => {
//     if (!title.trim()) return;

//     // 🔹 Kirim data yang sudah diedit ke `onUpdate`
//     onUpdate({ ...todo, title });

//     onClose(); // ✅ Tutup modal setelah update
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
//       <div className="bg-white p-5 rounded-md">
//         <h2 className="text-lg font-semibold">Edit Todo</h2>
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mt-2" />
//         <div className="flex justify-end gap-2 mt-3">
//           <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
//             Cancel
//           </button>
//           <button onClick={handleSubmit} className="px-3 py-1 bg-blue-500 text-white rounded">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
const Modal = ({ isOpen, onClose, todo, onUpdate }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onUpdate({ ...todo, title });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* 🔹 bg-black/50 -> Warna hitam transparan */}
      <div className="bg-white p-5 rounded-md shadow-2xl w-96">
        <h2 className="text-lg font-semibold">Edit Todo</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mt-2" />
        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
