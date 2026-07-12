import type { ChangeEvent, FormEvent } from "react";
import type { ProductFormValues } from "../types";

type ProductFormProps = {
  values: ProductFormValues;
  saving: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ProductForm({ values, saving, onChange, onSubmit }: ProductFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input id="title" name="title" className="form-control" value={values.title} onChange={onChange} required />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input id="price" name="price" type="number" min="0" step="0.01" className="form-control" value={values.price} onChange={onChange} required />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" name="description" rows={4} className="form-control" value={values.description} onChange={onChange} required />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input id="image" name="image" type="url" className="form-control" value={values.image} onChange={onChange} required />
        </div>
      </div>
      <button type="submit" className="btn btn-outline-primary" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
