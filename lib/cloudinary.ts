import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  url: string;
  secureUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  publicId: string;
  format: string;
  dominantColor?: string;
}

/**
 * Upload an image to Cloudinary with optimization and transformations
 */
export async function uploadImage(
  file: File | Buffer | string,
  folder: string = 'pins',
  options: {
    generateThumbnail?: boolean;
    extractColor?: boolean;
  } = {}
): Promise<UploadResult> {
  try {
    let dataToUpload: string;

    // Convert File to base64 if needed
    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      dataToUpload = `data:${file.type};base64,${base64}`;
    } else if (Buffer.isBuffer(file)) {
      const base64 = file.toString('base64');
      const mimeType = 'image/jpeg'; // Default, could be enhanced
      dataToUpload = `data:${mimeType};base64,${base64}`;
    } else {
      dataToUpload = file;
    }

    // Upload with transformations
    const result = await cloudinary.uploader.upload(dataToUpload, {
      folder: `pinterest-clone/${folder}`,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 1200, crop: 'limit' },
      ],
      eager: options.generateThumbnail !== false ? [
        { width: 400, height: 400, crop: 'fill', quality: 'auto' },
        { width: 800, crop: 'limit', quality: 'auto' },
      ] : undefined,
      colors: options.extractColor !== false,
    });

    // Extract dominant color if available
    let dominantColor: string | undefined;
    if (result.colors && result.colors.length > 0) {
      dominantColor = result.colors[0][0];
    }

    return {
      url: result.url,
      secureUrl: result.secure_url,
      thumbnailUrl: result.eager && result.eager.length > 0
        ? result.eager[0].secure_url
        : result.secure_url,
      width: result.width,
      height: result.height,
      publicId: result.public_id,
      format: result.format,
      dominantColor,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

/**
 * Generate a Cloudinary URL with transformations
 */
export function getImageUrl(
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  }
): string {
  return cloudinary.url(publicId, {
    transformation: [
      {
        width: transformations?.width,
        height: transformations?.height,
        crop: transformations?.crop || 'fill',
        quality: transformations?.quality || 'auto',
        fetch_format: transformations?.format || 'auto',
      },
    ],
    secure: true,
  });
}

/**
 * Upload avatar image with circular crop
 */
export async function uploadAvatar(file: File | Buffer | string): Promise<UploadResult> {
  try {
    let dataToUpload: string;

    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      dataToUpload = `data:${file.type};base64,${base64}`;
    } else if (Buffer.isBuffer(file)) {
      const base64 = file.toString('base64');
      dataToUpload = `data:image/jpeg;base64,${base64}`;
    } else {
      dataToUpload = file;
    }

    const result = await cloudinary.uploader.upload(dataToUpload, {
      folder: 'pinterest-clone/avatars',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' },
      ],
      eager: [
        { width: 200, height: 200, crop: 'fill', gravity: 'face', quality: 'auto' },
        { width: 100, height: 100, crop: 'fill', gravity: 'face', quality: 'auto' },
      ],
    });

    return {
      url: result.url,
      secureUrl: result.secure_url,
      thumbnailUrl: result.eager?.[1]?.secure_url || result.secure_url,
      width: result.width,
      height: result.height,
      publicId: result.public_id,
      format: result.format,
    };
  } catch (error) {
    console.error('Avatar upload error:', error);
    throw new Error('Failed to upload avatar');
  }
}

export default cloudinary;
