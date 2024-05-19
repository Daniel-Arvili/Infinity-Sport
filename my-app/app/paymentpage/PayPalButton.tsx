import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ClipLoader from "react-spinners/ClipLoader";

interface PayPalButtonProps {
  totalPrice: number;
  handlePayment: (PaymentMethod: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  totalPrice,
  handlePayment,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadAttempt < 3) {
        setIsLoading(false);
        setLoadAttempt(loadAttempt + 1);
      }
    }, 2000 + 5000 * loadAttempt);

    return () => clearTimeout(timer);
  }, [loadAttempt]);

  const initialOptions = {
    clientId:
      "Ad6ibbA8OLGc9gDdjPi_skZhTk-AMXWYmrEsM60dSutbUSkfRiuYH7L_HTpbBVkoFHYuDNuX6ZMcJGN5",
    currency: "USD",
    intent: "capture",
    "disable-funding": "card",
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toString(),
          },
        },
      ],
    });
  };

  const onApproveOrder = async (data: any, actions: any) => {
    try {
      const orderCaptureResult = await actions.order.capture();
      console.log(orderCaptureResult);
      handlePayment("PayPal");
    } catch (error) {
      console.error("Error capturing order:", error);
    }
  };

  const retryLoad = () => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="text-center text-sm sm:text-base md:text-lg mt-12 mb-1 text-naivySky dark:text-glowGreen">
        Use Paypal For Quick Checkout
      </div>
      {isLoading ? (
        <>
          <p className="text-black dark:text-white">
            Loading PayPal Button...{" "}
          </p>
          <ClipLoader color="#FFFFFF" size={24} />
          {loadAttempt >= 3 && (
            <div>
              <p>Failed to load PayPal Button. Please, try again.</p>
              <button onClick={retryLoad} className="retry-button">
                Retry
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="z-10">
          <PayPalScriptProvider options={initialOptions}>
            <div className="dark:invert">
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApproveOrder}
                style={{ color: "black" }}
              />
            </div>
          </PayPalScriptProvider>
        </div>
      )}
    </>
  );
};

export default PayPalButton;
