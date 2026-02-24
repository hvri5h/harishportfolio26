import { useState, useEffect } from "react";
import type { Project } from "../data/portfolio";

const workImages = import.meta.glob<string>(
  "/src/assets/work/**/*.{png,jpg,jpeg,webp,gif,mp4,webm,ogg}",
  { eager: true, import: "default" }
);

/** Returns only visible images (excludes _ prefixed) -- used by the main grid */
export function getProjectFolderImages(slug: string): string[] {
  return getSortedFolderImages(slug)
    .filter(({ hidden }) => !hidden)
    .map(({ url }) => url);
}

/** Returns ALL images including _ prefixed -- used by the modal */
export function getAllProjectFolderImages(slug: string): string[] {
  return getSortedFolderImages(slug).map(({ url }) => url);
}

function getSortedFolderImages(
  slug: string
): { url: string; hidden: boolean }[] {
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

      const cleanA = nameA.replace(/^_/, "");
      const cleanB = nameB.replace(/^_/, "");
      return cleanA.localeCompare(cleanB, undefined, { numeric: true });
    })
    .map(([path, url]) => ({
      url,
      hidden: (path.split("/").pop() || "").startsWith("_"),
    }));
}

export function isVideo(src: string): boolean {
  return /\.(mp4|webm|ogg)($|\?)/i.test(src);
}

export interface GridItem {
  src: string;
  project: Project;
  span: 1 | 2;
}

function loadImageDimensions(
  src: string
): Promise<{ src: string; width: number; height: number }> {
  if (isVideo(src)) {
    return Promise.resolve({ src, width: 1920, height: 1080 }); // assume landscape
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ src, width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ src, width: 9999, height: 5624 });
    img.src = src;
  });
}

/**
 * Pre-loads every project image, measures natural widths, and assigns
 * col-span values automatically.
 *
 * Per project: finds the max width, then images with width >= 60% of
 * that max get span 2 (full row), the rest get span 1 (half row).
 */
export function useProjectGrid(projects: Project[]): GridItem[] | null {
  const [items, setItems] = useState<GridItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function analyze() {
      const allItems: GridItem[] = [];

      for (const project of projects) {
        const urls = project.slug
          ? getProjectFolderImages(project.slug)
          : [project.image];

        const dims = await Promise.all(urls.map(loadImageDimensions));
        const maxWidth = Math.max(...dims.map((d) => d.width));

        for (const d of dims) {
          const aspectRatio = d.width / d.height;
          const isLandscape = aspectRatio > 1.1;

          allItems.push({
            src: d.src,
            project,
            span: isLandscape && d.width >= maxWidth * 0.6 ? 2 : 1,
          });
        }
      }

      if (!cancelled) setItems(allItems);
    }

    analyze();
    return () => {
      cancelled = true;
    };
  }, [projects]);

  return items;
}
