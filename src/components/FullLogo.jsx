import react from 'react';
import { HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FullLogo = () => {
  const navigate = useNavigate()
  const handleClick = () => {
      const token = localStorage.getItem('growthness_access_token');
      let destination = token ? '/home' : '/';
      navigate(destination)
  }

  return (
      <h1 onClick={handleClick} className='absolute top-5 left-5 text-[34px] font-bold tracking-tighter flex items-center justify-start gap-1 cursor-pointer'>
      <HeartHandshake size={32} />
      Growthness
    </h1>
  )
};

export default FullLogo;