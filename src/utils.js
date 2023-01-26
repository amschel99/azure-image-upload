
import { BlobServiceClient} from "@azure/storage-blob"


const sasToken=import.meta.env.VITE_SAS_URL
const blobServiceClient = new BlobServiceClient(
 `${sasToken}`
);

let blobUrl;
let blockBlobClient;
export const  uploadBlob=  async (files)=>{
  try{
    const containerClient=  blobServiceClient.getContainerClient(import.meta.env.VITE_CONTAINER)
        const promises = [];
        let urls=[]
        for (const file of files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
                blobUrl= blockBlobClient.url;// 
            promises.push(blockBlobClient.uploadBrowserData(file));
             urls.push(blobUrl)
        }
        await Promise.all(promises);
       
        return urls;
        
  }
  catch(e){
console.log(e)
  }
    


}
