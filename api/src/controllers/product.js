const Sequelize = require("sequelize")
const Op = Sequelize.Op
const axios = require("axios")
const { Category, Product, Review, User } = require("../db")

const getApiInfo = async () => {
  try {
    const result = await axios("https://fakestoreapi.com/products/")
    const data = result.data
    return data
  } catch (error) {
    console.log(error)
  }
}

const chargeProductsDb = async (arr) => {
  try {
    arr.forEach(async (el) => {
      let newProduct = await Product.create({
        name: el.title,
        price: el.price,
        image: el.image,
        description: el.description,
        rating: el.rating.rate,
      })

      let categoriesDb = await Category.findOne({
        where: { name: el.category },
      })
      newProduct.addCategory(categoriesDb)
    })

    await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
    return "Info loaded in DB"
  } catch (error) {
    console.log(error)
  }
}

const getProductsDb = async () => {
  try {
    return await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const postProduct = async (body) => {
  const {
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
  } = body

  let productCreated = await Product.create({
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
  })

  let categoriesDb = await Category.findAll({
    where: { name: category },
  })
  productCreated.addCategory(categoriesDb)

  return "Producto Creado"
}

const searchProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        Review,
      ],
    })
    return product
  } catch (error) {
    console.log(error)
  }
}

const searchProductByName = async (string) => {
  try {
    const product = await Product.findAll({
      where: { name: { [Op.iLike]: "%" + string + "%" } },
      include: {
        model: Category,
        attributes: ["name"],
        through: { attributes: [] },
      },
    })
    return product
  } catch (error) {
    console.log(error)
  }
}

const updateProduct = async (
  integer,
  name,
  image,
  price,
  aux_images,
  description,
  discount,
  stock,
  rating,
  category
) => {
  const selected = await Product.findByPk(integer)
  selected.set({
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
  })
  selected.save()

  return selected
}

const deleteProduct = async (id) => {
  try {
    await Product.destroy({ where: { id: id } })
    return "Product deleted"
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getApiInfo,
  chargeProductsDb,
  getProductsDb,
  postProduct,
  searchProductById,
  searchProductByName,
  updateProduct,
  deleteProduct,
}
