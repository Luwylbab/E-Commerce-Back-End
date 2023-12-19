const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 // Finds all categories and includes its associated products
router.get('/', async (req, res) => {
  try {
    const productData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // Finds one category by its `id` value and includes its associated products
router.get('/:id', async (req, res) => {
  try {
    const productData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Since the model will create a unique UUID value by default, we just need to provide the `id` of the Reader that will own this card
    const categoryData = await Category.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
