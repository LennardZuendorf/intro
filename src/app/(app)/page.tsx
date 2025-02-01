import type { NextPage } from 'next';
import { Banner } from '@/components/banner';
import Hero from '@/components/sections/main';

const Page: NextPage = () => {
  return (
    <div className='container justify-items-center align-middle'>
      <Hero />
      <Banner />
    </div>
  );
};

export default Page;
