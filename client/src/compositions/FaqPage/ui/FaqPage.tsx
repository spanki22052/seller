"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { Footer } from "@/widgets/Footer";
import { getActiveFaqs, faqKeys } from "@/entities/faq";
import * as Styled from "./styled";

// Dynamic imports for heavy components (currently not used)
// const AccountBanner = dynamic(
//   () =>
//     import("@/widgets/AccountBanner").then((mod) => ({
//       default: mod.AccountBanner,
//     })),
//   {
//     ssr: false,
//     loading: () => <div style={{ minHeight: 400 }} />,
//   }
// );

const InfoBanner = dynamic(
  () =>
    import("@/widgets/InfoBanner").then((mod) => ({ default: mod.InfoBanner })),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 400 }} />,
  }
);

export function FaqPage() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const prefersReducedMotion = useReducedMotion();

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: faqKeys.lists(),
    queryFn: getActiveFaqs,
  });

  // State for tracking expanded FAQ items, first item is expanded by default
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    return faqs.length > 0 ? new Set([faqs[0].id.toString()]) : new Set();
  });

  const toggleExpand = (faqId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedItems(newExpanded);
  };

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

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Styled.Container
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.MainContent>
          <Styled.FAQSection>
            {isLoading ? (
              <div>Загрузка...</div>
            ) : (
              faqs.map((faq) => {
                const faqId = faq.id.toString();
                const isExpanded = expandedItems.has(faqId);

                return (
                  <Styled.FAQItem key={faq.id}>
                    <Styled.FAQQuestion
                      onClick={() => toggleExpand(faqId)}
                      $isExpanded={isExpanded}
                    >
                      {faq.question}
                      <Styled.ExpandIcon $isExpanded={isExpanded}>
                        ▼
                      </Styled.ExpandIcon>
                    </Styled.FAQQuestion>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, height: 0 }
                          }
                          animate={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 1, height: "auto" }
                          }
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, height: 0 }
                          }
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <Styled.FAQAnswer>{faq.answer}</Styled.FAQAnswer>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Styled.FAQItem>
                );
              })
            )}
          </Styled.FAQSection>

          <motion.div variants={itemVariants}>
            <InfoBanner />
          </motion.div>
          <Footer />
        </Styled.MainContent>
      </Styled.Container>
    </>
  );
}

export default FaqPage;
