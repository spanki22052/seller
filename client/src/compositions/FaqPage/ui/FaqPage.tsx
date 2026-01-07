"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
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
          <motion.div variants={itemVariants}>
            <InfoBanner />
          </motion.div>

          <Styled.FAQSection>
            {isLoading ? (
              <div>Загрузка...</div>
            ) : (
              faqs.map((faq) => (
                <motion.div key={faq.id} variants={itemVariants}>
                  <Styled.FAQItem>
                    <Styled.FAQQuestion>{faq.question}</Styled.FAQQuestion>
                    <Styled.FAQAnswer>{faq.answer}</Styled.FAQAnswer>
                  </Styled.FAQItem>
                </motion.div>
              ))
            )}
          </Styled.FAQSection>

          <Footer />
        </Styled.MainContent>
      </Styled.Container>
    </>
  );
}

export default FaqPage;
