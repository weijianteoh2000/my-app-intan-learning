import { useState, useEffect } from 'react';
import '../App.css';
import { db, storage } from '../firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function ImageUpload() {
    //variable for storing image that will be uploaded
    const [imageUpload, setImageUpload] = useState(null); 
    // variable for storing image in firebase
    const [imageList, setImageList] = useState([]);
    //reference to the path of images
    const imageListRef = ref(storage, "images/") 

    //function to upload image
    const uploadImage = () => {
        if (imageUpload == null) return;
        //
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
            });
        });
    };

    //get all images
    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    return (
        <div className="ImageUpload">
            <input type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]) 
                    // defaul system handle uploaded file is using array
                    // so need to target the file that we upload which is files[0] 
                }}
            />
            <button onClick={uploadImage}>Upload Image</button>

            {imageList.map((url) => {
                return <img src={url} width="250px" height={"250px"}/>;
            })}
        </div>
    );
}

export default ImageUpload;
