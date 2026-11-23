import Link from "next/link";
import { wordmark } from "@/data/site";

export function Logo() {
  return (
    <Link href="/" className="site-logo" aria-label="GreyLab home">
      <img {...wordmark} alt="" />
    </Link>
  );
}
