import * as React from 'react';
import * as ReactDom from 'react-dom';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from 'office-ui-fabric-react';
import { getTheme } from '@fluentui/react';
import { toInteger, values } from 'lodash';

export default function FormComponent() {

    const [bookname, setbookname] = React.useState('');
    const [authorname, setauthorname] = React.useState('');
    const [price, setprice] = React.useState(0);
    

    const OnSubmit = () => {
        console.log(bookname, authorname, price)
    }

    const stackTokens = { childrenGap: 50 };
    const iconProps = { iconName: 'Calendar' };
    const stackStyles = { root: { width: 650 } };
    const columnProps={
        tokens: { childrenGap: 20 },
        styles: { root: { width: 300 } },
    };

  return (
    <div className='ms-grid' dir="ltr">
        <form onSubmit={() => OnSubmit()} >
            <Stack horizontalAlign='center' verticalAlign='space-evenly' horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}  style={{textAlign:'left'}}>
                    <TextField label="Book Name " placeholder='name' required value={bookname} onChange={(e) => setbookname(e.currentTarget.value)}/>
                    <TextField label="Book Author " placeholder='author' required value={authorname} onChange={(e) => setauthorname(e.currentTarget.value)} />
                    <TextField label="Book Price " placeholder='price' type='number' required value={price.toString()} onChange={(e) => setprice(toInteger(e.currentTarget.value))} />
                    <PrimaryButton type='submit'>
                        Submit    
                    </PrimaryButton>
                </Stack>
            </Stack>
        </form>
    </div>
  )
}
