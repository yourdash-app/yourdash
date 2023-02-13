import { useRouter } from 'next/router';
import AppLayout from '../../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../page';
import styles from "./index.module.scss"
import { useEffect, useState } from 'react';
import SERVER, { verifyAndReturnJson } from '../../../../server';
import { type InstalledApplication } from 'types/store/installedApplication';
import Chiplet from "ui";

const StoreProduct: NextPageWithLayout = () => {
  const router = useRouter()
  const productId = router.query.productName

  const [ product, setProduct ] = useState({ name: "undefined" } as InstalledApplication & {
    uninstallable: boolean,
    installed: boolean
  })
  const [ showInstallationPopup, setShowInstallationPopup ] = useState(false)
  const [ pageChanging, setPageChanging ] = useState(false)
  const [ installationError, setInstallationError ] = useState(false)
  const [ uninstallationError, setUninstallationError ] = useState(false)
  const [ unableToLoadPopup, setUnableToLoadPopup ] = useState(false)

  useEffect(() => {
    if (!productId) return
    verifyAndReturnJson(
        SERVER.get(`/store/application/${productId}`),
        json => {
          if (json.error) return console.error("an error occurred fetching product data!")
          setProduct(json)
        },
        () => {
          console.error(`ERROR: couldn't fetch product information`)
          setUnableToLoadPopup(true)
        }
    )
  }, [ productId ])

  if (unableToLoadPopup)
    return (
      <Chiplet.Card className={ styles.errorPopup }>
        <Chiplet.Column>
          <Chiplet.Icon color="var(--card-fg)" name="server-error"/>
          <h3>Error</h3>
          <p>
            The application &quot;{productId}&quot; was not found
          </p>
          <Chiplet.Button
            onClick={
                  () => {
                    router.push(`/app/store`)
                  }
                }
          >
            Go back
          </Chiplet.Button>
        </Chiplet.Column>
      </Chiplet.Card>
    )

  if (product.name === "undefined")
    return <div/>

  return (
    <div
      className={ styles.root }
      style={
            {
              left: pageChanging ? "100%" : "0",
              opacity: pageChanging ? "0" : "1"
            }
          }
    >
      <Chiplet.Carousel className={ styles.carousel }>
        <div style={ {
            backgroundImage: `url('/background.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          } }
        />
      </Chiplet.Carousel>
      {
          installationError
              ? (
                <Chiplet.Card className={ styles.errorPopup }>
                  <Chiplet.Column>
                    <Chiplet.Icon color="var(--card-fg)" name="server-error"/>
                    <h3>Error</h3>
                    <p>
                      The application was not installed!
                    </p>
                    <Chiplet.Button
                      onClick={ () => {
                            setInstallationError(false)
                          } }
                    >
                      Ok
                    </Chiplet.Button>
                  </Chiplet.Column>
                </Chiplet.Card>
              )
              : null
        }
      {
          uninstallationError
              ? (
                <Chiplet.Card className={ styles.errorPopup }>
                  <Chiplet.Column>
                    <Chiplet.Icon color="var(--card-fg)" name="server-error"/>
                    <h3>Error</h3>
                    <p>
                      The application was not uninstalled!
                    </p>
                    <Chiplet.Button
                      onClick={ () => {
                            setUninstallationError(false)
                          } }
                    >
                      Ok
                    </Chiplet.Button>
                  </Chiplet.Column>
                </Chiplet.Card>
              )
              : null
        }
      <Chiplet.Dialog
        visible={ showInstallationPopup }
        onClose={ () => {
              setShowInstallationPopup(false)
            } }
        style={ {
              zIndex: 2
            } }
      >
        <Chiplet.Column className={ styles.installationPopupContent }>
          <Chiplet.Row>
            <Chiplet.Column>
              <h1>
                {product.displayName}
              </h1>
              <p>
                {product.description}
              </p>
            </Chiplet.Column>
            <ul>
              <h3>
                Requirements
              </h3>
              {
                  product?.moduleRequirements?.length === 0
                      ? <p>This application has no requirements :D</p>
                      : product?.moduleRequirements?.map(requirement => {
                        return <p key={ requirement }>{requirement}</p>
                      })
                }
            </ul>
          </Chiplet.Row>
          <Chiplet.Button
            onClick={ () => {
                  if (product.installed) {
                    return
                  } else {
                    verifyAndReturnJson(
                        SERVER.post(`/store/application/${productId}/install`, { body: JSON.stringify({ product: productId }) }),
                        data => {
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
                }
                }
            vibrant
          >
            Approve installation
          </Chiplet.Button>
        </Chiplet.Column>
      </Chiplet.Dialog>
      <section className={ styles.productHeader }>
        <section>
          <Chiplet.IconButton
            icon='arrow-left-16'
            color="var(--container-fg)"
            onClick={ () => {
                  setPageChanging(true)
                  router.prefetch("/app/store")
                  setTimeout(() => {
                    router.push("/app/store")
                  }, 600)
                } }
          />
          <img src={ product?.icon } data-under-development={ product.underDevelopment } alt=""/>
          <h2>{product.displayName}{product.underDevelopment && " 🚧"}</h2>
        </section>
        <section>
          {
                product.installed && (
                <Chiplet.Button
                  onClick={
                          () => {
                            router.push(`${product.path}`)
                          }
                        }
                >
                  Open
                </Chiplet.Button>
                )
            }
          <Chiplet.Button
            disabled={ product.installed ? !product.uninstallable : false }
            onClick={
                  () => {
                    if (!product.installed) {
                      setShowInstallationPopup(true)
                    } else {
                      verifyAndReturnJson(
                          SERVER.delete(`/store/application/${productId}`),
                          data => {
                            console.log(data)
                            if (data.installed) {
                              setUninstallationError(true)
                              setProduct({
                                ...product,
                                installed: data.installed
                              })
                            } else {
                              setUninstallationError(false)
                              setProduct({
                                ...product,
                                installed: data.installed
                              })
                            }
                          },
                          () => {
                            return setUninstallationError(true)
                          }
                      )
                    }
                  }
                }
          >
            {product.installed ? product.uninstallable ? "Uninstall" : "Forcefully installed by the server" : "Install"}
          </Chiplet.Button>
        </section>
      </section>
      <section className={ styles.description } style={ { marginTop: "-3rem" } }>
        <Chiplet.Card>
          {product.underDevelopment && (
            <p className={ styles.descriptionNotice }>Notice: this product is under development, the following
              description may be out of date and contain
              incorrect information.</p>
            )}
          <p>{product.description}</p>
        </Chiplet.Card>
      </section>
      <section className={ styles.description } style={ { marginTop: "0.5rem" } }>
        <Chiplet.Card>
          <p>Located in the &quot;{product.category}&quot; category</p>
          <p>
            Author: {product.author}<br/>
            Copyright: {product.copyright}<br/>
            License: {product.license}<br/>
            Author: {product.author}
          </p>
        </Chiplet.Card>
      </section>
    </div>
  );
};

export default StoreProduct;

StoreProduct.getLayout = page => {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}
