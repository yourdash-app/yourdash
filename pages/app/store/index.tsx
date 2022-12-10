import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import Carousel from './components/carousel/Carousel';

const StoreIndex: NextPageWithLayout = () => {
  return (
    <>
      <Carousel>
        <div style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
        </div>
        <div style={{
          backgroundImage: `url('/favicon.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
        </div>
        <div style={{
          backgroundImage: `url('/favicon.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
        </div>
        <div style={{
          backgroundImage: `url('/favicon.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
        </div>
        <div style={{
          backgroundImage: `url('/favicon.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
        </div>
      </Carousel>
    </>
  );
};

export default StoreIndex;

StoreIndex.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}