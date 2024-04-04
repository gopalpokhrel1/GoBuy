import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/AdminProductList";
export default function AdminHome() {

  return (
    <div>
      <Navbar>
      <AdminProductList/>
      </Navbar>
    </div>
  )
}
