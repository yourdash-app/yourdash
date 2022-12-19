import HomeLayout from "../components/layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "./page"

const FourZeroFourPage: NextPageWithLayout = () => {
  return (
    <div style={{
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "84vh"
    }}>
      <h1 style={{
        color: "var(--card-fg)",
        background: "var(--card-bg)",
        padding: "1rem 2rem",
        borderRadius: "var(--card-rounding)",
      }}>404 | Page not found</h1>
    </div>
  )
}

export default FourZeroFourPage;

FourZeroFourPage.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}