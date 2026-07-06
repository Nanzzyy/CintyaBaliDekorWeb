import Link from 'next/link';

import { useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';



const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);



  const handleToggle = () => {

    setIsOpen(!isOpen);

  };



  return (

    <div className="sidebar">

      <button onClick={handleToggle}>

        <AiOutlineMenu />

      </button>

      {isOpen && (

        <ul>

          <li>

            <Link href="/dashboard">

              <a>Dashboard</a>

            </Link>

          </li>

          <li>

            <Link href="/jobs">

              <a>Jobs</a>

            </Link>

          </li>

          <li>

            <Link href="/cashflow">

              <a>Cashflow</a>

            </Link>

          </li>

          <li>

            <Link href="/inventory">

              <a>Inventory</a>

            </Link>

          </li>

        </ul>

      )}

    </div>

  );

};



export default Sidebar;
