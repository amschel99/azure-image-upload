
import { BlobServiceClient} from "@azure/storage-blob"


const sasToken="https://motaautombiles.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-01-31T22:52:01Z&st=2023-01-23T14:52:01Z&spr=https,http&sig=GQjBdYiru%2BSr9DG6HbKtAggXnM4A5rp63Lub4GGuxRY%3D"
const blobServiceClient = new BlobServiceClient(
 `${sasToken}`
);

let blobUrl;
let blockBlobClient;
export const  uploadBlob=  async (files)=>{
  try{
    const containerClient=  blobServiceClient.getContainerClient("cars")
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
