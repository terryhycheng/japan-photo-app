"use client";

import { cn } from "@repo/ui/lib/utils";
import { CheckCircleIcon, EyeIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menuItems: {
  label: string;
  href: string;
  icon: React.ElementType;
}[] = [
  { label: "管理資源", href: "/admin/manage-resources", icon: SettingsIcon },
  {
    label: "選擇入圍相片",
    href: "/admin/first-round",
    icon: CheckCircleIcon,
  },
  { label: "評審相片", href: "/admin/final-round", icon: EyeIcon },
];

const JudgeMenu = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <div className="flex items-center justify-center bg-black/5 p-4">
      <ul className="flex items-center justify-center gap-8">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                "font-kiwimaru flex items-center gap-2 p-2 text-xl font-bold tracking-wider",
                {
                  "bg-main/10 rounded-md": isActive(item.href),
                },
              )}
            >
              <item.icon className="size-6" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JudgeMenu;
