import { useRouter } from 'next/router';
import IconButton from '../../../../components/elements/iconButton/IconButton';
import AppLayout from '../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../page';
import Carousel from '../components/carousel/Carousel';
import styles from "./index.module.scss"
import { useEffect, useState } from 'react';
import SERVER from '../../../../lib/server';
import InstalledApplication from '../../../../types/store/installedApplication';
import Button from '../../../../components/elements/button/Button';
import Card from '../../../../components/containers/card/Card';

const StoreProduct: NextPageWithLayout = () => {
  const router = useRouter()
  let productId = router.query.productName

  const [ product, setProduct ] = useState({
  } as InstalledApplication & { uninstallable: boolean, installed: boolean })

  useEffect(() => {
    if (!productId) return
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

  if (!product) return <></>
  return (
    <div className={styles.root}>
      <Carousel>
        <div style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
        </div>
      </Carousel>
      <section className={styles.productHeader}>
        <IconButton
          icon='arrow-left-16'
          color="var(--container-fg)"
          onClick={() => {
            router.push("/app/store")
          }} />
        <img src={product.icon} alt="" />
        <h2>{product.name}</h2>
        <Button onClick={() => { }}>
          {product.installed ? product.uninstallable ? "Uninstall" : "Forcefully installed by the server" : "Install"}
        </Button>
      </section>
      <section className={styles.description}>
        <Card>
          {product.description}
        </Card>
      </section>
    </div>
  );
};

export default StoreProduct;

StoreProduct.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}