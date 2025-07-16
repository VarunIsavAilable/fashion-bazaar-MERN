import paypal from 'paypal-rest-sdk'

paypal.configure({
    mode: 'sandbox',
    client_id: 'AZdcEm6pZ1NE8k_n20_QLrMnfkWpyNR6SeT6Tqkm4BfcxlOdDXHaR0BrYZtx2pNDSPYGE5PJkSMAUG0M',
    client_secret: 'EIekkJZo25NnXzE23LUsmc5WmM182Ae0TITYzPLEczgfpEcjtyocQHS8DycQPaWaqAr7GaepimBBmml-'
})

export default paypal