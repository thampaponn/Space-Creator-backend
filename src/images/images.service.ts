import { Injectable } from '@nestjs/common';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

@Injectable()
export class ImagesService {
  constructor(){}

  async uploadImage(image: Express.Multer.File): Promise<void>{
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `image/${image.originalname}`);

      const metadata = {
        contentType: image.mimetype,
      };

      const uploadTask = await uploadBytes(storageRef, image.buffer, metadata);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteImage(imageName: string): Promise<void>{
    const storage = getStorage();
    const desertRef = ref(storage, `image/${imageName}`);

    deleteObject(desertRef).then(() => {
      return "DELETED IMAGE";
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }

  async getImage(imageName: string): Promise<string>{
    const storage = getStorage();
    const desertRef = ref(storage, `image/${imageName}`);

    const url = await getDownloadURL(desertRef)

    return url;
  }
}
