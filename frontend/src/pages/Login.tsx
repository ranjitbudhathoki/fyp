import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/home';

  const github = () => {
    window.open('http://localhost:8000/auth/github', '_self');
  };

  if (user) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return (
    <section className="h-full flex text-white">
      {/* left */}

      <div className="flex-grow">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1671630880761-10ce72f8bd5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="login page"
        />
      </div>
      {/* right */}
      <div
        className="w-[32rem] flex flex-col gap-6 items-center justify-center"
        onClick={github}
      >
        <h1 className="text-2xl ">Signup to Date.now()</h1>
        <button className="flex items-center gap-2 bg-[#27292a] px-3 py-2 rounded-md shadow-sm hover:shadow-lg hover:bg-opacity-90">
          <img
            className="google-icon w-8 h-8"
            src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png"
            alt="google"
          />
          Sign in with github
        </button>
      </div>
    </section>
  );
};

export default Login;
