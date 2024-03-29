import * as crypto from 'crypto';

import * as admin from 'firebase-admin';

const FIREBASE_KEY = process.env.FIREBASE_KEY;
const FIREBASE_URL = process.env.FIREBASE_URL;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(FIREBASE_KEY!) as admin.ServiceAccount),
  storageBucket: FIREBASE_URL,
});

const bucket = admin.storage().bucket();

const generateId = (length: number): string => {
  const bytes: Buffer = crypto.randomBytes(Math.ceil(length / 2));
  return bytes.toString('hex').slice(0, length);
};

const uploadPicture = async (picture: any): Promise<string> => {

  const { buffer, originalname, mimetype } = picture;
  const id = generateId(24);
  const fileExtension = originalname.slice((originalname.lastIndexOf('.') - 1 >>> 0) + 2);
  const firebasePath = `${id}.${fileExtension}`;

  const file = bucket.file(firebasePath);
  await file.save(buffer, {
    metadata: {
      contentType: mimetype,
    },
  });

  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: '01-01-3000',
  });

  return url;
};

const uploadPictures = async (pictures: any): Promise<string[]> => {
  const pictureURLs: string[] = await Promise.all(
    pictures.map((picture: any) => uploadPicture(picture))
  );

  return pictureURLs;
};

export {
  uploadPicture,
  uploadPictures
};
