import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import systemAxios from '../../api/systemAxios';
import CustomToastify from '../CustomToastify';

type FormItemProps = {
  label: string;
  value: string;
  id: string;
  type?: 'text' | 'password';
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormItem({
  label,
  value,
  onChange,
  type = 'text',
  id,
  placeholder = '',
}: FormItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-custom-light-green" htmlFor={id}>
        {label}:
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#09090a]  text-white rounded px-3 py-2"
      />
    </div>
  );
}

function AppointAdminForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { mutate } = useMutation(
    async (payload: any) => {
      const res = await systemAxios.post('/api/admin/appoint', payload);
      console.log(res.data);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Admin appointed successfully');
        setUsername('');
        setPassword('');
      },
      onError: (error: any) => {
        console.log(error?.response?.data?.message);
        toast(error?.response?.data?.message);
      },
    }
  );

  const handleAppointAdmin = (event: any) => {
    event.preventDefault();
    if (!username || !password) {
      console.log('from here');
      return toast.error('Missing required fileds');
    } else {
      mutate({ username, password });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.form
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'tween' }}
        onSubmit={handleAppointAdmin}
        className=" flex flex-col gap-6  shadow-lg border-2 bg-black border-custom-light-green  w-80 px-6 pt-12 pb-6 rounded-md  "
      >
        <FormItem
          id="adminName"
          label="Username"
          placeholder="Enter a Username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <FormItem
          id="password"
          label="Password"
          placeholder="Enter a Password..."
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          onClick={handleAppointAdmin}
          className="text-white  bg-custom-light-green px-4 py-2 rounded-md"
        >
          Appoint
        </button>
      </motion.form>
    </div>
  );
}

function AppointAdmin() {
  return (
    <section className="grid place-content-center w-full h-full">
      <CustomToastify />
      <AppointAdminForm />
    </section>
  );
}

export default AppointAdmin;
