import { useState } from "react";
import Buy from "./Buy";
import Noncommercial from "./Noncommercial";
import Sell from "./Sell";

interface saleProps {
  is_selling: boolean;
  price: number;
}

export default function Purchase({ is_selling, price }: saleProps) {
  const [open, setOpen] = useState(false);
  const own = true; //API 통신) login user=artowner

  return (
    <>
      {is_selling ? (
        own ? (
          <Noncommercial open={open} setOpen={setOpen} />
        ) : (
          <Buy open={open} setOpen={setOpen} price={price} />
        )
      ) : own ? (
        <Sell open={open} setOpen={setOpen} />
      ) : (
        ""
      )}
    </>
  );
}
