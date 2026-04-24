import { pick, uniq } from "lodash-es";
import colorConvert from "color-convert";

import { formatList } from "#shared/utils/intl";

import { Nationalities } from "#shared/enums/nationality";

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
// const brand: Brand = {
//   title: "فلربو",
//   description: "تولید کننده‌ی استیکر و اسکین لپتاپ، موبایل و کارت بانکی",
//   path: "/flerbo",
//   updated_at: "2021-02-03",
//   colors: ["fedd43", "e5aa61", "fa7496"],
//   tags: ["iran", "shop", "online", "closed"],
// };

export default defineEventHandler(async (): Promise<DetailResponse> => {
  const nationality = brand.tags.reduce<Nationalities | undefined>(
    (result, tag) => {
      if (result) return result;
      const key = tag.toUpperCase() as keyof typeof Nationalities;
      return Nationalities[key];
    },
    undefined
  );

  const isClosed = brand.tags.some((tag) => tag.toLowerCase() === "closed");

  const colorNames = formatList(
    uniq(brand.colors.map((code) => colorConvert.hex.keyword(`#${code}`))) // TODO: translate names to farsi
  );

  return {
    ...pick(brand, ["title"]),
    content: [
      brand.long_description ||
        `${brand.title} یک ${brand.description} ${nationality || ""} ${
          isClosed && "بود که همکنون به فعالیت خود پایان داده"
        } است.`,
      `${brand.title} از رنگ‌های ${colorNames} در هویت سازمانی خود استفاده می‌کند.`,
    ],
    colors: brand.colors.map((code) => ({
      hex: `#${code}`, // TODO: remove # when using new dataset
      rgb: colorConvert.hex.rgb(`#${code}`),
      hsl: colorConvert.hex.hsl(`#${code}`),
      isLight: isLight(`#${code}`),
    })),
  };
});
