
let currentDataAddQuality = {
    currentId: null,
    dataModalAddQualityContent: [],
    operator: null
}

let currentNewProduct = {
    reference: null,
    name: null,
    description: null,
    productsFormulation: [],
    wrapper: null,
    typeOfStorage: null,
}

let tempListProductFormulation = [];

let tempReference = [];
let tempProviders = [];
let tempStock = [];
let tempAllStock = [];
let orderDetails = [];
let tempOrders = [];


const getDateFormat = (year, month, day) => {
    //dateFormat yyyy-MM-dd
    return `${year}-${(month + 1) > 9 ? (month + 1) : '0' + (month + 1)}-${day > 9 ? day : '0' + day}`;
}


