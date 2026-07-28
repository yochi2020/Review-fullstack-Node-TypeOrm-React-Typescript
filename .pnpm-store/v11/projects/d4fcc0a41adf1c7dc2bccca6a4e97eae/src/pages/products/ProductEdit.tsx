import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../features/products/api";
import { ProductForm } from "../../features/products/components/ProductForm";
import type { ProductFormValues } from "../../features/products/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

const initialValues: ProductFormValues = {
  title: "",
  description: "",
  image: "",
  price: "",
};

function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then((product) =>
        setValues({
          title: product.title,
          description: product.description,
          image: product.image,
          price: String(product.price),
        })
      )
      .catch((error) => setError(getErrorMessage(error, "Cannot load product")));
  }, [id]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!id) return;
    setError("");
    setSaving(true);
    try {
      await updateProduct(id, { ...values, price: Number(values.price) });
      navigate("/product");
    } catch (error) {
      setError(getErrorMessage(error, "Cannot update product"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <PageHeader title="Edit Product" />
        <AlertMessage message={error} />
        <ProductForm
          values={values}
          saving={saving}
          onChange={(event) =>
            setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
          }
          onSubmit={handleSubmit}
        />
      </main>
    </DashboardPage>
  );
}

export default ProductEdit;
