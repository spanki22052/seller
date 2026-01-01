import { Suspense } from "react";
import { ProductPage } from "@/pages/ProductPage";

function ProductPageFallback() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#050505",
        color: "#ededed",
      }}
    >
      <div>Loading...</div>
    </div>
  );
}

export default function Product() {
  return (
    <Suspense fallback={<ProductPageFallback />}>
      <ProductPage />
    </Suspense>
  );
}

