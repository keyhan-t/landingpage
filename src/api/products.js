// ───────────────────────────────────────────────────────────
// گرفتن محصولات از API
//
// 👉 آدرس API رو از اینجا عوض کن:
//    توی فایل .env (کنار package.json) بنویس:
//        VITE_PRODUCTS_API_URL=https://آدرس-api-تو/products
//    اگه ننویسی، از فایل فارسی داخل پروژه (public/products-fa.json) خونده می‌شه.
//
// نکته: normalizeProduct فرم‌های رایج API رو می‌شناسه (title یا name، image یا thumbnail،
// rating به صورت عدد یا {rate, count}، قیمت قبل از تخفیف با اسم‌های مختلف و ...)
// پس معمولاً برای API جدید نیازی به تغییر نیست؛ اگه اسم فیلدها فرق داشت همین تابع رو عوض کن.
// ───────────────────────────────────────────────────────────

const API_URL = import.meta.env.VITE_PRODUCTS_API_URL || "/products-fa.json";

// حداقل زمانی که لودینگ نشون داده می‌شه (میلی‌ثانیه)، تا وقتی API خیلی سریعه لودینگ فقط "چشمک" نزنه
// (۰ بذاری، دیگه صبر اضافه نمی‌کنه)
const MIN_LOADING_MS = 700;

// بعد از این مدت (میلی‌ثانیه) درخواست قطع می‌شه و خطا نشون داده می‌شه
const TIMEOUT_MS = 15000;

// محصولات یک بار گرفته می‌شن و اینجا نگه داشته می‌شن
// (وقتی بین صفحه‌ها جابه‌جا می‌شی دوباره لودینگ نمی‌بینی)
let cache = null;
let pending = null; // درخواستی که الان در حال انجامه (تا دو بار درخواست نره)

// محصولِ هر شکلی از API رو به شکل ثابتی که کارت‌ها می‌خوان تبدیل می‌کنه
function normalizeProduct(item) {
  const image = item.image ?? item.thumbnail ?? item.image_url ?? item.images?.[0] ?? "";

  const images =
    Array.isArray(item.images) && item.images.length > 0 ? item.images : image ? [image] : [];

  // امتیاز: یا عدده (4.5) یا آبجکت ({ rate: 4.5, count: 120 })
  const ratingIsObject = item.rating && typeof item.rating === "object";
  const rating = Number(ratingIsObject ? item.rating.rate : item.rating) || 0;
  const reviewsCount = Number(
    ratingIsObject ? item.rating.count : (item.reviews_count ?? item.reviewsCount ?? 0),
  ) || 0;

  const oldPrice = Number(item.oldPrice ?? item.old_price ?? item.original_price) || undefined;

  // دسته‌بندی ممکنه رشته باشه یا آبجکت ({ name: "..." })
  const category =
    typeof item.category === "object" && item.category ? item.category.name : item.category;

  return {
    id: item.id,
    title: item.title ?? item.name ?? item.product_name ?? "",
    description: item.description ?? "",
    category: category || "",
    image,
    images,
    price: Number(item.price ?? item.final_price) || 0,
    oldPrice: oldPrice && oldPrice > (Number(item.price) || 0) ? oldPrice : undefined,
    rating,
    reviewsCount,
    // عکس‌های داخل پروژه (که با / شروع می‌شن) عکس مدل‌ان و کادر رو پر می‌کنن؛
    // عکس‌های API معمولاً عکس خود محصوله و باید کامل دیده بشه
    fit: "contain",
  };
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadProducts() {
  const startedAt = Date.now();

  const response = await fetch(API_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new Error("دریافت محصولات با خطا روبه‌رو شد.");

  const data = await response.json();

  // بعضی API ها آرایه می‌دن، بعضی داخل یه کلید می‌ذارن ({ products: [...] })
  const list = Array.isArray(data) ? data : (data.products ?? data.data ?? data.items ?? data.results);
  if (!Array.isArray(list)) throw new Error("فرمت پاسخ سرور قابل‌فهم نیست.");

  const remaining = MIN_LOADING_MS - (Date.now() - startedAt);
  if (remaining > 0) await wait(remaining);

  return list.map(normalizeProduct);
}

// محصولاتی که قبلاً گرفتیم (یا null اگه هنوز نگرفتیم)
export function getCachedProducts() {
  return cache;
}

// همه‌ی محصولات رو برمی‌گردونه (Promise)
export function fetchProducts() {
  if (cache) return Promise.resolve(cache);

  if (!pending) {
    pending = loadProducts()
      .then((list) => {
        cache = list;
        return list;
      })
      .finally(() => {
        pending = null;
      });
  }
  return pending;
}

// پیام خطای قابل‌فهم برای کاربر
export function getErrorMessage(error) {
  if (error?.name === "TimeoutError") return "پاسخ سرور خیلی طول کشید. دوباره تلاش کنید.";
  if (error instanceof TypeError) return "اتصال به اینترنت یا سرور برقرار نشد.";
  return error?.message || "مشکلی پیش آمد.";
}
