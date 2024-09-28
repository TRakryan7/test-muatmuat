import { create } from 'zustand';

export const useItemStore = create((set, get) => ({
    cart:[],
    cartEdit:{},
    cartIndex:null,
    add:(data)=>{
        const { cart } = get();
        const updatedCart = addCart(data, cart);
        set({cart:updatedCart})
        const check = get().cart;
        // set({total: getGrandTotal(check)});
        console.log("check",check);
    },
    getCart:(index)=>{
        console.log("lari")
        const { cart } = get();
        set({cartIndex:index})
        const data = getDataByIndex(index, cart);
        set({cartEdit:data})
        console.log("data", data);
        return data;
    },
    edit:(index,data)=>{
        const { cart } = get();
        const updatedCart = EditItem(index,data,cart);
        set({cart:updatedCart})
        const check = get().cart;
        // set({total: getGrandTotal(check)});
        console.log("check",check);
    },
    emptyEdit:()=>{
        set({cartEdit:{}, cartIndex:null})
    },
    remove: (id) => {
        const { cart } = get();
        // const list_id = getListId(idProduct, cart)
        const updatedCart = removeItem(id, cart);
        set({ cart: updatedCart });
        const check = get().cart;
        set({total: getGrandTotal(check)});
        // set({finalTotal: removeGrandTotal(check)});
        // return list_id
        // const {finalTotal} = get();
    },
    removeAll: () => set({ cart: [], total:0}),

}))


function addCart(product, cartItems){

    console.log("cart", product.id);
    cartItems.push(product);
    return cartItems;

}
function getDataByIndex(index, cartItems){

    // console.log("cart", product.id);
    cartItems[index];
    console.log("Karto", cartItems[index]);
    return cartItems[index];

}

const EditItem = (index, data, cartItems)=>{
     cartItems[index].item_name = data.item_name;
     cartItems[index].item_price = data.item_price;
     cartItems[index].in_stock = data.in_stock;
     return cartItems;
}

function updateQty(id, qty, cartItems){
    return cartItems.map((item)=>{
        if(item.id == id){
            return{
                ...item,
                quantity: qty,
                price_total: item.price * qty,
            }

        }
        return item;
    })
}

function updatePrice(id, price, cartItems){
    return cartItems.map((item)=>{
        if(item.id == id){
            return{
                ...item,
                price_total: price * item.quantity,
                
            }

        }
        return item;
    })
}

function getGrandTotal(cart) {
    let price_total = 0;
        cart.map(item => price_total = price_total + (item.price_total));
        return price_total; 

}

function removeItem(id, cart) {
    const cartNew = cart.filter(item => item.id === id);
    cartNew.forEach(item => cart.splice(cart.findIndex(e => e.id === item.id),1));
    return cart;
}