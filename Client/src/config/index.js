export const registerFormControls = [
    {
        name: 'username',
        label: 'User Name',
        placeholder: 'Enter your username',
        componentType: 'input',
        type: 'text',
        
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
        
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
        
    }
]


export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
        
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
        
    }
]


export const addProductFormElements = [
    {
        label: 'Title',
        name: 'title',
        componentType: 'input',
        type: 'text',
        placeholder: "Enter product title."
    },

    {
        label: 'Description',
        name: 'description',
        componentType: 'textarea',
        placeholder: "Enter product description."
    },

    {
        label: 'Category',
        name: 'category',
        componentType: 'select',
        options: [
            {id: 'men', label: 'Men'},
            {id: 'women', label: 'Women'},
            {id: 'kids', label: 'Kids'},
            {id: 'accessories', label: 'Accessories'},
            {id: 'footwear', label: 'Footwear'},
        ],
    },

    {
        label: 'Brand',
        name: 'brand',
        componentType: 'select',
        options: [
            {id: 'nike', label: 'Nike'},
            {id: 'adidas', label: 'Adidas'},
            {id: 'puma', label: 'Puma'},
            {id: 'lv', label: 'LV'},
            {id: 'zara', label: 'ZARA'},
        ],
    },

    {
        label: 'Price',
        name: 'price',
        componentType: 'input',
        type: 'number',
        placeholder: "Enter product price."
    },

    {
        label: 'Sale price',
        name: 'salePrice',
        componentType: 'input',
        type: 'number',
        placeholder: "Enter sale price (optional)."
    },

    {
        label: 'Total Stock',
        name: 'totalStock',
        componentType: 'input',
        type: 'number',
        placeholder: "Enter total stock."
    },
]


export const shoppingViewHeaderMenuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/shop/home'
  },
  {
    id: 'men',
    label: 'Men',
    path: '/shop/listing'
  },
  {
    id: 'women',
    label: 'Women',
    path: '/shop/listing'
  },
  {
    id: 'kids',
    label: 'Kids',
    path: '/shop/listing'
  },
  {
    id: 'footwear',
    label: 'Footwear',
    path: '/shop/listing'
  },
  {
    id: 'accessories',
    label: 'Accessories',
    path: '/shop/listing'
  }
]

