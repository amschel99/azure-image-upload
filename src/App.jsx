import React from 'react'
import { Button,Alert } from '@mui/material';
import { uploadBlob } from './utils';
import './Navbar.css';
const Navbar = () => {
  return (
    <>
    <div className="navbar">
      <h1 className="navbar-title">Amschel File Uploader</h1>
    </div>
    </>
  );
};
const App = () => {
  const[azureStatus,setAzureStatus]=React.useState('')
  const[urls,setUrls]=React.useState([])
  const[files,setFiles]=React.useState(null)
  const [images,setImages]=React.useState([])
  React.useEffect(()=>{
setImages(urls)
  },[urls])
  return (
  <div style={{marginTop:'0'}}>
  <div style={{marginBottom:"15px"}}>
  <Navbar/>
  </div>

  <label for="images">Choose upto 5 pictures</label>
                            <input type="file" multiple required name="images" id="images" accept='image/png, image/jpeg'
                         onChange={async (e) => {
                        
                            e.preventDefault()
                          return   setFiles(e.target.files)
                        
                        
                       
                         
                         }}
                            />
                            <Button onClick={async ()=>{
                              setAzureStatus("hang on as we upload...")
                              if(files){
const response= await  uploadBlob(files);

setAzureStatus("done");
setInterval(()=>{setAzureStatus("")},2000);
 setUrls(response);
 return console.log(response)
                              }
                              alert("no files choosen or an error occured!")
                              


                            }}  disabled={!files}   variant="outlined"
                                >Upload files</Button>
                           
                          {azureStatus && <Alert severity="success">{azureStatus}</Alert>}
                          { urls && urls.map((url)=>{
                            return <div key="url">
                              <img src={url} alt={url}/>
                            </div>
                          })}
                          
  </div>
  )
}

export default App