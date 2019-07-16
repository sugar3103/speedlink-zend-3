import React, { Component } from 'react';
import { Button } from 'reactstrap';

// const data = {
//     "list": [
//         {
//             "id": 1,
//             "pricing_data_id": 1,
//             "from": "0.00",
//             "to": "5.00",
//             "internal_city": "10.00",
//             "internal_city_ras": "20.00",
//             "external_city": "30.00",
//             "external_city_ras": "40.00"
//         },
//         {
//             "id": 2,
//             "pricing_data_id": 1,
//             "from": "6.00",
//             "to": "10.00",
//             "internal_city": "15.00",
//             "internal_city_ras": "25.00",
//             "external_city": "35.00",
//             "external_city_ras": "45.00"
//         },
//         {
//             "id": 5,
//             "pricing_data_id": 1,
//             "from": "11.00",
//             "to": "15.00",
//             "internal_city": "20.00",
//             "internal_city_ras": "30.00",
//             "external_city": "40.00",
//             "external_city_ras": "50.00"
//         },
//         {
//             "id": 4,
//             "pricing_data_id": 1,
//             "from": "16.00",
//             "to": "20.00",
//             "internal_city": "25.00",
//             "internal_city_ras": "35.00",
//             "external_city": "45.00",
//             "external_city_ras": "55.00"
//         }
//     ],
//     "min": [
//         {
//             "id": 1,
//             "pricing_data_id": 1,
//             "internal_city_min": "10.00",
//             "internal_city_ras_min": "10.00",
//             "external_city_min": "10.00",
//             "external_city_ras_min": "10.00"
//         }
//     ]
// };

class PricingCod extends Component {

    render() {
        return (
            <form className="form form_custom pricing-cod">
                <div className="group-action">
                    <Button size="sm" color="info"><span className="lnr lnr-question-circle"></span></Button>
                    <Button size="sm" color="success"><span className="lnr lnr-plus-circle"></span></Button>
                    <div className="clearfix"></div>
                </div>
                <div className="group-input">
                    
                </div>
            </form>
        );
    }
}

export default PricingCod;
