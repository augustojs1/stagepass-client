"use client";

export function CreateEventNavigation() {
  return (
    <aside className="sm:block hidden">
      <nav className="w-full py-4 rounded-[6px] bg-gray-7">
        <div className="px-4">
          <p className="text-[1rem] text-black-3 font-bold mb-2">
            EVENT INFORMATION
          </p>
          <ul className="flex flex-col">
            <li className="text-5 font-normal text-gray-2 mb-3">
              <a href="">Upload cover</a>
            </li>
            <li className="text-5 font-normal text-gray-2 mb-3">
              <a href="">General Information</a>
            </li>
            <li className="text-5 font-normal text-gray-2 mb-3">
              <a href="">Location and time</a>
            </li>
            <li className="text-5 font-normal text-gray-2">
              <a href="">Ticket</a>
            </li>
          </ul>
          <hr className="text-gray-5 my-4" />
        </div>
        <ul className="px-4">
          <p className="text-[1rem] text-black-3 font-bold mb-2">
            PUBLISH EVENT
          </p>
          <li className="text-5 font-normal text-gray-2">
            <a href="">Review and Publish</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
