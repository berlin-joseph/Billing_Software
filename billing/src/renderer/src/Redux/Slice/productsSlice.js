// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   selectedProducts: [],
//   quantities: [],
//   discounts: []
// }

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     addProduct: (state, action) => {
//       const product = action.payload
//       const existingProduct = state.selectedProducts.find((prod) => prod._id === product._id)
//       if (!existingProduct) {
//         state.selectedProducts.push(product)
//         state.quantities.push(1)
//         state.discounts.push(5)
//       }
//     },
//     removeProduct: (state, action) => {
//       const index = action.payload
//       state.selectedProducts.splice(index, 1)
//       state.quantities.splice(index, 1)
//       state.discounts.splice(index, 1)
//     },
//     updateQuantity: (state, action) => {
//       const { index, value } = action.payload
//       state.quantities[index] = value
//     },
//     updateDiscount: (state, action) => {
//       const { index, value } = action.payload
//       state.discounts[index] = value
//     }
//   }
// })

// export const { addProduct, removeProduct, updateQuantity, updateDiscount } = productsSlice.actions
// export default productsSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProducts: []
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload

      const existingProduct = state.selectedProducts.some(
        (prod) => prod.product._id === product._id
      )

      if (!existingProduct) {
        state.selectedProducts.push({
          product: product,
          product_quantity: product.product_quantity || 1,
          product_discount: product.product_discount || 5
        })
      }
    },
    removeProduct: (state, action) => {
      const index = action.payload
      state.selectedProducts.splice(index, 1)
    },
    removeAllProduct: (state, action) => {
      state.selectedProducts = []
    },
    updateQuantity: (state, action) => {
      const { index, value } = action.payload
      if (state.selectedProducts[index]) {
        state.selectedProducts[index].product_quantity = value
      }
    },
    updateDiscount: (state, action) => {
      const { index, value } = action.payload
      if (state.selectedProducts[index]) {
        state.selectedProducts[index].product_discount = value
      }
    }
  }
})

// Export the actions and reducer
export const { addProduct, removeProduct, updateQuantity, updateDiscount, removeAllProduct } =
  productsSlice.actions
export default productsSlice.reducer
