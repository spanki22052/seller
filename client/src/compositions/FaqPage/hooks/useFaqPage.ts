import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { getActiveFaqs, faqKeys } from "@/entities/faq";

export function useFaqPage() {
  const prefersReducedMotion = useReducedMotion();

  const {
    data: faqs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: faqKeys.lists(),
    queryFn: getActiveFaqs,
  });

  // State for tracking expanded FAQ items (user interactions only)
  const [userExpandedItems, setUserExpandedItems] = useState<Set<string>>(
    new Set()
  );

  // Compute which items should be expanded (first item by default + user interactions)
  const expandedItems = useMemo(() => {
    const result = new Set(userExpandedItems);
    if (faqs.length > 0) {
      result.add(faqs[0].id.toString());
    }
    return result;
  }, [faqs, userExpandedItems]);

  const toggleExpand = (faqId: string) => {
    const newExpanded = new Set(userExpandedItems);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setUserExpandedItems(newExpanded);
  };

  // Animation variants
  const containerVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const answerVariants = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, height: 0 },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, height: "auto" },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, height: 0 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return {
    faqs,
    isLoading,
    error,
    expandedItems,
    toggleExpand,
    containerVariants,
    itemVariants,
    answerVariants,
    prefersReducedMotion,
  };
}
