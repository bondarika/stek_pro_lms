import { LessonImage } from '../types/LessonImage';

const images: Record<string, { default: string }> = import.meta.glob(
  '@/assets/modules/course_main/module-*/**/*/*.webp',
  { eager: true }
);

export const parsedLessons: LessonImage[] = Object.entries(images)
  .map(([path, img]) => {
    const match = path.match(
      /module-(\d+)\/(\d+)-([^/]+)\/([^/]+)\/(\d+)\.webp$/i
    );
    if (!match) return null;

    const [, moduleStr, lessonStr, lessonName, sectionRaw, stepStr] = match;

    return {
      module: Number(moduleStr),
      lesson: Number(lessonStr),
      lessonName,
      section: sectionRaw.toLowerCase(),
      step: Number(stepStr),
      image: (img as { default: string }).default
    };
  })
  .filter(Boolean) as LessonImage[];
