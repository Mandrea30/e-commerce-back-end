const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
      include: [{
        model: Product,
        attributes: ['id','product_name','price','stock','category_id']
      }]
    }
  )
  .then(tagData => {
    res.json(tagData);
  })
  .catch(err => {
    log.error(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    include: [{
      model: Product,
      attributes: ['id','product_name','price','stock','category_id']
    }]
  })
  .then(tagData => {
    res.json(tagData)
  })
  .catch(err=> {
    console.log(err);
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err=> {
    console.log(err);
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    { 
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.body.id
      }
    }
    )
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({message:'No tag found with this id'})
      }
      res.json(dbTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy(
    { 
      where: {id: req.params.id}
    }
  )
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({message: 'No Tag found with this id'})
      return
    }
    res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

module.exports = router;