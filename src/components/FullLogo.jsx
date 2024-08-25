import react from 'react';
import { HeartHandshake } from 'lucide-react';

const FullLogo = () => {
  return (
      <h1 className='absolute top-5 left-5 text-[34px] font-bold tracking-tighter flex items-center justify-start gap-1'>
      <HeartHandshake size={32} />
      Growthness
    </h1>
  )
};

export default FullLogo;