

//Realizar post de un archivo a cloudinary y retornar la url para utilizarla en la vista
export const fileUpload = async(file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dai8kzhvl/upload'

    const formData = new FormData();
    formData.append('folder', 'notes-journal');
    formData.append('upload_preset','react-journal');
    formData.append('file',file);


    try {
        
        const resp = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        });

        if(resp.ok) {
            const data = await resp.json();
            return data.secure_url;
        }else {
            console.log('Error al subir la imagen');
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }

}