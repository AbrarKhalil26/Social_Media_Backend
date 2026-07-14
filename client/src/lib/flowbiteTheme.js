import { createTheme } from "flowbite-react";

export const customTheme = createTheme({
  sidebar: {
    root: {
      collapsed: {
        on: "w-16",
        off: "w-20",
      },
      inner: "dark:bg-base shadow-lg dark:shadow-yellow-100 px-3",
    },
    logo: {
      base: "mt-4 mb-9 flex items-center px-auto animate-[mirrorFlip_4s_0.5s_infinite_ease-in-out] font-logo self-center whitespace-nowrap transform-3d origin-center w-fit mx-auto",
      img: "mr-0",
    },
    item: {
      base: " hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700",
      content: {
        base: "hidden",
      },
      active: "dark:bg-neutral-800",
      icon: {
        active: "dark:text-amber-400",
      },
    },
    items: {
      base: "flex flex-col h-full justify-center",
    },
    itemGroup: {
      base: "mt-auto",
    },
  },

  badge: {
    root: {
      base: "border-neutral-700 bg-neutral-900 text-neutral-100",
      color: {
        dark: "bg-neutral-600 text-neutral-100 hover:bg-neutral-500 dark:bg-base dark:text-neutral-200 dark:hover:bg-neutral-700",
      },
    },
  },

  listGroup: {
    item: {
      link: {
        active: {
          on: "bg-neutral-900 text-white",
          off: "",
        },
      },
    },
  },

  textarea: {
    colors: {
      dark: "bg-base text-white border-neutral-700 focus:ring-neutral-600 ",
    },
  },

  textInput: {
    field: {
      input: {
        colors: {
          dark: "bg-base border-neutral-700 hover:bg-[#363636] focus:bg-[#363636] focus:border-amber-400 focus:ring-amber-400 text-white duration-300",
        },
      },
    },
  },

  card: {
    root: {
      base: "dark:bg-base dark:border-neutral-700 dark:shadow-lg dark:shadow-neutral-700",
    },
  },

  // modal: {
  //   content: {
  //     base: "bg-neutral-900",
  //   },
  // },
});
