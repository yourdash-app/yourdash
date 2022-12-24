import { useRouter } from 'next/router';
import IconButton from '../../../../components/elements/iconButton/IconButton';
import AppLayout from '../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../page';
import Carousel from '../components/carousel/Carousel';
import styles from "./index.module.scss"
import { useEffect, useState } from 'react';
import SERVER, { verifyAndReturnJson } from '../../../../lib/server';
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
    verifyAndReturnJson(
      SERVER.get(`/store/application/${productId}`),
      (json) => {
        if (json.error) return console.error("an error occurred fetching product data!")
        setProduct(json)
      },
      () => {
        console.error(`ERROR: couldn't fetch product infomation`)
      }
    )
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
        <img src={product?.icon?.store} alt="" />
        <h2>{product.name}</h2>
        <Button onClick={() => {
          if (!product.installed) {
            verifyAndReturnJson(
              SERVER.post(`/store/application/install`, {
                body: JSON.stringify({
                  product: productId
                })
              }),
              (data) => {
                if (data.installed)
                  return setProduct(
                    {
                      ...product,
                      installed: true
                    }
                  )
              },
              () => {
                console.error(`ERROR: couldn't install product`)
              }
            )
          }
        }}>
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