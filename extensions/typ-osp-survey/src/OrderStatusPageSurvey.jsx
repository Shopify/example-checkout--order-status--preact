import { render } from "preact";
import { useState } from "preact/hooks";
import { Survey, useStorageState } from "./shared.jsx";

export default function () {
  render(<ProductReview />, document.body);
}
// START [order-status.product-review]
function ProductReview() {
  const [productReview, setProductReview] = useState("");
  const [loading, setLoading] = useState(false);
  // Store into local storage if the product was reviewed by the customer.
  const [productReviewed, setProductReviewed] =
    useStorageState("product-reviewed");

  async function handleSubmit() {
    // Simulate a server request
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Send the review to the server
        console.log("Submitted:", productReview);
        setLoading(false);
        setProductReviewed(true);
        resolve();
      }, 750);
    });
  }

  // Hides the survey if the product has already been reviewed
  if (productReviewed.loading || productReviewed.data) {
    return null;
  }

  return (
    <Survey
      title="How do you like your purchase?"
      description="We would like to learn if you are enjoying your purchase."
      onSubmit={handleSubmit}
      loading={loading}
    >
      <s-choice-list
        name="product-review"
        value={productReview}
        onChange={(event) => {
          setProductReview(event.currentTarget.values[0]);
        }}
      >
        <s-choice value="5">Amazing! Very happy with it.</s-choice>
        <s-choice value="4">It's okay, I expected more.</s-choice>
        <s-choice value="3">Eh. There are better options out there.</s-choice>
        <s-choice value="2">I regret the purchase.</s-choice>
      </s-choice-list>
    </Survey>
  );
}
//END [order-status.product-review]
