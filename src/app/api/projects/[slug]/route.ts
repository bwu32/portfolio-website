import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const projectImagesDirectory = path.join(process.cwd(), 'public/icons/projects', slug);

  try {
    if (!fs.existsSync(projectImagesDirectory)) {
      return NextResponse.json([]);
    }

    const fileNames = fs.readdirSync(projectImagesDirectory);

    const images = fileNames
      .filter((fileName) => /\.(jpg|jpeg|png|webp|avif)$/i.test(fileName))
      .map((fileName) => ({
        // This points to the subfolder: /icons/projects/slug/filename.png
        src: `/icons/projects/${slug}/${fileName}`,
        caption: fileName.split('.')[0].replace(/[_-]/g, ' ').toUpperCase()
      }));

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json([]);
  }
}