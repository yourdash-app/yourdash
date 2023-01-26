import { useRouter } from 'next/router';
import Card from 'ui/backup/containers/card/Card';
import ColContainer from 'ui/backup/containers/ColContainer/ColContainer';
import RowContainer from 'ui/backup/containers/RowContainer/RowContainer';
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import Carousel from './components/carousel/Carousel';
import styles from "./index.module.scss"
import { useEffect, useState } from 'react';
import { type InstalledApplication } from 'types/store/installedApplication';
import SERVER, { verifyAndReturnJson } from '../../../server';

const StoreIndex: NextPageWithLayout = () => {
  const router = useRouter()

  const [ includedApps, setIncludedApps ] = useState([] as InstalledApplication[])

  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(`/store/included/apps`),
        data => {
          setIncludedApps(data)
        }, () => {
          console.error("error fetching installed apps")
        })
  }, [])

  return (
    <div className={styles.root}>
      <Carousel className={styles.carousel}>
        <div style={{
            backgroundImage: `url('/background.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
        <div style={{
            backgroundImage: `url('/favicon.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
        <div style={{
            backgroundImage: `url('/favicon.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
        <div style={{
            backgroundImage: `url('/favicon.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
        <div style={{
            backgroundImage: `url('/favicon.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
      </Carousel>
      <main className={styles.cardContainer}>
        {/* <TextInput placeholder='Search' className={styles.cardSearch} /> */}
        {
            includedApps.map((item, ind) => (
              <Card
                key={ind}
                onClick={() => {
                      router.push(`/app/store/product/${item.name}`)
                    }}
                className={styles.card}
              >
                <RowContainer>
                  <img className={styles.cardImg} src={item?.icon} alt=""/>
                  <ColContainer>
                    <a className={styles.cardName}>{item?.displayName}</a>
                    <p className={styles.cardDescription}>{item?.description}</p>
                  </ColContainer>
                </RowContainer>
              </Card>
            ))
          }
      </main>
    </div>
  );
};

export default StoreIndex;

StoreIndex.getLayout = page => (
  <AppLayout>
    {page}
  </AppLayout>
)