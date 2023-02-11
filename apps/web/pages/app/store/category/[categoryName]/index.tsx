import {useRouter} from 'next/router';
import AppLayout from '../../../../../layouts/appLayout/AppLayout';
import {NextPageWithLayout} from '../../../../page';
import styles from "./index.module.scss";
import Chiplet from "ui";
import {useEffect, useState} from "react";
import SERVER, {verifyAndReturnJson} from "../../../../../server";
import Link from "next/link";
import {type InstalledApplication} from 'types/store/installedApplication';

const StoreProduct: NextPageWithLayout = () => {
    const router = useRouter()
    const categoryId = router.query.categoryName

    const [applications, setApplications] = useState([] as InstalledApplication[])

    useEffect(() => {
        verifyAndReturnJson(
            SERVER.get(`/store/list/category/${categoryId}/applications`),
            data => {
                setApplications(data || [])
            },
            err => {
                console.error(err)
            }
        )
    }, [categoryId])

    return (
      <div className={ styles.root }>
        <Chiplet.Carousel className={ styles.carousel }>
          <div style={ {
                    backgroundImage: `url('/background.jpg')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                } }
          />
        </Chiplet.Carousel>
        <h1 className={ styles.title }>
          <Link href={ `/app/store/categories` }>categories</Link> / {categoryId}</h1>
        <main className={ styles.cardContainer }>
          {/* <TextInput placeholder='Search' className={styles.cardSearch} /> */}
          {
                    applications.map((item, ind) => {
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

export default StoreProduct;

StoreProduct.getLayout = page => {
    return (
      <AppLayout>
        {page}
      </AppLayout>
    )
}
