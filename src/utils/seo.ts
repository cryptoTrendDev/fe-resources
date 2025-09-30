import { Metadata } from "next";

export type TSEO = {
  title: string;
  keywords?: string[];
  description: string;
  thumbnail: string;
};

const defaultSEO: TSEO = {
  title: "FE Resources",
  description: "FE Resources is a collection of useful front-end resources, tools, and libraries for developers.",
  thumbnail: "/share_cover.png",
  keywords: [],
};

export function generateMetadata({ title, description, thumbnail, keywords }: Partial<TSEO> = {}): Metadata {
  return {
    title: title ?? defaultSEO.title,
    description: description ?? defaultSEO.description,
    // metadataBase: new URL(""),
    keywords: keywords ?? defaultSEO.keywords,
    twitter: {
      title: title ?? defaultSEO.title,
      description: description ?? defaultSEO.description,
      images: [thumbnail ?? defaultSEO.thumbnail],
    },
    openGraph: {
      title: title ?? defaultSEO.title,
      description: description ?? defaultSEO.description,
      images: [thumbnail ?? defaultSEO.thumbnail],
    },
  };
}
