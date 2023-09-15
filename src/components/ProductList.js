export default function ProductList(props) {
  const products = props.products

  return (
    <div>
      {products && products.map(product => {
        return <p>{product.title}</p>
      })}
    </div>
  )
}
