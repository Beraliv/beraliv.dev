import Link from "next/link";
import React from "react";

type LabelProps = {
  title: string;
};

export const Label: React.FC<LabelProps> = ({ title }) => (
  <Link href={`/tag/${title}`}>{title}</Link>
);
