export type TNavConfigItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
};

export type TNavConfig = Array<{
  groupTitle: string;
  items: TNavConfigItem[];
}>;

export const navConfig: TNavConfig = [
  {
    groupTitle: "Internal Resources",
    items: [
      { title: "Tubes Cursor", href: "/tubes-cursor" },
      { title: "Contact", href: "/contact", disabled: true },
    ],
  },
  {
    groupTitle: "External Resources",
    items: [
      { title: "Aceternity UI", href: "https://ui.aceternity.com/components", external: true },
      { title: "React Bits", href: "https://reactbits.dev/text-animations/split-text", external: true },
    ],
  },
];
