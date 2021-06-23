const express = require('express');
const routes = express.Router();
const pgp = require('pg-promise')();
const db = pgp({
    ssl: {
        rejectUnauthorized: false
    }

});
 
/**
* @swagger
* /apis:
*   get:
*     description: This request will return ALL apis and apis by category.
*     responses:
*       200:
*         description: Returns an array of APIs.
*/
routes.get('/apis', async (req, res) => {
   if (req.query.category) {
       const getCategory = await db.manyOrNone('select * from apis where category = $(category)', {
           category: req.query.category
       });
       res.status(200).json(getCategory);
   } else {
       const all = await db.manyOrNone('select * from apis')
       res.status(200).json(all);
   }
 
});

/**
* @swagger
* /apis/{id}:
*   get:
*     description: This request will return an API by ID.
*     responses:
*       200:
*         description: Successfully Retrieved API by ID.
*/
routes.get('/apis/:id', async (req, res) => {
    const api = await db.oneOrNone('SELECT * FROM apis WHERE id = $(id)', {
        id: +req.params.id
    });
    if (!api) {
        return res.status(404).send('id could not be found')
    }
    res.json(api)
  
 });
  
  
/**
* @swagger
* /apis/{id}:
*   put:
*     description: This request will allow you to update an API by ID
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description:
*         schema:
*           type : integer
*           format: int32
*           minimum: 1
*     requestBody:
*      required: true
*      content: 
*        application/json:
*          schema:
*            type: object
*            properties:
*              name:
*                type: string
*              category:
*                type: string
*              url:
*                type: string
*              description:
*                type: string
*              auth:
*                type: boolean
*              cors:
*                type: boolean            
*      responses:
*       200:
*         description: Updates an existing API
*/
 routes.put('/apis/:id', async (req, res) => {
  
    const idExists = await db.oneOrNone('SELECT id from apis WHERE id = $(id)', {
        id: +req.params.id
  
    });
  
    if (!idExists) {
        return res.status(404).send('The id does not exist');
    }

    await db.oneOrNone(
        `UPDATE apis SET
        name = $(name),
        description = $(description),
        url = $(url),
        category = $(category),
        auth = $(auth),
        cors = $(cors)
        WHERE id = $(id)
        `, {

        id: +req.params.id,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        category: req.body.category,
        auth: req.body.auth,
        cors: req.body.cors
    });
    res.json(
        await db.oneOrNone(`SELECT id, name, description, url, category, auth, cors from apis WHERE id = $(id)`, {
            id: +req.params.id
        }))
 }),
  
  
  
  /**
* @swagger
* /apis:
*   post:
*     description: This request will return ALL apis and apis by category
*     requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              id:
*                type: integer
*              name:
*                type: string
*              category:
*                type: string
*              url:
*                type: string
*              description:
*                type: string
*              auth:
*                type: boolean
*              cors:
*                type: boolean
*     responses:
*       201:
*         description: Adds API
*/
routes.post('/apis', async (req, res) => {
    try {
        const newApi = await db.oneOrNone('INSERT INTO apis (name, description, url, category, auth, cors) VALUES ($(name), $(description), $(url), $(category), $(auth), $(cors)) RETURNING id', {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            category: req.body.category,
            auth: req.body.auth,
            cors: req.body.cors,
        });
       

        const posted = await db.oneOrNone('SELECT id, name, description, url, category, auth, cors FROM apis WHERE id = $(id)', {
            id: newApi.id
        });
        return res.status(201).json(posted)
    } catch (error) {
        
            return res.status(400).json(error);
       
    }
}),

  /**
* @swagger
* /apis/{id}:
*   delete:
*     description: This request will allow you to delete an api based on id
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: API has been Deleted.
*         schema:
*           type : integer
*           format: int32
*           minimum: 1
*     responses:
*       204:
*         description: Deletes API.
*/
routes.delete('/apis/:id', async (req, res) => {
 
    await db.none('DELETE FROM apis WHERE id =$(id)', {
        id: +req.params.id
    });

    return res.status(204).send();
});


module.exports = routes;

 