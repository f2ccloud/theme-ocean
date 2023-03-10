import "./styles/tailwind.css";
import "./styles/main.css";
import Alpine from "alpinejs";
import * as tocbot from "tocbot";
import dropdown from "./alpine-data/dropdown";
import colorSchemeSwitcher from "./alpine-data/color-scheme-switcher";
import pagination from "./alpine-data/pagination";
import postUtil from "./alpine-data/post-util";
import search from "./alpine-data/search";

window.Alpine = Alpine;

Alpine.data("dropdown", dropdown);
Alpine.data("colorSchemeSwitcher", colorSchemeSwitcher);
// @ts-ignore
Alpine.data("pagination", pagination);
// @ts-ignore
Alpine.data("postUtil", postUtil);
// @ts-ignore
Alpine.data("search", search);

Alpine.start();

const onScroll = () => {
  const headerMenu = document.getElementById("header-menu");
  if (window.scrollY > 0) {
    headerMenu?.classList.add("menu-sticky");
  } else {
    headerMenu?.classList.remove("menu-sticky");
  }
};

window.addEventListener("scroll", onScroll);

export function generateToc() {
  tocbot.init({
    tocSelector: ".toc",
    contentSelector: "#content",
    headingSelector: "h1, h2, h3, h4",
    extraListClasses: "space-y-1 dark:border-zinc-500",
    extraLinkClasses:
      "group flex items-center justify-between rounded py-1 px-1.5 transition-all hover:bg-zinc-100 text-sm opacity-80 dark:hover:bg-zinc-700 dark:text-zinc-50",
    activeLinkClass: "is-active-link bg-zinc-100 dark:bg-zinc-600",
    collapseDepth: 6,
    headingsOffset: 100,
    scrollSmooth: true,
    scrollSmoothOffset: -100,
  });
}

type ColorSchemeType = "system" | "dark" | "light";

export let currentColorScheme: ColorSchemeType = "system";

export function initColorScheme(defaultColorScheme: ColorSchemeType, enableChangeColorScheme: boolean) {
  let colorScheme = defaultColorScheme;

  if (enableChangeColorScheme) {
    colorScheme = (localStorage.getItem("color-scheme") as ColorSchemeType) || defaultColorScheme;
  }

  currentColorScheme = colorScheme;

  setColorScheme(colorScheme, false);
}

export function setColorScheme(colorScheme: ColorSchemeType, store: boolean) {
  if (colorScheme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
    document.documentElement.classList.remove(prefersDark ? "light" : "dark");
  } else {
    document.documentElement.classList.add(colorScheme);
    document.documentElement.classList.remove(colorScheme === "dark" ? "light" : "dark");
  }
  currentColorScheme = colorScheme;
  if (store) {
    localStorage.setItem("color-scheme", colorScheme);
  }
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
  if (currentColorScheme === "system") {
    setColorScheme("system", false);
  }
});

/*??????HTML????????????*/
export function removeHTMLTag(str: String) {
  str = str.replace(/<.*?>/g, ""); //??????HTML tag
  str = str.replace(/<\/?[^>]*>/g, ""); //??????HTML tag
  str = str.replace(/[ | ]*\n/g, "\n"); //???????????????
  str = str.replace(/\n[\s| | ]*\r/g, "\n"); //??????????????????
  str = str.replace(/ /gi, ""); //??????
  // str = str.replace(/[a-zA-Z]+/g, ''); //????????????
  return str;
}

/*????????????*/
export function readTime() {
  const contentHtml: HTMLElement | null = document.getElementById("content");
  // @ts-ignore
  let str = contentHtml.innerHTML;
  return (
    "???????????? " +
    removeHTMLTag(str).length +
    " ??????????????????????????? " +
    Math.ceil(removeHTMLTag(str).length / 400) +
    " ??????"
  );
}

// ???????????????????????????
const onScrollToTop = () => {
  const backToTop = document.getElementById("back-to-top");
  const backToDown = document.getElementById("back-to-down");
  if (window.scrollY < 100) {
    backToTop?.classList.add("hidden");
    backToDown?.classList.add("hidden");
  } else if (window.scrollY > 300) {
    backToTop?.classList.remove("hidden");
    backToDown?.classList.add("hidden");
  } else {
    backToTop?.classList.add("hidden");
    backToDown?.classList.remove("hidden");
  }
};

window.addEventListener("scroll", onScrollToTop);
