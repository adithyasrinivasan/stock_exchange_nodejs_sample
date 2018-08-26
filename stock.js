class Stock {

    constructor(db) {
        this.data = [];
        this.db = db;
    }

    loadData() {
        this.db.query(`SELECT * FROM stock_data`, (err, rows) => {

            if (err) {
                console.log(err);
                return;
            }

            //iteration to split it category/countries for easier matching, otherwise a simple assignment would do
            this.data = rows.map(row => {
                let data = {};
                data.stock_id = row.stock_id;
                data.CompanyID = row.CompanyID;
                data.Budget = row.Budget;
                data.Bid = row.Bid;
                data.Countries = row.Countries.split(", ");
                data.Category = row.Category.split(", ");
                return data;
            });

            console.log(`Completed Loading exchange data`);

        });
    }

    getData() {
        return this.data;
    }

    handleGetRequest(req, res) {
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
                //Internal logic


                //Base Targeting
                let filtered_data = this.data.filter(row => {
                    let bPass = false;
                    //match country
                    row.Countries.forEach(country => {
                        if (country === countrycode) {
                            //match category
                            row.Category.forEach(cat => {
                                if (cat === Category) {
                                    bPass = true;
                                }
                            });
                        }
                    });
                    return bPass;
                });

                this.messageForInternalLogic(filtered_data, result, "Targeting");
                //Budget Check

                filtered_data = filtered_data.filter(row => {
                    if (row.Budget > 0) {
                        return true;
                    }
                });

                this.messageForInternalLogic(filtered_data, result, "Budgeting");

                //base bid check
                filtered_data = filtered_data.filter(row => {
                    if (row.Bid >= BaseBid) {
                        return true;
                    } else {

                    }
                });

                this.messageForInternalLogic(filtered_data, result, "BaseBid check");
                //shortlisting
                if (filtered_data.length > 1) {
                    filtered_data = filtered_data.sort((a, b) => {
                        return b.Bid - a.Bid;
                    });
                }

                if (filtered_data.length > 0) {
                    filtered_data = filtered_data[0];
                    let CompanyID = filtered_data.CompanyID;
                    this.updateStockData(CompanyID, BaseBid);
                    result.status = true;
                    result.winner = CompanyID;
                }
            }

        }
        return result;

    }

    updateStockData(CompanyID, BaseBid) {
        let stock_id = 0;
        this.data.forEach(d => {
            if (d.CompanyID === CompanyID) {
                d.Budget -= BaseBid;
                //each company entry is unique
                stock_id = d.stock_id;
                return;
            }
        });

        let sql = [BaseBid, stock_id];
        this.db.query('UPDATE stock_data SET Budget = Budget - ? WHERE stock_id = ?', sql, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }
    messageForInternalLogic(filtered_data, result, type) {
        if (filtered_data.length == 0)
            result.message.push(`No Companies Passed From ${type}`);
    }
}

module.exports = Stock;