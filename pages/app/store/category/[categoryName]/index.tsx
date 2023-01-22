import { useRouter } from 'next/router';
import AppLayout from '../../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import styles from "./index.module.scss";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../../../../components/containers/card/Card";
import RowContainer from "../../../../../components/containers/RowContainer/RowContainer";
import ColContainer from "../../../../../components/containers/ColContainer/ColContainer";

const StoreProduct: NextPageWithLayout = () => {
  const router = useRouter()
  const categoryId = router.query.categoryName

  return (
    <div className={styles.root}>
      <Carousel className={styles.carousel}>
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
      <h1 className={styles.title}><span onClick={() => {
        router.push(`/app/store/categories`)
      }}>categories</span> / {categoryId}</h1>
      <main className={styles.cardContainer}>
        {/* <TextInput placeholder='Search' className={styles.cardSearch} /> */}
        {
          [].map((item, ind) => {
            return <Card key={ind} onClick={() => {
              router.push(`/app/store/product/${item.name}`)
            }} className={styles.card}>
              <RowContainer>
                <img className={styles.cardImg} src={item?.icon} alt=""/>
                <ColContainer>
                  <a className={styles.cardName}>{item?.displayName}</a>
                  <p className={styles.cardDescription}>{item?.description}</p>
                </ColContainer>
              </RowContainer>
            </Card>
          })
        }
      </main>
    </div>
  );
};

export default StoreProduct;

StoreProduct.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}