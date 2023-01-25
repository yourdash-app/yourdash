import HomeLayout from "../layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "./page"

const FourZeroFourPage: NextPageWithLayout = () => (
  <div style={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        minHeight: "84vh",
        width: "100%",
      }}
  >
    <h1 style={{
          background: "var(--card-bg)",
          borderRadius: "var(--card-rounding)",
          color: "var(--card-fg)",
          padding: "1rem 2rem",
        }}
    >404 | Page not found</h1>
  </div>
  )

export default FourZeroFourPage;

FourZeroFourPage.getLayout = page => <HomeLayout>{page}</HomeLayout>