import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/Instagram.png';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import Link from 'next/link';
import { Storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signup, user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  let handelClick = async () => {
    console.log(email);
    console.log(password);
    console.log(fullname);
    console.log(file);
    // setLoading(true);
    // setError("");
    // await signup(email,password);
    // console.log(useInfo.user.uid);

    try {
      setLoading(true);
      setError("");
      const useinfo = await signup(email, password);
      console.log(useinfo.user.uid);
      const metadata = {
        contentType: "image/jpeg",
      }
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(Storage, `${useinfo.user.uid}/Profile`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
      console.log("user signuped")
    }
    catch (err) {
      console.log("error" , err);
      setError(err.code);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  }
  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <Image className='imagesize' src={logo} />
        <TextField
          id="outlined-basic"
          size="small"
          label="Email"
          variant="outlined"
          fullWidth
          margin='dense'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <TextField
          id="outlined-basic"
          size="small"
          label="Password"
          variant="outlined"
          fullWidth
          margin='dense'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />


        <TextField
          id="outlined-basic"
          size="small"
          label="Full Name"
          fullWidth
          margin='dense'
          value={fullname}
          onChange={(e) => setFullName(e.target.value)} />

        <Button
          color="secondary"
          variant="outlined"
          component="label"
          fullWidth
          size='small'
        >
          {/* <IconButton color="secondary">
                    <CloudUploadIcon />
                </IconButton> */}
          Upload Profile Image
          <input hidden accept="image/*" type="file" onChange={(e) => {
            setFile(e.target.files[0]);
          }} />
        </Button>
        <Button className='sinupbut' variant="contained"
          component="label" onClick={handelClick}>
          Sign Up
        </Button>
          {error != "" && <div style={{ color: "red" }}>{error}</div>}
        <div className='tnc'>
          By signing up, you agree to our terms,
          conditions and cookies policy
        </div>

      </div>
      <div className='buttom-card'>
        Already Have an account ? <Link href='/login'><span style={{ color: "blue" }}>Login</span></Link>
      </div>
    </div>
  )
}

export default index;