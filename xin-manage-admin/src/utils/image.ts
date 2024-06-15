import imageCompression from 'browser-image-compression';


export const compressImage = async (file: File) => {
    const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        let fileUpload = file;
        console.log("file.size / 1024 / 1000:", file.size / 1024 / 1000)
        if (file.size / 1024 / 1000 > 0.2){
            fileUpload = await imageCompression(file, options);
            console.log(`Compressed image successfully: ${file.size/1024/1000} -> ${fileUpload.size/1024/1000}`)
        }
        return fileUpload
    }
    catch (err) {
        return null
    }
}