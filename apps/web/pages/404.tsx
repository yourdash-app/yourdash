import HomeLayout from "../layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "./page"
import Chiplet from "ui";

const FourZeroFourPage: NextPageWithLayout = () => {
  return (
    <Chiplet.Column style={ {
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 5rem)"
      } }
    >
      <Chiplet.Card>
        <Chiplet.Column>
          <h1>YourDash</h1>
          <p>Page not found</p>
          <Chiplet.ButtonLink href={ "/" }>Home</Chiplet.ButtonLink>
        </Chiplet.Column>
      </Chiplet.Card>
    </Chiplet.Column>
  )
}

export default FourZeroFourPage;

FourZeroFourPage.getLayout = page => {
  return <HomeLayout>{page}</HomeLayout>
}
