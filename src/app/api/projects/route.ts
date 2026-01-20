import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Define the path to your markdown files
    const projectsDirectory = path.join(process.cwd(), 'public/icons/projects');
    
    // Read the directory
    const fileNames = fs.readdirSync(projectsDirectory);
    
    // Filter for .md files and remove the extension to get the slug
    const slugs = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''));

    return NextResponse.json(slugs);
  } catch (error) {
    console.error('Failed to read projects directory:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}