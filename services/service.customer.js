const CustomerModel = require("../models/model.customer");

let customers = {};
let counter = 0;

class CustomerService
{
	static create(data)
	{
		if(data.first_name == null)
		{
			throw {
			    name: "ValidationError",
			    message: "Error detected. Please contact webmaster"
			}
		}
		else
		{

		}


		let customer = new CustomerModel(data.first_name, data.last_name, data.email, data.zipcode, data.password);

		customer.uid = 'c' + counter++;

		customers[customer.uid] = customer;

		return customer;
	}

	static retrieve(uid)
	{
		if(customers[uid] != null)
		{
			return customers[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ uid +')');
		}
	}

	static update(uid, data)
	{
		if(customers[uid] != null)
		{
			const customer = customers[uid];
			
			Object.assign(customer, data);
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
		}
	}

	static delete(uid)
	{
		if(customers[uid] != null)
		{
			delete customers[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
		}
	}
}

module.exports = CustomerService;