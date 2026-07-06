import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";
import { Link } from "react-router-dom";


export default function AppFooter() {
  return (
    <Footer container className="rounded-none">
      <div className="w-full text-center container">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="text-xl font-semibold dark:text-white">
            Kudo
          </Link>
          <FooterLinkGroup>
            <FooterLink as={Link} to="/" className="text-gray-400">Home</FooterLink>
            <FooterLink as={Link} to="/posts" className="text-gray-400">Posts</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright by="Abrar Khalil" year={2025} />
      </div>
    </Footer>
  )
}
