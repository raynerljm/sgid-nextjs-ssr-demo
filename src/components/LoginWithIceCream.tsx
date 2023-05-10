"use client";

import { useState } from "react";

const flavours = ["Vanilla", "Chocolate", "Strawberry"] as const;
type IceCream = (typeof flavours)[number];

const LoginWithIceCream = () => {
  const [state, setState] = useState<IceCream>("Vanilla");

  const handleLogin = () => {
    window.location.href = `${window.location.origin}/api/auth-url?state=${state}`;
  };

  return (
    <div className="bg-white bg-opacity-20 rounded-md p-4 flex flex-col gap-4">
      <div className="text-white flex flex-col gap-2">
        {flavours.map((flavour) => (
          <div
            key={flavour}
            onClick={() => setState(flavour)}
            className="gap-2 flex cursor-pointer hover:bg-white hover:bg-opacity-10 p-1 rounded-md"
          >
            <input type="radio" checked={state === flavour} />
            {flavour}
          </div>
        ))}
      </div>

      <button
        className="py-2 px-4 text-lg bg-blue-500 text-white rounded-sm hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login with Singpass
      </button>
    </div>
  );
};

export default LoginWithIceCream;
