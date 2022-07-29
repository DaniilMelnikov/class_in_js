class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    };
    setAvailable (availability) {
        this.available = availability;
    };
};

class GoodsList {
    #goods;
    constructor (goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    };
    get list() {
        const filterGoods = this.#goods.filter((element) => element['name'].match(this.filter) && element['available']);
        const sortGoods = filterGoods.sort(() => (this.sortDir) ? -1 : 1);
        return sortGoods
    };
    add(newGood) {
        this.#goods.push(newGood);
    };
    remove(id) {
        this.#goods.splice(id, id);
    }
};

class BasketGood extends Good{
    constructor (id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    };
};

class Basket {
    constructor (goods) {
        this.goods = goods
    };
    get totalAmount() {
        let sumPrice = 0;
        this.goods.forEach((element) => {
            sumPrice = sumPrice + element['price']
        });
        return sumPrice;
    };
    get totalSum() {
        let sumAmount = this.goods.reduce((sum, current) => sum + current['amount'], 0)
        return sumAmount
    };
    add(good, amount) {

        let moreGood = this.goods.filter((element) => element['id'] == good['id'])
        if (moreGood) {
            moreGood[0]['amount']++
        } else {
            this.goods.push(new BasketGood(good['id'],
                good['name'],
                good['description'],
                good['sizes'],
                good['price'],
                good['available'],
                amount));
        };
    };
    remove(good, amount) {
        this.goods.forEach((item, id) => {
            good['id'] == item['id'] ? item['amount'] = item['amount'] - amount : 0;
            item['amount'] <= 0 ? this.goods.splice(id, id) : 0;
        });

    };
    clear() {
        this.goods.splice(0, this.goods.length + 1);
    };
    removeUnavailable() {
        let listAvailable = this.goods.filter((element) => !element['available']);
        if (listAvailable) {
            listAvailable.forEach((item) => {
                this.goods.splice(
                    this.goods.indexOf(item),
                    this.goods.indexOf(item)
                    );
            });
        };
    }
};


xml = [
    {
        'id': 0,
        'name': 't-shirt lady',
        'description': "wear it and don't take it off",
        'sizes': 26,
        'price': 1999,
        'available': 206
    },
    {
        'id': 1,
        'name': 't-shirt man',
        'description': 'dude you look cool',
        'sizes': 36,
        'price': 2999,
        'available': 32
    },
    {
        'id': 2,
        'name': 't-shirt beerzavr man',
        'description': 'changed dino for beer',
        'sizes': 46,
        'price': 998,
        'available': 1
    },
    {
        'id': 3,
        'name': 't-shirt beerzavr lady',
        'description': 'changed dino for beer',
        'sizes': 32,
        'price': 998,
        'available': 45
    },
]

let goodsList = [];
xml.forEach((element) => {
    goodsList.push(new Good(element['id'],
                            element['name'],
                            element['description'],
                            element['sizes'],
                            element['price'],
                            element['available'])
                            );
});

let catalog = new GoodsList(goodsList, /man/gi, true, true);
console.log(catalog.list);
catalog.add(
    new Good(4,
            'sneakers man',
            'JUST DO IT!!!',
            45,
            25000,
            5)
            );
catalog.remove(4);

basketGoodList = [];
basketGoodList.push(new BasketGood(catalog.list[0]['id'],
                                    catalog.list[0]['name'],
                                    catalog.list[0]['description'],
                                    catalog.list[0]['sizes'],
                                    catalog.list[0]['price'],
                                    catalog.list[0]['available'],
                                    2));

let putBasket = new Basket(basketGoodList);
putBasket.add(catalog.list[0], 3);
putBasket.remove(catalog.list[0], 1);
putBasket.clear();

