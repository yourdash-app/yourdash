import React from "react"
import Dialog from "./dialog/Dialog";
import DialogMessage from "./dialog/DialogMessage";
import NumberInput from "./input/NumberInput";
import TextInput from "./input/TextInput";

const DevTest: React.FC = () => {
  return <>
    <TextInput onChange={ () => { return 0 } }/>
    <TextInput mustMatchRegex={ /[a-z]{2}/ } onChange={ () => { return } }/>
    <TextInput placeholder={ `https://example.com` }
               mustMatchRegex={ /^(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?|localhost(?::\d+)?|(?!.*\.$)[\w.-]+\.[a-z]{2,})(?::\d+)?$/ }
               onChange={ () => { return } }/>
    <NumberInput onChange={ () => { return 0 } }/>
    <NumberInput onChange={ () => { return 0 } } min={ 10 }/>
    <NumberInput onChange={ () => { return 0 } } max={ 300 }/>
    <NumberInput onChange={ () => { return 0 } } min={ 10 } max={ 300 }/>
    {/*<DateInput/>*/ }
    <Dialog>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum excepturi, ipsam magnam nam nemo possimus quasi
      quibusdam quo repellendus ullam.
      <TextInput onChange={ () => { return 0} }/>
    </Dialog>
    <DialogMessage
        title={ "The title" }
        message={ "The message: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum excepturi, ipsam magnam nam nemo possimus quasi quibusdam quo repellendus ullam." }
        onConfirm={ () => { return 0 } }
    />
  </>
}

export default DevTest
