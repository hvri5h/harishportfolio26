import { useMemo } from "react";
import type { Project } from "../data/portfolio";

const workImages = import.meta.glob<string>(
  "/src/assets/work/**/*.{png,jpg,jpeg,webp,gif,mp4,webm,ogg}",
  { eager: true, import: "default" }
);

export function getProjectFolderImages(slug: string): string[] {
  const prefix = `/src/assets/work/${slug}/`;
  return Object.entries(workImages)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => {
      const nameA = a.split("/").pop() || "";
      const nameB = b.split("/").pop() || "";

      const aIsBanner = nameA.toLowerCase().includes("banner");
      const bIsBanner = nameB.toLowerCase().includes("banner");
      if (aIsBanner && !bIsBanner) return -1;
      if (!aIsBanner && bIsBanner) return 1;

      return nameA.localeCompare(nameB, undefined, { numeric: true });
    })
    .map(([, url]) => url);
}

export function getProjectGridImage(slug: string): string | undefined {
  const images = getProjectFolderImages(slug);
  const nonBanner = images.find((url) => {
    const name = url.split("/").pop() || "";
    return !name.toLowerCase().includes("banner");
  });
  return nonBanner ?? images[0];
}

export function isVideo(src: string): boolean {
  return /\.(mp4|webm|ogg)($|\?)/i.test(src);
}

export interface GridItem {
  src: string;
  project: Project;
  span: 1 | 2;
}

/** Returns one GridItem per project for the home grid. */
export function useProjectGrid(projects: Project[]): GridItem[] | null {
  return useMemo(() => {
    return projects.map((project) => {
      const src =
        project.gridImage ??
        (project.slug ? getProjectGridImage(project.slug) : undefined) ??
        project.image;

      return {
        src,
        project,
        span: project.gridSpan ?? (project.isMobile ? 1 : 2),
      } as GridItem;
    });
  }, [projects]);
}
