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
      .filter((fileName) => /\.(jpg|jpeg|png|webp|avif|gif|mp4|mov)$/i.test(fileName))
      .map((fileName) => {
        // 1. Get the name without the extension
        const baseName = fileName.split('.')[0];

        // 2. Remove leading numbers and separators (e.g., "01_", "02-", "10_")
        // This regex looks for digits at the start (^) followed by _ or -
        const cleanName = baseName.replace(/^\d+[_-]/, '');

        return {
          src: `/icons/projects/${slug}/${fileName}`,
          // 3. Transform "clean_name" to "CLEAN NAME"
          caption: cleanName.replace(/[_-]/g, ' ').toUpperCase()
        };
      })
      .sort((a, b) => a.src.localeCompare(b.src)); // Ensures alphabetical (numeric) order

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json([]);
  }
}