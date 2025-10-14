import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async handleUploads(
    files: Record<string, Express.Multer.File[]>,
    folder: string,
    allowedFields: string[],
  ) {
    const uploaded: Record<string, string> = {};
    if (!files) return uploaded;

    await Promise.all(
      Object.entries(files)
        .filter(([key]) => allowedFields.includes(key))
        .map(async ([key, value]) => {
          const file = value[0];
          const result = await this.cloudinaryService.uploadBuffer(file.buffer, `${folder}/${key}`);
          uploaded[key] = result.secure_url;
        }),
    );

    return uploaded;
  }
}