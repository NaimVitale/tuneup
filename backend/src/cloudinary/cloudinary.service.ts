import { Injectable, Inject } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinaryClient) {}

  async uploadBuffer(fileBuffer: Buffer, folder: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinaryClient.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (err, result) => (err ? reject(err) : resolve(result)),
      );
      Readable.from(fileBuffer).pipe(upload);
    });
  }
}