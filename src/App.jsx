import { useEffect, useState } from "react";
import "./App.css";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { v4 } from "uuid";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const [categorieList, setCategorieList] = useState([]);
  const [Categorie, setCategorie] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [hostLink, setHostLink] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const imageListRef = ref(storage, "projectImages/");

  const moviesCollection = collection(db, "files");

  const successNotify = () => toast.success("Successfully added");
  const errorsNotify = () => toast.error("Error has occurred");

  const uploadImage = () => {
    if (imageUpload == null) return;
    setIsloading(true);
    const imageRef = ref(storage, `projectImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setImageList(url);
          addDoc(moviesCollection, {
            title: title,
            imageUrl: url,
            description: description,
            categories: categorieList,
            repoLink: repoLink,
            hostLink: hostLink,
          });
          setImageUpload(null);
          setDescription("");
          setTitle("");
          setRepoLink("");
          setHostLink("");
          setCategorieList([]);
          setIsloading(false);
          successNotify();
        })
        .catch(() => {
          errorsNotify();
          setIsloading(false);
        })
        .finally(() => {
          setIsloading(false);
        });
    });
  };

  const updateCategorie = () => {
    setCategorieList((prev) => [...prev, Categorie.toUpperCase()]);
    setCategorie("");
  };

  return (
    <div className="flex flex-col gap-3">
      <Toaster />
      <input
        type="text"
        placeholder="Project Title"
        className="px-2 py-3 bg-slate-700"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        type="text"
        placeholder="Project Description"
        className="px-2 py-3 bg-slate-700"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <input
        type="text"
        placeholder="Repo Link"
        className="px-2 py-3 bg-slate-700"
        onChange={(e) => setRepoLink(e.target.value)}
        value={repoLink}
      />
      <input
        type="text"
        placeholder="Host Link"
        className="px-2 py-3 bg-slate-700"
        onChange={(e) => setHostLink(e.target.value)}
        value={hostLink}
      />
      <div className="justify-between flex gap-3">
        <input
          type="text"
          placeholder="Add Categories"
          className="px-2 py-3 bg-slate-700"
          onChange={(e) => setCategorie(e.target.value)}
          value={Categorie}
        />
        <button onClick={updateCategorie}>Add</button>
      </div>

      <div className="flex justify-center">
        <ol>
          {categorieList.map((cat) => (
            <li
              key={cat}
              className="bg-slate-600 w-fit rounded-md px-3 py-1 text-xs float-left mx-1"
            >
              {cat}
            </li>
          ))}
        </ol>
      </div>
      <input
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      <button
        onClick={uploadImage}
        disabled={isLoading}
        className="flex justify-center"
      >
        {!isLoading ? "Submit file" : <Spinner />}
      </button>
      {/* <div>
        {imageList.map((item) => {
          return (
            <img src={item} alt="" width={100} className="mt-1" key={item} />
          );
        })}
      </div> */}
    </div>
  );
}

export default App;
