import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteProduct, listProducts } from "../../features/products/api";
import type { Product } from "../../features/products/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    listProducts()
      .then(setProducts)
      .catch((error) =>
        setError(getErrorMessage(error, "Cannot load products")),
      );
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteProduct(id);
      setProducts((current) => current.filter((product) => product.id !== id));
    } catch (error) {
      setError(getErrorMessage(error, "Cannot delete product"));
    }
  };

  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <PageHeader
          title="Products"
          action={
            <NavLink to="/product-create" className="btn btn-outline-dark">
              Add
            </NavLink>
          }
        />
        <AlertMessage message={error} />
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.image}
                        width="64"
                        height="64"
                        className="rounded object-fit-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{Number(product.price).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      type="button"
                      onClick={() => navigate(`/product/${product.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardPage>
  );
}

export default ProductList;
