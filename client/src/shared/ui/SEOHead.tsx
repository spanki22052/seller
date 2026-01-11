"use client";

import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

export function SEOHead({ title, description, keywords, canonical }: SEOHeadProps) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (description) {
        metaDescription.setAttribute("content", description);
      }
    } else if (description) {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      if (keywords) {
        metaKeywords.setAttribute("content", keywords);
      }
    } else if (keywords) {
      const newMeta = document.createElement("meta");
      newMeta.name = "keywords";
      newMeta.content = keywords;
      document.head.appendChild(newMeta);
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink && canonical) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    if (canonicalLink && canonical) {
      canonicalLink.setAttribute("href", canonical);
    }

    // Cleanup function to remove added meta tags when component unmounts
    return () => {
      // Note: We don't remove meta tags on unmount as they might be needed by other pages
      // They will be overwritten by subsequent pages
    };
  }, [title, description, keywords, canonical]);

  return null;
}
