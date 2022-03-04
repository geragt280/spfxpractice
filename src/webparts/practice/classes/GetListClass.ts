import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


class GetListClass {

    constructor(context){
    }

    public async getItemInsideList(itemid){
        // get all the items from a list
        // const allItems = await sp.web.lists.getById("b2c00f21-8a96-4569-9f0b-52ce9f6b3662").data;
        const allItems = await sp.web.lists.getById("b2c00f21-8a96-4569-9f0b-52ce9f6b3662").items.getAll();
        // console.log(allItems);
        return allItems;
    }

    public async getSpecificId(){
        // get a specific item by id.
        const item: any = await sp.web.lists.getById("28a8f455-945d-4153-80b9-1076484ce25f").items.getById(1)();
        console.log("Request using id",item);
    }

    public async getOData(){
        // use odata operators for more efficient queries
        const items2: any[] = await sp.web.lists.getByTitle("My List").items.select("Title", "Description").top(5).orderBy("Modified", true)();
        console.log("Modified Query",items2);
    }
}

export default GetListClass;