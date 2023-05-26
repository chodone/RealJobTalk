
import LottieAnimation from '@/components/TestComponent';
import animationData from 'public/login.json';

const MyComponent: React.FC = () => {
  return (
    <div className=' bg-rose-400'>
      <LottieAnimation animationData={animationData} />
    </div>
    );
};

export default MyComponent;

