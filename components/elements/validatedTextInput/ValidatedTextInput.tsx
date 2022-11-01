/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import FloatingLabel from '../floatingLabel/FloatingLabel';
import styles from './ValidatedTextInput.module.css';

export interface IValidatedTextInput extends React.ComponentPropsWithoutRef<'input'> {
  isValid?: boolean;
  invalidReason?: string;
  defaultValue?: string;
}

const ValidatedTextInput: React.FC<IValidatedTextInput> = ({ children, isValid, defaultValue, invalidReason, ...inputProps }) => {
  return <div className={styles.component}>
    <input {...inputProps} type="text" defaultValue={defaultValue ? defaultValue : ""} className={`${styles.input} ${isValid ? styles.valid : styles.invalid}`}>{children}</input>
    <div className={styles.labelContainer}>
      <FloatingLabel>
        {invalidReason || ""}
      </FloatingLabel>
    </div>
  </div>
}

export default ValidatedTextInput;
