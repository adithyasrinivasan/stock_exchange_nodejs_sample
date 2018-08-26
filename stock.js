class Stock {

    constructor(db){
        this.data = [];
        this.db = db;
    }

    loadData(){
        this.db.query(`SELECT * FROM stock_data`, (err, rows) => {

            if (err) {
                console.log(err);
                return;
            }
            this.data = rows;
            console.log(`Completed Loading exchange data`);

        });
    }

    getData(){
        return this.data;
    }
    
    handleGetRequest(req, res){
        let result = {};
        result.status = false; //defaults to false. Explicitly set true when all conditions pass
        result.message = [];

        let query = req.query;

        //check for querystring size
        if (Object.keys(query).length <= 2) {
            result.message.push(`http://localhost/countrycode=US&Category=Automobile&BaseBid=10`);
        } else {
            let {
                countrycode,
                Category,
                BaseBid
            } = query;
            //now check if the three parameters we require are specified
            if (!countrycode) {
                result.message.push(`Countrycode is missing`);
            }

            if (!Category) {
                result.message.push(`Category is missing`);
            }

            if (!BaseBid) {
                result.message.push(`BaseBid is missing`);
            }

            if (result.message.length == 0) {
                
                //Base Targeting

                //Budget Check

                //BaseBid Check
            }

        }
        return result;

    }
}

module.exports = Stock;