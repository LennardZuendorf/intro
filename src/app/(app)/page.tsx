import type { NextPage } from 'next';
import { Banner } from '@/components/banner';

const Page: NextPage = () => {
  return (
    <div className='container justify-items-center align-middle'>
      <h1 className='text-4xl font-bold'>Hello, Next.js 15!</h1>
      <Banner />
    </div>
  );
};

export default Page;
