-- Inserting Record into Account table
INSERT INTO public.account
(
	account_firstname,
	account_lastname,
	account_email,
	account_password
)
VALUES(
'Tony',
'Stark',
'tony@starkent.com',
'Iam1ronM@n'
);

-- updating the Account table
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

-- Deleting Tony Stark record from account table
DELETE FROM public.account
WHERE account_firstname = 'Tony'
AND account_lastname = 'Stark';

-- Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors" using a single query. 
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'huge interiors')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Use an inner join to select the make and model fields from the inventory table and the classification name field from the classification table for inventory items that belong to the "Sport" category
SELECT i.inv_make, i.inv_model, c.classification_name AS classfication_name
FROM public.inventory i
INNER JOIN classification c
ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail columns using a single query.
UPDATE public.inventory
SET inv_image = replace(inv_image, '/images', '/images/vehicles'),
    inv_thumbnail = replace(inv_thumbnail, '/images', '/images/vehicles');