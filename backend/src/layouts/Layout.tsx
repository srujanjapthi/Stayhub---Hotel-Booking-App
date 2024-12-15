import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
  showHero?: boolean;
}

const Layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && (
        <>
          <Hero />
          <div className="container mx-auto">
            <SearchBar />
          </div>
        </>
      )}
      <div className="px-5 flex-1">
        <div className="py-8 container mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
