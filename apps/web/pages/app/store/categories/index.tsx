import {useRouter} from 'next/router';
import AppLayout from '../../../../layouts/appLayout/AppLayout';
import {NextPageWithLayout} from '../../../page';
import styles from "./index.module.scss"
import Chiplet from 'ui';
import {useEffect, useState} from "react";
import SERVER, {verifyAndReturnJson} from "../../../../server";

const StoreIndex: NextPageWithLayout = () => {
    const router = useRouter()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        verifyAndReturnJson(
            SERVER.get(`/store/list/categories`),
            data => {
                setCategories(data || [])
            },
            err => {
                console.error(err)
            }
        )
    })

    return (
      <div className={ styles.root }>
        <Chiplet.Carousel className={ styles.carousel }>
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
        </Chiplet.Carousel>
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
                    categories.map(category => {
                        return (
                          <Chiplet.Card
                            key={ category }
                            onClick={
                                    () => {
                                        router.push(`/app/store/category/${category}`)
                                    }
                                }
                            className={ styles.card }
                          >
                            <Chiplet.Row>
                              <Chiplet.Column>
                                <h2 className={ styles.cardName }>{category}</h2>
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
