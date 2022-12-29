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
import ColContainer from '../../../../components/containers/ColContainer/ColContainer';
import Icon from '../../../../components/elements/icon/Icon';

const StoreProduct: NextPageWithLayout = () => {
  const router = useRouter()
  let productId = router.query.productName

  const [ product, setProduct ] = useState({ name: "undefined" } as InstalledApplication & { uninstallable: boolean, installed: boolean })
  const [ showInstallationPopup, setShowInstallationPopup ] = useState(false)
  const [ pageChanging, setPageChanging ] = useState(false)
  const [ installationError, setInstallationError ] = useState(false)

  useEffect(() => {
    if (!productId) return
    verifyAndReturnJson(
      SERVER.get(`/store/application/${productId}`),
      (json) => {
        if (json.error) return console.error("an error occurred fetching product data!")
        setProduct(json)
      },
      () => {
        console.error(`ERROR: couldn't fetch product information`)
      }
    )
  }, [ productId ])

  if (product.name === "undefined") return <></>
  return (
    <div className={styles.root} style={
      {
        left: pageChanging ? "100%" : "0",
        opacity: pageChanging ? "0" : "1"
      }
    }>
      <Carousel className={styles.carousel}>
        <div style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
        </div>
      </Carousel>
      {
        installationError
          ? <Card className={styles.installationError}>
            <ColContainer>
              <Icon color="var(--card-fg)" name="server-error"></Icon>
              <h3>Error</h3>
              <p>
                The application was not installed!
              </p>
              <Button
                onClick={() => {
                  setInstallationError(false)
                }}>
                Ok
              </Button>
            </ColContainer>
          </Card>
          : null
      }
      <div className={styles.installationPopup} style={{
        opacity: showInstallationPopup ? "1" : "0",
        pointerEvents: showInstallationPopup ? "all" : "none",
        scale: showInstallationPopup ? "1" : "0.75"
      }}>
        <div>
          <div className={styles.installationPopupImgContainer}>
            <img src={product?.icon} alt="" />
            <div></div>
          </div>
          <ColContainer className={styles.installationPopupContent}>
            <ColContainer>
              <h1>
                {product.displayName}
              </h1>
              <p>
                {product.description}
              </p>
              <ul>
                <h3>
                  Requirements
                </h3>
                {
                  product?.moduleRequirements?.length === 0
                    ? <p>This application has no requirements :D</p>
                    : product?.moduleRequirements?.map((requirement, ind) => {
                      return <a key={ind}>{requirement}</a>
                    })
                }
              </ul>
            </ColContainer>
            <Button onClick={() => {
              if (product.installed) {
                return
              } else {
                verifyAndReturnJson(
                  SERVER.post(`/store/application/${productId}/install`, { body: JSON.stringify({ product: productId }) }),
                  (data) => {
                    if (data.installed) {
                      setProduct(
                        {
                          ...product,
                          installed: true
                        }
                      )
                      setShowInstallationPopup(false)
                      router.reload()
                    } else {
                      setInstallationError(true)
                      setShowInstallationPopup(false)
                    }
                  },
                  () => {
                    console.error(`ERROR: couldn't install product`)
                  }
                )
              }
            }} vibrant>
              Approve installation
            </Button>
          </ColContainer>
          <IconButton
            icon={'x-16'}
            onClick={() => {
              setShowInstallationPopup(false)
            }}></IconButton>
        </div>
      </div>
      <section className={styles.productHeader}>
        <IconButton
          icon='arrow-left-16'
          color="var(--container-fg)"
          onClick={() => {
            setPageChanging(true)
            router.prefetch("/app/store")
            setTimeout(() => {
              router.push("/app/store")
            }, 600)
          }} />
        <img src={product?.icon} alt="" />
        <h2>{product.name}</h2>
        <Button onClick={() => {
          if (!product.installed) {
            setShowInstallationPopup(true)
          } else {
            verifyAndReturnJson(
              SERVER.delete(`/store/application/${productId}`),
              (data) => {
                if (data.installed) {
                  setInstallationError(true)
                  setProduct({
                    ...product,
                    installed: data.installed
                  })
                } else {
                  setInstallationError(false)
                  setProduct({
                    ...product,
                    installed: data.installed
                  })
                  router.reload()
                }
              },
              () => {
                return setInstallationError(false)
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