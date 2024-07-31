import SignUpForm from '../components/SignUpForm';
import Image from 'next/image';

const Home = () => {
  return (
    <main className="flex h-screen flex-row">
        <div className="flex grow basis-[65%] items-center justify-center">
          <Image src="/imgs/principal.svg" alt="Main Image" width={500} height={500} className="" />
        </div>
        <div className="flex grow basis-[45%] items-center justify-center bg-red-200">
          <SignUpForm />
        </div>
    </main>
  );
};

export default Home;