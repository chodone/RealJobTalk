import React, { useState } from "react";
import { HomeIcon, MapPinIcon, UserIcon, MapIcon  } from "@heroicons/react/24/outline";

const Mobilenavbar = () => {
  return (
    <nav className="bg-gray-100 grid grid-cols-4 sticky bottom-0 justify-items-center py-3">
      <div className="">
        <HomeIcon className="w-6 h-6" />
      </div>
      <div>
        <MapPinIcon className="w-6 h-6" />
      </div>
      <div>
        <MapIcon className="w-6 h-6" />
      </div>
      <div>
        <UserIcon className="w-6 h-6" />
      </div>

    </nav>
    
  )
}

export default Mobilenavbar;