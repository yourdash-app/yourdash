import { useRouter } from 'next/router';
import Card from '../../../components/containers/card/Card';
import ColContainer from '../../../components/containers/ColContainer/ColContainer';
import RowContainer from '../../../components/containers/RowContainer/RowContainer';
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import Carousel from './components/carousel/Carousel';
import styles from "./index.module.scss"

const StoreIndex: NextPageWithLayout = () => {
  const router = useRouter()
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
      <main className={styles.root}>
        {
          [
            {
              name: "Todo",
              image: require("./../../../public/assets/productLogos/yourdash.svg").default.src,
              description: "This is a sample description for a store app"
            },
            {
              name: "Todo",
              image: require("./../../../public/assets/productLogos/yourdash.svg").default.src,
              description: "This is a sample description for a store app"
            },
            {
              name: "Todo",
              image: require("./../../../public/assets/productLogos/yourdash.svg").default.src,
              description: "This is a sample description for a store app"
            }
          ].map((item, ind) => {
            return <Card key={ind} onClick={() => {
              router.push(`/app/store/product/${item.name}`)
            }} className={styles.card}>
              <RowContainer>
                <img className={styles.cardImg} src={item.image} alt="" />
                <ColContainer>
                  <a className={styles.cardName}>{item.name}</a>
                  <p className={styles.cardDescription}>{item.description}</p>
                </ColContainer>
              </RowContainer>
            </Card>
          })
        }
      </main>
    </>
  );
};

export default StoreIndex;

StoreIndex.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}