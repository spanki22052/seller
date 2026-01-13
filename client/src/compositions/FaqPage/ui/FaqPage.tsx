"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  KEYBOARD_KEYS,
  LOADING_CONFIG,
  ERROR_MESSAGES,
} from "@/shared/lib/constants";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { Footer } from "@/widgets/Footer";
import { useFaqPage } from "../hooks/useFaqPage";
import * as Styled from "./styled";

const InfoBanner = dynamic(
  () =>
    import("@/widgets/InfoBanner").then((mod) => ({ default: mod.InfoBanner })),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 400 }} />,
  }
);

// Component constants
const FAQLoadingSkeleton = () => (
  <>
    {Array.from({ length: LOADING_CONFIG.skeletonItemsCount }, (_, i) => (
      <Styled.FAQSkeletonItem key={i}>
        <Styled.FAQSkeletonQuestion />
        <Styled.FAQSkeletonAnswer />
      </Styled.FAQSkeletonItem>
    ))}
  </>
);

export function FaqPage() {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const {
    faqs,
    isLoading,
    error,
    expandedItems,
    toggleExpand,
    containerVariants,
    itemVariants,
    answerVariants,
  } = useFaqPage();

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
            {error ? (
              <div>{ERROR_MESSAGES.FAQ_LOAD_FAILED}</div>
            ) : isLoading ? (
              <FAQLoadingSkeleton />
            ) : (
              faqs.map((faq) => {
                const faqId = faq.id.toString();
                const isExpanded = expandedItems.has(faqId);

                return (
                  <Styled.FAQItem key={faq.id}>
                    <Styled.FAQQuestion
                      id={`faq-question-${faqId}`}
                      onClick={() => toggleExpand(faqId)}
                      $isExpanded={isExpanded}
                      aria-expanded={isExpanded}
                      aria-controls={`faq-answer-${faqId}`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (
                          e.key === KEYBOARD_KEYS.ENTER ||
                          e.key === KEYBOARD_KEYS.SPACE
                        ) {
                          e.preventDefault();
                          toggleExpand(faqId);
                        }
                      }}
                    >
                      {faq.question}
                      <Styled.ExpandIcon
                        $isExpanded={isExpanded}
                        aria-hidden="true"
                      >
                        ▼
                      </Styled.ExpandIcon>
                    </Styled.FAQQuestion>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`faq-answer-${faqId}`}
                          role="region"
                          aria-labelledby={`faq-question-${faqId}`}
                          variants={answerVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
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
