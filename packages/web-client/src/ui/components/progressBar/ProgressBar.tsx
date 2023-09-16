/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import styles from './ProgressBar.module.scss';

export interface IProgressBar {
  value: number
  displayPercentage?: boolean
}

const ProgressBar: React.FC<IProgressBar> = ({
                                               value, displayPercentage
                                             }) => {
  return (
    <div className={ styles.component }>
      <div
        className={ styles.progress }
        style={ {
              width: value > 0 ? `${value * 100}%` : "100%",
              ...value > 0 ? { backgroundColor: "var(--progress-bar-fg)" } : {},
              position: value > 0.11 ? "relative" : "unset"
            } }
      >
        {
              displayPercentage && (
              <span
                className={ styles.percentage }
                style={
                        {
                          color: value > 0.11
                              ? "var(--progress-bar-bg)"
                              : "transparent"
                        }
                      }
              >{value * 100}%</span>
              )
          }
      </div>
    </div>
  );
};

export default ProgressBar;
