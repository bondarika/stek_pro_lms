import { parsedLessons } from "./parsedLessons";

const groupLessons = () => {
  const grouped = new Map<
    number,
    Map<
      number,
      {
        lessonName: string;
        sections: Map<string, { step: number; image: string }[]>;
      }
    >
  >();

  for (const item of parsedLessons) {
    if (!grouped.has(item.module)) {
      grouped.set(item.module, new Map());
    }

    const module = grouped.get(item.module)!;

    if (!module.has(item.lesson)) {
      module.set(item.lesson, {
        lessonName: item.lessonName,
        sections: new Map()
      });
    }

    const lesson = module.get(item.lesson)!;

    if (!lesson.sections.has(item.section)) {
      lesson.sections.set(item.section, []);
    }

    lesson.sections.get(item.section)!.push({
      step: item.step,
      image: item.image
    });
  }

  for (const module of grouped.values()) {
    for (const lesson of module.values()) {
      for (const section of lesson.sections.values()) {
        section.sort((a, b) => a.step - b.step);
      }
    }
  }

  return grouped;
};


export const groupedLessons = groupLessons();