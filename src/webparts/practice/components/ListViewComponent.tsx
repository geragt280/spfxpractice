import { PrimaryButton } from "@microsoft/sp-property-pane/node_modules/@microsoft/office-ui-fabric-react-bundle";
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import * as React from 'react';
import styles from './Practice.module.scss';
  
export interface IListViewComponentProps {
  listItems: any[];
}


  export default function ListViewComponent ({ listItems }: IListViewComponentProps) {

    
    const [items, setitems] = React.useState([]);
    var itemlist = [];
    
    React.useEffect(() => {
      setitems(listItems);
      console.log('useEffect out', listItems);
      
    })
    
    
    const _getSelection = (items) => {
        console.log('Selected items:', items);
    };

    const _getDropFiles = (files) => {
        for (var i = 0; i < files.length; i++) {
          console.log(files[i].name);
        }
    };

    const viewFields : IViewField[] = [
      {
        name: 'id',
        displayName: 'S.No',
        sorting: true,
        minWidth: 50,
        maxWidth: 100,
        isResizable: false,
      },
      {
        name: 'book_name',
        displayName: 'Book Name',
        sorting: true,
        minWidth: 100,
        maxWidth: 170,
        isResizable: false,
      },
      {
        name: 'book_author',
        displayName: 'Book Author',
        sorting: true,
        minWidth: 100,
        maxWidth: 170,
        isResizable: false,
      },
      {
        name: 'action',
        displayName: 'Action',
        sorting: false,
        minWidth: 50,
        maxWidth: 100,
        isResizable: false,
        render: (rowitem: any) => {
          const element:React.ReactElement = React.createElement(
            EditButton, 
            {
              item: rowitem
            }
          );
          return element;
        }  
      }
    ]

    const EditButton = ({item}) => {
      return(
        <div>
          <PrimaryButton onClick={() => {console.log(item)}}>Edit</PrimaryButton>
        </div>
      );
    };

    const groupByFields: IGrouping[] = [
        {
          name: "Books", 
          order: GroupOrder.ascending
        },
        // {
        //   name: "Author", 
        //   order: GroupOrder.descending
        // }
    ];
    // const items = [
    //   {
    //     id:'1',
    //     book_name:'Grapes Joot',
    //     book_author: 'Caneble Breed',
    //     edit_button: EditButton,
    //   },
    //   {
    //     id:'2',
    //     book_name:'Book of worm',
    //     book_author: 'Mamba root',
    //     edit_button: EditButton,
    //   },
    //   {
    //     id:'3',
    //     book_name:'Godzilla',
    //     book_author: 'Cristov godaf',
    //     edit_button: EditButton,
    //   },
    //   {
    //     id:'4',
    //     book_name:'Moon lights',
    //     book_author: 'Ruby Michale',
    //     edit_button: EditButton,
    //   }
    // ];
    
    console.log(items.length);
    return (
        <div>
          { items.length && <ListView
            items={items}
            viewFields={viewFields}
            // iconFieldName="ServerRelativeUrl"
            // compact={true}
            // selectionMode={SelectionMode.multiple}
            selection={_getSelection}
            showFilter={true}
            defaultFilter=""
            filterPlaceHolder="Search..."
            // groupByFields={groupByFields}
            dragDropFiles={true}
            onDrop={_getDropFiles}
            stickyHeader={true}
            className={styles.listWrapper}
            listClassName={styles.list} />}
        </div>
    );
  }
  