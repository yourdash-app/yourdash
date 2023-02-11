import { useRouter } from 'next/router';
import AppLayout from '../../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../page';
import Carousel from "../components/carousel/Carousel";
import styles from "../index.module.scss"
import Chiplet from 'ui';

const StoreIndex: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <div className={ styles.root }>
      <Carousel className={ styles.carousel }>
        <div style={ {
            backgroundImage: `url('/background.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          } }
        />
        <div style={ {
            backgroundImage: `url('/favicon.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          } }
        />
        <div style={ {
            backgroundImage: `url('/favicon.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          } }
        />
        <div style={ {
            backgroundImage: `url('/favicon.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          } }
        />
        <div style={ {
            backgroundImage: `url('/favicon.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          } }
        />
      </Carousel>
      <Chiplet.Row className={ styles.header }>
        <Chiplet.TextInput placeholder='Search' className={ styles.cardSearch }/>
        <Chiplet.SegmentButton buttons={ [
            {
              label: "All",
              onClick: () => {
                router.push(`/app/store/`)
              }
            },
            {
              label: "Categories",
              onClick: () => {
                router.push(`/app/store/categories`)
              }
            },
          ]
          }
        />
      </Chiplet.Row>
      <main className={ styles.cardContainer }/>
    </div>
  );
};

export default StoreIndex;

StoreIndex.getLayout = page => {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}
