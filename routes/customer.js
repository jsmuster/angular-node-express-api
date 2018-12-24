var express = require('express');
var router = express.Router();
var CustomerService = require('../services/service.customer');

/* GET customer listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid Customer UID."});
});

/* adds a new customer to the list */
router.post('/', async (req, res, next) =>
{
	const data = req.body;

	try
	{
		const customer = await CustomerService.create(data);

		if(data.guid != null)
		{
			customer.guid = data.guid;
		}

		res.cookie('guid', customer.guid, { maxAge: 900000, httpOnly: true });

		// created the customer! 
		return res.status(201).json({ customer: customer });
	}
	catch(err)
	{
		/* TODO implement validation error */
		if (err.name === 'ValidationError') {
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* retrieves a customer by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await CustomerService.retrieve(req.params.id);

		return res.json({ customer: customer });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the customer by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await CustomerService.update(req.params.id, req.body);

		return res.json({ customer: customer });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the customer from the customer list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await CustomerService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;
