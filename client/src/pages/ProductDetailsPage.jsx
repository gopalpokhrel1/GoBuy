import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/product-list/components/ProductDetails";


export default function Home() {
  return (
    <div>
      <Navbar>
        <ProductDetails/>
      </Navbar>
    </div>
  )
}
