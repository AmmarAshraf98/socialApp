import { Link } from "react-router-dom";

function Nabar() {
  return (
    <div className='navbar bg-base-200 shadow-sm py-5'>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-xl'>daisyUI</Link>
      </div>
      <div className='flex gap-2'>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
          >
            <li>
              <Link to={"/login"} className='justify-between'>
                Login
              </Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nabar;
