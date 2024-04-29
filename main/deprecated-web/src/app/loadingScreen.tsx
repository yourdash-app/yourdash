import csi from "@yourdash/csi/csi";
import { Component, createResource } from "solid-js";
import styles from "./index.preload.module.scss";
import Heading from "@yourdash/uikit/components/heading/heading";
import Spinner from "@yourdash/uikit/components/spinner/spinner";
import Subtext from "@yourdash/uikit/components/subtext/subtext";

const LoadingScreen: Component = () => {
  const [fullName] = createResource(() => csi.getUser().getFullName());

  return (
    <div class={styles.page}>
      <Heading
        level={1}
        text={`Hiya, ${fullName()?.first || "Failure to load name"}!`}
        className={styles.heading}
      />
      <Spinner />
      <Subtext
        text={"Loading YourDash..."}
        className={styles.loadingText}
      />
    </div>
  );
};

export default LoadingScreen;
