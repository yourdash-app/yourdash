import { useRouter } from 'next/router';
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import Carousel from './components/carousel/Carousel';
import styles from "./index.module.scss"
import { useEffect, useState } from 'react';
import { type InstalledApplication } from 'types/store/installedApplication';
import SERVER, { verifyAndReturnJson } from '../../../server';
import Chiplet from 'ui';

const StoreIndex: NextPageWithLayout = () => {
  const router = useRouter()

  const [ includedApps, setIncludedApps ] = useState([] as InstalledApplication[])

  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(`/store/list/applications`),
        data => {
          setIncludedApps(data)
        }, () => {
          console.error("error fetching installed apps")
        })
  }, [])

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
      <main className={ styles.cardContainer }>
        {
            includedApps.map((item, ind) => {
              return (
                <Chiplet.Card
                  key={ item.name }
                  onClick={ () => {
                        router.push(`/app/store/product/${item.name}`)
                      } }
                  className={ styles.card }
                >
                  <Chiplet.Row>
                    <img className={ styles.cardImg } src={ item?.icon } alt=""/>
                    <Chiplet.Column>
                      <h2 className={ styles.cardName }>{item?.displayName}</h2>
                      <div className={ styles.cardDescription }>{item?.description}</div>
                    </Chiplet.Column>
                  </Chiplet.Row>
                </Chiplet.Card>
              )
            })
          }
      </main>
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
