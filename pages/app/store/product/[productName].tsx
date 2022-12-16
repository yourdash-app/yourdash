import { useRouter } from 'next/router';
import DropdownMenu from '../../../../components/elements/dropdownMenu/DropdownMenu';
import IconButton from '../../../../components/elements/iconButton/IconButton';
import AppLayout from '../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../page';
import Carousel from '../components/carousel/Carousel';
import styles from "./index.module.scss"
import { useEffect, useState } from 'react';
import SERVER from '../../../../lib/server';

const StoreProduct: NextPageWithLayout = () => {
  const router = useRouter()
  let productId = router.query.productName

  const [ product, setProduct ] = useState({
    name: null, icon: null, description: null
  })

  useEffect(() => {
    SERVER.get(`/store/application/${productId}`)
      .then((res) => {
        res.json().then((json) => {
          if (json.error) return console.error("an error occurred fetching product data!")
          setProduct(json)
        }).catch((err) => {
          console.error(err)
        })
      })
  }, [ productId ])
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
      <section className={styles.productHeader}>
        <img src="/favicon.png" alt="" />
        <h2>{product}</h2>
        <DropdownMenu items={[
          {
            name: "report",
            onClick: () => {
              console.log('Function not implemented.');
            }
          }
        ]}>
          <IconButton icon={'three-bars-16'} onClick={() => { }} />
        </DropdownMenu>
      </section>
    </>
  );
};

export default StoreProduct;

StoreProduct.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}