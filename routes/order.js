const express = require('express')
const pizzaapi = require('dominos')
const router = express.Router()
const cors = require('cors')
const util = require('util')
router.use(express.urlencoded({extended: false}))
router.use(cors())
router.use(express.json())

router.post('/add-order', async (req, res) => {

    try {
        let newCustomer = new pizzaapi.Customer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: {
                Street: req.body.street,
                City: req.body.city,
                Region: req.body.state,
                PostalCode: req.body.zip
            },
            email: req.body.email, 
            phone: req.body.phone
        })
        
        let chosenDeliveryMethod = req.body.chosenDeliveryMethod

        //stores your store id in a variable
        let myStore = new pizzaapi.Store({ID: req.body.chosenStore})
        myStore.ID = req.body.chosenStore

        let order = new pizzaapi.Order({
            customer: newCustomer,
            storeID: myStore.ID,
            deliveryMethod: chosenDeliveryMethod
        })
        order.StoreID = myStore.ID

        console.log(req.body)
        let itemArray = req.body.itemCode
        console.log(itemArray)
        for (item = 0; item < itemArray.length; item ++) {
            order.addItem(
                new pizzaapi.Item({
                    code: itemArray[item],
                    options: [],
                    quantity: 1
                })
            )
        }

        order.StoreOrderID = order.StoreID

        //checks to see if the order will go through
        order.validate(
            function(result) {
                console.log("*********************************** Order Validated ************************************************************************************************************")
                console.log(util.inspect(result, false, null, true))
            }
        )

        //see the price of the order without placing it
        order.price(
            function(result) {
                console.log("*********************************** Price ************************************")
                console.log(util.inspect(result, false, null, true))
            }
        )

        return res
            .status(200)
            .json(req.body)
            .end()

        /*
        //pass in cc info
        let cardNumber = req.body.cardNumber
        let cardInfo = new order.PaymentObject()
            cardInfo.Amount = order.Amounts.Customer
            cardInfo.Number = cardNumber
            cardInfo.CardType = order.validateCC(cardNumber)
            cardInfo.Expiration = req.body.expiration
            cardInfo.SecurityCode = req.body.securityCode
            cardInfo.PostalCode = req.body.cardZip

        order.Payments.push(cardInfo)

        //places the order
        order.place(
            function(result) {
                console.log("*********************************** Order Placed! ************************************")
                console.log(util.inspect(result, false, null, true))
            }
        )
        */
    }
    catch (error) {
        return res
            .status(500)
            .json({error: error.toString()})
            .end()
    }

})

module.exports = router