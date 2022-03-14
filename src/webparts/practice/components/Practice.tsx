import * as React from 'react';
import styles from './Practice.module.scss';
import { IPracticeProps } from './IPracticeProps';
import FormComponent from './FormComponent';
import { PrimaryButton } from '@microsoft/sp-property-pane/node_modules/@microsoft/office-ui-fabric-react-bundle';
import ListViewComponent from './ListViewComponent';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import GetListClass from '../classes/GetListClass';

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}


export default class Practice extends React.Component<IPracticeProps, {}> {

  // private ListClass = new GetListClass(this.props.context);
  public state = {
    showForm: false,
    bookItemsList: [],
  };

  public componentDidMount(): void {   
    // this will be first one to run when we want to load the items from the list
    this.getBooks();
  }

  private async getBooks(){
    // here we are getting items which we call from the model class named GETLISTCLASS and set it to a state which is directly 
    // connected to the list items row
    var book = new GetListClass(this.context);
    var items = await book.getItemInsideList('');
    console.log("Get book result",items);
    var tempArr = [];
    items.forEach(element => {
      const singleItem = {
        id:element.Id,
        book_name: element.Title,
        book_author: element.Bookauthor,
      };
      tempArr.push(singleItem);
    });
    this.setState({ bookItemsList: tempArr });
  }

  public render(): React.ReactElement<IPracticeProps> {
    const {
      hasTeamsContext,
    } = this.props;

    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.whiteTranslucent40,
        height: 420,
        justifyContent:'space-between',
        gridGap:'100'
      },
    };
    const wrapStackTokens: IStackTokens = { childrenGap: 30 };
    const sectionStackTokens: IStackTokens = { childrenGap: 30 };

    return (
      <section className={`${styles.practice} ${hasTeamsContext ? styles.teams : ''}`}>
        <Stack wrap styles={stackStyles} tokens={wrapStackTokens}>
          <div className='ms-Grid'>
            <div className={styles.itemStyles}>
            {this.state.showForm ? <FormComponent/> : <PrimaryButton onClick={() => { this.setState({ showForm:true }); }}>Add Book</PrimaryButton>}         
            </div>
          
            <div className={styles.itemStyles}>
              {!this.state.showForm ?<ListViewComponent listItems={this.state.bookItemsList} /> : <div /> }
            </div>

          </div>
        </Stack>
      </section>
    );
  }
}
