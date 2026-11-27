import { useEffect, useState } from "react";
import { fetchProducts, getCachedProducts, getErrorMessage } from "../api/products";

// محصولات رو از API می‌گیره (یک بار؛ بعدش از حافظه می‌خونه)
//   products = null یعنی هنوز نیومده
//   loading  = در حال گرفتن
//   error    = پیام خطا (رشته‌ی خالی یعنی خطایی نیست)
//   retry    = تابعی که دوباره تلاش می‌کنه
export default function useProducts() {
  const [products, setProducts] = useState(getCachedProducts);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (getCachedProducts()) return; // قبلاً گرفتیم

    let ignore = false; // اگه کامپوننت بسته شد، جواب رو نادیده بگیر

    fetchProducts()
      .then((list) => {
        if (!ignore) setProducts(list);
      })
      .catch((err) => {
        if (!ignore) setError(getErrorMessage(err));
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setError("");
    setAttempt(attempt + 1);
  }

  const loading = products === null && error === "";

  return { products, loading, error, retry };
}
