import { pick } from "lodash-es";

import type { Brand } from "#shared/types/brand";
import type { DetailResponse } from "#shared/types/api";

// TODO: Make Dynamic using new dataset
const brand: Brand = {
  title: "دیجیکالا",
  description: "پلتفرم و فروشگاه اینترنتی",
  long_description:
    "دیجی‌کالا یکی از بزرگ‌ترین فروشگاه‌های آنلاین در ایران است که در سال ۱۳۸۵ توسط حمید و سعید محمدی تأسیس شد. این پلتفرم تجارت الکترونیکی، طیف گسترده‌ای از کالاهای مصرفی را ارائه می‌دهد، از جمله کالاهای ورزشی و سرگرمی، لوازم الکترونیکی، مواد غذایی، محصولات شخصی و دیجیتال. دیجی‌کالا با ارائه خدمات تحویل سریع و پشتیبانی از فروشندگان متعدد، به یکی از مهم‌ترین بازیگران در عرصه تجارت الکترونیک در ایران تبدیل شده است. همچنین، این شرکت دارای زیرمجموعه‌هایی است که در سایر زمینه‌های تجارت الکترونیکی فعالیت دارند و به اکوسیستمی کامل برای کسب‌وکارهای آنلاین تبدیل شده است.",
  path: "/digikala",
  updated_at: "2017-06-06",
  colors: ["ef3f3e", "818285"],
  tags: ["iran", "shop", "online"],
};

export default defineEventHandler(async (): Promise<DetailResponse> => {
  const nationality = "ایرانی";
  const isClosed = brand.tags.some((tag) => tag.toLowerCase() === "closed");

  return {
    ...pick(brand, ["title"]),
    content: [
      brand.long_description ||
        `${brand.title} یک ${brand.description} ${nationality} ${
          isClosed && "بود که همکنون به فعالیت خود پایان داده"
        } است`,
      `${brand.title} از رنگ‌های قرمز و خاکستری در هویت سازمانی خود استفاده می‌کند.`, // TODO: make the color names dynamic
    ],
    colors: brand.colors.map((code) => ({
      hex: `#${code}`, // TODO: remove # when using new dataset
      isLight: isLight(`#${code}`),
    })),
  };
});
