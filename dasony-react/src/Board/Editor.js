// import React, { useRef, useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import MyButton from "./MyButton";
// import './Board.css';

// const Editor = () => {
//   const navigate = useNavigate();

//   const titleRef = useRef();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const customUploadAdapter = (loader) => {
//     return {
//       upload() {
//         return new Promise((resolve, reject) => {
//           const formData = new FormData();
//           loader.file.then((file) => {
//             formData.append("file", file);

//             // axios
//             //   .post("http://localhost:8080/api/v0/file/upload", formData)
//             //   .then((res) => {
//             //     resolve({
//             //       default: res.data.data.uri,
//             //     });
//             //   })
//             //   .catch((err) => reject(err));
//           });
//         });
//       },
//     };
//   };

//   function uploadPlugin(editor) {
//     editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//       return customUploadAdapter(loader);
//     };
//   }

//   const handleSubmit = () => {
//     if (title.length < 1) {
//       titleRef.current.focus();
//       return;
//     }

//     const data = {
//       title,
//       content,
//     };

//     // axios.post("http://localhost:8083/", data).then((res) => {
//     //   if (res.status === 200) {
//     //     navigate("/", { replace: true });
//     //     return;
//     //   } else {
//     //     alert("업로드 실패.");
//     //     return;
//     //   }
//     // });
//   };

//   return (
//     <div className="Editor-container">
//       <section>
//         <CKEditor
//           editor={ClassicEditor}
//           data=""
//           config={{ extraPlugins: [uploadPlugin] }}
//           onReady={(editor) => {
//             // You can store the "editor" and use when it is needed.
//             console.log("Editor is ready to use!", editor);
//           }}
//           onChange={(event, editor) => {
//             setContent(editor.getData());
//             console.log({ event, editor, content });
//           }}
//           onBlur={(event, editor) => {
//             console.log("Blur.", editor);
//           }}
//           onFocus={(event, editor) => {
//             console.log("Focus.", editor);
//           }}
//         />
//       </section>
//       <section>
//         <div className="Editor-control-box board-btn-cntrol-box">
//           <div className="Editor-cancel-btn-wrapper board-btn-wrapper">
//             <button className="Editor-cancel-btn board-cancel-btn" onClick={() => navigate(-1, { replace: true })}>취소</button>
//           </div>
//           <div className="Editor-submit-btn-wrapper">
//             <button className="Editor-submit-btn board-submit-btn" type="black" onClick={handleSubmit}>완료</button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Editor;